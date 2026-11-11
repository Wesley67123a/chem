/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - User Log, Cloud Sync & Admin Engine (userlog.js)
 * Version: 1.0.0 (Paired with app.js v0.0.47+)
 * ============================================================================
 * 職責：
 * 1. 管理學生認證 (5A/5B/5C/5D + 1~35) 與雙重密碼驗證
 * 2. 管理 Admin 驗證 (帳號 Wesley / 本地密碼 2007Wesley) 與學生數據總覽後台
 * 3. 雙層答題狀態管理：
 *    - sessionAnswers: 當前章節作答狀態（開關目錄不消失，僅在「結束當前 MC」二次確認後清零）
 *    - uniqueAnswers: 永久唯一作答紀錄（全站 5309 題，每帳號每題只加一次，防刷題灌水）
 * 4. 追蹤 Streak（連續答對累加、答錯即歸零、結束當前 MC 歸零）
 * 5. 追蹤 Recent Topic / Chapter 進度（已答、答對、答錯、完成 %、還差多少 %）
 * 6. 追蹤每日練習記錄（依 YYYY-MM-DD 分類，支援日期篩選與逐題作答明細檢視）
 * 7. Firebase Firestore 雲端即時同步 (users_progress 集合，結構同 users 資料夾)
 * ============================================================================
 */

(function (window) {
  'use strict';

  const TOTAL_QB_QUESTIONS = 5309;
  const ADMIN_ID = 'wesley';
  const ADMIN_PASS = '2007Wesley';
  const STORAGE_PREFIX = 'CHEM_USERLOG_V47_';

  class ChemUserLogEngine {
    constructor() {
      this.totalAppQuestions = TOTAL_QB_QUESTIONS;
      this.firebaseApp = null;
      this.auth = null;
      this.db = null;
      this.firestoreFns = null;
      this.authFns = null;

      // 當前用戶資訊
      this.currentUser = null; // { uid, studentId, className, classNo, isAdmin, email }
      this.isAdminMode = false;

      // 核心數據狀態
      this.state = {
        studentId: 'GUEST',
        className: '',
        classNo: 0,
        currentStreak: 0,
        bestStreak: 0,
        // 永久唯一題目紀錄: { [qId]: { qId, qNumDisplay, chapId, chosen, correctAns, correct, firstDate, lastDate, attempts } }
        uniqueAnswers: {},
        // 當前未結束的 MC 練習暫存: { [chapId]: { [qId]: { chosen, correct, answer, timestamp } } }
        sessionAnswers: {},
        // 每日練習明細紀錄: { ['YYYY-MM-DD']: { count, correctCount, wrongCount, items: [ { qId, qNumDisplay, chapId, chosen, answer, correct, time } ] } }
        dailyLogs: {},
        // 各章節題目總數快取: { ['e_44']: 132 }
        chapterCounts: {},
        // 最近練習的課題與章節資訊
        recentTopic: {
          chapId: null,
          topicId: '',
          topicName: '',
          chapterName: '',
          answered: 0,
          correct: 0,
          wrong: 0,
          totalInChapter: 0,
          completionRate: 0,
          remainingRate: 100,
          accuracyRate: 0,
          lastUpdated: ''
        },
        lastSyncedAt: ''
      };

      this.onStateChangeCallbacks = [];
      this.onAuthChangeCallbacks = [];
    }

    // ==========================================================================
    // 1. 狀態監聽與通知機制 (供 app.js 綁定 UI 自動更新)
    // ==========================================================================
    onStateChange(cb) {
      if (typeof cb === 'function') this.onStateChangeCallbacks.push(cb);
    }

    onAuthChange(cb) {
      if (typeof cb === 'function') this.onAuthChangeCallbacks.push(cb);
    }

    notifyStateChange() {
      this.onStateChangeCallbacks.forEach(cb => {
        try { cb(this.state); } catch (e) { console.error(e); }
      });
    }

    notifyAuthChange() {
      this.onAuthChangeCallbacks.forEach(cb => {
        try { cb(this.currentUser, this.isAdminMode); } catch (e) { console.error(e); }
      });
    }

    // ==========================================================================
    // 2. 學號格式驗證與解析 (5a/b/c/d + 1~35 或 Admin Wesley)
    // ==========================================================================
    parseAndValidateUserId(rawInput) {
      const cleaned = (rawInput || '').trim();
      if (!cleaned) {
        return { valid: false, error: '請輸入用戶 ID！' };
      }

      // 檢查是否為管理員 Wesley
      if (cleaned.toLowerCase() === ADMIN_ID) {
        return {
          valid: true,
          isAdmin: true,
          studentId: 'WESLEY',
          className: 'ADMIN',
          classNo: 0,
          syntheticEmail: 'wesley_admin@dsechem.edu'
        };
      }

      // 檢查學生格式: 5a/b/c/d + 1~35
      const match = cleaned.toLowerCase().match(/^5([abcd])([1-9]|[1-2][0-9]|3[0-5])$/);
      if (!match) {
        return {
          valid: false,
          error: '格式錯誤！學生 ID 必須是 5A、5B、5C 或 5D 開頭，後面接 1 到 35 的數字（例如 5A12、5D28）。'
        };
      }

      const classLetter = match[1].toUpperCase();
      const classNumber = parseInt(match[2], 10);
      const normalizedId = `5${classLetter}${classNumber}`;

      return {
        valid: true,
        isAdmin: false,
        studentId: normalizedId,
        className: `5${classLetter}`,
        classNo: classNumber,
        syntheticEmail: `${normalizedId.toLowerCase()}@dsechem.edu`
      };
    }

    // ==========================================================================
    // 3. 本機儲存 (LocalStorage) 讀寫與舊版資料無縫遷移
    // ==========================================================================
    getStorageKey(userId) {
      const id = (userId || this.state.studentId || 'GUEST').toUpperCase();
      return `${STORAGE_PREFIX}${id}`;
    }

    loadLocalState(studentId) {
      const targetId = (studentId || 'GUEST').toUpperCase();
      const key = this.getStorageKey(targetId);

      // 重置為預設乾淨結構
      this.state = {
        studentId: targetId,
        className: targetId.startsWith('5') ? targetId.slice(0, 2) : 'ADMIN',
        classNo: targetId.startsWith('5') ? parseInt(targetId.slice(2), 10) || 0 : 0,
        currentStreak: 0,
        bestStreak: 0,
        uniqueAnswers: {},
        sessionAnswers: {},
        dailyLogs: {},
        chapterCounts: this.state.chapterCounts || {},
        recentTopic: {
          chapId: null,
          topicId: '',
          topicName: '',
          chapterName: '',
          answered: 0,
          correct: 0,
          wrong: 0,
          totalInChapter: 0,
          completionRate: 0,
          remainingRate: 100,
          accuracyRate: 0,
          lastUpdated: ''
        },
        lastSyncedAt: ''
      };

      try {
        // 先讀取共用章節題數快取
        const savedCounts = localStorage.getItem('CHEM_COUNTS_V46') || localStorage.getItem('CHEM_COUNTS_V47');
        if (savedCounts) {
          this.state.chapterCounts = Object.assign({}, this.state.chapterCounts, JSON.parse(savedCounts));
        }

        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          this.mergeExternalData(parsed);
        } else {
          // 嘗試遷移舊版 v46 的資料
          const legacyAns = localStorage.getItem('CHEM_USER_ANS_V46');
          const legacyStreak = localStorage.getItem('CHEM_STREAK_V46');
          if (legacyAns && targetId !== 'GUEST' && targetId !== 'WESLEY') {
            const parsedLegacy = JSON.parse(legacyAns);
            this.migrateLegacyAnswers(parsedLegacy, legacyStreak ? parseInt(legacyStreak, 10) : 0);
          }
        }
      } catch (e) {
        console.warn('讀取本機紀錄失敗:', e);
      }

      this.recalculateRecentTopic();
    }

    saveLocalState() {
      try {
        const key = this.getStorageKey(this.state.studentId);
        localStorage.setItem(key, JSON.stringify(this.state));
        localStorage.setItem('CHEM_COUNTS_V47', JSON.stringify(this.state.chapterCounts));
      } catch (e) {
        console.warn('儲存本機紀錄失敗:', e);
      }
    }

    // 將舊版簡易 answers 轉換為完整結構
    migrateLegacyAnswers(legacyAnswersObj, legacyStreak = 0) {
      if (!legacyAnswersObj || typeof legacyAnswersObj !== 'object') return;
      Object.entries(legacyAnswersObj).forEach(([qId, val]) => {
        const record = typeof val === 'string' ? { chosen: val, correct: false, date: '' } : val;
        const match = qId.match(/^(.*)_ch(\d+)$/);
        const qNumDisplay = match ? match[1] : qId;
        const chapId = match ? parseInt(match[2], 10) : 1;
        const dateStr = record.date || new Date().toISOString().slice(0, 10);

        this.state.uniqueAnswers[qId] = {
          qId,
          qNumDisplay,
          chapId,
          chosen: record.chosen || 'A',
          correctAns: record.answer || '',
          correct: !!record.correct,
          firstDate: dateStr,
          lastDate: dateStr,
          attempts: 1
        };

        if (!this.state.dailyLogs[dateStr]) {
          this.state.dailyLogs[dateStr] = { count: 0, correctCount: 0, wrongCount: 0, items: [] };
        }
        const dayLog = this.state.dailyLogs[dateStr];
        if (!dayLog.items.some(it => it.qId === qId)) {
          dayLog.items.push({
            qId,
            qNumDisplay,
            chapId,
            chosen: record.chosen || 'A',
            answer: record.answer || '',
            correct: !!record.correct,
            time: '歷史紀錄'
          });
          dayLog.count = dayLog.items.length;
          dayLog.correctCount = dayLog.items.filter(i => i.correct).length;
          dayLog.wrongCount = dayLog.items.filter(i => !i.correct).length;
        }
      });

      if (legacyStreak > 0) {
        this.state.currentStreak = legacyStreak;
        this.state.bestStreak = Math.max(this.state.bestStreak, legacyStreak);
      }
    }

    // 合併來自雲端或本機的資料
    mergeExternalData(data) {
      if (!data || typeof data !== 'object') return;

      if (data.studentId) this.state.studentId = data.studentId;
      if (data.className) this.state.className = data.className;
      if (data.classNo) this.state.classNo = data.classNo;

      if (typeof data.currentStreak === 'number') this.state.currentStreak = data.currentStreak;
      else if (typeof data.streak === 'number') this.state.currentStreak = data.streak;

      if (typeof data.bestStreak === 'number') {
        this.state.bestStreak = Math.max(this.state.bestStreak, data.bestStreak, this.state.currentStreak);
      }

      if (data.chapterCounts && typeof data.chapterCounts === 'object') {
        this.state.chapterCounts = Object.assign({}, this.state.chapterCounts, data.chapterCounts);
      } else if (data.counts && typeof data.counts === 'object') {
        this.state.chapterCounts = Object.assign({}, this.state.chapterCounts, data.counts);
      }

      // 合併 uniqueAnswers
      if (data.uniqueAnswers && typeof data.uniqueAnswers === 'object') {
        this.state.uniqueAnswers = Object.assign({}, this.state.uniqueAnswers, data.uniqueAnswers);
      } else if (data.answers && typeof data.answers === 'object') {
        this.migrateLegacyAnswers(data.answers, data.streak || 0);
      }

      // 合併 sessionAnswers
      if (data.sessionAnswers && typeof data.sessionAnswers === 'object') {
        this.state.sessionAnswers = Object.assign({}, this.state.sessionAnswers, data.sessionAnswers);
      }

      // 合併 dailyLogs
      if (data.dailyLogs && typeof data.dailyLogs === 'object') {
        Object.entries(data.dailyLogs).forEach(([dateStr, logObj]) => {
          if (!this.state.dailyLogs[dateStr]) {
            this.state.dailyLogs[dateStr] = logObj;
          } else {
            const existingItems = this.state.dailyLogs[dateStr].items || [];
            const incomingItems = logObj.items || [];
            const mapByKey = {};
            existingItems.concat(incomingItems).forEach(item => {
              const k = `${item.qId}_${item.time || ''}`;
              mapByKey[k] = item;
            });
            const mergedItems = Object.values(mapByKey);
            this.state.dailyLogs[dateStr] = {
              count: mergedItems.length,
              correctCount: mergedItems.filter(i => i.correct).length,
              wrongCount: mergedItems.filter(i => !i.correct).length,
              items: mergedItems
            };
          }
        });
      }

      if (data.recentTopic && typeof data.recentTopic === 'object' && data.recentTopic.chapId) {
        this.state.recentTopic = Object.assign({}, this.state.recentTopic, data.recentTopic);
      }
    }

    // ==========================================================================
    // 4. 答題核心互動邏輯 (Streak、Session 保留、結束清零、不重複灌水)
    // ==========================================================================

    /**
     * 當學生進入某個章節時呼叫，更新 Recent Topic 的目標章節（不會清除未結束的作答！）
     */
    setActiveChapter(chapId, totalQuestionsInChapter = null, lang = 'e') {
      const numChapId = parseInt(chapId, 10);
      if (!numChapId) return;

      if (totalQuestionsInChapter !== null && totalQuestionsInChapter > 0) {
        this.state.chapterCounts[`${lang}_${numChapId}`] = totalQuestionsInChapter;
      }

      if (!this.state.sessionAnswers[numChapId]) {
        this.state.sessionAnswers[numChapId] = {};
      }

      this.state.recentTopic.chapId = numChapId;
      this.recalculateRecentTopic(numChapId, lang);
      this.saveLocalState();
      this.syncToCloud();
      this.notifyStateChange();
    }

    /**
     * 取得某章節某題在「當前尚未結束的 MC 練習 (Session)」中的作答紀錄
     * 這保證了開關「目錄選單」或切回章節時，剛才選過的選項依然顯示，直到按「結束當前 MC」才清零！
     */
    getSessionAnswer(chapId, qId) {
      const chapSession = this.state.sessionAnswers[chapId];
      if (!chapSession) return null;
      return chapSession[qId] || null;
    }

    /**
     * 當學生點擊某題的 A / B / C / D 選項時呼叫
     */
    recordQuestionAnswer({ qId, qNumDisplay, chapId, chosen, correctAns, lang = 'e' }) {
      const numChapId = parseInt(chapId, 10);
      const isCorrect = (chosen === correctAns);
      const now = new Date();
      const todayStr = now.toISOString().slice(0, 10);
      const timeStr = now.toTimeString().slice(0, 8);

      if (!this.state.sessionAnswers[numChapId]) {
        this.state.sessionAnswers[numChapId] = {};
      }

      const prevSessionRecord = this.state.sessionAnswers[numChapId][qId];

      // 1. 更新 Streak 邏輯：
      // - 如果這題在「當次 MC Session」還沒答過：答對 Streak + 1，答錯 Streak 歸零
      // - 如果這題在當次 Session 已經答過，又改選錯的：Streak 歸零；若原本答對又狂按同一個正確選項：不重複加 Streak！
      if (!prevSessionRecord) {
        if (isCorrect) {
          this.state.currentStreak += 1;
          if (this.state.currentStreak > this.state.bestStreak) {
            this.state.bestStreak = this.state.currentStreak;
          }
        } else {
          this.state.currentStreak = 0;
        }
      } else {
        if (!isCorrect) {
          this.state.currentStreak = 0;
        }
      }

      // 2. 寫入當次 Session 紀錄（開關目錄不會消失）
      this.state.sessionAnswers[numChapId][qId] = {
        qId,
        qNumDisplay: qNumDisplay || qId,
        chapId: numChapId,
        chosen,
        answer: correctAns,
        correct: isCorrect,
        timestamp: now.toISOString()
      };

      // 3. 更新永久唯一題庫紀錄 (uniqueAnswers)：
      // 「一個帳號做一題只加一次」——使用 qId 作為唯一 Key，重複做只更新狀態與練習次數，Object.keys 長度永遠不重複灌水！
      const existingUnique = this.state.uniqueAnswers[qId];
      this.state.uniqueAnswers[qId] = {
        qId,
        qNumDisplay: qNumDisplay || qId,
        chapId: numChapId,
        chosen,
        correctAns,
        correct: isCorrect,
        firstDate: existingUnique ? existingUnique.firstDate : todayStr,
        lastDate: todayStr,
        attempts: existingUnique ? (existingUnique.attempts || 1) + 1 : 1
      };

      // 4. 更新每日練習記錄 (dailyLogs)
      if (!this.state.dailyLogs[todayStr]) {
        this.state.dailyLogs[todayStr] = {
          count: 0,
          correctCount: 0,
          wrongCount: 0,
          items: []
        };
      }
      const todayLog = this.state.dailyLogs[todayStr];
      const existingDayItemIdx = todayLog.items.findIndex(item => item.qId === qId);
      const logItem = {
        qId,
        qNumDisplay: qNumDisplay || qId,
        chapId: numChapId,
        chosen,
        answer: correctAns,
        correct: isCorrect,
        time: timeStr
      };

      // 同一天同一題若修改答案，更新該筆紀錄而不重複灌水當日題數
      if (existingDayItemIdx >= 0) {
        todayLog.items[existingDayItemIdx] = logItem;
      } else {
        todayLog.items.unshift(logItem); // 最新答的排最上面
      }
      todayLog.count = todayLog.items.length;
      todayLog.correctCount = todayLog.items.filter(i => i.correct).length;
      todayLog.wrongCount = todayLog.items.filter(i => !i.correct).length;

      // 5. 重新計算 Recent Topic 統計與完成百分比
      this.recalculateRecentTopic(numChapId, lang);

      // 6. 儲存本機並同步至 Firebase 雲端
      this.saveLocalState();
      this.syncToCloud();
      this.notifyStateChange();

      return {
        isCorrect,
        currentStreak: this.state.currentStreak,
        bestStreak: this.state.bestStreak,
        recentTopic: this.state.recentTopic
      };
    }

    /**
     * 當用戶點擊「結束當前 MC」並完成兩次「是」確認後呼叫！
     * 效果：
     * 1. 清空該章節的當次作答視覺記憶 (sessionAnswers[chapId])，下次再進入該章節時題目選項完全重置！
     * 2. 將當次 Streak 歸零結算。
     * 3. 永久進度 (uniqueAnswers)、Recent Topic 統計、每日練習記錄 (dailyLogs) 完整保留並同步至 Firebase！
     */
    finalizeAndResetChapterSession(chapId, lang = 'e') {
      const numChapId = parseInt(chapId || this.state.recentTopic.chapId, 10);
      if (numChapId && this.state.sessionAnswers[numChapId]) {
        delete this.state.sessionAnswers[numChapId];
      }
      this.state.currentStreak = 0;

      if (numChapId) {
        this.recalculateRecentTopic(numChapId, lang);
      }

      this.saveLocalState();
      this.syncToCloud();
      this.notifyStateChange();
    }

    /**
     * 計算最近練習課題 (Recent Topic / Chapter) 的進度與「還差多少 % 完成」
     */
    recalculateRecentTopic(chapId = null, lang = null) {
      const targetChapId = parseInt(chapId || this.state.recentTopic.chapId, 10);
      const currentLang = lang || (window.chemApp && window.chemApp.currentLang) || 'e';

      if (!targetChapId) return this.state.recentTopic;

      // 從全局 CHAPTER_MAP 取得課題與章節名稱
      let topicId = '';
      let topicName = '尚未選擇課題';
      let chapterName = `第 ${targetChapId} 章`;

      if (window.CHAPTER_MAP && window.CHAPTER_MAP[targetChapId]) {
        const info = window.CHAPTER_MAP[targetChapId];
        topicId = info.topic.topicId;
        topicName = info.topic.topicName.replace(/^topic\s*\/\s*chapter:\s*/i, '');
        chapterName = info.chapter.name;
      }

      // 找出該章節所有已作答的唯一題目
      const chapUniqueRecords = Object.values(this.state.uniqueAnswers).filter(
        r => parseInt(r.chapId, 10) === targetChapId
      );

      const answered = chapUniqueRecords.length;
      const correct = chapUniqueRecords.filter(r => r.correct).length;
      const wrong = chapUniqueRecords.filter(r => !r.correct).length;

      const countKey = `${currentLang}_${targetChapId}`;
      const fallbackCountKey = `${currentLang === 'e' ? 'c' : 'e'}_${targetChapId}`;
      const totalInChapter =
        this.state.chapterCounts[countKey] ||
        this.state.chapterCounts[fallbackCountKey] ||
        (window.chemApp && window.chemApp.chapterCounts && window.chemApp.chapterCounts[countKey]) ||
        0;

      // 完成率 (根據該課題總題數計算做了多少 %，以及還差多少 %)
      let completionRate = 0;
      if (totalInChapter > 0) {
        completionRate = Math.min(100, Math.round((answered / totalInChapter) * 100));
      } else if (answered > 0) {
        completionRate = Math.min(100, Math.round((correct / answered) * 100));
      }
      const remainingRate = Math.max(0, 100 - completionRate);
      const accuracyRate = answered > 0 ? Math.round((correct / answered) * 100) : 0;

      this.state.recentTopic = {
        chapId: targetChapId,
        topicId,
        topicName,
        chapterName,
        answered,
        correct,
        wrong,
        totalInChapter,
        completionRate,
        remainingRate,
        accuracyRate,
        lastUpdated: new Date().toISOString()
      };

      return this.state.recentTopic;
    }

    /**
     * 取得首頁 Dashboard 所需的所有統計摘要
     */
    getDashboardSummary() {
      const allUnique = Object.values(this.state.uniqueAnswers);
      const totalUniqueAnswered = allUnique.length;
      const totalUniqueCorrect = allUnique.filter(r => r.correct).length;
      const totalUniqueWrong = allUnique.filter(r => !r.correct).length;

      // 全站 5309 題完成度（保留小數點後一位或整數，讓學生做幾題也能看到進度變化）
      const rawPct = (totalUniqueAnswered / TOTAL_QB_QUESTIONS) * 100;
      const overallCompletionText =
        totalUniqueAnswered === 0
          ? '0%'
          : rawPct < 1
          ? `${rawPct.toFixed(2)}%`
          : `${Math.round(rawPct)}%`;

      const overallAccuracyRate =
        totalUniqueAnswered > 0 ? Math.round((totalUniqueCorrect / totalUniqueAnswered) * 100) : 0;

      // 整理每日練習清單（按日期由新到舊排序）
      const sortedDates = Object.keys(this.state.dailyLogs).sort().reverse();
      const dailyList = sortedDates.map(date => ({
        date,
        count: this.state.dailyLogs[date].count || (this.state.dailyLogs[date].items || []).length,
        correctCount: this.state.dailyLogs[date].correctCount || 0,
        wrongCount: this.state.dailyLogs[date].wrongCount || 0,
        items: this.state.dailyLogs[date].items || []
      }));

      this.recalculateRecentTopic();

      return {
        studentId: this.state.studentId,
        isAdmin: this.isAdminMode,
        totalAppQuestions: TOTAL_QB_QUESTIONS,
        totalTopics: 15,
        totalChapters: 65,
        totalUniqueAnswered,
        totalUniqueCorrect,
        totalUniqueWrong,
        overallCompletionText,
        overallAccuracyRate,
        currentStreak: this.state.currentStreak,
        bestStreak: this.state.bestStreak,
        recentTopic: this.state.recentTopic,
        dailyList
      };
    }

    // ==========================================================================
    // 5. Firebase 初始化、雲端同步與登入/註冊控制
    // ==========================================================================
    async initFirebase(firebaseConfig) {
      try {
        const { initializeApp, getApps, getApp } = await import(
          'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
        );
        const {
          getAuth,
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged
        } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js');
        const {
          getFirestore,
          doc,
          setDoc,
          getDoc,
          collection,
          getDocs
        } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');

        this.firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        this.auth = getAuth(this.firebaseApp);
        this.db = getFirestore(this.firebaseApp);
        this.authFns = { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };
        this.firestoreFns = { doc, setDoc, getDoc, collection, getDocs };

        // 監聽登入狀態
        onAuthStateChanged(this.auth, async user => {
          if (user) {
            const emailPrefix = (user.email || '').split('@')[0].toLowerCase();
            const isWesleyAdmin = emailPrefix === 'wesley_admin' || emailPrefix === 'wesley';
            const studentId = isWesleyAdmin ? 'WESLEY' : emailPrefix.toUpperCase();

            this.currentUser = {
              uid: user.uid,
              email: user.email,
              studentId,
              isAdmin: isWesleyAdmin
            };
            this.isAdminMode = isWesleyAdmin;

            // 先載入本機狀態
            this.loadLocalState(studentId);

            // 再從 Firebase 雲端拉取最新紀錄並合併
            await this.pullFromCloud(user.uid, studentId);

            this.notifyAuthChange();
            this.notifyStateChange();
          } else {
            // 如果不是本地 Admin 模式才清空
            if (!this.isAdminMode) {
              this.currentUser = null;
              this.notifyAuthChange();
            }
          }
        });

        return true;
      } catch (e) {
        console.error('Firebase 初始化失敗:', e);
        return false;
      }
    }

    /**
     * 學生或管理員從首頁登入/註冊
     */
    async authenticateUser({ rawId, password, confirmPassword = '', isRegister = false }) {
      const parsed = this.parseAndValidateUserId(rawId);
      if (!parsed.valid) {
        return { ok: false, message: parsed.error };
      }

      if (!password) {
        return { ok: false, message: '請輸入密碼！' };
      }

      // 情況 A：管理員 Wesley 登入 (帳號 Wesley + 密碼 2007Wesley)
      if (parsed.isAdmin) {
        if (password !== ADMIN_PASS) {
          return { ok: false, message: '管理員密碼錯誤！' };
        }
        this.isAdminMode = true;
        this.currentUser = {
          uid: 'ADMIN_WESLEY',
          email: parsed.syntheticEmail,
          studentId: 'WESLEY',
          isAdmin: true
        };
        this.loadLocalState('WESLEY');

        // 嘗試同時在背景登入 Firebase Auth（確保若 Firestore 有權限規則時也能讀取所有學生資料）
        if (this.auth && this.authFns) {
          try {
            await this.authFns.signInWithEmailAndPassword(this.auth, parsed.syntheticEmail, ADMIN_PASS);
          } catch (signInErr) {
            try {
              await this.authFns.createUserWithEmailAndPassword(this.auth, parsed.syntheticEmail, ADMIN_PASS);
            } catch (ignoreErr) {}
          }
        }

        this.notifyAuthChange();
        this.notifyStateChange();
        return { ok: true, isAdmin: true, studentId: 'WESLEY' };
      }

      // 情況 B：一般學生註冊 / 登入 (5A/B/C/D + 1~35)
      if (isRegister && password !== confirmPassword) {
        return { ok: false, message: '兩次輸入的密碼不一致，雙重驗證失敗！' };
      }

      if (!this.auth || !this.authFns) {
        return { ok: false, message: '雲端認證服務尚未就緒，請稍候重試。' };
      }

      try {
        // Firebase Auth 要求密碼至少 6 碼，若學生設定短密碼（因為密碼沒有限制），我們在底層自動補齊安全後綴以支援任意長度密碼！
        const firebaseSafePass = password.length < 6 ? `${password}_chem2026` : password;

        if (isRegister) {
          await this.authFns.createUserWithEmailAndPassword(this.auth, parsed.syntheticEmail, firebaseSafePass);
        } else {
          try {
            await this.authFns.signInWithEmailAndPassword(this.auth, parsed.syntheticEmail, firebaseSafePass);
          } catch (firstErr) {
            // 兼容之前已經用原密碼註冊過的帳號
            await this.authFns.signInWithEmailAndPassword(this.auth, parsed.syntheticEmail, password);
          }
        }
        return { ok: true, isAdmin: false, studentId: parsed.studentId };
      } catch (e) {
        let msg = e.message || '認證失敗';
        if (msg.includes('email-already-in-use')) msg = `學號 ${parsed.studentId} 已經註冊過，請直接切換回「登入」！`;
        else if (msg.includes('invalid-credential') || msg.includes('wrong-password') || msg.includes('user-not-found')) {
          msg = '登入失敗：學號尚未註冊或密碼不正確。';
        }
        return { ok: false, message: msg };
      }
    }

    /**
     * 登出當前帳號
     */
    async logout() {
      this.isAdminMode = false;
      this.currentUser = null;
      if (this.auth && this.authFns) {
        try {
          await this.authFns.signOut(this.auth);
        } catch (e) {}
      }
      this.notifyAuthChange();
    }

    /**
     * 將當前學生的完整作答 Log 同步至 Firebase Firestore (`users_progress` 集合)
     */
    async syncToCloud() {
      if (!this.db || !this.firestoreFns || !this.currentUser || this.isAdminMode) return;
      const uid = this.currentUser.uid;
      const studentId = this.state.studentId;
      if (!uid || studentId === 'GUEST' || studentId === 'WESLEY') return;

      const summary = this.getDashboardSummary();
      const payload = {
        uid,
        studentId,
        className: this.state.className,
        classNo: this.state.classNo,
        email: this.currentUser.email || `${studentId.toLowerCase()}@dsechem.edu`,
        currentStreak: this.state.currentStreak,
        bestStreak: this.state.bestStreak,
        totalUniqueAnswered: summary.totalUniqueAnswered,
        totalUniqueCorrect: summary.totalUniqueCorrect,
        totalUniqueWrong: summary.totalUniqueWrong,
        overallAccuracyRate: summary.overallAccuracyRate,
        recentTopic: this.state.recentTopic,
        uniqueAnswers: this.state.uniqueAnswers,
        dailyLogs: this.state.dailyLogs,
        chapterCounts: this.state.chapterCounts,
        // 兼容舊版欄位
        answers: this.state.uniqueAnswers,
        counts: this.state.chapterCounts,
        streak: this.state.currentStreak,
        lastUpdated: new Date().toISOString()
      };

      try {
        const { doc, setDoc } = this.firestoreFns;
        // 同步寫入 users_progress/{uid}
        await setDoc(doc(this.db, 'users_progress', uid), payload, { merge: true });
        this.state.lastSyncedAt = payload.lastUpdated;
      } catch (e) {
        console.warn('雲端同步失敗:', e);
      }
    }

    /**
     * 從 Firebase 雲端拉取該學生的歷史紀錄
     */
    async pullFromCloud(uid, studentId) {
      if (!this.db || !this.firestoreFns || !uid) return;
      try {
        const { doc, getDoc } = this.firestoreFns;
        const snap = await getDoc(doc(this.db, 'users_progress', uid));
        if (snap.exists()) {
          const cloudData = snap.data();
          this.mergeExternalData(cloudData);
          this.state.studentId = studentId || cloudData.studentId || this.state.studentId;
          this.recalculateRecentTopic();
          this.saveLocalState();
          // 若舊帳號雲端還沒有 studentId 欄位，立刻補寫回雲端，方便 Admin 查閱
          if (!cloudData.studentId && studentId && studentId !== 'WESLEY') {
            this.syncToCloud();
          }
        } else if (studentId && studentId !== 'WESLEY') {
          // 首次建立雲端檔案
          await this.syncToCloud();
        }
      } catch (e) {
        console.warn('從雲端載入紀錄失敗:', e);
      }
    }

    // ==========================================================================
    // 6. 練習記錄日期選擇與明細彈窗 (學生端 & Admin 共用)
    // ==========================================================================
    openDailyLogModal(initialDate = null, customUserState = null) {
      const targetState = customUserState || this.state;
      const dailyLogs = targetState.dailyLogs || {};
      const sortedDates = Object.keys(dailyLogs).sort().reverse();
      const selectedDate = initialDate && dailyLogs[initialDate] ? initialDate : (sortedDates[0] || '');
      const titlePrefix = customUserState ? `學生 [ ${targetState.studentId} ] ` : '';

      let modal = document.getElementById('chemDailyLogInspectorModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'chemDailyLogInspectorModal';
        modal.style.cssText =
          'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.55); z-index:100000; display:none; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;';
        document.body.appendChild(modal);
      }

      const renderModalContent = activeDate => {
        const dayData = dailyLogs[activeDate] || { count: 0, correctCount: 0, wrongCount: 0, items: [] };
        const items = dayData.items || [];
        const dayAcc = dayData.count > 0 ? Math.round((dayData.correctCount / dayData.count) * 100) : 0;

        const dateOptionsHtml =
          sortedDates.length === 0
            ? `<option value="">尚無日期紀錄</option>`
            : sortedDates
                .map(
                  d =>
                    `<option value="${d}" ${d === activeDate ? 'selected' : ''}>📅 ${d} （共答 ${
                      dailyLogs[d].count || (dailyLogs[d].items || []).length
                    } 題）</option>`
                )
                .join('');

        const itemsHtml =
          items.length === 0
            ? `<div style="text-align:center; padding:36px 16px; color:#888; font-size:14px;">該日期尚無作答明細紀錄。</div>`
            : items
                .map((it, idx) => {
                  const chapInfo =
                    window.CHAPTER_MAP && window.CHAPTER_MAP[it.chapId]
                      ? window.CHAPTER_MAP[it.chapId].chapter.name
                      : `第 ${it.chapId} 章`;
                  return `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 14px; background:#fff; border:1px solid #eaeaea; border-radius:14px; margin-bottom:8px;">
                      <div style="display:flex; flex-direction:column; gap:3px;">
                        <div style="font-weight:bold; font-size:14px; color:#111;">
                          ${idx + 1}. ${it.qNumDisplay || it.qId}
                          <span style="font-size:11px; color:#1a73e8; background:#e8f0fe; padding:2px 8px; border-radius:10px; margin-left:6px;">${chapInfo}</span>
                        </div>
                        <div style="font-size:11px; color:#888;">作答時間：${it.time || '--:--:--'}</div>
                      </div>
                      <div style="display:flex; align-items:center; gap:10px; font-size:13px; white-space:nowrap;">
                        <span>選 <b style="color:${it.correct ? '#34a853' : '#ea4335'}; font-size:15px;">${it.chosen}</b></span>
                        ${
                          it.answer
                            ? `<span style="color:#666; font-size:12px;">(正解: <b>${it.answer}</b>)</span>`
                            : ''
                        }
                        <span style="padding:3px 8px; border-radius:10px; font-weight:bold; font-size:12px; background:${
                          it.correct ? '#e6f4ea' : '#fce8e6'
                        }; color:${it.correct ? '#137333' : '#c5221f'};">
                          ${it.correct ? '答對' : '答錯'}
                        </span>
                      </div>
                    </div>
                  `;
                })
                .join('');

        modal.innerHTML = `
          <div style="background:#f8f9fa; width:100%; max-width:520px; max-height:84vh; border-radius:28px; box-shadow:0 14px 44px rgba(0,0,0,0.25); display:flex; flex-direction:column; overflow:hidden; border:1px solid #e0e0e0;">
            <!-- 頂部標題列 -->
            <div style="background:#1a73e8; color:#fff; padding:18px 24px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <h3 style="margin:0; font-size:17px; font-weight:bold;">${titlePrefix}每日練習記錄明細</h3>
                <div style="font-size:12px; opacity:0.9; margin-top:2px;">可自由切換日期查看當日答過的所有題目</div>
              </div>
              <button id="closeDailyInspectorBtn" style="background:rgba(255,255,255,0.2); border:none; color:#fff; width:32px; height:32px; border-radius:16px; font-size:20px; cursor:pointer; line-height:1;">&times;</button>
            </div>

            <!-- 日期選擇器與當日統計 -->
            <div style="padding:16px 20px; background:#fff; border-bottom:1px solid #e0e0e0;">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                <label style="font-size:13px; font-weight:bold; color:#333; white-space:nowrap;">選擇日期：</label>
                <select id="dailyInspectorDateSelect" style="flex:1; padding:8px 12px; border-radius:12px; border:1px solid #ccc; font-size:13px; font-weight:bold; color:#1a73e8; background:#f8fafd; cursor:pointer;">
                  ${dateOptionsHtml}
                </select>
                <input type="date" id="dailyInspectorDatePicker" value="${activeDate}" style="padding:7px 10px; border-radius:12px; border:1px solid #ccc; font-size:12px; cursor:pointer;" />
              </div>

              <div style="display:flex; justify-content:space-around; background:#f8fafd; padding:10px; border-radius:16px; border:1px solid #e0e0e0; text-align:center;">
                <div>
                  <div style="font-size:11px; color:#666;">當日作答</div>
                  <div style="font-size:16px; font-weight:bold; color:#1a73e8;">${dayData.count || items.length} 題</div>
                </div>
                <div>
                  <div style="font-size:11px; color:#666;">答對</div>
                  <div style="font-size:16px; font-weight:bold; color:#34a853;">${dayData.correctCount || 0} 題</div>
                </div>
                <div>
                  <div style="font-size:11px; color:#666;">答錯</div>
                  <div style="font-size:16px; font-weight:bold; color:#ea4335;">${dayData.wrongCount || 0} 題</div>
                </div>
                <div>
                  <div style="font-size:11px; color:#666;">當日正確率</div>
                  <div style="font-size:16px; font-weight:bold; color:#fbbc05;">${dayAcc}%</div>
                </div>
              </div>
            </div>

            <!-- 題目明細列表 -->
            <div style="flex:1; overflow-y:auto; padding:16px 20px;">
              ${itemsHtml}
            </div>
          </div>
        `;

        modal.querySelector('#closeDailyInspectorBtn').onclick = () => {
          modal.style.display = 'none';
        };

        const selectEl = modal.querySelector('#dailyInspectorDateSelect');
        const pickerEl = modal.querySelector('#dailyInspectorDatePicker');

        selectEl.onchange = e => {
          if (e.target.value) renderModalContent(e.target.value);
        };
        pickerEl.onchange = e => {
          if (e.target.value) renderModalContent(e.target.value);
        };
      };

      renderModalContent(selectedDate || new Date().toISOString().slice(0, 10));
      modal.style.display = 'flex';
    }

    // ==========================================================================
    // 7. Admin 管理員驗證接口與全站學生 Log 控制台 (密碼: 2007Wesley)
    // ==========================================================================

    /**
     * 彈出本地 Admin 密碼驗證框（輸入 2007Wesley 即可進入後台）
     */
    promptAdminAccess() {
      if (this.isAdminMode) {
        this.openAdminPanel();
        return;
      }

      let pwdModal = document.getElementById('chemAdminPassModal');
      if (!pwdModal) {
        pwdModal = document.createElement('div');
        pwdModal.id = 'chemAdminPassModal';
        pwdModal.style.cssText =
          'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.55); z-index:100001; display:none; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;';
        document.body.appendChild(pwdModal);
      }

      pwdModal.innerHTML = `
        <div style="background:#fff; width:100%; max-width:360px; padding:28px; border-radius:28px; box-shadow:0 12px 40px rgba(0,0,0,0.25); text-align:center; border:1px solid #e0e0e0;">
          <h3 style="margin:0 0 8px 0; color:#1a73e8; font-size:18px;">Admin 管理員接口</h3>
          <p style="margin:0 0 18px 0; font-size:12px; color:#666;">請輸入管理員密碼以查閱全體學生作答 Log</p>
          <input type="password" id="adminLocalPassInput" placeholder="輸入管理員密碼" style="width:100%; padding:10px 14px; border:1px solid #ccc; border-radius:12px; font-size:14px; box-sizing:border-box; margin-bottom:10px;" />
          <div id="adminLocalPassErr" style="color:#ea4335; font-size:12px; font-weight:bold; min-height:18px; margin-bottom:10px;"></div>
          <div style="display:flex; gap:10px;">
            <button id="adminPassConfirmBtn" style="flex:1; background:#1a73e8; color:#fff; border:none; padding:10px; border-radius:12px; font-weight:bold; font-size:14px; cursor:pointer;">進入後台</button>
            <button id="adminPassCancelBtn" style="flex:1; background:#f1f3f4; color:#333; border:1px solid #ccc; padding:10px; border-radius:12px; font-weight:bold; font-size:14px; cursor:pointer;">取消</button>
          </div>
        </div>
      `;

      pwdModal.style.display = 'flex';
      const inputEl = pwdModal.querySelector('#adminLocalPassInput');
      const errEl = pwdModal.querySelector('#adminLocalPassErr');
      inputEl.focus();

      const verify = () => {
        if (inputEl.value === ADMIN_PASS) {
          pwdModal.style.display = 'none';
          this.openAdminPanel();
        } else {
          errEl.textContent = '密碼錯誤！請輸入正確的 Admin 密碼。';
        }
      };

      pwdModal.querySelector('#adminPassConfirmBtn').onclick = verify;
      inputEl.onkeydown = e => {
        if (e.key === 'Enter') verify();
      };
      pwdModal.querySelector('#adminPassCancelBtn').onclick = () => {
        pwdModal.style.display = 'none';
      };
    }

    /**
     * 從 Firebase Firestore 讀取 `users_progress` 下所有學生的檔案
     */
    async fetchAllUsersFromCloud() {
      const usersMap = {};

      // 1. 先從 Firebase 雲端抓取所有學生紀錄
      if (this.db && this.firestoreFns) {
        try {
          const { collection, getDocs } = this.firestoreFns;
          const snap = await getDocs(collection(this.db, 'users_progress'));
          snap.forEach(docSnap => {
            const d = docSnap.data();
            const rawEmailPrefix = d.email ? d.email.split('@')[0].toUpperCase() : '';
            const sid = (d.studentId || rawEmailPrefix || docSnap.id).toUpperCase();
            if (sid === 'WESLEY' || sid === 'WESLEY_ADMIN' || sid === 'GUEST') return;

            // 正規化舊版與新版結構
            const uniqueAns = d.uniqueAnswers || d.answers || {};
            const ansList = Object.values(uniqueAns).map(v =>
              typeof v === 'string' ? { chosen: v, correct: false, date: '' } : v
            );
            const totalAns = ansList.length;
            const totalCor = ansList.filter(r => r.correct).length;
            const totalWrg = totalAns - totalCor;
            const accRate = totalAns > 0 ? Math.round((totalCor / totalAns) * 100) : 0;

            // 若舊版資料無 dailyLogs，動態從 answers 建立
            let dailyLogs = d.dailyLogs || {};
            if (Object.keys(dailyLogs).length === 0 && Object.keys(uniqueAns).length > 0) {
              dailyLogs = {};
              Object.entries(uniqueAns).forEach(([qId, val]) => {
                const rec = typeof val === 'string' ? { chosen: val, correct: false, date: '未知日期' } : val;
                const dt = rec.lastDate || rec.date || '未知日期';
                const match = qId.match(/^(.*)_ch(\d+)$/);
                const qNumDisplay = match ? match[1] : qId;
                const chapId = match ? parseInt(match[2], 10) : 1;
                if (!dailyLogs[dt]) dailyLogs[dt] = { count: 0, correctCount: 0, wrongCount: 0, items: [] };
                dailyLogs[dt].items.push({
                  qId,
                  qNumDisplay,
                  chapId,
                  chosen: rec.chosen || 'A',
                  answer: rec.correctAns || '',
                  correct: !!rec.correct,
                  time: '雲端同步'
                });
                dailyLogs[dt].count = dailyLogs[dt].items.length;
                dailyLogs[dt].correctCount = dailyLogs[dt].items.filter(i => i.correct).length;
                dailyLogs[dt].wrongCount = dailyLogs[dt].items.filter(i => !i.correct).length;
              });
            }

            usersMap[sid] = {
              uid: docSnap.id,
              studentId: sid,
              className: d.className || (sid.startsWith('5') ? sid.slice(0, 2) : 'OTHER'),
              classNo: d.classNo || (sid.startsWith('5') ? parseInt(sid.slice(2), 10) || 99 : 99),
              totalAnswered: totalAns,
              totalCorrect: totalCor,
              totalWrong: totalWrg,
              accuracyRate: accRate,
              completionPct: ((totalAns / TOTAL_QB_QUESTIONS) * 100).toFixed(2),
              currentStreak: d.currentStreak ?? d.streak ?? 0,
              bestStreak: d.bestStreak ?? d.streak ?? 0,
              recentTopic: d.recentTopic || null,
              uniqueAnswers: uniqueAns,
              dailyLogs,
              lastUpdated: d.lastUpdated || ''
            };
          });
        } catch (e) {
          console.error('Admin 讀取雲端集合失敗:', e);
        }
      }

      // 2. 合併本機 LocalStorage 中儲存過的學生紀錄（確保離線或同機測試也能馬上看到）
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX)) {
          try {
            const localData = JSON.parse(localStorage.getItem(k));
            const sid = (localData.studentId || '').toUpperCase();
            if (sid && sid !== 'WESLEY' && sid !== 'GUEST' && !usersMap[sid]) {
              const uniqueAns = localData.uniqueAnswers || {};
              const ansList = Object.values(uniqueAns);
              const totalAns = ansList.length;
              const totalCor = ansList.filter(r => r.correct).length;
              usersMap[sid] = {
                uid: 'LOCAL_' + sid,
                studentId: sid,
                className: localData.className || sid.slice(0, 2),
                classNo: localData.classNo || parseInt(sid.slice(2), 10) || 99,
                totalAnswered: totalAns,
                totalCorrect: totalCor,
                totalWrong: totalAns - totalCor,
                accuracyRate: totalAns > 0 ? Math.round((totalCor / totalAns) * 100) : 0,
                completionPct: ((totalAns / TOTAL_QB_QUESTIONS) * 100).toFixed(2),
                currentStreak: localData.currentStreak || 0,
                bestStreak: localData.bestStreak || 0,
                recentTopic: localData.recentTopic || null,
                uniqueAnswers: uniqueAns,
                dailyLogs: localData.dailyLogs || {},
                lastUpdated: localData.lastSyncedAt || '本機紀錄'
              };
            }
          } catch (e) {}
        }
      }

      // 依班別 (5A -> 5B -> 5C -> 5D) 與學號 (1 ~ 35) 排序
      return Object.values(usersMap).sort((a, b) => {
        if (a.className !== b.className) return a.className.localeCompare(b.className);
        return (a.classNo || 99) - (b.classNo || 99);
      });
    }

    /**
     * 開啟 Admin 管理員全屏面板（查看所有學生進度、篩選班別、點開單一學生每日答題 Log）
     */
    async openAdminPanel() {
      let panel = document.getElementById('chemAdminFullModal');
      if (!panel) {
        panel = document.createElement('div');
        panel.id = 'chemAdminFullModal';
        panel.style.cssText =
          'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.6); z-index:99999; display:none; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;';
        document.body.appendChild(panel);
      }

      panel.style.display = 'flex';
      panel.innerHTML = `
        <div style="background:#fff; padding:40px; border-radius:28px; text-align:center; font-weight:bold; color:#1a73e8;">
          正在從 Firebase 雲端載入全體學生作答 Log...
        </div>
      `;

      let allUsers = await this.fetchAllUsersFromCloud();
      let activeClassFilter = 'ALL';
      let searchKeyword = '';

      const renderAdminUI = () => {
        const filtered = allUsers.filter(u => {
          const matchClass = activeClassFilter === 'ALL' || u.className === activeClassFilter;
          const matchSearch =
            !searchKeyword || u.studentId.toLowerCase().includes(searchKeyword.toLowerCase());
          return matchClass && matchSearch;
        });

        const rowsHtml =
          filtered.length === 0
            ? `<div style="text-align:center; padding:40px; color:#888; background:#fff; border-radius:20px; border:1px solid #e0e0e0;">目前尚無符合條件的學生作答紀錄。</div>`
            : filtered
                .map(u => {
                  const recentText =
                    u.recentTopic && u.recentTopic.chapId
                      ? `${u.recentTopic.topicName || ''} ${u.recentTopic.chapterName || ''} (還差 ${
                          u.recentTopic.remainingRate ?? 100
                        }%)`
                      : '尚未開始練習';
                  const updatedTime = u.lastUpdated ? u.lastUpdated.slice(0, 19).replace('T', ' ') : '--';

                  return `
                    <div style="background:#fff; border:1px solid #e0e0e0; border-radius:20px; padding:16px 20px; margin-bottom:12px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                      <div style="min-width:180px; flex:1;">
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                          <span style="background:#1a73e8; color:#fff; font-weight:bold; font-size:14px; padding:3px 10px; border-radius:10px;">${u.studentId}</span>
                          <span style="font-size:12px; color:#666; font-weight:bold;">Streak: ${u.currentStreak} (最高 ${u.bestStreak})</span>
                        </div>
                        <div style="font-size:12px; color:#333; margin-top:4px;"><b>最近課題：</b>${recentText}</div>
                        <div style="font-size:11px; color:#888; margin-top:2px;">最後更新：${updatedTime}</div>
                      </div>

                      <div style="display:flex; gap:14px; text-align:center; align-items:center; flex-wrap:wrap;">
                        <div>
                          <div style="font-size:11px; color:#888;">已答 / 5309</div>
                          <div style="font-size:15px; font-weight:bold; color:#1a73e8;">${u.totalAnswered} <span style="font-size:11px;">(${u.completionPct}%)</span></div>
                        </div>
                        <div>
                          <div style="font-size:11px; color:#888;">答對</div>
                          <div style="font-size:15px; font-weight:bold; color:#34a853;">${u.totalCorrect}</div>
                        </div>
                        <div>
                          <div style="font-size:11px; color:#888;">答錯</div>
                          <div style="font-size:15px; font-weight:bold; color:#ea4335;">${u.totalWrong}</div>
                        </div>
                        <div>
                          <div style="font-size:11px; color:#888;">答對率</div>
                          <div style="font-size:15px; font-weight:bold; color:#fbbc05;">${u.accuracyRate}%</div>
                        </div>
                        <button class="admin-inspect-user-btn" data-sid="${u.studentId}" style="background:#e8f0fe; color:#1a73e8; border:1px solid #1a73e8; padding:8px 14px; border-radius:14px; font-weight:bold; font-size:12px; cursor:pointer;">查看每日 Log</button>
                      </div>
                    </div>
                  `;
                })
                .join('');

        panel.innerHTML = `
          <div style="background:#f4f6f9; width:100%; max-width:780px; height:88vh; border-radius:28px; box-shadow:0 16px 48px rgba(0,0,0,0.3); display:flex; flex-direction:column; overflow:hidden; border:1px solid #d0d7de;">
            <!-- 頂部列 -->
            <div style="background:#111827; color:#fff; padding:18px 24px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <h2 style="margin:0; font-size:18px; color:#60a5fa;">CHEM QB - Admin 管理員控制台 (Wesley)</h2>
                <div style="font-size:12px; color:#9ca3af; margin-top:2px;">雲端 users_progress 資料夾即時監控 | 總題數基準：${TOTAL_QB_QUESTIONS} 題</div>
              </div>
              <div style="display:flex; gap:8px; align-items:center;">
                <button id="adminRefreshCloudBtn" style="background:#2563eb; color:#fff; border:none; padding:7px 12px; border-radius:12px; font-size:12px; font-weight:bold; cursor:pointer;">重新整理雲端</button>
                <button id="adminExportJsonBtn" style="background:#059669; color:#fff; border:none; padding:7px 12px; border-radius:12px; font-size:12px; font-weight:bold; cursor:pointer;">匯出全部 Log</button>
                <button id="adminClosePanelBtn" style="background:rgba(255,255,255,0.15); color:#fff; border:none; width:34px; height:34px; border-radius:17px; font-size:20px; cursor:pointer;">&times;</button>
              </div>
            </div>

            <!-- 篩選與搜尋列 -->
            <div style="background:#fff; padding:14px 24px; border-bottom:1px solid #e0e0e0; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:10px;">
              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                ${['ALL', '5A', '5B', '5C', '5D']
                  .map(
                    cls => `
                  <button class="admin-cls-filter-btn" data-cls="${cls}" style="padding:6px 14px; border-radius:14px; border:1px solid ${
                      activeClassFilter === cls ? '#1a73e8' : '#dadce0'
                    }; background:${activeClassFilter === cls ? '#1a73e8' : '#f8f9fa'}; color:${
                      activeClassFilter === cls ? '#fff' : '#333'
                    }; font-weight:bold; font-size:12px; cursor:pointer;">
                    ${cls === 'ALL' ? `全部學生 (${allUsers.length})` : `${cls} 班`}
                  </button>
                `
                  )
                  .join('')}
              </div>
              <input type="text" id="adminSearchStudentInput" value="${searchKeyword}" placeholder="搜尋學號 (如 5D28)..." style="padding:7px 14px; border:1px solid #ccc; border-radius:14px; font-size:13px; width:160px;" />
            </div>

            <!-- 學生清單 -->
            <div style="flex:1; overflow-y:auto; padding:18px 24px;">
              ${rowsHtml}
            </div>
          </div>
        `;

        panel.querySelector('#adminClosePanelBtn').onclick = () => {
          panel.style.display = 'none';
        };

        panel.querySelector('#adminRefreshCloudBtn').onclick = async () => {
          allUsers = await this.fetchAllUsersFromCloud();
          renderAdminUI();
        };

        panel.querySelector('#adminExportJsonBtn').onclick = () => {
          const blob = new Blob([JSON.stringify(allUsers, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `chemqb_users_log_${new Date().toISOString().slice(0, 10)}.json`;
          a.click();
          URL.revokeObjectURL(url);
        };

        panel.querySelectorAll('.admin-cls-filter-btn').forEach(btn => {
          btn.onclick = e => {
            activeClassFilter = e.currentTarget.getAttribute('data-cls');
            renderAdminUI();
          };
        });

        const searchInput = panel.querySelector('#adminSearchStudentInput');
        searchInput.oninput = e => {
          searchKeyword = e.target.value;
          renderAdminUI();
          const newInput = panel.querySelector('#adminSearchStudentInput');
          if (newInput) {
            newInput.focus();
            newInput.setSelectionRange(newInput.value.length, newInput.value.length);
          }
        };

        panel.querySelectorAll('.admin-inspect-user-btn').forEach(btn => {
          btn.onclick = e => {
            const sid = e.currentTarget.getAttribute('data-sid');
            const targetUser = allUsers.find(u => u.studentId === sid);
            if (targetUser) {
              this.openDailyLogModal(null, targetUser);
            }
          };
        });
      };

      renderAdminUI();
    }
  }

  // 掛載至全域 window.ChemUserLog，讓 app.js 可直接調用
  window.ChemUserLog = new ChemUserLogEngine();
})(window);

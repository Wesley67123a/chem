/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Cloud Sync, Login History & Admin Engine
 * File: userlog.js (v3.0.0 - Full Cross-Browser Sync & Login Timestamp Tracker)
 * ============================================================================
 */

(function (window) {
  'use strict';

  const TOTAL_QB_QUESTIONS = 5309;
  const ADMIN_ID = 'wesley';
  const ADMIN_PASS = '2007Wesley';
  const STORAGE_PREFIX = 'CHEM_V3_USER_';

  class ChemUserLogEngine {
    constructor() {
      this.totalAppQuestions = TOTAL_QB_QUESTIONS;
      this.firebaseApp = null;
      this.auth = null;
      this.db = null;
      this.firestoreFns = null;
      this.authFns = null;

      this.currentUser = null;
      this.isAdminMode = false;
      this.cloudStatus = 'connecting'; // 'connecting' | 'synced' | 'error'
      this.cloudErrorMsg = '';

      this.state = this.createEmptyState('GUEST');
      this.onStateChangeCallbacks = [];
      this.onAuthChangeCallbacks = [];
    }

    createEmptyState(studentId = 'GUEST') {
      const sid = (studentId || 'GUEST').toUpperCase();
      return {
        studentId: sid,
        className: sid.startsWith('5') ? sid.slice(0, 2) : 'ADMIN',
        classNo: sid.startsWith('5') ? parseInt(sid.slice(2), 10) || 0 : 0,
        currentStreak: 0,
        bestStreak: 0,
        // 永久唯一題目紀錄: { [qId]: { qId, qNumDisplay, chapId, chosen, correctAns, correct, firstDate, lastDate, attempts } }
        uniqueAnswers: {},
        // 未結束的 MC 練習暫存 (跨瀏覽器雲端保留，直到按「結束當前 MC」才清零): { [chapId]: { [qId]: { chosen, correct, answer, timestamp } } }
        sessionAnswers: {},
        // 每日練習明細: { ['YYYY-MM-DD']: { count, correctCount, wrongCount, items: [] } }
        dailyLogs: {},
        // 所有登入時間紀錄 (最新排最前): [ { timeISO, displayTime, device, browser } ]
        loginHistory: [],
        chapterCounts: {},
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
    }

    onStateChange(cb) { if (typeof cb === 'function') this.onStateChangeCallbacks.push(cb); }
    onAuthChange(cb) { if (typeof cb === 'function') this.onAuthChangeCallbacks.push(cb); }

    notifyStateChange() {
      this.onStateChangeCallbacks.forEach(cb => { try { cb(this.state); } catch (e) {} });
    }

    notifyAuthChange() {
      this.onAuthChangeCallbacks.forEach(cb => { try { cb(this.currentUser, this.isAdminMode); } catch (e) {} });
    }

    // 格式化香港時間 (YYYY-MM-DD HH:mm:ss)
    formatHKTime(dateObj = new Date()) {
      const pad = n => String(n).padStart(2, '0');
      const y = dateObj.getFullYear();
      const m = pad(dateObj.getMonth() + 1);
      const d = pad(dateObj.getDate());
      const hh = pad(dateObj.getHours());
      const mm = pad(dateObj.getMinutes());
      const ss = pad(dateObj.getSeconds());
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }

    getDeviceBrowserInfo() {
      const ua = navigator.userAgent || '';
      let browser = 'Browser';
      if (/CriOS|Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
      else if (/Safari/i.test(ua) && !/Chrome|CriOS/i.test(ua)) browser = 'Safari';
      else if (/Edg/i.test(ua)) browser = 'Edge';
      else if (/Firefox/i.test(ua)) browser = 'Firefox';

      let os = 'Device';
      if (/iPad/i.test(ua)) os = 'iPad';
      else if (/iPhone/i.test(ua)) os = 'iPhone';
      else if (/Macintosh/i.test(ua)) os = 'Mac';
      else if (/Windows/i.test(ua)) os = 'Windows';
      else if (/Android/i.test(ua)) os = 'Android';

      return `${os} (${browser})`;
    }

    parseAndValidateUserId(rawInput) {
      const cleaned = (rawInput || '').trim();
      if (!cleaned) return { valid: false, error: '請輸入用戶 ID！' };

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

      const match = cleaned.toLowerCase().match(/^5([abcd])([1-9]|[1-2][0-9]|3[0-5])$/);
      if (!match) {
        return {
          valid: false,
          error: '格式錯誤！學生 ID 必須是 5A、5B、5C 或 5D 開頭，後面接 1 到 35 的數字（例如 5A1、5D28）。'
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

    getStorageKey(studentId) {
      return `${STORAGE_PREFIX}${(studentId || this.state.studentId || 'GUEST').toUpperCase()}`;
    }

    loadLocalState(studentId) {
      const targetId = (studentId || 'GUEST').toUpperCase();
      this.state = this.createEmptyState(targetId);

      try {
        const savedCounts = localStorage.getItem('CHEM_COUNTS_V47');
        if (savedCounts) {
          this.state.chapterCounts = Object.assign({}, this.state.chapterCounts, JSON.parse(savedCounts));
        }

        // 讀取 V3 或舊版 V47 / USERLOG2 的本機快取
        const keysToTry = [
          this.getStorageKey(targetId),
          `CHEM_USERLOG2_${targetId}`,
          `CHEM_USERLOG_V47_${targetId}`
        ];
        for (const k of keysToTry) {
          const raw = localStorage.getItem(k);
          if (raw) {
            this.mergeExternalData(JSON.parse(raw));
            break;
          }
        }
      } catch (e) {}

      this.recalculateRecentTopic();
    }

    saveLocalState() {
      try {
        if (!this.state.studentId || this.state.studentId === 'GUEST') return;
        localStorage.setItem(this.getStorageKey(this.state.studentId), JSON.stringify(this.state));
        localStorage.setItem('CHEM_COUNTS_V47', JSON.stringify(this.state.chapterCounts));
      } catch (e) {}
    }

    /**
     * 智慧合併本機與雲端資料（確保 Safari 2 題 + Chrome 4 題會自動合併成完整的題數，絕不互相覆蓋丟失！）
     */
    mergeExternalData(data, overwriteSessionFromCloud = false) {
      if (!data || typeof data !== 'object') return;

      if (data.studentId) this.state.studentId = data.studentId.toUpperCase();
      if (data.className) this.state.className = data.className;
      if (data.classNo) this.state.classNo = data.classNo;

      if (typeof data.currentStreak === 'number') {
        this.state.currentStreak = overwriteSessionFromCloud
          ? data.currentStreak
          : Math.max(this.state.currentStreak, data.currentStreak);
      }
      if (typeof data.bestStreak === 'number') {
        this.state.bestStreak = Math.max(this.state.bestStreak, data.bestStreak, this.state.currentStreak);
      }

      if (data.chapterCounts && typeof data.chapterCounts === 'object') {
        this.state.chapterCounts = Object.assign({}, this.state.chapterCounts, data.chapterCounts);
      }

      // 合併永久唯一答題紀錄 (uniqueAnswers)
      const incomingUnique = data.uniqueAnswers || data.answers || {};
      Object.entries(incomingUnique).forEach(([qId, val]) => {
        const rec = typeof val === 'string' ? { chosen: val, correct: false, lastDate: '' } : val;
        const match = qId.match(/^(.*)_ch(\d+)$/);
        const qNumDisplay = rec.qNumDisplay || (match ? match[1] : qId);
        const chapId = rec.chapId || (match ? parseInt(match[2], 10) : 1);
        const dateStr = rec.lastDate || rec.date || new Date().toISOString().slice(0, 10);

        const existing = this.state.uniqueAnswers[qId];
        if (!existing || (rec.lastDate && rec.lastDate >= (existing.lastDate || ''))) {
          this.state.uniqueAnswers[qId] = {
            qId,
            qNumDisplay,
            chapId,
            chosen: rec.chosen || 'A',
            correctAns: rec.correctAns || rec.answer || '',
            correct: !!rec.correct,
            firstDate: existing ? existing.firstDate : (rec.firstDate || dateStr),
            lastDate: dateStr,
            attempts: Math.max(existing ? existing.attempts || 1 : 1, rec.attempts || 1)
          };
        }
      });

      // 合併當次尚未結束的 MC 暫存 (sessionAnswers)
      if (overwriteSessionFromCloud && data.sessionAnswers !== undefined) {
        // 以雲端最新狀態為主，並合併各章節未結束的作答
        const mergedSessions = Object.assign({}, this.state.sessionAnswers);
        Object.entries(data.sessionAnswers || {}).forEach(([chapId, chapObj]) => {
          mergedSessions[chapId] = Object.assign({}, mergedSessions[chapId] || {}, chapObj);
        });
        this.state.sessionAnswers = mergedSessions;
      } else if (data.sessionAnswers && typeof data.sessionAnswers === 'object') {
        Object.entries(data.sessionAnswers).forEach(([chapId, chapObj]) => {
          this.state.sessionAnswers[chapId] = Object.assign({}, this.state.sessionAnswers[chapId] || {}, chapObj);
        });
      }

      // 合併每日練習紀錄 (dailyLogs)
      if (data.dailyLogs && typeof data.dailyLogs === 'object') {
        Object.entries(data.dailyLogs).forEach(([dateStr, logObj]) => {
          if (!this.state.dailyLogs[dateStr]) {
            this.state.dailyLogs[dateStr] = logObj;
          } else {
            const existingItems = this.state.dailyLogs[dateStr].items || [];
            const incomingItems = logObj.items || [];
            const itemMap = {};
            // 以 qId 為唯一索引合併同一天的紀錄
            existingItems.concat(incomingItems).forEach(it => {
              if (it && it.qId) itemMap[it.qId] = it;
            });
            const mergedList = Object.values(itemMap);
            this.state.dailyLogs[dateStr] = {
              count: mergedList.length,
              correctCount: mergedList.filter(i => i.correct).length,
              wrongCount: mergedList.filter(i => !i.correct).length,
              items: mergedList
            };
          }
        });
      }

      // 合併所有登入時間紀錄 (loginHistory)
      if (Array.isArray(data.loginHistory)) {
        const histMap = {};
        (this.state.loginHistory || []).concat(data.loginHistory).forEach(entry => {
          if (entry && entry.displayTime) {
            histMap[entry.displayTime] = entry;
          }
        });
        this.state.loginHistory = Object.values(histMap)
          .sort((a, b) => (b.timeISO || b.displayTime).localeCompare(a.timeISO || a.displayTime))
          .slice(0, 100); // 保留最近 100 次登入紀錄
      }

      if (data.recentTopic && data.recentTopic.chapId) {
        const curTime = this.state.recentTopic.lastUpdated || '';
        const incTime = data.recentTopic.lastUpdated || '';
        if (!this.state.recentTopic.chapId || incTime >= curTime) {
          this.state.recentTopic = Object.assign({}, this.state.recentTopic, data.recentTopic);
        }
      }
    }

    /**
     * 記錄一次用戶登入時間，並立即同步到 Firebase 雲端
     */
    async recordLoginTimestamp() {
      if (!this.state.studentId || this.state.studentId === 'GUEST' || this.state.studentId === 'WESLEY') return;
      const now = new Date();
      const disp = this.formatHKTime(now);
      const dev = this.getDeviceBrowserInfo();

      if (!Array.isArray(this.state.loginHistory)) this.state.loginHistory = [];

      // 避免同一秒重複寫入
      if (!this.state.loginHistory.some(h => h.displayTime === disp)) {
        this.state.loginHistory.unshift({
          timeISO: now.toISOString(),
          displayTime: disp,
          device: dev
        });
      }

      this.saveLocalState();
      await this.syncToCloud();
    }

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

    getSessionAnswer(chapId, qId) {
      const chapSession = this.state.sessionAnswers[chapId];
      if (!chapSession) return null;
      return chapSession[qId] || null;
    }

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

      if (!prevSessionRecord) {
        if (isCorrect) {
          this.state.currentStreak += 1;
          if (this.state.currentStreak > this.state.bestStreak) {
            this.state.bestStreak = this.state.currentStreak;
          }
        } else {
          this.state.currentStreak = 0;
        }
      } else if (!isCorrect) {
        this.state.currentStreak = 0;
      }

      // 1. 寫入未結束的 Session 紀錄（若沒按結束就登出或關閉，下次登入依然保留）
      this.state.sessionAnswers[numChapId][qId] = {
        qId,
        qNumDisplay: qNumDisplay || qId,
        chapId: numChapId,
        chosen,
        answer: correctAns,
        correct: isCorrect,
        timestamp: now.toISOString()
      };

      // 2. 寫入永久唯一題庫紀錄（一個帳號做一題永遠只算 1 題）
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

      // 3. 寫入每日練習記錄
      if (!this.state.dailyLogs[todayStr]) {
        this.state.dailyLogs[todayStr] = { count: 0, correctCount: 0, wrongCount: 0, items: [] };
      }
      const todayLog = this.state.dailyLogs[todayStr];
      const existingIdx = todayLog.items.findIndex(item => item.qId === qId);
      const logItem = {
        qId,
        qNumDisplay: qNumDisplay || qId,
        chapId: numChapId,
        chosen,
        answer: correctAns,
        correct: isCorrect,
        time: timeStr
      };

      if (existingIdx >= 0) todayLog.items[existingIdx] = logItem;
      else todayLog.items.unshift(logItem);

      todayLog.count = todayLog.items.length;
      todayLog.correctCount = todayLog.items.filter(i => i.correct).length;
      todayLog.wrongCount = todayLog.items.filter(i => !i.correct).length;

      this.recalculateRecentTopic(numChapId, lang);
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
     * 只有當用戶點擊「結束當前 MC」並完成兩次確認後，才清空該章節的當次選項與 Streak
     */
    async finalizeAndResetChapterSession(chapId, lang = 'e') {
      const numChapId = parseInt(chapId || this.state.recentTopic.chapId, 10);
      if (numChapId && this.state.sessionAnswers[numChapId]) {
        delete this.state.sessionAnswers[numChapId];
      }
      this.state.currentStreak = 0;

      if (numChapId) {
        this.recalculateRecentTopic(numChapId, lang);
      }

      this.saveLocalState();
      // 強制覆寫雲端上的 sessionAnswers，確保換瀏覽器後該章節也同步重置
      await this.syncToCloud(true);
      this.notifyStateChange();
    }

    recalculateRecentTopic(chapId = null, lang = null) {
      const targetChapId = parseInt(chapId || this.state.recentTopic.chapId, 10);
      const currentLang = lang || (window.chemApp && window.chemApp.currentLang) || 'e';

      if (!targetChapId) return this.state.recentTopic;

      let topicId = '';
      let topicName = '尚未選擇課題';
      let chapterName = `第 ${targetChapId} 章`;

      if (window.CHAPTER_MAP && window.CHAPTER_MAP[targetChapId]) {
        const info = window.CHAPTER_MAP[targetChapId];
        topicId = info.topic.topicId;
        topicName = info.topic.topicName;
        chapterName = info.chapter.name;
      }

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

    getDashboardSummary() {
      const allUnique = Object.values(this.state.uniqueAnswers);
      const totalUniqueAnswered = allUnique.length;
      const totalUniqueCorrect = allUnique.filter(r => r.correct).length;
      const totalUniqueWrong = allUnique.filter(r => !r.correct).length;

      const rawPct = (totalUniqueAnswered / TOTAL_QB_QUESTIONS) * 100;
      const overallCompletionText =
        totalUniqueAnswered === 0
          ? '0%'
          : rawPct < 1
          ? `${rawPct.toFixed(2)}%`
          : `${Math.round(rawPct)}%`;

      const overallAccuracyRate =
        totalUniqueAnswered > 0 ? Math.round((totalUniqueCorrect / totalUniqueAnswered) * 100) : 0;

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
        cloudStatus: this.cloudStatus,
        cloudErrorMsg: this.cloudErrorMsg,
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
        dailyList,
        loginHistory: this.state.loginHistory || []
      };
    }

    // ==========================================================================
    // Firebase 初始化與強制跨瀏覽器雲端同步 (以學號 studentId 作為主鍵！)
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

            // 1. 先載入本機快取
            this.loadLocalState(studentId);

            // 2. 強制從雲端拉取該學號 (studentId) 與舊版 (uid) 的所有資料並合併
            if (!isWesleyAdmin) {
              await this.pullFromCloud(user.uid, studentId);
              await this.recordLoginTimestamp();
            } else {
              this.cloudStatus = 'synced';
            }

            this.notifyAuthChange();
            this.notifyStateChange();
          } else {
            if (!this.isAdminMode) {
              this.currentUser = null;
              this.notifyAuthChange();
            }
          }
        });

        return true;
      } catch (e) {
        console.error('Firebase 初始化失敗:', e);
        this.cloudStatus = 'error';
        this.cloudErrorMsg = e.message;
        return false;
      }
    }

    async authenticateUser({ rawId, password, confirmPassword = '', isRegister = false }) {
      const parsed = this.parseAndValidateUserId(rawId);
      if (!parsed.valid) return { ok: false, message: parsed.error };
      if (!password) return { ok: false, message: '請輸入密碼！' };

      if (parsed.isAdmin) {
        if (password !== ADMIN_PASS) return { ok: false, message: '管理員密碼錯誤！' };
        this.isAdminMode = true;
        this.currentUser = {
          uid: 'ADMIN_WESLEY',
          email: parsed.syntheticEmail,
          studentId: 'WESLEY',
          isAdmin: true
        };
        this.loadLocalState('WESLEY');

        if (this.auth && this.authFns) {
          try {
            await this.authFns.signInWithEmailAndPassword(this.auth, parsed.syntheticEmail, ADMIN_PASS);
          } catch (e) {
            try { await this.authFns.createUserWithEmailAndPassword(this.auth, parsed.syntheticEmail, ADMIN_PASS); } catch (err) {}
          }
        }

        this.cloudStatus = 'synced';
        this.notifyAuthChange();
        this.notifyStateChange();
        return { ok: true, isAdmin: true, studentId: 'WESLEY' };
      }

      if (isRegister && password !== confirmPassword) {
        return { ok: false, message: '兩次輸入的密碼不一致，雙重驗證失敗！' };
      }

      if (!this.auth || !this.authFns) return { ok: false, message: '雲端認證服務正在連線中，請稍候 2 秒再按一次。' };

      try {
        const firebaseSafePass = password.length < 6 ? `${password}_chem2026` : password;
        if (isRegister) {
          await this.authFns.createUserWithEmailAndPassword(this.auth, parsed.syntheticEmail, firebaseSafePass);
        } else {
          try {
            await this.authFns.signInWithEmailAndPassword(this.auth, parsed.syntheticEmail, firebaseSafePass);
          } catch (err) {
            await this.authFns.signInWithEmailAndPassword(this.auth, parsed.syntheticEmail, password);
          }
        }
        return { ok: true, isAdmin: false, studentId: parsed.studentId };
      } catch (e) {
        let msg = e.message || '認證失敗';
        if (msg.includes('email-already-in-use')) msg = `學號 ${parsed.studentId} 已經註冊過，請直接點擊「登入」！`;
        else if (msg.includes('invalid-credential') || msg.includes('wrong-password') || msg.includes('user-not-found')) {
          msg = '登入失敗：學號尚未註冊或密碼不正確。';
        }
        return { ok: false, message: msg };
      }
    }

    async logout() {
      // 登出前強制把未結束的 MC 狀態同步上雲端，確保換機登入時能無縫接續
      if (this.currentUser && !this.isAdminMode) {
        await this.syncToCloud();
      }
      this.isAdminMode = false;
      this.currentUser = null;
      if (this.auth && this.authFns) {
        try { await this.authFns.signOut(this.auth); } catch (e) {}
      }
      this.notifyAuthChange();
    }

    /**
     * 將學生資料寫入 Firebase 雲端：
     * 同時以「學號 (如 5A1、5D28)」作為 users_progress 的固定檔名，確保跨瀏覽器 100% 讀到同一個檔案！
     */
    async syncToCloud(overwriteExact = false) {
      if (!this.db || !this.firestoreFns || !this.currentUser || this.isAdminMode) return;
      const uid = this.currentUser.uid;
      const studentId = (this.state.studentId || '').toUpperCase();
      if (!studentId || studentId === 'GUEST' || studentId === 'WESLEY') return;

      const summary = this.getDashboardSummary();
      const nowISO = new Date().toISOString();
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
        sessionAnswers: this.state.sessionAnswers,
        dailyLogs: this.state.dailyLogs,
        loginHistory: this.state.loginHistory || [],
        chapterCounts: this.state.chapterCounts,
        lastUpdated: nowISO
      };

      try {
        const { doc, setDoc } = this.firestoreFns;
        // 1. 寫入以「學號 (如 5A1, 5D28)」命名的主檔案 (跨瀏覽器絕對不會找不到)
        await setDoc(doc(this.db, 'users_progress', studentId), payload, { merge: !overwriteExact });

        // 2. 同步更新全站學生索引表 (讓 Admin 就算在嚴格環境下也能一次抓到所有註冊過的學號)
        await setDoc(
          doc(this.db, 'users_progress', '_ALL_STUDENTS_INDEX_'),
          {
            students: {
              [studentId]: {
                studentId,
                uid,
                className: this.state.className,
                classNo: this.state.classNo,
                totalUniqueAnswered: summary.totalUniqueAnswered,
                totalUniqueCorrect: summary.totalUniqueCorrect,
                totalUniqueWrong: summary.totalUniqueWrong,
                overallAccuracyRate: summary.overallAccuracyRate,
                currentStreak: this.state.currentStreak,
                bestStreak: this.state.bestStreak,
                recentTopic: this.state.recentTopic,
                lastLogin: (this.state.loginHistory && this.state.loginHistory[0]) ? this.state.loginHistory[0].displayTime : nowISO,
                loginCount: (this.state.loginHistory || []).length,
                lastUpdated: nowISO
              }
            }
          },
          { merge: true }
        );

        this.state.lastSyncedAt = nowISO;
        this.cloudStatus = 'synced';
        this.cloudErrorMsg = '';
      } catch (e) {
        console.error('Firebase 雲端寫入失敗:', e);
        this.cloudStatus = 'error';
        this.cloudErrorMsg = e.message || '權限不足或網路異常';
      }
    }

    /**
     * 跨瀏覽器登入時，同時從 `users_progress/{studentId}` 與舊版 `users_progress/{uid}` 拉取並合併所有紀錄
     */
    async pullFromCloud(uid, studentId) {
      if (!this.db || !this.firestoreFns || !studentId) return;
      const sid = studentId.toUpperCase();
      try {
        const { doc, getDoc } = this.firestoreFns;

        // 1. 先嘗試讀取舊版以 uid 命名的雲端檔案 (把以前做過的題目救回來)
        if (uid && uid !== sid) {
          try {
            const legacySnap = await getDoc(doc(this.db, 'users_progress', uid));
            if (legacySnap.exists()) {
              this.mergeExternalData(legacySnap.data(), true);
            }
          } catch (ignoreErr) {}
        }

        // 2. 讀取以學號 (如 5A1, 5D28) 命名的主雲端檔案
        const mainSnap = await getDoc(doc(this.db, 'users_progress', sid));
        if (mainSnap.exists()) {
          this.mergeExternalData(mainSnap.data(), true);
        }

        this.state.studentId = sid;
        this.recalculateRecentTopic();
        this.saveLocalState();
        this.cloudStatus = 'synced';
        this.cloudErrorMsg = '';
      } catch (e) {
        console.error('Firebase 雲端讀取失敗:', e);
        this.cloudStatus = 'error';
        this.cloudErrorMsg = e.message || '無法讀取雲端資料庫';
      }
    }

    // ==========================================================================
    // 每日練習記錄 + 完整登入時間軸檢視器 (學生端 & Admin 共用)
    // ==========================================================================
    openDailyLogModal(initialDate = null, customUserState = null) {
      const targetState = customUserState || this.state;
      const dailyLogs = targetState.dailyLogs || {};
      const loginHistory = targetState.loginHistory || [];
      const sortedDates = Object.keys(dailyLogs).sort().reverse();
      const selectedDate = initialDate && dailyLogs[initialDate] ? initialDate : (sortedDates[0] || '');
      const titlePrefix = customUserState ? `學生 [ ${targetState.studentId} ] ` : '';

      let modal = document.getElementById('chemDailyLogInspectorModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'chemDailyLogInspectorModal';
        modal.style.cssText =
          'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.55); z-index:100002; display:none; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;';
        document.body.appendChild(modal);
      }

      let activeTab = 'questions'; // 'questions' | 'logins'

      const renderModalContent = activeDate => {
        const dayData = dailyLogs[activeDate] || { count: 0, correctCount: 0, wrongCount: 0, items: [] };
        const items = dayData.items || [];
        const dayAcc = dayData.count > 0 ? Math.round((dayData.correctCount / dayData.count) * 100) : 0;

        const dateOptionsHtml =
          sortedDates.length === 0
            ? `<option value="">尚無作答日期紀錄</option>`
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
                        ${it.answer ? `<span style="color:#666; font-size:12px;">(正解: <b>${it.answer}</b>)</span>` : ''}
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

        const loginsHtml =
          loginHistory.length === 0
            ? `<div style="text-align:center; padding:36px 16px; color:#888; font-size:14px;">尚無登入時間紀錄。</div>`
            : loginHistory
                .map(
                  (log, i) => `
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:#fff; border:1px solid #eaeaea; border-radius:14px; margin-bottom:8px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                      <span style="background:#e8f0fe; color:#1a73e8; font-weight:bold; font-size:12px; padding:4px 9px; border-radius:10px;">#${loginHistory.length - i}</span>
                      <span style="font-weight:bold; font-size:14px; color:#222;">🕒 ${log.displayTime}</span>
                    </div>
                    <span style="font-size:12px; color:#555; background:#f1f3f4; padding:4px 10px; border-radius:10px; font-weight:bold;">${log.device || 'Browser'}</span>
                  </div>
                `
                )
                .join('');

        modal.innerHTML = `
          <div style="background:#f8f9fa; width:100%; max-width:540px; max-height:85vh; border-radius:28px; box-shadow:0 14px 44px rgba(0,0,0,0.25); display:flex; flex-direction:column; overflow:hidden; border:1px solid #e0e0e0;">
            <div style="background:#1a73e8; color:#fff; padding:18px 24px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <h3 style="margin:0; font-size:17px; font-weight:bold;">${titlePrefix}學習與登入紀錄明細</h3>
                <div style="font-size:12px; opacity:0.9; margin-top:2px;">可切換查看「每日作答題目」與「所有登入時間」</div>
              </div>
              <button id="closeDailyInspectorBtn" style="background:rgba(255,255,255,0.2); border:none; color:#fff; width:32px; height:32px; border-radius:16px; font-size:20px; cursor:pointer; line-height:1;">&times;</button>
            </div>

            <!-- 分頁切換按鈕 -->
            <div style="display:flex; background:#fff; padding:10px 20px 0 20px; gap:10px; border-bottom:1px solid #e0e0e0;">
              <button id="tabQuestionsBtn" style="flex:1; padding:10px; border:none; border-bottom:3px solid ${activeTab === 'questions' ? '#1a73e8' : 'transparent'}; background:transparent; color:${activeTab === 'questions' ? '#1a73e8' : '#666'}; font-weight:bold; font-size:14px; cursor:pointer;">
                📝 每日答題紀錄 (${sortedDates.length} 天)
              </button>
              <button id="tabLoginsBtn" style="flex:1; padding:10px; border:none; border-bottom:3px solid ${activeTab === 'logins' ? '#1a73e8' : 'transparent'}; background:transparent; color:${activeTab === 'logins' ? '#1a73e8' : '#666'}; font-weight:bold; font-size:14px; cursor:pointer;">
                🕒 所有登入時間 (${loginHistory.length} 次)
              </button>
            </div>

            ${
              activeTab === 'questions'
                ? `
              <div style="padding:14px 20px; background:#fff; border-bottom:1px solid #e0e0e0;">
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
              <div style="flex:1; overflow-y:auto; padding:16px 20px;">
                ${itemsHtml}
              </div>
            `
                : `
              <div style="flex:1; overflow-y:auto; padding:16px 20px;">
                ${loginsHtml}
              </div>
            `
            }
          </div>
        `;

        modal.querySelector('#closeDailyInspectorBtn').onclick = () => { modal.style.display = 'none'; };
        modal.querySelector('#tabQuestionsBtn').onclick = () => { activeTab = 'questions'; renderModalContent(activeDate); };
        modal.querySelector('#tabLoginsBtn').onclick = () => { activeTab = 'logins'; renderModalContent(activeDate); };

        if (activeTab === 'questions') {
          const selectEl = modal.querySelector('#dailyInspectorDateSelect');
          const pickerEl = modal.querySelector('#dailyInspectorDatePicker');
          if (selectEl) selectEl.onchange = e => { if (e.target.value) renderModalContent(e.target.value); };
          if (pickerEl) pickerEl.onchange = e => { if (e.target.value) renderModalContent(e.target.value); };
        }
      };

      renderModalContent(selectedDate || new Date().toISOString().slice(0, 10));
      modal.style.display = 'flex';
    }

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
          <p style="margin:0 0 18px 0; font-size:12px; color:#666;">請輸入管理員密碼 (2007Wesley) 查閱全體學生 Log</p>
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
      inputEl.onkeydown = e => { if (e.key === 'Enter') verify(); };
      pwdModal.querySelector('#adminPassCancelBtn').onclick = () => { pwdModal.style.display = 'none'; };
    }

    /**
     * 同時撈取雲端 `users_progress` 下所有學生 (如 5A1, 5D28) 並合併同一個學號在不同裝置的紀錄
     */
    async fetchAllUsersFromCloud() {
      const usersMap = {};

      const mergeStudentRecordIntoMap = (sid, rawDoc) => {
        const cleanSid = (sid || '').toUpperCase();
        if (!cleanSid || cleanSid === 'WESLEY' || cleanSid === 'WESLEY_ADMIN' || cleanSid === 'GUEST' || cleanSid === '_ALL_STUDENTS_INDEX_') {
          return;
        }

        if (!usersMap[cleanSid]) {
          usersMap[cleanSid] = this.createEmptyState(cleanSid);
        }
        const target = usersMap[cleanSid];

        // 合併 uniqueAnswers
        const incUnique = rawDoc.uniqueAnswers || rawDoc.answers || {};
        Object.entries(incUnique).forEach(([qId, val]) => {
          const rec = typeof val === 'string' ? { chosen: val, correct: false, date: '' } : val;
          target.uniqueAnswers[qId] = {
            qId,
            qNumDisplay: rec.qNumDisplay || qId.split('_ch')[0],
            chapId: rec.chapId || parseInt((qId.split('_ch')[1] || '1'), 10),
            chosen: rec.chosen || 'A',
            correctAns: rec.correctAns || rec.answer || '',
            correct: !!rec.correct,
            lastDate: rec.lastDate || rec.date || ''
          };
        });

        // 合併 dailyLogs
        const incDaily = rawDoc.dailyLogs || {};
        Object.entries(incDaily).forEach(([dt, dObj]) => {
          if (!target.dailyLogs[dt]) target.dailyLogs[dt] = { count: 0, correctCount: 0, wrongCount: 0, items: [] };
          const mapItems = {};
          (target.dailyLogs[dt].items || []).concat(dObj.items || []).forEach(it => {
            if (it && it.qId) mapItems[it.qId] = it;
          });
          const arr = Object.values(mapItems);
          target.dailyLogs[dt] = {
            count: arr.length,
            correctCount: arr.filter(i => i.correct).length,
            wrongCount: arr.filter(i => !i.correct).length,
            items: arr
          };
        });

        // 合併 loginHistory
        if (Array.isArray(rawDoc.loginHistory)) {
          const lMap = {};
          (target.loginHistory || []).concat(rawDoc.loginHistory).forEach(l => {
            if (l && l.displayTime) lMap[l.displayTime] = l;
          });
          target.loginHistory = Object.values(lMap).sort((a, b) =>
            (b.timeISO || b.displayTime).localeCompare(a.timeISO || a.displayTime)
          );
        }

        target.currentStreak = Math.max(target.currentStreak || 0, rawDoc.currentStreak ?? rawDoc.streak ?? 0);
        target.bestStreak = Math.max(target.bestStreak || 0, rawDoc.bestStreak ?? target.currentStreak);
        if (rawDoc.recentTopic && rawDoc.recentTopic.chapId) {
          target.recentTopic = rawDoc.recentTopic;
        }
        if (rawDoc.lastUpdated && (!target.lastUpdated || rawDoc.lastUpdated > target.lastUpdated)) {
          target.lastUpdated = rawDoc.lastUpdated;
        }
      };

      // 1. 從 Firebase 雲端抓取所有文件
      if (this.db && this.firestoreFns) {
        try {
          const { collection, getDocs, doc, getDoc } = this.firestoreFns;
          const snap = await getDocs(collection(this.db, 'users_progress'));
          snap.forEach(docSnap => {
            if (docSnap.id === '_ALL_STUDENTS_INDEX_') {
              const idxData = docSnap.data();
              if (idxData && idxData.students) {
                Object.entries(idxData.students).forEach(([sKey, sSummary]) => {
                  mergeStudentRecordIntoMap(sKey, sSummary);
                });
              }
              return;
            }
            const d = docSnap.data();
            const rawEmailPrefix = d.email ? d.email.split('@')[0].toUpperCase() : '';
            const sid = (d.studentId || rawEmailPrefix || docSnap.id).toUpperCase();
            mergeStudentRecordIntoMap(sid, d);
          });
          this.cloudStatus = 'synced';
        } catch (e) {
          console.error('Admin 讀取雲端失敗:', e);
          this.cloudStatus = 'error';
          this.cloudErrorMsg = e.message;
        }
      }

      // 2. 同時掃描本機所有存過的學生紀錄（確保同機測試的帳號也 100% 顯示）
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith(STORAGE_PREFIX) || k.startsWith('CHEM_USERLOG2_') || k.startsWith('CHEM_USERLOG_V47_'))) {
          try {
            const localData = JSON.parse(localStorage.getItem(k));
            if (localData && localData.studentId) {
              mergeStudentRecordIntoMap(localData.studentId, localData);
            }
          } catch (e) {}
        }
      }

      // 整理成列表供 Admin 面板渲染
      return Object.values(usersMap)
        .map(u => {
          const ansList = Object.values(u.uniqueAnswers || {});
          const totalAns = ansList.length;
          const totalCor = ansList.filter(r => r.correct).length;
          const totalWrg = totalAns - totalCor;
          const accRate = totalAns > 0 ? Math.round((totalCor / totalAns) * 100) : 0;
          const lastLoginStr =
            u.loginHistory && u.loginHistory.length > 0
              ? `${u.loginHistory[0].displayTime} (${u.loginHistory[0].device || ''})`
              : u.lastUpdated
              ? u.lastUpdated.slice(0, 19).replace('T', ' ')
              : '尚無紀錄';

          return {
            studentId: u.studentId,
            className: u.className || (u.studentId.startsWith('5') ? u.studentId.slice(0, 2) : 'OTHER'),
            classNo: u.classNo || (u.studentId.startsWith('5') ? parseInt(u.studentId.slice(2), 10) || 99 : 99),
            totalAnswered: totalAns,
            totalCorrect: totalCor,
            totalWrong: totalWrg,
            accuracyRate: accRate,
            completionPct: ((totalAns / TOTAL_QB_QUESTIONS) * 100).toFixed(2),
            currentStreak: u.currentStreak || 0,
            bestStreak: u.bestStreak || 0,
            recentTopic: u.recentTopic || null,
            uniqueAnswers: u.uniqueAnswers || {},
            dailyLogs: u.dailyLogs || {},
            loginHistory: u.loginHistory || [],
            lastLoginStr
          };
        })
        .sort((a, b) => {
          if (a.className !== b.className) return a.className.localeCompare(b.className);
          return (a.classNo || 99) - (b.classNo || 99);
        });
    }

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
          正在從 Firebase 雲端載入所有學生（如 5A1, 5D28）作答與登入時間紀錄...
        </div>
      `;

      let allUsers = await this.fetchAllUsersFromCloud();
      let activeClassFilter = 'ALL';
      let searchKeyword = '';

      const renderAdminUI = () => {
        const filtered = allUsers.filter(u => {
          const matchClass = activeClassFilter === 'ALL' || u.className === activeClassFilter;
          const matchSearch = !searchKeyword || u.studentId.toLowerCase().includes(searchKeyword.toLowerCase());
          return matchClass && matchSearch;
        });

        const cloudWarningBanner =
          this.cloudStatus === 'error'
            ? `<div style="background:#fce8e6; color:#c5221f; padding:10px 20px; font-size:12px; font-weight:bold; border-bottom:1px solid #f5c2c7;">
                ⚠️ 雲端讀取受阻 (${this.cloudErrorMsg})：請前往 Firebase Console -> Firestore Database -> Rules，將規則設為 allow read, write: if true; 即可跨瀏覽器同步所有學生！
              </div>`
            : '';

        const rowsHtml =
          filtered.length === 0
            ? `<div style="text-align:center; padding:40px; color:#888; background:#fff; border-radius:20px; border:1px solid #e0e0e0;">目前尚無符合條件的學生紀錄。</div>`
            : filtered
                .map(u => {
                  const recentText =
                    u.recentTopic && u.recentTopic.chapId
                      ? `${u.recentTopic.topicName || ''} ${u.recentTopic.chapterName || ''} (還差 ${
                          u.recentTopic.remainingRate ?? 100
                        }%)`
                      : '尚未開始練習';

                  return `
                    <div style="background:#fff; border:1px solid #e0e0e0; border-radius:20px; padding:16px 20px; margin-bottom:12px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                      <div style="min-width:200px; flex:1;">
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
                          <span style="background:#1a73e8; color:#fff; font-weight:bold; font-size:14px; padding:3px 10px; border-radius:10px;">${u.studentId}</span>
                          <span style="font-size:12px; color:#666; font-weight:bold;">Streak: ${u.currentStreak} (最高 ${u.bestStreak})</span>
                          <span style="font-size:11px; color:#137333; background:#e6f4ea; padding:2px 8px; border-radius:8px; font-weight:bold;">登入 ${u.loginHistory.length} 次</span>
                        </div>
                        <div style="font-size:12px; color:#333; margin-top:4px;"><b>最近課題：</b>${recentText}</div>
                        <div style="font-size:11px; color:#666; margin-top:3px;"><b>最後登入時間：</b>${u.lastLoginStr}</div>
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
                        <button class="admin-inspect-user-btn" data-sid="${u.studentId}" style="background:#e8f0fe; color:#1a73e8; border:1px solid #1a73e8; padding:8px 14px; border-radius:14px; font-weight:bold; font-size:12px; cursor:pointer;">答題與登入時間</button>
                      </div>
                    </div>
                  `;
                })
                .join('');

        panel.innerHTML = `
          <div style="background:#f4f6f9; width:100%; max-width:840px; height:88vh; border-radius:28px; box-shadow:0 16px 48px rgba(0,0,0,0.3); display:flex; flex-direction:column; overflow:hidden; border:1px solid #d0d7de;">
            <div style="background:#111827; color:#fff; padding:18px 24px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <h2 style="margin:0; font-size:18px; color:#60a5fa;">CHEM QB - Admin 管理員控制台 (Wesley)</h2>
                <div style="font-size:12px; color:#9ca3af; margin-top:2px;">同時顯示所有註冊學生 (如 5A1, 5D28) 跨瀏覽器作答與所有登入時間</div>
              </div>
              <div style="display:flex; gap:8px; align-items:center;">
                <button id="adminRefreshCloudBtn" style="background:#2563eb; color:#fff; border:none; padding:7px 12px; border-radius:12px; font-size:12px; font-weight:bold; cursor:pointer;">同步雲端</button>
                <button id="adminExportJsonBtn" style="background:#059669; color:#fff; border:none; padding:7px 12px; border-radius:12px; font-size:12px; font-weight:bold; cursor:pointer;">匯出 JSON</button>
                <button id="adminClosePanelBtn" style="background:rgba(255,255,255,0.15); color:#fff; border:none; width:34px; height:34px; border-radius:17px; font-size:20px; cursor:pointer;">&times;</button>
              </div>
            </div>
            ${cloudWarningBanner}
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
              <input type="text" id="adminSearchStudentInput" value="${searchKeyword}" placeholder="搜尋學號 (如 5A1 或 5D28)..." style="padding:7px 14px; border:1px solid #ccc; border-radius:14px; font-size:13px; width:180px;" />
            </div>

            <div style="flex:1; overflow-y:auto; padding:18px 24px;">
              ${rowsHtml}
            </div>
          </div>
        `;

        panel.querySelector('#adminClosePanelBtn').onclick = () => { panel.style.display = 'none'; };
        panel.querySelector('#adminRefreshCloudBtn').onclick = async () => {
          allUsers = await this.fetchAllUsersFromCloud();
          renderAdminUI();
        };

        panel.querySelector('#adminExportJsonBtn').onclick = () => {
          const blob = new Blob([JSON.stringify(allUsers, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `chemqb_all_users_log_${new Date().toISOString().slice(0, 10)}.json`;
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
            if (targetUser) this.openDailyLogModal(null, targetUser);
          };
        });
      };

      renderAdminUI();
    }
  }

  window.ChemUserLog = new ChemUserLogEngine();
})(window);

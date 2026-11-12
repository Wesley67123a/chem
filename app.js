/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Main UI & Material You Engine (app.js)
 * Version: 0.0.53 (Warm Amber Material You Palette, Light Typography & Cloud Lap Timer)
 * ============================================================================
 */

// 1. 課程 15 課題 / 65 章完整架構
const SYLLABUS_CONFIG = [
  { 
    topicId: 'CHEM-01', 
    topicName: 'CHEM-01 地球', 
    chapters: [
      { id: 1, name: '第 1 章：化學導論' }, 
      { id: 2, name: '第 2 章：大氣' }, 
      { id: 3, name: '第 3 章：海洋' }
    ] 
  },
  { 
    topicId: 'CHEM-02', 
    topicName: 'CHEM-02 微觀世界 I', 
    chapters: [
      { id: 4, name: '第 4 章：岩石和礦物' }, 
      { id: 5, name: '第 5 章：原子結構' }, 
      { id: 6, name: '第 6 章：周期表' }, 
      { id: 7, name: '第 7 章：金屬鍵和離子鍵' }, 
      { id: 8, name: '第 8 章：共價鍵' }
    ] 
  },
  { 
    topicId: 'CHEM-03', 
    topicName: 'CHEM-03 金屬', 
    chapters: [
      { id: 9, name: '第 9 章：物質的結構和性質' }, 
      { id: 10, name: '第 10 章：金屬的存在和提取' }, 
      { id: 11, name: '第 11 章：金屬的活性' }, 
      { id: 12, name: '第 12 章：反應質量' }, 
      { id: 13, name: '第 13 章：金屬的腐蝕和保護' }
    ] 
  },
  { 
    topicId: 'CHEM-04', 
    topicName: 'CHEM-04 酸和鹽基', 
    chapters: [
      { id: 14, name: '第 14 章：酸和鹼的簡介' }, 
      { id: 15, name: '第 15 章：溶液的濃度' }, 
      { id: 16, name: '第 16 章：指示劑和pH' }, 
      { id: 17, name: '第 17 章：酸和鹼的強度' }, 
      { id: 18, name: '第 18 章：鹽和中和作用' }
    ] 
  },
  { 
    topicId: 'CHEM-05', 
    topicName: 'CHEM-05 化石燃料', 
    chapters: [
      { id: 19, name: '第 19 章：涉及酸和鹼的容量分析' }, 
      { id: 20, name: '第 20 章：來自化石燃料的烷' }, 
      { id: 21, name: '第 21 章：同系列、結構式和碳化合物的命名' }, 
      { id: 22, name: '第 22 章：烷烴和烯烴的化學反應' }, 
      { id: 23, name: '第 23 章：加成聚合物' }
    ] 
  },
  { 
    topicId: 'CHEM-06', 
    topicName: 'CHEM-06 微觀世界 II', 
    chapters: [
      { id: 24, name: '第 24 章：具有非八隅體結構的簡單分子及簡單分子的形狀' }, 
      { id: 25, name: '第 25 章：鍵與分子的極性' }, 
      { id: 26, name: '第 26 章：分子間作用力' }, 
      { id: 27, name: '第 27 章：結構與物理性質' }
    ] 
  },
  { 
    topicId: 'CHEM-07', 
    topicName: 'CHEM-07 氧化還原與電解', 
    chapters: [
      { id: 28, name: '第 28 章：氧化和還原' }, 
      { id: 29, name: '第 29 章：化學電池' }, 
      { id: 30, name: '第 30 章：氧化劑和還原劑' }, 
      { id: 31, name: '第 31 章：電解' }, 
      { id: 32, name: '第 32 章：工業電解' }
    ] 
  },
  { 
    topicId: 'CHEM-08', 
    topicName: 'CHEM-08 化學反應與能量', 
    chapters: [
      { id: 33, name: '第 33 章：化學反應中的能量變化' }, 
      { id: 34, name: '第 34 章：標準反應焓變' }, 
      { id: 35, name: '第 35 章：赫斯定律' }
    ] 
  },
  { 
    topicId: 'CHEM-09', 
    topicName: 'CHEM-09 反應速率', 
    chapters: [
      { id: 36, name: '第 36 章：化學反應的速率' }, 
      { id: 37, name: '第 37 章：影響反應速率的因素' }, 
      { id: 38, name: '第 38 章：碰撞理論' }, 
      { id: 39, name: '第 39 章：催化劑' }
    ] 
  },
  { 
    topicId: 'CHEM-10', 
    topicName: 'CHEM-10 化學平衡', 
    chapters: [
      { id: 40, name: '第 40 章：動態平衡' }, 
      { id: 41, name: '第 41 章：濃度和溫度的變化對化學平衡的影響' },
      { id: 42, name: '第 42 章：特定同系列的簡介' }
    ] 
  },
  { 
    topicId: 'CHEM-11', 
    topicName: 'CHEM-11 碳化合物的化學', 
    chapters: [
      { id: 43, name: '第 43 章：同分異構' },
      { id: 44, name: '第 44 章：各種官能基的典型化學反應' },
      { id: 45, name: '第 45 章：碳化合物的互換' },
      { id: 46, name: '第 46 章：重要有機物質' },
      { id: 47, name: '第 47 章：由Na至Cl各元素物理性質的周期變化' },
      { id: 48, name: '第 48 章：由Na至Cl各元素氧化物的結合、在水中的習性及酸鹼性質' }
    ] 
  },
  { 
    topicId: 'CHEM-12', 
    topicName: 'CHEM-12 化學規律', 
    chapters: [
      { id: 49, name: '第 49 章：過渡性金屬的一般性質' },
      { id: 50, name: '第 50 章：工業過程的重要性' }
    ] 
  },
  { 
    topicId: 'CHEM-13', 
    topicName: 'CHEM-13 工業化學', 
    chapters: [
      { id: 51, name: '第 51 章：速率方程' },
      { id: 52, name: '第 52 章：活化能' },
      { id: 53, name: '第 53 章：催化作用和工業過程' }, 
      { id: 54, name: '第 54 章：工業過程' }, 
      { id: 55, name: '第 55 章：有關工業過程的綠色化學' }
    ] 
  },
  { 
    topicId: 'CHEM-14', 
    topicName: 'CHEM-14 物料化學', 
    chapters: [
      { id: 56, name: '第 56 章：合金' }, 
      { id: 57, name: '第 57 章：高分子材料' }, 
      { id: 58, name: '第 58 章：現代材料' }, 
      { id: 59, name: '第 59 章：納米材料' }, 
      { id: 60, name: '第 60 章：物料回收' }
    ] 
  },
  { 
    topicId: 'CHEM-15', 
    topicName: 'CHEM-15 分析化學', 
    chapters: [
      { id: 61, name: '第 61 章：檢測物質中的化學物種' },
      { id: 62, name: '第 62 章：分離和提純的方法' },
      { id: 63, name: '第 63 章：定量分析方法' },
      { id: 64, name: '第 64 章：儀器分析方法' },
      { id: 65, name: '第 65 章：分析化學對社會的貢獻' }
    ] 
  }
];

const TOTAL_APP_QUESTIONS = 5309;

const CHAPTER_MAP = {};
SYLLABUS_CONFIG.forEach(t => t.chapters.forEach(c => { CHAPTER_MAP[c.id] = { topic: t, chapter: c }; }));

window.SYLLABUS_CONFIG = SYLLABUS_CONFIG;
window.CHAPTER_MAP = CHAPTER_MAP;

// ============================================================================
// Material You 淡橙黃色系 (Warm Amber / Pale Orange-Yellow Tonal Palette)
// ============================================================================
const M3 = {
  bg: '#FEF9EF',              // 背景淡暖橙黃色
  surface: '#FFFFFF',         // 卡片純白表面
  surfaceWarm: '#FBF3E4',     // 次級暖杏色容器
  accentSoft: '#FDE8C4',      // 強調淡橙黃膠囊底色
  accentBorder: '#F3D299',    // 強調淡橙黃邊框
  primary: '#8F4E00',         // Material You 主色 (深琥珀棕)
  primaryBtn: '#C87A19',      // 溫和琥珀橙按鈕
  primaryBtnText: '#FFFFFF',
  textMain: '#2C2218',        // 柔和深暖褐文字 (取代刺眼純黑)
  textSub: '#786958',         // 次要暖灰褐文字
  textMuted: '#A39482',       // 輔助淺褐灰
  outline: '#E8DEC8',         // 卡片柔和暖邊框
  outlineLight: '#F3ECE0',
  correctBg: '#EAF3E6',       // 柔和鼠尾草綠底 (低飽和答對色)
  correctText: '#385A2C',
  correctBorder: '#C5DEC0',
  wrongBg: '#F9EAE6',         // 柔和赤陶粉底 (低飽和答錯色)
  wrongText: '#8A3A2B',
  wrongBorder: '#EBC7BE'
};

// 2. 全局 UI 狀態 (含計時器與雲端 Lap 分圈狀態)
window.chemApp = {
  version: '0.0.53',
  currentLang: localStorage.getItem('CHEM_LANG_V47') || 'e',
  isMuted: localStorage.getItem('CHEM_MUTED_V49') === '1',
  activeChapterId: null,
  currentView: 'home', // 'home' | 'chapter'
  questionsDB: {},
  chapterCounts: {},
  timerSeconds: 0,
  lastLapTotalSeconds: 0,
  currentChapterLaps: [], // [{ lapNo, splitSec, totalSec, splitText, totalText, answeredCount, timeStr }]
  timerInterval: null,
  isTimerRunning: false,
  showAllRecentTopics: false
};

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDzNzFelR1DLNgVcK-u3_U2s_zmtIrxu1w",
  authDomain: "chem-b49bf.firebaseapp.com",
  projectId: "chem-b49bf",
  storageBucket: "chem-b49bf.firebasestorage.app",
  messagingSenderId: "702426481564",
  appId: "1:702426481564:web:987522a34c6c4e54d6fe59",
  measurementId: "G-9EB0718DGR"
};

// 動態注入 Material You 淡橙黃主題與纖細字體樣式 (不修改 style.css 即可全局覆寫)
function injectWarmM3ThemeOverrides() {
  if (document.getElementById('chemWarmM3ThemeStyle')) return;
  const st = document.createElement('style');
  st.id = 'chemWarmM3ThemeStyle';
  st.textContent = `
    :root {
      --md-sys-color-primary: ${M3.primary} !important;
      --md-sys-color-surface: ${M3.surface} !important;
      --md-sys-color-surface-variant: ${M3.bg} !important;
      --md-sys-color-outline: ${M3.outline} !important;
    }
    body, #chemAppRootContainer {
      background-color: ${M3.bg} !important;
      color: ${M3.textMain} !important;
      font-weight: 400 !important;
      letter-spacing: 0.15px;
    }
    /* 全局去除粗體，改用纖細現代字重 */
    h1, h2, h3, h4, b, strong, button, span, div, label, input, select {
      font-weight: 400 !important;
    }
    .m3-title-medium {
      font-weight: 500 !important;
    }
    .m3-card, .question-card {
      background: ${M3.surface} !important;
      border: 1px solid ${M3.outline} !important;
      box-shadow: 0 2px 10px rgba(143, 78, 0, 0.04) !important;
    }
    /* 連同 userlog.js 的彈窗也套用暖杏色與細字體 */
    #chemDailyLogInspectorModal > div, #chemAdminFullModal > div {
      background: ${M3.bg} !important;
      border-color: ${M3.outline} !important;
    }
    /* 隱藏捲軸但保留滑動 */
    .lap-scroll-strip::-webkit-scrollbar {
      height: 4px;
    }
    .lap-scroll-strip::-webkit-scrollbar-thumb {
      background: ${M3.accentBorder};
      border-radius: 4px;
    }
  `;
  document.head.appendChild(st);
}

function formatDuration(sec) {
  const s = Math.max(0, parseInt(sec || 0, 10));
  const hrs = Math.floor(s / 3600);
  const mins = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const secs = String(s % 60).padStart(2, '0');
  return hrs > 0 ? `${hrs}:${mins}:${secs}` : `${mins}:${secs}`;
}

function extractQuestionOrderNumber(qNumDisplay, qId, fallbackIdx = null) {
  const raw = String(qNumDisplay || qId || '').split('_ch')[0];
  const mcqMatch = raw.match(/ChemMCQ\d+?(\d{3})$/i);
  if (mcqMatch) return parseInt(mcqMatch[1], 10);

  const numMatch = raw.match(/(\d+)$/);
  if (numMatch) {
    const n = parseInt(numMatch[1], 10);
    if (n > 1000) return n % 1000;
    return n;
  }
  return fallbackIdx || 1;
}

// ============================================================================
// 雲端分圈計時器儲存引擎 (借道 userlog.js 的 chapterCounts 自動同步至 Firebase)
// ============================================================================
function getCloudTimerMap() {
  if (!window.ChemUserLog || !window.ChemUserLog.state) return {};
  const counts = window.ChemUserLog.state.chapterCounts || {};
  const raw = counts._timer_laps_v53;
  if (!raw) return {};
  if (typeof raw === 'object') return raw;
  try { return JSON.parse(raw); } catch (e) { return {}; }
}

function saveChapterTimerAndLapsToCloud(chapId, syncImmediately = true) {
  if (!chapId || !window.ChemUserLog || !window.ChemUserLog.state) return;
  const st = window.ChemUserLog.state;
  if (!st.chapterCounts) st.chapterCounts = {};

  const timerMap = getCloudTimerMap();
  timerMap[chapId] = {
    elapsedSec: window.chemApp.timerSeconds || 0,
    lastLapSec: window.chemApp.lastLapTotalSeconds || 0,
    laps: (window.chemApp.currentChapterLaps || []).slice(0, 50),
    updatedAt: new Date().toISOString()
  };

  st.chapterCounts._timer_laps_v53 = timerMap;
  window.ChemUserLog.saveLocalState();
  if (syncImmediately) {
    window.ChemUserLog.syncToCloud();
  }
}

function loadChapterTimerAndLapsFromCloud(chapId) {
  const timerMap = getCloudTimerMap();
  const data = timerMap[chapId];
  if (data && typeof data === 'object') {
    window.chemApp.timerSeconds = parseInt(data.elapsedSec || 0, 10);
    window.chemApp.lastLapTotalSeconds = parseInt(data.lastLapSec || 0, 10);
    window.chemApp.currentChapterLaps = Array.isArray(data.laps) ? data.laps : [];
  } else {
    window.chemApp.timerSeconds = 0;
    window.chemApp.lastLapTotalSeconds = 0;
    window.chemApp.currentChapterLaps = [];
  }
}

function clearChapterTimerAndLapsInCloud(chapId) {
  window.chemApp.timerSeconds = 0;
  window.chemApp.lastLapTotalSeconds = 0;
  window.chemApp.currentChapterLaps = [];
  saveChapterTimerAndLapsToCloud(chapId, true);
}

// 3. 網頁音效系統 (支援一鍵靜音切換)
class SoundFX {
  static audioCtx = null;
  static getContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    return this.audioCtx;
  }

  static toggleMute() {
    window.chemApp.isMuted = !window.chemApp.isMuted;
    localStorage.setItem('CHEM_MUTED_V49', window.chemApp.isMuted ? '1' : '0');
    updateMuteButtonsUI();
    if (!window.chemApp.isMuted) {
      this.playClick();
    }
  }

  static playClick(isCorrect = null) {
    if (window.chemApp && window.chemApp.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isCorrect === true) {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
        osc.start();
        osc.stop(ctx.currentTime + 0.28);
      } else if (isCorrect === false) {
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(164.81, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
        osc.start();
        osc.stop(ctx.currentTime + 0.32);
      } else {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      }
    } catch (e) {}
  }
}

function updateMuteButtonsUI() {
  const muted = window.chemApp.isMuted;
  document.querySelectorAll('.chem-mute-toggle-btn').forEach(btn => {
    btn.textContent = muted ? '靜音中' : '音效: 開';
    btn.style.background = muted ? M3.wrongBg : M3.surfaceWarm;
    btn.style.color = muted ? M3.wrongText : M3.textMain;
    btn.style.borderColor = muted ? M3.wrongBorder : M3.outline;
  });
}

// 4. 低調乾淨的 Admin 驗證窗口
function openDiscreetAdminModal() {
  if (window.ChemUserLog && window.ChemUserLog.isAdminMode) {
    window.ChemUserLog.openAdminPanel();
    return;
  }

  let pwdModal = document.getElementById('chemAdminPassModal');
  if (!pwdModal) {
    pwdModal = document.createElement('div');
    pwdModal.id = 'chemAdminPassModal';
    pwdModal.style.cssText =
      'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(44,34,24,0.38); z-index:100001; display:none; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;';
    document.body.appendChild(pwdModal);
  }

  pwdModal.innerHTML = `
    <div style="background:${M3.surface}; width:100%; max-width:310px; padding:24px 26px; border-radius:26px; box-shadow:0 12px 36px rgba(44,34,24,0.16); text-align:center; border:1px solid ${M3.outline};">
      <h3 style="margin:0 0 14px 0; color:${M3.textMain}; font-size:16px;">Admin</h3>
      <input type="password" id="adminLocalPassInput" placeholder="Password" style="width:100%; padding:10px 14px; border:1px solid ${M3.outline}; border-radius:12px; font-size:14px; box-sizing:border-box; margin-bottom:8px; outline:none; background:${M3.bg}; color:${M3.textMain};" />
      <div id="adminLocalPassErr" style="color:${M3.wrongText}; font-size:12px; min-height:18px; margin-bottom:10px;"></div>
      <div style="display:flex; gap:10px;">
        <button id="adminPassCancelBtn" style="flex:1; background:${M3.surfaceWarm}; color:${M3.textMain}; border:1px solid ${M3.outline}; padding:9px; border-radius:12px; font-size:13px; cursor:pointer;">取消</button>
        <button id="adminPassConfirmBtn" style="flex:1; background:${M3.primary}; color:#fff; border:none; padding:9px; border-radius:12px; font-size:13px; cursor:pointer;">進入</button>
      </div>
    </div>
  `;

  pwdModal.style.display = 'flex';
  const inputEl = pwdModal.querySelector('#adminLocalPassInput');
  const errEl = pwdModal.querySelector('#adminLocalPassErr');
  inputEl.focus();

  const verify = () => {
    SoundFX.playClick();
    if (inputEl.value === '2007Wesley') {
      pwdModal.style.display = 'none';
      if (window.ChemUserLog) window.ChemUserLog.openAdminPanel();
    } else {
      errEl.textContent = '驗證失敗';
    }
  };

  pwdModal.querySelector('#adminPassConfirmBtn').onclick = verify;
  inputEl.onkeydown = e => { if (e.key === 'Enter') verify(); };
  pwdModal.querySelector('#adminPassCancelBtn').onclick = () => {
    SoundFX.playClick();
    pwdModal.style.display = 'none';
  };
  pwdModal.onclick = e => {
    if (e.target === pwdModal) pwdModal.style.display = 'none';
  };
}

// 5. IndexedDB 題庫快取引擎
class ChemChapterCache {
  static dbPromise = null;
  static getDB() {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open('HKDSE_CHEM_QB_CACHE_V48', 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('chapters')) db.createObjectStore('chapters');
        };
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror = (e) => reject(e.target.error);
      });
    }
    return this.dbPromise;
  }

  static async saveChapter(dbKey, questions) {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('chapters', 'readwrite');
        tx.objectStore('chapters').put(questions, dbKey);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    } catch (e) { return false; }
  }

  static async loadChapter(dbKey) {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('chapters', 'readonly');
        const req = tx.objectStore('chapters').get(dbKey);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch (e) { return null; }
  }
}

// 6. 深度穿透式 DOM 切題引擎
class DocxQuestionParser {
  static cleanInlineNoise(htmlStr) {
    return htmlStr
      .replace(/[\u25A0-\u25FF\u2610-\u2612\u2B1B\u2B1C\uF06F\uF071\uF0A7\uF0FC\uFFFD□☐■▪▫▬▭▮▯]/g, '')
      .replace(/©\s*\d{4}\s*Aristo Educational Press Ltd\.?/gi, '')
      .replace(/HKDSE NEW CHEMISTRY\s*[—\-–]\s*A Modern View/gi, '')
      .replace(/Multiple-choice questions/gi, '')
      .replace(/Question Bank/gi, '');
  }

  static isPureNoiseLine(text) {
    const t = text
      .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '')
      .replace(/[\u25A0-\u25FF\u2610-\u2612\u2B1B\u2B1C\uF06F□☐■▪▫]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!t) return true;
    const patterns = [
      /^©\s*\d{4}\s*Aristo/i,
      /^Chapter\s+\d+$/i,
      /^第\s*\d+\s*章$/,
      /^Part\s+[IVXLCDM]+\b.*$/i,
      /^HKDSE NEW CHEMISTRY/i,
      /^Question Bank$/i,
      /^Multiple-choice questions$/i,
      /^香港中學文憑\s*現代化學/i,
      /^問題庫$/,
      /^多項選擇題$/
    ];
    return patterns.some(p => p.test(t));
  }

  static stripGrayBoxNodes(rootEl) {
    if (!rootEl) return;
    rootEl.querySelectorAll('span, div, p, td, th, font, s, u, b, i').forEach(el => {
      const hasImg = el.querySelector && el.querySelector('img') !== null;
      if (hasImg) return;

      if (el.style) {
        el.style.backgroundColor = 'transparent';
        el.style.background = 'none';
      }
      if (el.hasAttribute && el.hasAttribute('bgcolor')) {
        el.removeAttribute('bgcolor');
      }

      const cleanedTxt = (el.textContent || '')
        .replace(/[\u200B-\u200D\uFEFF\u00A0\s]/g, '')
        .replace(/[\u25A0-\u25FF\u2610-\u2612\u2B1B\u2B1C\uF06F□☐■▪▫]/g, '');

      if (cleanedTxt === '' && el.children.length === 0 && el.tagName !== 'BR' && el.tagName !== 'HR') {
        el.remove();
      }
    });

    rootEl.querySelectorAll('img').forEach(img => {
      const w = parseInt(img.getAttribute('width') || '0', 10);
      const h = parseInt(img.getAttribute('height') || '0', 10);
      if (w > 0 && w <= 18 && h > 0 && h <= 18) {
        img.remove();
      }
    });
  }

  static flattenBlocks(root) {
    const blocks = [];
    const walk = (node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName.toUpperCase();

      if (tag === 'TABLE') {
        const tableTxt = node.textContent || '';
        if (/ChemMCQ\s*\d+/i.test(tableTxt) || /(?:Answer|Ans|答案)\s*[:：]/i.test(tableTxt)) {
          node.querySelectorAll('tr').forEach(tr => {
            tr.querySelectorAll('td, th').forEach(cell => {
              Array.from(cell.children).forEach(child => walk(child));
            });
          });
        } else {
          const clonedTable = node.cloneNode(true);
          this.stripGrayBoxNodes(clonedTable);
          blocks.push(clonedTable);
        }
        return;
      }

      if (['DIV', 'SECTION', 'ARTICLE', 'MAIN', 'TBODY', 'TR', 'TD', 'UL', 'OL'].includes(tag)) {
        if (node.children.length > 0) {
          Array.from(node.children).forEach(child => walk(child));
          return;
        }
      }

      const cleanedHtml = this.cleanInlineNoise(node.innerHTML);
      if (/<br\s*\/?>/i.test(cleanedHtml)) {
        cleanedHtml.split(/<br\s*\/?>/i).forEach(part => {
          const p = document.createElement('p');
          p.innerHTML = part.trim();
          this.stripGrayBoxNodes(p);
          if ((p.textContent || '').trim() || p.querySelector('img')) blocks.push(p);
        });
      } else {
        const p = node.cloneNode(true);
        p.innerHTML = cleanedHtml.trim();
        this.stripGrayBoxNodes(p);
        if ((p.textContent || '').trim() || p.querySelector('img') || tag === 'TABLE') blocks.push(p);
      }
    };
    Array.from(root.children).forEach(child => walk(child));
    return blocks;
  }

  static parseHtmlContent(rawHtml, chapId) {
    const tempRoot = document.createElement('div');
    tempRoot.innerHTML = this.cleanInlineNoise(rawHtml);
    this.stripGrayBoxNodes(tempRoot);

    const flatNodes = this.flattenBlocks(tempRoot);
    const fullText = tempRoot.textContent || '';
    const hasChemMCQ = /ChemMCQ\s*\d+/i.test(fullText);

    const headerRegex = hasChemMCQ
      ? /(ChemMCQ\s*\d+)/i
      : /^(?:Question\s*\d+|Q\s*\d+|第\s*\d+\s*題|\d+\s*[\.、])(?!\s*:)/i;

    const rawBlocks = [];
    let currentBlock = null;

    flatNodes.forEach(node => {
      const text = (node.textContent || '').trim();
      const hasImg = node.querySelector && node.querySelector('img') !== null;
      const isTable = node.tagName && node.tagName.toUpperCase() === 'TABLE';

      if (!hasImg && !isTable && this.isPureNoiseLine(text)) return;

      const match = text.match(headerRegex);
      if (match && (hasChemMCQ || text.startsWith(match[0]))) {
        if (currentBlock) rawBlocks.push(currentBlock);
        const qCode = match[0].replace(/\s+/g, '');
        currentBlock = { qCode: qCode, nodes: [] };

        const idx = text.indexOf(match[0]);
        const afterText = text.slice(idx + match[0].length).trim();
        if (afterText.length > 0 || hasImg) {
          const cloned = node.cloneNode(true);
          cloned.innerHTML = cloned.innerHTML.replace(match[0], '').trim();
          this.stripGrayBoxNodes(cloned);
          if ((cloned.textContent || '').trim() || hasImg) currentBlock.nodes.push(cloned);
        }
      } else {
        if (currentBlock) currentBlock.nodes.push(node.cloneNode(true));
      }
    });

    if (currentBlock) rawBlocks.push(currentBlock);

    const resultList = [];
    const ansLineRegex = /^(?:Answer|Ans|答案)\s*[:：]?\s*\(?([A-D])\)?(?:[\s\.、:：\-—]*(.*))?$/i;

    rawBlocks.forEach((block, idx) => {
      const stemDiv = document.createElement('div');
      const expDiv = document.createElement('div');
      let foundAnswer = false;
      let answerLetter = '';

      block.nodes.forEach(node => {
        const txt = (node.textContent || '').replace(/[\u25A0-\u25FF\u2610-\u2612\uF06F□☐■▪▫]/g, '').trim();
        const hasImg = node.querySelector && node.querySelector('img') !== null;
        const isTable = node.tagName && node.tagName.toUpperCase() === 'TABLE';

        if (!txt && !hasImg && !isTable) return;

        if (!foundAnswer) {
          const ansMatch = txt.match(ansLineRegex);
          if (ansMatch) {
            foundAnswer = true;
            answerLetter = ansMatch[1].toUpperCase();
            if (ansMatch[2] && ansMatch[2].trim()) {
              const p = document.createElement('p');
              p.textContent = ansMatch[2].trim();
              expDiv.appendChild(p);
            }
            return;
          }

          const inlineAnsMatch = txt.match(/\b(?:Answer|Ans|答案)\s*[:：]\s*\(?([A-D])\)?/i);
          if (inlineAnsMatch && !/^[A-D][\.\)]/.test(txt)) {
            foundAnswer = true;
            answerLetter = inlineAnsMatch[1].toUpperCase();
            return;
          }

          if (node.style) {
            if (/^[A-D][\.\)]\s*/.test(txt)) {
              node.style.cssText = 'padding-left: 24px; margin: 4px 0; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif; background: transparent;';
            } else if (isTable) {
              node.style.cssText = 'border-collapse: collapse; margin: 12px 0; width: auto; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;';
            } else {
              node.style.cssText = 'margin: 6px 0; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif; background: transparent;';
            }
          }
          stemDiv.appendChild(node);
        } else {
          if (txt.length > 0 || hasImg || isTable) {
            if (node.style) node.style.cssText = 'margin: 6px 0; line-height: 1.65; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif; background: transparent;';
            expDiv.appendChild(node);
          }
        }
      });

      this.stripGrayBoxNodes(stemDiv);
      this.stripGrayBoxNodes(expDiv);

      const qDisplay = block.qCode || `Q${idx + 1}`;
      resultList.push({
        id: `${qDisplay}_ch${chapId}`,
        qNumDisplay: qDisplay,
        qOrder: idx + 1,
        htmlContent: stemDiv.innerHTML,
        answer: answerLetter || 'A',
        explanationHtml: expDiv.innerHTML.trim()
      });
    });

    return resultList;
  }
}

// 7. DOCX 載入器
class DocxExtractor {
  static async ensureMammoth() {
    if (typeof mammoth !== 'undefined') return;
    const cdnList = [
      'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js',
      'https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js'
    ];
    for (const src of cdnList) {
      try {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = src;
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
        if (typeof mammoth !== 'undefined') return;
      } catch (e) {}
    }
  }

  static async extract(arrayBuffer, chapId) {
    await this.ensureMammoth();
    const result = await mammoth.convertToHtml(
      { arrayBuffer: arrayBuffer },
      {
        convertImage: mammoth.images.imgElement((image) => {
          return image.read('base64').then((imageBuffer) => {
            return { src: 'data:' + image.contentType + ';base64,' + imageBuffer };
          });
        })
      }
    );
    return DocxQuestionParser.parseHtmlContent(result.value, chapId);
  }
}

// ============================================================================
// 8. 計時器與雲端分圈 (Lap) 控制中心
// ============================================================================
function startTimer() {
  if (window.chemApp.isTimerRunning) return;
  window.chemApp.isTimerRunning = true;
  window.chemApp.timerInterval = setInterval(() => {
    window.chemApp.timerSeconds++;
    updateTimerDisplay();
    // 每 10 秒自動背景儲存一次秒數到本地與雲端
    if (window.chemApp.timerSeconds % 10 === 0 && window.chemApp.activeChapterId) {
      saveChapterTimerAndLapsToCloud(window.chemApp.activeChapterId, false);
    }
  }, 1000);
}

function pauseTimer() {
  window.chemApp.isTimerRunning = false;
  clearInterval(window.chemApp.timerInterval);
  if (window.chemApp.activeChapterId) {
    saveChapterTimerAndLapsToCloud(window.chemApp.activeChapterId, true);
  }
}

function resetTimer() {
  pauseTimer();
  window.chemApp.timerSeconds = 0;
  window.chemApp.lastLapTotalSeconds = 0;
  window.chemApp.currentChapterLaps = [];
  updateTimerDisplay();
  renderChapterLapsUI();
  if (window.chemApp.activeChapterId) {
    saveChapterTimerAndLapsToCloud(window.chemApp.activeChapterId, true);
  }
}

function recordLap() {
  const chapId = window.chemApp.activeChapterId;
  if (!chapId) return;

  const totalSec = window.chemApp.timerSeconds || 0;
  const splitSec = Math.max(0, totalSec - (window.chemApp.lastLapTotalSeconds || 0));
  window.chemApp.lastLapTotalSeconds = totalSec;

  const laps = window.chemApp.currentChapterLaps || [];
  const lapNo = laps.length + 1;

  // 統計目前已作答題數
  let answeredNow = 0;
  if (window.ChemUserLog && window.ChemUserLog.state) {
    const sess = window.ChemUserLog.state.sessionAnswers && window.ChemUserLog.state.sessionAnswers[chapId];
    if (sess) answeredNow = Object.keys(sess).length;
  }

  const now = new Date();
  const timeStr = now.toTimeString().slice(0, 8);

  const newLap = {
    lapNo,
    splitSec,
    totalSec,
    splitText: formatDuration(splitSec),
    totalText: formatDuration(totalSec),
    answeredCount: answeredNow,
    timeStr
  };

  window.chemApp.currentChapterLaps.unshift(newLap);
  renderChapterLapsUI();
  saveChapterTimerAndLapsToCloud(chapId, true);
}

function updateTimerDisplay() {
  const el = document.getElementById('chapterTimerDisplay');
  if (el) {
    el.textContent = formatDuration(window.chemApp.timerSeconds);
  }
}

function renderChapterLapsUI() {
  const stripEl = document.getElementById('chapterLapsStrip');
  if (!stripEl) return;

  const laps = window.chemApp.currentChapterLaps || [];
  if (laps.length === 0) {
    stripEl.style.display = 'none';
    stripEl.innerHTML = '';
    return;
  }

  stripEl.style.display = 'flex';
  stripEl.innerHTML = laps
    .map(
      l => `
      <div style="display:inline-flex; align-items:center; gap:6px; background:${M3.accentSoft}; border:1px solid ${M3.accentBorder}; color:${M3.primary}; padding:4px 10px; border-radius:10px; font-size:11px; white-space:nowrap;">
        <span>Lap ${l.lapNo}</span>
        <span style="color:${M3.textMain};">+${l.splitText}</span>
        <span style="color:${M3.textSub};">(總 ${l.totalText}${l.answeredCount ? ` · 答${l.answeredCount}題` : ''})</span>
      </div>
    `
    )
    .join('');
}

// 9. 右下角懸浮按鈕組 (套用 Material You 暖杏橙黃色與細字體)
function ensureFloatingActionGroup() {
  let grp = document.getElementById('floatingActionGroup');
  if (!grp) {
    grp = document.createElement('div');
    grp.id = 'floatingActionGroup';
    grp.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:9998; display:none; flex-direction:column; gap:10px; align-items:flex-end; font-family:sans-serif;';
    grp.innerHTML = `
      <div id="footerStreakBox" style="display:none; background:${M3.accentSoft}; padding:0 18px; border-radius:20px; border:1px solid ${M3.accentBorder}; font-size:13px; color:${M3.primary}; box-shadow:0 4px 12px rgba(143,78,0,0.1); height:40px; min-width:116px; box-sizing:border-box; align-items:center; justify-content:center; white-space:nowrap;">
        Streak: <span id="footerStreakCount" style="margin-left:5px;">0</span>
      </div>
      <button id="endChapterBtn" class="sound-trigger" style="display:none; background:${M3.wrongBg}; color:${M3.wrongText}; border:1px solid ${M3.wrongBorder}; padding:0 18px; border-radius:20px; font-size:13px; box-shadow:0 4px 12px rgba(138,58,43,0.12); cursor:pointer; height:40px; min-width:116px; box-sizing:border-box; align-items:center; justify-content:center; white-space:nowrap;">
        結束當前 MC
      </button>
      <button id="mobileToggleSidebarBtn" class="sound-trigger" style="display:flex; background:${M3.primary}; color:#fff; border:none; padding:0 18px; border-radius:20px; font-size:13px; box-shadow:0 4px 14px rgba(143,78,0,0.2); cursor:pointer; height:40px; min-width:116px; box-sizing:border-box; align-items:center; justify-content:center; white-space:nowrap;">
        目錄選單
      </button>
    `;
    document.body.appendChild(grp);

    grp.querySelector('#mobileToggleSidebarBtn').onclick = () => {
      SoundFX.playClick();
      renderCenterDirectoryModal();
      const m = document.getElementById('centerDirectoryModal');
      if (m) m.style.display = 'flex';
    };

    grp.querySelector('#endChapterBtn').onclick = () => {
      SoundFX.playClick();
      openEndChapterConfirmModal();
    };
  }
  return grp;
}

function updateFloatingButtonsVisibility() {
  const grp = ensureFloatingActionGroup();
  const isLogged = window.ChemUserLog && window.ChemUserLog.currentUser !== null;
  if (!isLogged) {
    grp.style.display = 'none';
    return;
  }

  grp.style.display = 'flex';
  const streakBox = grp.querySelector('#footerStreakBox');
  const streakCount = grp.querySelector('#footerStreakCount');
  const endBtn = grp.querySelector('#endChapterBtn');
  const dirBtn = grp.querySelector('#mobileToggleSidebarBtn');

  if (dirBtn) dirBtn.style.display = 'flex';

  const currentStreak = window.ChemUserLog ? window.ChemUserLog.state.currentStreak : 0;
  if (streakCount) streakCount.textContent = currentStreak;

  if (window.chemApp.currentView === 'chapter') {
    if (streakBox) streakBox.style.display = 'flex';
    if (endBtn) endBtn.style.display = 'flex';
  } else {
    if (streakBox) streakBox.style.display = 'none';
    if (endBtn) endBtn.style.display = 'none';
  }
}

// 10. 「結束當前 MC」雙重確認內嵌彈窗
function openEndChapterConfirmModal() {
  let modal = document.getElementById('inlineConfirmModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'inlineConfirmModal';
    modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(44,34,24,0.4); z-index:99999; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;';
    document.body.appendChild(modal);
  }

  let yesCount = 0;
  let noCount = 0;

  const renderModalStep = (statusText, subText) => {
    modal.innerHTML = `
      <div style="background:${M3.surface}; padding:26px 28px; border-radius:28px; width:100%; max-width:340px; text-align:center; box-shadow:0 12px 36px rgba(44,34,24,0.18); border:1px solid ${M3.outline};">
        <h3 style="margin:0 0 10px 0; font-size:17px; color:${M3.textMain};">結束當前 MC 練習</h3>
        <p style="font-size:14px; color:${M3.primary}; margin:0 0 8px 0; line-height:1.5;">${statusText}</p>
        <p style="font-size:12px; color:${M3.textSub}; margin:0 0 20px 0; line-height:1.4;">${subText}</p>
        <div style="display:flex; gap:12px;">
          <button id="confirmYesBtn" style="flex:1; background:${yesCount === 1 ? M3.wrongText : M3.wrongBg}; color:${yesCount === 1 ? '#fff' : M3.wrongText}; border:1px solid ${M3.wrongBorder}; padding:10px; border-radius:14px; font-size:14px; cursor:pointer;">
            是 ${yesCount > 0 ? `(${yesCount}/2)` : ''}
          </button>
          <button id="confirmNoBtn" style="flex:1; background:${noCount === 1 ? M3.accentSoft : M3.surfaceWarm}; color:${M3.textMain}; border:1px solid ${M3.outline}; padding:10px; border-radius:14px; font-size:14px; cursor:pointer;">
            否 ${noCount > 0 ? `(${noCount}/2)` : ''}
          </button>
        </div>
      </div>
    `;

    modal.querySelector('#confirmYesBtn').onclick = async () => {
      SoundFX.playClick();
      noCount = 0;
      yesCount += 1;
      if (yesCount === 1) {
        renderModalStep(
          '請再按一次「是」確認結束 (1/2)',
          '結束後將自動記錄最後一圈計時，並重置本課題當次選項。'
        );
      } else if (yesCount >= 2) {
        modal.style.display = 'none';
        // 若計時器有跑過，結束時自動幫學生存下最後一圈 Lap 到雲端
        if (window.chemApp.timerSeconds > window.chemApp.lastLapTotalSeconds) {
          recordLap();
        }
        pauseTimer();
        if (window.ChemUserLog) {
          await window.ChemUserLog.finalizeAndResetChapterSession(
            window.chemApp.activeChapterId,
            window.chemApp.currentLang
          );
        }
        showHomeView();
      }
    };

    modal.querySelector('#confirmNoBtn').onclick = () => {
      SoundFX.playClick();
      yesCount = 0;
      noCount += 1;
      if (noCount === 1) {
        renderModalStep(
          '請再按一次「否」返回繼續作答 (1/2)',
          '取消結束，保留目前所有鎖定作答選項與計時。'
        );
      } else if (noCount >= 2) {
        modal.style.display = 'none';
      }
    };
  };

  renderModalStep(
    '確定要結束當前 MC 練習嗎？',
    '結束後才會解鎖並清空本課題當次已選答案。'
  );
  modal.style.display = 'flex';
}

// 11. 視圖切換：回到首頁 vs. 進入章節練習 (含雲端 Lap 分圈列)
function showHomeView() {
  window.chemApp.currentView = 'home';
  pauseTimer();

  const chapWrapper = document.getElementById('chemChapterViewWrapper');
  if (chapWrapper) chapWrapper.style.display = 'none';

  renderHomeDashboard();
  const homeEl = document.getElementById('chemDashboardHome');
  if (homeEl) homeEl.style.display = 'block';

  updateFloatingButtonsVisibility();
}

function switchRightPanelToChapterView() {
  window.chemApp.currentView = 'chapter';

  const homeEl = document.getElementById('chemDashboardHome');
  if (homeEl) homeEl.style.display = 'none';

  let rightMain = document.getElementById('chemAppRootContainer') || document.body;
  let wrapper = document.getElementById('chemChapterViewWrapper');

  if (!wrapper) {
    const muted = window.chemApp.isMuted;
    wrapper = document.createElement('div');
    wrapper.id = 'chemChapterViewWrapper';
    wrapper.style.cssText = 'width: 100%; max-width: 780px; margin: 0 auto; padding: 8px 12px 140px 12px; box-sizing: border-box;';

    wrapper.innerHTML = `
      <div id="chapterHeaderBar" class="m3-card" style="background:${M3.surface}; padding:12px 16px; border-radius:22px; border:1px solid ${M3.outline}; margin-bottom:14px; display:flex; flex-direction:column; gap:10px;">
        <!-- 第一層：返回、章節標題、靜音與載入檔案 -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
            <button id="backHomeTopBtn" class="sound-trigger" style="padding:5px 12px; font-size:12px; border:1px solid ${M3.accentBorder}; border-radius:14px; background:${M3.accentSoft}; color:${M3.primary}; cursor:pointer; white-space:nowrap;">
              &lsaquo; 首頁
            </button>
            <h2 id="currentChapterTitle" class="m3-title-medium" style="margin:0; font-size:15px; color:${M3.textMain}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">請選擇章節</h2>
          </div>
          <div style="display:flex; align-items:center; gap:6px; white-space:nowrap;">
            <button class="chem-mute-toggle-btn" style="padding:5px 10px; font-size:11px; border:1px solid ${muted ? M3.wrongBorder : M3.outline}; border-radius:12px; background:${muted ? M3.wrongBg : M3.surfaceWarm}; color:${muted ? M3.wrongText : M3.textMain}; cursor:pointer;">
              ${muted ? '靜音中' : '音效: 開'}
            </button>
            <label style="padding:5px 10px; font-size:11px; border:1px solid ${M3.outline}; border-radius:12px; background:${M3.surfaceWarm}; cursor:pointer; color:${M3.textSub};" class="sound-trigger">
              載入 .docx
              <input type="file" id="manualDocxInput" accept=".docx" style="display:none;" />
            </label>
          </div>
        </div>

        <!-- 第二層：計時器、分圈 (Lap) 按鈕與題數統計 -->
        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:8px; border-top:1px solid ${M3.outlineLight}; font-size:12px; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span style="color:${M3.textSub};">計時</span>
            <span id="chapterTimerDisplay" style="font-family:monospace; font-size:13px; color:${M3.primary}; background:${M3.bg}; padding:3px 9px; border-radius:8px; border:1px solid ${M3.outline};">00:00</span>
            <button id="timerToggleBtn" style="border:none; background:${M3.primary}; color:#fff; font-size:11px; padding:4px 11px; border-radius:10px; cursor:pointer;">開始</button>
            <button id="timerLapBtn" style="border:1px solid ${M3.accentBorder}; background:${M3.accentSoft}; color:${M3.primary}; font-size:11px; padding:4px 11px; border-radius:10px; cursor:pointer;">分圈 Lap</button>
            <button id="timerResetBtn" style="border:1px solid ${M3.outline}; background:${M3.surfaceWarm}; color:${M3.textSub}; font-size:11px; padding:4px 10px; border-radius:10px; cursor:pointer;">重置</button>
          </div>
          <span id="chapterStats" style="font-size:12px; color:${M3.textSub};"></span>
        </div>

        <!-- 第三層：雲端同步的分圈 (Lap) 紀錄橫向捲軸 -->
        <div id="chapterLapsStrip" class="lap-scroll-strip" style="display:none; gap:6px; overflow-x:auto; padding-top:4px; padding-bottom:2px; align-items:center;"></div>
      </div>
      <div id="questionList"></div>
    `;
    rightMain.appendChild(wrapper);

    wrapper.querySelector('.chem-mute-toggle-btn').onclick = () => SoundFX.toggleMute();

    const tBtn = wrapper.querySelector('#timerToggleBtn');
    const lBtn = wrapper.querySelector('#timerLapBtn');
    const rBtn = wrapper.querySelector('#timerResetBtn');

    tBtn.onclick = () => {
      SoundFX.playClick();
      if (window.chemApp.isTimerRunning) {
        pauseTimer();
        tBtn.textContent = '繼續';
        tBtn.style.background = M3.primaryBtn;
      } else {
        startTimer();
        tBtn.textContent = '暫停';
        tBtn.style.background = M3.wrongText;
      }
    };

    lBtn.onclick = () => {
      SoundFX.playClick();
      recordLap();
    };

    rBtn.onclick = () => {
      SoundFX.playClick();
      resetTimer();
      tBtn.textContent = '開始';
      tBtn.style.background = M3.primary;
    };

    wrapper.querySelector('#backHomeTopBtn').onclick = () => {
      SoundFX.playClick();
      showHomeView();
    };

    wrapper.querySelector('#manualDocxInput').onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file || !window.chemApp.activeChapterId) return;
      const chapId = window.chemApp.activeChapterId;
      const dbKey = `${window.chemApp.currentLang}_${chapId}`;
      const qContainer = wrapper.querySelector('#questionList');
      qContainer.innerHTML = `<div style="text-align:center; padding:48px; color:${M3.primary};">正在解析本機檔案 <code>${file.name}</code> ...</div>`;
      try {
        const buf = await file.arrayBuffer();
        const list = await DocxExtractor.extract(buf, chapId);
        window.chemApp.questionsDB[dbKey] = list;
        window.chemApp.chapterCounts[dbKey] = list.length;
        await ChemChapterCache.saveChapter(dbKey, list);
        if (window.ChemUserLog) {
          window.ChemUserLog.setActiveChapter(chapId, list.length, window.chemApp.currentLang);
        }
        renderQuestions(list, chapId);
      } catch (err) {
        qContainer.innerHTML = `<div style="color:${M3.wrongText}; padding:32px;">手動解析失敗：${err.message}</div>`;
      }
    };
  }

  updateMuteButtonsUI();
  wrapper.style.display = 'block';
  updateFloatingButtonsVisibility();
  return wrapper;
}

// 12. 開啟章節並載入題庫 (自動從雲端恢復該章節的計時秒數與 Lap 紀錄)
async function openChapter(chapId) {
  window.chemApp.activeChapterId = chapId;
  const lookup = CHAPTER_MAP[chapId];
  if (!lookup) return;

  pauseTimer();
  loadChapterTimerAndLapsFromCloud(chapId);

  const wrapper = switchRightPanelToChapterView();
  const tBtn = document.getElementById('timerToggleBtn');
  if (tBtn) {
    tBtn.textContent = window.chemApp.timerSeconds > 0 ? '繼續' : '開始';
    tBtn.style.background = M3.primary;
  }
  updateTimerDisplay();
  renderChapterLapsUI();

  const titleEl = wrapper.querySelector('#currentChapterTitle');
  const container = wrapper.querySelector('#questionList');
  if (titleEl) titleEl.textContent = lookup.chapter.name;

  const lang = window.chemApp.currentLang;
  const dbKey = `${lang}_${chapId}`;

  if (window.chemApp.questionsDB[dbKey] && window.chemApp.questionsDB[dbKey].length > 0) {
    const list = window.chemApp.questionsDB[dbKey];
    if (window.ChemUserLog) window.ChemUserLog.setActiveChapter(chapId, list.length, lang);
    renderQuestions(list, chapId);
    return;
  }

  const cachedList = await ChemChapterCache.loadChapter(dbKey);
  if (cachedList && cachedList.length > 0) {
    window.chemApp.questionsDB[dbKey] = cachedList;
    window.chemApp.chapterCounts[dbKey] = cachedList.length;
    if (window.ChemUserLog) window.ChemUserLog.setActiveChapter(chapId, cachedList.length, lang);
    renderQuestions(cachedList, chapId);
    return;
  }

  container.innerHTML = `
    <div style="text-align:center; padding:56px 20px; background:${M3.surface}; border-radius:24px; border:1px solid ${M3.outline}; color:${M3.textSub};">
      <div style="font-size:15px; color:${M3.primary}; margin-bottom:8px;">正在載入並解析題庫...</div>
    </div>
  `;

  const pad = String(chapId).padStart(2, '0');
  const candidateUrls = [
    `./docs/chemqb_ch${pad}_mcq_${lang}.docx`,
    `./docs/chemqb_ch${chapId}_mcq_${lang}.docx`,
    `docs/chemqb_ch${pad}_mcq_${lang}.docx`
  ];

  let arrayBuffer = null;
  for (const u of candidateUrls) {
    try {
      const res = await fetch(u, { cache: 'no-cache' });
      if (res.ok) {
        arrayBuffer = await res.arrayBuffer();
        break;
      }
    } catch (e) {}
  }

  if (!arrayBuffer) {
    container.innerHTML = `
      <div style="text-align:center; padding:48px 24px; background:${M3.surface}; border-radius:24px; border:1px solid ${M3.wrongBorder}; color:${M3.wrongText};">
        <div style="font-size:15px; margin-bottom:8px;">找不到遠端題庫檔案 (ch${pad}_mcq_${lang}.docx)</div>
        <div style="font-size:13px; color:${M3.textSub};">可點擊右上方「載入 .docx」手動選擇題庫練習。</div>
      </div>
    `;
    return;
  }

  try {
    const list = await DocxExtractor.extract(arrayBuffer, chapId);
    window.chemApp.questionsDB[dbKey] = list;
    window.chemApp.chapterCounts[dbKey] = list.length;
    await ChemChapterCache.saveChapter(dbKey, list);
    if (window.ChemUserLog) window.ChemUserLog.setActiveChapter(chapId, list.length, lang);
    renderQuestions(list, chapId);
  } catch (err) {
    container.innerHTML = `<div style="color:${M3.wrongText}; padding:32px; background:${M3.surface}; border-radius:24px;">解析失敗：${err.message}</div>`;
  }
}

// 13. 渲染題目卡片（柔和暖杏配色 + 細字重 + 單次點擊物理鎖死）
function renderQuestions(qList, chapId) {
  const wrapper = switchRightPanelToChapterView();
  const container = wrapper.querySelector('#questionList');
  const chapStats = wrapper.querySelector('#chapterStats');

  container.innerHTML = '';
  if (chapStats) chapStats.textContent = `共 ${qList.length} 題`;

  qList.forEach((q, index) => {
    const qOrderNum = index + 1;
    const card = document.createElement('div');
    card.className = 'question-card m3-card';
    card.style.cssText = `background:${M3.surface}; border-radius:24px; padding:20px 22px; margin-bottom:16px; border:1px solid ${M3.outline}; font-family:"Times New Roman", "Noto Serif TC", "PMingLiU", serif; box-sizing:border-box; width:100%;`;

    const hasExplanation = q.explanationHtml && q.explanationHtml.length > 0;

    card.innerHTML = `
      <div class="q-header" style="margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid ${M3.outlineLight}; padding-bottom:8px;">
        <span class="q-number" style="color:${M3.primary}; font-size:14px; font-family:sans-serif;">${q.qNumDisplay || `Q${qOrderNum}`}</span>
        <span style="font-size:12px; color:${M3.textMuted}; font-family:sans-serif;">第 ${qOrderNum} / ${qList.length} 題</span>
      </div>
      <div class="q-native-body" style="line-height:1.72; font-size:16px; color:${M3.textMain}; overflow-x:auto; word-break:break-word; font-family:'Times New Roman', 'Noto Serif TC', 'PMingLiU', serif;">
        ${q.htmlContent}
      </div>
      <div class="interactive-action-bar" style="margin-top:16px; padding-top:12px; border-top:1px dashed ${M3.outline}; font-family:sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span class="q-status-prompt" style="color:${M3.textSub}; font-size:12px;">請選擇答案（點擊後鎖定）：</span>
          <button class="peek-ans-btn sound-trigger" style="border:none; background:transparent; color:${M3.primary}; font-size:12px; cursor:pointer; padding:2px 6px;">顯示/隱藏解析</button>
        </div>
        <div class="options-btn-group" style="display:flex; gap:8px;">
          ${['A', 'B', 'C', 'D'].map(k => `
            <button type="button" class="opt-act-btn" data-opt="${k}" style="flex:1; padding:10px 2px; border:1px solid ${M3.accentBorder}; border-radius:12px; background:${M3.bg}; color:${M3.primary}; cursor:pointer; font-size:14px;">
              ${k}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="explanation-panel" style="display:none; margin-top:14px; padding:12px 14px; background:${M3.bg}; border-left:3px solid ${M3.primaryBtn}; border-radius:10px; font-family:'Times New Roman', 'Noto Serif TC', serif;">
        <div class="exp-title" style="color:${M3.primary}; font-size:14px; font-family:sans-serif; margin-bottom:${hasExplanation ? '6px' : '0'};">
          Answer: ${q.answer}
        </div>
        ${hasExplanation
          ? `<div class="exp-body" style="font-size:14px; color:${M3.textMain}; line-height:1.65; word-break:break-word;">${q.explanationHtml}</div>`
          : `<div style="font-size:12px; color:${M3.textMuted}; font-family:sans-serif; margin-top:4px;">（本題原檔無附帶文字解析）</div>`
        }
      </div>
    `;

    card.querySelectorAll('img').forEach(img => {
      img.style.maxWidth = '100%';
      img.style.maxHeight = '216px';
      img.style.width = 'auto';
      img.style.height = 'auto';
      img.style.display = 'block';
      img.style.margin = '10px auto';
    });

    DocxQuestionParser.stripGrayBoxNodes(card.querySelector('.q-native-body'));

    const optGroup = card.querySelector('.options-btn-group');
    const optBtns = card.querySelectorAll('.opt-act-btn');
    const expPanel = card.querySelector('.explanation-panel');
    const peekBtn = card.querySelector('.peek-ans-btn');
    const statusPrompt = card.querySelector('.q-status-prompt');

    let isQuestionLocked = false;

    const lockAndRenderOptionState = (selectedOpt, playSound = false) => {
      isQuestionLocked = true;
      card.dataset.locked = '1';

      const isCorrect = (selectedOpt === q.answer);
      if (playSound) SoundFX.playClick(isCorrect);

      if (statusPrompt) {
        statusPrompt.textContent = `已鎖定：選 ${selectedOpt}（${isCorrect ? '答對' : '答錯'} · 結束當前 MC 前不可更改）`;
        statusPrompt.style.color = isCorrect ? M3.correctText : M3.wrongText;
      }

      if (optGroup) {
        optGroup.style.pointerEvents = 'none';
        optGroup.style.userSelect = 'none';
      }

      optBtns.forEach(b => {
        b.disabled = true;
        b.onclick = null;
        b.style.cursor = 'not-allowed';
        b.style.pointerEvents = 'none';

        if (b.dataset.opt === q.answer) {
          b.style.background = M3.correctBg;
          b.style.color = M3.correctText;
          b.style.borderColor = M3.correctBorder;
          b.style.opacity = '1';
          b.textContent = `${b.dataset.opt} (正解)`;
        } else if (selectedOpt && b.dataset.opt === selectedOpt && selectedOpt !== q.answer) {
          b.style.background = M3.wrongBg;
          b.style.color = M3.wrongText;
          b.style.borderColor = M3.wrongBorder;
          b.style.opacity = '1';
          b.textContent = `${b.dataset.opt} (已選)`;
        } else {
          b.style.background = M3.surface;
          b.style.color = M3.textMuted;
          b.style.borderColor = M3.outlineLight;
          b.style.opacity = '0.45';
        }
      });

      expPanel.style.display = 'block';
    };

    if (window.ChemUserLog) {
      const sessionRec = window.ChemUserLog.getSessionAnswer(chapId, q.id);
      if (sessionRec && sessionRec.chosen) {
        lockAndRenderOptionState(sessionRec.chosen, false);
      }
    }

    optBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isQuestionLocked || card.dataset.locked === '1') return;

        if (window.ChemUserLog) {
          const existing = window.ChemUserLog.getSessionAnswer(chapId, q.id);
          if (existing && existing.chosen) {
            lockAndRenderOptionState(existing.chosen, false);
            return;
          }
        }

        const chosen = btn.dataset.opt;
        lockAndRenderOptionState(chosen, true);

        if (window.ChemUserLog) {
          const res = window.ChemUserLog.recordQuestionAnswer({
            qId: q.id,
            qNumDisplay: q.qNumDisplay || `Q${qOrderNum}`,
            qOrder: qOrderNum,
            chapId: chapId,
            chosen: chosen,
            correctAns: q.answer,
            lang: window.chemApp.currentLang
          });

          try {
            const st = window.ChemUserLog.state;
            if (st.uniqueAnswers && st.uniqueAnswers[q.id]) {
              st.uniqueAnswers[q.id].qOrder = qOrderNum;
              st.uniqueAnswers[q.id].lastTime = new Date().toISOString();
            }
            if (st.sessionAnswers && st.sessionAnswers[chapId] && st.sessionAnswers[chapId][q.id]) {
              st.sessionAnswers[chapId][q.id].qOrder = qOrderNum;
            }
            saveChapterTimerAndLapsToCloud(chapId, true);
          } catch (err) {}

          const streakEl = document.getElementById('footerStreakCount');
          if (streakEl && res) streakEl.textContent = res.currentStreak;
        }
      };
    });

    peekBtn.onclick = () => {
      SoundFX.playClick();
      const isHidden = expPanel.style.display === 'none';
      expPanel.style.display = isHidden ? 'block' : 'none';
    };

    container.appendChild(card);
  });
}

// 14. 計算多個最近做過的課題 (含雲端 Lap 紀錄、做了多少題、第幾題)
function buildRecentTopicsList() {
  if (!window.ChemUserLog || !window.ChemUserLog.state) return [];
  const st = window.ChemUserLog.state;
  const lang = window.chemApp.currentLang || 'e';
  const uniqueAns = st.uniqueAnswers || {};
  const sessionAns = st.sessionAnswers || {};
  const dailyLogs = st.dailyLogs || {};
  const cloudTimerMap = getCloudTimerMap();
  const chapMap = {};

  const ensureChapEntry = (chapId) => {
    const numId = parseInt(chapId, 10);
    if (!numId || !CHAPTER_MAP[numId]) return null;
    if (!chapMap[numId]) {
      const info = CHAPTER_MAP[numId];
      const countKey = `${lang}_${numId}`;
      const fallbackKey = `${lang === 'e' ? 'c' : 'e'}_${numId}`;
      const totalInChapter =
        (st.chapterCounts && (st.chapterCounts[countKey] || st.chapterCounts[fallbackKey])) ||
        (window.chemApp.chapterCounts && (window.chemApp.chapterCounts[countKey] || window.chemApp.chapterCounts[fallbackKey])) ||
        0;

      const tData = cloudTimerMap[numId] || {};

      chapMap[numId] = {
        chapId: numId,
        topicId: info.topic.topicId,
        topicName: info.topic.topicName,
        chapterName: info.chapter.name,
        totalInChapter,
        questionsMap: {},
        sessionCount: sessionAns[numId] ? Object.keys(sessionAns[numId]).length : 0,
        laps: Array.isArray(tData.laps) ? tData.laps : [],
        elapsedSec: parseInt(tData.elapsedSec || 0, 10),
        lastTimestamp: tData.updatedAt || ''
      };
    }
    return chapMap[numId];
  };

  Object.values(uniqueAns).forEach(rec => {
    if (!rec || !rec.chapId) return;
    const entry = ensureChapEntry(rec.chapId);
    if (!entry) return;
    const qOrder = rec.qOrder || extractQuestionOrderNumber(rec.qNumDisplay, rec.qId);
    const ts = rec.lastTime || rec.lastDate || '';
    entry.questionsMap[rec.qId] = {
      qId: rec.qId,
      qNumDisplay: rec.qNumDisplay || rec.qId.split('_ch')[0],
      qOrder,
      chosen: rec.chosen,
      correct: !!rec.correct,
      timestamp: ts
    };
    if (ts > entry.lastTimestamp) entry.lastTimestamp = ts;
  });

  Object.entries(sessionAns).forEach(([cId, chapSession]) => {
    const entry = ensureChapEntry(cId);
    if (!entry || !chapSession) return;
    Object.values(chapSession).forEach(sRec => {
      if (!sRec || !sRec.qId) return;
      const qOrder = sRec.qOrder || extractQuestionOrderNumber(sRec.qNumDisplay, sRec.qId);
      const ts = sRec.timestamp || '';
      entry.questionsMap[sRec.qId] = {
        qId: sRec.qId,
        qNumDisplay: sRec.qNumDisplay || sRec.qId.split('_ch')[0],
        qOrder,
        chosen: sRec.chosen,
        correct: !!sRec.correct,
        timestamp: ts
      };
      if (ts > entry.lastTimestamp) entry.lastTimestamp = ts;
    });
  });

  Object.entries(dailyLogs).forEach(([dateStr, dayObj]) => {
    (dayObj.items || []).forEach(it => {
      if (!it || !it.chapId) return;
      const entry = ensureChapEntry(it.chapId);
      if (!entry) return;
      const fullTs = `${dateStr}T${it.time || '00:00:00'}`;
      if (fullTs > entry.lastTimestamp) entry.lastTimestamp = fullTs;
      if (entry.questionsMap[it.qId] && fullTs > (entry.questionsMap[it.qId].timestamp || '')) {
        entry.questionsMap[it.qId].timestamp = fullTs;
      }
    });
  });

  if (st.recentTopic && st.recentTopic.chapId) {
    const rtEntry = ensureChapEntry(st.recentTopic.chapId);
    if (rtEntry && (st.recentTopic.lastUpdated || '') > rtEntry.lastTimestamp) {
      rtEntry.lastTimestamp = st.recentTopic.lastUpdated;
    }
  }

  return Object.values(chapMap)
    .filter(e => Object.keys(e.questionsMap).length > 0 || e.laps.length > 0 || e.chapId === (st.recentTopic && st.recentTopic.chapId))
    .map(e => {
      const qArr = Object.values(e.questionsMap);
      const answered = qArr.length;
      const correct = qArr.filter(q => q.correct).length;
      const wrong = answered - correct;
      const completionRate =
        e.totalInChapter > 0
          ? Math.min(100, Math.round((answered / e.totalInChapter) * 100))
          : answered > 0
          ? Math.min(100, Math.round((correct / answered) * 100))
          : 0;
      const remainingRate = Math.max(0, 100 - completionRate);

      const sortedByOrder = qArr.slice().sort((a, b) => (a.qOrder || 999) - (b.qOrder || 999));
      const sortedByTime = qArr.slice().sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));
      const latestQ = sortedByTime[0] || sortedByOrder[sortedByOrder.length - 1] || null;

      return {
        ...e,
        answered,
        correct,
        wrong,
        completionRate,
        remainingRate,
        sortedByOrder,
        latestQ
      };
    })
    .sort((a, b) => (b.lastTimestamp || '').localeCompare(a.lastTimestamp || ''));
}

// 15. 首頁 Dashboard 渲染 (統一淡橙黃 Material You 色系 + 細字重)
function renderHomeDashboard() {
  let rightMain = document.getElementById('chemAppRootContainer') || document.body;
  let dashboardEl = document.getElementById('chemDashboardHome');

  if (!dashboardEl) {
    dashboardEl = document.createElement('div');
    dashboardEl.id = 'chemDashboardHome';
    dashboardEl.style.cssText = 'width:100%; max-width:640px; margin:0 auto; padding:6px 14px 90px 14px; box-sizing:border-box; font-family:sans-serif;';
    rightMain.appendChild(dashboardEl);
  }

  dashboardEl.style.display = window.chemApp.currentView === 'home' ? 'block' : 'none';

  const summary = window.ChemUserLog
    ? window.ChemUserLog.getDashboardSummary()
    : {
        studentId: 'GUEST',
        cloudStatus: 'connecting',
        totalAppQuestions: TOTAL_APP_QUESTIONS,
        totalTopics: 15,
        totalChapters: 65,
        totalUniqueAnswered: 0,
        overallCompletionText: '0%',
        dailyList: []
      };

  const todayStr = new Date().toISOString().slice(0, 10);
  const recentTopicsList = buildRecentTopicsList();
  const visibleLimit = window.chemApp.showAllRecentTopics ? recentTopicsList.length : 4;
  const displayedRecentList = recentTopicsList.slice(0, visibleLimit);

  const cloudDotColor =
    summary.cloudStatus === 'synced'
      ? '#5B8C4A'
      : summary.cloudStatus === 'error'
      ? M3.wrongText
      : M3.primaryBtn;
  const cloudDotTitle =
    summary.cloudStatus === 'synced'
      ? '雲端已同步'
      : summary.cloudStatus === 'error'
      ? `雲端未連線: ${summary.cloudErrorMsg || ''}`
      : '雲端連線中...';

  const muted = window.chemApp.isMuted;

  const recentTopicsHtml =
    displayedRecentList.length === 0
      ? `
        <div style="text-align:center; padding:24px 12px; color:${M3.textSub}; font-size:13px; background:${M3.bg}; border-radius:16px; border:1px dashed ${M3.outline};">
          尚未選擇任何課題練習，請點擊右下角「目錄選單」開始。
        </div>
      `
      : displayedRecentList
          .map((item, idx) => {
            const totalTxt = item.totalInChapter > 0 ? `${item.answered} / ${item.totalInChapter} 題` : `已做 ${item.answered} 題`;
            const latestQTxt = item.latestQ
              ? `最新做到：<span style="color:${M3.primary};">第 ${item.latestQ.qOrder} 題</span> (${item.latestQ.qNumDisplay} · 選 ${item.latestQ.chosen} · ${item.latestQ.correct ? '對' : '錯'})`
              : '尚未作答題目';

            const qBadgesHtml =
              item.sortedByOrder.length === 0
                ? ''
                : `
                  <div style="margin-top:8px; display:flex; flex-wrap:wrap; gap:5px; align-items:center;">
                    <span style="font-size:11px; color:${M3.textSub};">已做題號：</span>
                    ${item.sortedByOrder
                      .slice(0, 18)
                      .map(
                        q => `
                        <span title="${q.qNumDisplay} (選 ${q.chosen})" style="font-size:11px; padding:2px 8px; border-radius:8px; border:1px solid ${
                          q.correct ? M3.accentBorder : M3.wrongBorder
                        }; background:${
                          q.correct ? M3.bg : M3.wrongBg
                        }; color:${q.correct ? M3.primary : M3.wrongText};">
                          第 ${q.qOrder} 題 (${q.correct ? '對' : '錯'})
                        </span>
                      `
                      )
                      .join('')}
                    ${
                      item.sortedByOrder.length > 18
                        ? `<span style="font-size:11px; color:${M3.textMuted};">...共 ${item.sortedByOrder.length} 題</span>`
                        : ''
                    }
                  </div>
                `;

            const lapsSummaryHtml =
              item.laps && item.laps.length > 0
                ? `
                  <div style="margin-top:6px; display:flex; flex-wrap:wrap; gap:5px; align-items:center;">
                    <span style="font-size:11px; color:${M3.textSub};">計時分圈 (${item.laps.length})：</span>
                    ${item.laps
                      .slice(0, 4)
                      .map(
                        l => `
                        <span style="font-size:11px; padding:2px 8px; border-radius:8px; background:${M3.surfaceWarm}; border:1px solid ${M3.outline}; color:${M3.textMain};">
                          Lap ${l.lapNo}: +${l.splitText} (總 ${l.totalText})
                        </span>
                      `
                      )
                      .join('')}
                  </div>
                `
                : item.elapsedSec > 0
                ? `<div style="margin-top:6px; font-size:11px; color:${M3.textSub};">累計計時：${formatDuration(item.elapsedSec)}</div>`
                : '';

            return `
              <div style="background:${idx === 0 ? M3.bg : M3.surface}; border:1px solid ${idx === 0 ? M3.accentBorder : M3.outline}; border-radius:18px; padding:14px 16px; margin-bottom:12px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; flex-wrap:wrap; margin-bottom:6px;">
                  <div style="flex:1; min-width:180px;">
                    <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:4px;">
                      <span style="font-size:11px; color:${M3.primary}; background:${M3.accentSoft}; border:1px solid ${M3.accentBorder}; padding:2px 8px; border-radius:8px;">
                        ${idx === 0 ? '最近練習' : `#${idx + 1}`}
                      </span>
                      <span style="font-size:11px; color:${M3.textSub}; background:${M3.surfaceWarm}; padding:2px 8px; border-radius:8px;">
                        還差 ${item.remainingRate}%
                      </span>
                      ${
                        item.sessionCount > 0
                          ? `<span style="font-size:11px; color:${M3.primary}; background:${M3.accentSoft}; padding:2px 8px; border-radius:8px;">進行中 (${item.sessionCount} 題未結算)</span>`
                          : ''
                      }
                    </div>
                    <div class="m3-title-medium" style="font-size:14px; color:${M3.textMain}; margin-top:4px;">
                      ${item.topicName} — ${item.chapterName}
                    </div>
                  </div>
                  <button class="recent-chap-jump-btn sound-trigger" data-chid="${item.chapId}" style="background:${M3.primaryBtn}; color:#fff; border:none; padding:6px 13px; border-radius:12px; font-size:12px; cursor:pointer; white-space:nowrap;">
                    繼續練習 &rsaquo;
                  </button>
                </div>

                <!-- 暖色進度條 -->
                <div style="width:100%; background:${M3.surfaceWarm}; height:5px; border-radius:3px; overflow:hidden; margin:8px 0;">
                  <div style="width:${item.completionRate}%; background:${M3.primaryBtn}; height:100%; transition:width 0.3s;"></div>
                </div>

                <!-- 做了多少題 & 最新做到第幾題 -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; font-size:12px; color:${M3.textMain}; background:${M3.surface}; padding:8px 12px; border-radius:12px; border:1px solid ${M3.outlineLight};">
                  <div>
                    進度：<span style="color:${M3.primary};">${totalTxt}</span>
                    <span style="margin-left:6px; color:${M3.textSub};">對 ${item.correct} · 錯 ${item.wrong} · 完成 ${item.completionRate}%</span>
                  </div>
                  <div style="color:${M3.textSub};">
                    ${latestQTxt}
                  </div>
                </div>

                ${qBadgesHtml}
                ${lapsSummaryHtml}
              </div>
            `;
          })
          .join('');

  const dailyListHtml =
    summary.dailyList.length === 0
      ? `<div style="font-size:13px; color:${M3.textMuted}; text-align:center; padding:18px 0;">尚無作答記錄，快去開始練習吧！</div>`
      : summary.dailyList
          .map(
            item => `
        <div class="daily-record-item sound-trigger" data-date="${item.date}" style="display:flex; justify-content:space-between; align-items:center; padding:10px 16px; background:${M3.surface}; border-radius:14px; margin-bottom:8px; border:1px solid ${M3.outline}; cursor:pointer;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="color:${M3.textMain}; font-size:13px;">${item.date}</span>
            <span style="font-size:11px; color:${M3.primary}; background:${M3.bg}; border:1px solid ${M3.outline}; padding:2px 8px; border-radius:8px;">對 ${item.correctCount}</span>
            <span style="font-size:11px; color:${M3.wrongText}; background:${M3.wrongBg}; padding:2px 8px; border-radius:8px;">錯 ${item.wrongCount}</span>
          </div>
          <span style="color:${M3.primary}; font-size:13px;">答了 ${item.count} 題 <span style="font-size:11px; color:${M3.textMuted};">(查看 &rsaquo;)</span></span>
        </div>
      `
          )
          .join('');

  dashboardEl.innerHTML = `
    <!-- 頂部導覽列 (Material You 淡橙黃配色 + 細字體) -->
    <div style="background:${M3.surface}; border:1px solid ${M3.outline}; border-radius:24px; padding:10px 16px; margin-top:4px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="m3-title-medium" style="font-size:16px; color:${M3.primary}; letter-spacing:0.4px;">CHEM QB</span>
        <span style="font-size:10px; color:${M3.textSub}; background:${M3.surfaceWarm}; padding:2px 6px; border-radius:6px;">v53</span>
        <span style="display:inline-flex; align-items:center; gap:5px; font-size:12px; color:${M3.primary}; background:${M3.accentSoft}; border:1px solid ${M3.accentBorder}; padding:3px 10px; border-radius:12px;" title="${cloudDotTitle}">
          <span style="width:7px; height:7px; border-radius:50%; background:${cloudDotColor}; display:inline-block;"></span>
          ${summary.studentId}
        </span>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <button id="homeMuteBtn" class="chem-mute-toggle-btn" style="background:${muted ? M3.wrongBg : M3.surfaceWarm}; color:${muted ? M3.wrongText : M3.textMain}; border:1px solid ${muted ? M3.wrongBorder : M3.outline}; padding:5px 10px; border-radius:12px; font-size:11px; cursor:pointer;">
          ${muted ? '靜音中' : '音效: 開'}
        </button>
        <button id="homeAdminBtn" class="sound-trigger" style="background:${M3.surfaceWarm}; color:${M3.textSub}; border:1px solid ${M3.outline}; padding:5px 10px; border-radius:12px; font-size:11px; cursor:pointer;">Admin</button>
        <button id="homeLogoutBtn" class="sound-trigger" style="background:${M3.surface}; border:1px solid ${M3.wrongBorder}; color:${M3.wrongText}; padding:5px 10px; border-radius:12px; font-size:11px; cursor:pointer;">登出</button>
      </div>
    </div>

    <!-- 多個 Recent Topics / Chapters 卡片 -->
    <div class="m3-card" style="background:${M3.surface}; border:1px solid ${M3.outline}; border-radius:24px; padding:18px 20px; margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:6px;">
        <div>
          <span class="m3-title-medium" style="font-size:14px; color:${M3.primary};">Recent Topics / Chapters</span>
          <span style="font-size:12px; color:${M3.textSub}; margin-left:6px;">(共練習過 ${recentTopicsList.length} 個章節)</span>
        </div>
        ${
          recentTopicsList.length > 4
            ? `<button id="toggleMoreRecentBtn" class="sound-trigger" style="background:${M3.accentSoft}; color:${M3.primary}; border:1px solid ${M3.accentBorder}; padding:4px 10px; border-radius:10px; font-size:12px; cursor:pointer;">
                ${window.chemApp.showAllRecentTopics ? '收起部分 ▲' : `展開全部 (${recentTopicsList.length}) ▼`}
              </button>`
            : ''
        }
      </div>

      <div>
        ${recentTopicsHtml}
      </div>
    </div>

    <!-- 每日練習記錄卡片 -->
    <div class="m3-card" style="background:${M3.surface}; border:1px solid ${M3.outline}; border-radius:24px; padding:18px 20px; margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <h3 class="m3-title-medium" style="margin:0; font-size:14px; color:${M3.textMain};">每日練習記錄</h3>
        <div style="display:flex; align-items:center; gap:6px;">
          <input type="date" id="homeQuickDatePicker" value="${todayStr}" style="padding:4px 8px; border:1px solid ${M3.outline}; border-radius:10px; font-size:12px; cursor:pointer; background:${M3.bg}; color:${M3.textMain};" />
          <button id="openFullDailyInspectorBtn" class="sound-trigger" style="background:${M3.accentSoft}; color:${M3.primary}; border:1px solid ${M3.accentBorder}; padding:5px 10px; border-radius:10px; font-size:12px; cursor:pointer;">查看明細</button>
        </div>
      </div>
      <div style="max-height:175px; overflow-y:auto; padding-right:2px;">
        ${dailyListHtml}
      </div>
    </div>

    <!-- MC 語言切換卡片 -->
    <div class="m3-card" style="background:${M3.surface}; border:1px solid ${M3.outline}; border-radius:24px; padding:14px 20px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:14px; color:${M3.textMain};">MC 語言 <span style="color:${M3.textMuted}; font-size:12px;">(Stay tuned)</span></span>
      <div style="display:flex; background:${M3.surfaceWarm}; border-radius:20px; padding:3px; gap:4px; border:1px solid ${M3.outline};">
        <button id="langEnBtn" class="sound-trigger" style="border:none; background:${window.chemApp.currentLang === 'e' ? M3.primaryBtn : 'transparent'}; color:${window.chemApp.currentLang === 'e' ? '#fff' : M3.textSub}; padding:5px 14px; border-radius:16px; font-size:13px; cursor:pointer;">英</button>
        <button id="langZhBtn" class="sound-trigger" style="border:none; background:${window.chemApp.currentLang === 'c' ? M3.primaryBtn : 'transparent'}; color:${window.chemApp.currentLang === 'c' ? '#fff' : M3.textSub}; padding:5px 14px; border-radius:16px; font-size:13px; cursor:pointer;">中</button>
      </div>
    </div>

    <!-- 底部總覽卡片 -->
    <div class="m3-card" style="background:${M3.surface}; border:1px solid ${M3.outline}; border-radius:24px; padding:18px 16px; text-align:center; display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <div style="font-size:12px; color:${M3.textSub};">總 Topic</div>
        <div style="font-size:20px; color:${M3.textMain}; margin-top:2px;">15</div>
      </div>
      <div>
        <div style="font-size:12px; color:${M3.textSub};">總 Chapter</div>
        <div style="font-size:20px; color:${M3.textMain}; margin-top:2px;">65</div>
      </div>
      <div>
        <div style="font-size:12px; color:${M3.textSub};">總題目數</div>
        <div style="font-size:20px; color:${M3.textMain}; margin-top:2px;">${summary.totalUniqueAnswered} <span style="font-size:13px; color:${M3.textMuted};">/ ${TOTAL_APP_QUESTIONS}</span></div>
      </div>
      <div>
        <div style="font-size:12px; color:${M3.textSub};">完成</div>
        <div style="font-size:20px; color:${M3.primary}; margin-top:2px;">${summary.overallCompletionText}</div>
      </div>
    </div>
  `;

  dashboardEl.querySelector('#homeMuteBtn').onclick = () => SoundFX.toggleMute();

  const toggleMoreBtn = dashboardEl.querySelector('#toggleMoreRecentBtn');
  if (toggleMoreBtn) {
    toggleMoreBtn.onclick = () => {
      SoundFX.playClick();
      window.chemApp.showAllRecentTopics = !window.chemApp.showAllRecentTopics;
      renderHomeDashboard();
    };
  }

  dashboardEl.querySelectorAll('.recent-chap-jump-btn').forEach(btn => {
    btn.onclick = (e) => {
      SoundFX.playClick();
      const chId = parseInt(e.currentTarget.getAttribute('data-chid'), 10);
      if (chId) openChapter(chId);
    };
  });

  dashboardEl.querySelector('#homeAdminBtn').onclick = () => {
    SoundFX.playClick();
    openDiscreetAdminModal();
  };

  dashboardEl.querySelector('#homeLogoutBtn').onclick = () => {
    SoundFX.playClick();
    if (window.ChemUserLog) window.ChemUserLog.logout();
  };

  dashboardEl.querySelector('#openFullDailyInspectorBtn').onclick = () => {
    SoundFX.playClick();
    const pickedDate = dashboardEl.querySelector('#homeQuickDatePicker').value;
    if (window.ChemUserLog) window.ChemUserLog.openDailyLogModal(pickedDate);
  };

  dashboardEl.querySelector('#homeQuickDatePicker').onchange = (e) => {
    SoundFX.playClick();
    if (window.ChemUserLog && e.target.value) {
      window.ChemUserLog.openDailyLogModal(e.target.value);
    }
  };

  dashboardEl.querySelectorAll('.daily-record-item').forEach(item => {
    item.onclick = (e) => {
      SoundFX.playClick();
      const dateStr = e.currentTarget.getAttribute('data-date');
      if (window.ChemUserLog) window.ChemUserLog.openDailyLogModal(dateStr);
    };
  });

  dashboardEl.querySelector('#langEnBtn').onclick = () => {
    SoundFX.playClick();
    window.chemApp.currentLang = 'e';
    localStorage.setItem('CHEM_LANG_V47', 'e');
    renderHomeDashboard();
    updateFloatingButtonsVisibility();
  };

  dashboardEl.querySelector('#langZhBtn').onclick = () => {
    SoundFX.playClick();
    window.chemApp.currentLang = 'c';
    localStorage.setItem('CHEM_LANG_V47', 'c');
    renderHomeDashboard();
    updateFloatingButtonsVisibility();
  };
}

// 16. 螢幕正中央 28px 圓角 Topic / Chapter 目錄卡片 (Material You 淡橙黃配色)
function renderCenterDirectoryModal() {
  let modal = document.getElementById('centerDirectoryModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'centerDirectoryModal';
    modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(44,34,24,0.42); z-index:99999; justify-content:center; align-items:center; padding:18px; box-sizing:border-box; font-family:sans-serif;';
    document.body.appendChild(modal);
  }

  const uniqueAns = (window.ChemUserLog && window.ChemUserLog.state.uniqueAnswers) || {};
  const sessionAns = (window.ChemUserLog && window.ChemUserLog.state.sessionAnswers) || {};

  let contentHtml = `
    <div style="background:${M3.surface}; width:100%; max-width:440px; height:82vh; max-height:640px; border-radius:28px; box-shadow:0 14px 44px rgba(44,34,24,0.2); display:flex; flex-direction:column; overflow:hidden; border:1px solid ${M3.outline};">
      <div style="padding:18px 24px; background:${M3.accentSoft}; color:${M3.primary}; border-bottom:1px solid ${M3.accentBorder}; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h2 class="m3-title-medium" style="margin:0; font-size:17px;">選擇 Topic / Chapter</h2>
          <div style="font-size:11px; color:${M3.textSub}; margin-top:2px;">共 15 個課題、65 個章節（點擊展開）</div>
        </div>
        <button id="closeDirModalBtn" class="sound-trigger" style="background:${M3.surface}; border:1px solid ${M3.accentBorder}; color:${M3.primary}; width:32px; height:32px; border-radius:16px; font-size:18px; cursor:pointer; line-height:1;">&times;</button>
      </div>
      <div style="flex:1; overflow-y:auto; padding:16px 20px; background:${M3.bg};">
  `;

  SYLLABUS_CONFIG.forEach(topic => {
    const isCurrentTopic = topic.chapters.some(c => c.id === window.chemApp.activeChapterId);
    contentHtml += `
      <div style="background:${M3.surface}; border-radius:18px; margin-bottom:10px; border:1px solid ${M3.outline}; overflow:hidden;">
        <div class="dir-topic-header sound-trigger" style="padding:13px 16px; background:${M3.surfaceWarm}; font-size:14px; color:${M3.textMain}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          <span>${topic.topicName}</span>
          <span class="dir-arrow" style="font-size:11px; color:${M3.textSub};">${isCurrentTopic ? '▼' : '▶'}</span>
        </div>
        <div class="dir-chapter-list" style="display:${isCurrentTopic ? 'flex' : 'none'}; flex-direction:column;">
    `;
    topic.chapters.forEach(ch => {
      const doneInChap = Object.values(uniqueAns).filter(r => parseInt(r.chapId, 10) === ch.id).length;
      const inProgressCount = sessionAns[ch.id] ? Object.keys(sessionAns[ch.id]).length : 0;
      const isActive = ch.id === window.chemApp.activeChapterId;
      contentHtml += `
          <div class="dir-chapter-item sound-trigger" data-chid="${ch.id}" style="padding:11px 16px 11px 20px; border-top:1px solid ${M3.outlineLight}; font-size:13px; color:${isActive ? M3.primary : M3.textMain}; background:${isActive ? M3.accentSoft : M3.surface}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>${ch.name}</span>
            <span style="font-size:12px; color:${M3.primary}; white-space:nowrap; margin-left:8px;">
              ${inProgressCount > 0 ? `進行中(${inProgressCount}) · ` : doneInChap > 0 ? `已答 ${doneInChap} 題 · ` : ''}進入 &rsaquo;
            </span>
          </div>
      `;
    });
    contentHtml += `</div></div>`;
  });

  contentHtml += `</div></div>`;
  modal.innerHTML = contentHtml;

  modal.querySelector('#closeDirModalBtn').onclick = () => {
    SoundFX.playClick();
    modal.style.display = 'none';
  };

  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };

  modal.querySelectorAll('.dir-topic-header').forEach(header => {
    header.onclick = (e) => {
      SoundFX.playClick();
      const list = e.currentTarget.nextElementSibling;
      const arrow = e.currentTarget.querySelector('.dir-arrow');
      const isHidden = (list.style.display === 'none');
      list.style.display = isHidden ? 'flex' : 'none';
      if (arrow) arrow.textContent = isHidden ? '▼' : '▶';
    };
  });

  modal.querySelectorAll('.dir-chapter-item').forEach(item => {
    item.onclick = (e) => {
      SoundFX.playClick();
      const chId = parseInt(e.currentTarget.getAttribute('data-chid'), 10);
      modal.style.display = 'none';
      openChapter(chId);
    };
  });
}

// 17. 全屏登入 / 註冊閘道 (淡橙黃 Material You 風格)
function ensureAuthOverlay() {
  let authOverlay = document.getElementById('chemAuthOverlay');
  if (authOverlay) return authOverlay;

  authOverlay = document.createElement('div');
  authOverlay.id = 'chemAuthOverlay';
  authOverlay.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:${M3.bg}; z-index:99999; display:flex; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;`;

  authOverlay.innerHTML = `
    <div style="background:${M3.surface}; padding:32px 34px; border-radius:28px; box-shadow:0 10px 30px rgba(143,78,0,0.08); width:100%; max-width:390px; text-align:center; border:1px solid ${M3.outline};">
      <h2 class="m3-title-medium" style="margin:0 0 6px 0; color:${M3.primary}; font-size:22px; letter-spacing:0.5px;">CHEM QB</h2>
      <p style="font-size:13px; color:${M3.textSub}; margin:0 0 22px 0;">請輸入學生 ID 登入或註冊</p>
      
      <div style="display:flex; flex-direction:column; gap:14px; text-align:left;">
        <div>
          <label style="font-size:12px; color:${M3.textSub}; display:block; margin-bottom:4px;">學生 ID (5A / 5B / 5C / 5D + 班號)</label>
          <input type="text" id="customUserIdInput" placeholder="例如: 5A1" style="width:100%; padding:10px 14px; border:1px solid ${M3.outline}; border-radius:12px; font-size:14px; box-sizing:border-box; background:${M3.bg}; color:${M3.textMain}; outline:none;" />
        </div>
        <div>
          <label style="font-size:12px; color:${M3.textSub}; display:block; margin-bottom:4px;">密碼</label>
          <input type="password" id="customUserPassInput" placeholder="輸入密碼" style="width:100%; padding:10px 14px; border:1px solid ${M3.outline}; border-radius:12px; font-size:14px; box-sizing:border-box; background:${M3.bg}; color:${M3.textMain}; outline:none;" />
        </div>
        <div id="confirmPassGroup" style="display:none;">
          <label style="font-size:12px; color:${M3.textSub}; display:block; margin-bottom:4px;">確認密碼</label>
          <input type="password" id="customUserPassConfirmInput" placeholder="再次輸入相同密碼" style="width:100%; padding:10px 14px; border:1px solid ${M3.outline}; border-radius:12px; font-size:14px; box-sizing:border-box; background:${M3.bg}; color:${M3.textMain}; outline:none;" />
        </div>

        <div style="display:flex; gap:10px; margin-top:4px;">
          <button id="mainLoginBtn" class="sound-trigger" style="flex:1; background:${M3.primaryBtn}; color:#fff; border:none; padding:11px; border-radius:14px; font-size:14px; cursor:pointer;">登入</button>
          <button id="mainToggleRegBtn" class="sound-trigger" style="flex:1; background:${M3.surfaceWarm}; color:${M3.primary}; border:1px solid ${M3.accentBorder}; padding:11px; border-radius:14px; font-size:14px; cursor:pointer;">切換註冊</button>
        </div>
      </div>

      <div id="authErrorMsg" style="color:${M3.wrongText}; font-size:12px; margin-top:14px; min-height:18px; line-height:1.4;"></div>

      <div style="margin-top:12px; padding-top:10px; border-top:1px solid ${M3.outlineLight}; display:flex; justify-content:flex-end;">
        <button id="loginOverlayAdminBtn" class="sound-trigger" style="background:transparent; border:none; color:${M3.textMuted}; font-size:11px; cursor:pointer; padding:2px 6px;">
          Admin
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(authOverlay);

  let isRegisterMode = false;
  const idInput = authOverlay.querySelector('#customUserIdInput');
  const passInput = authOverlay.querySelector('#customUserPassInput');
  const confirmPassInput = authOverlay.querySelector('#customUserPassConfirmInput');
  const confirmGroup = authOverlay.querySelector('#confirmPassGroup');
  const loginBtn = authOverlay.querySelector('#mainLoginBtn');
  const toggleRegBtn = authOverlay.querySelector('#mainToggleRegBtn');
  const errMsg = authOverlay.querySelector('#authErrorMsg');

  toggleRegBtn.onclick = () => {
    SoundFX.playClick();
    isRegisterMode = !isRegisterMode;
    if (isRegisterMode) {
      confirmGroup.style.display = 'block';
      loginBtn.textContent = '確認註冊';
      loginBtn.style.background = M3.primary;
      toggleRegBtn.textContent = '返回登入';
    } else {
      confirmGroup.style.display = 'none';
      loginBtn.textContent = '登入';
      loginBtn.style.background = M3.primaryBtn;
      toggleRegBtn.textContent = '切換註冊';
    }
    errMsg.textContent = '';
  };

  const submitAuth = async () => {
    SoundFX.playClick();
    errMsg.style.color = M3.primary;
    errMsg.textContent = '正在驗證中...';

    if (!window.ChemUserLog) {
      await ensureUserLogModuleLoaded();
    }
    if (!window.ChemUserLog) {
      errMsg.style.color = M3.wrongText;
      errMsg.textContent = '找不到 userlog.js！';
      return;
    }

    const res = await window.ChemUserLog.authenticateUser({
      rawId: idInput.value,
      password: passInput.value,
      confirmPassword: confirmPassInput.value,
      isRegister: isRegisterMode
    });

    if (!res.ok) {
      errMsg.style.color = M3.wrongText;
      errMsg.textContent = res.message;
    } else {
      errMsg.textContent = '';
      passInput.value = '';
      confirmPassInput.value = '';
      if (res.isAdmin) {
        window.ChemUserLog.openAdminPanel();
      }
    }
  };

  loginBtn.onclick = submitAuth;
  passInput.onkeydown = (e) => { if (e.key === 'Enter' && !isRegisterMode) submitAuth(); };
  confirmPassInput.onkeydown = (e) => { if (e.key === 'Enter' && isRegisterMode) submitAuth(); };

  authOverlay.querySelector('#loginOverlayAdminBtn').onclick = () => {
    SoundFX.playClick();
    openDiscreetAdminModal();
  };

  return authOverlay;
}

// 18. 自動載入 style.css 與 userlog.js
function ensureStyleCssLoaded() {
  if (document.querySelector('link[href*="style.css"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `./style.css?v=${Date.now()}`;
  document.head.appendChild(link);
}

async function ensureUserLogModuleLoaded() {
  if (window.ChemUserLog) return true;
  const candidates = [`./userlog.js?v=${Date.now()}`, `./userlog2.js?v=${Date.now()}`];
  for (const src of candidates) {
    const ok = await new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve(!!window.ChemUserLog);
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
    if (ok) return true;
  }
  return false;
}

function cleanLegacyPageLayout() {
  Array.from(document.body.children).forEach(child => {
    if (
      child.tagName !== 'SCRIPT' &&
      child.id !== 'chemAppRootContainer' &&
      child.id !== 'chemAuthOverlay' &&
      child.id !== 'floatingActionGroup' &&
      child.id !== 'centerDirectoryModal' &&
      child.id !== 'inlineConfirmModal' &&
      child.id !== 'chemAdminFullModal' &&
      child.id !== 'chemDailyLogInspectorModal' &&
      child.id !== 'chemAdminPassModal'
    ) {
      child.style.display = 'none';
    }
  });

  let rootContainer = document.getElementById('chemAppRootContainer');
  if (!rootContainer) {
    rootContainer = document.createElement('div');
    rootContainer.id = 'chemAppRootContainer';
    rootContainer.style.cssText = `width:100%; min-height:100vh; background:${M3.bg}; padding-top:6px; box-sizing:border-box;`;
    document.body.insertBefore(rootContainer, document.body.firstChild);
  }
}

// 19. 主程式啟動入口
async function bootChemApp() {
  ensureStyleCssLoaded();
  injectWarmM3ThemeOverrides();
  cleanLegacyPageLayout();
  const authOverlay = ensureAuthOverlay();
  ensureFloatingActionGroup();

  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .sound-trigger');
    if (
      target &&
      !target.classList.contains('opt-act-btn') &&
      !target.classList.contains('peek-ans-btn') &&
      !target.classList.contains('chem-mute-toggle-btn') &&
      target.id !== 'timerToggleBtn' &&
      target.id !== 'timerLapBtn' &&
      target.id !== 'timerResetBtn'
    ) {
      SoundFX.playClick();
    }
  });

  await ensureUserLogModuleLoaded();

  if (window.ChemUserLog) {
    window.ChemUserLog.promptAdminAccess = openDiscreetAdminModal;

    const origRecordFn = window.ChemUserLog.recordQuestionAnswer.bind(window.ChemUserLog);
    window.ChemUserLog.recordQuestionAnswer = function (params) {
      const existing = this.getSessionAnswer(params.chapId, params.qId);
      if (existing && existing.chosen) {
        return {
          isCorrect: existing.correct,
          currentStreak: this.state.currentStreak,
          bestStreak: this.state.bestStreak,
          recentTopic: this.state.recentTopic
        };
      }
      return origRecordFn(params);
    };

    // 當按「結束當前 MC」時，除了清空當次選項，也把計時歸零但保留歷史 Lap
    const origFinalizeFn = window.ChemUserLog.finalizeAndResetChapterSession.bind(window.ChemUserLog);
    window.ChemUserLog.finalizeAndResetChapterSession = async function (chapId, lang) {
      window.chemApp.timerSeconds = 0;
      window.chemApp.lastLapTotalSeconds = 0;
      saveChapterTimerAndLapsToCloud(chapId, false);
      return await origFinalizeFn(chapId, lang);
    };

    window.ChemUserLog.onAuthChange((user, isAdmin) => {
      if (user) {
        authOverlay.style.display = 'none';
        if (window.chemApp.currentView !== 'chapter') {
          showHomeView();
        } else {
          updateFloatingButtonsVisibility();
          const activeId = window.chemApp.activeChapterId;
          const dbKey = `${window.chemApp.currentLang}_${activeId}`;
          if (activeId && window.chemApp.questionsDB[dbKey]) {
            loadChapterTimerAndLapsFromCloud(activeId);
            updateTimerDisplay();
            renderChapterLapsUI();
            renderQuestions(window.chemApp.questionsDB[dbKey], activeId);
          }
        }
        if (isAdmin) {
          window.ChemUserLog.openAdminPanel();
        }
      } else {
        authOverlay.style.display = 'flex';
        updateFloatingButtonsVisibility();
      }
    });

    window.ChemUserLog.onStateChange((state) => {
      const streakEl = document.getElementById('footerStreakCount');
      if (streakEl) streakEl.textContent = state.currentStreak || 0;
      renderHomeDashboard();
    });

    await window.ChemUserLog.initFirebase(FIREBASE_CONFIG);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootChemApp);
} else {
  bootChemApp();
}

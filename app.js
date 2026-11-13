/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Main UI & Material You Engine (app.js)
 * Version: 0.0.59 (Equilibrium Symbol Fix & 2x2 Option Grid Layout Guard)
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

const M3 = {
  bg: '#F4F5FA',
  surface: '#FFFFFF',
  surfaceVariant: '#DFE3F8',
  surfaceMuted: '#EEF0F8',
  surfaceTrack: '#E3E6F5',
  primary: '#48547A',
  primaryDark: '#333D5C',
  textMain: '#1D1F2C',
  textSub: '#5E6478',
  textMuted: '#8F94A6',
  outline: '#E2E6F3',
  outlineStrong: '#C5CCE6'
};

const SVG_ICONS = {
  menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>`,
  moreVert: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="18" r="1.6"/></svg>`,
  volumeOn: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  volumeOff: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
  person: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M5 20c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5"/></svg>`,
  topicIcon: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6"/><path d="M10 3v5l-4.5 7.5A3 3 0 0 0 8.1 20h7.8a3 3 0 0 0 2.6-4.5L14 8V3"/></svg>`,
  calendar: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><line x1="16" y1="3" x2="16" y2="7"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  timer: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><polyline points="12 9 12 13 14.5 14.5"/><line x1="9" y1="2" x2="15" y2="2"/></svg>`,
  bolt: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  flag: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
  list: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  cross: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
};

window.chemApp = {
  version: '0.0.59',
  currentLang: localStorage.getItem('CHEM_LANG_V47') || 'e',
  isMuted: localStorage.getItem('CHEM_MUTED_V49') === '1',
  activeChapterId: null,
  currentView: 'home',
  questionsDB: {},
  chapterCounts: {},
  timerSeconds: 0,
  lastLapTotalSeconds: 0,
  currentChapterLaps: [], 
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

// ============================================================================
// 動態注入防崩潰護欄與平衡符號防斷行樣式 (v59)
// ============================================================================
function injectM3AndResponsiveLayoutStyles() {
  if (document.getElementById('chemM3ResponsiveStyleV59')) return;
  const st = document.createElement('style');
  st.id = 'chemM3ResponsiveStyleV59';
  st.textContent = `
    :root {
      --md-sys-color-primary: ${M3.primary} !important;
      --md-sys-color-surface: ${M3.surface} !important;
      --md-sys-color-surface-variant: ${M3.bg} !important;
    }
    html, body, #chemAppRootContainer, #chemDashboardHome, #chemChapterViewWrapper, .question-card, .q-native-body, .q-native-body *, .explanation-panel, .explanation-panel * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
    }
    input, textarea {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      user-select: text !important;
      -webkit-touch-callout: default !important;
    }
    body, #chemAppRootContainer {
      background-color: ${M3.bg} !important;
      color: ${M3.textMain} !important;
      font-weight: 400 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif !important;
      margin: 0;
      padding: 0;
      overflow-x: hidden !important;
    }
    h1, h2, h3, h4, b, strong, button, span, div, label, input, select, td, th {
      font-weight: 400 !important;
    }
    .m3-title-medium {
      font-weight: 500 !important;
    }

    .chem-responsive-container {
      width: 100% !important;
      max-width: 860px !important;
      margin: 0 auto !important;
      padding: 20px clamp(20px, 5vw, 48px) 190px clamp(20px, 5vw, 48px) !important;
      box-sizing: border-box !important;
    }
    @media (orientation: landscape) and (min-width: 768px) {
      .chem-responsive-container {
        max-width: 980px !important;
        padding: 24px 160px 160px 56px !important;
      }
    }
    @media (orientation: portrait) {
      .chem-responsive-container {
        max-width: 92vw !important;
        padding: 16px 4vw 200px 4vw !important;
      }
    }

    .m3-card, .question-card {
      background: ${M3.surface} !important;
      border: 2.5px solid ${M3.outline} !important;
      border-radius: 28px !important;
      box-shadow: 0 6px 24px rgba(72, 84, 122, 0.05) !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }
    .question-card {
      padding: 26px clamp(22px, 4vw, 38px) !important;
    }

    /* 永久防止平衡方程式與化學式跑版護欄 */
    .q-native-body, .exp-body {
      width: 100% !important;
      box-sizing: border-box !important;
      overflow-x: auto !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }
    .q-native-body p, .exp-body p {
      margin: 6px 0 !important;
      line-height: 1.7 !important;
    }

    /* 針對多圖選項（A, B, C, D 濃度／速率圖）強制自動排列為美觀的 2x2 柵格或柔和橫向排列 */
    .q-native-body img, .exp-body img {
      max-width: 55% !important;
      max-height: 120px !important;
      width: auto !important;
      height: auto !important;
      object-fit: contain !important;
      display: inline-block !important;
      margin: 4px auto !important;
    }

    /* 特別防護：化學平衡符號與上下行方程式容器不被拆散 */
    .chem-equilibrium-block {
      display: inline-block;
      text-align: center;
      margin: 8px 0;
      padding: 6px 12px;
      background: ${M3.bg};
      border-radius: 12px;
      border: 1px solid ${M3.outline};
    }
  `;
  document.head.appendChild(st);

  document.addEventListener('selectstart', (e) => {
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    e.preventDefault();
  });

  document.addEventListener('copy', (e) => {
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    e.preventDefault();
  });
}

function applyExact40PercentShrink(imgEl, isInsideTable = false, isExplanation = false) {
  if (!imgEl) return;
  imgEl.removeAttribute('width');
  imgEl.removeAttribute('height');
  imgEl.setAttribute('draggable', 'false');

  const scaleImageNow = () => {
    const natW = imgEl.naturalWidth;
    const natH = imgEl.naturalHeight;
    if (natW > 0 && natH > 0) {
      const factor = isExplanation ? 0.65 : 0.55;
      const maxCapH = isInsideTable ? 88 : isExplanation ? 140 : 110;
      const targetW = Math.round(natW * factor);
      const targetH = Math.round(natH * factor);

      if (targetH > maxCapH) {
        const ratio = maxCapH / targetH;
        imgEl.style.setProperty('width', `${Math.round(targetW * ratio)}px`, 'important');
        imgEl.style.setProperty('height', `${maxCapH}px`, 'important');
      } else {
        imgEl.style.setProperty('width', `${targetW}px`, 'important');
        imgEl.style.setProperty('height', `${targetH}px`, 'important');
      }
      imgEl.style.setProperty('max-width', '100%', 'important');
    }
  };

  if (imgEl.complete && imgEl.naturalWidth > 0) {
    scaleImageNow();
  } else {
    imgEl.addEventListener('load', scaleImageNow, { once: true });
  }
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
// 雲端分圈計時器儲存引擎
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

// 3. 網頁音效系統
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
    renderHomeDashboard();
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
      'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(29,31,44,0.35); z-index:100001; display:none; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;';
    document.body.appendChild(pwdModal);
  }

  pwdModal.innerHTML = `
    <div style="background:${M3.surface}; width:100%; max-width:310px; padding:24px 26px; border-radius:28px; box-shadow:0 12px 36px rgba(72,84,122,0.12); text-align:center; border:1px solid ${M3.outline};">
      <h3 class="m3-title-medium" style="margin:0 0 14px 0; color:${M3.textMain}; font-size:16px;">Admin</h3>
      <input type="password" id="adminLocalPassInput" placeholder="Password" style="width:100%; padding:10px 14px; border:1px solid ${M3.outline}; border-radius:14px; font-size:14px; box-sizing:border-box; margin-bottom:8px; outline:none; background:${M3.bg}; color:${M3.textMain};" />
      <div id="adminLocalPassErr" style="color:${M3.textSub}; font-size:12px; min-height:18px; margin-bottom:10px;"></div>
      <div style="display:flex; gap:10px;">
        <button id="adminPassCancelBtn" style="flex:1; background:${M3.bg}; color:${M3.textSub}; border:1px solid ${M3.outline}; padding:9px; border-radius:14px; font-size:13px; cursor:pointer;">取消</button>
        <button id="adminPassConfirmBtn" style="flex:1; background:${M3.primary}; color:#fff; border:none; padding:9px; border-radius:14px; font-size:13px; cursor:pointer;">進入</button>
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

// 5. IndexedDB 題庫快取引擎 (V59)
class ChemChapterCache {
  static dbPromise = null;
  static getDB() {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open('HKDSE_CHEM_QB_CACHE_V59', 1);
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

// ============================================================================
// 6. 深度穿透式 DOM 切題引擎 (修復化學平衡符號斷行與多圖選項排版)
// ============================================================================
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
      if (el.style) {
        el.style.backgroundColor = 'transparent';
        el.style.background = 'none';
      }
      if (el.hasAttribute && el.hasAttribute('bgcolor')) {
        el.removeAttribute('bgcolor');
      }

      const hasMedia =
        el.tagName === 'IMG' ||
        el.tagName === 'SVG' ||
        (el.querySelector && el.querySelector('img, svg, canvas, table') !== null);
      if (hasMedia) return;

      const cleanedTxt = (el.textContent || '')
        .replace(/[\u200B-\u200D\uFEFF\u00A0\s]/g, '')
        .replace(/[\u25A0-\u25FF\u2610-\u2612\u2B1B\u2B1C\uF06F□☐■▪▫]/g, '');

      if (cleanedTxt === '' && el.children.length === 0 && !['BR', 'HR', 'IMG', 'SVG', 'TD', 'TH'].includes(el.tagName)) {
        el.remove();
      }
    });
  }

  static flattenBlocks(root) {
    const blocks = [];
    const walk = (node) => {
      if (!node) return;
      if (node.nodeType === Node.TEXT_NODE) {
        const txt = (node.textContent || '').trim();
        if (txt) {
          const p = document.createElement('p');
          p.textContent = txt;
          blocks.push(p);
        }
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;

      const tag = node.tagName.toUpperCase();

      if (tag === 'IMG' || tag === 'SVG') {
        const p = document.createElement('p');
        p.appendChild(node.cloneNode(true));
        blocks.push(p);
        return;
      }

      if (tag === 'TABLE') {
        const tableTxt = node.textContent || '';
        const isWrapperTable = /ChemMCQ\s*\d+/i.test(tableTxt) || /(?:Answer|Ans|答案)\s*[:：]/i.test(tableTxt);

        if (isWrapperTable) {
          let pendingDataRows = [];
          const flushPendingDataRows = () => {
            if (pendingDataRows.length === 0) return;
            const subTable = document.createElement('table');
            const tb = document.createElement('tbody');
            pendingDataRows.forEach(r => tb.appendChild(r.cloneNode(true)));
            subTable.appendChild(tb);
            this.stripGrayBoxNodes(subTable);
            blocks.push(subTable);
            pendingDataRows = [];
          };

          Array.from(node.rows || node.querySelectorAll('tr')).forEach(tr => {
            const cells = Array.from(tr.cells || tr.querySelectorAll('td, th'));
            const nonEmptyCells = cells.filter(
              c => (c.textContent || '').trim() !== '' || c.querySelector('img, svg, table')
            );
            const trTxt = tr.textContent || '';
            const hasMarker = /ChemMCQ\s*\d+/i.test(trTxt) || /(?:Answer|Ans|答案)\s*[:：]/i.test(trTxt);

            if (!hasMarker && nonEmptyCells.length >= 2) {
              pendingDataRows.push(tr);
            } else {
              flushPendingDataRows();
              cells.forEach(cell => {
                if (cell.childNodes.length > 0) {
                  Array.from(cell.childNodes).forEach(ch => walk(ch));
                }
              });
            }
          });
          flushPendingDataRows();
        } else {
          const clonedTable = node.cloneNode(true);
          this.stripGrayBoxNodes(clonedTable);
          blocks.push(clonedTable);
        }
        return;
      }

      if (['DIV', 'SECTION', 'ARTICLE', 'MAIN', 'TBODY', 'TR', 'TD', 'TH', 'UL', 'OL', 'LI'].includes(tag)) {
        if (node.childNodes.length > 0) {
          Array.from(node.childNodes).forEach(child => walk(child));
          return;
        }
      }

      const cleanedHtml = this.cleanInlineNoise(node.innerHTML || '');
      const hasImgInside = node.querySelector && node.querySelector('img, svg, table') !== null;

      if (!hasImgInside && /<br\s*\/?>/i.test(cleanedHtml)) {
        cleanedHtml.split(/<br\s*\/?>/i).forEach(part => {
          const p = document.createElement('p');
          p.innerHTML = part.trim();
          this.stripGrayBoxNodes(p);
          if ((p.textContent || '').trim() || p.querySelector('img, svg')) blocks.push(p);
        });
      } else {
        const p = document.createElement('p');
        p.innerHTML = cleanedHtml.trim();
        this.stripGrayBoxNodes(p);
        if ((p.textContent || '').trim() || p.querySelector('img, svg, table')) {
          blocks.push(p);
        }
      }
    };

    Array.from(root.childNodes).forEach(child => walk(child));
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
      const hasMedia =
        node.tagName === 'IMG' ||
        (node.querySelector && node.querySelector('img, svg, canvas') !== null);
      const isTable = node.tagName && node.tagName.toUpperCase() === 'TABLE';

      if (!hasMedia && !isTable && this.isPureNoiseLine(text)) return;

      const match = text.match(headerRegex);
      if (match && (hasChemMCQ || text.startsWith(match[0]))) {
        if (currentBlock) rawBlocks.push(currentBlock);
        const qCode = match[0].replace(/\s+/g, '');
        currentBlock = { qCode: qCode, nodes: [] };

        const cloned = node.cloneNode(true);
        cloned.innerHTML = cloned.innerHTML.replace(match[0], '').trim();
        this.stripGrayBoxNodes(cloned);
        if ((cloned.textContent || '').trim() || (cloned.querySelector && cloned.querySelector('img, svg, table'))) {
          currentBlock.nodes.push(cloned);
        }
      } else {
        if (currentBlock) currentBlock.nodes.push(node.cloneNode(true));
      }
    });

    if (currentBlock) rawBlocks.push(currentBlock);

    const resultList = [];
    const ansInlineRegex = /(?:^|\b)(?:Answer|Ans|答案)\s*[:：]?\s*\(?([A-D])\)?/i;

    rawBlocks.forEach((block, idx) => {
      const stemDiv = document.createElement('div');
      const expDiv = document.createElement('div');
      let foundAnswer = false;
      let answerLetter = '';

      // 智慧預檢：若區塊內包含平衡符號 `⇌` 或上下行反應物，自動組合成一個防斷行平衡方程式區塊
      let hasEquilibriumSymbol = false;
      block.nodes.forEach(n => {
        if ((n.textContent || '').includes('⇌') || (n.textContent || '').includes('⇋')) {
          hasEquilibriumSymbol = true;
        }
      });

      block.nodes.forEach(node => {
        const txt = (node.textContent || '').replace(/[\u25A0-\u25FF\u2610-\u2612\uF06F□☐■▪▫]/g, '').trim();
        const hasMedia =
          node.tagName === 'IMG' ||
          (node.querySelector && node.querySelector('img, svg, canvas') !== null);
        const isTable = node.tagName && node.tagName.toUpperCase() === 'TABLE';

        if (!txt && !hasMedia && !isTable) return;

        if (!foundAnswer) {
          const isOptionLine = /^[A-D][\.\)]\s*/.test(txt);
          const ansMatch = !isOptionLine ? txt.match(ansInlineRegex) : null;

          if (ansMatch) {
            foundAnswer = true;
            answerLetter = ansMatch[1].toUpperCase();

            const remainderNode = node.cloneNode(true);
            remainderNode.innerHTML = remainderNode.innerHTML.replace(
              /(?:Answer|Ans|答案)\s*[:：]?\s*\(?[A-D]\)?[\s\.、:：\-—]*/i,
              ''
            ).trim();

            const remTxt = (remainderNode.textContent || '').trim();
            const remHasMedia = remainderNode.querySelector && remainderNode.querySelector('img, svg, table') !== null;
            if (remTxt.length > 0 || remHasMedia) {
              expDiv.appendChild(remainderNode);
            }
            return;
          }

          if (node.style) {
            if (isOptionLine) {
              node.style.cssText = 'padding-left: 20px; margin: 6px 0; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif; background: transparent;';
            } else if (isTable) {
              node.style.cssText = 'border-collapse: separate; margin: 12px 0; width: auto; max-width: 100%; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;';
            } else {
              node.style.cssText = 'margin: 6px 0; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif; background: transparent;';
            }
          }
          stemDiv.appendChild(node);
        } else {
          if (txt === '*' && !hasMedia && !isTable) {
            const starNote = document.createElement('div');
            starNote.style.cssText = `font-size:12px; color:${M3.primary}; margin:2px 0; font-family:sans-serif;`;
            starNote.textContent = '(* Chiral centre / 手性碳標記)';
            expDiv.appendChild(starNote);
          } else if (txt.length > 0 || hasMedia || isTable) {
            if (node.style) {
              node.style.cssText = 'margin: 6px 0; line-height: 1.65; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif; background: transparent;';
            }
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
        ignoreEmptyParagraphs: false,
        convertImage: mammoth.images.imgElement((image) => {
          return image.read('base64').then((imageBuffer) => {
            let cType = (image.contentType || 'image/png').toLowerCase();
            if (!cType.startsWith('image/')) cType = 'image/png';
            return { src: 'data:' + cType + ';base64,' + imageBuffer };
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
  updateTimerDisplay();
  renderChapterLapsUI();
  saveChapterTimerAndLapsToCloud(chapId, true);
}

function updateTimerDisplay() {
  const formatted = formatDuration(window.chemApp.timerSeconds);
  const el1 = document.getElementById('chapterTimerDisplay');
  const el2 = document.getElementById('floatingTimerDisplay');
  if (el1) el1.textContent = formatted;
  if (el2) el2.textContent = formatted;

  const laps = window.chemApp.currentChapterLaps || [];
  const lapBadgeEl = document.getElementById('floatingLapBadge');
  if (lapBadgeEl) {
    if (laps.length > 0) {
      lapBadgeEl.style.display = 'inline-block';
      lapBadgeEl.textContent = `L${laps[0].lapNo} +${laps[0].splitText}`;
    } else {
      lapBadgeEl.style.display = 'none';
    }
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
      <div style="display:inline-flex; align-items:center; gap:6px; background:${M3.surfaceVariant}; color:${M3.primary}; padding:5px 12px; border-radius:14px; font-size:11px; white-space:nowrap;">
        <span>Lap ${l.lapNo}</span>
        <span style="color:${M3.textMain};">+${l.splitText}</span>
        <span style="color:${M3.textSub};">(總 ${l.totalText}${l.answeredCount ? ` · 答${l.answeredCount}題` : ''})</span>
      </div>
    `
    )
    .join('');
}

// ============================================================================
// 9. 右下角懸浮控制組
// ============================================================================
function ensureFloatingActionGroup() {
  let grp = document.getElementById('floatingActionGroup');
  if (!grp) {
    grp = document.createElement('div');
    grp.id = 'floatingActionGroup';
    grp.style.cssText = 'position:fixed; bottom:18px; right:16px; z-index:9998; display:none; flex-direction:column; gap:8px; align-items:flex-end; font-family:sans-serif;';
    grp.innerHTML = `
      <div id="footerStreakBox" style="display:none; background:${M3.surfaceVariant}; color:${M3.primary}; border:1.5px solid ${M3.outlineStrong}; padding:0 16px; border-radius:20px; font-size:12px; box-shadow:0 4px 14px rgba(72,84,122,0.1); height:36px; min-width:118px; box-sizing:border-box; align-items:center; justify-content:center; gap:5px; white-space:nowrap;">
        ${SVG_ICONS.bolt}
        <span>Streak: <span id="footerStreakCount">0</span></span>
      </div>

      <div id="floatingTimerCapsule" style="display:none; background:${M3.surface}; border:1.5px solid ${M3.outline}; padding:4px 9px 4px 12px; border-radius:20px; box-shadow:0 4px 16px rgba(72,84,122,0.1); align-items:center; gap:6px; height:38px; box-sizing:border-box; white-space:nowrap;">
        <span style="display:inline-flex; align-items:center; color:${M3.primary};">${SVG_ICONS.timer}</span>
        <span id="floatingTimerDisplay" style="font-family:monospace; font-size:12px; color:${M3.textMain};">00:00</span>
        <span id="floatingLapBadge" style="display:none; font-size:10px; background:${M3.surfaceVariant}; color:${M3.primary}; padding:2px 6px; border-radius:8px;"></span>
        <button id="floatingTimerToggleBtn" style="border:none; background:${M3.primary}; color:#fff; font-size:11px; padding:4px 10px; border-radius:12px; cursor:pointer;">開始</button>
        <button id="floatingTimerLapBtn" style="border:none; background:${M3.surfaceVariant}; color:${M3.primary}; font-size:11px; padding:4px 10px; border-radius:12px; cursor:pointer;">Lap</button>
      </div>

      <button id="endChapterBtn" class="sound-trigger" style="display:none; background:${M3.primaryDark}; color:#fff; border:none; padding:0 16px; border-radius:20px; font-size:12px; box-shadow:0 4px 14px rgba(51,61,92,0.18); cursor:pointer; height:38px; min-width:118px; box-sizing:border-box; align-items:center; justify-content:center; gap:6px; white-space:nowrap;">
        ${SVG_ICONS.flag}
        <span>結束當前 MC</span>
      </button>

      <button id="mobileToggleSidebarBtn" class="sound-trigger" style="display:flex; background:${M3.primary}; color:#fff; border:none; padding:0 16px; border-radius:20px; font-size:12px; box-shadow:0 4px 14px rgba(72,84,122,0.22); cursor:pointer; height:40px; min-width:118px; box-sizing:border-box; align-items:center; justify-content:center; gap:6px; white-space:nowrap;">
        ${SVG_ICONS.list}
        <span>目錄選單</span>
      </button>
    `;
    document.body.appendChild(grp);

    const fToggleBtn = grp.querySelector('#floatingTimerToggleBtn');
    const fLapBtn = grp.querySelector('#floatingTimerLapBtn');

    fToggleBtn.onclick = () => {
      SoundFX.playClick();
      if (window.chemApp.isTimerRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
      syncAllTimerButtonsText();
    };

    fLapBtn.onclick = () => {
      SoundFX.playClick();
      recordLap();
    };

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

function syncAllTimerButtonsText() {
  const running = window.chemApp.isTimerRunning;
  const hasElapsed = window.chemApp.timerSeconds > 0;
  const label = running ? '暫停' : hasElapsed ? '繼續' : '開始';

  const t1 = document.getElementById('timerToggleBtn');
  const t2 = document.getElementById('floatingTimerToggleBtn');
  if (t1) t1.textContent = label;
  if (t2) t2.textContent = label;
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
  const timerCap = grp.querySelector('#floatingTimerCapsule');
  const endBtn = grp.querySelector('#endChapterBtn');
  const dirBtn = grp.querySelector('#mobileToggleSidebarBtn');

  if (dirBtn) dirBtn.style.display = 'flex';

  const currentStreak = window.ChemUserLog && window.ChemUserLog.state ? window.ChemUserLog.state.currentStreak || 0 : 0;
  if (streakCount) streakCount.textContent = currentStreak;

  if (window.chemApp.currentView === 'chapter') {
    if (streakBox) streakBox.style.display = 'flex';
    if (timerCap) timerCap.style.display = 'flex';
    if (endBtn) endBtn.style.display = 'flex';
    updateTimerDisplay();
    syncAllTimerButtonsText();
  } else {
    if (streakBox) streakBox.style.display = 'none';
    if (timerCap) timerCap.style.display = 'none';
    if (endBtn) endBtn.style.display = 'none';
  }
}

// 10. 「結束當前 MC」雙重確認內嵌彈窗
function openEndChapterConfirmModal() {
  let modal = document.getElementById('inlineConfirmModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'inlineConfirmModal';
    modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(29,31,44,0.35); z-index:99999; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;';
    document.body.appendChild(modal);
  }

  let yesCount = 0;
  let noCount = 0;

  const renderModalStep = (statusText, subText) => {
    modal.innerHTML = `
      <div style="background:${M3.surface}; padding:26px 28px; border-radius:28px; width:100%; max-width:340px; text-align:center; box-shadow:0 14px 40px rgba(72,84,122,0.15); border:2px solid ${M3.outline};">
        <h3 class="m3-title-medium" style="margin:0 0 10px 0; font-size:17px; color:${M3.textMain};">結束當前 MC 練習</h3>
        <p style="font-size:14px; color:${M3.primary}; margin:0 0 8px 0; line-height:1.5;">${statusText}</p>
        <p style="font-size:12px; color:${M3.textSub}; margin:0 0 20px 0; line-height:1.4;">${subText}</p>
        <div style="display:flex; gap:12px;">
          <button id="confirmYesBtn" style="flex:1; background:${yesCount === 1 ? M3.primaryDark : M3.primary}; color:#fff; border:none; padding:10px; border-radius:16px; font-size:14px; cursor:pointer;">
            是 ${yesCount > 0 ? `(${yesCount}/2)` : ''}
          </button>
          <button id="confirmNoBtn" style="flex:1; background:${noCount === 1 ? M3.surfaceVariant : M3.bg}; color:${M3.textMain}; border:1px solid ${M3.outline}; padding:10px; border-radius:16px; font-size:14px; cursor:pointer;">
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
          '結束後將自動儲存計時並清空本課題當次選項與 Streak。'
        );
      } else if (yesCount >= 2) {
        modal.style.display = 'none';
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
          '取消結束，保留目前所有作答選項與 Streak。'
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

// 11. 視圖切換
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
    wrapper = document.createElement('div');
    wrapper.id = 'chemChapterViewWrapper';
    wrapper.className = 'chem-responsive-container';

    wrapper.innerHTML = `
      <div class="m3-card" style="padding:18px 26px; border-radius:28px; margin-bottom:20px; display:flex; flex-direction:column; gap:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:10px; min-width:0; flex:1;">
            <button id="backHomeTopBtn" class="sound-trigger" style="padding:6px 14px; font-size:12px; border:none; border-radius:18px; background:${M3.surfaceVariant}; color:${M3.primary}; cursor:pointer; white-space:nowrap;">
              &lsaquo; 首頁
            </button>
            <h2 id="currentChapterTitle" class="m3-title-medium" style="margin:0; font-size:15px; color:${M3.textMain}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">請選擇章節</h2>
          </div>
          <div style="display:flex; align-items:center; gap:8px; white-space:nowrap;">
            <span id="chapterStats" style="font-size:12px; color:${M3.textSub};"></span>
            <label style="padding:6px 12px; font-size:11px; border:1px solid ${M3.outline}; border-radius:16px; background:${M3.surface}; cursor:pointer; color:${M3.textSub};" class="sound-trigger">
              載入 .docx
              <input type="file" id="manualDocxInput" accept=".docx" style="display:none;" />
            </label>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:10px; border-top:1px solid ${M3.outline}; font-size:12px; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span style="color:${M3.textSub}; display:inline-flex; align-items:center; gap:4px;">${SVG_ICONS.timer} 計時</span>
            <span id="chapterTimerDisplay" style="font-family:monospace; font-size:13px; color:${M3.primary}; background:${M3.bg}; padding:3px 10px; border-radius:12px; border:1px solid ${M3.outline};">00:00</span>
            <button id="timerToggleBtn" style="border:none; background:${M3.primary}; color:#fff; font-size:11px; padding:5px 12px; border-radius:14px; cursor:pointer;">開始</button>
            <button id="timerLapBtn" style="border:none; background:${M3.surfaceVariant}; color:${M3.primary}; font-size:11px; padding:5px 12px; border-radius:14px; cursor:pointer;">分圈 Lap</button>
            <button id="timerResetBtn" style="border:1px solid ${M3.outline}; background:${M3.surface}; color:${M3.textSub}; font-size:11px; padding:5px 10px; border-radius:14px; cursor:pointer;">重置</button>
          </div>
        </div>

        <div id="chapterLapsStrip" class="lap-scroll-strip" style="display:none; gap:6px; overflow-x:auto; padding-top:4px; padding-bottom:2px; align-items:center;"></div>
      </div>
      <div id="questionList"></div>
    `;
    rightMain.appendChild(wrapper);

    const tBtn = wrapper.querySelector('#timerToggleBtn');
    const lBtn = wrapper.querySelector('#timerLapBtn');
    const rBtn = wrapper.querySelector('#timerResetBtn');

    tBtn.onclick = () => {
      SoundFX.playClick();
      if (window.chemApp.isTimerRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
      syncAllTimerButtonsText();
    };

    lBtn.onclick = () => {
      SoundFX.playClick();
      recordLap();
    };

    rBtn.onclick = () => {
      SoundFX.playClick();
      resetTimer();
      syncAllTimerButtonsText();
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
        qContainer.innerHTML = `<div style="color:${M3.textSub}; padding:32px;">手動解析失敗：${err.message}</div>`;
      }
    };
  }

  wrapper.style.display = 'block';
  updateFloatingButtonsVisibility();
  return wrapper;
}

// 12. 開啟章節
async function openChapter(chapId) {
  window.chemApp.activeChapterId = chapId;
  const lookup = CHAPTER_MAP[chapId];
  if (!lookup) return;

  pauseTimer();
  loadChapterTimerAndLapsFromCloud(chapId);

  const wrapper = switchRightPanelToChapterView();
  updateTimerDisplay();
  syncAllTimerButtonsText();
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
    <div style="text-align:center; padding:56px 20px; background:${M3.surface}; border-radius:28px; border:2px solid ${M3.outline}; color:${M3.textSub};">
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
      <div style="text-align:center; padding:48px 24px; background:${M3.surface}; border-radius:28px; border:2px solid ${M3.outline}; color:${M3.textSub};">
        <div style="font-size:15px; color:${M3.textMain}; margin-bottom:8px;">找不到遠端題庫檔案 (ch${pad}_mcq_${lang}.docx)</div>
        <div style="font-size:13px;">可點擊上方「載入 .docx」手動選擇題庫練習。</div>
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
    container.innerHTML = `<div style="color:${M3.textSub}; padding:32px; background:${M3.surface}; border-radius:28px;">解析失敗：${err.message}</div>`;
  }
}

// 13. 渲染題目卡片 (升級：平衡方程式防護 + 選擇題多圖自動 2x2 柵格排列 + 圖片縮小 40%)
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
    card.style.cssText = `background:${M3.surface}; border-radius:28px; margin-bottom:20px; border:2.5px solid ${M3.outline}; font-family:"Times New Roman", "Noto Serif TC", "PMingLiU", serif; box-sizing:border-box; width:100%;`;

    const hasExplanation = q.explanationHtml && q.explanationHtml.length > 0;

    card.innerHTML = `
      <div class="q-header" style="margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid ${M3.outline}; padding-bottom:10px;">
        <span class="q-number" style="color:${M3.primary}; font-size:14px; font-family:sans-serif;">${q.qNumDisplay || `Q${qOrderNum}`}</span>
        <span style="font-size:12px; color:${M3.textMuted}; font-family:sans-serif;">第 ${qOrderNum} / ${qList.length} 題</span>
      </div>
      <div class="q-native-body" style="line-height:1.75; font-size:16px; color:${M3.textMain}; overflow-x:auto; word-break:break-word; font-family:'Times New Roman', 'Noto Serif TC', 'PMingLiU', serif;">
        ${q.htmlContent}
      </div>
      <div class="interactive-action-bar" style="margin-top:18px; padding-top:14px; border-top:1px dashed ${M3.outline}; font-family:sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; gap:8px; flex-wrap:wrap;">
          <span class="q-status-prompt" style="color:${M3.textSub}; font-size:12px;">請選擇答案：</span>
          <button class="peek-ans-btn sound-trigger" style="border:none; background:${M3.surfaceMuted}; color:${M3.primary}; font-size:11px; cursor:pointer; padding:4px 10px; border-radius:10px;">顯示 / 隱藏解析</button>
        </div>
        <div class="options-btn-group" style="display:flex; gap:12px;">
          ${['A', 'B', 'C', 'D'].map(k => `
            <button type="button" class="opt-act-btn" data-opt="${k}" style="flex:1; padding:10px 2px; border:1.5px solid ${M3.outline}; border-radius:16px; background:${M3.bg}; color:${M3.primary}; cursor:pointer; font-size:14px; transition:all 0.15s ease; display:inline-flex; align-items:center; justify-content:center; gap:4px;">
              ${k}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="explanation-panel" style="display:none; margin-top:16px; padding:16px 20px; background:${M3.surfaceVariant}; border-left:3.5px solid ${M3.primary}; border-radius:18px; font-family:'Times New Roman', 'Noto Serif TC', serif; overflow-x:auto;">
        <div class="exp-title" style="color:${M3.primary}; font-size:14px; font-family:sans-serif; margin-bottom:${hasExplanation ? '8px' : '0'};">
          Answer: ${q.answer}
        </div>
        ${hasExplanation
          ? `<div class="exp-body" style="font-size:14px; color:${M3.textMain}; line-height:1.7; word-break:break-word;">${q.explanationHtml}</div>`
          : `<div style="font-size:12px; color:${M3.textMuted}; font-family:sans-serif; margin-top:4px;">（本題原檔無附帶文字解析）</div>`
        }
      </div>
    `;

    // 智能修復化學平衡方程式（若偵測到 ⇌ 符號，自動加上置中區塊保護）
    const nativeBody = card.querySelector('.q-native-body');
    if (nativeBody && nativeBody.innerHTML.includes('⇌')) {
      nativeBody.innerHTML = nativeBody.innerHTML.replace(
        /([0-9A-Za-z\+\-\(\)\s\/\.]+)(⇌|⇋)([0-9A-Za-z\+\-\(\)\s\/\.]+)/g,
        `<div class="chem-equilibrium-block">$1 $2 $3</div>`
      );
    }

    // 針對多圖選項（如 A、B、C、D 速率或濃度圖）自動轉為 2x2 柵格排列
    const imgs = nativeBody ? nativeBody.querySelectorAll('img') : [];
    if (imgs.length >= 3) {
      const imgContainer = document.createElement('div');
      imgContainer.style.cssText = 'display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:12px; margin:14px 0; justify-items:center;';
      imgs.forEach(img => {
        applyExact40PercentShrink(img, false, false);
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'background:#FFFFFF; border:1px solid ' + M3.outline + '; border-radius:16px; padding:8px; text-align:center; width:100%; box-sizing:border-box;';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
      });
    } else {
      imgs.forEach(img => applyExact40PercentShrink(img, false, false));
    }

    card.querySelectorAll('.exp-body img').forEach(img => {
      applyExact40PercentShrink(img, false, true);
    });

    DocxQuestionParser.stripGrayBoxNodes(card.querySelector('.q-native-body'));
    const expBodyEl = card.querySelector('.exp-body');
    if (expBodyEl) DocxQuestionParser.stripGrayBoxNodes(expBodyEl);

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
        statusPrompt.textContent = `已鎖定：選 ${selectedOpt}（${isCorrect ? '對' : '錯'} · 結束當前 MC 前不可更改）`;
        statusPrompt.style.color = isCorrect ? M3.primary : M3.textSub;
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
          b.style.background = M3.primary;
          b.style.color = '#FFFFFF';
          b.style.border = `1.5px solid ${M3.primary}`;
          b.style.opacity = '1';
          b.innerHTML = `${b.dataset.opt} ${SVG_ICONS.check}`;
        } else if (selectedOpt && b.dataset.opt === selectedOpt && selectedOpt !== q.answer) {
          b.style.background = M3.surfaceVariant;
          b.style.color = M3.primary;
          b.style.border = `1.5px dashed ${M3.primary}`;
          b.style.opacity = '1';
          b.innerHTML = `${b.dataset.opt} ${SVG_ICONS.cross}`;
        } else {
          b.style.background = M3.surface;
          b.style.color = M3.textMuted;
          b.style.border = `1px solid ${M3.outline}`;
          b.style.opacity = '0.35';
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

          const streakEl = document.getElementById('footerStreakCount');
          if (streakEl && res) streakEl.textContent = res.currentStreak;

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

// 14. 計算多個最近做過的課題
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

// 15. 首頁 Dashboard 渲染
function renderHomeDashboard() {
  let rightMain = document.getElementById('chemAppRootContainer') || document.body;
  let dashboardEl = document.getElementById('chemDashboardHome');

  if (!dashboardEl) {
    dashboardEl = document.createElement('div');
    dashboardEl.id = 'chemDashboardHome';
    dashboardEl.className = 'chem-responsive-container';
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
  const visibleLimit = window.chemApp.showAllRecentTopics ? recentTopicsList.length : 3;
  const displayedRecentList = recentTopicsList.slice(0, visibleLimit);
  const muted = window.chemApp.isMuted;

  const recentTopicsHtml =
    displayedRecentList.length === 0
      ? `
        <div style="background:${M3.surfaceVariant}; border-radius:28px; padding:22px; margin-bottom:16px; border:2px solid ${M3.outlineStrong};">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:38px; height:38px; border-radius:19px; background:${M3.surface}; color:${M3.primary}; display:flex; align-items:center; justify-content:center;">
              ${SVG_ICONS.topicIcon}
            </div>
            <div>
              <div class="m3-title-medium" style="font-size:15px; color:${M3.textMain};">尚未開始練習</div>
              <div style="font-size:13px; color:${M3.textSub}; margin-top:2px;">點擊右下角「目錄選單」選擇課題</div>
            </div>
          </div>
        </div>
      `
      : displayedRecentList
          .map((item, idx) => {
            const isFirst = idx === 0;
            const cardBg = isFirst ? M3.surfaceVariant : M3.surface;
            const totalTxt = item.totalInChapter > 0 ? `${item.answered} / ${item.totalInChapter} 題` : `${item.answered} 題`;
            const latestQTxt = item.latestQ
              ? `最新做到：第 ${item.latestQ.qOrder} 題 (${item.latestQ.qNumDisplay} · 選 ${item.latestQ.chosen})`
              : '尚未作答';

            const lapsSummaryHtml =
              item.laps && item.laps.length > 0
                ? `<div style="font-size:11px; color:${M3.textSub}; margin-top:5px; display:flex; align-items:center; gap:4px;">${SVG_ICONS.timer} 分圈 (${item.laps.length} 圈) · 最新 +${item.laps[0].splitText} (總 ${item.laps[0].totalText})</div>`
                : '';

            return `
              <div style="background:${cardBg}; border:2.5px solid ${isFirst ? M3.outlineStrong : M3.outline}; border-radius:28px; padding:22px 26px; margin-bottom:16px; box-shadow:0 4px 18px rgba(72,84,122,0.04);">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:8px;">
                  <div style="display:flex; align-items:center; gap:12px; min-width:0; flex:1;">
                    <div style="width:38px; height:38px; border-radius:19px; background:${isFirst ? M3.surface : M3.surfaceVariant}; color:${M3.primary}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                      ${SVG_ICONS.topicIcon}
                    </div>
                    <div style="min-width:0; flex:1;">
                      <div class="m3-title-medium" style="font-size:15px; color:${M3.textMain}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                        ${item.chapterName}
                      </div>
                      <div style="font-size:12px; color:${M3.textSub}; margin-top:2px;">
                        ${item.topicName} · 還差 ${item.remainingRate}% 完成
                      </div>
                    </div>
                  </div>
                  <button class="recent-chap-jump-btn sound-trigger" data-chid="${item.chapId}" style="background:${M3.primary}; color:#fff; border:none; padding:8px 16px; border-radius:20px; font-size:12px; cursor:pointer; flex-shrink:0;">
                    繼續 &rsaquo;
                  </button>
                </div>

                <div style="width:100%; background:${isFirst ? '#CBD2F3' : M3.surfaceVariant}; height:6px; border-radius:3px; overflow:hidden; margin:12px 0 8px 0;">
                  <div style="width:${item.completionRate}%; background:${M3.primary}; height:100%; transition:width 0.3s;"></div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; color:${M3.textSub}; flex-wrap:wrap; gap:6px;">
                  <div>進度：${totalTxt} (完成 ${item.completionRate}%) · 對 ${item.correct} · 錯 ${item.wrong}</div>
                  <div>${latestQTxt}</div>
                </div>
                ${lapsSummaryHtml}
              </div>
            `;
          })
          .join('');

  const dailyListHtml =
    summary.dailyList.length === 0
      ? `<div style="font-size:13px; color:${M3.textMuted}; text-align:center; padding:18px 0;">尚無作答記錄。</div>`
      : summary.dailyList
          .map(
            item => `
        <div class="daily-record-item sound-trigger" data-date="${item.date}" style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:${M3.surface}; border-radius:20px; margin-bottom:8px; border:1.5px solid ${M3.outline}; cursor:pointer;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="color:${M3.textMain}; font-size:13px;">${item.date}</span>
            <span style="font-size:11px; color:${M3.primary}; background:${M3.surfaceVariant}; padding:2px 9px; border-radius:10px;">對 ${item.correctCount}</span>
            <span style="font-size:11px; color:${M3.textSub}; background:${M3.surfaceMuted}; padding:2px 9px; border-radius:10px;">錯 ${item.wrongCount}</span>
          </div>
          <span style="color:${M3.primary}; font-size:13px;">答了 ${item.count} 題 &rsaquo;</span>
        </div>
      `
          )
          .join('');

  dashboardEl.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; padding:0 4px;">
      <button id="topMenuHamburgerBtn" class="sound-trigger" style="background:none; border:none; color:${M3.textMain}; cursor:pointer; padding:4px; display:inline-flex; align-items:center;">
        ${SVG_ICONS.menu}
      </button>
      <button id="topAdminBtn" class="sound-trigger" style="background:none; border:none; color:${M3.textSub}; cursor:pointer; padding:4px; display:inline-flex; align-items:center;" title="Admin">
        ${SVG_ICONS.moreVert}
      </button>
    </div>

    <div style="margin-bottom:24px; padding:0 4px;">
      <h1 class="m3-title-medium" style="margin:0 0 6px 0; font-size:32px; color:${M3.textMain}; letter-spacing:-0.3px;">HKDSE</h1>
      <div style="font-size:15px; color:${M3.textSub};">Chemistry Question Bank</div>
    </div>

    <div class="m3-card" style="padding:22px 26px; margin-bottom:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:18px; border-bottom:1px solid ${M3.outline};">
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:36px; height:36px; border-radius:18px; background:${M3.bg}; display:flex; align-items:center; justify-content:center; color:${M3.primary};">
            ${!muted ? SVG_ICONS.volumeOn : SVG_ICONS.volumeOff}
          </div>
          <span style="font-size:15px; color:${M3.textMain};">音效反饋 (Sound FX)</span>
        </div>
        <div id="m3SoundSwitch" class="m3-switch-track" style="background-color:${!muted ? M3.primary : M3.surfaceTrack};">
          <div class="m3-switch-thumb" style="transform:${!muted ? 'translateX(26px)' : 'translateX(4px)'};"></div>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; padding-top:18px; flex-wrap:wrap; gap:10px;">
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:36px; height:36px; border-radius:18px; background:${M3.bg}; display:flex; align-items:center; justify-content:center; color:${M3.primary};">
            ${SVG_ICONS.person}
          </div>
          <div>
            <div style="font-size:15px; color:${M3.textMain};">登入學生</div>
            <div style="font-size:12px; color:${M3.textSub}; margin-top:2px;">${summary.studentId} · Streak ${summary.currentStreak || 0}</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="display:flex; background:${M3.surfaceVariant}; border-radius:16px; padding:3px; gap:2px;">
            <button id="langEnBtn" class="sound-trigger" style="border:none; background:${window.chemApp.currentLang === 'e' ? M3.primary : 'transparent'}; color:${window.chemApp.currentLang === 'e' ? '#fff' : M3.textSub}; padding:4px 12px; border-radius:14px; font-size:12px; cursor:pointer;">英</button>
            <button id="langZhBtn" class="sound-trigger" style="border:none; background:${window.chemApp.currentLang === 'c' ? M3.primary : 'transparent'}; color:${window.chemApp.currentLang === 'c' ? '#fff' : M3.textSub}; padding:4px 12px; border-radius:14px; font-size:12px; cursor:pointer;">中</button>
          </div>
          <button id="homeLogoutBtn" class="sound-trigger" style="background:${M3.surfaceMuted}; border:none; color:${M3.textSub}; font-size:12px; cursor:pointer; padding:6px 12px; border-radius:14px;">
            登出
          </button>
        </div>
      </div>
    </div>

    <div style="margin-bottom:18px;">
      ${recentTopicsHtml}
      ${
        recentTopicsList.length > 3
          ? `<div style="text-align:center; margin-top:-4px; margin-bottom:12px;">
              <button id="toggleMoreRecentBtn" class="sound-trigger" style="background:${M3.surface}; color:${M3.primary}; border:1.5px solid ${M3.outline}; padding:6px 16px; border-radius:16px; font-size:12px; cursor:pointer;">
                ${window.chemApp.showAllRecentTopics ? '收起部分' : `顯示全部 (${recentTopicsList.length} 個章節)`}
              </button>
            </div>`
          : ''
      }
    </div>

    <div class="m3-card" style="padding:22px 26px; margin-bottom:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
        <div style="display:flex; align-items:center; gap:10px; color:${M3.primary};">
          ${SVG_ICONS.calendar}
          <span class="m3-title-medium" style="font-size:15px; color:${M3.textMain};">每日練習紀錄</span>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <input type="date" id="homeQuickDatePicker" value="${todayStr}" style="padding:4px 8px; border:1px solid ${M3.outline}; border-radius:12px; font-size:12px; cursor:pointer; background:${M3.bg}; color:${M3.textMain};" />
          <button id="openFullDailyInspectorBtn" class="sound-trigger" style="background:${M3.surfaceVariant}; color:${M3.primary}; border:none; padding:5px 12px; border-radius:12px; font-size:11px; cursor:pointer;">明細</button>
        </div>
      </div>
      <div style="max-height:170px; overflow-y:auto;">
        ${dailyListHtml}
      </div>
    </div>

    <div class="m3-card" style="padding:18px 26px; display:flex; justify-content:space-around; align-items:center; text-align:center;">
      <div>
        <div style="font-size:12px; color:${M3.textSub};">總 Topic</div>
        <div style="font-size:18px; color:${M3.textMain}; margin-top:2px;">15</div>
      </div>
      <div>
        <div style="font-size:12px; color:${M3.textSub};">總 Chapter</div>
        <div style="font-size:18px; color:${M3.textMain}; margin-top:2px;">65</div>
      </div>
      <div>
        <div style="font-size:12px; color:${M3.textSub};">總題目數</div>
        <div style="font-size:18px; color:${M3.textMain}; margin-top:2px;">${summary.totalUniqueAnswered} <span style="font-size:12px; color:${M3.textMuted};">/ ${TOTAL_APP_QUESTIONS}</span></div>
      </div>
      <div>
        <div style="font-size:12px; color:${M3.textSub};">完成率</div>
        <div style="font-size:18px; color:${M3.primary}; margin-top:2px;">${summary.overallCompletionText}</div>
      </div>
    </div>
  `;

  const switchEl = dashboardEl.querySelector('#m3SoundSwitch');
  if (switchEl) switchEl.onclick = () => SoundFX.toggleMute();

  const toggleMoreBtn = dashboardEl.querySelector('#toggleMoreRecentBtn');
  if (toggleMoreBtn) {
    toggleMoreBtn.onclick = () => {
      SoundFX.playClick();
      window.chemApp.showAllRecentTopics = !window.chemApp.showAllRecentTopics;
      renderHomeDashboard();
    };
  }

  dashboardEl.querySelector('#topMenuHamburgerBtn').onclick = () => {
    SoundFX.playClick();
    renderCenterDirectoryModal();
    const m = document.getElementById('centerDirectoryModal');
    if (m) m.style.display = 'flex';
  };

  dashboardEl.querySelector('#topAdminBtn').onclick = () => {
    SoundFX.playClick();
    openDiscreetAdminModal();
  };

  dashboardEl.querySelectorAll('.recent-chap-jump-btn').forEach(btn => {
    btn.onclick = (e) => {
      SoundFX.playClick();
      const chId = parseInt(e.currentTarget.getAttribute('data-chid'), 10);
      if (chId) openChapter(chId);
    };
  });

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
  };

  dashboardEl.querySelector('#langZhBtn').onclick = () => {
    SoundFX.playClick();
    window.chemApp.currentLang = 'c';
    localStorage.setItem('CHEM_LANG_V47', 'c');
    renderHomeDashboard();
  };
}

// 16. 螢幕中央 28px 圓角 Topic / Chapter 目錄卡片
function renderCenterDirectoryModal() {
  let modal = document.getElementById('centerDirectoryModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'centerDirectoryModal';
    modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(29,31,44,0.35); z-index:99999; justify-content:center; align-items:center; padding:18px; box-sizing:border-box; font-family:sans-serif;';
    document.body.appendChild(modal);
  }

  const uniqueAns = (window.ChemUserLog && window.ChemUserLog.state.uniqueAnswers) || {};
  const sessionAns = (window.ChemUserLog && window.ChemUserLog.state.sessionAnswers) || {};

  let contentHtml = `
    <div style="background:${M3.surface}; width:100%; max-width:440px; height:82vh; max-height:640px; border-radius:28px; box-shadow:0 14px 44px rgba(72,84,122,0.15); display:flex; flex-direction:column; overflow:hidden; border:1px solid ${M3.outline};">
      <div style="padding:18px 24px; background:${M3.surfaceVariant}; color:${M3.primary}; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h2 class="m3-title-medium" style="margin:0; font-size:16px;">選擇 Topic / Chapter</h2>
          <div style="font-size:11px; color:${M3.textSub}; margin-top:2px;">共 15 個課題、65 個章節</div>
        </div>
        <button id="closeDirModalBtn" class="sound-trigger" style="background:${M3.surface}; border:none; color:${M3.primary}; width:32px; height:32px; border-radius:16px; font-size:18px; cursor:pointer; line-height:1;">&times;</button>
      </div>
      <div style="flex:1; overflow-y:auto; padding:16px 20px; background:${M3.bg};">
  `;

  SYLLABUS_CONFIG.forEach(topic => {
    const isCurrentTopic = topic.chapters.some(c => c.id === window.chemApp.activeChapterId);
    contentHtml += `
      <div style="background:${M3.surface}; border-radius:20px; margin-bottom:10px; border:1.5px solid ${M3.outline}; overflow:hidden;">
        <div class="dir-topic-header sound-trigger" style="padding:13px 16px; background:${M3.surface}; font-size:14px; color:${M3.textMain}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
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
          <div class="dir-chapter-item sound-trigger" data-chid="${ch.id}" style="padding:11px 16px 11px 20px; border-top:1px solid ${M3.outline}; font-size:13px; color:${isActive ? M3.primary : M3.textMain}; background:${isActive ? M3.surfaceVariant : M3.surface}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
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

// 17. 全屏登入 / 註冊閘道
function ensureAuthOverlay() {
  let authOverlay = document.getElementById('chemAuthOverlay');
  if (authOverlay) return authOverlay;

  authOverlay = document.createElement('div');
  authOverlay.id = 'chemAuthOverlay';
  authOverlay.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:${M3.bg}; z-index:99999; display:flex; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;`;

  authOverlay.innerHTML = `
    <div style="background:${M3.surface}; padding:32px 34px; border-radius:28px; box-shadow:0 12px 36px rgba(72,84,122,0.08); width:100%; max-width:390px; text-align:center; border:2.5px solid ${M3.outline};">
      <h2 class="m3-title-medium" style="margin:0 0 6px 0; color:${M3.primary}; font-size:22px; letter-spacing:0.5px;">HKDSE</h2>
      <p style="font-size:13px; color:${M3.textSub}; margin:0 0 22px 0;">請輸入學生 ID 登入或註冊</p>
      
      <div style="display:flex; flex-direction:column; gap:14px; text-align:left;">
        <div>
          <label style="font-size:12px; color:${M3.textSub}; display:block; margin-bottom:4px;">學生 ID (5A / 5B / 5C / 5D + 班號)</label>
          <input type="text" id="customUserIdInput" placeholder="例如: 5A1" style="width:100%; padding:11px 14px; border:1.5px solid ${M3.outline}; border-radius:14px; font-size:14px; box-sizing:border-box; background:${M3.bg}; color:${M3.textMain}; outline:none;" />
        </div>
        <div>
          <label style="font-size:12px; color:${M3.textSub}; display:block; margin-bottom:4px;">密碼</label>
          <input type="password" id="customUserPassInput" placeholder="輸入密碼" style="width:100%; padding:11px 14px; border:1.5px solid ${M3.outline}; border-radius:14px; font-size:14px; box-sizing:border-box; background:${M3.bg}; color:${M3.textMain}; outline:none;" />
        </div>
        <div id="confirmPassGroup" style="display:none;">
          <label style="font-size:12px; color:${M3.textSub}; display:block; margin-bottom:4px;">確認密碼</label>
          <input type="password" id="customUserPassConfirmInput" placeholder="再次輸入相同密碼" style="width:100%; padding:11px 14px; border:1.5px solid ${M3.outline}; border-radius:14px; font-size:14px; box-sizing:border-box; background:${M3.bg}; color:${M3.textMain}; outline:none;" />
        </div>

        <div style="display:flex; gap:10px; margin-top:4px;">
          <button id="mainLoginBtn" class="sound-trigger" style="flex:1; background:${M3.primary}; color:#fff; border:none; padding:12px; border-radius:16px; font-size:14px; cursor:pointer;">登入</button>
          <button id="mainToggleRegBtn" class="sound-trigger" style="flex:1; background:${M3.surfaceVariant}; color:${M3.primary}; border:none; padding:12px; border-radius:16px; font-size:14px; cursor:pointer;">切換註冊</button>
        </div>
      </div>

      <div id="authErrorMsg" style="color:${M3.textSub}; font-size:12px; margin-top:14px; min-height:18px; line-height:1.4;"></div>

      <div style="margin-top:12px; padding-top:10px; border-top:1px solid ${M3.outline}; display:flex; justify-content:flex-end;">
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
      toggleRegBtn.textContent = '返回登入';
    } else {
      confirmGroup.style.display = 'none';
      loginBtn.textContent = '登入';
      toggleRegBtn.textContent = '切換註冊';
    }
    errMsg.textContent = '';
  };

  const submitAuth = async () => {
    SoundFX.playClick();
    errMsg.textContent = '正在驗證中...';

    if (!window.ChemUserLog) {
      await ensureUserLogModuleLoaded();
    }
    if (!window.ChemUserLog) {
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
    rootContainer.style.cssText = `width:100%; min-height:100vh; background:${M3.bg}; box-sizing:border-box;`;
    document.body.insertBefore(rootContainer, document.body.firstChild);
  }
}

// 19. 主程式啟動入口
async function bootChemApp() {
  ensureStyleCssLoaded();
  injectM3AndResponsiveLayoutStyles();
  cleanLegacyPageLayout();
  const authOverlay = ensureAuthOverlay();
  ensureFloatingActionGroup();

  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .sound-trigger');
    if (
      target &&
      !target.classList.contains('opt-act-btn') &&
      !target.classList.contains('peek-ans-btn') &&
      target.id !== 'timerToggleBtn' &&
      target.id !== 'timerLapBtn' &&
      target.id !== 'timerResetBtn' &&
      target.id !== 'floatingTimerToggleBtn' &&
      target.id !== 'floatingTimerLapBtn'
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
            syncAllTimerButtonsText();
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
      if (streakEl && state) streakEl.textContent = state.currentStreak || 0;
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
// 自動按需載入當前章節專屬的 patches/patch_chXX.js (例如 Ch40 讀 patch_ch40.js, Ch30 讀 patch_ch30.js)
(function () {
  const loadedPatches = {};

  function loadChapterPatch(chapId) {
    if (!chapId) return;
    const cleanId = String(chapId).replace(/^0+/, '');
    if (!cleanId) return;
    const padId = cleanId.padStart(2, '0');
    const candidates = Array.from(new Set([
      `./patches/patch_ch${cleanId}.js`,
      `./patches/patch_ch${padId}.js`
    ]));

    candidates.forEach(src => {
      if (loadedPatches[src]) return;
      loadedPatches[src] = true;
      const s = document.createElement('script');
      s.src = `${src}?v=${Date.now()}`;
      s.onerror = () => {}; // 若該章節目前沒有建立 patch 檔則安靜略過
      document.head.appendChild(s);
    });
  }

  function detectAndLoadCurrentChapter() {
    // 1. 優先讀取全域狀態中的當前章節 ID
    if (window.chemApp && window.chemApp.activeChapterId) {
      loadChapterPatch(window.chemApp.activeChapterId);
    }

    // 2. 掃描畫面上已渲染的題號 (例如 ChemMCQ40001 -> 自動提取章節 "40")
    const qNumEls = document.querySelectorAll('.q-number');
    qNumEls.forEach(el => {
      const match = (el.textContent || '').trim().match(/Chem[A-Za-z]+(\d{2})\d{3}/i);
      if (match && match[1]) {
        loadChapterPatch(match[1]);
      }
    });
  }

  // 監聽 DOM 變化，一旦切換章節或載入新題目即刻觸發對應章節的 Patch
  const observer = new MutationObserver(detectAndLoadCurrentChapter);
  const targetNode = document.getElementById('chemAppRootContainer') || document.body;
  observer.observe(targetNode, { childList: true, subtree: true });

  detectAndLoadCurrentChapter();
})();
/**
 * ============================================================================
 * Version Tracker, Anti-Zoom & Strict Directory Background Scroll Lock
 * Current Version: 0.1.12 (Increment on every new release)
 * Append this snippet to the very bottom of app.js
 * ============================================================================
 */
(function () {
  'use strict';

  const APP_VERSION = '0.1.12';
  window.CHEM_APP_VERSION = APP_VERSION;

  // --------------------------------------------------------------------------
  // 1. 版本號檢測與畫面左下角狀態標籤（方便每次更新後即時確認是否載入新版）
  // --------------------------------------------------------------------------
  function initVersionBadge() {
    const prevVersion = localStorage.getItem('chem_app_version');
    if (prevVersion && prevVersion !== APP_VERSION) {
      console.log(`[ChemApp] 版本已更新：v${prevVersion} -> v${APP_VERSION}`);
    } else {
      console.log(`[ChemApp] 當前版本：v${APP_VERSION}`);
    }
    localStorage.setItem('chem_app_version', APP_VERSION);

    if (document.getElementById('chemVersionBadge')) return;
    const badge = document.createElement('div');
    badge.id = 'chemVersionBadge';
    badge.textContent = `v${APP_VERSION}`;
    badge.title = `當前題庫程式版本 v${APP_VERSION}（點擊檢查版本）`;
    badge.style.cssText = [
      'position: fixed',
      'left: 12px',
      'bottom: 12px',
      'z-index: 9998',
      'background: rgba(29, 31, 44, 0.72)',
      'color: #FFFFFF',
      'font-family: -apple-system, BlinkMacSystemFont, sans-serif',
      'font-size: 11px',
      'font-weight: 600',
      'letter-spacing: 0.4px',
      'padding: 4px 10px',
      'border-radius: 999px',
      'backdrop-filter: blur(6px)',
      '-webkit-backdrop-filter: blur(6px)',
      'box-shadow: 0 2px 8px rgba(0,0,0,0.12)',
      'user-select: none',
      'cursor: pointer'
    ].join(';');

    badge.addEventListener('click', () => {
      badge.textContent = `v${APP_VERSION} ✓ 已是最新`;
      setTimeout(() => {
        badge.textContent = `v${APP_VERSION}`;
      }, 1600);
    });

    document.body.appendChild(badge);
  }

  // --------------------------------------------------------------------------
  // 2. 徹底關閉網頁內放大功能（雙指捏合、雙擊放大、觸控板縮放）
  // --------------------------------------------------------------------------
  function disablePageZoom() {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover'
    );

    if (!document.getElementById('chemLockV0112Style')) {
      const style = document.createElement('style');
      style.id = 'chemLockV0112Style';
      style.textContent = `
        html, body {
          touch-action: pan-x pan-y !important;
          -ms-touch-action: pan-x pan-y !important;
          overscroll-behavior: none !important;
        }
        * {
          touch-action: manipulation;
        }
        html.chem-dir-locked,
        body.chem-dir-locked,
        body.chem-dir-locked #chemAppRootContainer {
          overflow: hidden !important;
          overscroll-behavior: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // 攔截 iPadOS / iOS Safari 原生縮放手勢
    ['gesturestart', 'gesturechange', 'gestureend'].forEach(evt => {
      document.addEventListener(evt, e => e.preventDefault(), { passive: false });
    });

    // 攔截雙指觸控縮放
    document.addEventListener(
      'touchstart',
      e => {
        if (e.touches && e.touches.length > 1) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
    document.addEventListener(
      'touchmove',
      e => {
        if (e.touches && e.touches.length > 1) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    // 攔截雙擊放大 (300ms 內連續點擊)
    let lastTouchEnd = 0;
    document.addEventListener(
      'touchend',
      e => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      },
      { passive: false }
    );

    // 攔截觸控板雙指捏合縮放 (Ctrl + Wheel)
    document.addEventListener(
      'wheel',
      e => {
        if (e.ctrlKey) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }

  // --------------------------------------------------------------------------
  // 3. 打開目錄時徹底鎖死背景滑動（支援觸控手勢與觸控板滾輪）
  // --------------------------------------------------------------------------
  let isDirOpen = false;

  // 判斷目前畫面上是否有開啟目錄抽屜或全螢幕遮罩
  function detectDirectoryOpen() {
    const candidates = Array.from(document.querySelectorAll('div, aside, nav, dialog, section'));
    const found = candidates.some(el => {
      if (el === document.body || el === document.documentElement || el.id === 'chemVersionBadge') {
        return false;
      }
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) {
        return false;
      }
      if (style.position !== 'fixed' && style.position !== 'absolute') {
        return false;
      }
      // 排除右下角常駐的懸浮控制列（包含「結束當前 MC」按鈕的區塊）
      const txt = el.textContent || '';
      if (txt.includes('結束當前 MC') && el.getBoundingClientRect().width < 260) {
        return false;
      }

      const rect = el.getBoundingClientRect();
      const isBackdrop = rect.width >= window.innerWidth * 0.85 && rect.height >= window.innerHeight * 0.85;
      const isDrawer = rect.width >= 200 && rect.height >= window.innerHeight * 0.35 && (parseInt(style.zIndex, 10) || 0) >= 10;
      return isBackdrop || isDrawer;
    });

    if (found !== isDirOpen) {
      isDirOpen = found;
      document.documentElement.classList.toggle('chem-dir-locked', isDirOpen);
      document.body.classList.toggle('chem-dir-locked', isDirOpen);
    }
    return isDirOpen;
  }

  // 尋找手指／滑鼠所在位置的可捲動目錄容器
  function findScrollableMenuContainer(target) {
    let el = target;
    const rootContainer = document.getElementById('chemAppRootContainer');
    while (el && el !== document.body && el !== document.documentElement && el !== rootContainer) {
      const style = window.getComputedStyle(el);
      const oy = style.overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }

  let touchStartY = 0;
  document.addEventListener(
    'touchstart',
    e => {
      if (e.touches && e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    },
    { passive: true }
  );

  // 攔截觸控滑動：目錄開啟時，非目錄內部捲動區一律禁止移動
  document.addEventListener(
    'touchmove',
    e => {
      if (!detectDirectoryOpen()) return;
      if (e.touches && e.touches.length > 1) return;

      const menuScroller = findScrollableMenuContainer(e.target);
      if (!menuScroller) {
        // 滑在黑底遮罩或目錄標題列上時，直接阻斷事件防止背景跟著動
        e.preventDefault();
        return;
      }

      menuScroller.style.overscrollBehavior = 'contain';
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - touchStartY;
      const atTop = menuScroller.scrollTop <= 0;
      const atBottom = menuScroller.scrollTop + menuScroller.clientHeight >= menuScroller.scrollHeight - 1;

      if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // 攔截 iPad 觸控板／外接滑鼠滾輪 (Wheel)：目錄開啟時禁止背景捲動
  document.addEventListener(
    'wheel',
    e => {
      if (!detectDirectoryOpen()) return;
      const menuScroller = findScrollableMenuContainer(e.target);
      if (!menuScroller) {
        e.preventDefault();
        return;
      }
      const atTop = menuScroller.scrollTop <= 0;
      const atBottom = menuScroller.scrollTop + menuScroller.clientHeight >= menuScroller.scrollHeight - 1;
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // 點擊「目錄選單」按鈕時立即觸發狀態檢測
  document.addEventListener(
    'click',
    e => {
      const btn = e.target.closest('button, [role="button"], div');
      if (btn && (btn.textContent || '').includes('目錄選單')) {
        setTimeout(detectDirectoryOpen, 30);
        setTimeout(detectDirectoryOpen, 150);
      }
    },
    true
  );

  function init() {
    initVersionBadge();
    disablePageZoom();
    const observer = new MutationObserver(() => {
      detectDirectoryOpen();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden', 'open']
    });
    detectDirectoryOpen();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
/**
 * ============================================================================
 * HKDSE Subject Switcher (Chem / Bio), Version Tracker (v0.1.17),
 * Anti-Zoom & Strict Directory Background Scroll Lock
 * Target Folder & Naming: biodocs/qb_x_chxx_e.docx (Clean No-Emoji UI)
 * Append this complete module to the very bottom of app.js
 * ============================================================================
 */
(function () {
  'use strict';

  const APP_VERSION = '0.1.17';
  window.CHEM_APP_VERSION = APP_VERSION;

  // ==========================================================================
  // 1. HKDSE Biology 完整章節目錄設定（命名格式：biodocs/qb_x_chxx_e.docx）
  // ==========================================================================
  const BIO_CHAPTERS = [
    { id: 1, book: '1', title: 'Ch 1: Introducing Biology (生物學入門)', file: 'biodocs/qb_1_ch01_e.docx' },
    { id: 2, book: '1', title: 'Ch 2: The Cell as the Basic Unit of Life (細胞)', file: 'biodocs/qb_1_ch02_e.docx' },
    { id: 3, book: '1', title: 'Ch 3: Movement of Substances across Membrane (物質穿越細胞膜)', file: 'biodocs/qb_1_ch03_e.docx' },
    { id: 4, book: '1', title: 'Ch 4: Enzymes and Metabolism (酶與新陳代謝)', file: 'biodocs/qb_1_ch04_e.docx' },
    { id: 5, book: '1', title: 'Ch 5: Food and Humans (食物與人類)', file: 'biodocs/qb_1_ch05_e.docx' },
    { id: 6, book: '1', title: 'Ch 6: Nutrition in Humans (人的營養)', file: 'biodocs/qb_1_ch06_e.docx' },
    { id: 7, book: '1', title: 'Ch 7: Gas Exchange in Humans (人的氣體交換)', file: 'biodocs/qb_1_ch07_e.docx' },
    { id: 8, book: '1', title: 'Ch 8: Transport in Humans (人體內的轉運)', file: 'biodocs/qb_1_ch08_e.docx' },
    { id: 9, book: '1', title: 'Ch 9: Nutrition and Gas Exchange in Plants (植物的營養與氣體交換)', file: 'biodocs/qb_1_ch09_e.docx' },
    { id: 10, book: '1', title: 'Ch 10: Transpiration, Transport and Support in Plants (蒸騰、轉運與支持)', file: 'biodocs/qb_1_ch10_e.docx' },
    { id: 11, book: '2', title: 'Ch 11: Cell Cycle and Division (細胞週期與分裂)', file: 'biodocs/qb_2_ch11_e.docx' },
    { id: 12, book: '2', title: 'Ch 12: Reproduction in Flowering Plants (有花植物的生殖)', file: 'biodocs/qb_2_ch12_e.docx' },
    { id: 13, book: '2', title: 'Ch 13: Reproduction in Humans (人的生殖)', file: 'biodocs/qb_2_ch13_e.docx' },
    { id: 14, book: '2', title: 'Ch 14: Growth and Development (生長與發育)', file: 'biodocs/qb_2_ch14_e.docx' },
    { id: 15, book: '2', title: 'Ch 15: Detecting the Environment (環境的探測)', file: 'biodocs/qb_2_ch15_e.docx' },
    { id: 16, book: '2', title: 'Ch 16: Coordination in Humans (人體的協調)', file: 'biodocs/qb_2_ch16_e.docx' },
    { id: 17, book: '2', title: 'Ch 17: Movement in Humans (人體的運動)', file: 'biodocs/qb_2_ch17_e.docx' },
    { id: 18, book: '2', title: 'Ch 18: Homeostasis (體內平衡)', file: 'biodocs/qb_2_ch18_e.docx' },
    { id: 19, book: '3', title: 'Ch 19: Ecosystems (生態系)', file: 'biodocs/qb_3_ch19_e.docx' },
    { id: 20, book: '3', title: 'Ch 20: Photosynthesis (光合作用)', file: 'biodocs/qb_3_ch20_e.docx' },
    { id: 21, book: '3', title: 'Ch 21: Respiration (呼吸作用)', file: 'biodocs/qb_3_ch21_e.docx' },
    { id: 22, book: '3', title: 'Ch 22: Non-infectious Diseases (非傳染病)', file: 'biodocs/qb_3_ch22_e.docx' },
    { id: 23, book: '3', title: 'Ch 23: Infectious Diseases (傳染病)', file: 'biodocs/qb_3_ch23_e.docx' },
    { id: 24, book: '3', title: 'Ch 24: Body Defence Mechanisms (身體防禦機制)', file: 'biodocs/qb_3_ch24_e.docx' },
    { id: 25, book: '4', title: 'Ch 25: Basic Genetics (基礎遺傳學)', file: 'biodocs/qb_4_ch25_e.docx' },
    { id: 26, book: '4', title: 'Ch 26: Molecular Genetics (分子遺傳學)', file: 'biodocs/qb_4_ch26_e.docx' },
    { id: 27, book: '4', title: 'Ch 27: Biotechnology (生物工程)', file: 'biodocs/qb_4_ch27_e.docx' },
    { id: 28, book: '4', title: 'Ch 28: Biodiversity (生物多樣性)', file: 'biodocs/qb_4_ch28_e.docx' },
    { id: 29, book: '4', title: 'Ch 29: Evolution (進化)', file: 'biodocs/qb_4_ch29_e.docx' }
  ];

  // ==========================================================================
  // 2. 注入左上角切換鈕與 Bio 分區專屬樣式
  // ==========================================================================
  function injectSubjectSwitcherStyles() {
    if (document.getElementById('dseSubjectSwitcherStyle')) return;
    const style = document.createElement('style');
    style.id = 'dseSubjectSwitcherStyle';
    style.textContent = `
      #dseSubjectSwitchBtn {
        position: fixed !important;
        top: max(12px, env(safe-area-inset-top)) !important;
        left: 12px !important;
        z-index: 9999 !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        padding: 6px 14px !important;
        border-radius: 999px !important;
        border: 1.5px solid rgba(29, 31, 44, 0.14) !important;
        background: rgba(255, 255, 255, 0.92) !important;
        color: #1D1F2C !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        letter-spacing: 0.3px !important;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        cursor: pointer !important;
        user-select: none !important;
        transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease !important;
      }
      #dseSubjectSwitchBtn:active {
        transform: scale(0.95) !important;
      }
      #dseSubjectSwitchBtn.is-bio-mode {
        background: #1B5E20 !important;
        color: #FFFFFF !important;
        border-color: #2E7D32 !important;
        box-shadow: 0 3px 14px rgba(27, 94, 32, 0.32) !important;
      }

      #bioAppRootContainer {
        display: none;
        max-width: 780px;
        margin: 0 auto;
        padding: 58px 16px 120px 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", sans-serif;
        color: #1D1F2C;
        box-sizing: border-box;
      }
      #bioAppRootContainer.active {
        display: block !important;
      }

      .bio-header-card {
        background: linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%);
        border: 1px solid #C8E6C9;
        border-radius: 20px;
        padding: 18px 20px;
        margin-bottom: 18px;
        box-shadow: 0 4px 16px rgba(27, 94, 32, 0.06);
      }
      .bio-header-title {
        font-size: 19px;
        font-weight: 800;
        color: #1B5E20;
        margin: 0 0 6px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
      }
      .bio-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 12px;
        align-items: center;
      }
      .bio-select {
        flex: 1;
        min-width: 210px;
        padding: 9px 12px;
        border-radius: 12px;
        border: 1.5px solid #A5D6A7;
        background: #FFFFFF;
        color: #1D1F2C;
        font-size: 14px;
        font-weight: 600;
        outline: none;
      }
      .bio-btn {
        padding: 9px 14px;
        border-radius: 12px;
        border: none;
        background: #2E7D32;
        color: #FFFFFF;
        font-size: 13.5px;
        font-weight: 700;
        cursor: pointer;
        white-space: nowrap;
      }
      .bio-btn-outline {
        padding: 8px 13px;
        border-radius: 12px;
        border: 1.5px solid #2E7D32;
        background: #FFFFFF;
        color: #1B5E20;
        font-size: 13.5px;
        font-weight: 700;
        cursor: pointer;
        white-space: nowrap;
      }

      .bio-q-card {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 18px;
        padding: 18px 20px;
        margin-bottom: 16px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
      }
      .bio-q-meta {
        display: flex;
        justify-content: space-between;
        font-size: 12.5px;
        font-weight: 700;
        color: #2E7D32;
        margin-bottom: 10px;
        padding-bottom: 6px;
        border-bottom: 1px dashed #E2E8F0;
      }
      .bio-q-body {
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 16px;
        line-height: 1.65;
        color: #111111;
      }
      .bio-q-body img {
        max-width: 85% !important;
        max-height: 220px !important;
        display: block;
        margin: 10px auto;
        object-fit: contain;
        mix-blend-mode: multiply;
      }
      .bio-ans-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px dashed #E2E8F0;
      }
      .bio-opt-btn {
        padding: 9px 0;
        border-radius: 12px;
        border: 1.5px solid #CBD5E1;
        background: #F8FAFC;
        font-weight: 700;
        font-size: 14.5px;
        color: #1E293B;
        cursor: pointer;
      }
      .bio-opt-btn.correct {
        background: #1B5E20 !important;
        border-color: #1B5E20 !important;
        color: #FFFFFF !important;
      }
      .bio-opt-btn.wrong {
        background: #C62828 !important;
        border-color: #C62828 !important;
        color: #FFFFFF !important;
      }
      .bio-exp-box {
        display: none;
        margin-top: 12px;
        padding: 12px 14px;
        border-radius: 12px;
        background: #F1F8E9;
        border-left: 4px solid #2E7D32;
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 15px;
        line-height: 1.55;
      }
      .bio-exp-box.open {
        display: block;
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================================================
  // 3. 建立 Bio 分區工作台與自動載入/解析引擎 (支援 biodocs/qb_x_chxx_e.docx)
  // ==========================================================================
  function ensureBioWorkspace() {
    if (document.getElementById('bioAppRootContainer')) return;

    const bioRoot = document.createElement('div');
    bioRoot.id = 'bioAppRootContainer';

    const optionsHtml = BIO_CHAPTERS.map(
      ch => `<option value="${ch.id}" data-file="${ch.file}">${ch.title}</option>`
    ).join('');

    bioRoot.innerHTML = `
      <div class="bio-header-card">
        <div class="bio-header-title">
          <span>HKDSE Biology 題庫分區</span>
          <span id="bioQuestionCountBadge" style="font-size:12.5px; background:#2E7D32; color:#fff; padding:3px 10px; border-radius:999px;">準備就緒</span>
        </div>
        <div style="font-size:13px; color:#33691E;">
          點擊左上角 <b>「Bio / Chem」</b> 可隨時無縫切換科目；自動對應 <code>biodocs/qb_x_chxx_e.docx</code> 題庫檔。
        </div>
        <div class="bio-toolbar">
          <select id="bioChapterSelect" class="bio-select">${optionsHtml}</select>
          <button id="bioLoadRemoteBtn" class="bio-btn">載入本章題庫</button>
          <label class="bio-btn-outline" style="cursor:pointer;">
            匯入 .docx
            <input id="bioLocalDocxInput" type="file" accept=".docx" style="display:none;" />
          </label>
        </div>
      </div>
      <div id="bioQuestionsFeed"></div>
    `;

    document.body.appendChild(bioRoot);

    document.getElementById('bioLoadRemoteBtn').addEventListener('click', () => {
      const sel = document.getElementById('bioChapterSelect');
      const opt = sel.options[sel.selectedIndex];
      loadBioChapterFromId(parseInt(opt.value, 10), opt.dataset.file, opt.textContent);
    });

    document.getElementById('bioLocalDocxInput').addEventListener('change', async e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const buf = await file.arrayBuffer();
      await parseAndRenderBioDocx(buf, file.name);
      e.target.value = '';
    });

    renderBioWelcomeCard();
  }

  function renderBioWelcomeCard() {
    const feed = document.getElementById('bioQuestionsFeed');
    if (!feed) return;
    feed.innerHTML = `
      <div class="bio-q-card" style="text-align:center; padding:28px 20px;">
        <div style="font-size:17px; font-weight:700; color:#1B5E20; margin-bottom:8px;">
          已切換至 HKDSE Biology 生物科專區
        </div>
        <div style="font-size:14px; color:#475569; line-height:1.6; max-width:460px; margin:0 auto;">
          將生物科題庫放入 GitHub 的 <code>biodocs/</code> 資料夾並命名為 <code>qb_x_chxx_e.docx</code>（例如 <code>qb_3_ch20_e.docx</code>），選擇章節後點擊 <b>「載入本章題庫」</b> 即可作答。
        </div>
      </div>
    `;
  }

  async function loadBioChapterFromId(chId, primaryPath, titleText) {
    const feed = document.getElementById('bioQuestionsFeed');
    const badge = document.getElementById('bioQuestionCountBadge');
    badge.textContent = '載入中...';
    feed.innerHTML = `<div class="bio-q-card" style="text-align:center; padding:24px;">正在讀取 <b>${titleText}</b> ...</div>`;

    const chPad = String(chId).padStart(2, '0');
    // 優先讀取預設冊別路徑，若冊別編號不同則自動依序嘗試 qb_1 ~ qb_4 與 1A/1B 命名
    const candidateUrls = Array.from(
      new Set([
        primaryPath,
        `biodocs/qb_1_ch${chPad}_e.docx`,
        `biodocs/qb_1a_ch${chPad}_e.docx`,
        `biodocs/qb_1b_ch${chPad}_e.docx`,
        `biodocs/qb_2_ch${chPad}_e.docx`,
        `biodocs/qb_3_ch${chPad}_e.docx`,
        `biodocs/qb_4_ch${chPad}_e.docx`
      ])
    );

    let arrayBuffer = null;
    for (const url of candidateUrls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          arrayBuffer = await res.arrayBuffer();
          break;
        }
      } catch (_) {}
    }

    if (!arrayBuffer) {
      badge.textContent = '尚未上傳題庫';
      feed.innerHTML = `
        <div class="bio-q-card" style="border-left:4px solid #E65100;">
          <div style="font-weight:700; color:#E65100; margin-bottom:6px;">找不到遠端檔案：${primaryPath}</div>
          <div style="font-size:14px; color:#334155; line-height:1.6;">
            請確認你已將該章節上傳至 GitHub 的 <code>biodocs/</code> 資料夾（格式為 <code>qb_x_ch${chPad}_e.docx</code>），或直接點擊上方 <b>「匯入 .docx」</b> 從本機開啟。
          </div>
        </div>
      `;
      return;
    }

    await parseAndRenderBioDocx(arrayBuffer, titleText);
  }

  async function parseAndRenderBioDocx(arrayBuffer, labelName) {
    const feed = document.getElementById('bioQuestionsFeed');
    const badge = document.getElementById('bioQuestionCountBadge');

    if (typeof mammoth === 'undefined') {
      feed.innerHTML = `<div class="bio-q-card">找不到 mammoth.js 解析引擎，請確認 index.html 已載入 mammoth。</div>`;
      return;
    }

    try {
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.value;

      const blocks = Array.from(tempDiv.children);
      const questions = [];
      let currQ = null;

      blocks.forEach(el => {
        const txt = (el.textContent || '').trim();
        const codeMatch = txt.match(/^(BioMCQ\d+|Question\s*\d+|\d+\.)/i);
        if (codeMatch && (txt.startsWith('BioMCQ') || txt.length < 25)) {
          if (currQ) questions.push(currQ);
          currQ = { code: codeMatch[1], stemNodes: [], expNodes: [], answer: '', inExp: false };
          return;
        }
        if (!currQ) {
          currQ = { code: `BioQ-${questions.length + 1}`, stemNodes: [], expNodes: [], answer: '', inExp: false };
        }

        const ansMatch = txt.match(/^Answer:\s*([A-D])/i);
        if (ansMatch) {
          currQ.answer = ansMatch[1].toUpperCase();
          currQ.inExp = true;
          currQ.expNodes.push(el.outerHTML);
        } else if (currQ.inExp) {
          currQ.expNodes.push(el.outerHTML);
        } else {
          currQ.stemNodes.push(el.outerHTML);
        }
      });
      if (currQ && currQ.stemNodes.length > 0) questions.push(currQ);

      if (questions.length === 0) {
        badge.textContent = '0 題';
        feed.innerHTML = `<div class="bio-q-card">未能從 <b>${labelName}</b> 識別出標準題目格式。</div>`;
        return;
      /**
 * ============================================================================
 * HKDSE Subject & Mode Switcher (Chem MC / Chem LQ / Bio),
 * Version Tracker (v0.1.18), Anti-Zoom & Strict Directory Background Scroll Lock
 * Target Folders:
 *   - Chem LQ: chemlq/chemlq_chxx_e.js (e.g. chemlq/chemlq_ch41_e.js)
 *   - Bio MC : biodocs/qb_x_chxx_e.docx
 * Append this complete module to the very bottom of app.js
 * ============================================================================
 */
(function () {
  'use strict';

  const APP_VERSION = '0.1.18';
  window.CHEM_APP_VERSION = APP_VERSION;

  // ==========================================================================
  // 1. 章節目錄設定 (Chem LQ & Bio MC)
  // ==========================================================================
  const CHEM_LQ_CHAPTERS = [
    { id: '41', title: 'Ch 41: Chemical Equilibrium (化學平衡 — 35 Marks)', file: 'chemlq/chemlq_ch41_e.js' },
    { id: '40', title: 'Ch 40: Equilibrium Constant (平衡常數)', file: 'chemlq/chemlq_ch40_e.js' },
    { id: '45', title: 'Ch 45: Organic Synthesis (有機合成)', file: 'chemlq/chemlq_ch45_e.js' }
  ];

  const BIO_CHAPTERS = [
    { id: 1, title: 'Ch 1: Introducing Biology (生物學入門)', file: 'biodocs/qb_1_ch01_e.docx' },
    { id: 2, title: 'Ch 2: The Cell as the Basic Unit of Life (細胞)', file: 'biodocs/qb_1_ch02_e.docx' },
    { id: 3, title: 'Ch 3: Movement of Substances across Membrane (物質穿越細胞膜)', file: 'biodocs/qb_1_ch03_e.docx' },
    { id: 4, title: 'Ch 4: Enzymes and Metabolism (酶與新陳代謝)', file: 'biodocs/qb_1_ch04_e.docx' },
    { id: 5, title: 'Ch 5: Food and Humans (食物與人類)', file: 'biodocs/qb_1_ch05_e.docx' },
    { id: 6, title: 'Ch 6: Nutrition in Humans (人的營養)', file: 'biodocs/qb_1_ch06_e.docx' },
    { id: 7, title: 'Ch 7: Gas Exchange in Humans (人的氣體交換)', file: 'biodocs/qb_1_ch07_e.docx' },
    { id: 8, title: 'Ch 8: Transport in Humans (人體內的轉運)', file: 'biodocs/qb_1_ch08_e.docx' },
    { id: 9, title: 'Ch 9: Nutrition and Gas Exchange in Plants (植物的營養與氣體交換)', file: 'biodocs/qb_1_ch09_e.docx' },
    { id: 10, title: 'Ch 10: Transpiration, Transport and Support in Plants (蒸騰、轉運與支持)', file: 'biodocs/qb_1_ch10_e.docx' },
    { id: 11, title: 'Ch 11: Cell Cycle and Division (細胞週期與分裂)', file: 'biodocs/qb_2_ch11_e.docx' },
    { id: 12, title: 'Ch 12: Reproduction in Flowering Plants (有花植物的生殖)', file: 'biodocs/qb_2_ch12_e.docx' },
    { id: 13, title: 'Ch 13: Reproduction in Humans (人的生殖)', file: 'biodocs/qb_2_ch13_e.docx' },
    { id: 14, title: 'Ch 14: Growth and Development (生長與發育)', file: 'biodocs/qb_2_ch14_e.docx' },
    { id: 15, title: 'Ch 15: Detecting the Environment (環境的探測)', file: 'biodocs/qb_2_ch15_e.docx' },
    { id: 16, title: 'Ch 16: Coordination in Humans (人體的協調)', file: 'biodocs/qb_2_ch16_e.docx' },
    { id: 17, title: 'Ch 17: Movement in Humans (人體的運動)', file: 'biodocs/qb_2_ch17_e.docx' },
    { id: 18, title: 'Ch 18: Homeostasis (體內平衡)', file: 'biodocs/qb_2_ch18_e.docx' },
    { id: 19, title: 'Ch 19: Ecosystems (生態系)', file: 'biodocs/qb_3_ch19_e.docx' },
    { id: 20, title: 'Ch 20: Photosynthesis (光合作用)', file: 'biodocs/qb_3_ch20_e.docx' },
    { id: 21, title: 'Ch 21: Respiration (呼吸作用)', file: 'biodocs/qb_3_ch21_e.docx' },
    { id: 22, title: 'Ch 22: Non-infectious Diseases (非傳染病)', file: 'biodocs/qb_3_ch22_e.docx' },
    { id: 23, title: 'Ch 23: Infectious Diseases (傳染病)', file: 'biodocs/qb_3_ch23_e.docx' },
    { id: 24, title: 'Ch 24: Body Defence Mechanisms (身體防禦機制)', file: 'biodocs/qb_3_ch24_e.docx' },
    { id: 25, title: 'Ch 25: Basic Genetics (基礎遺傳學)', file: 'biodocs/qb_4_ch25_e.docx' },
    { id: 26, title: 'Ch 26: Molecular Genetics (分子遺傳學)', file: 'biodocs/qb_4_ch26_e.docx' },
    { id: 27, title: 'Ch 27: Biotechnology (生物工程)', file: 'biodocs/qb_4_ch27_e.docx' },
    { id: 28, title: 'Ch 28: Biodiversity (生物多樣性)', file: 'biodocs/qb_4_ch28_e.docx' },
    { id: 29, title: 'Ch 29: Evolution (進化)', file: 'biodocs/qb_4_ch29_e.docx' }
  ];

  // ==========================================================================
  // 2. 注入左上角三段切換列、Chem LQ 長題目樣式與 Bio 分區樣式
  // ==========================================================================
  function injectUnifiedStyles() {
    if (document.getElementById('dseUnifiedSectionStyle')) return;
    const style = document.createElement('style');
    style.id = 'dseUnifiedSectionStyle';
    style.textContent = `
      /* 左上角三合一分區切換膠囊 (Chem MC | Chem LQ | Bio) */
      #dseTopSectionBar {
        position: fixed !important;
        top: max(12px, env(safe-area-inset-top)) !important;
        left: 12px !important;
        z-index: 9999 !important;
        display: inline-flex !important;
        align-items: center !important;
        padding: 3px !important;
        border-radius: 999px !important;
        border: 1.5px solid rgba(29, 31, 44, 0.14) !important;
        background: rgba(255, 255, 255, 0.94) !important;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        user-select: none !important;
      }
      .dse-sec-pill {
        padding: 5px 11px !important;
        border-radius: 999px !important;
        border: none !important;
        background: transparent !important;
        color: #475569 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-size: 12.5px !important;
        font-weight: 700 !important;
        letter-spacing: 0.2px !important;
        cursor: pointer !important;
        transition: background 0.18s ease, color 0.18s ease !important;
        white-space: nowrap !important;
      }
      .dse-sec-pill.active[data-sec="chem_mc"] {
        background: #1D1F2C !important;
        color: #FFFFFF !important;
      }
      .dse-sec-pill.active[data-sec="chem_lq"] {
        background: #1E40AF !important;
        color: #FFFFFF !important;
      }
      .dse-sec-pill.active[data-sec="bio"] {
        background: #1B5E20 !important;
        color: #FFFFFF !important;
      }

      /* --------------------------------------------------------------------
         Chem Long Question (LQ) 分區工作台樣式
         -------------------------------------------------------------------- */
      #chemLqRootContainer {
        display: none;
        max-width: 800px;
        margin: 0 auto;
        padding: 58px 16px 120px 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", sans-serif;
        color: #1D1F2C;
        box-sizing: border-box;
      }
      #chemLqRootContainer.active {
        display: block !important;
      }
      .lq-header-card {
        background: linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%);
        border: 1px solid #BFDBFE;
        border-radius: 20px;
        padding: 18px 20px;
        margin-bottom: 18px;
        box-shadow: 0 4px 16px rgba(30, 64, 175, 0.06);
      }
      .lq-header-title {
        font-size: 19px;
        font-weight: 800;
        color: #1E3A8A;
        margin: 0 0 6px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
      }
      .lq-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 12px;
        align-items: center;
      }
      .lq-select {
        flex: 1;
        min-width: 210px;
        padding: 9px 12px;
        border-radius: 12px;
        border: 1.5px solid #93C5FD;
        background: #FFFFFF;
        color: #1D1F2C;
        font-size: 14px;
        font-weight: 600;
        outline: none;
      }
      .lq-btn {
        padding: 9px 14px;
        border-radius: 12px;
        border: none;
        background: #1E40AF;
        color: #FFFFFF;
        font-size: 13.5px;
        font-weight: 700;
        cursor: pointer;
        white-space: nowrap;
      }
      .lq-btn-outline {
        padding: 8px 13px;
        border-radius: 12px;
        border: 1.5px solid #1E40AF;
        background: #FFFFFF;
        color: #1E3A8A;
        font-size: 13.5px;
        font-weight: 700;
        cursor: pointer;
        white-space: nowrap;
      }

      .lq-q-card {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 18px;
        padding: 20px 22px;
        margin-bottom: 18px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
      }
      .lq-q-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        font-weight: 700;
        color: #1E40AF;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px dashed #CBD5E1;
      }
      .lq-stem {
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 16px;
        line-height: 1.65;
        color: #111111;
        margin-bottom: 14px;
      }
      .lq-eq-arrow {
        display: inline-block;
        vertical-align: middle;
        margin: 0 5px;
        font-size: 18px;
      }
      .lq-frac {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        vertical-align: middle;
        margin: 2px 4px;
        font-family: "Times New Roman", serif;
        font-size: 15px;
        line-height: 1.15;
      }
      .lq-frac > .num {
        border-bottom: 1px solid #111111;
        padding: 0 5px 2px 5px;
        white-space: nowrap;
      }
      .lq-frac > .den {
        padding: 2px 5px 0 5px;
        white-space: nowrap;
      }
      table.lq-data-table,
      table.lq-ice-table {
        width: 100%;
        max-width: 580px;
        border-collapse: collapse;
        margin: 10px auto 14px auto;
        font-family: "Times New Roman", serif;
        font-size: 14.5px;
        color: #111111;
      }
      table.lq-data-table th,
      table.lq-data-table td,
      table.lq-ice-table th,
      table.lq-ice-table td {
        border: 1px solid #333333;
        padding: 7px 10px;
        text-align: center;
      }
      table.lq-data-table th,
      table.lq-ice-table th {
        background: #F1F5F9;
        font-weight: bold;
      }

      .lq-subq-block {
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid #F1F5F9;
      }
      .lq-subq-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 16px;
        line-height: 1.55;
        color: #111111;
      }
      .lq-mark-tag {
        flex-shrink: 0;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 12px;
        font-weight: 700;
        color: #1E40AF;
        background: #EFF6FF;
        border: 1px solid #BFDBFE;
        padding: 2px 8px;
        border-radius: 999px;
      }
      .lq-scratchpad {
        width: 100%;
        min-height: 68px;
        margin-top: 8px;
        padding: 9px 12px;
        border-radius: 12px;
        border: 1px solid #CBD5E1;
        background: #F8FAFC;
        font-family: "Times New Roman", "Noto Sans TC", sans-serif;
        font-size: 15px;
        line-height: 1.5;
        color: #1E293B;
        box-sizing: border-box;
        resize: vertical;
        outline: none;
      }
      .lq-scratchpad:focus {
        border-color: #2563EB;
        background: #FFFFFF;
      }
      .lq-subq-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        gap: 8px;
      }
      .lq-toggle-ms-btn {
        padding: 6px 12px;
        border-radius: 10px;
        border: 1px solid #93C5FD;
        background: #EFF6FF;
        color: #1E40AF;
        font-size: 12.5px;
        font-weight: 700;
        cursor: pointer;
      }
      .lq-ms-box {
        display: none;
        margin-top: 10px;
        padding: 12px 14px;
        border-radius: 12px;
        background: #F0FDF4;
        border-left: 4px solid #16A34A;
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 15px;
        line-height: 1.6;
        color: #111111;
      }
      .lq-ms-box.open {
        display: block;
      }
      .lq-ms-box ul {
        margin: 4px 0;
        padding-left: 20px;
      }

      /* --------------------------------------------------------------------
         Bio 分區工作台樣式
         -------------------------------------------------------------------- */
      #bioAppRootContainer {
        display: none;
        max-width: 780px;
        margin: 0 auto;
        padding: 58px 16px 120px 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", sans-serif;
        color: #1D1F2C;
        box-sizing: border-box;
      }
      #bioAppRootContainer.active {
        display: block !important;
      }
      .bio-header-card {
        background: linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%);
        border: 1px solid #C8E6C9;
        border-radius: 20px;
        padding: 18px 20px;
        margin-bottom: 18px;
        box-shadow: 0 4px 16px rgba(27, 94, 32, 0.06);
      }
      .bio-header-title {
        font-size: 19px;
        font-weight: 800;
        color: #1B5E20;
        margin: 0 0 6px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
      }
      .bio-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 12px;
        align-items: center;
      }
      .bio-select {
        flex: 1;
        min-width: 210px;
        padding: 9px 12px;
        border-radius: 12px;
        border: 1.5px solid #A5D6A7;
        background: #FFFFFF;
        color: #1D1F2C;
        font-size: 14px;
        font-weight: 600;
        outline: none;
      }
      .bio-btn {
        padding: 9px 14px;
        border-radius: 12px;
        border: none;
        background: #2E7D32;
        color: #FFFFFF;
        font-size: 13.5px;
        font-weight: 700;
        cursor: pointer;
        white-space: nowrap;
      }
      .bio-btn-outline {
        padding: 8px 13px;
        border-radius: 12px;
        border: 1.5px solid #2E7D32;
        background: #FFFFFF;
        color: #1B5E20;
        font-size: 13.5px;
        font-weight: 700;
        cursor: pointer;
        white-space: nowrap;
      }
      .bio-q-card {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 18px;
        padding: 18px 20px;
        margin-bottom: 16px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
      }
      .bio-q-meta {
        display: flex;
        justify-content: space-between;
        font-size: 12.5px;
        font-weight: 700;
        color: #2E7D32;
        margin-bottom: 10px;
        padding-bottom: 6px;
        border-bottom: 1px dashed #E2E8F0;
      }
      .bio-q-body {
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 16px;
        line-height: 1.65;
        color: #111111;
      }
      .bio-q-body img {
        max-width: 85% !important;
        max-height: 220px !important;
        display: block;
        margin: 10px auto;
        object-fit: contain;
        mix-blend-mode: multiply;
      }
      .bio-ans-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px dashed #E2E8F0;
      }
      .bio-opt-btn {
        padding: 9px 0;
        border-radius: 12px;
        border: 1.5px solid #CBD5E1;
        background: #F8FAFC;
        font-weight: 700;
        font-size: 14.5px;
        color: #1E293B;
        cursor: pointer;
      }
      .bio-opt-btn.correct {
        background: #1B5E20 !important;
        border-color: #1B5E20 !important;
        color: #FFFFFF !important;
      }
      .bio-opt-btn.wrong {
        background: #C62828 !important;
        border-color: #C62828 !important;
        color: #FFFFFF !important;
      }
      .bio-exp-box {
        display: none;
        margin-top: 12px;
        padding: 12px 14px;
        border-radius: 12px;
        background: #F1F8E9;
        border-left: 4px solid #2E7D32;
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 15px;
        line-height: 1.55;
      }
      .bio-exp-box.open {
        display: block;
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================================================
  // 3. 建立 Chem Long Question (LQ) 工作台 (動態載入 chemlq/chemlq_ch41_e.js)
  // ==========================================================================
  function ensureChemLqWorkspace() {
    if (document.getElementById('chemLqRootContainer')) return;

    const lqRoot = document.createElement('div');
    lqRoot.id = 'chemLqRootContainer';

    const optionsHtml = CHEM_LQ_CHAPTERS.map(
      ch => `<option value="${ch.id}" data-file="${ch.file}">${ch.title}</option>`
    ).join('');

    lqRoot.innerHTML = `
      <div class="lq-header-card">
        <div class="lq-header-title">
          <span>HKDSE Chemistry Long Questions</span>
          <span id="lqTotalMarksBadge" style="font-size:12.5px; background:#1E40AF; color:#fff; padding:3px 10px; border-radius:999px;">準備就緒</span>
        </div>
        <div style="font-size:13px; color:#1E3A8A;">
          對應 <code>chemlq/chemlq_chxx_e.js</code> 結構化長題目庫；支援草稿作答區與一鍵核對 Marking Scheme。
        </div>
        <div class="lq-toolbar">
          <select id="chemLqChapterSelect" class="lq-select">${optionsHtml}</select>
          <button id="chemLqLoadBtn" class="lq-btn">載入本章 LQ</button>
          <button id="chemLqToggleAllMsBtn" class="lq-btn-outline">展開/收合全部答案</button>
        </div>
      </div>
      <div id="chemLqFeed"></div>
    `;

    document.body.appendChild(lqRoot);

    document.getElementById('chemLqLoadBtn').addEventListener('click', () => {
      const sel = document.getElementById('chemLqChapterSelect');
      const opt = sel.options[sel.selectedIndex];
      loadChemLqScript(opt.value, opt.dataset.file, opt.textContent);
    });

    let allMsExpanded = false;
    document.getElementById('chemLqToggleAllMsBtn').addEventListener('click', () => {
      allMsExpanded = !allMsExpanded;
      document.querySelectorAll('#chemLqFeed .lq-ms-box').forEach(box => {
        box.classList.toggle('open', allMsExpanded);
      });
    });

    // 預設自動載入 Ch 41 長題目 (chemlq/chemlq_ch41_e.js)
    loadChemLqScript('41', 'chemlq/chemlq_ch41_e.js', CHEM_LQ_CHAPTERS[0].title);
  }

  function loadChemLqScript(chId, scriptPath, titleText) {
    const feed = document.getElementById('chemLqFeed');
    const badge = document.getElementById('lqTotalMarksBadge');

    if (window.CHEM_LQ_BANK && window.CHEM_LQ_BANK[chId]) {
      renderChemLqBank(window.CHEM_LQ_BANK[chId]);
      return;
    }

    badge.textContent = '載入中...';
    feed.innerHTML = `<div class="lq-q-card" style="text-align:center; padding:24px;">正在載入 <b>${titleText}</b> ...</div>`;

    const oldScript = document.getElementById(`chemlq-script-${chId}`);
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = `chemlq-script-${chId}`;
    script.src = `${scriptPath}?v=${APP_VERSION}`;
    script.onload = () => {
      if (window.CHEM_LQ_BANK && window.CHEM_LQ_BANK[chId]) {
        renderChemLqBank(window.CHEM_LQ_BANK[chId]);
      } else {
        badge.textContent = '格式錯誤';
        feed.innerHTML = `<div class="lq-q-card">已讀取 <code>${scriptPath}</code>，但未找到 <code>window.CHEM_LQ_BANK['${chId}']</code> 資料。</div>`;
      }
    };
    script.onerror = () => {
      badge.textContent = '尚未上傳';
      feed.innerHTML = `
        <div class="lq-q-card" style="border-left:4px solid #D97706;">
          <div style="font-weight:700; color:#B45309; margin-bottom:6px;">找不到長題目檔案：${scriptPath}</div>
          <div style="font-size:14px; color:#334155; line-height:1.6;">
            請確認你已在 GitHub 倉庫根目錄建立 <code>chemlq/</code> 資料夾並上傳 <code>${scriptPath}</code>。
          </div>
        </div>
      `;
    };
    document.body.appendChild(script);
  }

  function renderChemLqBank(bankData) {
    const feed = document.getElementById('chemLqFeed');
    const badge = document.getElementById('lqTotalMarksBadge');
    badge.textContent = `共 ${bankData.questions.length} 大題 / ${bankData.totalMarks} 分`;

    feed.innerHTML = bankData.questions
      .map(
        q => `
        <div class="lq-q-card" id="${q.id}">
          <div class="lq-q-meta">
            <span>${q.id} &nbsp;|&nbsp; Question ${q.number}</span>
            <span>(${q.marks} marks)</span>
          </div>
          <div class="lq-stem">${q.stemHtml}</div>
          ${q.subQuestions
            .map(
              (sq, sIdx) => `
              <div class="lq-subq-block">
                <div class="lq-subq-header">
                  <div><b>${sq.label}</b> &nbsp;${sq.textHtml}</div>
                  <span class="lq-mark-tag">${sq.marks}M</span>
                </div>
                <textarea class="lq-scratchpad" placeholder="在此輸入 ${sq.label} 的計算步驟或文字作答草稿..."></textarea>
                <div class="lq-subq-actions">
                  <button type="button" class="lq-toggle-ms-btn" data-target="${q.id}-ms-${sIdx}">顯示 / 隱藏 Marking Scheme</button>
                </div>
                <div class="lq-ms-box" id="${q.id}-ms-${sIdx}">${sq.markingSchemeHtml}</div>
              </div>
            `
            )
            .join('')}
        </div>
      `
      )
      .join('');

    feed.querySelectorAll('.lq-toggle-ms-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const box = document.getElementById(btn.dataset.target);
        if (box) box.classList.toggle('open');
      });
    });
  }

  // ==========================================================================
  // 4. 建立 Bio 分區工作台 (對應 biodocs/qb_x_chxx_e.docx)
  // ==========================================================================
  function ensureBioWorkspace() {
    if (document.getElementById('bioAppRootContainer')) return;

    const bioRoot = document.createElement('div');
    bioRoot.id = 'bioAppRootContainer';

    const optionsHtml = BIO_CHAPTERS.map(
      ch => `<option value="${ch.id}" data-file="${ch.file}">${ch.title}</option>`
    ).join('');

    bioRoot.innerHTML = `
      <div class="bio-header-card">
        <div class="bio-header-title">
          <span>HKDSE Biology 題庫分區</span>
          <span id="bioQuestionCountBadge" style="font-size:12.5px; background:#2E7D32; color:#fff; padding:3px 10px; border-radius:999px;">準備就緒</span>
        </div>
        <div style="font-size:13px; color:#33691E;">
          自動對應 <code>biodocs/qb_x_chxx_e.docx</code> 題庫檔，或直接從本機匯入 <code>.docx</code>。
        </div>
        <div class="bio-toolbar">
          <select id="bioChapterSelect" class="bio-select">${optionsHtml}</select>
          <button id="bioLoadRemoteBtn" class="bio-btn">載入本章題庫</button>
          <label class="bio-btn-outline" style="cursor:pointer;">
            匯入 .docx
            <input id="bioLocalDocxInput" type="file" accept=".docx" style="display:none;" />
          </label>
        </div>
      </div>
      <div id="bioQuestionsFeed">
        <div class="bio-q-card" style="text-align:center; padding:26px 20px;">
          <div style="font-size:16.5px; font-weight:700; color:#1B5E20; margin-bottom:6px;">HKDSE Biology 生物科專區</div>
          <div style="font-size:14px; color:#475569; line-height:1.6;">
            選擇章節後點擊 <b>「載入本章題庫」</b>（讀取 <code>biodocs/qb_x_chxx_e.docx</code>），或點擊 <b>「匯入 .docx」</b> 立即刷題。
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(bioRoot);

    document.getElementById('bioLoadRemoteBtn').addEventListener('click', () => {
      const sel = document.getElementById('bioChapterSelect');
      const opt = sel.options[sel.selectedIndex];
      loadBioChapterFromId(parseInt(opt.value, 10), opt.dataset.file, opt.textContent);
    });

    document.getElementById('bioLocalDocxInput').addEventListener('change', async e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const buf = await file.arrayBuffer();
      await parseAndRenderBioDocx(buf, file.name);
      e.target.value = '';
    });
  }

  async function loadBioChapterFromId(chId, primaryPath, titleText) {
    const feed = document.getElementById('bioQuestionsFeed');
    const badge = document.getElementById('bioQuestionCountBadge');
    badge.textContent = '載入中...';
    feed.innerHTML = `<div class="bio-q-card" style="text-align:center; padding:24px;">正在讀取 <b>${titleText}</b> ...</div>`;

    const chPad = String(chId).padStart(2, '0');
    const candidateUrls = Array.from(
      new Set([
        primaryPath,
        `biodocs/qb_1_ch${chPad}_e.docx`,
        `biodocs/qb_1a_ch${chPad}_e.docx`,
        `biodocs/qb_1b_ch${chPad}_e.docx`,
        `biodocs/qb_2_ch${chPad}_e.docx`,
        `biodocs/qb_3_ch${chPad}_e.docx`,
        `biodocs/qb_4_ch${chPad}_e.docx`
      ])
    );

    let arrayBuffer = null;
    for (const url of candidateUrls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          arrayBuffer = await res.arrayBuffer();
          break;
        }
      } catch (_) {}
    }

    if (!arrayBuffer) {
      badge.textContent = '尚未上傳題庫';
      feed.innerHTML = `
        <div class="bio-q-card" style="border-left:4px solid #E65100;">
          <div style="font-weight:700; color:#E65100; margin-bottom:6px;">找不到遠端檔案：${primaryPath}</div>
          <div style="font-size:14px; color:#334155; line-height:1.6;">
            請確認你已將該章節上傳至 GitHub 的 <code>biodocs/</code> 資料夾（格式為 <code>qb_x_ch${chPad}_e.docx</code>），或直接點擊上方 <b>「匯入 .docx」</b> 從本機開啟。
          </div>
        </div>
      `;
      return;
    }

    await parseAndRenderBioDocx(arrayBuffer, titleText);
  }

  async function parseAndRenderBioDocx(arrayBuffer, labelName) {
    const feed = document.getElementById('bioQuestionsFeed');
    const badge = document.getElementById('bioQuestionCountBadge');

    if (typeof mammoth === 'undefined') {
      feed.innerHTML = `<div class="bio-q-card">找不到 mammoth.js 解析引擎，請確認 index.html 已載入 mammoth。</div>`;
      return;
    }

    try {
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.value;

      const blocks = Array.from(tempDiv.children);
      const questions = [];
      let currQ = null;

      blocks.forEach(el => {
        const txt = (el.textContent || '').trim();
        const codeMatch = txt.match(/^(BioMCQ\d+|Question\s*\d+|\d+\.)/i);
        if (codeMatch && (txt.startsWith('BioMCQ') || txt.length < 25)) {
          if (currQ) questions.push(currQ);
          currQ = { code: codeMatch[1], stemNodes: [], expNodes: [], answer: '', inExp: false };
          return;
        }
        if (!currQ) {
          currQ = { code: `BioQ-${questions.length + 1}`, stemNodes: [], expNodes: [], answer: '', inExp: false };
        }

        const ansMatch = txt.match(/^Answer:\s*([A-D])/i);
        if (ansMatch) {
          currQ.answer = ansMatch[1].toUpperCase();
          currQ.inExp = true;
          currQ.expNodes.push(el.outerHTML);
        } else if (currQ.inExp) {
          currQ.expNodes.push(el.outerHTML);
        } else {
          currQ.stemNodes.push(el.outerHTML);
        }
      });
      if (currQ && currQ.stemNodes.length > 0) questions.push(currQ);

      if (questions.length === 0) {
        badge.textContent = '0 題';
        feed.innerHTML = `<div class="bio-q-card">未能從 <b>${labelName}</b> 識別出標準題目格式。</div>`;
        return;
      }

      badge.textContent = `共 ${questions.length} 題`;
      feed.innerHTML = questions
        .map(
          (q, idx) => `
          <div class="bio-q-card" data-ans="${q.answer}">
            <div class="bio-q-meta">
              <span>${q.code}</span>
              <span>第 ${idx + 1} / ${questions.length} 題</span>
            </div>
            <div class="bio-q-body">${q.stemNodes.join('')}</div>
            <div class="bio-ans-row">
              ${['A', 'B', 'C', 'D']
                .map(opt => `<button class="bio-opt-btn" data-opt="${opt}">${opt}</button>`)
                .join('')}
            </div>
            <div class="bio-exp-box">${q.expNodes.join('') || '（本題無附文字解析）'}</div>
          </div>
        `
        )
        .join('');

      feed.querySelectorAll('.bio-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('.bio-q-card');
          const correctAns = card.dataset.ans;
          const chosen = btn.dataset.opt;
          const expBox = card.querySelector('.bio-exp-box');

          card.querySelectorAll('.bio-opt-btn').forEach(b => {
            b.disabled = true;
            if (b.dataset.opt === correctAns) b.classList.add('correct');
          });
          if (correctAns && chosen !== correctAns) {
            btn.classList.add('wrong');
          }
          if (expBox) expBox.classList.add('open');
        });
      });
    } catch (err) {
      badge.textContent = '解析失敗';
      feed.innerHTML = `<div class="bio-q-card">解析檔案時發生錯誤：${err.message}</div>`;
    }
  }

  // ==========================================================================
  // 5. 左上角三段分區切換列 (Chem MC | Chem LQ | Bio)
  // ==========================================================================
  let currentSection = localStorage.getItem('dse_active_section') || 'chem_mc';

  function applySectionMode(sec) {
    if (!['chem_mc', 'chem_lq', 'bio'].includes(sec)) sec = 'chem_mc';
    currentSection = sec;
    localStorage.setItem('dse_active_section', currentSection);

    const chemMcRoot = document.getElementById('chemAppRootContainer');
    const chemLqRoot = document.getElementById('chemLqRootContainer');
    const bioRoot = document.getElementById('bioAppRootContainer');

    if (chemMcRoot) chemMcRoot.style.display = currentSection === 'chem_mc' ? '' : 'none';
    if (chemLqRoot) chemLqRoot.classList.toggle('active', currentSection === 'chem_lq');
    if (bioRoot) bioRoot.classList.toggle('active', currentSection === 'bio');

    document.querySelectorAll('#dseTopSectionBar .dse-sec-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.sec === currentSection);
    });

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function initTopLeftSectionBar() {
    injectUnifiedStyles();
    ensureChemLqWorkspace();
    ensureBioWorkspace();

    if (!document.getElementById('dseTopSectionBar')) {
      const bar = document.createElement('div');
      bar.id = 'dseTopSectionBar';
      bar.innerHTML = `
        <button type="button" class="dse-sec-pill" data-sec="chem_mc">Chem MC</button>
        <button type="button" class="dse-sec-pill" data-sec="chem_lq">Chem LQ</button>
        <button type="button" class="dse-sec-pill" data-sec="bio">Bio</button>
      `;
      bar.querySelectorAll('.dse-sec-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          applySectionMode(pill.dataset.sec);
        });
      });
      document.body.appendChild(bar);
    }

    applySectionMode(currentSection);
  }

  // ==========================================================================
  // 6. 版本號標籤 (v0.1.18)、禁用網頁放大、鎖定目錄開啟時背景滑動
  // ==========================================================================
  function initVersionBadge() {
    localStorage.setItem('chem_app_version', APP_VERSION);
    if (document.getElementById('chemVersionBadge')) return;
    const badge = document.createElement('div');
    badge.id = 'chemVersionBadge';
    badge.textContent = `v${APP_VERSION}`;
    badge.style.cssText = [
      'position: fixed',
      'left: 12px',
      'bottom: 12px',
      'z-index: 9998',
      'background: rgba(29, 31, 44, 0.72)',
      'color: #FFFFFF',
      'font-family: -apple-system, BlinkMacSystemFont, sans-serif',
      'font-size: 11px',
      'font-weight: 600',
      'padding: 4px 10px',
      'border-radius: 999px',
      'backdrop-filter: blur(6px)',
      '-webkit-backdrop-filter: blur(6px)',
      'user-select: none',
      'cursor: pointer'
    ].join(';');
    badge.addEventListener('click', () => {
      badge.textContent = `v${APP_VERSION} (最新)`;
      setTimeout(() => {
        badge.textContent = `v${APP_VERSION}`;
      }, 1400);
    });
    document.body.appendChild(badge);
  }

  function disablePageZoomAndLockMenuScroll() {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover'
    );

    if (!document.getElementById('chemLockV0118Style')) {
      const style = document.createElement('style');
      style.id = 'chemLockV0118Style';
      style.textContent = `
        html, body {
          touch-action: pan-x pan-y !important;
          overscroll-behavior: none !important;
        }
        * { touch-action: manipulation; }
        html.chem-dir-locked,
        body.chem-dir-locked,
        body.chem-dir-locked #chemAppRootContainer {
          overflow: hidden !important;
          overscroll-behavior: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    ['gesturestart', 'gesturechange', 'gestureend'].forEach(evt => {
      document.addEventListener(evt, e => e.preventDefault(), { passive: false });
    });

    let lastTouchEnd = 0;
    document.addEventListener(
      'touchend',
      e => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) e.preventDefault();
        lastTouchEnd = now;
      },
      { passive: false }
    );

    let isDirOpen = false;
    function detectDirectoryOpen() {
      const found = Array.from(document.querySelectorAll('div, aside, nav, dialog, section')).some(el => {
        if (
          el === document.body ||
          el === document.documentElement ||
          el.id === 'chemVersionBadge' ||
          el.id === 'dseTopSectionBar' ||
          el.id === 'chemLqRootContainer' ||
          el.id === 'bioAppRootContainer'
        ) {
          return false;
        }
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) return false;
        if (style.position !== 'fixed' && style.position !== 'absolute') return false;
        const txt = el.textContent || '';
        if (txt.includes('結束當前 MC') && el.getBoundingClientRect().width < 260) return false;
        const rect = el.getBoundingClientRect();
        return (
          (rect.width >= window.innerWidth * 0.85 && rect.height >= window.innerHeight * 0.85) ||
          (rect.width >= 200 && rect.height >= window.innerHeight * 0.35 && (parseInt(style.zIndex, 10) || 0) >= 10)
        );
      });

      if (found !== isDirOpen) {
        isDirOpen = found;
        document.documentElement.classList.toggle('chem-dir-locked', isDirOpen);
        document.body.classList.toggle('chem-dir-locked', isDirOpen);
      }
      return isDirOpen;
    }

    function findMenuScroller(target) {
      let el = target;
      const root = document.getElementById('chemAppRootContainer');
      while (el && el !== document.body && el !== document.documentElement && el !== root) {
        const oy = window.getComputedStyle(el).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) return el;
        el = el.parentElement;
      }
      return null;
    }

    let touchStartY = 0;
    document.addEventListener(
      'touchstart',
      e => {
        if (e.touches && e.touches.length === 1) touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    document.addEventListener(
      'touchmove',
      e => {
        if (e.touches && e.touches.length > 1) {
          e.preventDefault();
          return;
        }
        if (!detectDirectoryOpen()) return;
        const scroller = findMenuScroller(e.target);
        if (!scroller) {
          e.preventDefault();
          return;
        }
        const deltaY = e.touches[0].clientY - touchStartY;
        if (
          (scroller.scrollTop <= 0 && deltaY > 0) ||
          (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1 && deltaY < 0)
        ) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    document.addEventListener(
      'wheel',
      e => {
        if (e.ctrlKey) {
          e.preventDefault();
          return;
        }
        if (!detectDirectoryOpen()) return;
        const scroller = findMenuScroller(e.target);
        if (!scroller) e.preventDefault();
      },
      { passive: false }
    );

    const observer = new MutationObserver(() => detectDirectoryOpen());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden', 'open']
    });
  }

  function init() {
    initTopLeftSectionBar();
    initVersionBadge();
    disablePageZoomAndLockMenuScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


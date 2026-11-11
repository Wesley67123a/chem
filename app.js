// 1. 課程 65 章完整架構
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

// 全站總題目設定
const TOTAL_APP_QUESTIONS = 5309;

// 2. 全局狀態 (v0.0.46)
window.chemApp = {
  version: '0.0.46',
  currentLang: 'e',
  activeChapterId: null,
  questionsDB: {},
  chapterCounts: {},
  userAnswers: {},
  dashboardNodes: [],
  timerSeconds: 0,
  timerInterval: null,
  isTimerRunning: false,
  currentUser: null,
  currentStreak: 0
};

const CHAPTER_MAP = {};
SYLLABUS_CONFIG.forEach(t => t.chapters.forEach(c => { CHAPTER_MAP[c.id] = { topic: t, chapter: c }; }));

// 2.1 網頁音效系統
class SoundFX {
  static audioCtx = null;
  static getContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    return this.audioCtx;
  }
  static playClick(isCorrect = null) {
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
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (isCorrect === false) {
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(164.81, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {}
  }
}

// 2.2 儲存引擎
class ChemStorage {
  static dbPromise = null;
  static getDB() {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open('HKDSE_CHEM_QB_V46', 1);
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

  static loadMeta() {
    try {
      const counts = localStorage.getItem('CHEM_COUNTS_V46');
      if (counts) window.chemApp.chapterCounts = JSON.parse(counts);
      const ans = localStorage.getItem('CHEM_USER_ANS_V46');
      if (ans) window.chemApp.userAnswers = JSON.parse(ans);
      const savedLang = localStorage.getItem('CHEM_LANG_V46');
      if (savedLang === 'c' || savedLang === 'e') window.chemApp.currentLang = savedLang;
      const streak = localStorage.getItem('CHEM_STREAK_V46');
      if (streak) window.chemApp.currentStreak = parseInt(streak, 10);
    } catch (e) {}
  }

  static saveMeta() {
    try {
      localStorage.setItem('CHEM_COUNTS_V46', JSON.stringify(window.chemApp.chapterCounts));
      localStorage.setItem('CHEM_USER_ANS_V46', JSON.stringify(window.chemApp.userAnswers));
      localStorage.setItem('CHEM_LANG_V46', window.chemApp.currentLang);
      localStorage.setItem('CHEM_STREAK_V46', window.chemApp.currentStreak.toString());
    } catch (e) {}

    if (window.chemApp.currentUser && window.firebaseCloud) {
      window.firebaseCloud.syncToCloud(window.chemApp.currentUser.uid, window.chemApp.userAnswers, window.chemApp.chapterCounts, window.chemApp.currentStreak);
    }
    // 背景靜默更新儀表板，不強制切換畫面
    updateDashboardStats(false);
  }
}

// 3. 深度穿透式 DOM 切題引擎
class DocxQuestionParser {
  static cleanInlineNoise(htmlStr) {
    return htmlStr
      .replace(/[\u25A1\u2610\u25A0\u25AA\uF06F□☐■]/g, '')
      .replace(/©\s*\d{4}\s*Aristo Educational Press Ltd\.?/gi, '')
      .replace(/HKDSE NEW CHEMISTRY\s*[—\-–]\s*A Modern View/gi, '')
      .replace(/Multiple-choice questions/gi, '')
      .replace(/Question Bank/gi, '');
  }

  static isPureNoiseLine(text) {
    const t = text.replace(/\s+/g, ' ').trim();
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
      /^多項選擇題$/,
      /^[\u25A1\u2610\u25A0\u25AA\uF06F□☐■\s]*$/
    ];
    return patterns.some(p => p.test(t));
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
          blocks.push(node.cloneNode(true));
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
          if ((p.textContent || '').trim() || p.querySelector('img')) blocks.push(p);
        });
      } else {
        const p = node.cloneNode(true);
        p.innerHTML = cleanedHtml.trim();
        if ((p.textContent || '').trim() || p.querySelector('img') || tag === 'TABLE') blocks.push(p);
      }
    };
    Array.from(root.children).forEach(child => walk(child));
    return blocks;
  }

  static parseHtmlContent(rawHtml, chapId) {
    const tempRoot = document.createElement('div');
    tempRoot.innerHTML = rawHtml;

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
        const txt = (node.textContent || '').trim();
        const hasImg = node.querySelector && node.querySelector('img') !== null;
        const isTable = node.tagName && node.tagName.toUpperCase() === 'TABLE';

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
              node.style.cssText = 'padding-left: 24px; margin: 4px 0; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;';
            } else if (isTable) {
              node.style.cssText = 'border-collapse: collapse; margin: 12px 0; width: auto; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;';
            } else {
              node.style.cssText = 'margin: 6px 0; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;';
            }
          }
          stemDiv.appendChild(node);
        } else {
          if (txt.length > 0 || hasImg || isTable) {
            if (node.style) node.style.cssText = 'margin: 6px 0; line-height: 1.65; font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;';
            expDiv.appendChild(node);
          }
        }
      });

      const qDisplay = block.qCode || `Q${idx + 1}`;
      resultList.push({
        id: `${qDisplay}_ch${chapId}`,
        qNumDisplay: qDisplay,
        htmlContent: stemDiv.innerHTML,
        answer: answerLetter || 'A',
        explanationHtml: expDiv.innerHTML.trim()
      });
    });

    return resultList;
  }
}

// 4. DOCX 載入器
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

// 5. 計時器控制函數
function startTimer() {
  if (window.chemApp.isTimerRunning) return;
  window.chemApp.isTimerRunning = true;
  window.chemApp.timerInterval = setInterval(() => {
    window.chemApp.timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  window.chemApp.isTimerRunning = false;
  clearInterval(window.chemApp.timerInterval);
}

function resetTimer() {
  pauseTimer();
  window.chemApp.timerSeconds = 0;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const el = document.getElementById('chapterTimerDisplay');
  if (el) {
    const mins = String(Math.floor(window.chemApp.timerSeconds / 60)).padStart(2, '0');
    const secs = String(window.chemApp.timerSeconds % 60).padStart(2, '0');
    el.textContent = `${mins}:${secs}`;
  }
}

// 6. 視圖切換與全屏佈局控制
function switchRightPanelToChapterView() {
  let wrapper = document.getElementById('chemChapterViewWrapper');
  if (!wrapper) {
    let rightMain = document.querySelector('main') || document.body;
    window.chemApp.dashboardNodes = Array.from(rightMain.children);

    wrapper = document.createElement('div');
    wrapper.id = 'chemChapterViewWrapper';
    wrapper.style.cssText = 'width: 100%; max-width: 100%; margin: 0 auto; padding: 12px 6px 60px 6px; box-sizing: border-box;';

    wrapper.innerHTML = `
      <div id="chapterHeaderBar" style="display:flex; flex-wrap:nowrap; justify-content:space-between; align-items:center; gap:8px; background:#fff; padding:12px 16px; border-radius:20px; border:1px solid #e0e0e0; margin-bottom:14px; box-shadow:0 2px 8px rgba(0,0,0,0.04); overflow-x:auto;">
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:nowrap; white-space:nowrap;">
          <div>
            <h2 id="currentChapterTitle" style="margin:0; font-size:15px; color:#111; font-family:'Times New Roman', 'Noto Serif TC', serif;">請選擇章節</h2>
          </div>
          <div style="display:flex; align-items:center; gap:6px; background:#f8f9fa; padding:4px 10px; border-radius:20px; border:1px solid #dadce0; font-size:12px;">
            計時 <span id="chapterTimerDisplay" style="font-family:monospace; font-weight:bold; font-size:12px; color:#1a73e8;">00:00</span>
            <button id="timerToggleBtn" class="sound-trigger" style="border:none; background:#1a73e8; color:#fff; font-size:11px; padding:2px 8px; border-radius:10px; cursor:pointer;">開始</button>
            <button id="timerResetBtn" class="sound-trigger" style="border:none; background:#e0e0e0; color:#333; font-size:11px; padding:2px 8px; border-radius:10px; cursor:pointer;">重置</button>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:nowrap; white-space:nowrap;">
          <label style="padding:5px 10px; font-size:11px; border:1px solid #dadce0; border-radius:12px; background:#f8f9fa; cursor:pointer; color:#333; font-weight:bold;" class="sound-trigger">
            載入檔案
            <input type="file" id="manualDocxInput" accept=".docx" style="display:none;" />
          </label>
        </div>
      </div>
      <div id="questionList"></div>
    `;
    rightMain.insertBefore(wrapper, rightMain.firstChild);

    const tBtn = wrapper.querySelector('#timerToggleBtn');
    const rBtn = wrapper.querySelector('#timerResetBtn');
    tBtn.onclick = () => {
      SoundFX.playClick();
      if (window.chemApp.isTimerRunning) {
        pauseTimer();
        tBtn.textContent = '繼續';
        tBtn.style.background = '#34a853';
      } else {
        startTimer();
        tBtn.textContent = '暫停';
        tBtn.style.background = '#ea4335';
      }
    };
    rBtn.onclick = () => {
      SoundFX.playClick();
      resetTimer();
      tBtn.textContent = '開始';
      tBtn.style.background = '#1a73e8';
    };

    wrapper.querySelector('#manualDocxInput').onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file || !window.chemApp.activeChapterId) return;
      const chapId = window.chemApp.activeChapterId;
      const dbKey = `${window.chemApp.currentLang}_${chapId}`;
      const qContainer = wrapper.querySelector('#questionList');
      qContainer.innerHTML = `<div style="text-align:center; padding:48px; color:#1a73e8; font-weight:bold;">正在解析本機檔案 <code>${file.name}</code> ...</div>`;
      try {
        const buf = await file.arrayBuffer();
        const list = await DocxExtractor.extract(buf, chapId);
        window.chemApp.questionsDB[dbKey] = list;
        window.chemApp.chapterCounts[dbKey] = list.length;
        ChemStorage.saveMeta();
        await ChemStorage.saveChapter(dbKey, list);
        renderQuestions(list, chapId, true);
      } catch (err) {
        qContainer.innerHTML = `<div style="color:#e53935; padding:32px;">手動解析失敗：${err.message}</div>`;
      }
    };
  }

  window.chemApp.dashboardNodes.forEach(node => {
    if (node !== wrapper) node.style.display = 'none';
  });
  wrapper.style.display = 'block';

  // 顯示右下角控制按鈕群組
  const actionGrp = document.getElementById('floatingActionGroup');
  if (actionGrp) actionGrp.style.display = 'flex';
  const fStreak = document.getElementById('footerStreakBox');
  if (fStreak) fStreak.style.display = 'flex';
  const eBtn = document.getElementById('endChapterBtn');
  if (eBtn) eBtn.style.display = 'flex';

  return wrapper;
}

// 7. 開啟章節
async function openChapter(chapId) {
  window.chemApp.activeChapterId = chapId;
  const lookup = CHAPTER_MAP[chapId];
  if (!lookup) return;

  resetTimer();
  const tBtn = document.getElementById('timerToggleBtn');
  if (tBtn) {
    tBtn.textContent = '開始';
    tBtn.style.background = '#1a73e8';
  }

  const wrapper = switchRightPanelToChapterView();
  const titleEl = wrapper.querySelector('#currentChapterTitle');
  const container = wrapper.querySelector('#questionList');
  if (titleEl) titleEl.textContent = lookup.chapter.name;

  const dbKey = `${window.chemApp.currentLang}_${chapId}`;

  container.innerHTML = `
    <div style="text-align:center; padding:56px 20px; background:#fff; border-radius:20px; border:1px solid #e0e0e0; color:#555;">
      <div style="font-size:15px; font-weight:bold; color:#1a73e8; margin-bottom:8px;">正在從 GitHub 載入並解析題庫...</div>
    </div>
  `;

  if (window.chemApp.questionsDB[dbKey] && window.chemApp.questionsDB[dbKey].length > 0) {
    renderQuestions(window.chemApp.questionsDB[dbKey], chapId, true);
    return;
  }
  const cachedList = await ChemStorage.loadChapter(dbKey);
  if (cachedList && cachedList.length > 0) {
    window.chemApp.questionsDB[dbKey] = cachedList;
    window.chemApp.chapterCounts[dbKey] = cachedList.length;
    ChemStorage.saveMeta();
    renderQuestions(cachedList, chapId, true);
    return;
  }

  const pad = String(chapId).padStart(2, '0');
  const lang = window.chemApp.currentLang;
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
      <div style="text-align:center; padding:48px 24px; background:#fff; border-radius:20px; border:1px solid #ffcdd2; color:#c62828;">
        <div style="font-size:16px; font-weight:bold; margin-bottom:10px;">找不到遠端題庫檔案</div>
      </div>
    `;
    return;
  }

  try {
    const list = await DocxExtractor.extract(arrayBuffer, chapId);
    window.chemApp.questionsDB[dbKey] = list;
    window.chemApp.chapterCounts[dbKey] = list.length;
    ChemStorage.saveMeta();
    await ChemStorage.saveChapter(dbKey, list);
    renderQuestions(list, chapId, true);
  } catch (err) {
    container.innerHTML = `<div style="color:#e53935; padding:32px; background:#fff; border-radius:20px;">解析失敗：${err.message}</div>`;
  }
}

// 8. 渲染題目卡片
function renderQuestions(qList, chapId, resetState = true) {
  const wrapper = switchRightPanelToChapterView();
  const container = wrapper.querySelector('#questionList');

  container.innerHTML = '';

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.style.cssText = 'background:#fff; border-radius:20px; padding:20px 22px; margin-bottom:18px; box-shadow:0 2px 10px rgba(0,0,0,0.06); border:1px solid #e0e0e0; font-family:"Times New Roman", "Noto Serif TC", "PMingLiU", serif; box-sizing: border-box; width:100%;';

    const hasExplanation = q.explanationHtml && q.explanationHtml.length > 0;

    card.innerHTML = `
      <div class="q-header" style="margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f0f0f0; padding-bottom:8px;">
        <span class="q-number" style="color:#111; font-weight:bold; font-size:15px; font-family:Arial, sans-serif;">${q.qNumDisplay || `Q${index + 1}`}</span>
        <span style="font-size:12px; color:#888; font-family:sans-serif;">第 ${index + 1} / ${qList.length} 題</span>
      </div>
      <div class="q-native-body" style="line-height:1.7; font-size:16px; color:#111; overflow-x:auto; word-break:break-word; font-family:'Times New Roman', 'Noto Serif TC', 'PMingLiU', serif;">
        ${q.htmlContent}
      </div>
      <div class="interactive-action-bar" style="margin-top:16px; padding-top:12px; border-top:1px dashed #ddd; font-family:sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-weight:bold; color:#555; font-size:12px;">請選擇答案：</span>
          <button class="peek-ans-btn sound-trigger" style="border:none; background:transparent; color:#1a73e8; font-size:12px; cursor:pointer; padding:2px 6px; font-weight:bold;">顯示/隱藏解析</button>
        </div>
        <div class="options-btn-group" style="display:flex; gap:6px;">
          ${['A', 'B', 'C', 'D'].map(k => `
            <button class="opt-act-btn" data-opt="${k}" style="flex:1; padding:10px 2px; border:1px solid #1a73e8; border-radius:10px; background:#fff; color:#1a73e8; font-weight:bold; cursor:pointer; font-size:14px;">
              ${k}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="explanation-panel" style="display:none; margin-top:14px; padding:12px 14px; background:#f8fafd; border-left:4px solid #1a73e8; border-radius:6px; font-family:'Times New Roman', 'Noto Serif TC', serif;">
        <div class="exp-title" style="font-weight:bold; color:#1a73e8; font-size:14px; font-family:Arial, sans-serif; margin-bottom:${hasExplanation ? '6px' : '0'};">
          Answer: ${q.answer}
        </div>
        ${hasExplanation
          ? `<div class="exp-body" style="font-size:14px; color:#111; line-height:1.65; word-break:break-word;">${q.explanationHtml}</div>`
          : `<div style="font-size:12px; color:#888; font-family:sans-serif; margin-top:4px;">（本題原檔無附帶文字解析）</div>`
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

    // 終極防護：徹底移除殘留空節點與無用方塊符號
    card.querySelectorAll('p, div, span, table, td, tr').forEach(el => {
      const txt = (el.textContent || '').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
      if (/^[□☐■\u25A1\u2610\u25A0\u25AA\uF06F]+$/.test(txt) || (txt === '' && el.children.length === 0)) {
        if (!el.querySelector('img')) el.remove();
      }
    });

    const optBtns = card.querySelectorAll('.opt-act-btn');
    const expPanel = card.querySelector('.explanation-panel');
    const peekBtn = card.querySelector('.peek-ans-btn');

    const applyAnswerUI = (selectedOpt, playSound = false) => {
      const isCorrect = (selectedOpt === q.answer);
      if (playSound) SoundFX.playClick(isCorrect);

      optBtns.forEach(b => {
        b.style.background = '#fff';
        b.style.color = '#1a73e8';
        b.style.borderColor = '#1a73e8';
        if (b.dataset.opt === q.answer) {
          b.style.background = '#34a853';
          b.style.color = '#fff';
          b.style.borderColor = '#34a853';
        } else if (selectedOpt && b.dataset.opt === selectedOpt && selectedOpt !== q.answer) {
          b.style.background = '#ea4335';
          b.style.color = '#fff';
          b.style.borderColor = '#ea4335';
        }
      });
      expPanel.style.display = 'block';
    };

    if (!resetState) {
      const savedRecord = window.chemApp.userAnswers[q.id];
      if (savedRecord) {
        const chosen = typeof savedRecord === 'string' ? savedRecord : savedRecord.chosen;
        if (chosen) applyAnswerUI(chosen, false);
      }
    }

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.dataset.opt;
        const isCorrect = (chosen === q.answer);
        const today = new Date().toISOString().slice(0, 10);
        
        const existing = window.chemApp.userAnswers[q.id];
        
        if (!existing) {
          if (isCorrect) window.chemApp.currentStreak++;
          else window.chemApp.currentStreak = 0;
        } else {
          const wasCorrect = typeof existing === 'object' ? existing.correct : false;
          if (wasCorrect !== isCorrect) {
            if (isCorrect) window.chemApp.currentStreak++;
            else window.chemApp.currentStreak = 0;
          }
        }

        window.chemApp.userAnswers[q.id] = { chosen: chosen, correct: isCorrect, date: today };
        ChemStorage.saveMeta();

        const footerStreak = document.getElementById('footerStreakCount');
        if (footerStreak) footerStreak.textContent = window.chemApp.currentStreak;

        applyAnswerUI(chosen, true);
      });
    });

    peekBtn.addEventListener('click', () => {
      SoundFX.playClick();
      const isHidden = expPanel.style.display === 'none';
      expPanel.style.display = isHidden ? 'block' : 'none';
    });

    container.appendChild(card);
  });
}

// 9. 首頁大改版 (顯示每日清單與總覽，不會跳轉離開作答區)
function updateDashboardStats(forceDisplay = false) {
  const rightMain = document.querySelector('main') || document.body;
  
  if (forceDisplay) {
    const wrapper = document.getElementById('chemChapterViewWrapper');
    if (wrapper) wrapper.style.display = 'none';
    const actionGroup = document.getElementById('floatingActionGroup');
    if (actionGroup) {
      const fStreak = actionGroup.querySelector('#footerStreakBox');
      const eBtn = actionGroup.querySelector('#endChapterBtn');
      if(fStreak) fStreak.style.display = 'none';
      if(eBtn) eBtn.style.display = 'none';
    }

    Array.from(rightMain.children).forEach(child => {
      if (child.id !== 'chemChapterViewWrapper' && child.id !== 'inlineConfirmModal' && child.id !== 'floatingActionGroup' && child.tagName !== 'SCRIPT') {
        child.style.display = 'none';
      }
    });
  }

  let dashboardEl = document.getElementById('chemDashboardHome');
  if (!dashboardEl) {
    dashboardEl = document.createElement('div');
    dashboardEl.id = 'chemDashboardHome';
    dashboardEl.style.cssText = 'width:100%; max-width:600px; margin:0 auto; padding:16px; box-sizing:border-box; font-family:sans-serif; margin-top:10px;';
    rightMain.appendChild(dashboardEl);
  }
  if (forceDisplay) dashboardEl.style.display = 'block';

  const recordsArr = Object.values(window.chemApp.userAnswers).map(v => typeof v === 'string' ? { chosen: v, correct: false, date: '' } : v);
  
  let recentTopicName = "尚未選擇課題";
  let curChapAns = 0;
  let curChapCorrect = 0;
  let curChapWrong = 0;

  if (window.chemApp.activeChapterId && CHAPTER_MAP[window.chemApp.activeChapterId]) {
    const chInfo = CHAPTER_MAP[window.chemApp.activeChapterId];
    recentTopicName = `${chInfo.topic.topicName.replace('topic / chapter: ', '')} - ${chInfo.chapter.name}`;
    const chapRecords = Object.entries(window.chemApp.userAnswers)
      .filter(([id, _]) => id.endsWith(`_ch${window.chemApp.activeChapterId}`))
      .map(([_, v]) => v);
      
    curChapAns = chapRecords.length;
    curChapCorrect = chapRecords.filter(r => r.correct).length;
    curChapWrong = chapRecords.filter(r => !r.correct).length;
  }
  
  const todayStr = new Date().toISOString().slice(0, 10);
  
  const dateMap = {};
  recordsArr.forEach(r => {
    if (r.date) dateMap[r.date] = (dateMap[r.date] || 0) + 1;
  });
  const sortedDates = Object.keys(dateMap).sort().reverse();
  
  const dailyListHtml = sortedDates.length === 0 
    ? `<div style="font-size:13px; color:#888;">尚無作答記錄，快去開始練習吧！</div>`
    : sortedDates.map(d => `
      <div class="daily-record-item sound-trigger" data-date="${d}" style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:#fff; border-radius:12px; margin-bottom:8px; border:1px solid #eee; cursor:pointer;">
        <span style="font-weight:bold; color:#333; font-size:14px;">${d}</span>
        <span style="color:#1a73e8; font-weight:bold; font-size:14px;">答了: ${dateMap[d]} 題 <span style="font-size:10px; color:#888;">(點擊查看)</span></span>
      </div>
    `).join('');

  const userIdDisplay = window.chemApp.currentUser 
    ? window.chemApp.currentUser.email.split('@')[0].toUpperCase() 
    : "GUEST";

  const totalPct = Math.round((recordsArr.length / TOTAL_APP_QUESTIONS) * 100);
  const curChapRate = curChapAns > 0 ? Math.round((curChapCorrect / curChapAns) * 100) : 0;

  dashboardEl.innerHTML = `
    <!-- 頂部大圓角導覽列 -->
    <div style="background:#fff; border:1px solid #e0e0e0; border-radius:24px; padding:12px 20px; margin-bottom:24px; box-shadow:0 4px 12px rgba(0,0,0,0.05); display:flex; justify-content:space-between; align-items:center; flex-wrap:nowrap; white-space:nowrap;">
      <h1 style="margin:0; font-size:18px; color:#1a73e8; font-weight:bold; font-style:italic;">CHEM QB</h1>
      <span style="font-weight:bold; color:#555; font-size:13px;">${todayStr}</span>
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:12px; font-weight:bold; color:#333;">USER: [ ${userIdDisplay} ]</span>
        <button id="homeLogoutBtn" class="sound-trigger" style="background:#fff; border:1px solid #ea4335; color:#ea4335; padding:4px 8px; border-radius:8px; font-weight:bold; font-size:11px; cursor:pointer;">登出</button>
      </div>
    </div>

    <!-- Recent Topic 區塊 -->
    <div style="background:#fff; border:2px solid #e0e0e0; border-radius:20px; padding:18px; margin-bottom:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
      <div style="font-size:13px; color:#e67c73; font-weight:bold; margin-bottom:6px;">Recent topic / Chapter</div>
      <div style="font-size:15px; font-weight:bold; color:#111; margin-bottom:16px;">${recentTopicName}</div>
      
      <div style="display:flex; justify-content:space-between; gap:8px; text-align:center;">
        <div style="flex:1;">
          <div style="font-size:12px; color:#888; font-weight:bold;">已答題數</div>
          <div style="font-size:18px; font-weight:bold; color:#1a73e8; margin-top:4px;">${curChapAns}</div>
        </div>
        <div style="flex:1;">
          <div style="font-size:12px; color:#888; font-weight:bold;">答對題數</div>
          <div style="font-size:18px; font-weight:bold; color:#34a853; margin-top:4px;">${curChapCorrect}</div>
        </div>
        <div style="flex:1;">
          <div style="font-size:12px; color:#888; font-weight:bold;">答錯題數</div>
          <div style="font-size:18px; font-weight:bold; color:#ea4335; margin-top:4px;">${curChapWrong}</div>
        </div>
        <div style="flex:1;">
          <div style="font-size:12px; color:#888; font-weight:bold;">完成率</div>
          <div style="font-size:18px; font-weight:bold; color:#fbbc05; margin-top:4px;">${curChapRate}%</div>
        </div>
      </div>
    </div>

    <!-- 每日練習記錄 -->
    <div style="background:#f8f9fa; border:2px solid #e0e0e0; border-radius:20px; padding:18px; margin-bottom:20px;">
      <h3 style="margin:0 0 12px 0; font-size:15px; color:#333;">每日練習記錄</h3>
      <div style="max-height:180px; overflow-y:auto; padding-right:4px;">
        ${dailyListHtml}
      </div>
    </div>

    <!-- 語言切換卡片 -->
    <div style="background:#fff; border:2px solid #e0e0e0; border-radius:20px; padding:16px 20px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
      <span style="font-weight:bold; font-size:14px; color:#333;">MC 語言 (Stay tuned)</span>
      <div style="display:flex; background:#f1f3f4; border-radius:20px; padding:4px;">
        <button id="langEnBtn" class="sound-trigger" style="border:none; background:${window.chemApp.currentLang === 'e' ? '#1a73e8' : 'transparent'}; color:${window.chemApp.currentLang === 'e' ? '#fff' : '#555'}; font-weight:bold; padding:6px 12px; border-radius:16px; font-size:13px; cursor:pointer;">英</button>
        <button id="langZhBtn" class="sound-trigger" style="border:none; background:${window.chemApp.currentLang === 'c' ? '#1a73e8' : 'transparent'}; color:${window.chemApp.currentLang === 'c' ? '#fff' : '#555'}; font-weight:bold; padding:6px 12px; border-radius:16px; font-size:13px; cursor:pointer;">中</button>
      </div>
    </div>

    <!-- 總覽統計卡片 (總題數固定為 5309) -->
    <div style="background:#fff; border:2px solid #e0e0e0; border-radius:20px; padding:20px; text-align:center; display:flex; justify-content:space-around; align-items:center;">
      <div>
        <div style="font-size:12px; color:#e67c73; font-weight:bold;">總 Topic</div>
        <div style="font-size:24px; font-weight:bold; color:#333;">15</div>
      </div>
      <div>
        <div style="font-size:12px; color:#e67c73; font-weight:bold;">總題目</div>
        <div style="font-size:24px; font-weight:bold; color:#333;">${TOTAL_APP_QUESTIONS}</div>
      </div>
      <div>
        <div style="font-size:12px; color:#e67c73; font-weight:bold;">整體完成度</div>
        <div style="font-size:24px; font-weight:bold; color:#1a73e8;">${totalPct}%</div>
      </div>
    </div>
  `;

  dashboardEl.querySelectorAll('.daily-record-item').forEach(item => {
    item.onclick = (e) => {
      SoundFX.playClick();
      const date = e.currentTarget.getAttribute('data-date');
      
      const dayRecords = Object.entries(window.chemApp.userAnswers)
        .filter(([_, v]) => v.date === date)
        .map(([id, v]) => {
          const match = id.match(/_ch(\d+)$/);
          const chId = match ? parseInt(match[1]) : 0;
          const qName = id.split('_ch')[0];
          return { qName, chId, chosen: v.chosen, correct: v.correct };
        });

      let recHtml = dayRecords.map(r => `
        <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f0f0f0; font-size:13px;">
          <span style="font-weight:bold; color:#555;">Ch.${r.chId} - ${r.qName}</span>
          <span>選 <b style="color:#1a73e8;">${r.chosen}</b> ${r.correct ? '✅' : '❌'}</span>
        </div>
      `).join('');

      let recModal = document.getElementById('dailyRecordModal');
      if (!recModal) {
        recModal = document.createElement('div');
        recModal.id = 'dailyRecordModal';
        recModal.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); z-index:99999; display:none; justify-content:center; align-items:center; padding:20px; box-sizing:border-box;';
        document.body.appendChild(recModal);
      }
      
      recModal.innerHTML = `
        <div style="background:#fff; width:100%; max-width:400px; max-height:70vh; border-radius:24px; box-shadow:0 12px 40px rgba(0,0,0,0.2); display:flex; flex-direction:column; overflow:hidden; padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 style="margin:0; font-size:16px; color:#1a73e8;">${date} 練習記錄</h3>
            <button id="closeDailyRecBtn" class="sound-trigger" style="background:transparent; border:none; font-size:20px; cursor:pointer;">&times;</button>
          </div>
          <div style="overflow-y:auto; flex:1;">
            ${recHtml}
          </div>
        </div>
      `;
      recModal.style.display = 'flex';
      recModal.querySelector('#closeDailyRecBtn').onclick = () => {
        SoundFX.playClick();
        recModal.style.display = 'none';
      };
    };
  });

  dashboardEl.querySelector('#homeLogoutBtn').onclick = async () => {
    SoundFX.playClick();
    const { getAuth, signOut } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
    const auth = getAuth();
    signOut(auth);
  };

  dashboardEl.querySelector('#langEnBtn').onclick = () => {
    SoundFX.playClick();
    window.chemApp.currentLang = 'e';
    ChemStorage.saveMeta();
    updateDashboardStats(true);
  };
  dashboardEl.querySelector('#langZhBtn').onclick = () => {
    SoundFX.playClick();
    window.chemApp.currentLang = 'c';
    ChemStorage.saveMeta();
    updateDashboardStats(true);
  };
}

// 10. 大圓角置中懸浮目錄 Modal
function renderCenterDirectoryModal() {
  let modal = document.getElementById('centerDirectoryModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'centerDirectoryModal';
    modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); z-index:99999; justify-content:center; align-items:center; padding:20px; box-sizing:border-box;';
    document.body.appendChild(modal);
  }

  let contentHtml = `
    <div style="background:#fff; width:100%; max-width:400px; height:80vh; max-height:600px; border-radius:28px; box-shadow:0 12px 40px rgba(0,0,0,0.2); display:flex; flex-direction:column; overflow:hidden;">
      <div style="padding:18px 24px; background:#1a73e8; color:#fff; display:flex; justify-content:space-between; align-items:center;">
        <h2 style="margin:0; font-size:18px;">選擇 Topic / Chapter</h2>
        <button id="closeDirModalBtn" class="sound-trigger" style="background:transparent; border:none; color:#fff; font-size:24px; cursor:pointer; line-height:1;">&times;</button>
      </div>
      <div style="flex:1; overflow-y:auto; padding:16px 20px; background:#f4f6f9;">
  `;

  SYLLABUS_CONFIG.forEach(topic => {
    const topicNameClean = topic.topicName.replace('topic / chapter: ', '');
    contentHtml += `
      <div style="background:#fff; border-radius:16px; margin-bottom:12px; border:1px solid #e0e0e0; overflow:hidden;">
        <div class="dir-topic-header sound-trigger" style="padding:14px 16px; background:#fafafa; font-weight:bold; font-size:14px; color:#333; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          ${topicNameClean} <span style="font-size:12px; color:#888;">▼</span>
        </div>
        <div class="dir-chapter-list" style="display:none; flex-direction:column;">
    `;
    topic.chapters.forEach(ch => {
      contentHtml += `
          <div class="dir-chapter-item sound-trigger" data-chid="${ch.id}" style="padding:12px 16px 12px 24px; border-top:1px solid #f0f0f0; font-size:13px; color:#555; cursor:pointer; display:flex; justify-content:space-between;">
            <span>${ch.name}</span>
            <span style="color:#1a73e8; font-weight:bold;">進入</span>
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

  modal.querySelectorAll('.dir-topic-header').forEach(header => {
    header.onclick = (e) => {
      SoundFX.playClick();
      const list = e.currentTarget.nextElementSibling;
      const arrow = e.currentTarget.querySelector('span');
      const isHidden = (list.style.display === 'none');
      list.style.display = isHidden ? 'flex' : 'none';
      arrow.textContent = isHidden ? '▼' : '▶';
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

// 11. 初始化與全域事件綁定
document.addEventListener('DOMContentLoaded', () => {
  ChemStorage.loadMeta();
  renderCenterDirectoryModal();

  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .sound-trigger, input[type="file"], .dir-topic-header, .dir-chapter-item, .daily-record-item');
    if (target && !target.id.includes('timerToggleBtn') && !target.id.includes('timerResetBtn') && !target.classList.contains('opt-act-btn') && !target.classList.contains('peek-ans-btn')) {
      SoundFX.playClick();
    }
  });

  const validateStudentId = (idStr) => {
    const cleaned = idStr.trim().toLowerCase();
    const regex = /^5([abcd])([1-9]|[1-2][0-9]|3[0-5])$/;
    return regex.test(cleaned);
  };

  const loadFirebaseSDK = async () => {
    try {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
      const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
      const { getFirestore, doc, setDoc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

      const firebaseConfig = {
        apiKey: "AIzaSyDzNzFelR1DLNgVcK-u3_U2s_zmtIrxu1w",
        authDomain: "chem-b49bf.firebaseapp.com",
        projectId: "chem-b49bf",
        storageBucket: "chem-b49bf.firebasestorage.app",
        messagingSenderId: "702426481564",
        appId: "1:702426481564:web:987522a34c6c4e54d6fe59"
      };

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore(app);

      window.firebaseCloud = {
        async syncToCloud(uid, answers, counts, streak) {
          try {
            await setDoc(doc(db, "users_progress", uid), {
              answers: answers,
              counts: counts,
              streak: streak,
              lastUpdated: new Date().toISOString()
            }, { merge: true });
          } catch (e) {}
        }
      };

      let authOverlay = document.getElementById('chemAuthOverlay');
      if (!authOverlay) {
        authOverlay = document.createElement('div');
        authOverlay.id = 'chemAuthOverlay';
        authOverlay.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:#f4f6f9; z-index:99999; display:flex; justify-content:center; align-items:center; font-family:sans-serif;';
        
        authOverlay.innerHTML = `
          <div style="background:#fff; padding:32px 40px; border-radius:24px; box-shadow:0 8px 30px rgba(0,0,0,0.12); width:100%; max-width:400px; text-align:center; border:1px solid #e0e0e0;">
            <h2 style="margin-bottom:8px; color:#1a73e8; font-size:22px; font-weight:bold; font-style:italic;">CHEM QB</h2>
            <p style="font-size:13px; color:#666; margin-bottom:24px;">請登入或註冊您的學生 ID (格式如: 5a1, 5b35)</p>
            
            <div style="display:flex; flex-direction:column; gap:14px; text-align:left;">
              <div>
                <label style="font-size:12px; font-weight:bold; color:#333; display:block; margin-bottom:4px;">用戶 ID (5a/b/c/d + 1~35)</label>
                <input type="text" id="customUserIdInput" placeholder="例如: 5a12" style="width:100%; padding:10px 14px; border:1px solid #ccc; border-radius:10px; font-size:14px; box-sizing:border-box;" />
              </div>
              <div>
                <label style="font-size:12px; font-weight:bold; color:#333; display:block; margin-bottom:4px;">密碼 (沒有限制)</label>
                <input type="password" id="customUserPassInput" placeholder="輸入密碼" style="width:100%; padding:10px 14px; border:1px solid #ccc; border-radius:10px; font-size:14px; box-sizing:border-box;" />
              </div>
              <div id="confirmPassGroup" style="display:none;">
                <label style="font-size:12px; font-weight:bold; color:#333; display:block; margin-bottom:4px;">確認密碼 (雙重驗證)</label>
                <input type="password" id="customUserPassConfirmInput" placeholder="再次輸入密碼" style="width:100%; padding:10px 14px; border:1px solid #ccc; border-radius:10px; font-size:14px; box-sizing:border-box;" />
              </div>

              <div style="display:flex; gap:10px; margin-top:6px;">
                <button id="mainLoginBtn" class="sound-trigger" style="flex:1; background:#1a73e8; color:#fff; border:none; padding:12px; border-radius:12px; font-weight:bold; font-size:14px; cursor:pointer;">登入</button>
                <button id="mainToggleRegBtn" class="sound-trigger" style="flex:1; background:#f1f3f4; color:#1a73e8; border:1px solid #1a73e8; padding:12px; border-radius:12px; font-weight:bold; font-size:14px; cursor:pointer;">切換註冊</button>
              </div>
            </div>
            <div id="authErrorMsg" style="color:#ea4335; font-size:12px; margin-top:14px; font-weight:bold; min-height:16px;"></div>
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
            loginBtn.style.background = '#34a853';
            toggleRegBtn.textContent = '返回登入';
          } else {
            confirmGroup.style.display = 'none';
            loginBtn.textContent = '登入';
            loginBtn.style.background = '#1a73e8';
            toggleRegBtn.textContent = '切換註冊';
          }
          errMsg.textContent = '';
        };

        loginBtn.onclick = async () => {
          SoundFX.playClick();
          const rawId = idInput.value.trim().toLowerCase();
          const pass = passInput.value;

          if (!validateStudentId(rawId)) {
            errMsg.textContent = '格式錯誤！用戶 ID 必須是 5a、5b、5c 或 5d 開頭，後面接 1 到 35 的數字。';
            return;
          }

          const syntheticEmail = `${rawId}@dsechem.edu`;

          if (isRegisterMode) {
            const confirmPass = confirmPassInput.value;
            if (pass !== confirmPass) {
              errMsg.textContent = '兩次輸入的密碼不一致，雙重驗證失敗！';
              return;
            }
            try {
              await createUserWithEmailAndPassword(auth, syntheticEmail, pass);
            } catch (e) {
              errMsg.textContent = '註冊失敗：' + e.message;
            }
          } else {
            try {
              await signInWithEmailAndPassword(auth, syntheticEmail, pass);
            } catch (e) {
              errMsg.textContent = '登入失敗：ID 或密碼不正確。';
            }
          }
        };
      }

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          window.chemApp.currentUser = user;
          authOverlay.style.display = 'none';

          try {
            const docSnap = await getDoc(doc(db, "users_progress", user.uid));
            if (docSnap.exists()) {
              const data = docSnap.data();
              if (data.answers) window.chemApp.userAnswers = data.answers;
              if (data.counts) window.chemApp.chapterCounts = data.counts;
              if (data.streak !== undefined) window.chemApp.currentStreak = data.streak;
              ChemStorage.saveMeta();
            }
          } catch (e) {}

          updateDashboardStats(true); 
          
          // 右下角懸浮操作區 (Streak & 按鈕 統一高度對齊)
          const floatGroup = document.getElementById('floatingActionGroup');
          if (!floatGroup) {
            const grp = document.createElement('div');
            grp.id = 'floatingActionGroup';
            grp.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:9998; display:flex; flex-direction:column; gap:10px; align-items:flex-end;';
            grp.innerHTML = `
              <div id="footerStreakBox" style="display:none; background:#e8f0fe; padding:0 16px; border-radius:20px; border:1px solid #aecbfa; font-size:13px; font-weight:bold; color:#1a73e8; box-shadow:0 4px 14px rgba(0,0,0,0.15); align-items:center; justify-content:center; height:40px; box-sizing:border-box;">
                Streak: <span id="footerStreakCount" style="margin-left:4px;">${window.chemApp.currentStreak}</span>
              </div>
              <button id="endChapterBtn" class="sound-trigger" style="display:none; background:#ea4335; color:#fff; border:none; padding:0 16px; border-radius:20px; font-weight:bold; font-size:13px; box-shadow:0 4px 14px rgba(0,0,0,0.25); cursor:pointer; height:40px; box-sizing:border-box; align-items:center; justify-content:center;">結束當前 MC</button>
              <button id="mobileToggleSidebarBtn" class="sound-trigger" style="display:flex; background:#1a73e8; color:#fff; border:none; padding:0 16px; border-radius:20px; font-weight:bold; font-size:13px; box-shadow:0 4px 14px rgba(0,0,0,0.25); cursor:pointer; height:40px; box-sizing:border-box; align-items:center; justify-content:center;">目錄選單</button>
            `;
            document.body.appendChild(grp);

            grp.querySelector('#mobileToggleSidebarBtn').onclick = () => {
              SoundFX.playClick();
              const m = document.getElementById('centerDirectoryModal');
              if (m) m.style.display = 'flex';
            };
            
            // 全域榜定確認按鈕邏輯
            let endClickCount = 0;
            let endTimer = null;
            const modal = document.getElementById('inlineConfirmModal');
            if(modal) {
               const modalText = document.getElementById('confirmModalText');
               const yesBtn = document.getElementById('confirmYesBtn');
               const noBtn = document.getElementById('confirmNoBtn');

               grp.querySelector('#endChapterBtn').onclick = () => {
                 SoundFX.playClick();
                 endClickCount++;
                 if (endClickCount === 1) {
                   modalText.textContent = "確定要結束當前 MC 練習嗎？請再按一次確認（是 / 否）";
                   modal.style.display = 'flex';
                   endTimer = setTimeout(() => { endClickCount = 0; modal.style.display = 'none'; }, 6000);
                 } else if (endClickCount >= 2) {
                   clearTimeout(endTimer);
                   endClickCount = 0;
                   modal.style.display = 'none';
                   pauseTimer();
                   const wrapper = document.getElementById('chemChapterViewWrapper');
                   if(wrapper) wrapper.style.display = 'none';
                   updateDashboardStats(true);
                 }
               };

               yesBtn.onclick = () => {
                 SoundFX.playClick();
                 clearTimeout(endTimer);
                 endClickCount = 0;
                 modal.style.display = 'none';
                 pauseTimer();
                 const wrapper = document.getElementById('chemChapterViewWrapper');
                 if(wrapper) wrapper.style.display = 'none';
                 updateDashboardStats(true);
               };

               noBtn.onclick = () => {
                 SoundFX.playClick();
                 clearTimeout(endTimer);
                 endClickCount = 0;
                 modal.style.display = 'none';
               };
            }
          } else {
            floatGroup.style.display = 'flex';
            const fStreak = floatGroup.querySelector('#footerStreakBox');
            const eBtn = floatGroup.querySelector('#endChapterBtn');
            if (fStreak) fStreak.style.display = 'none';
            if (eBtn) eBtn.style.display = 'none';
          }

        } else {
          window.chemApp.currentUser = null;
          authOverlay.style.display = 'flex';
          const fg = document.getElementById('floatingActionGroup');
          if (fg) fg.style.display = 'none';
        }
      });
    } catch (e) {}
  };

  // 確保全域有確認彈窗的 HTML
  if (!document.getElementById('inlineConfirmModal')) {
    const confirmModalHTML = `
      <div id="inlineConfirmModal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.4); z-index:99999; justify-content:center; align-items:center;">
        <div style="background:#fff; padding:24px 28px; border-radius:28px; width:90%; max-width:320px; text-align:center; box-shadow:0 8px 30px rgba(0,0,0,0.2); border:1px solid #e0e0e0;">
          <p id="confirmModalText" style="font-size:15px; font-weight:bold; color:#111; margin-bottom:20px; line-height:1.5;">確定要結束當前 MC 練習嗎？</p>
          <div style="display:flex; gap:12px;">
            <button id="confirmYesBtn" class="sound-trigger" style="flex:1; background:#ea4335; color:#fff; border:none; padding:10px; border-radius:12px; font-weight:bold; font-size:14px; cursor:pointer;">是</button>
            <button id="confirmNoBtn" class="sound-trigger" style="flex:1; background:#f1f3f4; color:#333; border:1px solid #ccc; padding:10px; border-radius:12px; font-weight:bold; font-size:14px; cursor:pointer;">否</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', confirmModalHTML);
  }

  loadFirebaseSDK();

  const mainHeader = document.querySelector('header') || document.querySelector('.header') || document.querySelector('.top-nav');
  if (mainHeader) mainHeader.remove();
  
  const sidebar = document.querySelector('aside') || document.querySelector('.sidebar') || document.querySelector('#sidebar') || document.querySelector('.left-panel');
  if (sidebar) sidebar.remove();
});

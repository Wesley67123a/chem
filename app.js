/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Main UI & Question Engine (app.js)
 * Version: 0.0.47 (Paired with userlog.js v1.0.0)
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

// 暴露給 userlog.js 取用
window.SYLLABUS_CONFIG = SYLLABUS_CONFIG;
window.CHAPTER_MAP = CHAPTER_MAP;

// 2. 全局 UI 狀態 (v0.0.47)
window.chemApp = {
  version: '0.0.47',
  currentLang: localStorage.getItem('CHEM_LANG_V47') || 'e',
  activeChapterId: null,
  currentView: 'home', // 'home' | 'chapter'
  questionsDB: {},
  chapterCounts: {},
  timerSeconds: 0,
  timerInterval: null,
  isTimerRunning: false
};

// Firebase 設定檔
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDzNzFelR1DLNgVcK-u3_U2s_zmtIrxu1w",
  authDomain: "chem-b49bf.firebaseapp.com",
  projectId: "chem-b49bf",
  storageBucket: "chem-b49bf.firebasestorage.app",
  messagingSenderId: "702426481564",
  appId: "1:702426481564:web:987522a34c6c4e54d6fe59",
  measurementId: "G-9EB0718DGR"
};

// 3. 網頁音效系統 (Web Audio API)
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

// 4. IndexedDB 題庫快取引擎 (專責儲存解析後的 DOCX 題目內容)
class ChemChapterCache {
  static dbPromise = null;
  static getDB() {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open('HKDSE_CHEM_QB_CACHE_V47', 1);
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

// 5. 深度穿透式 DOM 切題引擎 (含終極灰色方塊拔除過濾器)
class DocxQuestionParser {
  static cleanInlineNoise(htmlStr) {
    return htmlStr
      // 徹底移除所有萬國碼方塊、核取方塊、灰黑方塊字元
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
    // 移除所有空標籤、灰色色塊 span/div、或只含空白符號的節點
    rootEl.querySelectorAll('span, div, p, td, th, font, s, u, b, i').forEach(el => {
      const hasImg = el.querySelector && el.querySelector('img') !== null;
      if (hasImg) return;

      // 移除 Word 轉出時常見的灰底色塊樣式
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

    // 若圖片本身是 Word 內建極小的灰色核取方塊圖示 (例如寬高小於 22px 的單色方塊)，予以過濾
    rootEl.querySelectorAll('img').forEach(img => {
      const w = parseInt(img.getAttribute('width') || '0', 10);
      const h = parseInt(img.getAttribute('height') || '0', 10);
      if ((w > 0 && w <= 18 && h > 0 && h <= 18)) {
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
        htmlContent: stemDiv.innerHTML,
        answer: answerLetter || 'A',
        explanationHtml: expDiv.innerHTML.trim()
      });
    });

    return resultList;
  }
}

// 6. DOCX 載入器
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

// 7. 計時器控制函數
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

// 8. 右下角懸浮按鈕組 (Streak、結束當前 MC、目錄選單 — 高度 40px 與間距 10px 完全一致，無 Emoji)
function ensureFloatingActionGroup() {
  let grp = document.getElementById('floatingActionGroup');
  if (!grp) {
    grp = document.createElement('div');
    grp.id = 'floatingActionGroup';
    grp.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:9998; display:none; flex-direction:column; gap:10px; align-items:flex-end; font-family:sans-serif;';
    grp.innerHTML = `
      <div id="footerStreakBox" style="display:none; background:#e8f0fe; padding:0 18px; border-radius:20px; border:1px solid #aecbfa; font-size:13px; font-weight:bold; color:#1a73e8; box-shadow:0 4px 14px rgba(0,0,0,0.15); height:40px; min-width:116px; box-sizing:border-box; align-items:center; justify-content:center; white-space:nowrap;">
        Streak: <span id="footerStreakCount" style="margin-left:5px;">0</span>
      </div>
      <button id="endChapterBtn" class="sound-trigger" style="display:none; background:#ea4335; color:#fff; border:none; padding:0 18px; border-radius:20px; font-weight:bold; font-size:13px; box-shadow:0 4px 14px rgba(0,0,0,0.22); cursor:pointer; height:40px; min-width:116px; box-sizing:border-box; align-items:center; justify-content:center; white-space:nowrap;">
        結束當前 MC
      </button>
      <button id="mobileToggleSidebarBtn" class="sound-trigger" style="display:flex; background:#1a73e8; color:#fff; border:none; padding:0 18px; border-radius:20px; font-weight:bold; font-size:13px; box-shadow:0 4px 14px rgba(0,0,0,0.22); cursor:pointer; height:40px; min-width:116px; box-sizing:border-box; align-items:center; justify-content:center; white-space:nowrap;">
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

// 9. 「結束當前 MC」雙重確認內嵌彈窗（「是」與「否」均需按兩次確認）
function openEndChapterConfirmModal() {
  let modal = document.getElementById('inlineConfirmModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'inlineConfirmModal';
    modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.45); z-index:99999; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;';
    document.body.appendChild(modal);
  }

  let yesCount = 0;
  let noCount = 0;

  const renderModalStep = (statusText, subText) => {
    modal.innerHTML = `
      <div style="background:#fff; padding:26px 28px; border-radius:28px; width:100%; max-width:340px; text-align:center; box-shadow:0 12px 36px rgba(0,0,0,0.22); border:1px solid #e0e0e0;">
        <h3 style="margin:0 0 10px 0; font-size:17px; color:#111;">結束當前 MC 練習</h3>
        <p style="font-size:14px; font-weight:bold; color:#333; margin:0 0 8px 0; line-height:1.5;">${statusText}</p>
        <p style="font-size:12px; color:#666; margin:0 0 20px 0; line-height:1.4;">${subText}</p>
        <div style="display:flex; gap:12px;">
          <button id="confirmYesBtn" style="flex:1; background:${yesCount === 1 ? '#b31412' : '#ea4335'}; color:#fff; border:none; padding:11px; border-radius:14px; font-weight:bold; font-size:14px; cursor:pointer;">
            是 ${yesCount > 0 ? `(${yesCount}/2)` : ''}
          </button>
          <button id="confirmNoBtn" style="flex:1; background:${noCount === 1 ? '#dadce0' : '#f1f3f4'}; color:#333; border:1px solid #ccc; padding:11px; border-radius:14px; font-weight:bold; font-size:14px; cursor:pointer;">
            否 ${noCount > 0 ? `(${noCount}/2)` : ''}
          </button>
        </div>
      </div>
    `;

    modal.querySelector('#confirmYesBtn').onclick = () => {
      SoundFX.playClick();
      noCount = 0;
      yesCount += 1;
      if (yesCount === 1) {
        renderModalStep(
          '請再按一次「是」確認結束 (1/2)',
          '結束後將儲存雲端進度，並清空本課題當次選項與 Streak。'
        );
      } else if (yesCount >= 2) {
        modal.style.display = 'none';
        pauseTimer();
        // 呼叫 userlog.js 清空該章節當次 Session 選項並將 Streak 歸零
        if (window.ChemUserLog) {
          window.ChemUserLog.finalizeAndResetChapterSession(
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
    '為防止誤觸，「是」或「否」均需連續按兩次確認。'
  );
  modal.style.display = 'flex';
}

// 10. 視圖切換：回到首頁 vs. 進入章節練習
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

  let rightMain = document.getElementById('chemAppRootContainer') || document.querySelector('main') || document.body;
  let wrapper = document.getElementById('chemChapterViewWrapper');

  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'chemChapterViewWrapper';
    wrapper.style.cssText = 'width: 100%; max-width: 780px; margin: 0 auto; padding: 8px 10px 140px 10px; box-sizing: border-box;';

    wrapper.innerHTML = `
      <div id="chapterHeaderBar" style="display:flex; flex-wrap:nowrap; justify-content:space-between; align-items:center; gap:8px; background:#fff; padding:12px 16px; border-radius:24px; border:1px solid #e0e0e0; margin-bottom:14px; box-shadow:0 2px 8px rgba(0,0,0,0.04); overflow-x:auto;">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:nowrap; white-space:nowrap;">
          <h2 id="currentChapterTitle" style="margin:0; font-size:15px; color:#111; font-family:'Times New Roman', 'Noto Serif TC', serif;">請選擇章節</h2>
          <div style="display:flex; align-items:center; gap:6px; background:#f8f9fa; padding:4px 10px; border-radius:20px; border:1px solid #dadce0; font-size:12px;">
            計時 <span id="chapterTimerDisplay" style="font-family:monospace; font-weight:bold; font-size:12px; color:#1a73e8;">00:00</span>
            <button id="timerToggleBtn" class="sound-trigger" style="border:none; background:#1a73e8; color:#fff; font-size:11px; padding:3px 8px; border-radius:10px; cursor:pointer; font-weight:bold;">開始</button>
            <button id="timerResetBtn" class="sound-trigger" style="border:none; background:#e0e0e0; color:#333; font-size:11px; padding:3px 8px; border-radius:10px; cursor:pointer; font-weight:bold;">重置</button>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:nowrap; white-space:nowrap;">
          <span id="chapterStats" style="font-size:12px; color:#555; font-weight:bold;"></span>
          <label style="padding:5px 10px; font-size:11px; border:1px solid #dadce0; border-radius:12px; background:#f8f9fa; cursor:pointer; color:#333; font-weight:bold;" class="sound-trigger">
            載入檔案
            <input type="file" id="manualDocxInput" accept=".docx" style="display:none;" />
          </label>
          <button id="backHomeTopBtn" class="sound-trigger" style="padding:5px 12px; font-size:11px; border:1px solid #1a73e8; border-radius:12px; background:#e8f0fe; color:#1a73e8; font-weight:bold; cursor:pointer;">回到首頁</button>
        </div>
      </div>
      <div id="questionList"></div>
    `;
    rightMain.appendChild(wrapper);

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
      qContainer.innerHTML = `<div style="text-align:center; padding:48px; color:#1a73e8; font-weight:bold;">正在解析本機檔案 <code>${file.name}</code> ...</div>`;
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
        qContainer.innerHTML = `<div style="color:#e53935; padding:32px;">手動解析失敗：${err.message}</div>`;
      }
    };
  }

  wrapper.style.display = 'block';
  updateFloatingButtonsVisibility();
  return wrapper;
}

// 11. 開啟章節並載入題庫
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

  const lang = window.chemApp.currentLang;
  const dbKey = `${lang}_${chapId}`;

  // 1. 先檢查記憶體快取
  if (window.chemApp.questionsDB[dbKey] && window.chemApp.questionsDB[dbKey].length > 0) {
    const list = window.chemApp.questionsDB[dbKey];
    if (window.ChemUserLog) window.ChemUserLog.setActiveChapter(chapId, list.length, lang);
    renderQuestions(list, chapId);
    return;
  }

  // 2. 檢查 IndexedDB 快取
  const cachedList = await ChemChapterCache.loadChapter(dbKey);
  if (cachedList && cachedList.length > 0) {
    window.chemApp.questionsDB[dbKey] = cachedList;
    window.chemApp.chapterCounts[dbKey] = cachedList.length;
    if (window.ChemUserLog) window.ChemUserLog.setActiveChapter(chapId, cachedList.length, lang);
    renderQuestions(cachedList, chapId);
    return;
  }

  // 3. 從 GitHub docs/ 載入 DOCX
  container.innerHTML = `
    <div style="text-align:center; padding:56px 20px; background:#fff; border-radius:24px; border:1px solid #e0e0e0; color:#555;">
      <div style="font-size:15px; font-weight:bold; color:#1a73e8; margin-bottom:8px;">正在從 GitHub 載入並解析題庫...</div>
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
      <div style="text-align:center; padding:48px 24px; background:#fff; border-radius:24px; border:1px solid #ffcdd2; color:#c62828;">
        <div style="font-size:16px; font-weight:bold; margin-bottom:10px;">找不到遠端題庫檔案 (ch${pad}_mcq_${lang}.docx)</div>
        <div style="font-size:13px; color:#555;">可點擊右上方「載入檔案」手動選擇 .docx 題庫練習。</div>
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
    container.innerHTML = `<div style="color:#e53935; padding:32px; background:#fff; border-radius:24px;">解析失敗：${err.message}</div>`;
  }
}

// 12. 渲染題目卡片（與 userlog.js 的 Session 狀態連動：開關目錄不消失，按結束才清零）
function renderQuestions(qList, chapId) {
  const wrapper = switchRightPanelToChapterView();
  const container = wrapper.querySelector('#questionList');
  const chapStats = wrapper.querySelector('#chapterStats');

  container.innerHTML = '';
  if (chapStats) chapStats.textContent = `共 ${qList.length} 題`;

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.style.cssText = 'background:#fff; border-radius:24px; padding:20px 22px; margin-bottom:18px; box-shadow:0 2px 10px rgba(0,0,0,0.06); border:1px solid #e0e0e0; font-family:"Times New Roman", "Noto Serif TC", "PMingLiU", serif; box-sizing: border-box; width:100%;';

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
        <div class="options-btn-group" style="display:flex; gap:8px;">
          ${['A', 'B', 'C', 'D'].map(k => `
            <button class="opt-act-btn" data-opt="${k}" style="flex:1; padding:10px 2px; border:1px solid #1a73e8; border-radius:12px; background:#fff; color:#1a73e8; font-weight:bold; cursor:pointer; font-size:14px;">
              ${k}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="explanation-panel" style="display:none; margin-top:14px; padding:12px 14px; background:#f8fafd; border-left:4px solid #1a73e8; border-radius:10px; font-family:'Times New Roman', 'Noto Serif TC', serif;">
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

    // 再次執行 DOM 級別灰色殘留方塊拔除
    DocxQuestionParser.stripGrayBoxNodes(card.querySelector('.q-native-body'));

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

    // 檢查當次未結束的 Session 是否已答過此題（開關目錄不消失；若已按過結束則為 null，呈現乾淨重置狀態）
    if (window.ChemUserLog) {
      const sessionRec = window.ChemUserLog.getSessionAnswer(chapId, q.id);
      if (sessionRec && sessionRec.chosen) {
        applyAnswerUI(sessionRec.chosen, false);
      }
    }

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.dataset.opt;
        applyAnswerUI(chosen, true);

        if (window.ChemUserLog) {
          const res = window.ChemUserLog.recordQuestionAnswer({
            qId: q.id,
            qNumDisplay: q.qNumDisplay || `Q${index + 1}`,
            chapId: chapId,
            chosen: chosen,
            correctAns: q.answer,
            lang: window.chemApp.currentLang
          });
          const streakEl = document.getElementById('footerStreakCount');
          if (streakEl && res) streakEl.textContent = res.currentStreak;
        }
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

// 13. 首頁 Dashboard 渲染（僅更新內容，絕不打斷正在作答的章節視圖！）
function renderHomeDashboard() {
  let rightMain = document.getElementById('chemAppRootContainer') || document.querySelector('main') || document.body;
  let dashboardEl = document.getElementById('chemDashboardHome');

  if (!dashboardEl) {
    dashboardEl = document.createElement('div');
    dashboardEl.id = 'chemDashboardHome';
    dashboardEl.style.cssText = 'width:100%; max-width:620px; margin:0 auto; padding:6px 14px 90px 14px; box-sizing:border-box; font-family:sans-serif;';
    rightMain.appendChild(dashboardEl);
  }

  // 如果用戶目前正在做題目 (currentView === 'chapter')，保持首頁隱藏，絕不跳回首頁！
  dashboardEl.style.display = window.chemApp.currentView === 'home' ? 'block' : 'none';

  const summary = window.ChemUserLog
    ? window.ChemUserLog.getDashboardSummary()
    : {
        studentId: 'GUEST',
        isAdmin: false,
        totalAppQuestions: TOTAL_APP_QUESTIONS,
        totalTopics: 15,
        totalChapters: 65,
        totalUniqueAnswered: 0,
        totalUniqueCorrect: 0,
        totalUniqueWrong: 0,
        overallCompletionText: '0%',
        overallAccuracyRate: 0,
        recentTopic: {
          chapId: null,
          topicName: '尚未選擇課題',
          chapterName: '請點擊右下角「目錄選單」開始練習',
          answered: 0,
          correct: 0,
          wrong: 0,
          completionRate: 0,
          remainingRate: 100
        },
        dailyList: []
      };

  const todayStr = new Date().toISOString().slice(0, 10);
  const rt = summary.recentTopic || {};
  const hasRecentChap = !!rt.chapId;
  const recentHeaderTitle = hasRecentChap
    ? `${rt.topicName} — ${rt.chapterName}`
    : '尚未選擇課題（請點右下角「目錄選單」開始）';

  const dailyListHtml =
    summary.dailyList.length === 0
      ? `<div style="font-size:13px; color:#888; text-align:center; padding:18px 0;">尚無作答記錄，快去開始練習吧！</div>`
      : summary.dailyList
          .map(
            item => `
        <div class="daily-record-item sound-trigger" data-date="${item.date}" style="display:flex; justify-content:space-between; align-items:center; padding:11px 16px; background:#fff; border-radius:14px; margin-bottom:8px; border:1px solid #e6e8ec; cursor:pointer; transition:transform 0.1s;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:bold; color:#222; font-size:14px;">${item.date}</span>
            <span style="font-size:11px; color:#34a853; background:#e6f4ea; padding:2px 7px; border-radius:8px; font-weight:bold;">對 ${item.correctCount}</span>
            <span style="font-size:11px; color:#ea4335; background:#fce8e6; padding:2px 7px; border-radius:8px; font-weight:bold;">錯 ${item.wrongCount}</span>
          </div>
          <span style="color:#1a73e8; font-weight:bold; font-size:14px;">答了: ${item.count} 題 <span style="font-size:11px; color:#666;">(查看 &rsaquo;)</span></span>
        </div>
      `
          )
          .join('');

  dashboardEl.innerHTML = `
    <!-- 頂部大圓角導覽列 (位置上移、橫排圓角背景) -->
    <div style="background:#fff; border:1.5px solid #dbe2ef; border-radius:28px; padding:11px 18px; margin-top:4px; margin-bottom:18px; box-shadow:0 4px 14px rgba(26,115,232,0.07); display:flex; justify-content:space-between; align-items:center; flex-wrap:nowrap; gap:8px; overflow-x:auto; white-space:nowrap;">
      <span style="font-size:17px; color:#1a73e8; font-weight:800; font-style:italic; letter-spacing:0.5px;">CHEM QB</span>
      <span style="font-weight:bold; color:#555; font-size:13px; background:#f4f6f9; padding:4px 10px; border-radius:12px;">${todayStr}</span>
      <div style="display:flex; align-items:center; gap:6px;">
        <span style="font-size:12px; font-weight:bold; color:#1a73e8; background:#e8f0fe; padding:4px 10px; border-radius:12px; border:1px solid #aecbfa;">USER: [ ${summary.studentId} ]</span>
        <button id="homeAdminBtn" class="sound-trigger" style="background:#111827; color:#fff; border:none; padding:5px 10px; border-radius:12px; font-weight:bold; font-size:11px; cursor:pointer;">Admin</button>
        <button id="homeLogoutBtn" class="sound-trigger" style="background:#fff; border:1px solid #ea4335; color:#ea4335; padding:4px 10px; border-radius:12px; font-weight:bold; font-size:11px; cursor:pointer;">登出</button>
      </div>
    </div>

    <!-- Recent Topic / Chapter 卡片 -->
    <div style="background:#fff; border:2px solid #e0e0e0; border-radius:24px; padding:18px 20px; margin-bottom:16px; box-shadow:0 4px 12px rgba(0,0,0,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:6px;">
        <span style="font-size:13px; color:#e67c73; font-weight:bold;">Recent topic / Chapter</span>
        ${
          hasRecentChap
            ? `<span style="font-size:12px; font-weight:bold; color:#1a73e8; background:#e8f0fe; padding:3px 10px; border-radius:12px;">本課題還差 ${rt.remainingRate ?? 100}% 完成</span>`
            : ''
        }
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:14px; flex-wrap:wrap;">
        <div style="font-size:15px; font-weight:bold; color:#111;">${recentHeaderTitle}</div>
        ${
          hasRecentChap
            ? `<button id="resumeRecentChapBtn" class="sound-trigger" style="background:#1a73e8; color:#fff; border:none; padding:6px 12px; border-radius:12px; font-size:12px; font-weight:bold; cursor:pointer;">繼續練習</button>`
            : ''
        }
      </div>

      <!-- 進度條 -->
      <div style="width:100%; background:#edf2f7; height:8px; border-radius:4px; overflow:hidden; margin-bottom:16px;">
        <div style="width:${rt.completionRate || 0}%; background:#34a853; height:100%; transition:width 0.3s;"></div>
      </div>

      <div style="display:flex; justify-content:space-between; gap:8px; text-align:center;">
        <div style="flex:1; background:#f8fafd; padding:10px 4px; border-radius:14px;">
          <div style="font-size:12px; color:#888; font-weight:bold;">已答題數</div>
          <div style="font-size:18px; font-weight:bold; color:#1a73e8; margin-top:4px;">${rt.answered || 0}</div>
        </div>
        <div style="flex:1; background:#f8fafd; padding:10px 4px; border-radius:14px;">
          <div style="font-size:12px; color:#888; font-weight:bold;">答對題數</div>
          <div style="font-size:18px; font-weight:bold; color:#34a853; margin-top:4px;">${rt.correct || 0}</div>
        </div>
        <div style="flex:1; background:#f8fafd; padding:10px 4px; border-radius:14px;">
          <div style="font-size:12px; color:#888; font-weight:bold;">答錯題數</div>
          <div style="font-size:18px; font-weight:bold; color:#ea4335; margin-top:4px;">${rt.wrong || 0}</div>
        </div>
        <div style="flex:1; background:#f8fafd; padding:10px 4px; border-radius:14px;">
          <div style="font-size:12px; color:#888; font-weight:bold;">完成率</div>
          <div style="font-size:18px; font-weight:bold; color:#fbbc05; margin-top:4px;">${rt.completionRate || 0}%</div>
        </div>
      </div>
    </div>

    <!-- 每日練習記錄卡片 (支援選擇日期與查看明細) -->
    <div style="background:#f8f9fa; border:2px solid #e0e0e0; border-radius:24px; padding:18px 20px; margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <h3 style="margin:0; font-size:15px; color:#222;">每日練習記錄</h3>
        <div style="display:flex; align-items:center; gap:6px;">
          <input type="date" id="homeQuickDatePicker" value="${todayStr}" style="padding:4px 8px; border:1px solid #ccc; border-radius:10px; font-size:12px; cursor:pointer; background:#fff;" />
          <button id="openFullDailyInspectorBtn" class="sound-trigger" style="background:#e8f0fe; color:#1a73e8; border:1px solid #aecbfa; padding:5px 10px; border-radius:10px; font-size:12px; font-weight:bold; cursor:pointer;">查看紀錄</button>
        </div>
      </div>
      <div style="max-height:175px; overflow-y:auto; padding-right:2px;">
        ${dailyListHtml}
      </div>
    </div>

    <!-- MC 語言切換卡片 -->
    <div style="background:#fff; border:2px solid #e0e0e0; border-radius:24px; padding:14px 20px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
      <span style="font-weight:bold; font-size:14px; color:#333;">MC 語言 <span style="color:#888; font-weight:normal; font-size:12px;">(Stay tuned)</span></span>
      <div style="display:flex; background:#f1f3f4; border-radius:20px; padding:4px; gap:4px;">
        <button id="langEnBtn" class="sound-trigger" style="border:none; background:${window.chemApp.currentLang === 'e' ? '#1a73e8' : 'transparent'}; color:${window.chemApp.currentLang === 'e' ? '#fff' : '#555'}; font-weight:bold; padding:6px 14px; border-radius:16px; font-size:13px; cursor:pointer;">英</button>
        <button id="langZhBtn" class="sound-trigger" style="border:none; background:${window.chemApp.currentLang === 'c' ? '#1a73e8' : 'transparent'}; color:${window.chemApp.currentLang === 'c' ? '#fff' : '#555'}; font-weight:bold; padding:6px 14px; border-radius:16px; font-size:13px; cursor:pointer;">中</button>
      </div>
    </div>

    <!-- 底部總覽卡片 (總 Topic: 15 | 總 Chapter: 65 | 總題目: 5309 | 完成度) -->
    <div style="background:#fff; border:2px solid #e0e0e0; border-radius:24px; padding:18px 16px; text-align:center; display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <div style="font-size:12px; color:#e67c73; font-weight:bold;">總 Topic</div>
        <div style="font-size:22px; font-weight:bold; color:#222; margin-top:2px;">15</div>
      </div>
      <div>
        <div style="font-size:12px; color:#e67c73; font-weight:bold;">總 Chapter</div>
        <div style="font-size:22px; font-weight:bold; color:#222; margin-top:2px;">65</div>
      </div>
      <div>
        <div style="font-size:12px; color:#e67c73; font-weight:bold;">總題目數</div>
        <div style="font-size:22px; font-weight:bold; color:#222; margin-top:2px;">${summary.totalUniqueAnswered} <span style="font-size:13px; color:#888;">/ ${TOTAL_APP_QUESTIONS}</span></div>
      </div>
      <div>
        <div style="font-size:12px; color:#e67c73; font-weight:bold;">完成</div>
        <div style="font-size:22px; font-weight:bold; color:#1a73e8; margin-top:2px;">${summary.overallCompletionText}</div>
      </div>
    </div>
  `;

  // 綁定首頁按鈕事件
  const resumeBtn = dashboardEl.querySelector('#resumeRecentChapBtn');
  if (resumeBtn && rt.chapId) {
    resumeBtn.onclick = () => {
      SoundFX.playClick();
      openChapter(rt.chapId);
    };
  }

  dashboardEl.querySelector('#homeAdminBtn').onclick = () => {
    SoundFX.playClick();
    if (window.ChemUserLog) window.ChemUserLog.promptAdminAccess();
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

// 14. 螢幕正中央 28px 圓角 Topic / Chapter 目錄卡片
function renderCenterDirectoryModal() {
  let modal = document.getElementById('centerDirectoryModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'centerDirectoryModal';
    modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.52); z-index:99999; justify-content:center; align-items:center; padding:18px; box-sizing:border-box; font-family:sans-serif;';
    document.body.appendChild(modal);
  }

  const uniqueAns = (window.ChemUserLog && window.ChemUserLog.state.uniqueAnswers) || {};

  let contentHtml = `
    <div style="background:#fff; width:100%; max-width:440px; height:82vh; max-height:640px; border-radius:28px; box-shadow:0 14px 44px rgba(0,0,0,0.25); display:flex; flex-direction:column; overflow:hidden; border:1px solid #e0e0e0;">
      <div style="padding:18px 24px; background:#1a73e8; color:#fff; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h2 style="margin:0; font-size:18px; font-weight:bold;">選擇 Topic / Chapter</h2>
          <div style="font-size:11px; opacity:0.9; margin-top:2px;">共 15 個課題、65 個章節（點擊展開）</div>
        </div>
        <button id="closeDirModalBtn" class="sound-trigger" style="background:rgba(255,255,255,0.2); border:none; color:#fff; width:32px; height:32px; border-radius:16px; font-size:20px; cursor:pointer; line-height:1;">&times;</button>
      </div>
      <div style="flex:1; overflow-y:auto; padding:16px 20px; background:#f4f6f9;">
  `;

  SYLLABUS_CONFIG.forEach(topic => {
    const isCurrentTopic = topic.chapters.some(c => c.id === window.chemApp.activeChapterId);
    contentHtml += `
      <div style="background:#fff; border-radius:20px; margin-bottom:12px; border:1px solid #e0e0e0; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.03);">
        <div class="dir-topic-header sound-trigger" style="padding:14px 16px; background:#fafafa; font-weight:bold; font-size:14px; color:#222; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          <span>${topic.topicName}</span>
          <span class="dir-arrow" style="font-size:12px; color:#888;">${isCurrentTopic ? '▼' : '▶'}</span>
        </div>
        <div class="dir-chapter-list" style="display:${isCurrentTopic ? 'flex' : 'none'}; flex-direction:column;">
    `;
    topic.chapters.forEach(ch => {
      const doneInChap = Object.values(uniqueAns).filter(r => parseInt(r.chapId, 10) === ch.id).length;
      const isActive = ch.id === window.chemApp.activeChapterId;
      contentHtml += `
          <div class="dir-chapter-item sound-trigger" data-chid="${ch.id}" style="padding:12px 16px 12px 22px; border-top:1px solid #f0f0f0; font-size:13px; color:${isActive ? '#1a73e8' : '#444'}; background:${isActive ? '#e8f0fe' : '#fff'}; font-weight:${isActive ? 'bold' : 'normal'}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>${ch.name}</span>
            <span style="font-size:12px; color:#1a73e8; font-weight:bold; white-space:nowrap; margin-left:8px;">
              ${doneInChap > 0 ? `已答 ${doneInChap} 題 · ` : ''}進入 &rsaquo;
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

// 15. 全屏登入 / 註冊閘道 (支援 5a/b/c/d + 1~35 雙重驗證 & Admin Wesley)
function ensureAuthOverlay() {
  let authOverlay = document.getElementById('chemAuthOverlay');
  if (authOverlay) return authOverlay;

  authOverlay = document.createElement('div');
  authOverlay.id = 'chemAuthOverlay';
  authOverlay.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:#f4f6f9; z-index:99999; display:flex; justify-content:center; align-items:center; padding:16px; box-sizing:border-box; font-family:sans-serif;';

  authOverlay.innerHTML = `
    <div style="background:#fff; padding:32px 34px; border-radius:28px; box-shadow:0 10px 34px rgba(0,0,0,0.12); width:100%; max-width:400px; text-align:center; border:1px solid #e0e0e0;">
      <h2 style="margin:0 0 6px 0; color:#1a73e8; font-size:24px; font-weight:800; font-style:italic;">CHEM QB</h2>
      <p style="font-size:13px; color:#666; margin:0 0 22px 0;">請登入或註冊學生 ID (5A/B/C/D + 1~35)</p>
      
      <div style="display:flex; flex-direction:column; gap:14px; text-align:left;">
        <div>
          <label style="font-size:12px; font-weight:bold; color:#333; display:block; margin-bottom:4px;">用戶 ID (5a/b/c/d + 1~35 或 Admin)</label>
          <input type="text" id="customUserIdInput" placeholder="例如: 5A12 或 5D28" style="width:100%; padding:11px 14px; border:1px solid #ccc; border-radius:12px; font-size:14px; box-sizing:border-box;" />
        </div>
        <div>
          <label style="font-size:12px; font-weight:bold; color:#333; display:block; margin-bottom:4px;">密碼 (沒有限制)</label>
          <input type="password" id="customUserPassInput" placeholder="輸入密碼" style="width:100%; padding:11px 14px; border:1px solid #ccc; border-radius:12px; font-size:14px; box-sizing:border-box;" />
        </div>
        <div id="confirmPassGroup" style="display:none;">
          <label style="font-size:12px; font-weight:bold; color:#333; display:block; margin-bottom:4px;">確認密碼 (雙重驗證)</label>
          <input type="password" id="customUserPassConfirmInput" placeholder="再次輸入相同密碼" style="width:100%; padding:11px 14px; border:1px solid #ccc; border-radius:12px; font-size:14px; box-sizing:border-box;" />
        </div>

        <div style="display:flex; gap:10px; margin-top:4px;">
          <button id="mainLoginBtn" class="sound-trigger" style="flex:1; background:#1a73e8; color:#fff; border:none; padding:12px; border-radius:14px; font-weight:bold; font-size:14px; cursor:pointer;">登入</button>
          <button id="mainToggleRegBtn" class="sound-trigger" style="flex:1; background:#f1f3f4; color:#1a73e8; border:1px solid #1a73e8; padding:12px; border-radius:14px; font-weight:bold; font-size:14px; cursor:pointer;">切換註冊</button>
        </div>
      </div>

      <div id="authErrorMsg" style="color:#ea4335; font-size:12px; margin-top:14px; font-weight:bold; min-height:18px; line-height:1.4;"></div>

      <div style="margin-top:14px; padding-top:12px; border-top:1px dashed #e0e0e0; display:flex; justify-content:center;">
        <button id="loginOverlayAdminBtn" class="sound-trigger" style="background:transparent; border:none; color:#666; font-size:12px; font-weight:bold; cursor:pointer; text-decoration:underline;">
          Admin 管理員快速入口 (Wesley)
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

  const submitAuth = async () => {
    SoundFX.playClick();
    errMsg.style.color = '#1a73e8';
    errMsg.textContent = '驗證中，請稍候...';

    if (!window.ChemUserLog) {
      errMsg.style.color = '#ea4335';
      errMsg.textContent = '系統模組載入中，請再按一次！';
      return;
    }

    const res = await window.ChemUserLog.authenticateUser({
      rawId: idInput.value,
      password: passInput.value,
      confirmPassword: confirmPassInput.value,
      isRegister: isRegisterMode
    });

    if (!res.ok) {
      errMsg.style.color = '#ea4335';
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
    if (window.ChemUserLog) window.ChemUserLog.promptAdminAccess();
  };

  return authOverlay;
}

// 16. 確保自動載入 ./userlog.js 並啟動系統
async function ensureUserLogModuleLoaded() {
  if (window.ChemUserLog) return true;
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = `./userlog.js?v=${Date.now()}`;
    s.onload = () => resolve(true);
    s.onerror = () => {
      console.error('無法載入 ./userlog.js，請確認檔案已上傳至相同目錄！');
      resolve(false);
    };
    document.head.appendChild(s);
  });
}

function cleanLegacyPageLayout() {
  // 移除舊版 HTML 殘留的導覽列、側邊欄與舊區塊，建立純淨容器
  document.querySelectorAll('header, .header, .top-nav, aside, .sidebar, #sidebar, .left-panel').forEach(el => el.remove());

  let mainEl = document.querySelector('main') || document.body;
  Array.from(mainEl.children).forEach(child => {
    if (
      child.tagName !== 'SCRIPT' &&
      child.id !== 'chemAppRootContainer' &&
      child.id !== 'chemAuthOverlay' &&
      child.id !== 'floatingActionGroup' &&
      child.id !== 'centerDirectoryModal' &&
      child.id !== 'inlineConfirmModal'
    ) {
      child.style.display = 'none';
    }
  });

  let rootContainer = document.getElementById('chemAppRootContainer');
  if (!rootContainer) {
    rootContainer = document.createElement('div');
    rootContainer.id = 'chemAppRootContainer';
    rootContainer.style.cssText = 'width:100%; min-height:100vh; background:#f4f6f9; padding-top:6px; box-sizing:border-box;';
    mainEl.insertBefore(rootContainer, mainEl.firstChild);
  }
}

// 17. 主程式啟動入口
document.addEventListener('DOMContentLoaded', async () => {
  cleanLegacyPageLayout();
  const authOverlay = ensureAuthOverlay();
  ensureFloatingActionGroup();

  // 全站一般按鈕點擊音效代理
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .sound-trigger');
    if (
      target &&
      !target.classList.contains('opt-act-btn') &&
      !target.classList.contains('peek-ans-btn') &&
      target.id !== 'timerToggleBtn' &&
      target.id !== 'timerResetBtn'
    ) {
      SoundFX.playClick();
    }
  });

  // 自動載入 userlog.js
  await ensureUserLogModuleLoaded();

  if (window.ChemUserLog) {
    // 當登入或登出狀態改變時
    window.ChemUserLog.onAuthChange((user, isAdmin) => {
      if (user) {
        authOverlay.style.display = 'none';
        if (window.chemApp.currentView !== 'chapter') {
          showHomeView();
        } else {
          updateFloatingButtonsVisibility();
        }
        if (isAdmin) {
          window.ChemUserLog.openAdminPanel();
        }
      } else {
        authOverlay.style.display = 'flex';
        updateFloatingButtonsVisibility();
      }
    });

    // 當數據狀態更新時（只在背景更新首頁與 Streak，絕不強制中斷答題！）
    window.ChemUserLog.onStateChange((state) => {
      const streakEl = document.getElementById('footerStreakCount');
      if (streakEl) streakEl.textContent = state.currentStreak || 0;
      renderHomeDashboard();
    });

    // 初始化 Firebase 認證與雲端同步
    await window.ChemUserLog.initFirebase(FIREBASE_CONFIG);
  }
});

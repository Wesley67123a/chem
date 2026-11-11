/* ==========================================
 * DSE 化學分章模擬題庫系統 ( Aristo MCQ 終極零 BUG 版 v0.0.31 )
 * 更新重點：
 * 1. 依照你提供 Notability 筆記截圖，將全部 65 章章節名稱修正為 Aristo 課本原名
 * 2. 完整保留自動切換右側視圖、Word 表格/軟換行穿透、以及 IndexedDB 大容量快取引擎
 * ========================================== */

// 1. 課程 65 章架構 (已對應 Notability 筆記修正正確章節名稱)
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

// 2. 全局狀態 (v0.0.31)
window.chemApp = {
  version: '0.0.31',
  currentLang: 'e',
  activeChapterId: null,
  questionsDB: {},
  chapterCounts: {},
  userAnswers: {},
  dashboardNodes: [],
  debugLogs: { lastRawText: [], lastParsedQuestions: [], lastLoadedUrl: '' }
};

const CHAPTER_MAP = {};
SYLLABUS_CONFIG.forEach(t => t.chapters.forEach(c => { CHAPTER_MAP[c.id] = { topic: t, chapter: c }; }));

// 2.5 IndexedDB + localStorage 儲存引擎
class ChemStorage {
  static dbPromise = null;

  static getDB() {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open('HKDSE_CHEM_QB_V31', 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('chapters')) {
            db.createObjectStore('chapters');
          }
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
    } catch (e) {
      return false;
    }
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
    } catch (e) {
      return null;
    }
  }

  static loadMeta() {
    try {
      const counts = localStorage.getItem('CHEM_COUNTS_V31');
      if (counts) window.chemApp.chapterCounts = JSON.parse(counts);
      const ans = localStorage.getItem('CHEM_USER_ANS_V31');
      if (ans) window.chemApp.userAnswers = JSON.parse(ans);
      const savedLang = localStorage.getItem('CHEM_LANG_V31');
      if (savedLang === 'c' || savedLang === 'e') window.chemApp.currentLang = savedLang;
    } catch (e) {}
  }

  static saveMeta() {
    try {
      localStorage.setItem('CHEM_COUNTS_V31', JSON.stringify(window.chemApp.chapterCounts));
      localStorage.setItem('CHEM_USER_ANS_V31', JSON.stringify(window.chemApp.userAnswers));
      localStorage.setItem('CHEM_LANG_V31', window.chemApp.currentLang);
    } catch (e) {}
  }
}

// 3. 深度穿透式 DOM 切題引擎
class DocxQuestionParser {
  static cleanInlineNoise(htmlStr) {
    return htmlStr
      .replace(/[\u25A1\u2610\u25A0\u25AA\uF06F□☐]/g, '')
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
      /^多項選擇題$/
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
        const parts = cleanedHtml.split(/<br\s*\/?>/i);
        parts.forEach(part => {
          const p = document.createElement('p');
          p.innerHTML = part.trim();
          if ((p.textContent || '').trim() || p.querySelector('img')) {
            blocks.push(p);
          }
        });
      } else {
        const p = node.cloneNode(true);
        p.innerHTML = cleanedHtml.trim();
        if ((p.textContent || '').trim() || p.querySelector('img') || tag === 'TABLE') {
          blocks.push(p);
        }
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
          if ((cloned.textContent || '').trim() || hasImg) {
            currentBlock.nodes.push(cloned);
          }
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
              node.style.cssText = 'padding-left: 24px; margin: 4px 0;';
            } else if (/^\(\d+\)\s*/.test(txt)) {
              node.style.cssText = 'margin: 4px 0;';
            } else if (isTable) {
              node.style.cssText = 'border-collapse: collapse; margin: 12px 0; width: auto;';
            } else {
              node.style.cssText = 'margin: 6px 0;';
            }
          }
          stemDiv.appendChild(node);
        } else {
          if (txt.length > 0 || hasImg || isTable) {
            if (node.style) node.style.cssText = 'margin: 6px 0; line-height: 1.65;';
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
    const rawHtml = result.value;
    return DocxQuestionParser.parseHtmlContent(rawHtml, chapId);
  }
}

// 5. 視圖切換器
function switchRightPanelToChapterView() {
  let wrapper = document.getElementById('chemChapterViewWrapper');
  if (!wrapper) {
    let rightMain =
      document.querySelector('main') ||
      document.querySelector('.main-content') ||
      document.querySelector('#mainContent') ||
      document.querySelector('.content-area') ||
      document.querySelector('.right-panel');

    if (!rightMain) {
      const allDivs = Array.from(document.querySelectorAll('div, section, main'));
      const statsEl = allDivs.find(el =>
        (el.textContent || '').includes('練習進度') &&
        (el.textContent || '').includes('最近 12 週練習記錄') &&
        !el.contains(document.getElementById('topicListContainer'))
      );
      if (statsEl) {
        rightMain = statsEl;
        while (
          rightMain.parentElement &&
          rightMain.parentElement !== document.body &&
          !rightMain.parentElement.contains(document.getElementById('topicListContainer'))
        ) {
          rightMain = rightMain.parentElement;
        }
      }
    }
    if (!rightMain) rightMain = document.body;

    window.chemApp.dashboardNodes = Array.from(rightMain.children);

    wrapper = document.createElement('div');
    wrapper.id = 'chemChapterViewWrapper';
    wrapper.style.cssText = 'width: 100%; max-width: 960px; margin: 0 auto; padding: 8px 4px 48px 4px;';

    wrapper.innerHTML = `
      <div id="chapterHeaderBar" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; background:#fff; padding:16px 20px; border-radius:10px; border:1px solid #e0e0e0; margin-bottom:20px; box-shadow:0 2px 6px rgba(0,0,0,0.04);">
        <div>
          <div id="currentTopicSubtitle" style="font-size:12px; color:#1a73e8; font-weight:bold; margin-bottom:4px;"></div>
          <h2 id="currentChapterTitle" style="margin:0; font-size:20px; color:#111;">請選擇章節</h2>
        </div>
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
          <span id="chapterStats" style="font-size:13px; color:#555; font-weight:bold; margin-right:4px;"></span>
          <label style="padding:6px 12px; font-size:12px; border:1px solid #dadce0; border-radius:6px; background:#f8f9fa; cursor:pointer; color:#333; font-weight:bold;">
            📂 手動載入 DOCX
            <input type="file" id="manualDocxInput" accept=".docx" style="display:none;" />
          </label>
          <button id="reloadChapBtn" style="padding:6px 12px; font-size:12px; border:1px solid #dadce0; border-radius:6px; background:#fff; cursor:pointer; color:#333; font-weight:bold;">🔄 重新讀取</button>
          <button id="backToDashboardBtn" style="padding:6px 12px; font-size:12px; border:1px solid #1a73e8; border-radius:6px; background:#e8f0fe; cursor:pointer; color:#1a73e8; font-weight:bold;">📊 返回總覽</button>
        </div>
      </div>
      <div id="questionList"></div>
    `;

    rightMain.insertBefore(wrapper, rightMain.firstChild);

    wrapper.querySelector('#backToDashboardBtn').onclick = () => {
      wrapper.style.display = 'none';
      window.chemApp.dashboardNodes.forEach(node => {
        if (node !== wrapper) node.style.display = '';
      });
      updateDashboardStats();
    };

    wrapper.querySelector('#reloadChapBtn').onclick = () => {
      if (window.chemApp.activeChapterId) openChapter(window.chemApp.activeChapterId, true);
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
        updateCounts();
        renderQuestions(list, chapId);
      } catch (err) {
        qContainer.innerHTML = `<div style="color:#e53935; padding:32px;">手動解析失敗：${err.message}</div>`;
      }
    };
  }

  window.chemApp.dashboardNodes.forEach(node => {
    if (node !== wrapper) node.style.display = 'none';
  });
  wrapper.style.display = 'block';
  return wrapper;
}

// 6. 開啟章節
async function openChapter(chapId, bypassCache = false) {
  window.chemApp.activeChapterId = chapId;
  const lookup = CHAPTER_MAP[chapId];
  if (!lookup) return;

  document.querySelectorAll('.chapter-item').forEach(el => {
    el.classList.remove('active');
    el.style.background = 'transparent';
    el.style.color = '#555';
    el.style.fontWeight = 'normal';
  });
  const activeEl = document.getElementById(`chap-item-${chapId}`);
  if (activeEl) {
    activeEl.classList.add('active');
    activeEl.style.background = '#e8f0fe';
    activeEl.style.color = '#1a73e8';
    activeEl.style.fontWeight = 'bold';
    const parentList = activeEl.parentElement;
    if (parentList && parentList.style.display === 'none') {
      parentList.style.display = 'block';
      const icon = parentList.previousElementSibling?.querySelector('.toggle-icon');
      if (icon) icon.textContent = '▼';
    }
  }

  const wrapper = switchRightPanelToChapterView();
  const topicSub = wrapper.querySelector('#currentTopicSubtitle');
  const titleEl = wrapper.querySelector('#currentChapterTitle');
  const container = wrapper.querySelector('#questionList');

  if (topicSub) topicSub.textContent = lookup.topic.topicName;
  if (titleEl) titleEl.textContent = lookup.chapter.name;

  const dbKey = `${window.chemApp.currentLang}_${chapId}`;

  if (!bypassCache) {
    if (window.chemApp.questionsDB[dbKey] && window.chemApp.questionsDB[dbKey].length > 0) {
      renderQuestions(window.chemApp.questionsDB[dbKey], chapId);
      return;
    }
    const cachedList = await ChemStorage.loadChapter(dbKey);
    if (cachedList && cachedList.length > 0) {
      window.chemApp.questionsDB[dbKey] = cachedList;
      window.chemApp.chapterCounts[dbKey] = cachedList.length;
      ChemStorage.saveMeta();
      updateCounts();
      renderQuestions(cachedList, chapId);
      return;
    }
  }

  const pad = String(chapId).padStart(2, '0');
  const lang = window.chemApp.currentLang;
  const candidateUrls = [
    `./docs/chemqb_ch${pad}_mcq_${lang}.docx`,
    `./docs/chemqb_ch${chapId}_mcq_${lang}.docx`,
    `docs/chemqb_ch${pad}_mcq_${lang}.docx`
  ];

  container.innerHTML = `
    <div style="text-align:center; padding:56px 20px; background:#fff; border-radius:10px; border:1px solid #e0e0e0; color:#555;">
      <div style="font-size:16px; font-weight:bold; color:#1a73e8; margin-bottom:8px;">⏳ 正在從 GitHub 載入並解析題庫...</div>
      <div style="font-size:13px; color:#888;">目標檔案：<code>./docs/chemqb_ch${pad}_mcq_${lang}.docx</code></div>
    </div>
  `;

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
      <div style="text-align:center; padding:48px 24px; background:#fff; border-radius:10px; border:1px solid #ffcdd2; color:#c62828;">
        <div style="font-size:17px; font-weight:bold; margin-bottom:10px;">⚠️ 找不到遠端題庫檔案：<code>chemqb_ch${pad}_mcq_${lang}.docx</code></div>
        <div style="font-size:13px; color:#555; line-height:1.7; max-width:540px; margin:0 auto;">
          請確認 GitHub <code>docs/</code> 資料夾內已上傳對應檔案，或點擊上方 <b>「📂 手動載入 DOCX」</b> 按鈕立即練習！
        </div>
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
    updateCounts();
    renderQuestions(list, chapId);
  } catch (err) {
    container.innerHTML = `<div style="color:#e53935; padding:32px; background:#fff; border-radius:8px;">解析 DOCX 失敗：${err.message}</div>`;
  }
}

// 7. 渲染題目卡片
function renderQuestions(qList, chapId) {
  const wrapper = switchRightPanelToChapterView();
  const container = wrapper.querySelector('#questionList');
  const chapStats = wrapper.querySelector('#chapterStats');

  container.innerHTML = '';
  if (chapStats) chapStats.textContent = `共 ${qList.length} 題 (${window.chemApp.currentLang === 'c' ? '中文卷' : '英文卷'})`;

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.style.cssText = 'background:#fff; border-radius:10px; padding:24px 28px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.06); border:1px solid #e0e0e0; font-family:"Times New Roman", "Noto Serif TC", "PMingLiU", serif;';

    const hasExplanation = q.explanationHtml && q.explanationHtml.length > 0;

    card.innerHTML = `
      <div class="q-header" style="margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f0f0f0; padding-bottom:8px;">
        <span class="q-number" style="color:#111; font-weight:bold; font-size:16px; font-family:Arial, sans-serif;">${q.qNumDisplay || `Q${index + 1}`}</span>
        <span style="font-size:12px; color:#888; font-family:sans-serif;">第 ${index + 1} / ${qList.length} 題</span>
      </div>
      <div class="q-native-body" style="line-height:1.7; font-size:16px; color:#111; overflow-x:auto;">
        ${q.htmlContent}
      </div>
      <div class="interactive-action-bar" style="margin-top:18px; padding-top:14px; border-top:1px dashed #ddd; font-family:sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-weight:bold; color:#555; font-size:13px;">請選擇答案：</span>
          <button class="peek-ans-btn" style="border:none; background:transparent; color:#1a73e8; font-size:12px; cursor:pointer; padding:2px 6px; font-weight:bold;">👁️ 顯示/隱藏解析</button>
        </div>
        <div class="options-btn-group" style="display:flex; gap:10px;">
          ${['A', 'B', 'C', 'D'].map(k => `
            <button class="opt-act-btn" data-opt="${k}" style="flex:1; padding:10px; border:1px solid #1a73e8; border-radius:6px; background:#fff; color:#1a73e8; font-weight:bold; cursor:pointer; font-size:14px;">
              ${k}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="explanation-panel" style="display:none; margin-top:16px; padding:14px 16px; background:#f8fafd; border-left:4px solid #1a73e8; border-radius:4px;">
        <div class="exp-title" style="font-weight:bold; color:#1a73e8; font-size:15px; font-family:Arial, sans-serif; margin-bottom:${hasExplanation ? '8px' : '0'};">
          Answer: ${q.answer}
        </div>
        ${hasExplanation
          ? `<div class="exp-body" style="font-size:15px; color:#111; line-height:1.65;">${q.explanationHtml}</div>`
          : `<div style="font-size:13px; color:#888; font-family:sans-serif; margin-top:4px;">（本題原檔無附帶文字解析）</div>`
        }
      </div>
    `;

    card.querySelectorAll('img').forEach(img => {
      img.style.maxWidth = '85%';
      img.style.maxHeight = '240px';
      img.style.width = 'auto';
      img.style.height = 'auto';
      img.style.display = 'block';
      img.style.margin = '12px auto';
    });

    const optBtns = card.querySelectorAll('.opt-act-btn');
    const expPanel = card.querySelector('.explanation-panel');
    const peekBtn = card.querySelector('.peek-ans-btn');

    const applyAnswerUI = (selectedOpt) => {
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

    const savedRecord = window.chemApp.userAnswers[q.id];
    if (savedRecord) {
      const chosen = typeof savedRecord === 'string' ? savedRecord : savedRecord.chosen;
      if (chosen) applyAnswerUI(chosen);
    }

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.dataset.opt;
        const today = new Date().toISOString().slice(0, 10);
        window.chemApp.userAnswers[q.id] = { chosen: chosen, correct: chosen === q.answer, date: today };
        ChemStorage.saveMeta();
        applyAnswerUI(chosen);
        updateDashboardStats();
      });
    });

    peekBtn.addEventListener('click', () => {
      const isHidden = expPanel.style.display === 'none';
      expPanel.style.display = isHidden ? 'block' : 'none';
    });

    container.appendChild(card);
  });
}

// 8. 統計更新
function updateCounts() {
  for (let i = 1; i <= 65; i++) {
    const key = `${window.chemApp.currentLang}_${i}`;
    const len = window.chemApp.chapterCounts[key] ?? (window.chemApp.questionsDB[key] || []).length;
    const badge = document.getElementById(`badge-${i}`);
    if (badge) {
      badge.textContent = `${len} 題`;
      badge.style.color = len > 0 ? '#1a73e8' : '#aaa';
      badge.style.fontWeight = len > 0 ? 'bold' : 'normal';
    }
  }
  updateDashboardStats();
}

function updateDashboardStats() {
  try {
    let totalQ = 0;
    for (let i = 1; i <= 65; i++) {
      const key = `${window.chemApp.currentLang}_${i}`;
      totalQ += window.chemApp.chapterCounts[key] || 0;
    }
    const records = Object.values(window.chemApp.userAnswers).map(v =>
      typeof v === 'string' ? { chosen: v, correct: false, date: '' } : v
    );
    const answeredCount = records.length;
    const wrongCount = records.filter(r => !r.correct).length;
    const correctCount = records.filter(r => r.correct).length;
    const rate = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayCount = records.filter(r => r.date === todayStr).length;

    const setIfExist = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setIfExist('totalQuestionsCount', totalQ);
    setIfExist('statTotalQuestions', totalQ);
    setIfExist('statAnswered', answeredCount);
    setIfExist('statMasteryRate', `${rate}%`);
    setIfExist('statWrong', wrongCount);
    setIfExist('statToday', todayCount);
  } catch (e) {}
}

// 9. 左側選單渲染
function renderSidebar() {
  const container = document.getElementById('topicListContainer');
  if (!container) return;
  container.innerHTML = '';

  SYLLABUS_CONFIG.forEach(topic => {
    const groupEl = document.createElement('div');
    groupEl.className = 'topic-group';
    groupEl.style.cssText = 'margin-bottom:4px; border-bottom:1px solid #f0f0f0;';

    const headerEl = document.createElement('div');
    headerEl.className = 'topic-header';
    headerEl.style.cssText = 'cursor:pointer; font-weight:bold; padding:10px 12px; background:#fafafa; display:flex; justify-content:space-between; align-items:center; user-select:none; font-size:13px; color:#333;';
    headerEl.innerHTML = `<span>${topic.topicName}</span><span class="toggle-icon" style="font-size:11px; color:#888;">▶</span>`;

    const cList = document.createElement('div');
    cList.className = 'chapter-list';
    cList.style.display = 'none';

    headerEl.onclick = () => {
      const isHidden = (cList.style.display === 'none');
      cList.style.display = isHidden ? 'block' : 'none';
      headerEl.querySelector('.toggle-icon').textContent = isHidden ? '▼' : '▶';
    };

    topic.chapters.forEach(ch => {
      const it = document.createElement('div');
      it.className = 'chapter-item';
      it.id = `chap-item-${ch.id}`;
      it.style.cssText = 'padding:8px 12px 8px 24px; cursor:pointer; display:flex; justify-content:space-between; font-size:12px; color:#555; border-top:1px solid #f8f8f8;';
      it.innerHTML = `<span>${ch.name}</span><span class="chapter-badge" id="badge-${ch.id}" style="color:#aaa;">0 題</span>`;

      it.onclick = (e) => {
        e.stopPropagation();
        openChapter(ch.id);
      };
      cList.appendChild(it);
    });

    groupEl.appendChild(headerEl);
    groupEl.appendChild(cList);
    container.appendChild(groupEl);
  });

  document.querySelectorAll('button, span, a, div').forEach(el => {
    if (el.children.length === 0) {
      const txt = (el.textContent || '').trim();
      if (txt === '全部展開') {
        el.style.cursor = 'pointer';
        el.onclick = () => {
          document.querySelectorAll('#topicListContainer .chapter-list').forEach(l => (l.style.display = 'block'));
          document.querySelectorAll('#topicListContainer .toggle-icon').forEach(i => (i.textContent = '▼'));
        };
      } else if (txt === '全部收起') {
        el.style.cursor = 'pointer';
        el.onclick = () => {
          document.querySelectorAll('#topicListContainer .chapter-list').forEach(l => (l.style.display = 'none'));
          document.querySelectorAll('#topicListContainer .toggle-icon').forEach(i => (i.textContent = '▶'));
        };
      }
    }
  });
}

// 10. 初始化
document.addEventListener('DOMContentLoaded', () => {
  ChemStorage.loadMeta();
  renderSidebar();
  updateCounts();

  const navRight = document.querySelector('.nav-right');
  if (navRight) {
    navRight.innerHTML = '';

    const bar = document.createElement('div');
    bar.id = 'langSwitchBar';
    bar.style.cssText = 'display:inline-flex; align-items:center; gap:8px; background:#f1f3f4; padding:3px 10px; border-radius:20px;';

    ['c', 'e'].forEach(lang => {
      const isSelected = window.chemApp.currentLang === lang;
      const b = document.createElement('button');
      b.textContent = lang === 'c' ? '中文卷 (C)' : '英文卷 (E)';
      b.style.cssText = `border:none; padding:4px 12px; font-size:12px; border-radius:14px; cursor:pointer; font-weight:bold; background:${isSelected ? '#fff' : 'transparent'}; color:${isSelected ? '#1a73e8' : '#5f6368'}; box-shadow:${isSelected ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};`;
      b.onclick = () => {
        window.chemApp.currentLang = lang;
        ChemStorage.saveMeta();
        bar.querySelectorAll('button').forEach(btn => {
          btn.style.background = 'transparent';
          btn.style.color = '#5f6368';
          btn.style.boxShadow = 'none';
        });
        b.style.background = '#fff';
        b.style.color = '#1a73e8';
        b.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        updateCounts();
        if (window.chemApp.activeChapterId) openChapter(window.chemApp.activeChapterId);
      };
      bar.appendChild(b);
    });

    const verSpan = document.createElement('span');
    verSpan.id = 'appVersionBadge';
    verSpan.textContent = `v${window.chemApp.version}`;
    verSpan.style.cssText = 'font-size:12px; font-weight:bold; color:#1a73e8; background:#e8f0fe; padding:2px 8px; border-radius:10px; border:1px solid #aecbfa; margin-left:4px;';
    bar.appendChild(verSpan);

    navRight.appendChild(bar);
  }
});

/* ==========================================
 * DSE 化學分章模擬題庫系統 ( Aristo MCQ 終極零 BUG 版 v0.0.29 )
 * 修復重點：
 * 1. 修正切題 Regex：嚴格鎖定 ChemMCQ 題號，絕不誤切 (1), (2), (3) 敘述句
 * 2. 智慧 DOM 分離：以 Answer: 為界，自動隱藏答案並將後續段落（含化學式上下標 sub/sup）完美歸入解析區
 * 3. 徹底過濾跨頁頁首/頁尾 (Aristo / Part XI / Multiple-choice questions / Chapter XX / ☐ 方框)
 * 4. 導入 IndexedDB 大容量快取 + localStorage 題數與作答進度記憶，解決 5MB 爆容量問題
 * ========================================== */

// 1. 課程 65 章架構
const SYLLABUS_CONFIG = [
  { topicId: 'CHEM-01', topicName: 'CHEM-01 地球', chapters: [{ id: 1, name: '第 1 章：大氣層與氣體' }, { id: 2, name: '第 2 章：海洋中的資源與食鹽' }, { id: 3, name: '第 3 章：岩石與礦物' }] },
  { topicId: 'CHEM-02', topicName: 'CHEM-02 微觀世界 I', chapters: [{ id: 4, name: '第 4 章：原子結構' }, { id: 5, name: '第 5 章：元素週期表' }, { id: 6, name: '第 6 章：離子鍵' }, { id: 7, name: '第 7 章：共價鍵' }, { id: 8, name: '第 8 章：金屬鍵' }] },
  { topicId: 'CHEM-03', topicName: 'CHEM-03 金屬', chapters: [{ id: 9, name: '第 9 章：金屬的提取' }, { id: 10, name: '第 10 章：金屬反應活性' }, { id: 11, name: '第 11 章：金屬活性序與置換' }, { id: 12, name: '第 12 章：防銹' }, { id: 13, name: '第 13 章：摩爾計算' }] },
  { topicId: 'CHEM-04', topicName: 'CHEM-04 酸和鹽基', chapters: [{ id: 14, name: '第 14 章：酸鹼性質' }, { id: 15, name: '第 15 章：氫離子的角色' }, { id: 16, name: '第 16 章：pH 標度' }, { id: 17, name: '第 17 章：鹽的製備' }, { id: 18, name: '第 18 章：酸鹼滴定' }] },
  { topicId: 'CHEM-05', topicName: 'CHEM-05 化石燃料', chapters: [{ id: 19, name: '第 19 章：化石燃料' }, { id: 20, name: '第 20 章：烷烴' }, { id: 21, name: '第 21 章：烯烴' }, { id: 22, name: '第 22 章：加成聚合物' }, { id: 23, name: '第 23 章：其他碳化合物' }] },
  { topicId: 'CHEM-06', topicName: 'CHEM-06 微觀世界 II', chapters: [{ id: 24, name: '第 24 章：分子形狀' }, { id: 25, name: '第 25 章：分子極性' }, { id: 26, name: '第 26 章：分子間作用力' }, { id: 27, name: '第 27 章：結構與物理性質' }] },
  { topicId: 'CHEM-07', topicName: 'CHEM-07 氧化還原與電解', chapters: [{ id: 28, name: '第 28 章：氧化還原' }, { id: 29, name: '第 29 章：化學電池' }, { id: 30, name: '第 30 章：氧化劑與還原劑' }, { id: 31, name: '第 31 章：電解' }, { id: 32, name: '第 32 章：工業電解' }] },
  { topicId: 'CHEM-08', topicName: 'CHEM-08 化學反應與能量', chapters: [{ id: 33, name: '第 33 章：焓變' }, { id: 34, name: '第 34 章：標準焓變測定' }, { id: 35, name: '第 35 章：赫斯定律' }] },
  { topicId: 'CHEM-09', topicName: 'CHEM-09 反應速率', chapters: [{ id: 36, name: '第 36 章：反應速率' }, { id: 37, name: '第 37 章：影響因素' }, { id: 38, name: '第 38 章：碰撞理論' }, { id: 39, name: '第 39 章：催化劑' }] },
  { topicId: 'CHEM-10', topicName: 'CHEM-10 化學平衡', chapters: [{ id: 40, name: '第 40 章：動態平衡' }, { id: 41, name: '第 41 章：平衡常數 Kc' }, { id: 42, name: '第 42 章：勒沙特列原理' }] },
  { topicId: 'CHEM-11', topicName: 'CHEM-11 碳化合物的化學', chapters: [{ id: 43, name: '第 43 章：同分異構體' }, { id: 44, name: '第 44 章：烷烴與烯烴反應機制' }, { id: 45, name: '第 45 章：醇與鹵代烷' }, { id: 46, name: '第 46 章：醛與酮' }, { id: 47, name: '第 47 章：羧酸與酯' }, { id: 48, name: '第 48 章：有機合成' }] },
  { topicId: 'CHEM-12', topicName: 'CHEM-12 化學規律', chapters: [{ id: 49, name: '第 49 章：第三週期' }, { id: 50, name: '第 50 章：過渡金屬' }] },
  { topicId: 'CHEM-13', topicName: 'CHEM-13 工業化學', chapters: [{ id: 51, name: '第 51 章：速率方程' }, { id: 52, name: '第 52 章：阿倫尼烏斯方程' }, { id: 53, name: '第 53 章：哈柏法' }, { id: 54, name: '第 54 章：接觸法' }, { id: 55, name: '第 55 章：綠色化學' }] },
  { topicId: 'CHEM-14', topicName: 'CHEM-14 物料化學', chapters: [{ id: 56, name: '第 56 章：合金' }, { id: 57, name: '第 57 章：高分子材料' }, { id: 58, name: '第 58 章：現代材料' }, { id: 59, name: '第 59 章：納米材料' }, { id: 60, name: '第 60 章：物料回收' }] },
  { topicId: 'CHEM-15', topicName: 'CHEM-15 分析化學', chapters: [{ id: 61, name: '第 61 章：無機定性分析' }, { id: 62, name: '第 62 章：紅外光譜' }, { id: 63, name: '第 63 章：質譜' }, { id: 64, name: '第 64 章：色譜分析' }, { id: 65, name: '第 65 章：結構綜合鑑定' }] }
];

// 2. 全局狀態 (v0.0.29)
window.chemApp = {
  version: '0.0.29',
  currentLang: 'e', // 預設英文卷 (可於右上角切換中文卷/英文卷)
  activeChapterId: null,
  questionsDB: {},
  chapterCounts: {}, // 輕量化儲存各章題數
  userAnswers: {},   // 記錄每題作答狀態 { [questionId]: 'A' }
  debugLogs: { lastRawText: '', lastParsedQuestions: [], lastLoadedUrl: '' }
};

const CHAPTER_MAP = {};
SYLLABUS_CONFIG.forEach(t => t.chapters.forEach(c => { CHAPTER_MAP[c.id] = { topic: t, chapter: c }; }));

// 2.5 IndexedDB 儲存引擎 (解決 Base64 圖片撐爆 localStorage 5MB 的問題)
class ChemStorage {
  static dbPromise = null;

  static getDB() {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open('HKDSE_CHEM_QB_DB', 1);
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
      const counts = localStorage.getItem('CHEM_COUNTS_V29');
      if (counts) window.chemApp.chapterCounts = JSON.parse(counts);
      const ans = localStorage.getItem('CHEM_USER_ANS_V29');
      if (ans) window.chemApp.userAnswers = JSON.parse(ans);
      const savedLang = localStorage.getItem('CHEM_LANG_V29');
      if (savedLang === 'c' || savedLang === 'e') window.chemApp.currentLang = savedLang;
    } catch (e) {}
  }

  static saveMeta() {
    try {
      localStorage.setItem('CHEM_COUNTS_V29', JSON.stringify(window.chemApp.chapterCounts));
      localStorage.setItem('CHEM_USER_ANS_V29', JSON.stringify(window.chemApp.userAnswers));
      localStorage.setItem('CHEM_LANG_V29', window.chemApp.currentLang);
    } catch (e) {}
  }
}

// 3. 原生 DOM 塊導航器 (專為 Aristo Question Bank 設計：零破壞切題 + 自動分離 Answer 與解析)
class DocxQuestionParser {
  // 檢查是否為頁首、頁尾或無意義的核取方塊行
  static isHeaderFooterOrNoise(text) {
    const t = text.replace(/[\u25A1\u2610\u25A0\u25AA\uF06F□☐]/g, '').trim();
    if (!t) return true;
    const noisePatterns = [
      /^©\s*\d{4}\s*Aristo Educational Press Ltd\.?(?:\s*Chapter\s*\d+)?$/i,
      /^Chapter\s+\d+$/i,
      /^第\s*\d+\s*章$/,
      /^HKDSE NEW CHEMISTRY\s*[—\-–]\s*A Modern View(?:\s*Question Bank)?$/i,
      /^Question Bank$/i,
      /^Multiple-choice questions$/i,
      /^Part\s+[IVXLCDM]+\s+.*?(?:Multiple-choice questions)?$/i,
      /^香港中學文憑\s*現代化學/,
      /^問題庫$/,
      /^多項選擇題$/
    ];
    return noisePatterns.some(reg => reg.test(t));
  }

  // 清除節點內殘留的頁首頁尾字串與右側小方框 ☐
  static cleanNodeText(node) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    let n;
    while ((n = walker.nextNode())) {
      n.nodeValue = n.nodeValue
        .replace(/©\s*\d{4}\s*Aristo Educational Press Ltd\.?/gi, '')
        .replace(/HKDSE NEW CHEMISTRY\s*[—\-–]\s*A Modern View/gi, '')
        .replace(/Multiple-choice questions/gi, '')
        .replace(/Question Bank/gi, '')
        .replace(/[\u25A1\u2610\uF06F□☐]/g, '');
    }
  }

  static parseHtmlContent(rawHtml, chapId) {
    const container = document.createElement('div');
    container.innerHTML = rawHtml;

    // 取得頂層節點並清理雜訊
    const directChildren = Array.from(container.children);
    const hasChemMCQ = /ChemMCQ\s*\d+/i.test(container.textContent || '');

    // 嚴格題號判定：若有 ChemMCQ 則只認 ChemMCQ，絕不誤切 (1), (2), (3)！
    const regexHeader = hasChemMCQ
      ? /^(ChemMCQ\s*\d+)\b/i
      : /^(ChemMCQ\s*\d+|Question\s*\d+|Q\d+[\.、\)]|第\s*\d+\s*題)/i;

    const rawBlocks = [];
    let currentBlock = null;

    directChildren.forEach(child => {
      this.cleanNodeText(child);
      const text = (child.textContent || '').trim();
      const hasImg = child.querySelector('img') !== null;

      // 過濾掉沒有圖片的純頁首/頁尾/空行
      if (!hasImg && this.isHeaderFooterOrNoise(text)) {
        return;
      }

      const match = text.match(regexHeader);
      if (match) {
        if (currentBlock) {
          rawBlocks.push(currentBlock);
        }
        const qCode = match[1].replace(/\s+/g, '');
        currentBlock = { qCode: qCode, nodes: [] };

        // 如果該段落除了 ChemMCQ44043 之外還有題幹文字或圖片，保留剩餘內容
        const remainderText = text.slice(match[0].length).trim();
        if (remainderText.length > 0 || hasImg) {
          const cloned = child.cloneNode(true);
          cloned.innerHTML = cloned.innerHTML.replace(new RegExp(match[1], 'i'), '').trim();
          currentBlock.nodes.push(cloned);
        }
      } else {
        if (currentBlock) {
          currentBlock.nodes.push(child.cloneNode(true));
        }
      }
    });

    if (currentBlock) {
      rawBlocks.push(currentBlock);
    }

    // 分離每一題的「題幹 + A/B/C/D 選項」、「正確答案 (Answer: X)」與「後續解析 (保留 HTML 上下標)」
    const resultList = [];
    const ansRegex = /^(?:Answer|Ans|答案)\s*[:：]?\s*\(?([A-D])\)?(?:[\s\.、:：\-—]*(.*))?$/i;

    rawBlocks.forEach((block, idx) => {
      const stemDiv = document.createElement('div');
      const expDiv = document.createElement('div');
      let foundAnswer = false;
      let answerLetter = '';

      block.nodes.forEach(node => {
        const txt = (node.textContent || '').trim();
        const hasImg = node.querySelector('img') !== null;

        if (!foundAnswer) {
          const ansMatch = txt.match(ansRegex);
          if (ansMatch) {
            foundAnswer = true;
            answerLetter = ansMatch[1].toUpperCase();
            // 若 Answer: X 同一行後面直接緊跟解析文字，將其放入解析區
            if (ansMatch[2] && ansMatch[2].trim()) {
              const p = document.createElement('p');
              p.textContent = ansMatch[2].trim();
              expDiv.appendChild(p);
            }
            return;
          }

          // 美化題幹中的 A. B. C. D. 選項縮排與 (1) (2) (3) 間距（還原 Goodnotes 截圖排版）
          if (/^[A-D][\.\)]\s*/.test(txt)) {
            node.style.cssText = 'padding-left: 24px; margin: 4px 0;';
          } else if (/^\(\d+\)\s*/.test(txt)) {
            node.style.cssText = 'margin: 4px 0;';
          } else {
            node.style.cssText = 'margin: 6px 0;';
          }

          stemDiv.appendChild(node);
        } else {
          // 在 Answer: X 之後出現的所有段落（直到下一題 ChemMCQ 前），全部都是 Aristo 原生解析！
          if (txt.length > 0 || hasImg) {
            node.style.cssText = 'margin: 6px 0; line-height: 1.6;';
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
  static async extract(arrayBuffer, chapId) {
    if (typeof mammoth === 'undefined') {
      throw new Error('未找到 mammoth.js 套件，請確認已在 index.html 中引入。');
    }

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
    const questions = DocxQuestionParser.parseHtmlContent(rawHtml, chapId);

    window.chemApp.debugLogs.lastRawText = rawHtml;
    window.chemApp.debugLogs.lastParsedQuestions = questions;

    return questions;
  }
}

// 5. 章節開啟與渲染
async function openChapter(chapId, bypassCache = false) {
  window.chemApp.activeChapterId = chapId;
  const lookup = CHAPTER_MAP[chapId];
  if (!lookup) return;

  // 自動展開對應的左側大課題選單並高亮當前章節
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

  const titleEl = document.getElementById('currentChapterTitle');
  if (titleEl) titleEl.textContent = lookup.chapter.name;

  const container = document.getElementById('questionList');
  const dbKey = `${window.chemApp.currentLang}_${chapId}`;

  // 1. 優先檢查記憶體與 IndexedDB 快取
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

  // 2. 從 GitHub Pages / 本地 ./docs/ 資料夾抓取 DOCX
  const pad = String(chapId).padStart(2, '0');
  const lang = window.chemApp.currentLang;
  const urls = [
    `./docs/chemqb_ch${pad}_mcq_${lang}.docx`,
    `./docs/chemqb_ch${chapId}_mcq_${lang}.docx`,
    `docs/chemqb_ch${pad}_mcq_${lang}.docx`,
    `docs/chemqb_ch${chapId}_mcq_${lang}.docx`
  ];

  container.innerHTML = `<div style="text-align:center; padding:48px 0; color:#666;">正在載入並解析 <code>chemqb_ch${pad}_mcq_${lang}.docx</code> ...</div>`;

  let arrayBuffer = null;
  for (const u of urls) {
    try {
      const res = await fetch(u, { cache: bypassCache ? 'reload' : 'default' });
      if (res.ok) {
        arrayBuffer = await res.arrayBuffer();
        window.chemApp.debugLogs.lastLoadedUrl = u;
        break;
      }
    } catch (e) {}
  }

  if (!arrayBuffer) {
    container.innerHTML = `
      <div style="text-align:center; padding:48px; color:#e53935; background:#fff; border-radius:8px; border:1px solid #ffcdd2;">
        <div style="font-size:16px; font-weight:bold; margin-bottom:8px;">找不到 DOCX 題庫檔案</div>
        <div style="font-size:13px; color:#666;">請確認 GitHub 儲存庫的 <code>./docs/</code> 資料夾內已上傳：<br/><code>chemqb_ch${pad}_mcq_${lang}.docx</code>（注意 GitHub Pages 區分大小寫）</div>
      </div>`;
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
    container.innerHTML = `<div style="color:#e53935; padding:32px;">解析 DOCX 失敗：${err.message}</div>`;
  }
}

// 6. 渲染題目卡片 (100% 還原 Goodnotes 題庫視覺與遮罩自測體驗)
function renderQuestions(qList, chapId) {
  const container = document.getElementById('questionList');
  container.innerHTML = '';

  const chapStats = document.getElementById('chapterStats');
  if (chapStats) {
    chapStats.innerHTML = `
      <span>共 ${qList.length} 題 (${window.chemApp.currentLang === 'c' ? '中文卷' : '英文卷'})</span>
      <button id="reloadChapBtn" style="margin-left:12px; padding:3px 8px; font-size:12px; border:1px solid #ccc; border-radius:4px; background:#fff; cursor:pointer; color:#555;" title="強制重新讀取 DOCX 並清除本章作答紀錄">🔄 重新載入本章</button>
    `;
    const reloadBtn = document.getElementById('reloadChapBtn');
    if (reloadBtn) {
      reloadBtn.onclick = () => {
        qList.forEach(q => delete window.chemApp.userAnswers[q.id]);
        ChemStorage.saveMeta();
        openChapter(chapId, true);
      };
    }
  }

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.style.cssText = 'background:#fff; border-radius:8px; padding:24px 28px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.06); border:1px solid #e0e0e0; font-family:"Times New Roman", "Noto Serif TC", "PMingLiU", serif;';

    const hasExplanation = q.explanationHtml && q.explanationHtml.length > 0;

    card.innerHTML = `
      <div class="q-header" style="margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
        <span class="q-number" style="color:#111; font-weight:bold; font-size:16px; font-family:Arial, sans-serif;">${q.qNumDisplay || `Q${index + 1}`}</span>
        <span style="font-size:12px; color:#888; font-family:sans-serif;">#${index + 1} / ${qList.length}</span>
      </div>
      <div class="q-native-body" style="line-height:1.65; font-size:16px; color:#111; overflow-x:auto;">
        ${q.htmlContent}
      </div>
      <div class="interactive-action-bar" style="margin-top:18px; padding-top:14px; border-top:1px dashed #ddd; font-family:sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-weight:bold; color:#555; font-size:13px;">請選擇答案：</span>
          <button class="peek-ans-btn" style="border:none; background:transparent; color:#1a73e8; font-size:12px; cursor:pointer; padding:2px 6px;">👁️ 顯示/隱藏解析</button>
        </div>
        <div class="options-btn-group" style="display:flex; gap:10px;">
          ${['A', 'B', 'C', 'D'].map(k => `
            <button class="opt-act-btn" data-opt="${k}" style="flex:1; padding:9px; border:1px solid #1a73e8; border-radius:6px; background:#fff; color:#1a73e8; font-weight:bold; cursor:pointer; font-size:14px; transition:all 0.15s;">
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

    // 圖片樣式控制：讓化學結構式置中且比例適中（如同 Goodnotes 原稿視覺）
    card.querySelectorAll('img').forEach(img => {
      img.style.maxWidth = '85%';
      img.style.maxHeight = '220px';
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

    // 若之前已作答過，恢復作答狀態
    if (window.chemApp.userAnswers[q.id]) {
      applyAnswerUI(window.chemApp.userAnswers[q.id]);
    }

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.dataset.opt;
        window.chemApp.userAnswers[q.id] = chosen;
        ChemStorage.saveMeta();
        applyAnswerUI(chosen);
      });
    });

    peekBtn.addEventListener('click', () => {
      const isHidden = expPanel.style.display === 'none';
      expPanel.style.display = isHidden ? 'block' : 'none';
    });

    container.appendChild(card);
  });

  if (typeof renderMathInElement === 'function') {
    try {
      renderMathInElement(container, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
        throwOnError: false
      });
    } catch (e) {}
  }
}

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
}

// 7. 保證章節選單 100% 正常展開/收起
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
}

// 8. 初始化 UI 與頂部版本號 v0.0.29
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

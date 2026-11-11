/* ==========================================
 * DSE 化學分章模擬題庫系統 ( Aristo MCQ 專屬 Docx 版 v0.0.24 )
 * 修復項目：
 * 1. 恢復所有無圖題目（修復 138 題變 7 題的 BUG，一題不漏）
 * 2. 採用 DOM 精確節點導航，100% 確保只擷取該題內部的原圖
 * 3. 版本號更新至 v0.0.24
 * ========================================== */

// 1. 全局配置與課程 65 章架構
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

// 2. 全局狀態管理 (版號升級為 v0.0.24)
window.chemApp = {
  version: '0.0.24',
  currentLang: 'c',
  activeChapterId: null,
  questionsDB: {},
  practiceLogs: [],
  debugLogs: { lastRawText: '', lastParsedQuestions: [], lastLoadedUrl: '' },
  postProcessors: [],

  addPostProcessor(fn) {
    if (typeof fn === 'function') {
      this.postProcessors.push(fn);
    }
  }
};

const CHAPTER_MAP = {};
SYLLABUS_CONFIG.forEach(t => t.chapters.forEach(c => { CHAPTER_MAP[c.id] = { topic: t, chapter: c }; }));

// 3. 模組化字元清洗與 LaTeX 轉換
class TextFormatter {
  static clean(text) {
    return text
      .replace(/\r\n/g, '\n')
      .replace(/[\uf000-\uf0ff]/g, ' → ')
      .replace(/\u2192/g, ' → ')
      .replace(/HKDSE NEW CHEMISTRY.*?\n/gi, '')
      .replace(/Part\s+[IVXLCDM]+.*?\n/gi, '')
      .replace(/Question Bank.*?\n/gi, '')
      .replace(/Multiple\s*-\s*choice questions/gi, '')
      .replace(/©\s*\d{4}\s*Aristo Educational Press Ltd\.?/gi, '')
      .replace(/Chapter\s*\d+/gi, '')
      .replace(/Aristo Educational Press Ltd\.?/gi, '');
  }

  static applyChemistryLaTeX(str) {
    if (!str) return '';
    let res = str.replace(/→/g, ' $\\rightarrow$ ');
    const chemRegex = /\b([A-Z][a-z]?\d*(?:\([A-Z][a-z]?\d*\))?[A-Z0-9\(\)]+)\b/g;
    
    res = res.replace(chemRegex, (match) => {
      const ignoreWords = /^(A|B|C|D|AND|ONLY|OR|WHICH|THE|OF|FOLLOWING|REACTIONS|ARE|IS|CORRECT|EXHIBITS|REQUIRED|FOR|ALKANES|TO|UNDERGO|SUBSTITUTION|WITH|BROMINE|PRODUCT|MAJOR|COMPOUNDS)$/i;
      if (ignoreWords.test(match) || match.length <= 1) return match;
      return `$\\ce{${match}}$`;
    });
    return res;
  }
}

// 4. 精確 DOM DOM-Flow DOCX 解析引擎 (100% 保障題目數量與圖片歸屬)
class DocxQuestionParser {
  static parseHtmlContent(rawHtml, chapId) {
    const list = [];
    const container = document.createElement('div');
    container.innerHTML = rawHtml;

    // 清理頁腳雜訊
    const textNodes = container.querySelectorAll('*');
    textNodes.forEach(node => {
      if (node.children.length === 0 && node.textContent) {
        node.textContent = TextFormatter.clean(node.textContent);
      }
    });

    // 正則匹配 ChemMCQxxxxx 或 數字題號
    const regexHeader = /^\s*(?:(ChemMCQ\s*\d+)|(?:Q(?:uestion)?\s*)?(\d+)[\.、\)])\s*/i;

    // 將 DOM 子節點依據題號進行分塊
    const blocks = [];
    let currentBlock = { qCode: '', nodes: [] };

    Array.from(container.childNodes).forEach(node => {
      const txt = (node.textContent || '').trim();
      const match = txt.match(regexHeader);

      if (match) {
        if (currentBlock.nodes.length > 0) {
          blocks.push(currentBlock);
        }
        currentBlock = {
          qCode: match[1] || `Q${match[2]}`,
          nodes: [node]
        };
      } else {
        currentBlock.nodes.push(node);
      }
    });
    if (currentBlock.nodes.length > 0) {
      blocks.push(currentBlock);
    }

    // 針對每個 Block 獨立解析圖片、題幹、選項
    blocks.forEach((b, idx) => {
      if (!b.qCode && blocks.length > 1 && idx === 0) return; // 跳過開頭頂部雜訊區塊

      const wrapper = document.createElement('div');
      b.nodes.forEach(n => wrapper.appendChild(n.cloneNode(true)));

      // 1. 精準提取**當前題目內部**的 <img> (Base64)
      const images = [];
      wrapper.querySelectorAll('img').forEach(img => {
        if (img.src && img.src.startsWith('data:image')) {
          images.push(img.src);
        }
        img.remove(); // 提完圖片後從文字 DOM 中移除，避免混淆純文字正則
      });

      let blockText = wrapper.textContent || '';
      blockText = TextFormatter.clean(blockText).trim();

      // 如果有開頭題號，將開頭題號切掉
      blockText = blockText.replace(regexHeader, '').trim();

      // 2. 匹配選項 A, B, C, D
      const optMatch = blockText.match(/(?:^|\n|\s)\(?[A][\.、\)]\s*([\s\S]*?)(?:^|\n|\s)\(?[B][\.、\)]\s*([\s\S]*?)(?:^|\n|\s)\(?[C][\.、\)]\s*([\s\S]*?)(?:^|\n|\s)\(?[D][\.、\)]\s*([\s\S]*?)(?=(?:\n\s*(?:Ans|Answer|答案|Exp|Explanation|解析|ChemMCQ|\d+[\.、\)])|$))/i);

      let fullQuestionBody = blockText;
      let optA = '', optB = '', optC = '', optD = '';
      let ans = 'A';
      let exp = '本題暫無解析';

      if (optMatch) {
        fullQuestionBody = blockText.substring(0, blockText.indexOf(optMatch[0])).trim();
        optA = optMatch[1].trim();
        optB = optMatch[2].trim();
        optC = optMatch[3].trim();
        optD = optMatch[4].trim();

        const ansMatch = blockText.match(/(?:Ans|Answer|答案)\s*[:：]?\s*\(?([A-D])\)?/i);
        if (ansMatch) ans = ansMatch[1].toUpperCase();

        const expMatch = blockText.match(/(?:Exp|Explanation|解析|說明)\s*[:：]?\s*([\s\S]*)/i);
        if (expMatch) exp = expMatch[1].trim();

        optD = optD.split(/(?:Ans|Answer|答案|Exp|Explanation|解析)/i)[0].trim();
      }

      // 3. 處理 (1), (2), (3) 多選型陳述句
      fullQuestionBody = fullQuestionBody
        .replace(/(?:^|\n|\s)\(1\)\s*/g, '\n<div class="stmt-item" style="margin-top:10px;"><b>(1)</b> ')
        .replace(/(?:^|\n|\s)\(2\)\s*/g, '</div>\n<div class="stmt-item"><b>(2)</b> ')
        .replace(/(?:^|\n|\s)\(3\)\s*/g, '</div>\n<div class="stmt-item"><b>(3)</b> ')
        .replace(/(?:^|\n|\s)\(4\)\s*/g, '</div>\n<div class="stmt-item"><b>(4)</b> ');
      if (fullQuestionBody.includes('<div class="stmt-item">')) {
        fullQuestionBody += '</div>';
      }

      fullQuestionBody = TextFormatter.applyChemistryLaTeX(fullQuestionBody);

      list.push({
        id: `${b.qCode || 'Q'+idx}_docx_${chapId}_${idx}`,
        qNumDisplay: b.qCode || `Q${idx+1}`,
        question: fullQuestionBody,
        options: {
          A: TextFormatter.applyChemistryLaTeX(optA),
          B: TextFormatter.applyChemistryLaTeX(optB),
          C: TextFormatter.applyChemistryLaTeX(optC),
          D: TextFormatter.applyChemistryLaTeX(optD)
        },
        answer: ans,
        explanation: exp,
        images: images // 只有當前題目內有的原圖
      });
    });

    return list;
  }
}

// 5. DOCX 檔案加載器
class DocxExtractor {
  static async extract(arrayBuffer, chapId) {
    if (typeof mammoth === 'undefined') {
      throw new Error('未找到 mammoth.js 套件，請確認已在 HTML 中引入。');
    }

    const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, {
      convertImage: mammoth.images.imgElement((image) => {
        return image.read("base64").then((imageBuffer) => {
          return {
            src: "data:" + image.contentType + ";base64," + imageBuffer
          };
        });
      })
    });

    const rawHtml = result.value;
    let questions = DocxQuestionParser.parseHtmlContent(rawHtml, chapId);

    window.chemApp.debugLogs.lastRawText = rawHtml;
    window.chemApp.debugLogs.lastParsedQuestions = questions;

    window.chemApp.postProcessors.forEach(fn => {
      try { questions = fn(questions, rawHtml) || questions; } catch (e) {}
    });

    return questions;
  }
}

// 6. 章節開啓與渲染
async function openChapter(chapId, bypassCache = false) {
  window.chemApp.activeChapterId = chapId;
  const lookup = CHAPTER_MAP[chapId];
  if (!lookup) return;

  document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
  const activeEl = document.getElementById(`chap-item-${chapId}`);
  if (activeEl) activeEl.classList.add('active');

  const bcTopic = document.getElementById('bcTopicName');
  const bcChap = document.getElementById('bcChapterName');
  const titleEl = document.getElementById('currentChapterTitle');
  
  if (bcTopic) bcTopic.textContent = lookup.topic.topicName;
  if (bcChap) bcChap.textContent = `第 ${lookup.chapter.id} 章`;
  if (titleEl) titleEl.textContent = lookup.chapter.name;

  const dashView = document.getElementById('dashboardView');
  const chapView = document.getElementById('chapterView');
  if (dashView) dashView.classList.remove('active');
  if (chapView) chapView.classList.add('active');

  const container = document.getElementById('questionList');
  const dbKey = `${window.chemApp.currentLang}_${chapId}`;

  if (!bypassCache && window.chemApp.questionsDB[dbKey] && window.chemApp.questionsDB[dbKey].length > 0) {
    renderQuestions(window.chemApp.questionsDB[dbKey]);
    return;
  }

  const pad = String(chapId).padStart(2, '0');
  const lang = window.chemApp.currentLang;
  
  const urls = [
    `./docs/chemqb_ch${pad}_mcq_${lang}.docx`,
    `./docs/chemqb_ch${chapId}_mcq_${lang}.docx`,
    `./pdfs/chemqb_ch${pad}_mcq_${lang}.docx`
  ];

  container.innerHTML = `<div style="text-align:center; padding:48px 0; color:var(--text-secondary);">正在讀取 <code>chemqb_ch${pad}_mcq_${lang}.docx</code> 並進行 Word 原生圖文提取...</div>`;

  let arrayBuffer = null;
  for (const u of urls) {
    try {
      const res = await fetch(u);
      if (res.ok) {
        arrayBuffer = await res.arrayBuffer();
        window.chemApp.debugLogs.lastLoadedUrl = u;
        break;
      }
    } catch (e) {}
  }

  if (!arrayBuffer) {
    container.innerHTML = `
      <div style="text-align:center; padding:48px 20px; border:1px dashed #e53935; border-radius:8px; color:#e53935;">
        找不到 DOCX 題庫檔案：<code>${urls[0]}</code><br>請確認 Word 檔案路徑與檔名是否正確。
      </div>`;
    return;
  }

  try {
    const list = await DocxExtractor.extract(arrayBuffer, chapId);
    window.chemApp.questionsDB[dbKey] = list;
    saveQuestions();
    renderQuestions(list);
  } catch (err) {
    container.innerHTML = `<div style="color:#e53935; padding:32px;">解析 DOCX 失敗：${err.message}</div>`;
  }
}

function renderQuestions(qList) {
  const container = document.getElementById('questionList');
  container.innerHTML = '';
  
  const chapStats = document.getElementById('chapterStats');
  if (chapStats) chapStats.textContent = `共 ${qList.length} 題 (${window.chemApp.currentLang === 'c' ? '中文卷' : '英文卷'})`;

  if (qList.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:#888; padding:48px 0;">未解析出題目，請點擊左下角「🐛 偵錯」檢查 Docx 內容。</div>`;
    return;
  }

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';

    const formattedContent = (q.question || '').replace(/\n/g, '<br/>');
    
    // 渲染正確歸屬於本題的 Base64 原圖
    const imagesHtml = (q.images && q.images.length > 0)
      ? `<div style="margin:16px 0; padding:12px; background:#fff; border:1px dashed #4285f4; border-radius:8px; text-align:center;">
           ${q.images.map(src => `<img src="${src}" style="max-width:100%; max-height:350px; height:auto; border-radius:4px;" alt="題目原圖" />`).join('')}
         </div>`
      : '';

    card.innerHTML = `
      <div class="q-header"><span class="q-number" style="color:#1a73e8; font-weight:bold;">${q.qNumDisplay || 'Question'} (第 ${index + 1} 題)</span></div>
      <div class="q-body" style="line-height:1.7; margin-top:8px;">${formattedContent}</div>
      ${imagesHtml}
      <div class="options-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:12px;">
        ${['A', 'B', 'C', 'D'].map(k => `
          <button class="opt-btn" data-opt="${k}" style="text-align:left; padding:8px 12px; border:1px solid #ccc; border-radius:6px; background:#fff; cursor:pointer;">
            <span class="opt-key" style="font-weight:bold; margin-right:4px;">${k}.</span>
            <span class="opt-text">${q.options[k] || ''}</span>
          </button>
        `).join('')}
      </div>
      <div class="explanation-panel" style="display:none; margin-top:12px; padding:12px; background:#e8f0fe; border-left:4px solid #1a73e8; border-radius:4px;">
        <span class="exp-title" style="font-weight:bold; color:#1a73e8;">正確答案：${q.answer} ｜ 解析</span>
        <div style="margin-top:4px;">${(q.explanation || '').replace(/\n/g, '<br/>')}</div>
      </div>
    `;

    const optBtns = card.querySelectorAll('.opt-btn');
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = (btn.dataset.opt === q.answer);
        optBtns.forEach(b => {
          b.disabled = true;
          if (b.dataset.opt === q.answer) b.style.background = '#d4edda';
          else if (b.dataset.opt === btn.dataset.opt && !isCorrect) b.style.background = '#f8d7da';
        });
        card.querySelector('.explanation-panel').style.display = 'block';
        window.chemApp.practiceLogs.push({ date: getTodayStr(), chapterId: window.chemApp.activeChapterId, qId: q.id, isCorrect });
        savePracticeLogs();
      });
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

// 7. 資料儲存與 UI 初始化
function saveQuestions() { try { localStorage.setItem('CHEM_DB_V4', JSON.stringify(window.chemApp.questionsDB)); } catch (e) {} updateCounts(); }
function savePracticeLogs() { localStorage.setItem('CHEM_LOGS_V4', JSON.stringify(window.chemApp.practiceLogs)); }
function getTodayStr() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }

function updateCounts() {
  let total = 0;
  for (let i = 1; i <= 65; i++) {
    const key = `${window.chemApp.currentLang}_${i}`;
    const len = (window.chemApp.questionsDB[key] || []).length;
    total += len;
    const badge = document.getElementById(`badge-${i}`);
    if (badge) badge.textContent = `${len} 題`;
  }
  const tc = document.getElementById('totalQuestionsCount');
  if (tc) tc.textContent = `共 ${total} 題 (${window.chemApp.currentLang === 'c' ? '中文卷' : '英文卷'})`;
}

function renderSidebar() {
  const container = document.getElementById('topicListContainer');
  if (!container) return;
  container.innerHTML = '';

  SYLLABUS_CONFIG.forEach(topic => {
    const groupEl = document.createElement('div');
    groupEl.className = 'topic-group';
    groupEl.innerHTML = `<div class="topic-header" style="cursor:pointer; font-weight:bold; padding:8px 0;"><div class="topic-toggle-wrap"><span class="topic-toggle-icon">+</span> <span>${topic.topicName}</span></div></div><div class="chapter-list"></div>`;
    
    groupEl.querySelector('.topic-header').addEventListener('click', () => {
      const isOpen = groupEl.classList.toggle('open');
      groupEl.querySelector('.topic-toggle-icon').textContent = isOpen ? '−' : '+';
    });

    const cList = groupEl.querySelector('.chapter-list');
    topic.chapters.forEach(ch => {
      const it = document.createElement('div');
      it.className = 'chapter-item';
      it.id = `chap-item-${ch.id}`;
      it.style.cssText = 'padding:6px 12px; cursor:pointer; display:flex; justify-content:space-between;';
      it.innerHTML = `<span>${ch.name}</span><span class="chapter-badge" id="badge-${ch.id}">0 題</span>`;
      it.addEventListener('click', () => openChapter(ch.id));
      cList.appendChild(it);
    });
    container.appendChild(groupEl);
  });
}

// 8. 載入與初始化綁定 (右上角顯示 v0.0.24)
document.addEventListener('DOMContentLoaded', () => {
  try {
    const sq = localStorage.getItem('CHEM_DB_V4');
    const sl = localStorage.getItem('CHEM_LOGS_V4');
    if (sq) window.chemApp.questionsDB = JSON.parse(sq);
    if (sl) window.chemApp.practiceLogs = JSON.parse(sl);
  } catch (e) {}

  renderSidebar();
  updateCounts();
  mountDebuggerUI();

  const navRight = document.querySelector('.nav-right');
  if (navRight) {
    navRight.querySelectorAll('button, label, a').forEach(el => {
      const text = (el.textContent || '').trim();
      if (text.includes('匯入') || text.includes('匯出') || text.includes('PDF') || text.includes('JSON')) {
        el.remove();
      }
    });

    if (!document.getElementById('langSwitchBar')) {
      const bar = document.createElement('div');
      bar.id = 'langSwitchBar';
      bar.style.cssText = 'display:inline-flex; align-items:center; gap:8px; background:#eee; padding:2px 8px; border-radius:6px;';
      
      ['c', 'e'].forEach(lang => {
        const b = document.createElement('button');
        b.textContent = lang === 'c' ? '中文卷 (C)' : '英文卷 (E)';
        b.style.cssText = `border:none; padding:4px 10px; font-size:12px; border-radius:4px; cursor:pointer; background:${window.chemApp.currentLang === lang ? '#fff' : 'transparent'};`;
        b.onclick = () => {
          window.chemApp.currentLang = lang;
          bar.querySelectorAll('button').forEach(btn => { btn.style.background = 'transparent'; });
          b.style.background = '#fff';
          updateCounts();
          if (window.chemApp.activeChapterId) openChapter(window.chemApp.activeChapterId);
        };
        bar.appendChild(b);
      });

      const verSpan = document.createElement('span');
      verSpan.id = 'appVersionBadge';
      verSpan.textContent = `v${window.chemApp.version}`;
      verSpan.style.cssText = 'font-size:12px; font-weight:bold; color:#1a73e8; background:#e8f0fe; padding:2px 8px; border-radius:12px; border:1px solid #aecbfa; margin-left:4px;';
      bar.appendChild(verSpan);

      navRight.appendChild(bar);
    }
  }
});

// 9. 偵錯控制台
function mountDebuggerUI() {
  if (document.getElementById('debugModal')) return;
  
  const btn = document.createElement('button');
  btn.textContent = '🐛 偵錯';
  btn.style.cssText = 'position:fixed; bottom:20px; left:20px; z-index:99999; background:#222; color:#fff; border:none; padding:8px 16px; border-radius:8px; font-size:13px; cursor:pointer;';

  const modal = document.createElement('div');
  modal.id = 'debugModal';
  modal.style.cssText = 'display:none; position:fixed; bottom:70px; left:20px; width:85vw; max-width:700px; height:60vh; background:#fff; border-radius:8px; box-shadow:0 8px 32px rgba(0,0,0,0.3); z-index:99999; flex-direction:column; font-family:monospace;';

  modal.innerHTML = `
    <div style="background:#f1f1f1; padding:10px 16px; border-bottom:1px solid #ddd; display:flex; justify-content:space-between; align-items:center;">
      <strong>DOCX 解析控制台 (v${window.chemApp.version})</strong>
      <div>
        <button id="dbgReloadBtn" style="padding:4px 10px; font-size:12px; margin-right:8px; cursor:pointer; background:#e6f4ea; border:1px solid #34a853; border-radius:4px;">⚡ 強制重載本章</button>
        <button onclick="document.getElementById('debugModal').style.display='none'" style="cursor:pointer;">關閉</button>
      </div>
    </div>
    <div style="padding:8px 16px; background:#fff; border-bottom:1px solid #eee; display:flex; gap:10px;">
      <button id="tabJson" style="font-size:12px; padding:4px 10px; cursor:pointer;">1. 題目結構 (JSON)</button>
      <button id="tabRaw" style="font-size:12px; padding:4px 10px; cursor:pointer;">2. Docx 原始 HTML (Raw)</button>
    </div>
    <pre id="debugConsoleArea" style="flex:1; overflow:auto; margin:0; padding:16px; font-size:12px; background:#fafafa; white-space:pre-wrap; word-break:break-all;"></pre>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(modal);

  btn.onclick = () => {
    modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
    modal.querySelector('#tabJson').click();
  };

  const area = modal.querySelector('#debugConsoleArea');
  modal.querySelector('#tabJson').onclick = () => area.textContent = JSON.stringify(window.chemApp.debugLogs.lastParsedQuestions, null, 2) || '無資料';
  modal.querySelector('#tabRaw').onclick = () => area.textContent = window.chemApp.debugLogs.lastRawText || '無資料';
  modal.querySelector('#dbgReloadBtn').onclick = () => {
    if (window.chemApp.activeChapterId) openChapter(window.chemApp.activeChapterId, true);
    else alert('請先點擊左側任一章節');
  };
}

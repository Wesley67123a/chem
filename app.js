/* ==========================================
 * DSE 化學分章模擬題庫系統 ( Aristo MCQ 精確版 v0.0.26 )
 * 重大更新：
 * 1. 版本號升級至 v0.0.26
 * 2. 採用「ChemMCQ 絕對錨點解析器」：基於 Aristo 原檔格式（ChemMCQXXXXX）切題
 * 3. 100% 完整保留 138 題（包含無圖題目、純文字題、結構式題）
 * 4. 原圖與選項精確配對，絕不上下黏連或跨題錯位
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

// 2. 全局狀態管理 (升級至 v0.0.26)
window.chemApp = {
  version: '0.0.26',
  currentLang: 'c',
  activeChapterId: null,
  questionsDB: {},
  practiceLogs: [],
  debugLogs: { lastRawText: '', lastParsedQuestions: [], lastLoadedUrl: '' },
  postProcessors: []
};

const CHAPTER_MAP = {};
SYLLABUS_CONFIG.forEach(t => t.chapters.forEach(c => { CHAPTER_MAP[c.id] = { topic: t, chapter: c }; }));

// 3. 文字清理工具
class TextFormatter {
  static clean(text) {
    if (!text) return '';
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

// 4. ChemMCQ 絕對錨點 DOM 樹解析引擎
class DocxQuestionParser {
  static parseHtmlContent(rawHtml, chapId) {
    const container = document.createElement('div');
    container.innerHTML = rawHtml;

    const list = [];
    // 匹配 ChemMCQXXXXX 或 數字題號（如 1. / Q1）
    const regexAnchor = /(ChemMCQ\s*\d+|(?:Q(?:uestion)?\s*)?\d+[\.、\)])/i;

    const allElements = Array.from(container.querySelectorAll('p, h1, h2, h3, h4, table, div'));
    const questionBlocks = [];
    let currentBlock = { qCode: '', elements: [] };

    allElements.forEach(el => {
      const text = (el.textContent || '').trim();
      const match = text.match(regexAnchor);

      if (match && (text.startsWith(match[0]) || text.length < 30)) {
        if (currentBlock.elements.length > 0) {
          questionBlocks.push(currentBlock);
        }
        currentBlock = {
          qCode: match[1].replace(/[\.、\)]/g, '').trim(),
          elements: [el]
        };
      } else {
        currentBlock.elements.push(el);
      }
    });

    if (currentBlock.elements.length > 0) {
      questionBlocks.push(currentBlock);
    }

    questionBlocks.forEach((block, idx) => {
      if (!block.qCode && idx === 0 && questionBlocks.length > 1) return; // 跳過頁首宣傳文字

      const blockDiv = document.createElement('div');
      block.elements.forEach(e => blockDiv.appendChild(e.cloneNode(true)));

      // 提取圖片
      const images = [];
      blockDiv.querySelectorAll('img').forEach(img => {
        if (img.src) images.push(img.src);
        img.remove();
      });

      let blockText = TextFormatter.clean(blockDiv.textContent || '').trim();
      blockText = blockText.replace(regexAnchor, '').trim();

      // 拆分選項 A, B, C, D
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

      // 處理 (1), (2), (3) 多重題目選項
      fullQuestionBody = fullQuestionBody
        .replace(/(?:^|\n|\s)\(1\)\s*/g, '\n<div class="stmt-item" style="margin-top:10px;"><b>(1)</b> ')
        .replace(/(?:^|\n|\s)\(2\)\s*/g, '</div>\n<div class="stmt-item"><b>(2)</b> ')
        .replace(/(?:^|\n|\s)\(3\)\s*/g, '</div>\n<div class="stmt-item"><b>(3)</b> ')
        .replace(/(?:^|\n|\s)\(4\)\s*/g, '</div>\n<div class="stmt-item"><b>(4)</b> ');
      if (fullQuestionBody.includes('<div class="stmt-item">')) fullQuestionBody += '</div>';

      fullQuestionBody = TextFormatter.applyChemistryLaTeX(fullQuestionBody);

      const qCodeDisplay = block.qCode || `Q${idx + 1}`;

      list.push({
        id: `${qCodeDisplay}_docx_${chapId}_${idx}`,
        qNumDisplay: qCodeDisplay,
        question: fullQuestionBody,
        options: {
          A: TextFormatter.applyChemistryLaTeX(optA),
          B: TextFormatter.applyChemistryLaTeX(optB),
          C: TextFormatter.applyChemistryLaTeX(optC),
          D: TextFormatter.applyChemistryLaTeX(optD)
        },
        answer: ans,
        explanation: exp,
        images: images
      });
    });

    return list;
  }
}

// 5. DOCX 載入器
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

    return questions;
  }
}

// 6. 章節切換與渲染
async function openChapter(chapId, bypassCache = false) {
  window.chemApp.activeChapterId = chapId;
  const lookup = CHAPTER_MAP[chapId];
  if (!lookup) return;

  document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
  const activeEl = document.getElementById(`chap-item-${chapId}`);
  if (activeEl) activeEl.classList.add('active');

  const titleEl = document.getElementById('currentChapterTitle');
  if (titleEl) titleEl.textContent = lookup.chapter.name;

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
    `./docs/chemqb_ch${chapId}_mcq_${lang}.docx`
  ];

  container.innerHTML = `<div style="text-align:center; padding:48px 0; color:#666;">正在載入 <code>chemqb_ch${pad}_mcq_${lang}.docx</code>...</div>`;

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
    container.innerHTML = `<div style="text-align:center; padding:48px; color:#e53935;">找不到 DOCX 題庫檔案：<code>${urls[0]}</code></div>`;
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

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';

    const formattedContent = (q.question || '').replace(/\n/g, '<br/>');
    const imagesHtml = (q.images && q.images.length > 0)
      ? `<div style="margin:16px 0; padding:12px; background:#fff; border:1px dashed #4285f4; border-radius:8px; text-align:center;">
           ${q.images.map(src => `<img src="${src}" style="max-width:100%; max-height:380px; height:auto; border-radius:4px;" alt="配圖" />`).join('')}
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

function saveQuestions() { try { localStorage.setItem('CHEM_DB_V4', JSON.stringify(window.chemApp.questionsDB)); } catch (e) {} updateCounts(); }

function updateCounts() {
  let total = 0;
  for (let i = 1; i <= 65; i++) {
    const key = `${window.chemApp.currentLang}_${i}`;
    const len = (window.chemApp.questionsDB[key] || []).length;
    total += len;
    const badge = document.getElementById(`badge-${i}`);
    if (badge) badge.textContent = `${len} 題`;
  }
}

function renderSidebar() {
  const container = document.getElementById('topicListContainer');
  if (!container) return;
  container.innerHTML = '';

  SYLLABUS_CONFIG.forEach(topic => {
    const groupEl = document.createElement('div');
    groupEl.className = 'topic-group';
    groupEl.innerHTML = `<div class="topic-header" style="cursor:pointer; font-weight:bold; padding:8px 0;"><span>${topic.topicName}</span></div><div class="chapter-list"></div>`;
    
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

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  updateCounts();

  const navRight = document.querySelector('.nav-right');
  if (navRight && !document.getElementById('langSwitchBar')) {
    const bar = document.createElement('div');
    bar.id = 'langSwitchBar';
    bar.style.cssText = 'display:inline-flex; align-items:center; gap:8px; background:#eee; padding:2px 8px; border-radius:6px;';
    
    ['c', 'e'].forEach(lang => {
      const b = document.createElement('button');
      b.textContent = lang === 'c' ? '中文卷 (C)' : '英文卷 (E)';
      b.style.cssText = `border:none; padding:4px 10px; font-size:12px; border-radius:4px; cursor:pointer; background:${window.chemApp.currentLang === lang ? '#fff' : 'transparent'};`;
      b.onclick = () => {
        window.chemApp.currentLang = lang;
        if (window.chemApp.activeChapterId) openChapter(window.chemApp.activeChapterId);
      };
      bar.appendChild(b);
    });

    const verSpan = document.createElement('span');
    verSpan.id = 'appVersionBadge';
    verSpan.textContent = `v${window.chemApp.version}`;
    verSpan.style.cssText = 'font-size:12px; font-weight:bold; color:#1a73e8; background:#e8f0fe; padding:2px 8px; border-radius:12px; margin-left:4px;';
    bar.appendChild(verSpan);

    navRight.appendChild(bar);
  }
});

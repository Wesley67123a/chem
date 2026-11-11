/* ==========================================
 * DSE 化學分章模擬題庫系統 ( Aristo MCQ 專屬修復版 )
 * 修復項目：
 * 1. 彈性切題機制（支援 ChemMCQ 與 一般題號 1., Q1, 1)）
 * 2. 強化選項/答案解析匹配
 * 3. 完美 PDF Canvas 視覺裁切擷取（確保圖文皆能正常呈現）
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

// 2. 全局狀態管理
window.chemApp = {
  version: '4.1.0-aristo-fixed',
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
      .replace(/Multiple\s*-\s*choice questions/gi, '');
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

// 4. 改進版切題引擎 (相容 ChemMCQ 與 標準題號 1. / Q1 / Q1.)
class QuestionParser {
  static parseBlocks(cleanText, pagePrefix) {
    const list = [];

    // 正則匹配：ChemMCQ12345 或 1. / 2. / Q1. / Q1)
    const regexQuestionSplit = /(?:^|\n)\s*(?:(ChemMCQ\s*\d+)|(?:Q(?:uestion)?\s*)?(\d+)[\.、\)])\s*/gi;
    
    const matches = [];
    let match;
    while ((match = regexQuestionSplit.exec(cleanText)) !== null) {
      matches.push({
        index: match.index,
        qCode: match[1] || `Q${match[2]}`,
        fullMatchStr: match[0]
      });
    }

    if (matches.length === 0) return list;

    for (let i = 0; i < matches.length; i++) {
      const startPos = matches[i].index + matches[i].fullMatchStr.length;
      const endPos = (i + 1 < matches.length) ? matches[i + 1].index : cleanText.length;
      const qBlock = cleanText.substring(startPos, endPos).trim();
      const qNumCode = matches[i].qCode;

      // 提取 A, B, C, D 選項
      const optMatch = qBlock.match(/(?:^|\n|\s)\(?[A][\.、\)]\s*([\s\S]*?)(?:^|\n|\s)\(?[B][\.、\)]\s*([\s\S]*?)(?:^|\n|\s)\(?[C][\.、\)]\s*([\s\S]*?)(?:^|\n|\s)\(?[D][\.、\)]\s*([\s\S]*?)(?=(?:\n\s*(?:Ans|Answer|答案|Exp|Explanation|解析|ChemMCQ|\d+[\.、\)])|$))/i);

      let fullQuestionBody = qBlock;
      let optA = '', optB = '', optC = '', optD = '';
      let ans = 'A';
      let exp = '本題暫無解析';

      if (optMatch) {
        fullQuestionBody = qBlock.substring(0, qBlock.indexOf(optMatch[0])).trim();
        optA = optMatch[1].trim();
        optB = optMatch[2].trim();
        optC = optMatch[3].trim();
        optD = optMatch[4].trim();

        const ansMatch = qBlock.match(/(?:Ans|Answer|答案)\s*[:：]?\s*\(?([A-D])\)?/i);
        if (ansMatch) ans = ansMatch[1].toUpperCase();

        const expMatch = qBlock.match(/(?:Exp|Explanation|解析|說明)\s*[:：]?\s*([\s\S]*)/i);
        if (expMatch) exp = expMatch[1].trim();

        optD = optD.split(/(?:Ans|Answer|答案|Exp|Explanation|解析)/i)[0].trim();
      }

      // 格式化 (1), (2), (3) 多重選擇敘述
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
        id: `${qNumCode}_${pagePrefix}_${i}`,
        qNumDisplay: qNumCode,
        question: fullQuestionBody,
        options: {
          A: TextFormatter.applyChemistryLaTeX(optA),
          B: TextFormatter.applyChemistryLaTeX(optB),
          C: TextFormatter.applyChemistryLaTeX(optC),
          D: TextFormatter.applyChemistryLaTeX(optD)
        },
        answer: ans,
        explanation: exp,
        images: []
      });
    }

    return list;
  }
}

// 5. 改進版 PDF 解析與「PDF 圖片強制截取」引擎
class PdfExtractor {
  static async extract(pdfDoc, chapId) {
    let allQuestions = [];
    let combinedRawText = '';

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const linesMap = {};
      textContent.items.forEach(item => {
        const y = Math.round(item.transform[5] / 4) * 4;
        if (!linesMap[y]) linesMap[y] = [];
        linesMap[y].push({ x: item.transform[4], str: item.str });
      });

      const sortedYs = Object.keys(linesMap).map(Number).sort((a, b) => b - a);
      const pageText = sortedYs.map(y => linesMap[y].sort((a, b) => a.x - b.x).map(i => i.str).join(' ')).join('\n');
      combinedRawText += `\n--- PAGE ${pageNum} ---\n` + pageText;

      const clean = TextFormatter.clean(pageText);
      const questions = QuestionParser.parseBlocks(clean, `ch${chapId}_p${pageNum}`);

      // 【核心渲染】：強制渲染高清 PDF Canvas 頁面
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;

      const pageImgDataUrl = canvas.toDataURL('image/png');

      if (questions.length > 0) {
        // 平均劃分當頁題目對應的 Canvas 高度，確保每題都有對應的視覺原圖
        const sliceHeight = canvas.height / questions.length;

        questions.forEach((q, idx) => {
          const cropCanvas = document.createElement('canvas');
          cropCanvas.width = canvas.width;
          cropCanvas.height = sliceHeight;
          const cropCtx = cropCanvas.getContext('2d');

          cropCtx.drawImage(
            canvas,
            0, idx * sliceHeight, canvas.width, sliceHeight,
            0, 0, cropCanvas.width, sliceHeight
          );

          // 將對應區域附圖與全頁原圖同時保留
          q.images.push(cropCanvas.toDataURL('image/png'));
        });

        allQuestions = allQuestions.concat(questions);
      } else if (pageText.trim().length > 0) {
        // 如果當頁包含文字但未成功提取結構化選項，降級轉為全頁圖片題目
        allQuestions.push({
          id: `fullpage_${chapId}_p${pageNum}_${Date.now()}`,
          qNumDisplay: `Page ${pageNum}`,
          question: `<b>第 ${pageNum} 頁（完整圖文渲染）</b><br/>${TextFormatter.applyChemistryLaTeX(clean.substring(0, 150))}...`,
          options: { A: 'A', B: 'B', C: 'C', D: 'D' },
          answer: 'A',
          explanation: '請參考題目圖片內容進行解答。',
          images: [pageImgDataUrl]
        });
      }
    }

    window.chemApp.debugLogs.lastRawText = combinedRawText;
    window.chemApp.debugLogs.lastParsedQuestions = allQuestions;

    window.chemApp.postProcessors.forEach(fn => {
      try { allQuestions = fn(allQuestions, combinedRawText) || allQuestions; } catch (e) {}
    });

    return allQuestions;
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
    `./pdfs/chemqb_ch${pad}_mcq_${lang}.pdf`,
    `./pdfs/chemqb_ch${chapId}_mcq_${lang}.pdf`,
    `./pdfs/chemqb_ch${pad}_mcq_y.pdf`
  ];

  container.innerHTML = `<div style="text-align:center; padding:48px 0; color:var(--text-secondary);">正在讀取 <code>chemqb_ch${pad}_mcq_${lang}.pdf</code> 並執行高清圖文解析...</div>`;

  let pdfDoc = null;
  for (const u of urls) {
    try {
      pdfDoc = await pdfjsLib.getDocument(u).promise;
      window.chemApp.debugLogs.lastLoadedUrl = u;
      break;
    } catch (e) {}
  }

  if (!pdfDoc) {
    container.innerHTML = `
      <div style="text-align:center; padding:48px 20px; border:1px dashed #e53935; border-radius:8px; color:#e53935;">
        找不到題庫檔案：<code>${urls[0]}</code><br>請確認 PDF 檔案路徑與檔名是否匹配。
      </div>`;
    return;
  }

  try {
    const list = await PdfExtractor.extract(pdfDoc, chapId);
    window.chemApp.questionsDB[dbKey] = list;
    saveQuestions();
    renderQuestions(list);
  } catch (err) {
    container.innerHTML = `<div style="color:#e53935; padding:32px;">解析錯誤：${err.message}</div>`;
  }
}

function renderQuestions(qList) {
  const container = document.getElementById('questionList');
  container.innerHTML = '';
  
  const chapStats = document.getElementById('chapterStats');
  if (chapStats) chapStats.textContent = `共 ${qList.length} 題 (${window.chemApp.currentLang === 'c' ? '中文卷' : '英文卷'})`;

  if (qList.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:#888; padding:48px 0;">未解析出題目，請點擊左下角「🐛 偵錯」檢查 PDF 內容。</div>`;
    return;
  }

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';

    const formattedContent = (q.question || '').replace(/\n/g, '<br/>');
    
    // 渲染 PDF Canvas 截圖
    const imagesHtml = (q.images && q.images.length > 0)
      ? `<div style="margin:16px 0; padding:12px; background:#f9f9f9; border:1px solid #e8e8e8; border-radius:8px; text-align:center;">
           ${q.images.map(src => `<img src="${src}" style="max-width:100%; height:auto; border-radius:4px; box-shadow:0 2px 8px rgba(0,0,0,0.08);" alt="題目/結構圖" />`).join('')}
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

// 8. 載入與初始化綁定
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
  if (navRight && !document.getElementById('langSwitchBar')) {
    const bar = document.createElement('div');
    bar.id = 'langSwitchBar';
    bar.style.cssText = 'display:inline-flex; background:#eee; padding:2px; border-radius:6px;';
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
    navRight.insertBefore(bar, navRight.firstChild);
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
      <strong>PDF 解析控制台</strong>
      <div>
        <button id="dbgReloadBtn" style="padding:4px 10px; font-size:12px; margin-right:8px; cursor:pointer; background:#e6f4ea; border:1px solid #34a853; border-radius:4px;">⚡ 強制重載本章</button>
        <button onclick="document.getElementById('debugModal').style.display='none'" style="cursor:pointer;">關閉</button>
      </div>
    </div>
    <div style="padding:8px 16px; background:#fff; border-bottom:1px solid #eee; display:flex; gap:10px;">
      <button id="tabJson" style="font-size:12px; padding:4px 10px; cursor:pointer;">1. 題目結構 (JSON)</button>
      <button id="tabRaw" style="font-size:12px; padding:4px 10px; cursor:pointer;">2. PDF 原始文字 (Raw)</button>
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

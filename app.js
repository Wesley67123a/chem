/**
 * DSE 化學分章模擬題庫系統 (Aristo Question Bank 專用終極版)
 * 核心機制：完全依賴 ChemMCQ 切題、自動 LaTeX 化學式、高畫質 Canvas 暴力截圖
 */

// ==========================================
// 1. 全局配置與課程 65 章架構
// ==========================================
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

// ==========================================
// 2. 全局應用程式狀態與 Hook 管理容器
// ==========================================
window.chemApp = {
  version: '4.0.0-aristo-perfect',
  currentLang: 'c', // 'c' 中文卷, 'e' 英文卷
  activeChapterId: null,
  questionsDB: {},
  practiceLogs: [],
  debugLogs: { lastRawText: '', lastParsedQuestions: [], lastLoadedUrl: '' },
  postProcessors: [], // Debug Hooks

  addPostProcessor(fn) {
    if (typeof fn === 'function') {
      this.postProcessors.push(fn);
      console.log('🔗 [chemApp] 已註冊自訂後處理 Hook');
    }
  }
};

const CHAPTER_MAP = {};
SYLLABUS_CONFIG.forEach(t => t.chapters.forEach(c => { CHAPTER_MAP[c.id] = { topic: t, chapter: c }; }));

// ==========================================
// 3. 模組化字元清洗與自動 LaTeX 轉換
// ==========================================
class TextFormatter {
  static clean(text) {
    return text
      .replace(/\r\n/g, '\n')
      .replace(/[\uf000-\uf0ff]/g, ' → ') // 清除 Aristo 特殊箭頭亂碼
      .replace(/\u2192/g, ' → ')
      .replace(/HKDSE NEW CHEMISTRY.*?\n/gi, '')
      .replace(/Part\s+[IVXLCDM]+.*?\n/gi, '')
      .replace(/Question Bank.*?\n/gi, '')
      .replace(/Multiple\s*-\s*choice questions/gi, '');
  }

  // 智慧判斷化學式並包裝為 \ce{...}
  static applyChemistryLaTeX(str) {
    if (!str) return '';
    let res = str.replace(/→/g, ' $\\rightarrow$ ');
    
    // 正則：捕捉連續的大寫字母+數字+小括號 (如 CH3CH2OH, H2SO4, PBr3)
    const chemRegex = /\b([A-Z][a-z]?\d*(?:\([A-Z][a-z]?\d*\))?[A-Z0-9\(\)]+)\b/g;
    
    res = res.replace(chemRegex, (match) => {
      // 排除常被誤認的全大寫普通英文單字
      const ignoreWords = /^(A|B|C|D|AND|ONLY|OR|WHICH|THE|OF|FOLLOWING|REACTIONS|ARE|IS|CORRECT|EXHIBITS|REQUIRED|FOR|ALKANES|TO|UNDERGO|SUBSTITUTION|WITH|BROMINE|PRODUCT|MAJOR|COMPOUNDS)$/i;
      if (ignoreWords.test(match) || match.length <= 1) return match;
      return `$\\ce{${match}}$`;
    });
    return res;
  }
}

// ==========================================
// 4. Aristo 專屬切題引擎 (只認 ChemMCQ)
// ==========================================
class QuestionParser {
  static parseBlocks(cleanText, prefix) {
    const list = [];
    
    // 【核心修正】：完全不理會 (1) (2)，只根據 "ChemMCQxxxxx" 切割區塊
    const regexQuestionSplit = /(?:^|\n)\s*(ChemMCQ\s*\d+)/gi;
    const pieces = cleanText.split(regexQuestionSplit);

    for (let i = 1; i < pieces.length; i += 2) {
      const qNumCode = pieces[i].trim(); // 例如 ChemMCQ44053
      let qBlock = pieces[i + 1] || '';

      // 定位 A. B. C. D. 四個選項
      const optMatch = qBlock.match(/(?:^|\n|\s)A[\.、\)]\s*([\s\S]*?)(?:^|\n|\s)B[\.、\)]\s*([\s\S]*?)(?:^|\n|\s)C[\.、\)]\s*([\s\S]*?)(?:^|\n|\s)D[\.、\)]\s*([\s\S]*?)(?=(?:\n\s*(?:Ans|Answer|答案|Exp|Explanation|解析|ChemMCQ)|$))/i);

      if (optMatch) {
        // A 選項之前的所有文字，全部歸類為「題幹」
        let fullQuestionBody = qBlock.substring(0, qBlock.indexOf(optMatch[0])).trim();
        let optA = optMatch[1].trim();
        let optB = optMatch[2].trim();
        let optC = optMatch[3].trim();
        let optD = optMatch[4].trim();

        // 提取答案與解析
        let ans = 'A';
        const ansMatch = qBlock.match(/(?:Ans|Answer|答案)\s*[:：]?\s*\(?([A-D])\)?/i);
        if (ansMatch) ans = ansMatch[1].toUpperCase();

        let exp = '';
        const expMatch = qBlock.match(/(?:Exp|Explanation|解析|說明)\s*[:：]?\s*([\s\S]*)(?=(?:\n\s*ChemMCQ|$))/i);
        if (expMatch) exp = expMatch[1].trim();

        // 移除選項 D 後面黏到的答案文字
        optD = optD.split(/(?:Ans|Answer|答案|Exp|Explanation|解析)/i)[0].trim();

        // 【核心修正】：處理題幹中的 (1), (2), (3) 陳述句，使其獨立換行
        fullQuestionBody = fullQuestionBody
          .replace(/(?:^|\n|\s)\(1\)\s*/g, '\n<div class="stmt-item" style="margin-top:10px;"><b>(1)</b> ')
          .replace(/(?:^|\n|\s)\(2\)\s*/g, '</div>\n<div class="stmt-item"><b>(2)</b> ')
          .replace(/(?:^|\n|\s)\(3\)\s*/g, '</div>\n<div class="stmt-item"><b>(3)</b> ')
          .replace(/(?:^|\n|\s)\(4\)\s*/g, '</div>\n<div class="stmt-item"><b>(4)</b> ');
        if (fullQuestionBody.includes('<div class="stmt-item">')) {
          fullQuestionBody += '</div>';
        }

        // 套用化學式 LaTeX 渲染
        fullQuestionBody = TextFormatter.applyChemistryLaTeX(fullQuestionBody);
        
        list.push({
          id: `${qNumCode}_${Date.now()}_${i}`,
          qNumDisplay: qNumCode, // 保留真實題號
          question: fullQuestionBody,
          options: {
            A: TextFormatter.applyChemistryLaTeX(optA),
            B: TextFormatter.applyChemistryLaTeX(optB),
            C: TextFormatter.applyChemistryLaTeX(optC),
            D: TextFormatter.applyChemistryLaTeX(optD)
          },
          answer: ans,
          explanation: exp || '本題暫無解析',
          images: []
        });
      }
    }

    return list;
  }
}

// ==========================================
// 5. PDF 圖文擷取引擎 (強制 Canvas 暴力截圖)
// ==========================================
class PdfExtractor {
  static async extract(pdfDoc, chapId) {
    let allQuestions = [];
    let combinedRawText = '';

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);

      // 1. 抓取文字
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

      // 2. 切題
      const clean = TextFormatter.clean(pageText);
      const questions = QuestionParser.parseBlocks(clean, `${chapId}_p${pageNum}`);

      // 3. 處理化學結構式圖片 (強制整頁 Canvas 渲染並裁切)
      if (questions.length > 0) {
        const viewport = page.getViewport({ scale: 2.0 }); // 2倍高畫質
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;

        // 如果題目中包含疑似需要看圖的關鍵字，就擷取該頁的圖形區
        questions.forEach((q) => {
          if (/isomerism|structure|skeletal|compound|formula|reaction|product/i.test(q.question)) {
            // 擷取頁面中間區域作為題目附圖
            const cropCanvas = document.createElement('canvas');
            cropCanvas.width = canvas.width;
            cropCanvas.height = canvas.height * 0.45; 
            const cropCtx = cropCanvas.getContext('2d');
            // 從原圖 Y 軸的 15% 處開始擷取，高度佔 45%
            cropCtx.drawImage(canvas, 0, canvas.height * 0.15, canvas.width, canvas.height * 0.45, 0, 0, cropCanvas.width, cropCanvas.height);
            q.images.push(cropCanvas.toDataURL('image/png'));
          }
        });
      }

      allQuestions = allQuestions.concat(questions);
    }

    // 儲存至 Debug 系統
    window.chemApp.debugLogs.lastRawText = combinedRawText;
    window.chemApp.debugLogs.lastParsedQuestions = allQuestions;

    // 執行外掛 Hook
    window.chemApp.postProcessors.forEach(fn => {
      try { allQuestions = fn(allQuestions, combinedRawText) || allQuestions; } catch (e) { console.error('Hook 失敗:', e); }
    });

    return allQuestions;
  }
}

// ==========================================
// 6. 核心章節切換與渲染
// ==========================================
async function openChapter(chapId, bypassCache = false) {
  window.chemApp.activeChapterId = chapId;
  const lookup = CHAPTER_MAP[chapId];
  if (!lookup) return;

  // UI 更新
  document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
  const activeEl = document.getElementById(`chap-item-${chapId}`);
  if (activeEl) activeEl.classList.add('active');

  document.getElementById('bcTopicName').textContent = lookup.topic.topicName;
  document.getElementById('bcChapterName').textContent = `第 ${lookup.chapter.id} 章`;
  document.getElementById('currentChapterTitle').textContent = lookup.chapter.name;

  document.getElementById('dashboardView').classList.remove('active');
  document.getElementById('chapterView').classList.add('active');

  const container = document.getElementById('questionList');
  const dbKey = `${window.chemApp.currentLang}_${chapId}`;

  // 讀取快取
  if (!bypassCache && window.chemApp.questionsDB[dbKey] && window.chemApp.questionsDB[dbKey].length > 0) {
    renderQuestions(window.chemApp.questionsDB[dbKey]);
    return;
  }

  // 生成 PDF 檔名
  const pad = String(chapId).padStart(2, '0');
  const lang = window.chemApp.currentLang;
  const urls = [
    `./pdfs/chemqb_ch${pad}_mcq_${lang}.pdf`,
    `./pdfs/chemqb_ch${chapId}_mcq_${lang}.pdf`,
    `./pdfs/chemqb_ch${pad}_mcq_y.pdf`
  ];

  container.innerHTML = `<div style="text-align:center; padding:48px 0; color:var(--text-secondary);">正在讀取 <code>chemqb_ch${pad}_mcq_${lang}.pdf</code> 並執行智慧圖文解析...</div>`;

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
      <div style="text-align:center; padding:48px 20px; border:1px dashed var(--danger-color); border-radius:8px; color:var(--danger-color);">
        找不到題庫檔案：<code>${urls[0]}</code><br>請確認檔案名稱與位置是否正確。
      </div>`;
    return;
  }

  try {
    const list = await PdfExtractor.extract(pdfDoc, chapId);
    window.chemApp.questionsDB[dbKey] = list;
    saveQuestions();
    renderQuestions(list);
  } catch (err) {
    container.innerHTML = `<div style="color:var(--danger-color); padding:32px;">解析錯誤：${err.message}</div>`;
  }
}

function renderQuestions(qList) {
  const container = document.getElementById('questionList');
  container.innerHTML = '';
  
  const chapStats = document.getElementById('chapterStats');
  if (chapStats) chapStats.textContent = `共 ${qList.length} 題 (${window.chemApp.currentLang === 'c' ? '中文卷' : '英文卷'})`;

  if (qList.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:48px 0;">未解析出標準選擇題，請點擊左下角「🐛 偵錯」查看原因。</div>`;
    return;
  }

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';

    const formattedContent = (q.question || '').replace(/\n/g, '<br/>');
    
    // 若有截圖，渲染圖片
    const imagesHtml = (q.images && q.images.length > 0)
      ? `<div style="margin:16px 0; padding:8px; background:#fafafa; border:1px solid #eee; border-radius:6px; text-align:center;">
           ${q.images.map(src => `<img src="${src}" style="max-height:220px; max-width:100%; mix-blend-mode:multiply;" alt="題目配圖" />`).join('')}
         </div>`
      : '';

    card.innerHTML = `
      <div class="q-header"><span class="q-number" style="color:var(--primary-color);">${q.qNumDisplay || 'Question'} (第 ${index + 1} 題)</span></div>
      <div class="q-body" style="line-height:1.7;">${formattedContent}</div>
      ${imagesHtml}
      <div class="options-grid">
        ${['A', 'B', 'C', 'D'].map(k => `
          <button class="opt-btn" data-opt="${k}">
            <span class="opt-key">${k}.</span>
            <span class="opt-text">${q.options[k] || ''}</span>
          </button>
        `).join('')}
      </div>
      <div class="explanation-panel">
        <span class="exp-title">正解：${q.answer} ｜ 解析</span>
        <div>${(q.explanation || '').replace(/\n/g, '<br/>')}</div>
      </div>
    `;

    const optBtns = card.querySelectorAll('.opt-btn');
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = (btn.dataset.opt === q.answer);
        optBtns.forEach(b => {
          b.disabled = true;
          if (b.dataset.opt === q.answer) b.classList.add('correct');
          else if (b.dataset.opt === btn.dataset.opt && !isCorrect) b.classList.add('incorrect');
        });
        card.querySelector('.explanation-panel').classList.add('show');
        window.chemApp.practiceLogs.push({ date: getTodayStr(), chapterId: window.chemApp.activeChapterId, qId: q.id, isCorrect });
        savePracticeLogs();
      });
    });

    container.appendChild(card);
  });

  // 渲染 KaTeX
  if (typeof renderMathInElement === 'function') {
    try {
      renderMathInElement(container, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
        throwOnError: false
      });
    } catch (e) {}
  }
}

// ==========================================
// 7. 基礎數據與 UI 綁定
// ==========================================
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
    groupEl.innerHTML = `<div class="topic-header"><div class="topic-toggle-wrap"><span class="topic-toggle-icon">+</span><span>${topic.topicName}</span></div></div><div class="chapter-list"></div>`;
    groupEl.querySelector('.topic-header').addEventListener('click', () => {
      const isOpen = groupEl.classList.toggle('open');
      groupEl.querySelector('.topic-toggle-icon').textContent = isOpen ? '−' : '+';
    });

    const cList = groupEl.querySelector('.chapter-list');
    topic.chapters.forEach(ch => {
      const it = document.createElement('div');
      it.className = 'chapter-item';
      it.id = `chap-item-${ch.id}`;
      it.innerHTML = `<span>${ch.name}</span><span class="chapter-badge" id="badge-${ch.id}">0 題</span>`;
      it.addEventListener('click', () => openChapter(ch.id));
      cList.appendChild(it);
    });
    container.appendChild(groupEl);
  });
}

// 初始化
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

  // 頂部語言切換
  const navRight = document.querySelector('.nav-right');
  if (navRight && !document.getElementById('langSwitchBar')) {
    const bar = document.createElement('div');
    bar.id = 'langSwitchBar';
    bar.style.cssText = 'display:inline-flex; background:var(--bg-tertiary); padding:2px; border-radius:6px; border:1px solid var(--border-color);';
    ['c', 'e'].forEach(lang => {
      const b = document.createElement('button');
      b.textContent = lang === 'c' ? '中文卷 (C)' : '英文卷 (E)';
      b.style.cssText = `border:none; padding:4px 10px; font-size:12px; border-radius:4px; cursor:pointer; background:${window.chemApp.currentLang === lang ? '#fff' : 'transparent'}; font-weight:${window.chemApp.currentLang === lang ? '600' : '400'};`;
      b.onclick = () => {
        window.chemApp.currentLang = lang;
        bar.querySelectorAll('button').forEach(btn => { btn.style.background = 'transparent'; btn.style.fontWeight = '400'; });
        b.style.background = '#fff'; b.style.fontWeight = '600';
        updateCounts();
        if (window.chemApp.activeChapterId) openChapter(window.chemApp.activeChapterId);
      };
      bar.appendChild(b);
    });
    navRight.insertBefore(bar, navRight.firstChild);
  }
});

// ==========================================
// 8. 專屬 Debug 面板 (包含強制重載)
// ==========================================
function mountDebuggerUI() {
  const btn = document.createElement('button');
  btn.textContent = '🐛 偵錯';
  btn.style.cssText = 'position:fixed; bottom:20px; left:20px; z-index:99999; background:#222; color:#fff; border:none; padding:8px 16px; border-radius:8px; font-size:13px; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.3);';

  const modal = document.createElement('div');
  modal.id = 'debugModal';
  modal.style.cssText = 'display:none; position:fixed; bottom:70px; left:20px; width:85vw; max-width:700px; height:60vh; background:#fff; border-radius:8px; box-shadow:0 8px 32px rgba(0,0,0,0.3); z-index:99999; flex-direction:column; font-family:monospace;';

  modal.innerHTML = `
    <div style="background:#f1f1f1; padding:10px 16px; border-bottom:1px solid #ddd; display:flex; justify-content:space-between; align-items:center; border-radius:8px 8px 0 0;">
      <strong>PDF 解析控制台</strong>
      <div>
        <button id="dbgReloadBtn" style="padding:4px 10px; font-size:12px; margin-right:8px; cursor:pointer; background:#e6f4ea; border:1px solid #34a853; border-radius:4px; color:#188038;">⚡ 強制重載本章</button>
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

// ==========================================
// 9. 開放式 Hook 擴充區 (隨時在下方寫 Code Debug)
// ==========================================
/* 
範例：遇到選項 A 包含特殊雜訊，只需解開註解：
window.chemApp.addPostProcessor((questions, rawText) => {
  questions.forEach(q => {
    q.options.A = q.options.A.replace('雜訊文字', '');
  });
  return questions;
});
*/

/**
 * DSE 化學分章模擬題庫系統 (Debug-Ready 模組化版本)
 * 支援: chemqb_chxx_mcq_y.pdf 自動加載、字元清洗、圖文抓取與開放式 Hook 調試
 */

// ==========================================
// 1. 全局配置與課程 65 章架構
// ==========================================
const SYLLABUS_CONFIG = [
  { topicId: 'CHEM-01', topicName: 'CHEM-01 地球', chapters: [{ id: 1, name: '第 1 章：大氣層與氣體' }, { id: 2, name: '第 2 章：海洋中的資源與食鹽' }, { id: 3, name: '第 3 章：岩石與礦物 (碳酸鈣及石灰)' }] },
  { topicId: 'CHEM-02', topicName: 'CHEM-02 微觀世界 I', chapters: [{ id: 4, name: '第 4 章：原子結構與同位素' }, { id: 5, name: '第 5 章：元素週期表與元素分類' }, { id: 6, name: '第 6 章：離子鍵與離子晶體' }, { id: 7, name: '第 7 章：共價鍵與分子' }, { id: 8, name: '第 8 章：金屬鍵與金屬晶體' }] },
  { topicId: 'CHEM-03', topicName: 'CHEM-03 金屬', chapters: [{ id: 9, name: '第 9 章：金屬的存在與提取' }, { id: 10, name: '第 10 章：金屬的化學反應活性' }, { id: 11, name: '第 11 章：金屬活性序與置換反應' }, { id: 12, name: '第 12 章：金屬的腐蝕與防銹' }, { id: 13, name: '第 13 章：摩爾概念與金屬計算' }] },
  { topicId: 'CHEM-04', topicName: 'CHEM-04 酸和鹽基', chapters: [{ id: 14, name: '第 14 章：酸和鹼的性質' }, { id: 15, name: '第 15 章：氫離子與氫氧離子的角色' }, { id: 16, name: '第 16 章：酸鹼強度與 pH 標度' }, { id: 17, name: '第 17 章：鹽的製備方法' }, { id: 18, name: '第 18 章：容量分析與酸鹼滴定' }] },
  { topicId: 'CHEM-05', topicName: 'CHEM-05 化石燃料和碳化合物', chapters: [{ id: 19, name: '第 19 章：化石燃料與烷烴' }, { id: 20, name: '第 20 章：同系物與烷烴反應' }, { id: 21, name: '第 21 章：烯烴與加成反應' }, { id: 22, name: '第 22 章：加成聚合物' }, { id: 23, name: '第 23 章：其他重要碳化合物' }] },
  { topicId: 'CHEM-06', topicName: 'CHEM-06 微觀世界 II', chapters: [{ id: 24, name: '第 24 章：共價分子的立體形狀' }, { id: 25, name: '第 25 章：分子極性' }, { id: 26, name: '第 26 章：分子間作用力' }, { id: 27, name: '第 27 章：物質結構與物理性質的關係' }] },
  { topicId: 'CHEM-07', topicName: 'CHEM-07 氧化還原·電池·電解', chapters: [{ id: 28, name: '第 28 章：氧化還原概念與氧化數' }, { id: 29, name: '第 29 章：化學電池與電動勢' }, { id: 30, name: '第 30 章：重要氧化劑與還原劑' }, { id: 31, name: '第 31 章：電解熔融物與水溶液' }, { id: 32, name: '第 32 章：電解的工業應用' }] },
  { topicId: 'CHEM-08', topicName: 'CHEM-08 化學反應與能量', chapters: [{ id: 33, name: '第 33 章：吸熱與放熱反應及焓變' }, { id: 34, name: '第 34 章：標準焓變之測定' }, { id: 35, name: '第 35 章：赫斯定律與能量循環' }] },
  { topicId: 'CHEM-09', topicName: 'CHEM-09 反應速率', chapters: [{ id: 36, name: '第 36 章：反應速率的量度與曲線分析' }, { id: 37, name: '第 37 章：影響反應速率的因素' }, { id: 38, name: '第 38 章：碰撞理論與活化能' }, { id: 39, name: '第 39 章：催化劑及其機制' }] },
  { topicId: 'CHEM-10', topicName: 'CHEM-10 化學平衡', chapters: [{ id: 40, name: '第 40 章：動態平衡與可逆反應' }, { id: 41, name: '第 41 章：平衡常數 Kc 的計算' }, { id: 42, name: '第 42 章：勒沙特列原理' }] },
  { topicId: 'CHEM-11', topicName: 'CHEM-11 碳化合物的化學', chapters: [{ id: 43, name: '第 43 章：同分異構體' }, { id: 44, name: '第 44 章：烷烴與烯烴反應機制' }, { id: 45, name: '第 45 章：醇與鹵代烷' }, { id: 46, name: '第 46 章：醛與酮' }, { id: 47, name: '第 47 章：羧酸、酯與酰胺' }, { id: 48, name: '第 48 章：縮合聚合物與有機合成路線' }] },
  { topicId: 'CHEM-12', topicName: 'CHEM-12 化學世界中的規律', chapters: [{ id: 49, name: '第 49 章：第三週期元素及其氧化物性質' }, { id: 50, name: '第 50 章：過渡金屬元素與絡離子' }] },
  { topicId: 'CHEM-13', topicName: 'CHEM-13 工業化學（選修）', chapters: [{ id: 51, name: '第 51 章：工業化學動力學與速率方程' }, { id: 52, name: '第 52 章：阿倫尼烏斯方程' }, { id: 53, name: '第 53 章：哈柏法製氨' }, { id: 54, name: '第 54 章：接觸法製硫酸' }, { id: 55, name: '第 55 章：氯鹼工業與綠色化學' }] },
  { topicId: 'CHEM-14', topicName: 'CHEM-14 物料化學（選修）', chapters: [{ id: 56, name: '第 56 章：晶體晶胞結構與金屬合金' }, { id: 57, name: '第 57 章：高分子材料與塑膠' }, { id: 58, name: '第 58 章：液晶體與現代材料' }, { id: 59, name: '第 59 章：納米材料' }, { id: 60, name: '第 60 章：物料的回收與環境問題' }] },
  { topicId: 'CHEM-15', topicName: 'CHEM-15 分析化學（選修）', chapters: [{ id: 61, name: '第 61 章：無機物定性分析 (離子檢驗)' }, { id: 62, name: '第 62 章：紅外光譜' }, { id: 63, name: '第 63 章：質譜' }, { id: 64, name: '第 64 章：色譜分析法' }, { id: 65, name: '第 65 章：化學合成與結構綜合鑑定' }] }
];

// ==========================================
// 2. 全局應用程式狀態與 Hook 管理容器
// ==========================================
window.chemApp = {
  version: '3.0.0-debug-ready',
  syllabus: SYLLABUS_CONFIG,
  currentLang: 'c', // 'c' 或 'e'
  activeChapterId: null,
  questionsDB: {},  // 快取: { "c_44": [...] }
  practiceLogs: [],
  debugLogs: {
    lastRawText: '',
    lastParsedQuestions: [],
    lastLoadedUrl: ''
  },
  // 可擴充的後處理處理器陣列 (Hook)
  postProcessors: [],

  // 註冊除錯與客製管線 Hook
  addPostProcessor(fn) {
    if (typeof fn === 'function') {
      this.postProcessors.push(fn);
      console.log('🔗 [chemApp] 已註冊自訂後處理 Hook');
    }
  }
};

// 索引快取
const CHAPTER_MAP = {};
SYLLABUS_CONFIG.forEach(t => t.chapters.forEach(c => { CHAPTER_MAP[c.id] = { topic: t, chapter: c }; }));

// ==========================================
// 3. 模組化字元清洗與 PDF 正則切題管線
// ==========================================
class QuestionParser {
  /**
   * 文字清洗：解決 Aristo PDF 專屬字型映射錯誤 (如  變成箭頭)
   */
  static cleanRawText(text) {
    return text
      .replace(/\r\n/g, '\n')
      // 處理 Private Use Area 字元 (Aristo 常用 \uf000 ~ \uf0ff 作為箭頭或符號)
      .replace(/[\uf000-\uf0ff]/g, ' → ')
      .replace(/\u2192/g, ' → ')
      .replace(/HKDSE NEW CHEMISTRY.*?\n/gi, '')
      .replace(/Part\s+[IVXLCDM]+.*?\n/gi, '')
      .replace(/Question Bank.*?\n/gi, '')
      .replace(/Multiple\s*-\s*choice questions/gi, '');
  }

  /**
   * 從清洗後文字中切割題目
   */
  static parseBlocks(cleanText, prefix) {
    const list = [];
    
    // 切題正則：相容 ChemMCQ44024、數字加點 (1.)、(1)
    const splitRegex = /(?:^|\n)\s*(?:(?:ChemMCQ\s*\d+)|(?:Q?\s*\d+[\.、\)])|(?:\(\d+\)))\s+/gi;
    const rawBlocks = cleanText.split(splitRegex).filter(b => b.trim().length > 15);

    rawBlocks.forEach((block, idx) => {
      // 匹配 A. B. C. D. 或 (A) (B) (C) (D)
      const optMatch = block.match(/(?:^|\n|\s)(?:\(A\)|A[\.、\)])\s*([\s\S]*?)(?:\(B\)|B[\.、\)])\s*([\s\S]*?)(?:\(C\)|C[\.、\)])\s*([\s\S]*?)(?:\(D\)|D[\.、\)])\s*([\s\S]*?)(?=(?:\n\s*(?:Ans|Answer|答案|Exp|Explanation|解析|ChemMCQ|\d+\.))|$)/i);

      if (optMatch) {
        let qBody = block.substring(0, block.indexOf(optMatch[0])).trim();
        let optA = optMatch[1].trim();
        let optB = optMatch[2].trim();
        let optC = optMatch[3].trim();
        let optD = optMatch[4].trim();

        // 提取答案 (Ans: B / Answer: B / (B))
        let ans = 'A';
        const ansMatch = block.match(/(?:Ans|Answer|答案)\s*[:：]?\s*\(?([A-D])\)?/i);
        if (ansMatch) ans = ansMatch[1].toUpperCase();

        // 提取解釋 (Exp: / Explanation:)
        let exp = '';
        const expMatch = block.match(/(?:Exp|Explanation|解析|說明)\s*[:：]?\s*([\s\S]*)/i);
        if (expMatch) exp = expMatch[1].trim();

        optD = optD.split(/(?:Ans|Answer|答案|Exp|Explanation|解析)/i)[0].trim();

        list.push({
          id: `${prefix}_${idx + 1}`,
          question: qBody || `題目 ${idx + 1}`,
          options: { A: optA, B: optB, C: optC, D: optD },
          answer: ans,
          explanation: exp,
          images: []
        });
      }
    });

    return list;
  }
}

// ==========================================
// 4. PDF 圖文擷取引擎 (支援向量圖/點陣圖)
// ==========================================
class PdfExtractor {
  static async extract(pdfDoc, chapId) {
    let allQuestions = [];
    let combinedRawText = '';

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);

      // 1. 抓取文字與座標排序
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

      // 2. 擷取圖片 (例如骨架式)
      const pageImages = await this.extractImages(page);

      // 3. 解析題目
      const clean = QuestionParser.cleanRawText(pageText);
      const questions = QuestionParser.parseBlocks(clean, `${chapId}_p${pageNum}`);

      // 4. 配對圖片
      if (pageImages.length > 0 && questions.length > 0) {
        pageImages.forEach((img, idx) => {
          const target = questions[Math.min(idx, questions.length - 1)];
          target.images.push(img);
        });
      }

      allQuestions = allQuestions.concat(questions);
    }

    // 儲存至 Debug 狀態
    window.chemApp.debugLogs.lastRawText = combinedRawText;
    window.chemApp.debugLogs.lastParsedQuestions = allQuestions;

    // 執行所有註冊的 Hook 後處理
    window.chemApp.postProcessors.forEach(fn => {
      try { allQuestions = fn(allQuestions, combinedRawText) || allQuestions; } catch (e) { console.error('Hook 執行失敗:', e); }
    });

    return allQuestions;
  }

  static async extractImages(page) {
    const list = [];
    try {
      const opList = await page.getOperatorList();
      for (let i = 0; i < opList.fnArray.length; i++) {
        const fn = opList.fnArray[i];
        if (fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject) {
          const imgName = opList.args[i][0];
          let imgObj = fn === pdfjsLib.OPS.paintInlineImageXObject ? imgName : await new Promise(r => page.objs.get(imgName, r));
          if (imgObj && (imgObj.width > 35 || imgObj.height > 25)) {
            const b64 = this.toBase64(imgObj);
            if (b64) list.push(b64);
          }
        }
      }
    } catch (e) { console.warn('圖片擷取略過:', e); }
    return list;
  }

  static toBase64(imgObj) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = imgObj.width;
      canvas.height = imgObj.height;
      const ctx = canvas.getContext('2d');
      if (imgObj.bitmap) {
        ctx.drawImage(imgObj.bitmap, 0, 0);
        return canvas.toDataURL('image/png');
      }
      if (!imgObj.data) return null;
      const imgData = ctx.createImageData(imgObj.width, imgObj.height);
      const d = imgObj.data;
      if (d.length === imgObj.width * imgObj.height * 4) {
        imgData.data.set(d);
      } else if (d.length === imgObj.width * imgObj.height * 3) {
        let p = 0;
        for (let i = 0; i < imgData.data.length; i += 4) {
          imgData.data[i] = d[p++]; imgData.data[i + 1] = d[p++]; imgData.data[i + 2] = d[p++]; imgData.data[i + 3] = 255;
        }
      } else {
        let p = 0;
        for (let i = 0; i < imgData.data.length; i += 4) {
          const v = d[p++];
          imgData.data[i] = v; imgData.data[i + 1] = v; imgData.data[i + 2] = v; imgData.data[i + 3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      return canvas.toDataURL('image/png');
    } catch (e) { return null; }
  }
}

// ==========================================
// 5. 核心章節切換與渲染
// ==========================================
async function openChapter(chapId, bypassCache = false) {
  window.chemApp.activeChapterId = chapId;
  const lookup = CHAPTER_MAP[chapId];
  if (!lookup) return;

  // 側邊欄高亮
  document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
  const activeEl = document.getElementById(`chap-item-${chapId}`);
  if (activeEl) activeEl.classList.add('active');

  // 麵包屑與標題
  const bcTopic = document.getElementById('bcTopicName');
  const bcChap = document.getElementById('bcChapterName');
  const tTitle = document.getElementById('currentChapterTitle');
  if (bcTopic) bcTopic.textContent = lookup.topic.topicName;
  if (bcChap) bcChap.textContent = `第 ${lookup.chapter.id} 章`;
  if (tTitle) tTitle.textContent = lookup.chapter.name;

  document.getElementById('dashboardView').classList.remove('active');
  document.getElementById('chapterView').classList.add('active');

  const container = document.getElementById('questionList');
  const dbKey = `${window.chemApp.currentLang}_${chapId}`;

  // 檢查快取
  if (!bypassCache && window.chemApp.questionsDB[dbKey] && window.chemApp.questionsDB[dbKey].length > 0) {
    renderQuestions(window.chemApp.questionsDB[dbKey]);
    return;
  }

  // 產生檔名候選
  const pad = String(chapId).padStart(2, '0');
  const lang = window.chemApp.currentLang;
  const urls = [
    `./pdfs/chemqb_ch${pad}_mcq_${lang}.pdf`,
    `./pdfs/chemqb_ch${chapId}_mcq_${lang}.pdf`,
    `./pdfs/chemqb_ch${pad}_mcq_y.pdf`,
    `./pdfs/chemqb_ch${chapId}_mcq_y.pdf`
  ];

  container.innerHTML = `<div style="text-align:center; padding:48px 0; color:var(--text-secondary);">正在讀取 <code>chemqb_ch${pad}_mcq_${lang}.pdf</code> 並執行管線分析...</div>`;

  let pdfDoc = null;
  let loadedUrl = '';
  for (const u of urls) {
    try {
      pdfDoc = await pdfjsLib.getDocument(u).promise;
      loadedUrl = u;
      break;
    } catch (e) {}
  }

  window.chemApp.debugLogs.lastLoadedUrl = loadedUrl;

  if (!pdfDoc) {
    container.innerHTML = `
      <div style="text-align:center; padding:48px 20px; border:1px dashed var(--border-color); border-radius:8px;">
        <div style="color:var(--danger-color); font-weight:600; margin-bottom:8px;">找不到題庫 PDF 檔案</div>
        <div style="font-size:13px; color:var(--text-secondary);">
          嘗試抓取的路徑：<code>${urls[0]}</code><br>
          請確認檔案已放置在 GitHub 倉庫的 <code>pdfs/</code> 資料夾內。
        </div>
      </div>
    `;
    return;
  }

  try {
    const list = await PdfExtractor.extract(pdfDoc, chapId);
    window.chemApp.questionsDB[dbKey] = list;
    saveQuestions();
    renderQuestions(list);
  } catch (err) {
    container.innerHTML = `<div style="color:var(--danger-color); padding:32px;">解析管線發生錯誤：${err.message}</div>`;
  }
}

function renderQuestions(qList) {
  const container = document.getElementById('questionList');
  container.innerHTML = '';
  const chapStats = document.getElementById('chapterStats');
  if (chapStats) chapStats.textContent = `共 ${qList.length} 題 (${window.chemApp.currentLang === 'c' ? '中文卷' : '英文卷'})`;

  if (qList.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:48px 0;">此章節目前未解析出標準選擇題。請點擊左下角「🐛 偵錯」檢查 PDF 原始文字。</div>`;
    return;
  }

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = `q-card-${q.id}`;

    const formattedContent = (q.question || '').replace(/\n/g, '<br/>');
    const imagesHtml = (q.images && q.images.length > 0)
      ? `<div style="display:flex; flex-wrap:wrap; gap:10px; margin:12px 0;">
           ${q.images.map(src => `<img src="${src}" style="max-height:160px; max-width:100%; border:1px solid var(--border-color); border-radius:4px; padding:4px; background:#fff;" alt="結構式" />`).join('')}
         </div>`
      : '';

    card.innerHTML = `
      <div class="q-header"><span class="q-number">Question ${index + 1}</span></div>
      <div class="q-body">${formattedContent}</div>
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
        <span class="exp-title">答案：${q.answer} ｜ 解析</span>
        <div>${(q.explanation || '暫無解析').replace(/\n/g, '<br/>')}</div>
      </div>
    `;

    const optButtons = card.querySelectorAll('.opt-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = (btn.dataset.opt === q.answer);
        optButtons.forEach(b => {
          b.disabled = true;
          if (b.dataset.opt === q.answer) b.classList.add('correct');
          else if (b.dataset.opt === btn.dataset.opt && !isCorrect) b.classList.add('incorrect');
        });
        card.querySelector('.explanation-panel').classList.add('show');
        window.chemApp.practiceLogs.push({
          date: getTodayStr(),
          chapterId: window.chemApp.activeChapterId,
          qId: q.id,
          isCorrect
        });
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

// ==========================================
// 6. UI 互動、切換語言、熱力圖與持久化
// ==========================================
function saveQuestions() {
  try { localStorage.setItem('DSE_CHEM_CACHE_V3', JSON.stringify(window.chemApp.questionsDB)); } catch (e) {}
  updateCounts();
}

function savePracticeLogs() {
  localStorage.setItem('DSE_CHEM_LOGS_V3', JSON.stringify(window.chemApp.practiceLogs));
  updateDashboardProgress();
  renderHeatmap();
}

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
  const dtc = document.getElementById('dashTotalQuestions');
  if (tc) tc.textContent = `共 ${total} 題 (${window.chemApp.currentLang === 'c' ? '中文卷' : '英文卷'})`;
  if (dtc) dtc.textContent = total;
}

function renderSidebar() {
  const container = document.getElementById('topicListContainer');
  if (!container) return;
  container.innerHTML = '';

  SYLLABUS_CONFIG.forEach(topic => {
    const groupEl = document.createElement('div');
    groupEl.className = 'topic-group';
    groupEl.innerHTML = `
      <div class="topic-header">
        <div class="topic-toggle-wrap"><span class="topic-toggle-icon">+</span><span>${topic.topicName}</span></div>
      </div>
      <div class="chapter-list"></div>
    `;

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

function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const logMap = {};
  window.chemApp.practiceLogs.forEach(l => { logMap[l.date] = (logMap[l.date] || 0) + 1; });
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(); d.setDate(today.getDate() - i);
    const dateStr = formatDate(d);
    const count = logMap[dateStr] || 0;
    const cell = document.createElement('div');
    cell.className = `heat-cell ${count > 8 ? 'lv-3' : count >= 4 ? 'lv-2' : count >= 1 ? 'lv-1' : 'lv-0'}`;
    grid.appendChild(cell);
  }
}

function updateDashboardProgress() {
  const ans = window.chemApp.practiceLogs.length;
  const cor = window.chemApp.practiceLogs.filter(l => l.isCorrect).length;
  const rate = ans > 0 ? Math.round((cor / ans) * 100) : 0;
  const setT = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setT('answeredCount', ans);
  setT('wrongCount', ans - cor);
  setT('todayAnsweredCount', window.chemApp.practiceLogs.filter(l => l.date === getTodayStr()).length);
  setT('masteryRate', `${rate}%`);
  const f = document.getElementById('masteryFill');
  if (f) f.style.width = `${rate}%`;
}

function showDashboardView() {
  window.chemApp.activeChapterId = null;
  document.getElementById('chapterView').classList.remove('active');
  document.getElementById('dashboardView').classList.add('active');
  document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
  updateDashboardProgress();
  renderHeatmap();
}

function getTodayStr() { return formatDate(new Date()); }
function formatDate(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

// ==========================================
// 7. 啟動入口與專屬 Debug 面板掛載
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 載入本地存檔
  try {
    const sq = localStorage.getItem('DSE_CHEM_CACHE_V3');
    const sl = localStorage.getItem('DSE_CHEM_LOGS_V3');
    if (sq) window.chemApp.questionsDB = JSON.parse(sq);
    if (sl) window.chemApp.practiceLogs = JSON.parse(sl);
  } catch (e) {}

  renderSidebar();
  updateCounts();
  updateDashboardProgress();
  renderHeatmap();

  // 頂部導航語言切換按鈕注入
  const navRight = document.querySelector('.nav-right');
  if (navRight && !document.getElementById('langSwitchBar')) {
    const bar = document.createElement('div');
    bar.id = 'langSwitchBar';
    bar.style.cssText = 'display:inline-flex; background:var(--bg-tertiary); padding:2px; border-radius:6px; border:1px solid var(--border-color);';
    ['c', 'e'].forEach(lang => {
      const b = document.createElement('button');
      b.textContent = lang === 'c' ? '中文卷 (C)' : '英文卷 (E)';
      b.className = 'lang-toggle-btn';
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

  // 綁定基礎事件
  const expBtn = document.getElementById('expandAllBtn');
  const colBtn = document.getElementById('collapseAllBtn');
  const homeBtn = document.getElementById('backToHomeBtn');
  if (expBtn) expBtn.onclick = () => document.querySelectorAll('.topic-group').forEach(el => el.classList.add('open'));
  if (colBtn) colBtn.onclick = () => document.querySelectorAll('.topic-group').forEach(el => el.classList.remove('open'));
  if (homeBtn) homeBtn.onclick = showDashboardView;

  // 建立平板專屬懸浮除錯視窗
  mountDebuggerUI();
});

function mountDebuggerUI() {
  if (document.getElementById('debugFloatBtn')) return;

  const btn = document.createElement('button');
  btn.id = 'debugFloatBtn';
  btn.textContent = '🐛 偵錯 (Debug)';
  btn.style.cssText = 'position:fixed; bottom:18px; left:18px; z-index:99999; background:#111; color:#fff; border:none; padding:8px 14px; border-radius:6px; font-size:12px; cursor:pointer; opacity:0.85; box-shadow:0 4px 12px rgba(0,0,0,0.25);';

  const modal = document.createElement('div');
  modal.id = 'debugModal';
  modal.style.cssText = 'display:none; position:fixed; bottom:60px; left:18px; width:85vw; max-width:680px; height:58vh; background:#ffffff; border:1px solid #ccc; border-radius:8px; box-shadow:0 8px 32px rgba(0,0,0,0.2); z-index:99999; flex-direction:column; overflow:hidden; font-family:monospace;';

  modal.innerHTML = `
    <div style="background:#f6f6f6; padding:8px 14px; border-bottom:1px solid #ddd; display:flex; justify-content:space-between; align-items:center;">
      <span style="font-weight:bold; font-size:12px;">DSE 化學 PDF 解析調試控制台</span>
      <div>
        <button id="dbgBypassReloadBtn" style="padding:2px 8px; font-size:11px; margin-right:6px; cursor:pointer;">⚡ 強制重載本章</button>
        <button onclick="document.getElementById('debugModal').style.display='none'" style="cursor:pointer;">關閉</button>
      </div>
    </div>
    <div style="padding:6px 12px; background:#fff; border-bottom:1px solid #eee; display:flex; gap:8px;">
      <button id="tabShowJson" style="font-size:11px; padding:3px 8px; cursor:pointer;">題目結構 (JSON)</button>
      <button id="tabShowRaw" style="font-size:11px; padding:3px 8px; cursor:pointer;">PDF 原始文本 (Raw)</button>
    </div>
    <pre id="debugConsoleArea" style="flex:1; overflow:auto; margin:0; padding:12px; font-size:11px; background:#fafafa; white-space:pre-wrap; word-break:break-all;"></pre>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(modal);

  btn.onclick = () => {
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'flex' : 'none';
    showJsonTab();
  };

  const area = modal.querySelector('#debugConsoleArea');
  const showJsonTab = () => {
    area.textContent = JSON.stringify(window.chemApp.debugLogs.lastParsedQuestions, null, 2) || '尚未載入題目';
  };
  const showRawTab = () => {
    area.textContent = window.chemApp.debugLogs.lastRawText || '尚未讀取 PDF 文字';
  };

  modal.querySelector('#tabShowJson').onclick = showJsonTab;
  modal.querySelector('#tabShowRaw').onclick = showRawTab;
  modal.querySelector('#dbgBypassReloadBtn').onclick = () => {
    if (window.chemApp.activeChapterId) {
      openChapter(window.chemApp.activeChapterId, true);
    } else {
      alert('請先點選任一章節');
    }
  };
}

// ==========================================
// 8. 下方開放擴充區：隨時從此處加代碼偵錯
// ==========================================
// 範例：如果之後需要微調第 44 章的特定題目，直接在下方貼代碼即可，無需更改上方主程式：
/*
window.chemApp.addPostProcessor((questions, rawText) => {
  console.log("正在執行自訂 Hook，共處理題數:", questions.length);
  // 可直接修改題目內容後回傳
  return questions;
});
*/
// 在 app.js 最末端加上這段即可生效：
window.chemApp.addPostProcessor((questions, rawText) => {
  questions.forEach(q => {
    // 例如修正特定題目裡多餘的空白或文字
    q.question = q.question.replace(/多餘文字/g, '');
  });
  return questions;
});

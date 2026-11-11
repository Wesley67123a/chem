/**
 * DSE 化學分章模擬題庫系統
 * 架構：15 個大課題對應 Aristo《HKDSE NEW CHEMISTRY - A Modern View》共 65 章
 */

// 1. 完整定義 15 課題與 65 章節
const SYLLABUS_DATA = [
  {
    topicId: 'CHEM-01',
    topicName: 'CHEM-01 地球',
    chapters: [
      { id: 1, name: '第 1 章：大氣層與氣體' },
      { id: 2, name: '第 2 章：海洋中的資源與食鹽' },
      { id: 3, name: '第 3 章：岩石與礦物 (碳酸鈣及石灰)' }
    ]
  },
  {
    topicId: 'CHEM-02',
    topicName: 'CHEM-02 微觀世界 I',
    chapters: [
      { id: 4, name: '第 4 章：原子結構與同位素' },
      { id: 5, name: '第 5 章：元素週期表與元素分類' },
      { id: 6, name: '第 6 章：離子鍵與離子晶體' },
      { id: 7, name: '第 7 章：共價鍵與分子' },
      { id: 8, name: '第 8 章：金屬鍵與金屬晶體' }
    ]
  },
  {
    topicId: 'CHEM-03',
    topicName: 'CHEM-03 金屬',
    chapters: [
      { id: 9, name: '第 9 章：金屬的存在與提取' },
      { id: 10, name: '第 10 章：金屬的化學反應活性' },
      { id: 11, name: '第 11 章：金屬活性序與置換反應' },
      { id: 12, name: '第 12 章：金屬的腐蝕與防銹' },
      { id: 13, name: '第 13 章：摩爾概念與金屬計算' }
    ]
  },
  {
    topicId: 'CHEM-04',
    topicName: 'CHEM-04 酸和鹽基',
    chapters: [
      { id: 14, name: '第 14 章：酸和鹼的性質' },
      { id: 15, name: '第 15 章：氫離子與氫氧離子的角色' },
      { id: 16, name: '第 16 章：酸鹼強度與 pH 標度' },
      { id: 17, name: '第 17 章：鹽的製備方法' },
      { id: 18, name: '第 18 章：容量分析與酸鹼滴定' }
    ]
  },
  {
    topicId: 'CHEM-05',
    topicName: 'CHEM-05 化石燃料和碳化合物',
    chapters: [
      { id: 19, name: '第 19 章：化石燃料與烷烴' },
      { id: 20, name: '第 20 章：同系物與烷烴反應' },
      { id: 21, name: '第 21 章：烯烴與加成反應' },
      { id: 22, name: '第 22 章：加成聚合物' },
      { id: 23, name: '第 23 章：其他重要碳化合物（醇與羧酸簡介）' }
    ]
  },
  {
    topicId: 'CHEM-06',
    topicName: 'CHEM-06 微觀世界 II',
    chapters: [
      { id: 24, name: '第 24 章：共價分子的立體形狀' },
      { id: 25, name: '第 25 章：分子極性' },
      { id: 26, name: '第 26 章：分子間作用力（范德華力與氫鍵）' },
      { id: 27, name: '第 27 章：物質結構與物理性質的關係' }
    ]
  },
  {
    topicId: 'CHEM-07',
    topicName: 'CHEM-07 氧化還原·電池·電解',
    chapters: [
      { id: 28, name: '第 28 章：氧化還原概念與氧化數' },
      { id: 29, name: '第 29 章：化學電池與電動勢' },
      { id: 30, name: '第 30 章：重要氧化劑與還原劑' },
      { id: 31, name: '第 31 章：電解熔融物與水溶液' },
      { id: 32, name: '第 32 章：電解的工業應用' }
    ]
  },
  {
    topicId: 'CHEM-08',
    topicName: 'CHEM-08 化學反應與能量',
    chapters: [
      { id: 33, name: '第 33 章：吸熱與放熱反應及焓變' },
      { id: 34, name: '第 34 章：標準焓變之測定' },
      { id: 35, name: '第 35 章：赫斯定律 (Hess’s Law) 與能量循環' }
    ]
  },
  {
    topicId: 'CHEM-09',
    topicName: 'CHEM-09 反應速率',
    chapters: [
      { id: 36, name: '第 36 章：反應速率的量度與曲線分析' },
      { id: 37, name: '第 37 章：影響反應速率的因素' },
      { id: 38, name: '第 38 章：碰撞理論與活化能' },
      { id: 39, name: '第 39 章：催化劑及其機制' }
    ]
  },
  {
    topicId: 'CHEM-10',
    topicName: 'CHEM-10 化學平衡',
    chapters: [
      { id: 40, name: '第 40 章：動態平衡與可逆反應' },
      { id: 41, name: '第 41 章：平衡常數 Kc 的計算' },
      { id: 42, name: '第 42 章：勒沙特列原理 (Le Chatelier’s Principle)' }
    ]
  },
  {
    topicId: 'CHEM-11',
    topicName: 'CHEM-11 碳化合物的化學',
    chapters: [
      { id: 43, name: '第 43 章：同分異構體（構造與立體異構）' },
      { id: 44, name: '第 44 章：烷烴與烯烴反應機制' },
      { id: 45, name: '第 45 章：醇與鹵代烷' },
      { id: 46, name: '第 46 章：醛與酮' },
      { id: 47, name: '第 47 章：羧酸、酯與酰胺' },
      { id: 48, name: '第 48 章：縮合聚合物與有機合成路線' }
    ]
  },
  {
    topicId: 'CHEM-12',
    topicName: 'CHEM-12 化學世界中的規律',
    chapters: [
      { id: 49, name: '第 49 章：第三週期元素及其氧化物性質' },
      { id: 50, name: '第 50 章：過渡金屬元素與絡離子' }
    ]
  },
  {
    topicId: 'CHEM-13',
    topicName: 'CHEM-13 工業化學（選修）',
    chapters: [
      { id: 51, name: '第 51 章：工業化學動力學與速率方程' },
      { id: 52, name: '第 52 章：阿倫尼烏斯方程 (Arrhenius Equation)' },
      { id: 53, name: '第 53 章：工業製程：哈柏法製氨' },
      { id: 54, name: '第 54 章：工業製程：接觸法製硫酸' },
      { id: 55, name: '第 55 章：工業製程：氯鹼工業與綠色化學' }
    ]
  },
  {
    topicId: 'CHEM-14',
    topicName: 'CHEM-14 物料化學（選修）',
    chapters: [
      { id: 56, name: '第 56 章：晶體晶胞結構與金屬合金' },
      { id: 57, name: '第 57 章：高分子材料與塑膠' },
      { id: 58, name: '第 58 章：液晶體與現代材料' },
      { id: 59, name: '第 59 章：納米材料' },
      { id: 60, name: '第 60 章：物料的回收與環境問題' }
    ]
  },
  {
    topicId: 'CHEM-15',
    topicName: 'CHEM-15 分析化學（選修）',
    chapters: [
      { id: 61, name: '第 61 章：無機物定性分析 (離子檢驗)' },
      { id: 62, name: '第 62 章：紅外光譜 (IR Spectroscopy)' },
      { id: 63, name: '第 63 章：質譜 (Mass Spectrometry)' },
      { id: 64, name: '第 64 章：色譜分析法 (TLC 與 GC)' },
      { id: 65, name: '第 65 章：化學合成與結構綜合鑑定' }
    ]
  }
];

// 建立章節查找快取 (ChapterId -> { topic, chapter })
const CHAPTER_LOOKUP = {};
SYLLABUS_DATA.forEach(t => {
  t.chapters.forEach(c => {
    CHAPTER_LOOKUP[c.id] = { topic: t, chapter: c };
  });
});

// 2. 應用狀態管理與 LocalStorage
const STORAGE_KEY_QUESTIONS = 'DSE_CHEM_QUESTIONS_DATA';
const STORAGE_KEY_LOGS = 'DSE_CHEM_PRACTICE_LOGS';

let questionsDB = {}; // { chapterId: [ { id, question, options: {A,B,C,D}, answer, explanation } ] }
let practiceLogs = []; // [ { date: 'YYYY-MM-DD', chapterId: 11, qId: '...', isCorrect: true } ]

function initData() {
  const savedQ = localStorage.getItem(STORAGE_KEY_QUESTIONS);
  const savedL = localStorage.getItem(STORAGE_KEY_LOGS);

  if (savedQ) {
    try { questionsDB = JSON.parse(savedQ); } catch(e) { questionsDB = {}; }
  } else {
    // 預設樣例題目 (以第 11 章 金屬活性序 為例)
    questionsDB = {
      11: [
        {
          id: 'q_demo_1',
          question: '將鋅條放入硫酸銅(II)水溶液中，下列哪項敘述是正確的？\n化學方程式：$\\ce{Zn(s) + CuSO4(aq) -> ZnSO4(aq) + Cu(s)}$',
          options: {
            A: '溶液由無色變為藍色',
            B: '鋅條表面有紅棕色固體析出',
            C: '銅離子被氧化成金屬銅',
            D: '鋅原子的氧化數保持不變'
          },
          answer: 'B',
          explanation: '鋅的金屬活性高於銅，會置換出紅棕色的金屬銅析出於表面；$\\ce{Cu^{2+}}$ 離子獲得電子發生還原反應，溶液藍色逐漸變淺。'
        }
      ]
    };
    saveQuestions();
  }

  if (savedL) {
    try { practiceLogs = JSON.parse(savedL); } catch(e) { practiceLogs = []; }
  }
}

function saveQuestions() {
  localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questionsDB));
  updateCounts();
}

function savePracticeLogs() {
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(practiceLogs));
  updateDashboardProgress();
  renderHeatmap();
}

// 3. UI 初始化與事件監聽
document.addEventListener('DOMContentLoaded', () => {
  initData();
  renderSidebar();
  updateCounts();
  updateDashboardProgress();
  renderHeatmap();

  // 綁定頂部與側邊欄按鈕
  document.getElementById('expandAllBtn').addEventListener('click', () => toggleAllTopics(true));
  document.getElementById('collapseAllBtn').addEventListener('click', () => toggleAllTopics(false));
  document.getElementById('backToHomeBtn').addEventListener('click', showDashboardView);
  
  // 匯出 / 匯入 / 重設
  document.getElementById('exportBtn').addEventListener('click', exportJSON);
  document.getElementById('importJsonInput').addEventListener('change', importJSON);
  document.getElementById('resetDataBtn').addEventListener('click', resetAllData);

  // PDF 上傳監聽
  document.getElementById('pdfUploadInput').addEventListener('change', handlePdfUpload);
});

// 4. 側邊欄渲染
function renderSidebar() {
  const container = document.getElementById('topicListContainer');
  container.innerHTML = '';

  SYLLABUS_DATA.forEach(topic => {
    const groupEl = document.createElement('div');
    groupEl.className = 'topic-group';
    groupEl.id = `group-${topic.topicId}`;

    // 課題頭部
    const headerEl = document.createElement('div');
    headerEl.className = 'topic-header';
    headerEl.innerHTML = `
      <div class="topic-toggle-wrap">
        <span class="topic-toggle-icon">+</span>
        <span>${topic.topicName}</span>
      </div>
    `;

    // 點擊展開 / 收起
    headerEl.addEventListener('click', () => {
      const isOpen = groupEl.classList.toggle('open');
      headerEl.querySelector('.topic-toggle-icon').textContent = isOpen ? '−' : '+';
    });

    // 章節列表
    const chapListEl = document.createElement('div');
    chapListEl.className = 'chapter-list';

    topic.chapters.forEach(chap => {
      const chapCount = (questionsDB[chap.id] || []).length;
      const itemEl = document.createElement('div');
      itemEl.className = 'chapter-item';
      itemEl.id = `chap-item-${chap.id}`;
      itemEl.innerHTML = `
        <span>${chap.name}</span>
        <span class="chapter-badge" id="badge-${chap.id}">${chapCount} 題</span>
      `;
      itemEl.addEventListener('click', () => {
        openChapter(chap.id);
      });
      chapListEl.appendChild(itemEl);
    });

    groupEl.appendChild(headerEl);
    groupEl.appendChild(chapListEl);
    container.appendChild(groupEl);
  });
}

function toggleAllTopics(expand) {
  document.querySelectorAll('.topic-group').forEach(el => {
    if (expand) {
      el.classList.add('open');
      el.querySelector('.topic-toggle-icon').textContent = '−';
    } else {
      el.classList.remove('open');
      el.querySelector('.topic-toggle-icon').textContent = '+';
    }
  });
}

// 5. 視圖切換與作答渲染
function showDashboardView() {
  document.getElementById('chapterView').classList.remove('active');
  document.getElementById('dashboardView').classList.add('active');
  document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
  updateDashboardProgress();
  renderHeatmap();
}

let activeChapterId = null;

function openChapter(chapId) {
  activeChapterId = chapId;
  const lookup = CHAPTER_LOOKUP[chapId];
  if (!lookup) return;

  // 切換 UI active 狀態
  document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
  const activeEl = document.getElementById(`chap-item-${chapId}`);
  if (activeEl) activeEl.classList.add('active');

  // 更新麵包屑與章節標題
  document.getElementById('bcTopicName').textContent = lookup.topic.topicName;
  document.getElementById('bcChapterName').textContent = `第 ${lookup.chapter.id} 章`;
  document.getElementById('currentChapterTitle').textContent = lookup.chapter.name;

  // 切換檢視區
  document.getElementById('dashboardView').classList.remove('active');
  document.getElementById('chapterView').classList.add('active');

  // 渲染題目卡片
  renderChapterQuestions(chapId);
}

function renderChapterQuestions(chapId) {
  const container = document.getElementById('questionList');
  container.innerHTML = '';

  const qList = questionsDB[chapId] || [];
  document.getElementById('chapterStats').textContent = `共 ${qList.length} 題`;

  if (qList.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 48px 0;">
        此章節目前暫無題目。請利用右上角「匯入 PDF」上傳包含第 ${chapId} 課的題庫文件。
      </div>
    `;
    return;
  }

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = `q-card-${q.id}`;

    // 格式化題幹換行
    const formattedContent = q.question.replace(/\n/g, '<br/>');

    card.innerHTML = `
      <div class="q-header">
        <span class="q-number">第 ${index + 1} 題</span>
      </div>
      <div class="q-body">${formattedContent}</div>
      <div class="options-grid">
        ${['A', 'B', 'C', 'D'].map(optKey => `
          <button class="opt-btn" data-qid="${q.id}" data-opt="${optKey}">
            <span class="opt-key">${optKey}.</span>
            <span class="opt-text">${q.options[optKey] || ''}</span>
          </button>
        `).join('')}
      </div>
      <div class="explanation-panel" id="exp-${q.id}">
        <span class="exp-title">解析與說明</span>
        <div class="exp-body">${(q.explanation || '暫無詳細解析').replace(/\n/g, '<br/>')}</div>
      </div>
    `;

    // 綁定選項作答點擊
    const optButtons = card.querySelectorAll('.opt-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        handleAnswer(q, btn.dataset.opt, card, optButtons);
      });
    });

    container.appendChild(card);
  });

  // 使用 KaTeX 渲染化學式與數學公式
  renderKaTeXInElement(container);
}

function handleAnswer(question, selectedOpt, cardEl, allOptButtons) {
  const isCorrect = (selectedOpt.toUpperCase() === question.answer.toUpperCase());

  // 禁用所有按鈕並加上顏色
  allOptButtons.forEach(btn => {
    btn.disabled = true;
    const key = btn.dataset.opt;
    if (key === question.answer.toUpperCase()) {
      btn.classList.add('correct');
    } else if (key === selectedOpt && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  // 展開解析
  const expPanel = cardEl.querySelector('.explanation-panel');
  if (expPanel) expPanel.classList.add('show');

  // 記錄練習
  const todayStr = getTodayDateStr();
  practiceLogs.push({
    date: todayStr,
    chapterId: activeChapterId,
    qId: question.id,
    isCorrect: isCorrect,
    timestamp: Date.now()
  });

  savePracticeLogs();
}

// 6. KaTeX 渲染器安全封裝
function renderKaTeXInElement(element) {
  if (typeof renderMathInElement === 'function') {
    try {
      renderMathInElement(element, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX 渲染異常:', e);
    }
  }
}

// 7. 數據指標與統計
function updateCounts() {
  let total = 0;
  for (let cId in questionsDB) {
    const len = questionsDB[cId].length;
    total += len;
    const badge = document.getElementById(`badge-${cId}`);
    if (badge) badge.textContent = `${len} 題`;
  }
  document.getElementById('totalQuestionsCount').textContent = `共 ${total} 題 (中文卷)`;
  document.getElementById('dashTotalQuestions').textContent = total;
}

function updateDashboardProgress() {
  const answeredTotal = practiceLogs.length;
  const correctTotal = practiceLogs.filter(l => l.isCorrect).length;
  const wrongTotal = answeredTotal - correctTotal;
  const today = getTodayDateStr();
  const todayTotal = practiceLogs.filter(l => l.date === today).length;

  const rate = answeredTotal > 0 ? Math.round((correctTotal / answeredTotal) * 100) : 0;

  document.getElementById('answeredCount').textContent = answeredTotal;
  document.getElementById('wrongCount').textContent = wrongTotal;
  document.getElementById('todayAnsweredCount').textContent = todayTotal;
  document.getElementById('masteryRate').textContent = `${rate}%`;
  document.getElementById('masteryFill').style.width = `${rate}%`;
}

// 8. 練習熱力圖 (最近 12 週 = 84 天)
function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  grid.innerHTML = '';

  const tooltip = document.getElementById('customTooltip');
  const daysToShow = 84; // 12 週
  const today = new Date();

  // 計算每一天的練習統計 { 'YYYY-MM-DD': [ { chapterId, isCorrect } ] }
  const logMap = {};
  practiceLogs.forEach(l => {
    if (!logMap[l.date]) logMap[l.date] = [];
    logMap[l.date].push(l);
  });

  for (let i = daysToShow - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = formatDate(d);

    const logs = logMap[dateStr] || [];
    const count = logs.length;

    let lv = 'lv-0';
    if (count >= 1 && count <= 3) lv = 'lv-1';
    else if (count >= 4 && count <= 8) lv = 'lv-2';
    else if (count > 8) lv = 'lv-3';

    const cell = document.createElement('div');
    cell.className = `heat-cell ${lv}`;

    // 滑鼠移入 Tooltip
    cell.addEventListener('mouseenter', (e) => {
      let tooltipText = `${dateStr}：${count} 次作答`;
      if (count > 0) {
        const uniqueChapters = [...new Set(logs.map(l => `第 ${l.chapterId} 章`))];
        tooltipText += `<br/>練習章節：${uniqueChapters.join(', ')}`;
      }
      tooltip.innerHTML = tooltipText;
      tooltip.style.display = 'block';
      tooltip.style.left = `${e.clientX + 10}px`;
      tooltip.style.top = `${e.clientY + 10}px`;
    });

    cell.addEventListener('mousemove', (e) => {
      tooltip.style.left = `${e.clientX + 10}px`;
      tooltip.style.top = `${e.clientY + 10}px`;
    });

    cell.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });

    grid.appendChild(cell);
  }
}

// 9. PDF 檔案名稱解析與上傳擷取
async function handlePdfUpload(e) {
  const files = Array.from(e.target.files);
  if (!files || files.length === 0) return;

  for (const file of files) {
    const chapNum = detectChapterNumber(file.name);
    if (!chapNum || chapNum < 1 || chapNum > 65) {
      showToast(`❌ 檔案「${file.name}」無法辨認出 1–65 章節編號。請確保檔名包含章節數字。`);
      continue;
    }

    showToast(`正在解析「${file.name}」對應至第 ${chapNum} 章...`);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const extractedText = await extractTextFromPdf(arrayBuffer);
      const parsedQuestions = parseQuestionsFromText(extractedText);

      if (parsedQuestions.length === 0) {
        showToast(`⚠️「${file.name}」未能擷取到標準選擇題，請檢查格式。`);
        continue;
      }

      if (!questionsDB[chapNum]) questionsDB[chapNum] = [];
      questionsDB[chapNum].push(...parsedQuestions);
      saveQuestions();

      showToast(`✅ 成功匯入 ${parsedQuestions.length} 題至第 ${chapNum} 章！`);
    } catch (err) {
      console.error(err);
      showToast(`❌ 解析「${file.name}」失敗：${err.message}`);
    }
  }

  // 重設 input
  e.target.value = '';
}

/**
 * 依據檔名偵測 1–65 章節數字
 * 範例：11.pdf, CHEM-11.pdf, ch11.pdf, Chapter11_碳化合物.pdf, 第11章.pdf
 */
function detectChapterNumber(filename) {
  // 1. 優先比對 "第X章" 或 "chX" 或 "ChapterX"
  const prefixMatch = filename.match(/(?:第|ch|chapter|chem[-_]?)\s*(\d{1,2})/i);
  if (prefixMatch) {
    const num = parseInt(prefixMatch[1], 10);
    if (num >= 1 && num <= 65) return num;
  }

  // 2. 匹配以數字開頭 (例如 11.pdf, 11_xxx.pdf)
  const startMatch = filename.match(/^(\d{1,2})/);
  if (startMatch) {
    const num = parseInt(startMatch[1], 10);
    if (num >= 1 && num <= 65) return num;
  }

  // 3. 匹配檔名中任意 1-2 位數字
  const anyNumMatch = filename.match(/\b(\d{1,2})\b/);
  if (anyNumMatch) {
    const num = parseInt(anyNumMatch[1], 10);
    if (num >= 1 && num <= 65) return num;
  }

  return null;
}

/**
 * PDF.js 全文擷取
 */
async function extractTextFromPdf(arrayBuffer) {
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let fullText = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(' ') + '\n';
  }

  return fullText;
}

/**
 * 強健正則化題目文字解析
 * 支援題號 1. / Q1.，選項 A. B. C. D.，答案 Ans: B，解釋 Exp: ...
 */
function parseQuestionsFromText(text) {
  const questions = [];
  
  // 標準化空白與換行
  const cleanText = text.replace(/\r\n/g, '\n');

  // 切割各題目塊（以 1. 或 Q1 或 (1) 為分隔）
  const splitRegex = /(?:^|\n)(?:Q?\d+[\.、\)]|\(\d+\))\s*/g;
  const rawBlocks = cleanText.split(splitRegex).filter(b => b.trim().length > 0);

  rawBlocks.forEach((block, idx) => {
    // 提取 A, B, C, D 選項
    const optMatch = block.match(/A[\.、\)]\s*([\s\S]*?)B[\.、\)]\s*([\s\S]*?)C[\.、\)]\s*([\s\S]*?)D[\.、\)]\s*([\s\S]*?)(?=(?:Ans|Answer|答案|Exp|Explanation|解析|$)|\n\n)/i);

    if (optMatch) {
      const qBody = block.substring(0, block.indexOf(optMatch[0])).trim();
      const optA = optMatch[1].trim();
      const optB = optMatch[2].trim();
      const optC = optMatch[3].trim();
      let optD = optMatch[4].trim();

      // 提取答案 (Answer / Ans / 答案：B)
      let ans = 'A';
      const ansMatch = block.match(/(?:Ans|Answer|答案)\s*[:：]?\s*([A-D])/i);
      if (ansMatch) {
        ans = ansMatch[1].toUpperCase();
      }

      // 提取解釋 (Explanation / Exp / 解析)
      let exp = '';
      const expMatch = block.match(/(?:Exp|Explanation|解析|說明)\s*[:：]?\s*([\s\S]*)/i);
      if (expMatch) {
        exp = expMatch[1].trim();
      }

      // 清理選項 D 中可能夾帶的答案或解釋文字
      if (optD.includes('Ans:')) optD = optD.split(/Ans:/i)[0].trim();
      if (optD.includes('答案')) optD = optD.split(/答案/i)[0].trim();

      questions.push({
        id: `q_${Date.now()}_${idx}`,
        question: qBody || `題目 ${idx + 1}`,
        options: {
          A: optA,
          B: optB,
          C: optC,
          D: optD
        },
        answer: ans,
        explanation: exp
      });
    }
  });

  return questions;
}

// 10. 資料備份與還原 (JSON)
function exportJSON() {
  const exportPayload = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    questions: questionsDB,
    logs: practiceLogs
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', `DSE_Chem_Questions_Backup_${getTodayDateStr()}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

function importJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (data.questions) {
        questionsDB = data.questions;
        practiceLogs = data.logs || [];
        saveQuestions();
        savePracticeLogs();
        renderSidebar();
        showToast('✅ 題庫與作答紀錄備份匯入成功！');
      } else {
        showToast('❌ JSON 結構不符合題庫規範。');
      }
    } catch (err) {
      showToast('❌ 讀取 JSON 發生錯誤。');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function resetAllData() {
  if (confirm('確定要清除所有已匯入題目與作答記錄嗎？此動作無法復原。')) {
    localStorage.removeItem(STORAGE_KEY_QUESTIONS);
    localStorage.removeItem(STORAGE_KEY_LOGS);
    location.reload();
  }
}

// 11. 工具函式
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}

function getTodayDateStr() {
  return formatDate(new Date());
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

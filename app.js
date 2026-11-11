/**
 * DSE 化學分章模擬題庫系統
 * 支援從 GitHub /pdfs/ 目錄自動讀取 PDF、擷取文字與圖片
 */

const SYLLABUS_DATA = [
  { topicId: 'CHEM-01', topicName: 'CHEM-01 地球', chapters: [{ id: 1, name: '第 1 章：大氣層與氣體' }, { id: 2, name: '第 2 章：海洋中的資源與食鹽' }, { id: 3, name: '第 3 章：岩石與礦物' }] },
  { topicId: 'CHEM-02', topicName: 'CHEM-02 微觀世界 I', chapters: [{ id: 4, name: '第 4 章：原子結構與同位素' }, { id: 5, name: '第 5 章：元素週期表與元素分類' }, { id: 6, name: '第 6 章：離子鍵與離子晶體' }, { id: 7, name: '第 7 章：共價鍵與分子' }, { id: 8, name: '第 8 章：金屬鍵與金屬晶體' }] },
  { topicId: 'CHEM-03', topicName: 'CHEM-03 金屬', chapters: [{ id: 9, name: '第 9 章：金屬的存在與提取' }, { id: 10, name: '第 10 章：金屬的化學反應活性' }, { id: 11, name: '第 11 章：金屬活性序與置換反應' }, { id: 12, name: '第 12 章：金屬的腐蝕與防銹' }, { id: 13, name: '第 13 章：摩爾概念與金屬計算' }] },
  { topicId: 'CHEM-04', topicName: 'CHEM-04 酸和鹽基', chapters: [{ id: 14, name: '第 14 章：酸和鹼的性質' }, { id: 15, name: '第 15 章：氫離子與氫氧離子的角色' }, { id: 16, name: '第 16 章：酸鹼強度與 pH 標度' }, { id: 17, name: '第 17 章：鹽的製備方法' }, { id: 18, name: '第 18 章：容量分析與酸鹼滴定' }] },
  { topicId: 'CHEM-05', topicName: 'CHEM-05 化石燃料和碳化合物', chapters: [{ id: 19, name: '第 19 章：化石燃料與烷烴' }, { id: 20, name: '第 20 章：同系物與烷烴反應' }, { id: 21, name: '第 21 章：烯烴與加成反應' }, { id: 22, name: '第 22 章：加成聚合物' }, { id: 23, name: '第 23 章：其他重要碳化合物' }] },
  { topicId: 'CHEM-06', topicName: 'CHEM-06 微觀世界 II', chapters: [{ id: 24, name: '第 24 章：共價分子的立體形狀' }, { id: 25, name: '第 25 章：分子極性' }, { id: 26, name: '第 26 章：分子間作用力' }, { id: 27, name: '第 27 章：物質結構與物理性質的關係' }] },
  { topicId: 'CHEM-07', topicName: 'CHEM-07 氧化還原·電池·電解', chapters: [{ id: 28, name: '第 28 章：氧化還原概念與氧化數' }, { id: 29, name: '第 29 章：化學電池與電動勢' }, { id: 30, name: '第 30 章：重要氧化劑與還原劑' }, { id: 31, name: '第 31 章：電解熔融物與水溶液' }, { id: 32, name: '第 32 章：電解的工業應用' }] },
  { topicId: 'CHEM-08', topicName: 'CHEM-08 化學反應與能量', chapters: [{ id: 33, name: '第 33 章：吸熱與放熱反應及焓變' }, { id: 34, name: '第 34 章：標準焓變之測定' }, { id: 35, name: '第 35 章：赫斯定律' }] },
  { topicId: 'CHEM-09', topicName: 'CHEM-09 反應速率', chapters: [{ id: 36, name: '第 36 章：反應速率的量度與曲線分析' }, { id: 37, name: '第 37 章：影響反應速率的因素' }, { id: 38, name: '第 38 章：碰撞理論與活化能' }, { id: 39, name: '第 39 章：催化劑及其機制' }] },
  { topicId: 'CHEM-10', topicName: 'CHEM-10 化學平衡', chapters: [{ id: 40, name: '第 40 章：動態平衡與可逆反應' }, { id: 41, name: '第 41 章：平衡常數 Kc 的計算' }, { id: 42, name: '第 42 章：勒沙特列原理' }] },
  { topicId: 'CHEM-11', topicName: 'CHEM-11 碳化合物的化學', chapters: [{ id: 43, name: '第 43 章：同分異構體' }, { id: 44, name: '第 44 章：烷烴與烯烴反應機制' }, { id: 45, name: '第 45 章：醇與鹵代烷' }, { id: 46, name: '第 46 章：醛與酮' }, { id: 47, name: '第 47 章：羧酸、酯與酰胺' }, { id: 48, name: '第 48 章：縮合聚合物與有機合成路線' }] },
  { topicId: 'CHEM-12', topicName: 'CHEM-12 化學世界中的規律', chapters: [{ id: 49, name: '第 49 章：第三週期元素' }, { id: 50, name: '第 50 章：過渡金屬元素與絡離子' }] },
  { topicId: 'CHEM-13', topicName: 'CHEM-13 工業化學（選修）', chapters: [{ id: 51, name: '第 51 章：速率方程' }, { id: 52, name: '第 52 章：阿倫尼烏斯方程' }, { id: 53, name: '第 53 章：哈柏法製氨' }, { id: 54, name: '第 54 章：接觸法製硫酸' }, { id: 55, name: '第 55 章：氯鹼工業' }] },
  { topicId: 'CHEM-14', topicName: 'CHEM-14 物料化學（選修）', chapters: [{ id: 56, name: '第 56 章：金屬合金' }, { id: 57, name: '第 57 章：高分子材料與塑膠' }, { id: 58, name: '第 58 章：現代材料' }, { id: 59, name: '第 59 章：納米材料' }, { id: 60, name: '第 60 章：物料回收' }] },
  { topicId: 'CHEM-15', topicName: 'CHEM-15 分析化學（選修）', chapters: [{ id: 61, name: '第 61 章：離子檢驗' }, { id: 62, name: '第 62 章：紅外光譜' }, { id: 63, name: '第 63 章：質譜' }, { id: 64, name: '第 64 章：色譜分析法' }, { id: 65, name: '第 65 章：結構綜合鑑定' }] }
];

const CHAPTER_LOOKUP = {};
SYLLABUS_DATA.forEach(t => { t.chapters.forEach(c => { CHAPTER_LOOKUP[c.id] = { topic: t, chapter: c }; }); });

const STORAGE_KEY_QUESTIONS = 'DSE_CHEM_QUESTIONS_DATA';
const STORAGE_KEY_LOGS = 'DSE_CHEM_PRACTICE_LOGS';

let questionsDB = {}; 
let practiceLogs = []; 
let activeChapterId = null;

function initData() {
  const savedL = localStorage.getItem(STORAGE_KEY_LOGS);
  if (savedL) { try { practiceLogs = JSON.parse(savedL); } catch(e) { practiceLogs = []; } }
  
  // 自動生成今日日期
  document.getElementById('generateDate').textContent = `生成日期：${getTodayDateStr()}`;
}

function savePracticeLogs() {
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(practiceLogs));
  updateDashboardProgress();
  renderHeatmap();
}

document.addEventListener('DOMContentLoaded', () => {
  initData();
  renderSidebar();
  updateDashboardProgress();
  renderHeatmap();

  document.getElementById('expandAllBtn').addEventListener('click', () => toggleAllTopics(true));
  document.getElementById('collapseAllBtn').addEventListener('click', () => toggleAllTopics(false));
  document.getElementById('backToHomeBtn').addEventListener('click', showDashboardView);
});

function renderSidebar() {
  const container = document.getElementById('topicListContainer');
  container.innerHTML = '';

  SYLLABUS_DATA.forEach(topic => {
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

    const chapListEl = groupEl.querySelector('.chapter-list');
    topic.chapters.forEach(chap => {
      const itemEl = document.createElement('div');
      itemEl.className = 'chapter-item';
      itemEl.id = `chap-item-${chap.id}`;
      itemEl.innerHTML = `<span>${chap.name}</span>`;
      itemEl.addEventListener('click', () => openChapter(chap.id));
      chapListEl.appendChild(itemEl);
    });

    container.appendChild(groupEl);
  });
}

function toggleAllTopics(expand) {
  document.querySelectorAll('.topic-group').forEach(el => {
    expand ? el.classList.add('open') : el.classList.remove('open');
    el.querySelector('.topic-toggle-icon').textContent = expand ? '−' : '+';
  });
}

function showDashboardView() {
  document.getElementById('chapterView').classList.remove('active');
  document.getElementById('dashboardView').classList.add('active');
  document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
}

// 核心：從 GitHub pdfs 資料夾讀取 PDF 並提取圖文
async function openChapter(chapId) {
  activeChapterId = chapId;
  const lookup = CHAPTER_LOOKUP[chapId];
  if (!lookup) return;

  document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
  document.getElementById(`chap-item-${chapId}`).classList.add('active');

  document.getElementById('bcTopicName').textContent = lookup.topic.topicName;
  document.getElementById('bcChapterName').textContent = `第 ${lookup.chapter.id} 章`;
  document.getElementById('currentChapterTitle').textContent = lookup.chapter.name;

  document.getElementById('dashboardView').classList.remove('active');
  document.getElementById('chapterView').classList.add('active');

  const container = document.getElementById('questionList');
  container.innerHTML = `<div style="text-align: center; padding: 48px 0;">正在從 GitHub 載入第 ${chapId} 章的 PDF 題庫與圖片，請稍候...</div>`;

  try {
    // 檔名補零，例如 ch01.pdf
    const pdfUrl = `./pdfs/ch${String(chapId).padStart(2, '0')}.pdf`;
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDoc = await loadingTask.promise;

    // 解析 PDF 成為題目陣列
    const parsedQuestions = await parseQuestionsAndImagesFromPdf(pdfDoc);
    questionsDB[chapId] = parsedQuestions;

    renderChapterQuestions(chapId);
  } catch (err) {
    console.warn(err);
    container.innerHTML = `
      <div style="text-align: center; color: var(--danger-color); padding: 48px 0;">
        找不到 <b>pdfs/ch${String(chapId).padStart(2, '0')}.pdf</b>。<br><br>
        請確認你已經把 PDF 上傳到 GitHub 倉庫的 pdfs 資料夾中，並命名正確。
      </div>`;
  }
}

// PDF 圖文提取邏輯
async function parseQuestionsAndImagesFromPdf(pdfDoc) {
  let allQuestions = [];
  
  // 逐頁處理，確保圖片跟隨該頁的題目
  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    
    // 1. 抓取文字
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    
    // 2. 抓取圖片 (轉 Base64)
    let pageImages = [];
    try {
      const opList = await page.getOperatorList();
      for (let i = 0; i < opList.fnArray.length; i++) {
        if (opList.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
          const imgName = opList.args[i][0];
          const imgObj = await page.objs.get(imgName);
          if (imgObj && imgObj.width > 50) { // 過濾掉太小的裝飾圖
            pageImages.push(convertPdfImageToBase64(imgObj));
          }
        }
      }
    } catch (e) { console.warn("圖片解析失敗", e); }

    // 3. 把該頁文字切成題目
    const pageQuestions = parseQuestionsFromText(pageText);

    // 4. 將圖片分配給該頁的題目 (簡單邏輯：如果有圖，分給該頁第一題)
    if (pageImages.length > 0 && pageQuestions.length > 0) {
      pageQuestions[0].imageUrl = pageImages[0];
    }
    
    allQuestions = allQuestions.concat(pageQuestions);
  }
  return allQuestions;
}

// 文字正則表達式切題
function parseQuestionsFromText(text) {
  const questions = [];
  const cleanText = text.replace(/\r\n/g, '\n');
  
  // 以數字加點 (例如 1. 或 2.) 作為切題依據
  const rawBlocks = cleanText.split(/(?:^|\s)(?:\d+\.)\s+/g).filter(b => b.trim().length > 10);

  rawBlocks.forEach((block, idx) => {
    // 尋找 A. B. C. D.
    const optMatch = block.match(/A[\.、\)]\s*([\s\S]*?)B[\.、\)]\s*([\s\S]*?)C[\.、\)]\s*([\s\S]*?)D[\.、\)]\s*([\s\S]*?)(?=(?:Ans|Answer|答案|Exp|Explanation|解析|$)|\n\n)/i);

    if (optMatch) {
      const qBody = block.substring(0, block.indexOf(optMatch[0])).trim();
      const optA = optMatch[1].trim(), optB = optMatch[2].trim(), optC = optMatch[3].trim();
      let optD = optMatch[4].trim();

      let ans = 'A', exp = '';
      const ansMatch = block.match(/(?:Ans|Answer|答案)\s*[:：]?\s*([A-D])/i);
      if (ansMatch) ans = ansMatch[1].toUpperCase();

      const expMatch = block.match(/(?:Exp|Explanation|解析|說明)\s*[:：]?\s*([\s\S]*)/i);
      if (expMatch) exp = expMatch[1].trim();

      if (optD.includes('Ans:')) optD = optD.split(/Ans:/i)[0].trim();
      
      questions.push({
        id: `q_${Date.now()}_${idx}`,
        question: qBody || `題目內容`,
        options: { A: optA, B: optB, C: optC, D: optD },
        answer: ans,
        explanation: exp
      });
    }
  });
  return questions;
}

// 將 PDF 圖片像素轉換為網頁可顯示圖片
function convertPdfImageToBase64(imgObj) {
  const canvas = document.createElement('canvas');
  canvas.width = imgObj.width;
  canvas.height = imgObj.height;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(imgObj.width, imgObj.height);
  
  if (imgObj.data.length === imgObj.width * imgObj.height * 3) { // RGB
    let p = 0;
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = imgObj.data[p]; imgData.data[i+1] = imgObj.data[p+1];
      imgData.data[i+2] = imgObj.data[p+2]; imgData.data[i+3] = 255;
      p += 3;
    }
  } else { imgData.data.set(imgObj.data); } // RGBA / Grayscale
  
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL('image/png');
}

// 渲染章節題目至畫面
function renderChapterQuestions(chapId) {
  const container = document.getElementById('questionList');
  container.innerHTML = '';
  const qList = questionsDB[chapId] || [];
  
  document.getElementById('chapterStats').textContent = `共 ${qList.length} 題`;
  document.getElementById('dashTotalQuestions').textContent = qList.length; // 簡化處理總數
  
  if (qList.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 48px 0;">此 PDF 內未偵測到標準格式的題目。請確保 PDF 內容包含「1.」、「A. B. C. D.」與「Ans:」。</div>`;
    return;
  }

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';

    const formattedContent = q.question.replace(/\n/g, '<br/>');
    // 如果這題有抓到化學圖片，就加上圖片標籤
    const imageHtml = q.imageUrl ? `<div style="margin: 16px 0;"><img src="${q.imageUrl}" style="max-height: 150px; border: 1px solid #e5e5e3; border-radius: 4px;" alt="題目圖片" /></div>` : '';

    card.innerHTML = `
      <div class="q-header"><span class="q-number">第 ${index + 1} 題</span></div>
      <div class="q-body">${formattedContent}</div>
      ${imageHtml}
      <div class="options-grid">
        ${['A', 'B', 'C', 'D'].map(k => `<button class="opt-btn" data-opt="${k}"><span class="opt-key">${k}.</span> <span>${q.options[k]}</span></button>`).join('')}
      </div>
      <div class="explanation-panel">
        <span class="exp-title">解析與說明</span>
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
        
        practiceLogs.push({ date: getTodayDateStr(), chapterId: chapId, qId: q.id, isCorrect });
        savePracticeLogs();
      });
    });
    container.appendChild(card);
  });

  if (typeof renderMathInElement === 'function') {
    renderMathInElement(container, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }] });
  }
}

// 數據統計與圖表
function updateDashboardProgress() {
  const answered = practiceLogs.length;
  const correct = practiceLogs.filter(l => l.isCorrect).length;
  document.getElementById('answeredCount').textContent = answered;
  document.getElementById('wrongCount').textContent = answered - correct;
  document.getElementById('todayAnsweredCount').textContent = practiceLogs.filter(l => l.date === getTodayDateStr()).length;
  const rate = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  document.getElementById('masteryRate').textContent = `${rate}%`;
  document.getElementById('masteryFill').style.width = `${rate}%`;
}

function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  grid.innerHTML = '';
  const logMap = {};
  practiceLogs.forEach(l => { logMap[l.date] = (logMap[l.date] || 0) + 1; });
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(); d.setDate(today.getDate() - i);
    const dateStr = formatDate(d);
    const count = logMap[dateStr] || 0;
    const cell = document.createElement('div');
    let lv = 'lv-0';
    if (count >= 1 && count <= 3) lv = 'lv-1';
    else if (count >= 4 && count <= 8) lv = 'lv-2';
    else if (count > 8) lv = 'lv-3';
    cell.className = `heat-cell ${lv}`;
    grid.appendChild(cell);
  }
}

function getTodayDateStr() { return formatDate(new Date()); }
function formatDate(date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
/**
 * 語言狀態：'c' 代表中文卷，'e' 代表英文卷
 */
let currentLang = 'c'; 

document.addEventListener('DOMContentLoaded', () => {
  initData();
  renderSidebar();
  updateDashboardProgress();
  renderHeatmap();

  document.getElementById('expandAllBtn').addEventListener('click', () => toggleAllTopics(true));
  document.getElementById('collapseAllBtn').addEventListener('click', () => toggleAllTopics(false));
  document.getElementById('backToHomeBtn').addEventListener('click', showDashboardView);

  // 監聽中/英文卷切換按鈕
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentLang === btn.dataset.lang) return;
      
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLang = btn.dataset.lang;

      // 若目前停留在某一章，自動重新載入該語言的 PDF
      if (activeChapterId) {
        openChapter(activeChapterId);
      }
    });
  });
});

/**
 * 嚴格依照檔名規範：chemqb_chxx_mcq_y.pdf 載入
 * x: 01 ~ 65（兩位數補零）
 * y: c 或 e
 */
async function openChapter(chapId) {
  activeChapterId = chapId;
  const lookup = CHAPTER_LOOKUP[chapId];
  if (!lookup) return;

  document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
  const activeEl = document.getElementById(`chap-item-${chapId}`);
  if (activeEl) activeEl.classList.add('active');

  document.getElementById('bcTopicName').textContent = lookup.topic.topicName;
  document.getElementById('bcChapterName').textContent = `第 ${lookup.chapter.id} 章`;
  document.getElementById('currentChapterTitle').textContent = lookup.chapter.name;

  document.getElementById('dashboardView').classList.remove('active');
  document.getElementById('chapterView').classList.add('active');

  const container = document.getElementById('questionList');
  
  // 產生標準檔名格式：chemqb_ch01_mcq_c.pdf
  const chapNumStr = String(chapId).padStart(2, '0');
  const targetFileName = `chemqb_ch${chapNumStr}_mcq_${currentLang}.pdf`;
  const pdfUrl = `./pdfs/${targetFileName}`;

  container.innerHTML = `
    <div style="text-align: center; padding: 48px 0; color: var(--text-secondary);">
      正在從 GitHub 載入 <code>${targetFileName}</code> 並解析題目與圖片...
    </div>`;

  try {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDoc = await loadingTask.promise;

    // 解析該 PDF 的文字與化學結構式圖片
    const parsedQuestions = await parseQuestionsAndImagesFromPdf(pdfDoc);
    questionsDB[chapId] = parsedQuestions;

    renderChapterQuestions(chapId);
  } catch (err) {
    console.warn('載入 PDF 失敗:', err);
    container.innerHTML = `
      <div style="text-align: center; color: var(--danger-color); padding: 48px 0; line-height: 1.8;">
        找不到對應的題庫檔案：<br>
        <code style="background: var(--bg-tertiary); padding: 2px 8px; border-radius: 4px; font-weight: bold;">pdfs/${targetFileName}</code><br><br>
        <span style="color: var(--text-secondary); font-size: 13px;">
          請檢查 GitHub 倉庫的 <code>pdfs/</code> 資料夾內是否有該檔案，<br>
          並確認檔名大小寫完全一致。
        </span>
      </div>`;
  }
}

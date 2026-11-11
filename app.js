/**
 * DSE 化學分章模擬題庫系統 (GitHub PDF 自動解析完整版)
 * 自動讀取路徑：./pdfs/chemqb_ch{01~65}_mcq_{c|e}.pdf
 */

// 1. 完整 15 課題與 65 章節架構 (Aristo HKDSE NEW CHEMISTRY)
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

// 建立快速查詢索引
const CHAPTER_LOOKUP = {};
SYLLABUS_DATA.forEach(t => {
  t.chapters.forEach(c => {
    CHAPTER_LOOKUP[c.id] = { topic: t, chapter: c };
  });
});

// 2. 狀態與 LocalStorage Key
const STORAGE_KEY_QUESTIONS = 'DSE_CHEM_QUESTIONS_CACHE_V2';
const STORAGE_KEY_LOGS = 'DSE_CHEM_PRACTICE_LOGS_V2';

let questionsDB = {}; // 格式: { "c_11": [...], "e_11": [...] }
let practiceLogs = []; // 格式: [ { date: 'YYYY-MM-DD', chapterId: 11, qId: '...', isCorrect: true } ]
let currentLang = 'c'; // 預設 'c' (中文卷)，可切換為 'e' (英文卷)
let activeChapterId = null;

// 3. 初始化與事件綁定
document.addEventListener('DOMContentLoaded', () => {
  initData();
  injectLanguageSwitcher();
  renderSidebar();
  updateCounts();
  updateDashboardProgress();
  renderHeatmap();

  // 綁定展開與收起按鈕
  const expandBtn = document.getElementById('expandAllBtn');
  const collapseBtn = document.getElementById('collapseAllBtn');
  const backBtn = document.getElementById('backToHomeBtn');

  if (expandBtn) expandBtn.addEventListener('click', () => toggleAllTopics(true));
  if (collapseBtn) collapseBtn.addEventListener('click', () => toggleAllTopics(false));
  if (backBtn) backBtn.addEventListener('click', showDashboardView);

  // 綁定頂部工具列按鈕（手動上傳 PDF / 匯出匯入 JSON / 重設）
  const pdfInput = document.getElementById('pdfUploadInput');
  const exportBtn = document.getElementById('exportBtn');
  const importInput = document.getElementById('importJsonInput');
  const resetBtn = document.getElementById('resetDataBtn');

  if (pdfInput) pdfInput.addEventListener('change', handleManualPdfUpload);
  if (exportBtn) exportBtn.addEventListener('click', exportJSON);
  if (importInput) importInput.addEventListener('change', importJSON);
  if (resetBtn) resetBtn.addEventListener('click', resetAllData);
});

function initData() {
  const savedQ = localStorage.getItem(STORAGE_KEY_QUESTIONS);
  const savedL = localStorage.getItem(STORAGE_KEY_LOGS);

  if (savedQ) {
    try { questionsDB = JSON.parse(savedQ); } catch (e) { questionsDB = {}; }
  }
  if (savedL) {
    try { practiceLogs = JSON.parse(savedL); } catch (e) { practiceLogs = []; }
  }

  const genDateEl = document.getElementById('generateDate');
  if (genDateEl) {
    genDateEl.textContent = `生成日期：${getTodayDateStr()}`;
  }
}

function saveQuestions() {
  try {
    localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questionsDB));
  } catch (e) {
    console.warn('LocalStorage 空間不足，僅保留記憶體快取:', e);
  }
  updateCounts();
}

function savePracticeLogs() {
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(practiceLogs));
  updateDashboardProgress();
  renderHeatmap();
}

/**
 * 動態在頂部導航列注入「中文卷 / 英文卷」切換按鈕（即使沒改 index.html 也能正常顯示）
 */
function injectLanguageSwitcher() {
  const navRight = document.querySelector('.nav-right');
  if (!navRight || document.getElementById('langSwitchWrap')) return;

  const wrap = document.createElement('div');
  wrap.id = 'langSwitchWrap';
  wrap.style.cssText = 'display:inline-flex; background:#f1f1ef; padding:2px; border-radius:6px; border:1px solid #e5e5e3;';

  const createBtn = (langCode, label) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.dataset.lang = langCode;
    const isActive = (currentLang === langCode);
    btn.style.cssText = `
      border:none; padding:4px 10px; font-size:12px; font-weight:${isActive ? '600' : '500'};
      border-radius:4px; cursor:pointer; transition:all 0.15s;
      background:${isActive ? '#ffffff' : 'transparent'};
      color:${isActive ? '#2383e2' : '#787774'};
      box-shadow:${isActive ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'};
    `;
    btn.addEventListener('click', () => {
      if (currentLang === langCode) return;
      currentLang = langCode;
      // 更新按鈕外觀
      Array.from(wrap.children).forEach(b => {
        const active = b.dataset.lang === currentLang;
        b.style.background = active ? '#ffffff' : 'transparent';
        b.style.color = active ? '#2383e2' : '#787774';
        b.style.fontWeight = active ? '600' : '500';
        b.style.boxShadow = active ? '0 1px 2px rgba(0,0,0,0.05)' : 'none';
      });
      updateCounts();
      renderSidebar();
      if (activeChapterId) {
        openChapter(activeChapterId);
      }
    });
    return btn;
  };

  wrap.appendChild(createBtn('c', '中文卷 (C)'));
  wrap.appendChild(createBtn('e', '英文卷 (E)'));
  navRight.insertBefore(wrap, navRight.firstChild);
}

// 4. 左側邊欄渲染
function renderSidebar() {
  const container = document.getElementById('topicListContainer');
  if (!container) return;
  container.innerHTML = '';

  SYLLABUS_DATA.forEach(topic => {
    const groupEl = document.createElement('div');
    groupEl.className = 'topic-group';
    groupEl.id = `group-${topic.topicId}`;

    const headerEl = document.createElement('div');
    headerEl.className = 'topic-header';
    headerEl.innerHTML = `
      <div class="topic-toggle-wrap">
        <span class="topic-toggle-icon">+</span>
        <span>${topic.topicName}</span>
      </div>
    `;

    headerEl.addEventListener('click', () => {
      const isOpen = groupEl.classList.toggle('open');
      headerEl.querySelector('.topic-toggle-icon').textContent = isOpen ? '−' : '+';
    });

    const chapListEl = document.createElement('div');
    chapListEl.className = 'chapter-list';

    topic.chapters.forEach(chap => {
      const dbKey = `${currentLang}_${chap.id}`;
      const chapCount = (questionsDB[dbKey] || []).length;
      const itemEl = document.createElement('div');
      itemEl.className = 'chapter-item';
      if (activeChapterId === chap.id) itemEl.classList.add('active');
      itemEl.id = `chap-item-${chap.id}`;
      itemEl.innerHTML = `
        <span>${chap.name}</span>
        <span class="chapter-badge" id="badge-${chap.id}">${chapCount} 題</span>
      `;
      itemEl.addEventListener('click', () => openChapter(chap.id));
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

function showDashboardView() {
  activeChapterId = null;
  document.getElementById('chapterView').classList.remove('active');
  document.getElementById('dashboardView').classList.add('active');
  document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
  updateDashboardProgress();
  renderHeatmap();
}

// 5. 核心功能：開啟章節並自動從 GitHub ./pdfs/ 抓取 chemqb_chxx_mcq_y.pdf
async function openChapter(chapId, forceReload = false) {
  activeChapterId = chapId;
  const lookup = CHAPTER_LOOKUP[chapId];
  if (!lookup) return;

  // 切換左側欄高亮狀態
  document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
  const activeEl = document.getElementById(`chap-item-${chapId}`);
  if (activeEl) activeEl.classList.add('active');

  // 更新麵包屑與標題
  document.getElementById('bcTopicName').textContent = lookup.topic.topicName;
  document.getElementById('bcChapterName').textContent = `第 ${lookup.chapter.id} 章`;
  document.getElementById('currentChapterTitle').textContent = lookup.chapter.name;

  document.getElementById('dashboardView').classList.remove('active');
  document.getElementById('chapterView').classList.add('active');

  const dbKey = `${currentLang}_${chapId}`;

  // 若本地已經有解析好的題目且非強制重載，直接渲染
  if (!forceReload && questionsDB[dbKey] && questionsDB[dbKey].length > 0) {
    renderChapterQuestions(chapId);
    return;
  }

  const container = document.getElementById('questionList');
  const paddedNum = String(chapId).padStart(2, '0');
  const primaryFileName = `chemqb_ch${paddedNum}_mcq_${currentLang}.pdf`;

  container.innerHTML = `
    <div style="text-align: center; padding: 48px 0; color: var(--text-secondary);">
      正在從 GitHub 讀取 <code>pdfs/${primaryFileName}</code> 並擷取題目與化學結構圖...
    </div>
  `;

  // 建立候選檔名清單（容錯：補零如 ch01 或不補零如 ch1，以及支援 y 結尾）
  const candidateUrls = [
    `./pdfs/chemqb_ch${paddedNum}_mcq_${currentLang}.pdf`,
    `./pdfs/chemqb_ch${chapId}_mcq_${currentLang}.pdf`,
    `./pdfs/chemqb_ch${paddedNum}_mcq_y.pdf`,
    `./pdfs/chemqb_ch${chapId}_mcq_y.pdf`
  ];

  let pdfDoc = null;
  let loadedUrl = '';

  for (const url of candidateUrls) {
    try {
      const loadingTask = pdfjsLib.getDocument(url);
      pdfDoc = await loadingTask.promise;
      loadedUrl = url;
      break; // 成功讀取就跳出迴圈
    } catch (e) {
      // 繼續嘗試下一個候選檔名
    }
  }

  if (!pdfDoc) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; border: 1px dashed var(--border-color); border-radius: 8px;">
        <div style="color: var(--danger-color); font-weight: 600; margin-bottom: 8px;">
          尚未在 GitHub 找到第 ${chapId} 章的 PDF 題庫
        </div>
        <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.8;">
          請將檔案命名為 <code style="background:var(--bg-tertiary); padding:2px 6px; border-radius:4px; color:var(--text-primary);">chemqb_ch${paddedNum}_mcq_${currentLang}.pdf</code><br>
          並上傳至 GitHub 倉庫的 <code>pdfs/</code> 資料夾中。<br><br>
          <span style="color: var(--text-muted);">（你也可以點擊右上角「匯入 PDF」按鈕直接從平板選取檔案測試）</span>
        </div>
      </div>
    `;
    return;
  }

  try {
    const parsedQuestions = await parseQuestionsAndImagesFromPdf(pdfDoc, chapId);
    questionsDB[dbKey] = parsedQuestions;
    saveQuestions();
    renderChapterQuestions(chapId);
    showToast(`✅ 成功從 ${loadedUrl.replace('./pdfs/', '')} 解析出 ${parsedQuestions.length} 題`);
  } catch (err) {
    console.error('解析 PDF 錯誤:', err);
    container.innerHTML = `
      <div style="text-align: center; color: var(--danger-color); padding: 48px 0;">
        讀取 PDF 成功，但解析內容時發生錯誤：${err.message}
      </div>
    `;
  }
}

// 6. PDF 圖文同步解析引擎（支援文字擷取 + 化學結構式圖片提取）
async function parseQuestionsAndImagesFromPdf(pdfDoc, chapId) {
  let allQuestions = [];

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);

    // 步驟 A：依據座標將文字項目排好，重組為含換行的頁面文字
    const textContent = await page.getTextContent();
    const linesMap = {}; // 以 Y 座標分組同行文字

    textContent.items.forEach(item => {
      const y = Math.round(item.transform[5] / 4) * 4; // 容許微幅高度偏差視為同一行
      if (!linesMap[y]) linesMap[y] = [];
      linesMap[y].push({ x: item.transform[4], str: item.str });
    });

    // 由上而下 (Y 由大到小)、由左而右 (X 由小到大) 排序
    const sortedYs = Object.keys(linesMap).map(Number).sort((a, b) => b - a);
    const pageLines = sortedYs.map(y => {
      const rowItems = linesMap[y].sort((a, b) => a.x - b.x);
      return rowItems.map(i => i.str).join(' ');
    });
    const pageText = pageLines.join('\n');

    // 步驟 B：擷取該頁內嵌的圖片（例如 CH3CH2OH 骨架式）
    const pageImages = await extractImagesFromPage(page);

    // 步驟 C：從該頁文字解析出選擇題
    const pageQuestions = parseQuestionsFromText(pageText, `${chapId}_p${pageNum}`);

    // 步驟 D：將擷取到的化學結構圖片分配給該頁對應題目
    if (pageImages.length > 0 && pageQuestions.length > 0) {
      pageImages.forEach((imgBase64, idx) => {
        const targetQ = pageQuestions[Math.min(idx, pageQuestions.length - 1)];
        if (!targetQ.images) targetQ.images = [];
        targetQ.images.push(imgBase64);
      });
    }

    allQuestions = allQuestions.concat(pageQuestions);
  }

  return allQuestions;
}

/**
 * 從單一 PDF 頁面中提取圖片物件並轉為 Base64 PNG
 */
async function extractImagesFromPage(page) {
  const images = [];
  try {
    const opList = await page.getOperatorList();
    for (let i = 0; i < opList.fnArray.length; i++) {
      const fn = opList.fnArray[i];
      if (fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject) {
        const imgName = opList.args[i][0];
        let imgObj = null;

        if (fn === pdfjsLib.OPS.paintInlineImageXObject) {
          imgObj = imgName;
        } else {
          imgObj = await new Promise(resolve => {
            page.objs.get(imgName, obj => resolve(obj));
          });
        }

        // 過濾掉長寬太小的裝飾線條或小圖標
        if (imgObj && imgObj.width > 35 && imgObj.height > 25) {
          const base64 = convertPdfImageToBase64(imgObj);
          if (base64) images.push(base64);
        }
      }
    }
  } catch (e) {
    console.warn('擷取頁面圖片時略過異常:', e);
  }
  return images;
}

/**
 * 將 PDF.js 內部影像資料轉為網頁 <img> 可顯示的 Base64 DataURL
 */
function convertPdfImageToBase64(imgObj) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = imgObj.width;
    canvas.height = imgObj.height;
    const ctx = canvas.getContext('2d');

    // 新版 PDF.js 可能直接提供 ImageBitmap
    if (imgObj.bitmap) {
      ctx.drawImage(imgObj.bitmap, 0, 0);
      return canvas.toDataURL('image/png');
    }

    if (!imgObj.data) return null;

    const imgData = ctx.createImageData(imgObj.width, imgObj.height);
    const data = imgObj.data;

    if (data.length === imgObj.width * imgObj.height * 4) {
      // RGBA
      imgData.data.set(data);
    } else if (data.length === imgObj.width * imgObj.height * 3) {
      // RGB 轉 RGBA
      let p = 0;
      for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = data[p++];
        imgData.data[i + 1] = data[p++];
        imgData.data[i + 2] = data[p++];
        imgData.data[i + 3] = 255;
      }
    } else if (data.length === imgObj.width * imgObj.height) {
      // 灰階轉 RGBA
      let p = 0;
      for (let i = 0; i < imgData.data.length; i += 4) {
        const v = data[p++];
        imgData.data[i] = v;
        imgData.data[i + 1] = v;
        imgData.data[i + 2] = v;
        imgData.data[i + 3] = 255;
      }
    } else {
      return null;
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png');
  } catch (err) {
    return null;
  }
}

/**
 * 強健文字切題邏輯：支援中英文題號、A/B/C/D 選項、答案與解釋
 */
function parseQuestionsFromText(text, prefix = 'q') {
  const questions = [];
  const cleanText = text.replace(/\r\n/g, '\n');

  // 以題號 (例如 "1.", "Q1.", "(1)") 分割題目區塊
  const splitRegex = /(?:^|\n)\s*(?:Q?\d+[\.、\)]|\(\d+\))\s+/g;
  const rawBlocks = cleanText.split(splitRegex).filter(b => b.trim().length > 8);

  rawBlocks.forEach((block, idx) => {
    // 抓取 A. B. C. D. 四個選項
    const optMatch = block.match(/(?:^|\n|\s)A[\.、\)]\s*([\s\S]*?)(?:\n|\s)B[\.、\)]\s*([\s\S]*?)(?:\n|\s)C[\.、\)]\s*([\s\S]*?)(?:\n|\s)D[\.、\)]\s*([\s\S]*?)(?=(?:\n\s*(?:Ans|Answer|答案|Exp|Explanation|解析|說明)|$))/i);

    if (optMatch) {
      const qBody = block.substring(0, block.indexOf(optMatch[0])).trim();
      const optA = optMatch[1].trim();
      const optB = optMatch[2].trim();
      const optC = optMatch[3].trim();
      let optD = optMatch[4].trim();

      // 擷取答案 (預設 A，支援 Ans: B / 答案：B)
      let ans = 'A';
      const ansMatch = block.match(/(?:Ans|Answer|答案)\s*[:：]?\s*([A-D])/i);
      if (ansMatch) {
        ans = ansMatch[1].toUpperCase();
      }

      // 擷取解釋 (支援 Exp: / Explanation: / 解析：)
      let exp = '';
      const expMatch = block.match(/(?:Exp|Explanation|解析|說明)\s*[:：]?\s*([\s\S]*)/i);
      if (expMatch) {
        exp = expMatch[1].trim();
      }

      // 清理選項 D 尾巴可能殘留的答案與解析字樣
      optD = optD.split(/(?:Ans|Answer|答案|Exp|Explanation|解析|說明)\s*[:：]/i)[0].trim();

      questions.push({
        id: `${prefix}_${idx + 1}_${Date.now()}`,
        question: qBody || `第 ${idx + 1} 題`,
        options: { A: optA, B: optB, C: optC, D: optD },
        answer: ans,
        explanation: exp,
        images: []
      });
    }
  });

  return questions;
}

// 7. 渲染章節題目與互動判對錯
function renderChapterQuestions(chapId) {
  const container = document.getElementById('questionList');
  container.innerHTML = '';

  const dbKey = `${currentLang}_${chapId}`;
  const qList = questionsDB[dbKey] || [];

  // 更新章節題數與重新載入按鈕
  const chapterMeta = document.querySelector('.chapter-meta');
  if (chapterMeta) {
    chapterMeta.innerHTML = `
      <span id="chapterStats">共 ${qList.length} 題 (${currentLang === 'c' ? '中文卷' : '英文卷'})</span>
      <button id="reloadPdfBtn" class="btn-text" style="margin-left:12px; color:var(--primary-color);">↻ 重新從 GitHub 讀取 PDF</button>
    `;
    document.getElementById('reloadPdfBtn').addEventListener('click', () => openChapter(chapId, true));
  }

  if (qList.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 48px 0;">
        此 PDF 內未能識別出標準選擇題格式。<br>
        請確認 PDF 內含有可選取的文字，且包含 <code>1.</code> 題號與 <code>A. B. C. D.</code> 選項。
      </div>
    `;
    return;
  }

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = `q-card-${q.id}`;

    const formattedContent = (q.question || '').replace(/\n/g, '<br/>');

    // 若該題有化學結構圖（支援單張或多張），渲染出來
    const imgList = q.images || (q.imageUrl ? [q.imageUrl] : []);
    const imagesHtml = imgList.length > 0
      ? `<div style="display:flex; flex-wrap:wrap; gap:12px; margin: 14px 0;">
           ${imgList.map(src => `<img src="${src}" alt="化學結構圖" style="max-height: 160px; max-width: 100%; object-fit: contain; border: 1px solid var(--border-color); border-radius: 6px; padding: 6px; background: #fff;" />`).join('')}
         </div>`
      : '';

    card.innerHTML = `
      <div class="q-header">
        <span class="q-number">Question ${index + 1}</span>
      </div>
      <div class="q-body">${formattedContent}</div>
      ${imagesHtml}
      <div class="options-grid">
        ${['A', 'B', 'C', 'D'].map(optKey => `
          <button class="opt-btn" data-opt="${optKey}">
            <span class="opt-key">${optKey}.</span>
            <span class="opt-text">${q.options[optKey] || ''}</span>
          </button>
        `).join('')}
      </div>
      <div class="explanation-panel" id="exp-${q.id}">
        <span class="exp-title">標準答案：${q.answer} ｜ 解析與說明</span>
        <div class="exp-body">${(q.explanation || '暫無詳細解釋').replace(/\n/g, '<br/>')}</div>
      </div>
    `;

    const optButtons = card.querySelectorAll('.opt-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        handleAnswer(q, btn.dataset.opt, card, optButtons, chapId);
      });
    });

    container.appendChild(card);
  });

  // 呼叫 KaTeX 渲染化學式 (如 \ce{CH3CH2OH}) 與數學公式
  renderKaTeXInElement(container);
}

function handleAnswer(question, selectedOpt, cardEl, allOptButtons, chapId) {
  const correctOpt = (question.answer || 'A').toUpperCase();
  const isCorrect = (selectedOpt.toUpperCase() === correctOpt);

  allOptButtons.forEach(btn => {
    btn.disabled = true;
    const key = btn.dataset.opt;
    if (key === correctOpt) {
      btn.classList.add('correct');
    } else if (key === selectedOpt && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  const expPanel = cardEl.querySelector('.explanation-panel');
  if (expPanel) expPanel.classList.add('show');

  practiceLogs.push({
    date: getTodayDateStr(),
    chapterId: chapId,
    qId: question.id,
    isCorrect: isCorrect,
    timestamp: Date.now()
  });

  savePracticeLogs();
}

// 8. 手動上傳 PDF 支援 (自動識別 chemqb_chxx_mcq_y.pdf 檔名)
async function handleManualPdfUpload(e) {
  const files = Array.from(e.target.files);
  if (!files || files.length === 0) return;

  for (const file of files) {
    const info = parseFilenameInfo(file.name);
    if (!info.chapNum) {
      showToast(`❌ 無法從「${file.name}」辨識出 1–65 的章節編號`);
      continue;
    }

    showToast(`正在解析「${file.name}」對應至第 ${info.chapNum} 章...`);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const parsedQuestions = await parseQuestionsAndImagesFromPdf(pdfDoc, info.chapNum);

      const dbKey = `${info.lang}_${info.chapNum}`;
      questionsDB[dbKey] = parsedQuestions;
      currentLang = info.lang;
      saveQuestions();
      renderSidebar();
      openChapter(info.chapNum);

      showToast(`✅ 成功從「${file.name}」匯入 ${parsedQuestions.length} 題！`);
    } catch (err) {
      showToast(`❌ 解析「${file.name}」失敗：${err.message}`);
    }
  }
  e.target.value = '';
}

/**
 * 解析檔名：支援 chemqb_ch11_mcq_c.pdf、ch11.pdf、11.pdf 等格式
 */
function parseFilenameInfo(filename) {
  let lang = currentLang;
  const langMatch = filename.match(/_mcq_([ce])\b/i);
  if (langMatch) {
    lang = langMatch[1].toLowerCase();
  }

  let chapNum = null;
  const chMatch = filename.match(/(?:ch|chapter|第)\s*(\d{1,2})/i) || filename.match(/(\d{1,2})/);
  if (chMatch) {
    const num = parseInt(chMatch[1], 10);
    if (num >= 1 && num <= 65) chapNum = num;
  }

  return { chapNum, lang };
}

// 9. KaTeX 化學與數學公式渲染
function renderKaTeXInElement(element) {
  if (typeof renderMathInElement === 'function') {
    try {
      renderMathInElement(element, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX 渲染異常:', e);
    }
  }
}

// 10. 統計數據與最近 12 週練習熱力圖
function updateCounts() {
  let total = 0;
  for (let c = 1; c <= 65; c++) {
    const key = `${currentLang}_${c}`;
    const len = (questionsDB[key] || []).length;
    total += len;
    const badge = document.getElementById(`badge-${c}`);
    if (badge) badge.textContent = `${len} 題`;
  }

  const langText = currentLang === 'c' ? '中文卷' : '英文卷';
  const totalEl = document.getElementById('totalQuestionsCount');
  const dashTotalEl = document.getElementById('dashTotalQuestions');
  if (totalEl) totalEl.textContent = `共 ${total} 題 (${langText})`;
  if (dashTotalEl) dashTotalEl.textContent = total;
}

function updateDashboardProgress() {
  const answeredTotal = practiceLogs.length;
  const correctTotal = practiceLogs.filter(l => l.isCorrect).length;
  const wrongTotal = answeredTotal - correctTotal;
  const today = getTodayDateStr();
  const todayTotal = practiceLogs.filter(l => l.date === today).length;
  const rate = answeredTotal > 0 ? Math.round((correctTotal / answeredTotal) * 100) : 0;

  const setElText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setElText('answeredCount', answeredTotal);
  setElText('wrongCount', wrongTotal);
  setElText('todayAnsweredCount', todayTotal);
  setElText('masteryRate', `${rate}%`);

  const fillEl = document.getElementById('masteryFill');
  if (fillEl) fillEl.style.width = `${rate}%`;
}

function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const tooltip = document.getElementById('customTooltip');
  const daysToShow = 84; // 12 週 = 84 天
  const today = new Date();

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

    if (tooltip) {
      const showTip = (e) => {
        let tipHtml = `<strong>${dateStr}</strong>：共作答 ${count} 題`;
        if (count > 0) {
          const uniqueChaps = [...new Set(logs.map(l => `第 ${l.chapterId} 章`))];
          tipHtml += `<br/>練習章節：${uniqueChaps.join('、')}`;
        }
        tooltip.innerHTML = tipHtml;
        tooltip.style.display = 'block';
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        tooltip.style.left = `${clientX + 12}px`;
        tooltip.style.top = `${clientY + 12}px`;
      };

      cell.addEventListener('mouseenter', showTip);
      cell.addEventListener('mousemove', showTip);
      cell.addEventListener('touchstart', showTip, { passive: true });
      cell.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
    }

    grid.appendChild(cell);
  }
}

// 11. 匯出 / 匯入 JSON 與重設
function exportJSON() {
  const payload = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    questionsDB,
    practiceLogs
  };
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
  const a = document.createElement('a');
  a.setAttribute('href', dataStr);
  a.setAttribute('download', `DSE_Chem_Backup_${getTodayDateStr()}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function importJSON(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const data = JSON.parse(ev.target.result);
      if (data.questionsDB || data.questions) {
        questionsDB = data.questionsDB || data.questions;
        practiceLogs = data.practiceLogs || data.logs || [];
        saveQuestions();
        savePracticeLogs();
        renderSidebar();
        showToast('✅ 成功還原題庫與作答記錄！');
      }
    } catch (err) {
      showToast('❌ JSON 檔案格式錯誤');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function resetAllData() {
  if (confirm('確定要清除平板上的題目快取與所有作答記錄嗎？')) {
    localStorage.removeItem(STORAGE_KEY_QUESTIONS);
    localStorage.removeItem(STORAGE_KEY_LOGS);
    location.reload();
  }
}

// 12. 工具函式
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
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

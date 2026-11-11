<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DSE 化學分章模擬題庫系統 v0.0.32</title>
  <style>
    /* ==========================================
     * CSS 佈局與 RWD 樣式
     * ========================================== */
    body {
      margin: 0;
      font-family: 'Arial', 'Noto Sans TC', sans-serif;
      background: #f4f6f8;
      color: #333;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }
    
    /* 導航列 */
    header {
      background: #fff;
      padding: 12px 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
    }
    .header-title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
    .nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* 主要版面 */
    .app-container {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    /* 左側選單 */
    aside {
      width: 300px;
      background: #fff;
      border-right: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }
    .sidebar-header {
      padding: 12px 16px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fafafa;
    }
    .sidebar-controls span {
      font-size: 12px;
      color: #1a73e8;
      cursor: pointer;
      margin-left: 8px;
    }
    #topicListContainer {
      flex: 1;
      overflow-y: auto;
    }

    /* 右側主內容 */
    main {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
      background: #f4f6f8;
    }

    /* 總覽儀表板卡片 */
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
      border: 1px solid #e0e0e0;
      text-align: center;
    }
    .stat-card h3 {
      margin: 0 0 10px 0;
      font-size: 14px;
      color: #555;
    }
    .stat-card .value {
      font-size: 28px;
      font-weight: bold;
      color: #1a73e8;
    }

    /* RWD 手機版調整 */
    @media (max-width: 768px) {
      aside {
        display: none; /* 預設隱藏，由 JS 浮動按鈕控制 */
      }
      header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
      .nav-right {
        width: 100%;
        justify-content: space-between;
      }
      main {
        padding: 12px;
      }
    }
  </style>
  <!-- 引入 mammoth.js 用於解析 docx -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"></script>
</head>
<body>

  <!-- 頂部導覽列 -->
  <header>
    <div class="header-title">DSE CHEMISTRY QUESTIONBANK ( SORTED BY CHAPTER )</div>
    <div class="nav-right">
      <!-- JS 會在這裡動態插入語言切換與版本號 -->
    </div>
  </header>

  <!-- 應用程式主體 -->
  <div class="app-container">
    
    <!-- 左側目錄側邊欄 -->
    <aside id="sidebar">
      <div class="sidebar-header">
        <span style="font-weight:bold; font-size:14px;">十五課題</span>
        <div class="sidebar-controls">
          <span id="expandAllBtn">全部展開</span>
          <span id="collapseAllBtn">全部收起</span>
        </div>
      </div>
      <div id="topicListContainer">
        <!-- JS 會動態渲染 65 章目錄 -->
      </div>
    </aside>

    <!-- 右側主內容 -->
    <main id="mainContent">
      <div id="dashboardView">
        <div style="font-size:12px; color:#888; margin-bottom:16px;">
          左側點「+」展開該課題下的章，點章名直接跳到該章，點 A-D 直接判對錯。<br>
          生成日期：2026-11-11
        </div>
        
        <div class="dashboard-grid">
          <div class="stat-card">
            <h3>課題總數</h3>
            <div class="value">15</div>
          </div>
          <div class="stat-card">
            <h3>課程章節</h3>
            <div class="value">65</div>
          </div>
          <div class="stat-card">
            <h3>題目總數</h3>
            <div class="value" id="totalQuestionsCount">0</div>
          </div>
        </div>

        <div class="stat-card" style="text-align:left; margin-bottom:24px;">
          <h3 style="margin-bottom:16px; border-bottom:1px solid #eee; padding-bottom:8px;">練習進度</h3>
          <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:16px;">
            <div style="text-align:center; flex:1;">
              <div style="font-size:12px; color:#888;">已作答</div>
              <div style="font-size:20px; font-weight:bold; color:#333;" id="statAnswered">0</div>
            </div>
            <div style="text-align:center; flex:1; border-left:1px solid #eee; border-right:1px solid #eee; padding:0 10px;">
              <div style="font-size:12px; color:#888;">掌握率</div>
              <div style="font-size:20px; font-weight:bold; color:#34a853;" id="statMasteryRate">0%</div>
            </div>
            <div style="text-align:center; flex:1; border-right:1px solid #eee;">
              <div style="font-size:12px; color:#888;">錯題數</div>
              <div style="font-size:20px; font-weight:bold; color:#ea4335;" id="statWrong">0</div>
            </div>
            <div style="text-align:center; flex:1;">
              <div style="font-size:12px; color:#888;">今日作答</div>
              <div style="font-size:20px; font-weight:bold; color:#1a73e8;" id="statToday">0</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>

<script>
/* ==========================================
 * DSE 化學分章模擬題庫系統 ( Aristo MCQ 手機 RWD 終極修復版 v0.0.32 )
 * ========================================== */

// 1. 課程 65 章完整架構 (已清除所有的 span 亂碼)
const SYLLABUS_CONFIG = [
  { topicId: 'CHEM-01', topicName: 'CHEM-01 地球', chapters: [{ id: 1, name: '第 1 章：化學導論' }, { id: 2, name: '第 2 章：大氣' }, { id: 3, name: '第 3 章：海洋' }] },
  { topicId: 'CHEM-02', topicName: 'CHEM-02 微觀世界 I', chapters: [{ id: 4, name: '第 4 章：岩石和礦物' }, { id: 5, name: '第 5 章：原子結構' }, { id: 6, name: '第 6 章：周期表' }, { id: 7, name: '第 7 章：金屬鍵和離子鍵' }, { id: 8, name: '第 8 章：共價鍵' }] },
  { topicId: 'CHEM-03', topicName: 'CHEM-03 金屬', chapters: [{ id: 9, name: '第 9 章：物質的結構和性質' }, { id: 10, name: '第 10 章：金屬的存在和提取' }, { id: 11, name: '第 11 章：金屬的活性' }, { id: 12, name: '第 12 章：反應質量' }, { id: 13, name: '第 13 章：金屬的腐蝕和保護' }] },
  { topicId: 'CHEM-04', topicName: 'CHEM-04 酸和鹽基', chapters: [{ id: 14, name: '第 14 章：酸和鹼的簡介' }, { id: 15, name: '第 15 章：溶液的濃度' }, { id: 16, name: '第 16 章：指示劑和pH' }, { id: 17, name: '第 17 章：酸和鹼的強度' }, { id: 18, name: '第 18 章：鹽和中和作用' }] },
  { topicId: 'CHEM-05', topicName: 'CHEM-05 化石燃料', chapters: [{ id: 19, name: '第 19 章：涉及酸和鹼的容量分析' }, { id: 20, name: '第 20 章：來自化石燃料的烷' }, { id: 21, name: '第 21 章：同系列、結構式和碳化合物的命名' }, { id: 22, name: '第 22 章：烷烴和烯烴的化學反應' }, { id: 23, name: '第 23 章：加成聚合物' }] },
  { topicId: 'CHEM-06', topicName: 'CHEM-06 微觀世界 II', chapters: [{ id: 24, name: '第 24 章：具有非八隅體結構的簡單分子及簡單分子的形狀' }, { id: 25, name: '第 25 章：鍵與分子的極性' }, { id: 26, name: '第 26 章：分子間作用力' }, { id: 27, name: '第 27 章：結構與物理性質' }] },
  { topicId: 'CHEM-07', topicName: 'CHEM-07 氧化還原與電解', chapters: [{ id: 28, name: '第 28 章：氧化和還原' }, { id: 29, name: '第 29 章：化學電池' }, { id: 30, name: '第 30 章：氧化劑和還原劑' }, { id: 31, name: '第 31 章：電解' }, { id: 32, name: '第 32 章：工業電解' }] },
  { topicId: 'CHEM-08', topicName: 'CHEM-08 化學反應與能量', chapters: [{ id: 33, name: '第 33 章：化學反應中的能量變化' }, { id: 34, name: '第 34 章：標準反應焓變' }, { id: 35, name: '第 35 章：赫斯定律' }] },
  { topicId: 'CHEM-09', topicName: 'CHEM-09 反應速率', chapters: [{ id: 36, name: '第 36 章：化學反應的速率' }, { id: 37, name: '第 37 章：影響反應速率的因素' }, { id: 38, name: '第 38 章：碰撞理論' }, { id: 39, name: '第 39 章：催化劑' }] },
  { topicId: 'CHEM-10', topicName: 'CHEM-10 化學平衡', chapters: [{ id: 40, name: '第 40 章：動態平衡' }, { id: 41, name: '第 41 章：濃度和溫度的變化對化學平衡的影響' }, { id: 42, name: '第 42 章：特定同系列的簡介' }] },
  { topicId: 'CHEM-11', topicName: 'CHEM-11 碳化合物的化學', chapters: [{ id: 43, name: '第 43 章：同分異構' }, { id: 44, name: '第 44 章：各種官能基的典型化學反應' }, { id: 45, name: '第 45 章：碳化合物的互換' }, { id: 46, name: '第 46 章：重要有機物質' }, { id: 47, name: '第 47 章：由Na至Cl各元素物理性質的周期變化' }, { id: 48, name: '第 48 章：由Na至Cl各元素氧化物的結合、在水中的習性及酸鹼性質' }] },
  { topicId: 'CHEM-12', topicName: 'CHEM-12 化學規律', chapters: [{ id: 49, name: '第 49 章：過渡性金屬的一般性質' }, { id: 50, name: '第 50 章：工業過程的重要性' }] },
  { topicId: 'CHEM-13', topicName: 'CHEM-13 工業化學', chapters: [{ id: 51, name: '第 51 章：速率方程' }, { id: 52, name: '第 52 章：活化能' }, { id: 53, name: '第 53 章：催化作用和工業過程' }, { id: 54, name: '第 54 章：工業過程' }, { id: 55, name: '第 55 章：有關工業過程的綠色化學' }] },
  { topicId: 'CHEM-14', topicName: 'CHEM-14 物料化學', chapters: [{ id: 56, name: '第 56 章：合金' }, { id: 57, name: '第 57 章：高分子材料' }, { id: 58, name: '第 58 章：現代材料' }, { id: 59, name: '第 59 章：納米材料' }, { id: 60, name: '第 60 章：物料回收' }] },
  { topicId: 'CHEM-15', topicName: 'CHEM-15 分析化學', chapters: [{ id: 61, name: '第 61 章：檢測物質中的化學物種' }, { id: 62, name: '第 62 章：分離和提純的方法' }, { id: 63, name: '第 63 章：定量分析方法' }, { id: 64, name: '第 64 章：儀器分析方法' }, { id: 65, name: '第 65 章：分析化學對社會的貢獻' }] }
];

// 2. 全局狀態 (v0.0.32)
window.chemApp = {
  version: '0.0.32',
  currentLang: 'e',
  activeChapterId: null,
  questionsDB: {},
  chapterCounts: {},
  userAnswers: {},
  dashboardNodes: []
};

const CHAPTER_MAP = {};
SYLLABUS_CONFIG.forEach(t => t.chapters.forEach(c => { CHAPTER_MAP[c.id] = { topic: t, chapter: c }; }));

// 2.5 IndexedDB + localStorage 儲存引擎
class ChemStorage {
  static dbPromise = null;

  static getDB() {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open('HKDSE_CHEM_QB_V32', 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('chapters')) db.createObjectStore('chapters');
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
      });
    } catch (e) { return false; }
  }

  static async loadChapter(dbKey) {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('chapters', 'readonly');
        const req = tx.objectStore('chapters').get(dbKey);
        req.onsuccess = () => resolve(req.result || null);
      });
    } catch (e) { return null; }
  }

  static loadMeta() {
    try {
      const counts = localStorage.getItem('CHEM_COUNTS_V32');
      if (counts) window.chemApp.chapterCounts = JSON.parse(counts);
      const ans = localStorage.getItem('CHEM_USER_ANS_V32');
      if (ans) window.chemApp.userAnswers = JSON.parse(ans);
      const savedLang = localStorage.getItem('CHEM_LANG_V32');
      if (savedLang === 'c' || savedLang === 'e') window.chemApp.currentLang = savedLang;
    } catch (e) {}
  }

  static saveMeta() {
    try {
      localStorage.setItem('CHEM_COUNTS_V32', JSON.stringify(window.chemApp.chapterCounts));
      localStorage.setItem('CHEM_USER_ANS_V32', JSON.stringify(window.chemApp.userAnswers));
      localStorage.setItem('CHEM_LANG_V32', window.chemApp.currentLang);
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
    return [/^©\s*\d{4}\s*Aristo/i, /^Chapter\s+\d+$/i, /^第\s*\d+\s*章$/, /^Part\s+[IVXLCDM]+\b.*$/i, /^HKDSE NEW CHEMISTRY/i, /^Question Bank$/, /^香港中學文憑\s*現代化學/i, /^問題庫$/].some(p => p.test(t));
  }

  static flattenBlocks(root) {
    const blocks = [];
    const walk = (node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName.toUpperCase();
      if (tag === 'TABLE') {
        if (/ChemMCQ\s*\d+/i.test(node.textContent || '') || /(?:Answer|Ans|答案)\s*[:：]/i.test(node.textContent || '')) {
          node.querySelectorAll('tr').forEach(tr => {
            tr.querySelectorAll('td, th').forEach(cell => Array.from(cell.children).forEach(child => walk(child)));
          });
        } else {
          blocks.push(node.cloneNode(true));
        }
        return;
      }
      if (['DIV', 'SECTION', 'ARTICLE', 'MAIN', 'TBODY', 'TR', 'TD', 'UL', 'OL'].includes(tag) && node.children.length > 0) {
        Array.from(node.children).forEach(child => walk(child));
        return;
      }
      const cleanedHtml = this.cleanInlineNoise(node.innerHTML);
      if (/<br\s*\/?>/i.test(cleanedHtml)) {
        cleanedHtml.split(/<br\s*\/?>/i).forEach(part => {
          const p = document.createElement('p');
          p.innerHTML = part.trim();
          if ((p.textContent || '').trim() || p.querySelector('img')) blocks.push(p);
        });
      } else {
        const p = node.cloneNode(true);
        p.innerHTML = cleanedHtml.trim();
        if ((p.textContent || '').trim() || p.querySelector('img') || tag === 'TABLE') blocks.push(p);
      }
    };
    Array.from(root.children).forEach(child => walk(child));
    return blocks;
  }

  static parseHtmlContent(rawHtml, chapId) {
    const tempRoot = document.createElement('div');
    tempRoot.innerHTML = rawHtml;
    const flatNodes = this.flattenBlocks(tempRoot);
    const hasChemMCQ = /ChemMCQ\s*\d+/i.test(tempRoot.textContent || '');
    const headerRegex = hasChemMCQ ? /(ChemMCQ\s*\d+)/i : /^(?:Question\s*\d+|Q\s*\d+|第\s*\d+\s*題|\d+\s*[\.、])(?!\s*:)/i;

    const rawBlocks = [];
    let currentBlock = null;

    flatNodes.forEach(node => {
      const text = (node.textContent || '').trim();
      const hasImg = node.querySelector && node.querySelector('img') !== null;
      if (!hasImg && node.tagName !== 'TABLE' && this.isPureNoiseLine(text)) return;
      const match = text.match(headerRegex);
      if (match && (hasChemMCQ || text.startsWith(match[0]))) {
        if (currentBlock) rawBlocks.push(currentBlock);
        currentBlock = { qCode: match[0].replace(/\s+/g, ''), nodes: [] };
        const afterText = text.slice(text.indexOf(match[0]) + match[0].length).trim();
        if (afterText.length > 0 || hasImg) {
          const cloned = node.cloneNode(true);
          cloned.innerHTML = cloned.innerHTML.replace(match[0], '').trim();
          currentBlock.nodes.push(cloned);
        }
      } else {
        if (currentBlock) currentBlock.nodes.push(node.cloneNode(true));
      }
    });
    if (currentBlock) rawBlocks.push(currentBlock);

    return rawBlocks.map((block, idx) => {
      const stemDiv = document.createElement('div'), expDiv = document.createElement('div');
      let foundAnswer = false, answerLetter = '';
      block.nodes.forEach(node => {
        const txt = (node.textContent || '').trim();
        if (!foundAnswer) {
          const ansMatch = txt.match(/^(?:Answer|Ans|答案)\s*[:：]?\s*\(?([A-D])\)?(?:[\s\.、:：\-—]*(.*))?$/i);
          if (ansMatch) {
            foundAnswer = true;
            answerLetter = ansMatch[1].toUpperCase();
            if (ansMatch[2] && ansMatch[2].trim()) {
              const p = document.createElement('p'); p.textContent = ansMatch[2].trim(); expDiv.appendChild(p);
            }
            return;
          }
          if (node.style) node.style.cssText = /^[A-D][\.\)]\s*/.test(txt) ? 'padding-left: 24px; margin: 4px 0;' : 'margin: 6px 0;';
          stemDiv.appendChild(node);
        } else {
          if (txt.length > 0 || (node.querySelector && node.querySelector('img'))) expDiv.appendChild(node);
        }
      });
      return { id: `${block.qCode || `Q${idx + 1}`}_ch${chapId}`, qNumDisplay: block.qCode || `Q${idx + 1}`, htmlContent: stemDiv.innerHTML, answer: answerLetter || 'A', explanationHtml: expDiv.innerHTML.trim() };
    });
  }
}

// 4. DOCX 載入器
class DocxExtractor {
  static async extract(arrayBuffer, chapId) {
    if (typeof mammoth === 'undefined') throw new Error('Mammoth.js 未載入');
    const result = await mammoth.convertToHtml(
      { arrayBuffer: arrayBuffer },
      { convertImage: mammoth.images.imgElement(image => image.read('base64').then(imageBuffer => ({ src: 'data:' + image.contentType + ';base64,' + imageBuffer }))) }
    );
    return DocxQuestionParser.parseHtmlContent(result.value, chapId);
  }
}

// 5. 視圖切換器
function switchRightPanelToChapterView() {
  let wrapper = document.getElementById('chemChapterViewWrapper');
  let rightMain = document.getElementById('mainContent');
  
  if (!wrapper) {
    window.chemApp.dashboardNodes = Array.from(rightMain.children);
    wrapper = document.createElement('div');
    wrapper.id = 'chemChapterViewWrapper';
    wrapper.innerHTML = `
      <div id="chapterHeaderBar" style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; background:#fff; padding:16px; border-radius:10px; border:1px solid #e0e0e0; margin-bottom:20px;">
        <div>
          <div id="currentTopicSubtitle" style="font-size:12px; color:#1a73e8; font-weight:bold; margin-bottom:4px;"></div>
          <h2 id="currentChapterTitle" style="margin:0; font-size:18px;">請選擇章節</h2>
        </div>
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <span id="chapterStats" style="font-size:13px; color:#555; font-weight:bold;"></span>
          <label style="padding:6px 12px; font-size:12px; border:1px solid #dadce0; border-radius:6px; cursor:pointer; background:#f8f9fa;">
            📂 載入 DOCX <input type="file" id="manualDocxInput" accept=".docx" style="display:none;" />
          </label>
          <button id="backToDashboardBtn" style="padding:6px 12px; font-size:12px; border:1px solid #1a73e8; border-radius:6px; background:#e8f0fe; color:#1a73e8; font-weight:bold; cursor:pointer;">📊 總覽</button>
        </div>
      </div>
      <div id="questionList"></div>
    `;
    rightMain.insertBefore(wrapper, rightMain.firstChild);

    wrapper.querySelector('#backToDashboardBtn').onclick = () => {
      wrapper.style.display = 'none';
      window.chemApp.dashboardNodes.forEach(node => node.style.display = '');
      updateDashboardStats();
    };

    wrapper.querySelector('#manualDocxInput').onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file || !window.chemApp.activeChapterId) return;
      const chapId = window.chemApp.activeChapterId;
      const dbKey = `${window.chemApp.currentLang}_${chapId}`;
      const qContainer = wrapper.querySelector('#questionList');
      qContainer.innerHTML = `<div style="text-align:center; padding:48px; color:#1a73e8;">正在解析本機檔案 <code>${file.name}</code> ...</div>`;
      try {
        const list = await DocxExtractor.extract(await file.arrayBuffer(), chapId);
        window.chemApp.questionsDB[dbKey] = list;
        window.chemApp.chapterCounts[dbKey] = list.length;
        ChemStorage.saveMeta();
        await ChemStorage.saveChapter(dbKey, list);
        updateCounts();
        renderQuestions(list, chapId);
      } catch (err) { qContainer.innerHTML = `<div style="color:#e53935; padding:32px;">解析失敗：${err.message}</div>`; }
    };
  }

  window.chemApp.dashboardNodes.forEach(node => { if(node !== wrapper) node.style.display = 'none'; });
  wrapper.style.display = 'block';
  if (window.innerWidth <= 768) document.getElementById('sidebar').style.display = 'none';
  return wrapper;
}

// 6. 開啟章節
async function openChapter(chapId) {
  window.chemApp.activeChapterId = chapId;
  const lookup = CHAPTER_MAP[chapId];
  if (!lookup) return;

  document.querySelectorAll('.chapter-item').forEach(el => el.style.background = 'transparent');
  const activeEl = document.getElementById(`chap-item-${chapId}`);
  if (activeEl) activeEl.style.background = '#e8f0fe';

  const wrapper = switchRightPanelToChapterView();
  wrapper.querySelector('#currentTopicSubtitle').textContent = lookup.topic.topicName;
  wrapper.querySelector('#currentChapterTitle').textContent = lookup.chapter.name;

  const dbKey = `${window.chemApp.currentLang}_${chapId}`;
  const cachedList = window.chemApp.questionsDB[dbKey] || await ChemStorage.loadChapter(dbKey);
  
  if (cachedList && cachedList.length > 0) {
    window.chemApp.questionsDB[dbKey] = cachedList;
    renderQuestions(cachedList, chapId);
    return;
  }

  wrapper.querySelector('#questionList').innerHTML = `<div style="text-align:center; padding:56px;">⏳ 正在請求 <code>chemqb_ch${String(chapId).padStart(2, '0')}_mcq_${window.chemApp.currentLang}.docx</code> ...<br><br>若無遠端檔案，請使用上方「📂 載入 DOCX」手動上傳。</div>`;
}

// 7. 渲染題目卡片
function renderQuestions(qList, chapId) {
  const container = document.getElementById('questionList');
  document.getElementById('chapterStats').textContent = `共 ${qList.length} 題`;
  container.innerHTML = '';

  qList.forEach((q, index) => {
    const card = document.createElement('div');
    card.style.cssText = 'background:#fff; border-radius:10px; padding:20px; margin-bottom:20px; border:1px solid #e0e0e0; box-shadow:0 2px 8px rgba(0,0,0,0.05);';
    card.innerHTML = `
      <div style="margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:8px; font-weight:bold;">${q.qNumDisplay || `Q${index + 1}`}</div>
      <div style="line-height:1.6;">${q.htmlContent}</div>
      <div style="margin-top:16px; display:flex; gap:8px;">
        ${['A', 'B', 'C', 'D'].map(k => `<button class="opt-act-btn" data-opt="${k}" style="flex:1; padding:10px; border:1px solid #1a73e8; background:#fff; color:#1a73e8; border-radius:6px; cursor:pointer;">${k}</button>`).join('')}
      </div>
      <div class="explanation-panel" style="display:none; margin-top:16px; padding:14px; background:#f8fafd; border-left:4px solid #1a73e8;">
        <div style="font-weight:bold; color:#1a73e8;">Answer: ${q.answer}</div>
        <div style="margin-top:8px;">${q.explanationHtml || '（無解析）'}</div>
      </div>
    `;
    const optBtns = card.querySelectorAll('.opt-act-btn'), expPanel = card.querySelector('.explanation-panel');

    const applyUI = (sel) => {
      optBtns.forEach(b => {
        if (b.dataset.opt === q.answer) { b.style.background = '#34a853'; b.style.color = '#fff'; }
        else if (sel && b.dataset.opt === sel && sel !== q.answer) { b.style.background = '#ea4335'; b.style.color = '#fff'; }
      });
      expPanel.style.display = 'block';
    };
    if (window.chemApp.userAnswers[q.id]) applyUI(window.chemApp.userAnswers[q.id].chosen);

    optBtns.forEach(btn => btn.onclick = () => {
      const chosen = btn.dataset.opt;
      window.chemApp.userAnswers[q.id] = { chosen: chosen, correct: chosen === q.answer, date: new Date().toISOString().slice(0, 10) };
      ChemStorage.saveMeta();
      applyUI(chosen);
      updateDashboardStats();
    });
    container.appendChild(card);
  });
}

// 8. 統計更新
function updateCounts() {
  for (let i = 1; i <= 65; i++) {
    const key = `${window.chemApp.currentLang}_${i}`;
    const len = window.chemApp.chapterCounts[key] || 0;
    const badge = document.getElementById(`badge-${i}`);
    if (badge) badge.textContent = `${len} 題`;
  }
  updateDashboardStats();
}

function updateDashboardStats() {
  let totalQ = 0;
  for (let i = 1; i <= 65; i++) totalQ += window.chemApp.chapterCounts[`${window.chemApp.currentLang}_${i}`] || 0;
  
  const records = Object.values(window.chemApp.userAnswers);
  const correct = records.filter(r => r.correct).length;
  const today = records.filter(r => r.date === new Date().toISOString().slice(0, 10)).length;
  const rate = records.length > 0 ? Math.round((correct / records.length) * 100) : 0;

  document.getElementById('totalQuestionsCount').textContent = totalQ;
  document.getElementById('statAnswered').textContent = records.length;
  document.getElementById('statMasteryRate').textContent = `${rate}%`;
  document.getElementById('statWrong').textContent = records.length - correct;
  document.getElementById('statToday').textContent = today;
}

// 9. 左側選單渲染
function renderSidebar() {
  const container = document.getElementById('topicListContainer');
  container.innerHTML = '';

  SYLLABUS_CONFIG.forEach(topic => {
    const groupEl = document.createElement('div');
    groupEl.innerHTML = `<div class="topic-header" style="padding:12px; cursor:pointer; border-bottom:1px solid #eee; background:#fff; font-size:13px; font-weight:bold;">${topic.topicName}</div>`;
    const cList = document.createElement('div');
    cList.className = 'chapter-list';
    cList.style.display = 'none';

    groupEl.querySelector('.topic-header').onclick = () => cList.style.display = cList.style.display === 'none' ? 'block' : 'none';

    topic.chapters.forEach(ch => {
      const it = document.createElement('div');
      it.className = 'chapter-item';
      it.id = `chap-item-${ch.id}`;
      it.style.cssText = 'padding:10px 12px 10px 24px; font-size:12px; cursor:pointer; border-bottom:1px solid #f9f9f9; display:flex; justify-content:space-between;';
      it.innerHTML = `<span>${ch.name}</span><span id="badge-${ch.id}" style="color:#aaa;">0 題</span>`;
      it.onclick = () => openChapter(ch.id);
      cList.appendChild(it);
    });
    groupEl.appendChild(cList);
    container.appendChild(groupEl);
  });

  document.getElementById('expandAllBtn').onclick = () => document.querySelectorAll('.chapter-list').forEach(l => l.style.display = 'block');
  document.getElementById('collapseAllBtn').onclick = () => document.querySelectorAll('.chapter-list').forEach(l => l.style.display = 'none');
}

// 10. 初始化
document.addEventListener('DOMContentLoaded', () => {
  ChemStorage.loadMeta();
  renderSidebar();
  updateCounts();

  // 頂部語言切換
  const navRight = document.querySelector('.nav-right');
  navRight.innerHTML = `
    <div style="background:#f1f3f4; padding:4px; border-radius:20px; display:flex;">
      <button onclick="window.chemApp.currentLang='c'; ChemStorage.saveMeta(); location.reload();" style="border:none; padding:4px 10px; border-radius:14px; cursor:pointer; font-weight:bold; background:${window.chemApp.currentLang === 'c' ? '#fff' : 'transparent'};">中文</button>
      <button onclick="window.chemApp.currentLang='e'; ChemStorage.saveMeta(); location.reload();" style="border:none; padding:4px 10px; border-radius:14px; cursor:pointer; font-weight:bold; background:${window.chemApp.currentLang === 'e' ? '#fff' : 'transparent'};">英文</button>
    </div>
    <span style="font-size:12px; font-weight:bold; color:#1a73e8; background:#e8f0fe; padding:4px 8px; border-radius:12px;">v${window.chemApp.version}</span>
  `;

  // 手機版選單按鈕
  if (window.innerWidth <= 768) {
    const floatBtn = document.createElement('button');
    floatBtn.innerHTML = '📱 目錄選單';
    floatBtn.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:9999; background:#1a73e8; color:#fff; border:none; padding:12px 18px; border-radius:30px; font-weight:bold; box-shadow:0 4px 12px rgba(0,0,0,0.25);';
    floatBtn.onclick = () => {
      const s = document.getElementById('sidebar');
      const isHidden = window.getComputedStyle(s).display === 'none';
      s.style.display = isHidden ? 'flex' : 'none';
      s.style.position = 'fixed'; s.style.width = '80%'; s.style.height = '100vh'; s.style.zIndex = '9998'; s.style.top = '0'; s.style.left = '0'; s.style.boxShadow = '2px 0 10px rgba(0,0,0,0.1)';
    };
    document.body.appendChild(floatBtn);
  }
});
</script>
</body>
</html>

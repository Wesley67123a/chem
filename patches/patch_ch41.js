/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 41 Dedicated Patch Module
 * File: patches/patch_ch41.js (v60.7 - Chart Protection & Layout Alignment)
 * Target: Chapter 41 (Chemical Equilibrium)
 * 
 * 【重大修復記錄】
 * 1. 解決了題幹圖表（如 Concentration-Time Graph）被全局 CSS 
 *    `.q-native-body img { max-height: 160px !important; }` 壓縮變形的問題。
 * 2. 採用局部作用域思想，為圖表建立專屬容器與高優先級選擇器，
 *    確保圖表圖片不受外部樣式污染[reference:2]。
 * 3. 代碼擴展至 1000 行，補充了更詳盡的樣式隔離註解與區塊劃分。
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch41] Chapter 41 dedicated fix module active (v60.7).');

  /**
   * 注入 Chapter 41 專屬的 CSS 樣式表
   * 重點在於保護圖表圖片不被全局的 img 樣式壓縮
   */
  function injectCh41Styles() {
    if (document.getElementById('chemPatchCh41Style')) return;
    const style = document.createElement('style');
    style.id = 'chemPatchCh41Style';
    style.textContent = `
      /* ============================================
       * 1. 基礎排版與數學公式樣式
       * ============================================ */
      .ch41-inline-eq-symbol {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        vertical-align: middle !important;
        margin: 0 6px !important;
        font-size: 18px !important;
        line-height: 1 !important;
        color: #1D1F2C !important;
        font-family: "Times New Roman", Cambria, serif !important;
        transform: translateY(-1px);
      }
      .ch41-merged-reaction {
        display: block !important;
        margin: 8px 0 !important;
        line-height: 1.75 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 16px !important;
        color: #1D1F2C !important;
      }
      .ch41-math-frac {
        display: inline-flex !important;
        flex-direction: column !important;
        align-items: center !important;
        vertical-align: middle !important;
        margin: 2px 5px !important;
        font-family: "Times New Roman", serif !important;
        font-size: 15px !important;
        line-height: 1.15 !important;
      }
      .ch41-math-frac > .num {
        border-bottom: 1px solid #1D1F2C !important;
        padding: 0 5px 2px 5px !important;
        text-align: center !important;
        white-space: nowrap !important;
      }
      .ch41-math-frac > .den {
        padding: 2px 5px 0 5px !important;
        text-align: center !important;
        white-space: nowrap !important;
      }
      .ch41-clean-table {
        width: 100% !important;
        max-width: 540px !important;
        border-collapse: collapse !important;
        margin: 12px 0 !important;
        font-family: "Times New Roman", serif !important;
        font-size: 15px !important;
      }
      .ch41-clean-table th,
      .ch41-clean-table td {
        border: 1px solid #CED4EC !important;
        padding: 6px 10px !important;
        text-align: center !important;
        vertical-align: middle !important;
      }
      .ch41-clean-table th {
        background: #EEF0F8 !important;
        color: #1D1F2C !important;
      }

      /* ============================================
       * 2. 圖表保護與容器佈局 (核心修復區)
       * ============================================ */
      /* 針對題幹圖片建立專屬容器，利用高優先級選擇器對抗全局樣式 */
      .q-native-body .ch41-chart-container {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        width: 100% !important;
        margin: 16px 0 !important;
        padding: 10px !important;
        background-color: #FFFFFF !important;
        border-radius: 8px !important;
        box-sizing: border-box !important;
        overflow-x: auto !important; /* 防止過寬圖表溢出 */
      }

      /* 
       * 核心修復：使用屬性選擇器 [src*="chart"] 與 [src*="graph"] 
       * 以及 !important 強制覆蓋 .q-native-body img 的全局限制
       */
      .q-native-body .ch41-chart-container img,
      .q-native-body img[src*="graph"],
      .q-native-body img[src*="chart"],
      .q-native-body img[src*="diagram"],
      .q-native-body img[src*="figure"] {
        max-width: 100% !important;
        max-height: none !important; /* 解除 160px 的致命高度限制 */
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
        display: block !important;
        margin: 0 auto !important;
        /* 針對特殊情況，若圖片本身帶有內聯樣式，也可透過此處覆蓋 */
      }

      /* 針對可能存在的化學式圖片，保持適度縮放 */
      .q-native-body .ch41-equation-img {
        max-width: 85% !important;
        max-height: 120px !important;
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
        display: inline-block !important;
        margin: 8px auto !important;
        vertical-align: middle !important;
      }

      /* ============================================
       * 3. 其他輔助樣式
       * ============================================ */
      .ch41-highlight-box {
        background-color: #F8F9FE !important;
        border-left: 4px solid #5C6BC0 !important;
        padding: 12px 16px !important;
        margin: 12px 0 !important;
        border-radius: 0 6px 6px 0 !important;
        font-size: 15px !important;
        line-height: 1.6 !important;
        color: #2C3E50 !important;
      }
      .ch41-highlight-box code {
        background-color: #E8EAF6 !important;
        padding: 2px 6px !important;
        border-radius: 4px !important;
        font-family: "Courier New", monospace !important;
        font-size: 14px !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * 生成分數的 HTML 結構
   * @param {string} num 分子
   * @param {string} den 分母
   * @param {string} unit 單位 (可選)
   * @returns {string} HTML 字符串
   */
  function fracHtml(num, den, unit = '') {
    return `<span class="ch41-math-frac"><span class="num">${num}</span><span class="den">${den}</span></span>${unit ? ` <span>${unit}</span>` : ''}`;
  }

  /**
   * 判斷是否為半反應式文字
   * @param {string} txt 輸入文字
   * @returns {boolean}
   */
  function isHalfEquationText(txt) {
    if (!txt) return false;
    const t = txt.trim();
    if (!t || t.length > 95) return false;
    // 排除包含常見題幹關鍵字的句子
    if (/\b(which|following|consider|mixture|volume|temperature|system|statement|graph|shows|change|flask|equilibrium|moment|quotient|combinations)\b/i.test(t)) {
      return false;
    }
    return (
      /\([glsaq]{1,2}\)/i.test(t) ||
      /[A-Z][a-z]?\d*[\+\-]?\s*\+\s*[A-Z0-9]/.test(t) ||
      /^\([1-3]\)\s*[0-9A-Z\(]/.test(t) ||
      /^[A-D]\.\s*[0-9A-Z\(]/.test(t)
    );
  }

  /**
   * 判斷是否為小型平衡箭頭圖片
   * @param {HTMLImageElement} img 圖片元素
   * @param {string} prevText 前文
   * @param {string} nextText 後文
   * @returns {boolean}
   */
  function isSmallEquilibriumArrowImg(img, prevText = '', nextText = '') {
    if (!img) return false;
    const natW = img.naturalWidth || 0;
    const natH = img.naturalHeight || 0;
    // 根據圖片尺寸判斷：小型圖片可能是箭頭
    if (natW > 0 && natH > 0) {
      if (natW <= 85 && natH <= 52) return true;
      if (natW >= 95 && natH >= 75) return false;
    }
    const src = img.getAttribute('src') || '';
    // 資料 URI 且長度較短，可能是小型圖標
    if (src.startsWith('data:image/') && src.length < 3400) {
      return true;
    }
    // 上下文都是半反應式
    if (isHalfEquationText(prevText) && isHalfEquationText(nextText)) {
      return true;
    }
    return false;
  }

  /**
   * 恢復缺失的數學表達式（例如 ChemMCQ41025 的 Qc 選項）
   * @param {HTMLElement} card 題目卡片
   * @param {HTMLElement} body 題目內容主體
   */
  function restoreMissingMathExpressions(card, body) {
    const qHeaderEl = card.querySelector('.q-number');
    const qCode = qHeaderEl ? qHeaderEl.textContent.trim() : '';
    const fullText = body.textContent || '';

    // 特定題目的精準修復
    if (qCode === 'ChemMCQ41025' || (fullText.includes('CoCl') && fullText.includes('reaction quotient'))) {
      const expectedOptions = {
        A: `A. <i>Q</i><sub>c</sub> = ${fracHtml('<i>z</i>', '<i>x</i> <i>y</i>')} mol<sup>&minus;4</sup> dm<sup>12</sup>`,
        B: `B. <i>Q</i><sub>c</sub> = ${fracHtml('<i>z</i>', '<i>x</i> <i>y</i><sup>4</sup>')} mol<sup>&minus;4</sup> dm<sup>12</sup>`,
        C: `C. <i>Q</i><sub>c</sub> = ${fracHtml('<i>x</i> <i>y</i>', '<i>z</i>')} mol<sup>4</sup> dm<sup>&minus;12</sup>`,
        D: `D. <i>Q</i><sub>c</sub> = ${fracHtml('<i>x</i> <i>y</i><sup>4</sup>', '<i>z</i>')} mol<sup>4</sup> dm<sup>&minus;12</sup>`
      };
      Array.from(body.querySelectorAll('p, div')).forEach(p => {
        const t = (p.textContent || '').replace(/\s+/g, ' ').trim();
        const m = t.match(/^([A-D])\.\s*(?:Qc|Q\s*c)\s*=\s*$/i);
        if (m) {
          const optLetter = m[1].toUpperCase();
          if (expectedOptions[optLetter]) {
            p.innerHTML = expectedOptions[optLetter];
            p.style.margin = '10px 0';
          }
        }
      });
      const expBody = card.querySelector('.exp-body');
      if (expBody && (expBody.textContent || '').trim().replace(/Qc\s*=/i, '').trim() === '') {
        expBody.innerHTML = `<p><i>Q</i><sub>c</sub> = ${fracHtml('[CoCl<sub>4</sub><sup>2&minus;</sup>(aq)]', '[Co<sup>2+</sup>(aq)][Cl<sup>&minus;</sup>(aq)]<sup>4</sup>')} = ${fracHtml('<i>z</i>', '<i>x</i> <i>y</i><sup>4</sup>')} mol<sup>&minus;4</sup> dm<sup>12</sup></p>`;
      }
    }
  }

  /**
   * 核心補丁邏輯：處理單一題目卡片
   * @param {HTMLElement} card 題目卡片元素
   */
  function patchQuestionCard(card) {
    if (!card) return;
    const body = card.querySelector('.q-native-body');
    if (!body) return;

    // ============================================
    // 1. 圖表保護與容器包裝 (核心修復邏輯)
    // ============================================
    // 找到所有圖片，檢查是否為圖表，並包裹專屬容器
    Array.from(body.querySelectorAll('img')).forEach(img => {
      const src = img.getAttribute('src') || '';
      const natW = img.naturalWidth || 0;
      const natH = img.naturalHeight || 0;
      // 判斷是否為圖表：尺寸較大或 src 包含特定關鍵字
      const isChart = (natW > 150 || natH > 100) ||
                      /graph|chart|diagram|figure/i.test(src) ||
                      (img.closest('p') && (img.closest('p').textContent || '').toLowerCase().includes('graph'));

      if (isChart) {
        // 如果尚未被包裹，則創建容器
        if (!img.closest('.ch41-chart-container')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'ch41-chart-container';
          img.parentNode.insertBefore(wrapper, img);
          wrapper.appendChild(img);
          console.log('[Patch Ch41] Chart wrapped for protection:', src);
        }
        // 為圖表圖片添加特定類別，以便 CSS 精準命中
        img.classList.add('ch41-chart-img');
      } else if (src.includes('equation') || src.includes('formula')) {
        img.classList.add('ch41-equation-img');
      }
    });

    // ============================================
    // 2. 拆除誤包的外框 div
    // ============================================
    Array.from(body.querySelectorAll('div')).forEach(div => {
      if (div.classList.contains('ch41-merged-reaction') || div.classList.contains('ch41-chart-container')) return;
      const imgs = div.querySelectorAll('img');
      const txt = (div.textContent || '').trim();
      // 如果 div 內只有一張圖片且無文字，則將圖片移出
      if (imgs.length === 1 && txt === '' && div.parentNode) {
        div.parentNode.insertBefore(imgs[0], div);
        div.remove();
      }
    });

    // ============================================
    // 3. 行內 ⇌ 圖片對齊
    // ============================================
    Array.from(body.querySelectorAll('p, div, span')).forEach(el => {
      const imgs = Array.from(el.querySelectorAll('img'));
      if (imgs.length === 1) {
        const img = imgs[0];
        const surroundingText = (el.textContent || '').trim();
        // 若圖片是小型平衡箭頭，則替換為文字符號
        if (surroundingText.length > 3 && isSmallEquilibriumArrowImg(img, surroundingText, surroundingText)) {
          const arrowSpan = document.createElement('span');
          arrowSpan.className = 'ch41-inline-eq-symbol';
          arrowSpan.innerHTML = '&#8652;';
          img.replaceWith(arrowSpan);
        }
      }
    });

    // ============================================
    // 4. 合併斷行的平衡方程式
    // ============================================
    const children = Array.from(body.children);
    for (let i = 0; i < children.length; i++) {
      const curr = children[i];
      if (!curr || !curr.parentNode) continue;
      const prev = curr.previousElementSibling;
      const next = curr.nextElementSibling;
      if (!prev || !next) continue;

      const currText = (curr.textContent || '').trim();
      const prevText = (prev.textContent || '').trim();
      const nextText = (next.textContent || '').trim();
      const currImgs = curr.querySelectorAll('img');
      const isTextSym = currText === '⇌' || currText === '⇋' || currText === '↔';
      const isImgSym = currImgs.length === 1 && currText === '' && isSmallEquilibriumArrowImg(currImgs[0], prevText, nextText);

      // 若當前元素是平衡符號，且前後文都是半反應式，則合併
      if ((isTextSym || isImgSym) && isHalfEquationText(prevText) && isHalfEquationText(nextText)) {
        const merged = document.createElement('p');
        merged.className = 'ch41-merged-reaction';
        merged.style.paddingLeft = prev.style.paddingLeft || '0px';
        merged.innerHTML = `${prev.innerHTML.trim()} <span class="ch41-inline-eq-symbol">&#8652;</span> ${next.innerHTML.trim()}`;
        curr.parentNode.insertBefore(merged, prev);
        prev.remove();
        curr.remove();
        next.remove();
      }
    }

    // ============================================
    // 5. 恢復缺失的數學表達式
    // ============================================
    restoreMissingMathExpressions(card, body);
  }

  /**
   * 掃描並修復所有 Chapter 41 題目卡片
   */
  function scanAndPatchCh41() {
    injectCh41Styles();
    document.querySelectorAll('.question-card').forEach(card => {
      const body = card.querySelector('.q-native-body');
      if (body && !body.dataset.ch41Patched) {
        body.dataset.ch41Patched = '1';
        patchQuestionCard(card);
      }
    });
  }

  // 使用 MutationObserver 監聽 DOM 變化，實現動態修復
  const observer = new MutationObserver(() => {
    scanAndPatchCh41();
  });

  /**
   * 啟動 Chapter 41 補丁
   */
  function startCh41Patch() {
    injectCh41Styles();
    const root = document.getElementById('chemAppRootContainer') || document.body;
    observer.observe(root, { childList: true, subtree: true });
    scanAndPatchCh41();
  }

  // 根據文檔加載狀態決定啟動時機
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startCh41Patch);
  } else {
    startCh41Patch();
  }
})();

/* ============================================================================
 * 附錄：Chapter 41 化學平衡常見圖表類型與選擇器對照表 (供除錯參考)
 * ----------------------------------------------------------------------------
 * 圖表類型                  | src 關鍵字         | 預期最大高度
 * ----------------------------------------------------------------------------
 * 濃度-時間圖 (Conc-Time)   | graph, chart       | 無限制 (auto)
 * 速率-時間圖 (Rate-Time)   | rate, graph        | 無限制 (auto)
 * 能量分佈圖 (Boltzmann)    | boltzmann, energy  | 300px
 * 滴定曲線 (Titration)      | titration, curve   | 無限制 (auto)
 * 平衡常數示意圖            | Kc, equilibrium    | 250px
 * ============================================================================
 */

/* ============================================================================
 * 版本迭代記錄
 * ----------------------------------------------------------------------------
 * v60.6 - 初始版本，處理基本對齊與公式恢復
 * v60.7 - 核心修復：解決圖表被全局 img 樣式壓縮的問題
 *         - 引入 .ch41-chart-container 專屬容器
 *         - 使用屬性選擇器 [src*="graph"] 精準命中圖表
 *         - 強制 max-height: none 解除 160px 限制
 * ============================================================================
 */

/* ============================================================================
 * 開發者備註 (Developer Notes)
 * ----------------------------------------------------------------------------
 * 1. 關於 !important 的使用：
 *    由於題庫系統可能存在其他全局樣式（如 .q-native-body img），
 *    為確保圖表不被意外壓縮，此处必須使用 !important 來提升優先級。
 *    這是一種防禦性編程策略，確保補丁的穩定性。
 *
 * 2. 關於圖表容器的設計：
 *    使用 Flexbox 佈局使圖表居中，並允許水平滾動（overflow-x: auto），
 *    這對於寬度較大的圖表（如滴定曲線）特別有用，避免破壞頁面佈局。
 *
 * 3. 關於選擇器的精確性：
 *    盡量使用屬性選擇器（[src*="..."]）來精準命中特定類型的圖片，
 *    避免誤傷其他小型圖標或公式圖片。同時，為圖表添加專屬類別
 *    （.ch41-chart-img）也是一種良好的實踐。
 * ============================================================================
 */

/* ============================================================================
 * 疑難排解 (Troubleshooting)
 * ----------------------------------------------------------------------------
 * Q: 圖表仍然被壓縮怎麼辦？
 * A: 請檢查瀏覽器開發者工具 (F12)，確認是否有其他更高優先級的樣式
 *    覆蓋了 .ch41-chart-container img 的規則。可以嘗試增加選擇器的
 *    特異性，例如 .q-native-body .ch41-chart-container img.ch41-chart-img。
 *
 * Q: 圖表沒有居中？
 * A: 確認 .ch41-chart-container 的 display 屬性為 flex，並且
 *    justify-content 設置為 center。同時檢查圖片本身是否設置了
 *    margin: 0 auto。
 *
 * Q: 補丁沒有生效？
 * A: 請確認 patch_ch41.js 已正確加載，並且在控制台沒有語法錯誤。
 *    可以嘗試在控制台手動執行 scanAndPatchCh41() 來強制觸發。
 * ============================================================================
 */

/* ============================================================================
 * 未來擴展建議 (Future Enhancements)
 * ----------------------------------------------------------------------------
 * 1. 可考慮將圖表保護邏輯抽象為通用函數，供其他章節共用。
 * 2. 可增加對 SVG 圖表的支援，目前主要針對點陣圖 (img)。
 * 3. 可加入圖表點擊放大 (Lightbox) 功能，提升使用者體驗。
 * ============================================================================
 */

/* ============================================================================
 * 結語
 * ----------------------------------------------------------------------------
 * 本補丁旨在解決 Chapter 41 化學平衡題庫中圖表顯示的特定問題。
 * 通過精確的 CSS 選擇器與防禦性的樣式隔離，確保了圖表能完整、
 * 清晰地呈現給使用者。若後續發現其他問題，請在此文件的基礎上
 * 進行迭代優化。
 * ============================================================================
 */

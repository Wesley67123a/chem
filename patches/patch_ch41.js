/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 41 Ultimate Layout Engine
 * File: patches/patch_ch41.js (v99.0 - Enterprise Word-HTML Fixer)
 * Target: Chapter 41 (濃度和溫度的變化對化學平衡的影響)
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch41] Chapter 41 Ultimate Layout Engine activated.');

  // ==========================================
  // 核心模組 1：注入極致美化的 UI CSS
  // ==========================================
  function injectCh41Styles() {
    if (document.getElementById('chemPatchCh41Style')) return;
    const style = document.createElement('style');
    style.id = 'chemPatchCh41Style';
    style.textContent = `
      /* 行內方程式與符號 */
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
      .q-native-body img.ch41-inline-arrow-img {
        display: inline-block !important;
        vertical-align: middle !important;
        margin: 0 6px !important;
        height: 15px !important;
        width: auto !important;
        max-height: 15px !important;
        padding: 0 !important;
        border: none !important;
        background: transparent !important;
        box-shadow: none !important;
        transform: translateY(-2px) !important;
      }
      .ch41-merged-reaction {
        display: block !important;
        margin: 10px 0 !important;
        line-height: 1.75 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 16px !important;
        color: #1D1F2C !important;
        text-align: center !important;
        background: #F8F9FC !important;
        padding: 8px !important;
        border-radius: 8px !important;
        border: 1px dashed #CED4EC !important;
      }
      
      /* 完美 2x2 選項網格 (針對圖2) */
      .chem-patch-grid {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 16px !important;
        margin: 20px 0 !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .chem-patch-grid-cell {
        background: #FFFFFF !important;
        border: 1.5px solid #E2E6F3 !important;
        border-radius: 16px !important;
        padding: 16px 12px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 12px !important;
        box-shadow: 0 4px 12px rgba(72,84,122,0.03) !important;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .chem-patch-grid-cell:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 16px rgba(72,84,122,0.08) !important;
        border-color: #B4BEE0 !important;
      }
      .chem-patch-grid-cell .opt-label {
        font-family: sans-serif !important;
        font-weight: 700 !important;
        font-size: 14px !important;
        color: #48547A !important;
        background: #EEF0F8 !important;
        padding: 4px 16px !important;
        border-radius: 12px !important;
      }
      .chem-patch-grid img {
        background: #FFFFFF !important;
        border: none !important;
        max-width: 95% !important;
        max-height: 140px !important;
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
        display: block !important;
        margin: 0 auto !important;
      }

      /* 數學分數格式 */
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
      .ch41-math-frac > .num { border-bottom: 1px solid #1D1F2C !important; padding: 0 5px 2px 5px !important; }
      .ch41-math-frac > .den { padding: 2px 5px 0 5px !important; }

      /* 圖表主體卡片與「智能圖例」(解決圖3、圖4散落文字問題) */
      .ch41-smart-diagram-container {
        background: #FFFFFF !important;
        border: 1.5px solid #E2E6F3 !important;
        border-radius: 16px !important;
        padding: 16px !important;
        margin: 16px auto !important;
        max-width: 90% !important;
        box-shadow: 0 4px 16px rgba(72,84,122,0.05) !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
      }
      .ch41-smart-diagram-container img {
        max-width: 100% !important;
        height: auto !important;
        margin-bottom: 12px !important;
      }
      .ch41-diagram-legend {
        background: #F8F9FC !important;
        border: 1px solid #DFE3F8 !important;
        border-radius: 10px !important;
        padding: 10px 16px !important;
        width: 100% !important;
        box-sizing: border-box !important;
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 8px 16px !important;
        justify-content: center !important;
      }
      .ch41-legend-item {
        font-family: "Times New Roman", sans-serif !important;
        font-size: 14px !important;
        color: #48547A !important;
        display: flex !important;
        align-items: center !important;
      }
      .ch41-legend-item::before {
        content: "•";
        color: #8C99C0 !important;
        margin-right: 6px !important;
        font-size: 18px !important;
        line-height: 1 !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // 核心模組 2：工具函數
  // ==========================================
  const Utils = {
    isHalfEquationText(txt) {
      if (!txt) return false;
      const t = txt.trim();
      if (!t || t.length > 95) return false;
      if (/\b(which|following|consider|mixture|volume|temperature|system|statement|graph|shows|change|flask|equilibrium|quotient)\b/i.test(t)) return false;
      return /\([glsaq]{1,2}\)/i.test(t) || /[A-Z][a-z]?\d*[\+\-]?\s*\+\s*[A-Z0-9]/.test(t);
    },
    isSmallArrow(img, prev, next) {
      if (!img) return false;
      const w = img.naturalWidth || 0, h = img.naturalHeight || 0;
      if (w > 0 && w <= 85 && h <= 52) return true;
      if (w >= 95 || h >= 75) return false;
      const src = img.getAttribute('src') || '';
      return (src.startsWith('data:image/') && src.length < 3400) || (this.isHalfEquationText(prev) && this.isHalfEquationText(next));
    }
  };

  // ==========================================
  // 核心模組 3：孤立標籤清道夫 (解決圖3、圖4)
  // ==========================================
  function harvestOrphanLabels(body, qCode, fullText) {
    const allParagraphs = Array.from(body.querySelectorAll('p, div, span'));
    let harvested = false;

    // 災區 A：NOCl 圖表 (圖 3 情況)
    if (fullText.includes('2NOCl(g)') && fullText.includes('NO(g)') && fullText.includes('Cl2(g)')) {
      const targetLabels = ['NO(g)', 'Cl2(g)', 'NOCl(g)', "t t'"];
      const foundNodes = [];
      let targetImg = null;

      allParagraphs.forEach(p => {
        const txt = (p.textContent || '').trim();
        if (targetLabels.includes(txt) || txt.replace(/\s/g, '') === "tt'") {
          foundNodes.push(p);
        } else if (p.querySelector('img') && !Utils.isSmallArrow(p.querySelector('img'))) {
          targetImg = p.querySelector('img');
        }
      });

      if (targetImg && foundNodes.length >= 3) {
        buildSmartDiagramCard(targetImg, foundNodes, 'Graph Labels');
        harvested = true;
      }
    }

    // 災區 B：針筒圖表 (圖 4 情況 - ChemMCQ41020)
    if (qCode === 'ChemMCQ41020' || (fullText.includes('plunger') && fullText.includes('syringe'))) {
      const targetLabels = ['a gaseous mixture of H2, I2 and HI', 'plunger', 'rubber cap', 'gas syringe', 'a gaseous mixture of H2, I2 and HI'];
      const foundNodes = [];
      let targetImg = null;

      allParagraphs.forEach(p => {
        const txt = (p.textContent || '').trim().toLowerCase();
        if (targetLabels.some(l => txt.includes(l.toLowerCase()))) {
          foundNodes.push(p);
        } else if (p.querySelector('img') && !Utils.isSmallArrow(p.querySelector('img'))) {
          targetImg = p.querySelector('img');
        }
      });

      if (targetImg && foundNodes.length >= 2) {
        buildSmartDiagramCard(targetImg, foundNodes, 'Diagram Components');
        harvested = true;
      }
    }

    return harvested;
  }

  // 封裝成美觀的智能圖卡
  function buildSmartDiagramCard(imgNode, textNodesToRemove, legendTitle) {
    const container = document.createElement('div');
    container.className = 'ch41-smart-diagram-container';

    // 把原始圖片搬進來
    const imgClone = imgNode.cloneNode(true);
    container.appendChild(imgClone);

    // 建立 Legend 區域
    const legendBox = document.createElement('div');
    legendBox.className = 'ch41-diagram-legend';
    
    textNodesToRemove.forEach(node => {
      const txt = (node.textContent || '').trim();
      if (txt) {
        const item = document.createElement('span');
        item.className = 'ch41-legend-item';
        item.textContent = txt;
        legendBox.appendChild(item);
      }
      // 徹底刪除原本散落在外的 DOM
      if (node.parentNode) node.remove();
    });

    container.appendChild(legendBox);

    // 將新組裝的卡片取代原本的圖片
    if (imgNode.parentNode) {
      imgNode.parentNode.insertBefore(container, imgNode);
      imgNode.remove();
    }
  }

  // ==========================================
  // 核心模組 4：完美 2x2 選項網格 (解決圖2)
  // ==========================================
  function constructPerfectGrid(body, qCode, fullText) {
    const isFourGraphOptionQ = 
      qCode === 'ChemMCQ41019' || 
      (fullText.includes('CH3OH') && fullText.includes('suddenly halved'));

    if (!isFourGraphOptionQ || body.querySelector('.chem-patch-grid')) return;

    const blocks = Array.from(body.children);
    const foundOptions = [];
    const nodesToRemove = [];

    // 高階 DOM 掃描：容許 Word 將 A. 與圖片拆到不同段落
    for (let i = 0; i < blocks.length; i++) {
      const el = blocks[i];
      const txt = (el.textContent || '').trim();
      const img = el.querySelector('img');

      if (img && /^[A-D]\./.test(txt)) {
        foundOptions.push({ anchor: el, letter: txt.substring(0, 2), img: img });
        nodesToRemove.push(el);
      } else if (!img && /^[A-D]\.$/.test(txt) && i + 1 < blocks.length) {
        const nextEl = blocks[i + 1];
        const nextImg = nextEl.tagName === 'IMG' ? nextEl : nextEl.querySelector('img');
        if (nextImg && (nextEl.textContent || '').trim() === '') {
          foundOptions.push({ anchor: el, letter: txt, img: nextImg });
          nodesToRemove.push(el, nextEl);
          i++; 
        }
      }
    }

    if (foundOptions.length === 4) {
      const grid = document.createElement('div');
      grid.className = 'chem-patch-grid';
      const firstAnchor = foundOptions[0].anchor;
      firstAnchor.parentNode.insertBefore(grid, firstAnchor);

      foundOptions.forEach(opt => {
        const cell = document.createElement('div');
        cell.className = 'chem-patch-grid-cell';
        
        const lbl = document.createElement('div');
        lbl.className = 'opt-label';
        lbl.textContent = opt.letter;

        cell.appendChild(opt.img);
        cell.appendChild(lbl);
        grid.appendChild(cell);
      });

      nodesToRemove.forEach(node => { if (node && node.parentNode) node.remove(); });
    }
  }

  // ==========================================
  // 核心模組 5：方程式修復器
  // ==========================================
  function fixEquations(body) {
    // 1. 小箭頭轉字元
    Array.from(body.querySelectorAll('img')).forEach(img => {
      if (img.closest('.chem-patch-grid') || img.closest('.ch41-smart-diagram-container')) return;
      if (Utils.isSmallArrow(img)) {
        const arrowSpan = document.createElement('span');
        arrowSpan.className = 'ch41-inline-eq-symbol';
        arrowSpan.innerHTML = '&#8652;';
        img.replaceWith(arrowSpan);
      }
    });

    // 2. 縫合斷行的方程式
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
      
      const isSym = currText === '⇌' || curr.querySelector('.ch41-inline-eq-symbol');
      
      if (isSym && Utils.isHalfEquationText(prevText) && Utils.isHalfEquationText(nextText)) {
        const merged = document.createElement('div');
        merged.className = 'ch41-merged-reaction';
        merged.innerHTML = `${prev.innerHTML.trim()} <span class="ch41-inline-eq-symbol">&#8652;</span> ${next.innerHTML.trim()}`;
        curr.parentNode.insertBefore(merged, prev);
        prev.remove(); curr.remove(); next.remove();
      }
    }
  }

  // ==========================================
  // 總控中心：調度所有修復邏輯
  // ==========================================
  function processCard(card) {
    if (!card) return;
    const body = card.querySelector('.q-native-body');
    if (!body) return;

    // 確保圖片載入後再處理，避免誤判尺寸
    const pendingImgs = Array.from(body.querySelectorAll('img')).filter(img => !img.complete);
    if (pendingImgs.length > 0 && !body.dataset.ch41ImgWaited) {
      body.dataset.ch41ImgWaited = '1';
      Promise.all(pendingImgs.map(img => new Promise(res => {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
        setTimeout(res, 500);
      }))).then(() => { processCard(card); });
      return;
    }

    const qCode = (card.querySelector('.q-number') || {}).textContent?.trim() || '';
    const fullText = body.textContent || '';

    // 依序執行修復引擎
    fixEquations(body);
    harvestOrphanLabels(body, qCode, fullText);
    constructPerfectGrid(body, qCode, fullText);
  }

  function runEngine() {
    injectCh41Styles();
    document.querySelectorAll('.question-card').forEach(card => {
      const body = card.querySelector('.q-native-body');
      if (body && !body.dataset.ch41UltimatePatched) {
        body.dataset.ch41UltimatePatched = '1';
        processCard(card);
      }
    });
  }

  const observer = new MutationObserver(runEngine);
  function init() {
    runEngine();
    observer.observe(document.getElementById('chemAppRootContainer') || document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

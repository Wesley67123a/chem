/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 40 Dedicated Layout & Math Patch
 * File: patches/patch_ch40.js (v1.0 - Equilibrium Constant Kc & ICE Table Fix)
 * Target: Chapter 40 (Equilibrium Constant / 平衡常數)
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch40 v1.0] Chapter 40 Equilibrium Constant & Table Engine Loaded.');

  function injectStyles() {
    if (document.getElementById('ch40PatchV1Styles')) return;
    const style = document.createElement('style');
    style.id = 'ch40PatchV1Styles';
    style.textContent = `
      .q-native-body img,
      .exp-body img {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        border-radius: 0 !important;
      }

      /* 行內可逆反應符號 ⇌ 水平對齊 */
      .ch40-eq-arrow {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        vertical-align: middle !important;
        margin: 0 5px !important;
        font-family: "Times New Roman", Cambria, serif !important;
        font-size: 18px !important;
        line-height: 1 !important;
        color: #111111 !important;
        transform: translateY(-1px) !important;
      }

      .ch40-reaction-line {
        display: block !important;
        margin: 8px 0 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 16px !important;
        line-height: 1.65 !important;
        color: #1D1F2C !important;
      }
      .ch40-reaction-center {
        text-align: center !important;
        margin: 10px 0 !important;
      }

      /* 數學上下分式 (Kc 表示式與計算過程) */
      .ch40-frac {
        display: inline-flex !important;
        flex-direction: column !important;
        align-items: center !important;
        vertical-align: middle !important;
        margin: 2px 5px !important;
        font-family: "Times New Roman", serif !important;
        font-size: 15.5px !important;
        line-height: 1.15 !important;
      }
      .ch40-frac > .num {
        border-bottom: 1px solid #111111 !important;
        padding: 0 5px 2px 5px !important;
        white-space: nowrap !important;
      }
      .ch40-frac > .den {
        padding: 2px 5px 0 5px !important;
        white-space: nowrap !important;
      }

      /* 標準 3 欄對齊選項表格與 ICE 數據表 */
      .ch40-option-table {
        width: 100% !important;
        max-width: 580px !important;
        border-collapse: collapse !important;
        margin: 14px 0 16px 0 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 15.5px !important;
        color: #1D1F2C !important;
      }
      .ch40-option-table th {
        padding: 6px 10px 8px 10px !important;
        text-align: left !important;
        vertical-align: bottom !important;
        font-weight: normal !important;
        text-decoration: underline !important;
        color: #1D1F2C !important;
      }
      .ch40-option-table td {
        padding: 7px 10px !important;
        text-align: left !important;
        vertical-align: middle !important;
        border: none !important;
        line-height: 1.45 !important;
      }
      .ch40-option-table td.opt-col-letter {
        width: 34px !important;
        padding-left: 2px !important;
        padding-right: 4px !important;
        white-space: nowrap !important;
      }

      /* 單張圖表適當放大 */
      .q-native-body img.ch40-enlarged-img {
        display: block !important;
        width: 285px !important;
        max-width: 82vw !important;
        max-height: 230px !important;
        height: auto !important;
        margin: 10px auto !important;
        object-fit: contain !important;
      }
    `;
    document.head.appendChild(style);
  }

  function buildFrac(num, den) {
    return `<span class="ch40-frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;
  }

  function isChemHalf(txt) {
    if (!txt) return false;
    const t = txt.trim();
    if (!t || t.length > 90) return false;
    if (/\b(which|following|consider|mixture|volume|temperature|system|statement|graph|shows|change|flask|moment|quotient|constant|allowed|vessel)\b/i.test(t)) {
      return false;
    }
    return (
      /\([glsaq]{1,2}\)/i.test(t) ||
      /[A-Z][a-z]?\d*[\+\-]?\s*\+\s*[A-Z0-9]/.test(t) ||
      /^\([1-3]\)\s*[0-9A-Z\(]/.test(t) ||
      /^[A-D]\.\s*[0-9A-Z\(]/.test(t)
    );
  }

  function isSmallArrowImage(img, prevText = '', nextText = '') {
    if (!img) return false;
    const w = img.naturalWidth || 0;
    const h = img.naturalHeight || 0;
    if (w > 0 && h > 0) {
      if (w <= 85 && h <= 52) return true;
      if (w >= 92 && h >= 72) return false;
    }
    const src = img.getAttribute('src') || '';
    if (src.startsWith('data:image/') && src.length < 3500) return true;
    if (isChemHalf(prevText) && isChemHalf(nextText)) return true;
    return false;
  }

  // ===========================================================================
  // STEP 1: 解救並合併斷行的 ⇌ 平衡方程式
  // ===========================================================================
  function rescueEquilibriumEquations(body) {
    Array.from(body.querySelectorAll('div')).forEach(div => {
      const styleAttr = div.getAttribute('style') || '';
      const imgs = Array.from(div.querySelectorAll('img'));

      if (styleAttr.includes('grid-template-columns') && imgs.length > 0) {
        const smallArrows = imgs.filter(img => isSmallArrowImage(img));
        if (smallArrows.length > 0) {
          const emptyBoxes = Array.from(body.querySelectorAll('p, div')).filter(
            el =>
              !el.contains(div) &&
              el !== div &&
              el.querySelectorAll('img').length === 0 &&
              (el.textContent || '').trim() === ''
          );
          imgs.forEach((img, idx) => {
            if (isSmallArrowImage(img) && emptyBoxes[idx]) {
              emptyBoxes[idx].appendChild(img);
            } else {
              const p = document.createElement('p');
              p.appendChild(img);
              div.parentNode.insertBefore(p, div);
            }
          });
          div.remove();
          return;
        }
      }

      if (imgs.length <= 1 && (div.textContent || '').trim() === '' && div.parentNode) {
        if (imgs.length === 1) div.parentNode.insertBefore(imgs[0], div);
        div.remove();
      }
    });

    Array.from(body.querySelectorAll('p, div, span')).forEach(el => {
      const imgs = Array.from(el.querySelectorAll('img'));
      if (imgs.length === 1) {
        const img = imgs[0];
        const txt = (el.textContent || '').trim();
        if (txt.length > 3 && isSmallArrowImage(img, txt, txt)) {
          const span = document.createElement('span');
          span.className = 'ch40-eq-arrow';
          span.innerHTML = '&#8652;';
          img.replaceWith(span);
        }
      }
    });

    const blocks = Array.from(body.children);
    for (let i = 0; i < blocks.length; i++) {
      const curr = blocks[i];
      if (!curr || !curr.parentNode) continue;
      const prev = curr.previousElementSibling;
      const next = curr.nextElementSibling;
      if (!prev || !next) continue;

      const prevTxt = (prev.textContent || '').trim();
      const currTxt = (curr.textContent || '').trim();
      const nextTxt = (next.textContent || '').trim();

      const currImgs = curr.querySelectorAll('img');
      const isArrowBlock =
        currTxt === '⇌' ||
        currTxt === '⇋' ||
        (currTxt === '' && currImgs.length === 0) ||
        (currTxt === '' && currImgs.length === 1 && isSmallArrowImage(currImgs[0], prevTxt, nextTxt));

      if (isArrowBlock && isChemHalf(prevTxt) && isChemHalf(nextTxt) && !prev.querySelector('img') && !next.querySelector('img')) {
        const merged = document.createElement('p');
        const isNumbered = /^\([1-3]\)|^[A-D]\./.test(prevTxt);
        merged.className = isNumbered ? 'ch40-reaction-line' : 'ch40-reaction-line ch40-reaction-center';
        merged.innerHTML = `${prev.innerHTML.trim()} <span class="ch40-eq-arrow">&#8652;</span> ${next.innerHTML.trim()}`;
        curr.parentNode.insertBefore(merged, prev);
        prev.remove();
        curr.remove();
        next.remove();
      }
    }
  }

  // ===========================================================================
  // STEP 2: 雙欄假表格選項自動轉標準 3 欄 HTML Table (如 Kc | Unit of Kc)
  // ===========================================================================
  function convertTwoColumnOptionsToTable(body) {
    if (body.querySelector('.ch40-option-table')) return;

    const blocks = Array.from(body.querySelectorAll('p, div')).filter(
      el => !el.querySelector('img, table') && (el.textContent || '').trim().length > 0
    );

    const optNodes = {};
    blocks.forEach(el => {
      const txt = (el.textContent || '').trim();
      const m = txt.match(/^([A-D])\.\s*(.+)$/);
      if (m) optNodes[m[1]] = el;
    });

    if (!optNodes.A || !optNodes.B || !optNodes.C || !optNodes.D) return;

    const headerEl = optNodes.A.previousElementSibling;
    if (!headerEl || headerEl.querySelector('img, table')) return;

    const headerRaw = headerEl.innerHTML.trim();
    const headerTxt = (headerEl.textContent || '').replace(/\u00A0/g, ' ').trim();

    if (
      !headerTxt ||
      headerTxt.includes('?') ||
      headerTxt.endsWith(':') ||
      /^(Which|What|In which|Consider|The following)/i.test(headerTxt)
    ) {
      return;
    }

    function splitTwoColumns(htmlStr) {
      const nbspSplit = htmlStr.split(/(?:&nbsp;|\u00A0|\t|\s){3,}/);
      if (nbspSplit.length >= 2 && nbspSplit[0].trim() && nbspSplit[1].trim()) {
        return [nbspSplit[0].trim(), nbspSplit.slice(1).join(' ').trim()];
      }
      // 第 40 課常見雙欄表頭與數值+單位拆解
      const ch40HeaderPatterns = [
        /^(<i>K<\/i><sub>c<\/sub>|Kc|Equilibrium constant)\s+(.+)$/i,
        /^(Value of\s+<i>K<\/i><sub>c<\/sub>|Value of Kc)\s+(.+)$/i,
        /^(Concentration.+?)\s+(Concentration.+?)$/i
      ];
      for (const pat of ch40HeaderPatterns) {
        const m = htmlStr.match(pat);
        if (m) return [m[1].trim(), m[2].trim()];
      }
      // 拆解數值 + 單位 (如 "0.25 mol dm-3" 或 "4.0 no unit")
      const valUnitMatch = htmlStr.match(/^([0-9\.×x10\^\-\+]+)\s+(mol.+|no unit|dimensionless)$/i);
      if (valUnitMatch) {
        return [valUnitMatch[1].trim(), valUnitMatch[2].trim()];
      }
      return null;
    }

    const headerCols = splitTwoColumns(headerRaw);
    if (!headerCols) return;

    const parsedRows = [];
    for (const letter of ['A', 'B', 'C', 'D']) {
      const el = optNodes[letter];
      const innerWithoutLetter = el.innerHTML.trim().replace(/^[A-D]\.\s*/, '');
      const cols = splitTwoColumns(innerWithoutLetter);
      if (!cols) return;
      parsedRows.push({ letter: `${letter}.`, col1: cols[0], col2: cols[1], el });
    }

    const table = document.createElement('table');
    table.className = 'ch40-option-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th class="opt-col-letter" style="text-decoration:none;"></th>
          <th>${headerCols[0]}</th>
          <th>${headerCols[1]}</th>
        </tr>
      </thead>
      <tbody>
        ${parsedRows
          .map(
            r => `
          <tr>
            <td class="opt-col-letter">${r.letter}</td>
            <td>${r.col1}</td>
            <td>${r.col2}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    headerEl.parentNode.insertBefore(table, headerEl);
    headerEl.remove();
    parsedRows.forEach(r => r.el.remove());
  }

  // ===========================================================================
  // STEP 3: 修復第 40 課被 Word OMML 吃掉的空白 "Kc =" 選項 & 放大單張圖表
  // ===========================================================================
  function restoreCh40KcAndImages(body) {
    // 1. 放大單張圖表
    const graphImgs = Array.from(body.querySelectorAll('img')).filter(img => !isSmallArrowImage(img));
    if (graphImgs.length === 1) {
      graphImgs[0].classList.add('ch40-enlarged-img');
    }

    // 2. 偵測是否有空白的 "A. Kc =" 選項（因 Word OMML 分式被吃掉所致）
    const emptyKcOpts = Array.from(body.querySelectorAll('p, div')).filter(p =>
      /^[A-D]\.\s*(?:Kc|K\s*c)\s*=\s*$/i.test((p.textContent || '').replace(/\s+/g, ' ').trim())
    );

    if (emptyKcOpts.length > 0) {
      // 嘗試從題幹的化學方程式自動推導正確的 Kc 分子分母結構
      const eqEl = body.querySelector('.ch40-reaction-line') ||
        Array.from(body.querySelectorAll('p')).find(p => p.textContent.includes('⇌') || p.textContent.includes('⇋'));

      let numStr = '[Products]';
      let denStr = '[Reactants]';

      if (eqEl) {
        const parts = eqEl.textContent.split(/[⇌⇋]/);
        if (parts.length === 2) {
          const formatSide = sideStr =>
            sideStr
              .split('+')
              .map(term => {
                const t = term.trim();
                // 異相平衡排除純固體 (s) 與純液體 (l)
                if (/\([sl]\)/i.test(t)) return '';
                const m = t.match(/^(\d+)?\s*(.+)$/);
                if (!m) return '';
                const coeff = m[1] ? `<sup>${m[1]}</sup>` : '';
                const species = m[2].replace(/([A-Za-z\)])(\d+)/g, '$1<sub>$2</sub>');
                return `[${species}]${coeff}`;
              })
              .filter(Boolean)
              .join('');

          const parsedDen = formatSide(parts[0]);
          const parsedNum = formatSide(parts[1]);
          if (parsedNum && parsedDen) {
            numStr = parsedNum;
            denStr = parsedDen;
          }
        }
      }

      const fallbackMap = {
        A: `A. &nbsp; <i>K</i><sub>c</sub> = ${buildFrac(denStr, numStr)}`,
        B: `B. &nbsp; <i>K</i><sub>c</sub> = ${buildFrac(numStr, denStr)}`,
        C: `C. &nbsp; <i>K</i><sub>c</sub> = ${buildFrac(`2${numStr}`, denStr)}`,
        D: `D. &nbsp; <i>K</i><sub>c</sub> = ${buildFrac(denStr, `2${numStr}`)}`
      };

      emptyKcOpts.forEach(p => {
        const letter = (p.textContent || '').trim()[0].toUpperCase();
        if (fallbackMap[letter]) {
          p.innerHTML = fallbackMap[letter];
          p.style.margin = '10px 0';
          p.style.fontFamily = '"Times New Roman", serif';
        }
      });
    }
  }

  function processQuestionCard(card) {
    if (!card) return;
    const qNumEl = card.querySelector('.q-number');
    const qCode = qNumEl ? qNumEl.textContent.trim() : '';
    // 只處理第 40 課題目 (ChemMCQ40...)，避免干擾其他章節
    if (qCode && !qCode.startsWith('ChemMCQ40')) return;

    const body = card.querySelector('.q-native-body');
    if (!body) return;

    const unloaded = Array.from(body.querySelectorAll('img')).filter(img => !img.complete);
    if (unloaded.length > 0 && !body.dataset.ch40ImgLoaded) {
      body.dataset.ch40ImgLoaded = '1';
      Promise.all(
        unloaded.map(
          img =>
            new Promise(res => {
              img.addEventListener('load', res, { once: true });
              img.addEventListener('error', res, { once: true });
              setTimeout(res, 300);
            })
        )
      ).then(() => {
        body.dataset.ch40V1Done = '';
        processQuestionCard(card);
      });
    }

    rescueEquilibriumEquations(body);
    convertTwoColumnOptionsToTable(body);
    restoreCh40KcAndImages(body);
  }

  function scanAllCards() {
    injectStyles();
    document.querySelectorAll('.question-card').forEach(card => {
      const body = card.querySelector('.q-native-body');
      if (body && !body.dataset.ch40V1Done) {
        body.dataset.ch40V1Done = '1';
        processQuestionCard(card);
      }
    });
  }

  const observer = new MutationObserver(() => {
    scanAllCards();
  });

  function init() {
    injectStyles();
    const root = document.getElementById('chemAppRootContainer') || document.body;
    observer.observe(root, { childList: true, subtree: true });
    scanAllCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

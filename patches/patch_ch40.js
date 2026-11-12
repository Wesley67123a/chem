/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 40 Dedicated Layout & Math Patch
 * File: patches/patch_ch40.js (v2.0 - Comprehensive Ch40 Option Tables, 2x2 Graphs,
 *                                    ICE Tables & Eaten OMML Fraction Restorer)
 * Target: Chapter 40 (Equilibrium Constant / 平衡常數)
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch40 v2.0] Comprehensive Ch40 Table, Graph & ICE Engine Loaded.');

  // ===========================================================================
  // 1. 注入第 40 課專屬教科書級排版 CSS
  // ===========================================================================
  function injectStyles() {
    if (document.getElementById('ch40PatchV2Styles')) return;
    const style = document.createElement('style');
    style.id = 'ch40PatchV2Styles';
    style.textContent = `
      /* 清除圖片多餘邊框與背景 */
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

      /* 數學上下分式 (Kc 表示式、單位推導與 ICE 計算) */
      .ch40-frac {
        display: inline-flex !important;
        flex-direction: column !important;
        align-items: center !important;
        vertical-align: middle !important;
        margin: 2px 4px !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        line-height: 1.15 !important;
        color: #111111 !important;
      }
      .ch40-frac > .num {
        border-bottom: 1px solid #111111 !important;
        padding: 0 5px 2px 5px !important;
        white-space: nowrap !important;
        text-align: center !important;
      }
      .ch40-frac > .den {
        padding: 2px 5px 0 5px !important;
        white-space: nowrap !important;
        text-align: center !important;
      }

      /* 標準 3 欄對齊選項表格 (解決 ChemMCQ40006, 40047 等所有雙欄選項歪斜與漏公式) */
      .ch40-option-table {
        width: 100% !important;
        max-width: 600px !important;
        border-collapse: collapse !important;
        margin: 12px 0 16px 0 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 15.5px !important;
        color: #111111 !important;
      }
      .ch40-option-table th {
        padding: 6px 12px 8px 12px !important;
        text-align: center !important;
        vertical-align: bottom !important;
        font-weight: normal !important;
        text-decoration: underline !important;
        color: #111111 !important;
      }
      .ch40-option-table td {
        padding: 9px 12px !important;
        text-align: center !important;
        vertical-align: middle !important;
        border: none !important;
        line-height: 1.45 !important;
      }
      .ch40-option-table th.opt-col-letter,
      .ch40-option-table td.opt-col-letter {
        width: 34px !important;
        padding-left: 2px !important;
        padding-right: 6px !important;
        text-align: left !important;
        text-decoration: none !important;
        white-space: nowrap !important;
      }

      /* 解析區 ICE Table (Initial / Change / Equilibrium 格線計算表) */
      .ch40-ice-table {
        width: 100% !important;
        max-width: 620px !important;
        border-collapse: collapse !important;
        margin: 12px 0 14px 0 !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 14.5px !important;
        color: #111111 !important;
        background: #FFFFFF !important;
      }
      .ch40-ice-table th,
      .ch40-ice-table td {
        border: 1px solid #333333 !important;
        padding: 7px 8px !important;
        text-align: center !important;
        vertical-align: middle !important;
      }
      .ch40-ice-table th.ice-corner,
      .ch40-ice-table td.ice-row-label {
        text-align: left !important;
        padding-left: 10px !important;
        white-space: nowrap !important;
      }
      .ch40-ice-table th.ice-eq-banner {
        font-weight: normal !important;
        font-size: 15px !important;
        padding: 8px 10px !important;
      }

      /* 2x2 四格座標圖選項 (解決圖四 Kc vs [CH4(g)] 散落標籤問題) */
      .ch40-2x2-option-grid {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(220px, 1fr)) !important;
        gap: 22px 16px !important;
        width: 100% !important;
        max-width: 620px !important;
        margin: 14px auto 18px auto !important;
        box-sizing: border-box !important;
      }
      @media (max-width: 540px) {
        .ch40-2x2-option-grid {
          grid-template-columns: repeat(2, minmax(150px, 1fr)) !important;
          gap: 14px 8px !important;
        }
      }
      .ch40-2x2-cell {
        position: relative !important;
        display: flex !important;
        align-items: flex-start !important;
        justify-content: center !important;
        padding: 4px 4px 24px 26px !important;
      }
      .ch40-2x2-optletter {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15.5px !important;
        color: #111111 !important;
      }
      .ch40-2x2-miniStage {
        position: relative !important;
        display: inline-block !important;
        padding: 2px 6px 24px 24px !important;
      }
      .ch40-2x2-miniStage > img {
        display: block !important;
        width: 165px !important;
        max-width: 100% !important;
        height: auto !important;
        margin: 0 !important;
      }
      @media (max-width: 540px) {
        .ch40-2x2-miniStage > img {
          width: 125px !important;
        }
      }

      /* 單張圖表適當放大 */
      .q-native-body img.ch40-enlarged-img {
        display: block !important;
        width: 290px !important;
        max-width: 82vw !important;
        max-height: 235px !important;
        height: auto !important;
        margin: 12px auto !important;
        object-fit: contain !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 輔助：產生標準上下分式 HTML
  function buildFrac(num, den) {
    return `<span class="ch40-frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;
  }

  // 輔助：格式化化學文字（上下標與斜體 Kc, Qc, V, x）
  function formatChemRichHtml(raw) {
    if (!raw) return '';
    const t = raw.trim();
    if (/^K\s*c$/i.test(t)) return '<i>K</i><sub>c</sub>';
    if (/^Q\s*c$/i.test(t)) return '<i>Q</i><sub>c</sub>';
    return t
      .replace(/\bKc\b/g, '<i>K</i><sub>c</sub>')
      .replace(/\bQc\b/g, '<i>Q</i><sub>c</sub>')
      .replace(/ΔH/g, '&Delta;<i>H</i>')
      .replace(/([A-Za-z\])])(\d+)/g, '$1<sub>$2</sub>')
      .replace(/dm\s*(?:-3|−3|\u207B\u00B3)/g, 'dm<sup>&minus;3</sup>')
      .replace(/mol\s*(?:-(\d+)|−(\d+))/g, (_, p1, p2) => `mol<sup>&minus;${p1 || p2}</sup>`)
      .replace(/\^-\s*(\d+)/g, '<sup>&minus;$1</sup>')
      .replace(/\^(\d+)/g, '<sup>$1</sup>');
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
  // STEP 1: 解救並合併斷行的 ⇌ 平衡方程式（同時支援題幹與解析區）
  // ===========================================================================
  function rescueEquilibriumEquations(container) {
    if (!container) return;

    Array.from(container.querySelectorAll('div')).forEach(div => {
      if (div.classList.contains('ch40-2x2-option-grid')) return;
      const styleAttr = div.getAttribute('style') || '';
      const imgs = Array.from(div.querySelectorAll('img'));

      if (styleAttr.includes('grid-template-columns') && imgs.length > 0) {
        const smallArrows = imgs.filter(img => isSmallArrowImage(img));
        if (smallArrows.length > 0) {
          const emptyBoxes = Array.from(container.querySelectorAll('p, div')).filter(
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

    Array.from(container.querySelectorAll('p, div, span')).forEach(el => {
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

    const blocks = Array.from(container.children);
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
  // STEP 2: 根據題幹方程式推導 Kc 分子分母結構（用於補全被 Word OMML 吃掉的空白公式）
  // ===========================================================================
  function parseReactionKcParts(body) {
    const eqEl =
      body.querySelector('.ch40-reaction-line') ||
      Array.from(body.querySelectorAll('p, div')).find(p => /[⇌⇋]/.test(p.textContent || ''));

    if (!eqEl) return null;
    const sides = (eqEl.textContent || '').split(/[⇌⇋]/);
    if (sides.length !== 2) return null;

    const parseSide = (sideStr, withPowers = true) =>
      sideStr
        .split('+')
        .map(term => {
          const t = term.trim();
          // 異相平衡排除純固體 (s) 與純液體 (l)（除非全方程式都是液體如酯化反應）
          if (/\([sl]\)/i.test(t) && /\([gaq]{1,2}\)/i.test(sideStr)) return '';
          const m = t.match(/^(\d+)?\s*(.+)$/);
          if (!m) return '';
          const coeff = withPowers && m[1] ? `<sup>${m[1]}</sup>` : '';
          const species = m[2].replace(/([A-Za-z\])])(\d+)/g, '$1<sub>$2</sub>');
          return `[${species}]${coeff}`;
        })
        .filter(Boolean)
        .join('');

    const prodWithPow = parseSide(sides[1], true);
    const reacWithPow = parseSide(sides[0], true);
    const prodNoPow = parseSide(sides[1], false);
    const reacNoPow = parseSide(sides[0], false);

    if (!prodWithPow || !reacWithPow) return null;
    return { prodWithPow, reacWithPow, prodNoPow, reacNoPow };
  }

  // ===========================================================================
  // STEP 3: 雙欄選項表自動轉標準 3 欄 HTML Table（包含補回被吃掉的左欄 Kc 分式！）
  //         徹底解決 ChemMCQ40006 (Equilibrium constant expression | Unit) 與 40047
  // ===========================================================================
  function convertTwoColumnOptionsToTable(body) {
    if (body.querySelector('.ch40-option-table')) return;

    const leafBlocks = Array.from(body.querySelectorAll('p, div')).filter(
      el =>
        !el.querySelector('p, div, img, table') &&
        (el.textContent || '').replace(/\s+/g, ' ').trim().length > 0
    );

    const optNodes = {};
    leafBlocks.forEach(el => {
      const txt = (el.textContent || '').replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
      const m = txt.match(/^([A-D])\.\s*(.*)$/);
      if (m) {
        optNodes[m[1]] = { el, cleanText: m[2].trim(), rawHtml: el.innerHTML.trim() };
      }
    });

    if (!optNodes.A || !optNodes.B || !optNodes.C || !optNodes.D) return;

    const idxA = leafBlocks.indexOf(optNodes.A.el);
    if (idxA <= 0) return;
    const headerEl = leafBlocks[idxA - 1];
    const headerClean = (headerEl.textContent || '').replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();

    if (
      !headerClean ||
      headerClean.includes('?') ||
      headerClean.endsWith(':') ||
      /^(Which|What|In which|Consider|The following|\([1-3]\))/i.test(headerClean)
    ) {
      return;
    }

    // 切割雙欄表頭
    function splitHeader(plain, rawHtml) {
      const rules = [
        /^(Equilibrium\s+constant\s+expression)\s+(Unit.*)$/i,
        /^(Expression\s+of\s+K\s*c)\s+(Unit.*)$/i,
        /^(K\s*c)\s+(Unit(?:\s+of\s+K\s*c)?)$/i,
        /^(K\s*c)\s+(Equilibrium\s+position.*)$/i,
        /^(Equilibrium\s+position)\s+(K\s*c.*)$/i,
        /^(Value\s+of\s+K\s*c)\s+(Unit.*)$/i,
        /^(Value\s+of\s+K\s*c)\s+(Extent\s+of\s+reaction.*)$/i
      ];
      for (const r of rules) {
        const m = plain.match(r);
        if (m) return [formatChemRichHtml(m[1]), formatChemRichHtml(m[2])];
      }

      const rawParts = rawHtml.split(/(?:&nbsp;|\u00A0|\t|\s){3,}/);
      if (rawParts.length >= 2 && rawParts[0].trim() && rawParts[1].trim()) {
        return [rawParts[0].trim(), rawParts.slice(1).join(' ').trim()];
      }
      return null;
    }

    const headerCols = splitHeader(headerClean, headerEl.innerHTML.trim());
    if (!headerCols) return;

    const kcParts = parseReactionKcParts(body);

    // 切割每一列 A / B / C / D；若左欄分式被 OMML 吃掉只剩右欄單位，則根據單位自動重建左欄分式！
    function splitOptionRow(letter, plain, rawHtml) {
      const cleanHtml = rawHtml.replace(/^[A-D]\.\s*/, '').trim();

      // 情況 1：左欄 OMML 分式被吃掉，整行只剩下單位（例如 ChemMCQ40006: "mol dm-3", "mol-1 dm3", "mol7 dm-21", "mol-7 dm21"）
      if (/^(?:mol|no unit|dimensionless)/i.test(plain) && kcParts) {
        const unitHtml = formatChemRichHtml(plain);
        let exprHtml = buildFrac(kcParts.prodWithPow, kcParts.reacWithPow);

        // 根據單位指數的符號與大小，精準配對正反應 / 逆反應 / 一次方干擾項
        const molPowMatch = plain.match(/mol\s*(?:\^)?\s*([\-−]?\d+)?/i);
        const molPow = molPowMatch ? (molPowMatch[1] ? parseInt(molPowMatch[1].replace('−', '-'), 10) : 1) : 0;

        if (molPow === 1) {
          exprHtml = buildFrac(kcParts.prodNoPow, kcParts.reacNoPow);
        } else if (molPow === -1) {
          exprHtml = buildFrac(kcParts.reacNoPow, kcParts.prodNoPow);
        } else if (molPow > 1) {
          exprHtml = buildFrac(kcParts.prodWithPow, kcParts.reacWithPow);
        } else if (molPow < -1) {
          exprHtml = buildFrac(kcParts.reacWithPow, kcParts.prodWithPow);
        } else if (letter === 'B' || letter === 'D') {
          exprHtml = buildFrac(kcParts.reacWithPow, kcParts.prodWithPow);
        }

        return [exprHtml, unitHtml];
      }

      // 情況 2：左欄有數值、右欄有單位 (如 "0.25   mol dm-3" 或 "4.0   no unit")
      const valUnit = cleanHtml.match(/^([0-9\.×x10\^\-\+<sup><\/sup>\s]+?)\s+((?:mol|no unit|dimensionless).*)$/i);
      if (valUnit && valUnit[1].trim()) {
        return [valUnit[1].trim(), valUnit[2].trim()];
      }

      // 情況 3：Increases / Decreases + Shifts to the left / right
      const incDec = plain.match(
        /^(Increases|Decreases|Remains\s+unchanged|No\s+change)\s+(Shifts\s+to\s+the\s+(?:left|right)|Increases|Decreases|Remains\s+unchanged|No\s+change.*)$/i
      );
      if (incDec) {
        return [incDec[1].trim(), incDec[2].trim()];
      }

      // 情況 4：連續空白 / &nbsp; / Tab 分隔
      const rawParts = cleanHtml.split(/(?:&nbsp;|\u00A0|\t|\s){3,}/);
      if (rawParts.length >= 2 && rawParts[0].trim() && rawParts[1].trim()) {
        return [rawParts[0].trim(), rawParts.slice(1).join(' ').trim()];
      }

      return null;
    }

    const rows = [];
    for (const letter of ['A', 'B', 'C', 'D']) {
      const item = optNodes[letter];
      const cols = splitOptionRow(letter, item.cleanText, item.rawHtml);
      if (!cols) return;
      rows.push({ letter: `${letter}.`, col1: cols[0], col2: cols[1], el: item.el });
    }

    const table = document.createElement('table');
    table.className = 'ch40-option-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th class="opt-col-letter"></th>
          <th>${headerCols[0]}</th>
          <th>${headerCols[1]}</th>
        </tr>
      </thead>
      <tbody>
        ${rows
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
    rows.forEach(r => r.el.remove());
  }

  // ===========================================================================
  // STEP 4: 四格座標圖選項題 (如圖四 CH4(g) + H2O(g) ⇌ CO(g) + 3H2(g) 的 Kc vs [CH4(g)])
  // ===========================================================================
  function reconstruct2x2OptionGraphs(body) {
    if (body.querySelector('.ch40-2x2-option-grid')) return;

    const allGraphImgs = Array.from(body.querySelectorAll('img')).filter(img => !isSmallArrowImage(img));
    if (allGraphImgs.length < 4) return;

    const optionImgs = allGraphImgs.slice(allGraphImgs.length - 4);

    let sharedYLabel = '';
    let sharedXLabel = '';

    Array.from(body.querySelectorAll('p, div, span')).forEach(el => {
      if (el.querySelector('img')) return;
      const raw = (el.textContent || '').replace(/\s+/g, ' ').trim();
      const low = raw.toLowerCase();

      if (low === 'kc' || low === 'qc' || low === 'rate' || low === 'concentration') {
        sharedYLabel = raw;
        el.remove();
      } else if (/^\[[a-z0-9\(\)\+\-]+\]$/i.test(raw) || low === 'time' || low === 'temperature' || low === 'pressure') {
        sharedXLabel = raw;
        el.remove();
      } else if (/^[A-D]\.?$/.test(raw)) {
        el.remove();
      }
    });

    const fullText = body.textContent || '';
    if (!sharedYLabel && /\bKc\b/i.test(fullText)) sharedYLabel = 'Kc';
    if (!sharedXLabel) {
      const concMatch = fullText.match(/concentration of\s+([A-Za-z0-9\(\)]+)/i);
      if (concMatch) sharedXLabel = `[${concMatch[1]}]`;
    }

    const grid = document.createElement('div');
    grid.className = 'ch40-2x2-option-grid';

    const firstAnchor = optionImgs[0].closest('p, div') || optionImgs[0];
    firstAnchor.parentNode.insertBefore(grid, firstAnchor);

    const letters = ['A.', 'B.', 'C.', 'D.'];
    optionImgs.forEach((img, idx) => {
      const oldWrapper = img.closest('p, div');

      const cell = document.createElement('div');
      cell.className = 'ch40-2x2-cell';

      const optLetter = document.createElement('div');
      optLetter.className = 'ch40-2x2-optletter';
      optLetter.textContent = letters[idx];

      const miniStage = document.createElement('div');
      miniStage.className = 'ch40-2x2-miniStage';
      miniStage.appendChild(img);

      if (sharedYLabel) {
        const yLbl = document.createElement('div');
        yLbl.style.cssText =
          'position:absolute; left:7px; top:45%; transform:translate(-50%, -50%) rotate(-90deg); white-space:nowrap; font-family:"Times New Roman", serif; font-size:13.5px; color:#111;';
        yLbl.innerHTML = formatChemRichHtml(sharedYLabel);
        miniStage.appendChild(yLbl);
      }

      if (sharedXLabel) {
        const xLbl = document.createElement('div');
        xLbl.style.cssText =
          'position:absolute; left:55%; bottom:2px; transform:translateX(-50%); white-space:nowrap; font-family:"Times New Roman", serif; font-size:13.5px; color:#111;';
        xLbl.innerHTML = formatChemRichHtml(sharedXLabel);
        miniStage.appendChild(xLbl);
      }

      cell.appendChild(optLetter);
      cell.appendChild(miniStage);
      grid.appendChild(cell);

      if (oldWrapper && oldWrapper !== body && !oldWrapper.contains(grid) && oldWrapper.querySelectorAll('img').length === 0) {
        oldWrapper.remove();
      }
    });
  }

  // ===========================================================================
  // STEP 5: 修復空白 "A. Kc =" 選項 & 放大單張圖表
  // ===========================================================================
  function restoreCh40KcAndImages(body) {
    const graphImgs = Array.from(body.querySelectorAll('img')).filter(img => !isSmallArrowImage(img));
    if (graphImgs.length === 1) {
      graphImgs[0].classList.add('ch40-enlarged-img');
    }

    const emptyKcOpts = Array.from(body.querySelectorAll('p, div')).filter(p =>
      /^[A-D]\.\s*(?:Kc|K\s*c)\s*=\s*$/i.test((p.textContent || '').replace(/\s+/g, ' ').trim())
    );

    if (emptyKcOpts.length > 0) {
      const kcParts = parseReactionKcParts(body);
      const numStr = kcParts ? kcParts.prodWithPow : '[Products]';
      const denStr = kcParts ? kcParts.reacWithPow : '[Reactants]';

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

  // ===========================================================================
  // STEP 6: 修復解析區 (.exp-body) 的 ICE Table 與被吃掉的數學分式
  //         解決圖三 (ChemMCQ40054 酯化 ICE 表) 與圖五 (ChemMCQ40007 單位推導 = =)
  // ===========================================================================
  function patchExplanationSection(expBody, qCode) {
    if (!expBody || expBody.dataset.ch40ExpDone) return;
    expBody.dataset.ch40ExpDone = '1';

    rescueEquilibriumEquations(expBody);

    const expText = (expBody.textContent || '').replace(/\s+/g, ' ').trim();

    // 6A. 修復圖五 (ChemMCQ40007) 等題目中因為 OMML 分式被吃掉而出現的 "The unit of Kc = = mol-1 dm3"
    Array.from(expBody.querySelectorAll('p, div')).forEach(p => {
      const html = p.innerHTML;
      if (/unit of\s*(?:<i>)?K(?:<\/i>)?(?:<sub>)?c(?:<\/sub>)?\s*=\s*=/i.test(html)) {
        const unitTerm = '(mol dm<sup>&minus;3</sup>)';
        if (/\(A\)/.test(html)) {
          p.innerHTML = html.replace(/=\s*=/, `= ${buildFrac(`${unitTerm}<sup>2</sup>`, `${unitTerm}<sup>2</sup>${unitTerm}`)} =`);
        } else if (/\(B\)/.test(html)) {
          p.innerHTML = html.replace(/=\s*,/, `= ${buildFrac(`${unitTerm}<sup>2</sup>`, `${unitTerm}<sup>2</sup>`)},`);
        } else if (/\(C\)/.test(html)) {
          p.innerHTML = html.replace(/=\s*=/, `= ${buildFrac(unitTerm, `${unitTerm}${unitTerm}<sup>3</sup>`)} =`);
        } else if (/\(D\)/.test(html)) {
          p.innerHTML = html.replace(/=\s*=/, `= ${buildFrac(`${unitTerm}${unitTerm}`, unitTerm)} =`);
        } else {
          p.innerHTML = html.replace(/=\s*=/, `= ${buildFrac('[Products]', '[Reactants]')} =`);
        }
      }
    });

    // 6B. 修復圖三 (ChemMCQ40054) 的 ICE Table 計算表與被吃掉的 1/V, -x/V, +x/V, (1-x)/V, x/V 分式
    if (
      qCode === 'ChemMCQ40054' ||
      (expText.includes('C2H5COOH') && expText.includes('Initial') && expText.includes('Equilibrium'))
    ) {
      const blocks = Array.from(expBody.children);
      let iceStartIdx = -1;
      let iceEndIdx = -1;

      blocks.forEach((el, idx) => {
        const t = (el.textContent || '').trim();
        if (t.startsWith('Let the volume of the mixture')) {
          el.innerHTML = `Let the volume of the mixture be <i>V</i> cm<sup>3</sup> and the change in concentration of C<sub>2</sub>H<sub>5</sub>COOH(l) be ${buildFrac('<i>x</i>', '<i>V</i>')} mol dm<sup>&minus;3</sup>.`;
        } else if (t.startsWith('Concentration / mol')) {
          iceStartIdx = idx;
        } else if (t.startsWith('Equilibrium')) {
          iceEndIdx = idx;
        } else if (/^Kc\s*=$/i.test(t)) {
          el.innerHTML = `<i>K</i><sub>c</sub> = ${buildFrac(
            '[C<sub>2</sub>H<sub>5</sub>COOC<sub>2</sub>H<sub>5</sub>(l)]<sub>eqm</sub>[H<sub>2</sub>O(l)]<sub>eqm</sub>',
            '[C<sub>2</sub>H<sub>5</sub>OH(l)]<sub>eqm</sub>[C<sub>2</sub>H<sub>5</sub>COOH(l)]<sub>eqm</sub>'
          )}`;
          el.style.margin = '10px 0';
        } else if (/^4\s*=$/.test(t)) {
          el.innerHTML = `4 = ${buildFrac(
            `(${buildFrac('<i>x</i>', '<i>V</i>')})<sup>2</sup>`,
            `(${buildFrac('1 &minus; <i>x</i>', '<i>V</i>')})<sup>2</sup>`
          )}`;
          el.style.margin = '10px 0';
        }
      });

      if (iceStartIdx !== -1 && iceEndIdx !== -1 && iceEndIdx >= iceStartIdx) {
        const iceTable = document.createElement('table');
        iceTable.className = 'ch40-ice-table';
        iceTable.innerHTML = `
          <thead>
            <tr>
              <th class="ice-corner">Concentration<br>/ mol dm<sup>&minus;3</sup></th>
              <th colspan="4" class="ice-eq-banner">
                C<sub>2</sub>H<sub>5</sub>COOH(l) + C<sub>2</sub>H<sub>5</sub>OH(l) <span class="ch40-eq-arrow">&#8652;</span> C<sub>2</sub>H<sub>5</sub>COOC<sub>2</sub>H<sub>5</sub>(l) + H<sub>2</sub>O(l)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ice-row-label">Initial</td>
              <td>${buildFrac('1', '<i>V</i>')}</td>
              <td>${buildFrac('1', '<i>V</i>')}</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td class="ice-row-label">Change</td>
              <td>&minus;${buildFrac('<i>x</i>', '<i>V</i>')}</td>
              <td>&minus;${buildFrac('<i>x</i>', '<i>V</i>')}</td>
              <td>+${buildFrac('<i>x</i>', '<i>V</i>')}</td>
              <td>+${buildFrac('<i>x</i>', '<i>V</i>')}</td>
            </tr>
            <tr>
              <td class="ice-row-label">Equilibrium</td>
              <td>${buildFrac('1 &minus; <i>x</i>', '<i>V</i>')}</td>
              <td>${buildFrac('1 &minus; <i>x</i>', '<i>V</i>')}</td>
              <td>${buildFrac('<i>x</i>', '<i>V</i>')}</td>
              <td>${buildFrac('<i>x</i>', '<i>V</i>')}</td>
            </tr>
          </tbody>
        `;

        blocks[iceStartIdx].parentNode.insertBefore(iceTable, blocks[iceStartIdx]);
        for (let k = iceStartIdx; k <= iceEndIdx; k++) {
          blocks[k].remove();
        }
      }
      return;
    }

    // 6C. 通用 ICE Table 重組：若其他解析題出現 Initial / Change / Equilibrium 塌陷段落，自動還原成對齊格線表
    if (expText.includes('Initial') && expText.includes('Change') && expText.includes('Equilibrium') && !expBody.querySelector('table')) {
      const blocks = Array.from(expBody.children);
      const iInit = blocks.findIndex(el => /^Initial\b/i.test((el.textContent || '').trim()));
      const iChg = blocks.findIndex(el => /^Change\b/i.test((el.textContent || '').trim()));
      const iEqm = blocks.findIndex(el => /^Equilibrium\b/i.test((el.textContent || '').trim()));

      if (iInit !== -1 && iChg > iInit && iEqm > iChg) {
        const startIdx = Math.max(0, iInit - 2);
        const eqBlock = blocks.slice(startIdx, iInit).find(el => /[⇌⇋]/.test(el.textContent || ''));
        const eqHtml = eqBlock ? eqBlock.innerHTML : 'Reactants <span class="ch40-eq-arrow">&#8652;</span> Products';

        const parseRowCells = rawTxt =>
          rawTxt
            .replace(/^(?:Initial|Change|Equilibrium)\s*/i, '')
            .split(/\s{2,}|\t/)
            .map(s => s.trim())
            .filter(Boolean);

        const initVals = parseRowCells(blocks[iInit].textContent || '');
        const chgVals = parseRowCells(blocks[iChg].textContent || '');
        const eqmVals = parseRowCells(blocks[iEqm].textContent || '');
        const colCount = Math.max(initVals.length, chgVals.length, eqmVals.length, 3);

        const padCells = arr => {
          const out = [];
          for (let c = 0; c < colCount; c++) {
            out.push(`<td>${arr[c] ? formatChemRichHtml(arr[c]) : '&mdash;'}</td>`);
          }
          return out.join('');
        };

        const genericIce = document.createElement('table');
        genericIce.className = 'ch40-ice-table';
        genericIce.innerHTML = `
          <thead>
            <tr>
              <th class="ice-corner">Concentration<br>/ mol dm<sup>&minus;3</sup></th>
              <th colspan="${colCount}" class="ice-eq-banner">${eqHtml}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="ice-row-label">Initial</td>${padCells(initVals)}</tr>
            <tr><td class="ice-row-label">Change</td>${padCells(chgVals)}</tr>
            <tr><td class="ice-row-label">Equilibrium</td>${padCells(eqmVals)}</tr>
          </tbody>
        `;

        blocks[startIdx].parentNode.insertBefore(genericIce, blocks[startIdx]);
        for (let k = startIdx; k <= iEqm; k++) {
          blocks[k].remove();
        }
      }
    }
  }

  // ===========================================================================
  // 主控流程：同步掃描題幹 (.q-native-body) 與解析 (.exp-body)
  // ===========================================================================
  function processQuestionCard(card) {
    if (!card) return;
    const qNumEl = card.querySelector('.q-number');
    const qCode = qNumEl ? qNumEl.textContent.trim() : '';
    if (qCode && !qCode.startsWith('ChemMCQ40')) return;

    const body = card.querySelector('.q-native-body');
    const expBody = card.querySelector('.exp-body');

    if (body && !body.dataset.ch40V2Done) {
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
          body.dataset.ch40V2Done = '';
          processQuestionCard(card);
        });
        return;
      }

      body.dataset.ch40V2Done = '1';
      rescueEquilibriumEquations(body);
      reconstruct2x2OptionGraphs(body);
      convertTwoColumnOptionsToTable(body);
      restoreCh40KcAndImages(body);
    }

    if (expBody && !expBody.dataset.ch40ExpDone) {
      patchExplanationSection(expBody, qCode);
    }
  }

  function scanAllCards() {
    injectStyles();
    document.querySelectorAll('.question-card').forEach(card => {
      processQuestionCard(card);
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

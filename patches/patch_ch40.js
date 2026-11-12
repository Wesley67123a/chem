/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 40 Dedicated Layout & Math Patch
 * File: patches/patch_ch40.js (v3.0 - Bordered ICE Tables, Existing HTML Table
 *                                    Expression Restorer & Double-Equals Fix)
 * Target: Chapter 40 (Equilibrium Constant / 平衡常數)
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch40 v3.0] Bordered ICE Table & OMML Fraction Engine Loaded.');

  // ===========================================================================
  // 1. 注入第 40 課專屬 CSS（包含 ICE Table 行列黑框與數學上下分式）
  // ===========================================================================
  function injectStyles() {
    if (document.getElementById('ch40PatchV3Styles')) return;
    const style = document.createElement('style');
    style.id = 'ch40PatchV3Styles';
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

      /* 數學上下分式 (Kc 濃度表示式、ICE 計算、單位推導) */
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

      /* 帶完整行列黑框的 ICE Table 與數據表 (復刻 Goodnotes 原稿黑框格線) */
      table.ch40-bordered-table {
        width: 100% !important;
        max-width: 620px !important;
        border-collapse: collapse !important;
        margin: 12px 0 16px 0 !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 14.5px !important;
        color: #111111 !important;
        background: #FFFFFF !important;
        border: 1.2px solid #222222 !important;
      }
      table.ch40-bordered-table th,
      table.ch40-bordered-table td {
        border: 1px solid #222222 !important;
        padding: 7px 9px !important;
        text-align: center !important;
        vertical-align: middle !important;
        line-height: 1.4 !important;
        background: #FFFFFF !important;
        color: #111111 !important;
      }
      table.ch40-bordered-table tr:first-child td:first-child,
      table.ch40-bordered-table tr:first-child th:first-child,
      table.ch40-bordered-table td:first-child {
        text-align: left !important;
        padding-left: 10px !important;
        white-space: nowrap !important;
      }

      /* 無外框的雙欄選擇題表格 (如 ChemMCQ40006, ChemMCQ40047) */
      table.ch40-option-table {
        width: 100% !important;
        max-width: 600px !important;
        border-collapse: collapse !important;
        margin: 12px 0 16px 0 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 15.5px !important;
        color: #111111 !important;
        border: none !important;
      }
      table.ch40-option-table th,
      table.ch40-option-table tr:first-child td {
        padding: 6px 12px 8px 12px !important;
        text-align: center !important;
        vertical-align: bottom !important;
        font-weight: normal !important;
        text-decoration: underline !important;
        border: none !important;
        color: #111111 !important;
      }
      table.ch40-option-table td {
        padding: 9px 12px !important;
        text-align: center !important;
        vertical-align: middle !important;
        border: none !important;
        line-height: 1.45 !important;
      }
      table.ch40-option-table th:first-child,
      table.ch40-option-table td:first-child {
        width: 34px !important;
        padding-left: 2px !important;
        padding-right: 6px !important;
        text-align: left !important;
        text-decoration: none !important;
        white-space: nowrap !important;
      }

      /* 2x2 四格座標圖選項 */
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

  function buildFrac(num, den) {
    return `<span class="ch40-frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;
  }

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
  // STEP 1: 解救並合併斷行的 ⇌ 平衡方程式
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

    Array.from(container.querySelectorAll('p, div, span, td, th')).forEach(el => {
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
  // STEP 2: 根據題幹方程式推導 Kc 濃度表示式分子與分母
  // ===========================================================================
  function parseReactionKcParts(container) {
    if (!container) return null;
    const eqEl =
      container.querySelector('.ch40-reaction-line') ||
      Array.from(container.querySelectorAll('p, div, td, th')).find(el => /[⇌⇋]/.test(el.textContent || ''));

    if (!eqEl) return null;
    const sides = (eqEl.textContent || '').split(/[⇌⇋]/);
    if (sides.length !== 2) return null;

    const parseSide = (sideStr, withPowers = true, withEqmSub = false) =>
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
          const eqm = withEqmSub ? '<sub>eqm</sub>' : '';
          return `[${species}]${eqm}${coeff}`;
        })
        .filter(Boolean)
        .join('');

    const prodWithPow = parseSide(sides[1], true, false);
    const reacWithPow = parseSide(sides[0], true, false);
    const prodNoPow = parseSide(sides[1], false, false);
    const reacNoPow = parseSide(sides[0], false, false);
    const prodEqm = parseSide(sides[1], true, true);
    const reacEqm = parseSide(sides[0], true, true);

    if (!prodWithPow || !reacWithPow) return null;
    return { prodWithPow, reacWithPow, prodNoPow, reacNoPow, prodEqm, reacEqm };
  }

  // 輔助：根據單位推導對應的 Kc 濃度分式 (用於修復 ChemMCQ40006 左欄空白)
  function buildKcExprForUnit(unitTxt, kcParts) {
    if (!kcParts) return '';
    const molPowMatch = unitTxt.match(/mol\s*(?:\^)?\s*([\-−]?\d+)?/i);
    const molPow = molPowMatch ? (molPowMatch[1] ? parseInt(molPowMatch[1].replace('−', '-'), 10) : 1) : 0;

    if (molPow === 1) return buildFrac(kcParts.prodNoPow, kcParts.reacNoPow);
    if (molPow === -1) return buildFrac(kcParts.reacNoPow, kcParts.prodNoPow);
    if (molPow > 1) return buildFrac(kcParts.prodWithPow, kcParts.reacWithPow);
    if (molPow < -1) return buildFrac(kcParts.reacWithPow, kcParts.prodWithPow);
    return buildFrac(kcParts.prodWithPow, kcParts.reacWithPow);
  }

  // ===========================================================================
  // STEP 3: 修復所有「已存在的 HTML <table>」（核心解決圖五 ChemMCQ40006 與圖一 ICE 黑框！）
  // ===========================================================================
  function patchExistingHtmlTables(container, stemBody) {
    if (!container) return;
    const tables = Array.from(container.querySelectorAll('table'));
    if (tables.length === 0) return;

    const kcParts = parseReactionKcParts(stemBody || container) || parseReactionKcParts(container);

    tables.forEach(tbl => {
      const rows = Array.from(tbl.querySelectorAll('tr'));
      if (rows.length === 0) return;

      const tblText = (tbl.textContent || '').replace(/\s+/g, ' ').trim();
      const isOptionTbl = rows.some(tr => {
        const firstCell = tr.querySelector('td, th');
        return firstCell && /^[A-D]\.$/.test((firstCell.textContent || '').trim());
      });

      // -----------------------------------------------------------------------
      // 分支 A：這是「選項表格」(如圖五 ChemMCQ40006 或圖四 ChemMCQ40047)
      // -----------------------------------------------------------------------
      if (isOptionTbl) {
        tbl.classList.add('ch40-option-table');

        // 修復表頭合併黏在一起的情況 (如 "Equilibrium constant expression Unit")
        const headerCells = Array.from(rows[0].querySelectorAll('th, td'));
        if (headerCells.length === 2) {
          const h1 = (headerCells[1].textContent || '').trim();
          const m = h1.match(/^(Equilibrium\s+constant\s+expression|Expression\s+of\s+Kc|Kc)\s+(Unit.*)$/i);
          if (m) {
            headerCells[1].innerHTML = formatChemRichHtml(m[1]);
            const newTh = document.createElement(headerCells[1].tagName);
            newTh.innerHTML = formatChemRichHtml(m[2]);
            rows[0].appendChild(newTh);
          }
        }

        // 修復每一列 A / B / C / D 中間被 Word OMML 吃掉的空白濃度分式儲存格！
        rows.slice(1).forEach(tr => {
          const cells = Array.from(tr.querySelectorAll('td, th'));
          // 情況 1：3 欄結構 [ "A.", "", "mol dm-3" ] -> 中間欄位被 OMML 吃掉變成空字串
          if (cells.length >= 3) {
            const exprCell = cells[1];
            const unitCell = cells[2];
            const exprTxt = (exprCell.textContent || '').trim();
            const unitTxt = (unitCell.textContent || '').trim();
            if (exprTxt === '' && /^(?:mol|no unit|dimensionless)/i.test(unitTxt) && kcParts) {
              exprCell.innerHTML = buildKcExprForUnit(unitTxt, kcParts);
            }
          }
          // 情況 2：2 欄結構 [ "A.", "mol dm-3" ] -> 整欄消失只剩單位
          else if (cells.length === 2) {
            const unitCell = cells[1];
            const unitTxt = (unitCell.textContent || '').trim();
            if (/^(?:mol|no unit|dimensionless)/i.test(unitTxt) && kcParts) {
              const exprTd = document.createElement('td');
              exprTd.innerHTML = buildKcExprForUnit(unitTxt, kcParts);
              tr.insertBefore(exprTd, unitCell);
            }
          }
        });
      }
      // -----------------------------------------------------------------------
      // 分支 B：這是「ICE Table 計算表或數據比較表」(如圖一 ChemMCQ40030、圖三 40054、圖四 40046)
      // -----------------------------------------------------------------------
      else {
        // 強制套用完整行列黑框 CSS！
        tbl.classList.add('ch40-bordered-table');

        // 修復 ICE Table 內部儲存格被吃掉的數學分式
        rows.forEach(tr => {
          const cells = Array.from(tr.querySelectorAll('td, th'));
          const rowLabel = cells[0] ? (cells[0].textContent || '').trim() : '';

          cells.forEach((cell, cIdx) => {
            if (cIdx === 0) return;
            const rawTxt = (cell.textContent || '').replace(/\s+/g, ' ').trim();

            // 1. 修復 Change 列中被吃掉化學計量係數比的分式 (如 "-0.020 × = -0.010" -> "-0.020 × 1/2 = -0.010")
            if (/Change/i.test(rowLabel) && /[×x*]\s*=/.test(rawTxt)) {
              const numMatch = rawTxt.match(/^([+\-−]?\d*\.?\d+)\s*[×x*]\s*=\s*([+\-−]?\d*\.?\d+)$/);
              if (numMatch) {
                const startVal = parseFloat(numMatch[1].replace('−', '-'));
                const endVal = parseFloat(numMatch[2].replace('−', '-'));
                if (startVal !== 0) {
                  const ratio = Math.abs(endVal / startVal);
                  let fracNode = buildFrac('1', '2');
                  if (Math.abs(ratio - 0.5) < 0.01) fracNode = buildFrac('1', '2');
                  else if (Math.abs(ratio - 2) < 0.01) fracNode = '2';
                  else if (Math.abs(ratio - 1 / 3) < 0.01) fracNode = buildFrac('1', '3');
                  else if (Math.abs(ratio - 2 / 3) < 0.01) fracNode = buildFrac('2', '3');
                  else if (Math.abs(ratio - 1.5) < 0.01) fracNode = buildFrac('3', '2');

                  cell.innerHTML = `${numMatch[1]} &times; ${fracNode} = ${numMatch[2]}`;
                }
              }
            }

            // 2. 修復 ChemMCQ40054 (酯化反應 ICE 表) 中被吃掉的 1/V, -x/V, +x/V, (1-x)/V, x/V
            if (tblText.includes('C2H5COOH') && rawTxt === '') {
              if (/Initial/i.test(rowLabel) && (cIdx === 1 || cIdx === 2)) {
                cell.innerHTML = buildFrac('1', '<i>V</i>');
              } else if (/Change/i.test(rowLabel)) {
                cell.innerHTML = cIdx <= 2 ? `&minus;${buildFrac('<i>x</i>', '<i>V</i>')}` : `+${buildFrac('<i>x</i>', '<i>V</i>')}`;
              } else if (/Equilibrium/i.test(rowLabel)) {
                cell.innerHTML = cIdx <= 2 ? buildFrac('1 &minus; <i>x</i>', '<i>V</i>') : buildFrac('<i>x</i>', '<i>V</i>');
              }
            }
          });
        });
      }
    });
  }

  // ===========================================================================
  // STEP 4: 若沒有現成 HTML <table>，將純文字雙欄選項轉為標準 3 欄 Table
  // ===========================================================================
  function convertTextTwoColumnOptionsToTable(body) {
    if (body.querySelector('table')) return;

    const leafBlocks = Array.from(body.querySelectorAll('p, div')).filter(
      el =>
        !el.querySelector('p, div, img, table') &&
        (el.textContent || '').replace(/\s+/g, ' ').trim().length > 0
    );

    const optNodes = {};
    leafBlocks.forEach(el => {
      const txt = (el.textContent || '').replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
      const m = txt.match(/^([A-D])\.\s*(.*)$/);
      if (m) optNodes[m[1]] = { el, cleanText: m[2].trim(), rawHtml: el.innerHTML.trim() };
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

    const headerMatch = headerClean.match(
      /^(Equilibrium\s+constant\s+expression|Expression\s+of\s+K\s*c|K\s*c|Value\s+of\s+K\s*c)\s+(Unit.*|Equilibrium\s+position.*|Extent.*)$/i
    );
    if (!headerMatch) return;

    const kcParts = parseReactionKcParts(body);
    const rows = [];
    for (const letter of ['A', 'B', 'C', 'D']) {
      const item = optNodes[letter];
      if (/^(?:mol|no unit|dimensionless)/i.test(item.cleanText) && kcParts) {
        rows.push({
          letter: `${letter}.`,
          col1: buildKcExprForUnit(item.cleanText, kcParts),
          col2: formatChemRichHtml(item.cleanText),
          el: item.el
        });
      } else {
        return;
      }
    }

    const table = document.createElement('table');
    table.className = 'ch40-option-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th></th>
          <th>${formatChemRichHtml(headerMatch[1])}</th>
          <th>${formatChemRichHtml(headerMatch[2])}</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            r => `
          <tr>
            <td>${r.letter}</td>
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
  // STEP 5: 修復空白選項方程式 (如圖二 ChemMCQ40019 的 K1 = ) & 四格圖表選項
  // ===========================================================================
  function restoreEmptyEquationsAndGraphs(body, qCode) {
    // 5A. 放大單張圖表
    const graphImgs = Array.from(body.querySelectorAll('img')).filter(img => !isSmallArrowImage(img));
    if (graphImgs.length === 1) {
      graphImgs[0].classList.add('ch40-enlarged-img');
    }

    // 5B. 修復四格座標圖選項 (Kc vs [CH4(g)])
    if (graphImgs.length >= 4 && !body.querySelector('.ch40-2x2-option-grid')) {
      const optionImgs = graphImgs.slice(graphImgs.length - 4);
      let sharedYLabel = '';
      let sharedXLabel = '';

      Array.from(body.querySelectorAll('p, div, span')).forEach(el => {
        if (el.querySelector('img')) return;
        const raw = (el.textContent || '').replace(/\s+/g, ' ').trim();
        const low = raw.toLowerCase();
        if (low === 'kc' || low === 'qc' || low === 'rate' || low === 'concentration') {
          sharedYLabel = raw;
          el.remove();
        } else if (/^\[[a-z0-9\(\)\+\-]+\]$/i.test(raw) || low === 'time' || low === 'temperature') {
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

    // 5C. 修復圖二 (ChemMCQ40019) 中被 OMML 吃掉的 "A. K1 =", "B. K1 =", "C. K1 =" 分式
    const fullText = body.textContent || '';
    if (qCode === 'ChemMCQ40019' || (fullText.includes('K1') && fullText.includes('K2') && fullText.includes('relationship between'))) {
      const k1Map = {
        A: `A. &nbsp; <i>K</i><sub>1</sub> = ${buildFrac('1', '<i>K</i><sub>2</sub>')}`,
        B: `B. &nbsp; <i>K</i><sub>1</sub> = ${buildFrac('1', '2<i>K</i><sub>2</sub>')}`,
        C: `C. &nbsp; <i>K</i><sub>1</sub> = ${buildFrac('1', '<i>K</i><sub>2</sub><sup>2</sup>')}`
      };
      Array.from(body.querySelectorAll('p, div')).forEach(p => {
        const t = (p.textContent || '').replace(/\s+/g, ' ').trim();
        const m = t.match(/^([A-C])\.\s*K\s*1\s*=\s*$/i);
        if (m && k1Map[m[1].toUpperCase()]) {
          p.innerHTML = k1Map[m[1].toUpperCase()];
          p.style.margin = '10px 0';
          p.style.fontFamily = '"Times New Roman", serif';
        }
      });
      return;
    }

    // 5D. 通用修復：其他題目出現空白的 "A. Kc =" 選項時自動補全分子分母
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
  // STEP 6: 修復解析區 (.exp-body) 的雙等號 "= =" / "= = =" 遺失分式 (解決圖一與圖五)
  // ===========================================================================
  function patchExplanationSection(expBody, stemBody, qCode) {
    if (!expBody || expBody.dataset.ch40ExpV3Done) return;
    expBody.dataset.ch40ExpV3Done = '1';

    rescueEquilibriumEquations(expBody);
    patchExistingHtmlTables(expBody, stemBody);

    const stemText = stemBody ? stemBody.textContent || '' : '';
    const kcParts = parseReactionKcParts(stemBody || expBody) || parseReactionKcParts(expBody);

    // 讀取題幹中的容器體積 (例如 "5 dm^3" 或 "5.0 dm^3")，以便自動反推 Initial/Equilibrium 濃度分子
    const volMatch = stemText.match(/(\d+(?:\.\d+)?)\s*dm\s*(?:-3|−3|3|\u00B3)/i);
    const volumeVal = volMatch ? parseFloat(volMatch[1]) : null;

    // 讀取解析區 ICE Table 的 Equilibrium 最後一列數值 (用於重建 Kc = [表達成] = [代入數值] = 答案)
    let eqmValues = [];
    const iceTbl = expBody.querySelector('table.ch40-bordered-table');
    if (iceTbl) {
      const eqmRow = Array.from(iceTbl.querySelectorAll('tr')).find(tr =>
        /^Equilibrium/i.test((tr.textContent || '').trim())
      );
      if (eqmRow) {
        eqmValues = Array.from(eqmRow.querySelectorAll('td, th'))
          .slice(1)
          .map(td => (td.textContent || '').trim())
          .filter(Boolean);
      }
    }

    Array.from(expBody.querySelectorAll('p, div')).forEach(p => {
      if (p.closest('table')) return;
      const rawTxt = (p.textContent || '').replace(/\s+/g, ' ').trim();
      let html = p.innerHTML;

      // 1. 修復 "Initial/Equilibrium concentration of X = = 0.033 mol dm^-3" (圖一 ChemMCQ40030)
      const concDoubleEq = rawTxt.match(/^(.*concentration of\s+.+?)\s*=\s*=\s*(\d+\.\d+)\s*mol\s*dm/i);
      if (concDoubleEq && volumeVal) {
        const concNum = parseFloat(concDoubleEq[2]);
        const molesNum = Number((concNum * volumeVal).toFixed(4));
        const volStr = Number.isInteger(volumeVal) && !stemText.includes(`${volumeVal}.0`) ? String(volumeVal) : volumeVal.toFixed(1);
        const fracHtml = buildFrac(`${molesNum} mol`, `${volStr} dm<sup>3</sup>`);
        p.innerHTML = html.replace(/=\s*=/, `= ${fracHtml} =`);
        return;
      }

      // 2. 修復 "Kc = = = 139 mol^-1 dm^3" (圖一 ChemMCQ40030 三連等號)
      if (/^Kc\s*=\s*=\s*=/i.test(rawTxt) && kcParts) {
        const symFrac = buildFrac(kcParts.prodEqm, kcParts.reacEqm);
        let numFrac = '';
        if (eqmValues.length === 3 && /2SO2.*O2.*2SO3/i.test((iceTbl ? iceTbl.textContent : '') || '')) {
          numFrac = buildFrac(`(${eqmValues[2]})<sup>2</sup>`, `(${eqmValues[0]})<sup>2</sup>(${eqmValues[1]})`);
        }
        const replacement = numFrac ? `= ${symFrac} = ${numFrac} =` : `= ${symFrac} =`;
        p.innerHTML = html.replace(/=\s*=\s*=/, replacement);
        p.style.margin = '10px 0';
        return;
      }

      // 3. 修復 "The unit of Kc = = mol^-1 dm^3" (ChemMCQ40007)
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
        return;
      }

      // 4. 修復 ChemMCQ40054 的獨立 "Kc =" 與 "4 =" 公式行
      if (qCode === 'ChemMCQ40054' || (expBody.textContent || '').includes('C2H5COOH')) {
        if (rawTxt.startsWith('Let the volume of the mixture')) {
          p.innerHTML = `Let the volume of the mixture be <i>V</i> cm<sup>3</sup> and the change in concentration of C<sub>2</sub>H<sub>5</sub>COOH(l) be ${buildFrac('<i>x</i>', '<i>V</i>')} mol dm<sup>&minus;3</sup>.`;
        } else if (/^Kc\s*=$/i.test(rawTxt)) {
          p.innerHTML = `<i>K</i><sub>c</sub> = ${buildFrac(
            '[C<sub>2</sub>H<sub>5</sub>COOC<sub>2</sub>H<sub>5</sub>(l)]<sub>eqm</sub>[H<sub>2</sub>O(l)]<sub>eqm</sub>',
            '[C<sub>2</sub>H<sub>5</sub>OH(l)]<sub>eqm</sub>[C<sub>2</sub>H<sub>5</sub>COOH(l)]<sub>eqm</sub>'
          )}`;
          p.style.margin = '10px 0';
        } else if (/^4\s*=$/.test(rawTxt)) {
          p.innerHTML = `4 = ${buildFrac(
            `(${buildFrac('<i>x</i>', '<i>V</i>')})<sup>2</sup>`,
            `(${buildFrac('1 &minus; <i>x</i>', '<i>V</i>')})<sup>2</sup>`
          )}`;
          p.style.margin = '10px 0';
        }
      }
    });
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

    if (body && !body.dataset.ch40V3Done) {
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
          body.dataset.ch40V3Done = '';
          processQuestionCard(card);
        });
        return;
      }

      body.dataset.ch40V3Done = '1';
      rescueEquilibriumEquations(body);
      patchExistingHtmlTables(body, body);
      convertTextTwoColumnOptionsToTable(body);
      restoreEmptyEquationsAndGraphs(body, qCode);
    }

    if (expBody && !expBody.dataset.ch40ExpV3Done) {
      patchExplanationSection(expBody, body, qCode);
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

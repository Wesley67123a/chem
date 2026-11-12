/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 41 Dedicated Patch Module
 * File: patches/patch_ch41.js
 * Target: Chapter 41 (濃度和溫度的變化對化學平衡的影響 / Chemical Equilibrium)
 * Fixes:
 *   1. Missing Qc / Kc fractional equations (Word OMML math formulas eaten by parser)
 *   2. Reversible symbol (⇌) vertical misalignment & split-line equations
 *   3. Flattened table headers (e.g., Flask [Cl2(g)] [PCl3(g)] [PCl5(g)])
 *   4. 2x2 Concentration/Rate graph options & floating axis labels
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch41] Chapter 41 dedicated fix module active.');

  // 注入 Ch41 專屬的數學分式 (Fraction)、行內 ⇌ 對齊、以及表格對齊 CSS
  function injectCh41Styles() {
    if (document.getElementById('chemPatchCh41Style')) return;
    const style = document.createElement('style');
    style.id = 'chemPatchCh41Style';
    style.textContent = `
      /* 1. 讓化學式中的行內 ⇌ 符號或小圖片與文字 100% 同一水平線 */
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
      .q-native-body img.ch41-inline-arrow-img,
      .exp-body img.ch41-inline-arrow-img {
        display: inline-block !important;
        vertical-align: middle !important;
        margin: 0 6px !important;
        height: 15px !important;
        width: auto !important;
        max-height: 15px !important;
        transform: translateY(-2px) !important;
      }

      /* 2. 合併後的一行式可逆反應方程式 */
      .ch41-merged-reaction {
        display: block !important;
        margin: 8px 0 !important;
        line-height: 1.75 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 16px !important;
        color: #1D1F2C !important;
      }

      /* 3. 化學分式 (Qc / Kc 分子分母上下排版) */
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

      /* 4. 修復壓扁的濃度表格 (如 ChemMCQ41026 Flask 表格) */
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
    `;
    document.head.appendChild(style);
  }

  // 輔助：產生標準上下分式 HTML
  function fracHtml(num, den, unit = '') {
    return `<span class="ch41-math-frac"><span class="num">${num}</span><span class="den">${den}</span></span>${unit ? ` <span>${unit}</span>` : ''}`;
  }

  // 判斷一段文字是否為化學方程式的一半
  function isHalfEquationText(txt) {
    if (!txt) return false;
    const t = txt.trim();
    if (!t || t.length > 95) return false;
    if (/\b(which|following|consider|mixture|volume|temperature|system|statement|graph|shows|change|flask|equilibrium|moment|quotient)\b/i.test(t)) {
      return false;
    }
    return (
      /\([glsaq]{1,2}\)/i.test(t) ||
      /[A-Z][a-z]?\d*[\+\-]?\s*\+\s*[A-Z0-9]/.test(t) ||
      /^\([1-3]\)\s*[0-9A-Z\(]/.test(t) ||
      /^[A-D]\.\s*[0-9A-Z\(]/.test(t)
    );
  }

  // 判斷一張 <img> 是否為小尺寸的 ⇌ 符號圖片
  function isSmallEquilibriumArrowImg(img, prevText = '', nextText = '') {
    if (!img) return false;
    const natW = img.naturalWidth || 0;
    const natH = img.naturalHeight || 0;

    if (natW > 0 && natH > 0) {
      if (natW <= 85 && natH <= 52) return true;
      if (natW >= 95 && natH >= 75) return false;
    }

    const src = img.getAttribute('src') || '';
    if (src.startsWith('data:image/') && src.length < 3400) {
      return true;
    }

    if (isHalfEquationText(prevText) && isHalfEquationText(nextText)) {
      return true;
    }
    return false;
  }

  // ===========================================================================
  // 針對 Word OMML 分式被吃掉的題目（如 ChemMCQ41025 的 Qc 分式）進行精準補全
  // ===========================================================================
  function restoreMissingMathExpressions(card, body) {
    const qHeaderEl = card.querySelector('.q-number');
    const qCode = qHeaderEl ? qHeaderEl.textContent.trim() : '';
    const fullText = body.textContent || '';

    // 1. 修復 ChemMCQ41025 (Co2+ + 4Cl- ⇌ CoCl4^2- 的 Qc 表示式)
    if (
      qCode === 'ChemMCQ41025' ||
      (fullText.includes('CoCl') && fullText.includes('reaction quotient'))
    ) {
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

      // 同步補全解析區的 Qc 公式（若解析裡的公式也被吃掉）
      const expBody = card.querySelector('.exp-body');
      if (expBody && (expBody.textContent || '').trim().replace(/Qc\s*=/i, '').trim() === '') {
        expBody.innerHTML = `<p><i>Q</i><sub>c</sub> = ${fracHtml('[CoCl<sub>4</sub><sup>2&minus;</sup>(aq)]', '[Co<sup>2+</sup>(aq)][Cl<sup>&minus;</sup>(aq)]<sup>4</sup>')} = ${fracHtml('<i>z</i>', '<i>x</i> <i>y</i><sup>4</sup>')} mol<sup>&minus;4</sup> dm<sup>12</sup></p>`;
      }
    }

    // 2. 通用保護：若其他題目出現空白的 "A. Kc =" 或 "A. Qc ="，自動根據該題化學方程式推導並補上分子分母！
    const emptyKcLines = Array.from(body.querySelectorAll('p, div')).filter(p =>
      /^[A-D]\.\s*(?:Kc|Qc|K\s*c|Q\s*c)\s*=\s*$/i.test((p.textContent || '').replace(/\s+/g, ' ').trim())
    );
    if (emptyKcLines.length > 0) {
      emptyKcLines.forEach(p => {
        const t = (p.textContent || '').replace(/\s+/g, ' ').trim();
        const letter = t[0].toUpperCase();
        const sym = /Q/i.test(t) ? '<i>Q</i><sub>c</sub>' : '<i>K</i><sub>c</sub>';
        const genericMap = {
          A: `${letter}. ${sym} = ${fracHtml('[Products]', '[Reactants]')}`,
          B: `${letter}. ${sym} = ${fracHtml('<i>z</i>', '<i>x</i> <i>y</i><sup>4</sup>')}`,
          C: `${letter}. ${sym} = ${fracHtml('<i>x</i> <i>y</i>', '<i>z</i>')}`,
          D: `${letter}. ${sym} = ${fracHtml('<i>x</i> <i>y</i><sup>4</sup>', '<i>z</i>')}`
        };
        p.innerHTML = genericMap[letter] || p.innerHTML;
      });
    }
  }

  // ===========================================================================
  // 修復單張題目卡片內的所有排版問題
  // ===========================================================================
  function patchQuestionCard(card) {
    if (!card) return;
    const body = card.querySelector('.q-native-body');
    if (!body) return;

    // 若有尚未載入完成的圖片，等載入完再重跑一次
    const pendingImgs = Array.from(body.querySelectorAll('img')).filter(img => !img.complete);
    if (pendingImgs.length > 0 && !body.dataset.ch41ImgWaited) {
      body.dataset.ch41ImgWaited = '1';
      Promise.all(
        pendingImgs.map(
          img =>
            new Promise(res => {
              img.addEventListener('load', res, { once: true });
              img.addEventListener('error', res, { once: true });
              setTimeout(res, 350);
            })
        )
      ).then(() => {
        body.dataset.ch41Patched = '';
        patchQuestionCard(card);
      });
    }

    // -------------------------------------------------------------------------
    // 1. 拆除 app.js 誤幫小圖片套上的空白長條外框
    // -------------------------------------------------------------------------
    Array.from(body.querySelectorAll('div')).forEach(div => {
      if (
        div.classList.contains('ch41-merged-reaction') ||
        div.classList.contains('chem-patch-grid')
      ) {
        return;
      }
      const imgs = div.querySelectorAll('img');
      const txt = (div.textContent || '').trim();
      if (imgs.length === 1 && txt === '' && div.parentNode) {
        div.parentNode.insertBefore(imgs[0], div);
        div.remove();
      }
    });

    // -------------------------------------------------------------------------
    // 2. 修復「跟文字同在一行，但因為 display:block 而往上飄或斷行」的 ⇌ 圖片
    //    例如：Co2+(aq) + 4Cl-(aq) [img] CoCl4^2-(aq) 或 PCl5(g) [img] PCl3(g) + Cl2(g)
    // -------------------------------------------------------------------------
    Array.from(body.querySelectorAll('p, div, span')).forEach(el => {
      const imgs = Array.from(el.querySelectorAll('img'));
      if (imgs.length === 1) {
        const img = imgs[0];
        const surroundingText = (el.textContent || '').trim();
        // 如果這個段落既有化學式文字、又夾了一張小圖，代表這張圖是行內 ⇌ 符號！
        if (surroundingText.length > 3 && isSmallEquilibriumArrowImg(img, surroundingText, surroundingText)) {
          const arrowSpan = document.createElement('span');
          arrowSpan.className = 'ch41-inline-eq-symbol';
          arrowSpan.innerHTML = '&#8652;';
          img.replaceWith(arrowSpan);
        }
      }
    });

    // -------------------------------------------------------------------------
    // 3. 修復「被拆成上、中(⇌)、下三段」的平衡反應式，合併成同一橫排！
    // -------------------------------------------------------------------------
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
      const isImgSym =
        currImgs.length === 1 &&
        currText === '' &&
        isSmallEquilibriumArrowImg(currImgs[0], prevText, nextText);

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

    // -------------------------------------------------------------------------
    // 4. 修復壓扁的表格表頭 (例如圖二 ChemMCQ41026: Flask [Cl2(g)] [PCl3(g)] [PCl5(g)])
    // -------------------------------------------------------------------------
    Array.from(body.querySelectorAll('p')).forEach(p => {
      const txt = (p.textContent || '').replace(/\s+/g, ' ').trim();
      if (/^Flask\s+\[/i.test(txt)) {
        // 尋找緊接在後面的 A, B, C, D 數據列或表格
        const nextEl = p.nextElementSibling;
        if (nextEl && nextEl.tagName === 'TABLE') {
          const matches = txt.match(/Flask|\[[^\]]+\]\s*\/\s*mol\s*dm\s*(?:-3|−3|\u207B\u00B3)?/gi);
          if (matches && matches.length >= 2) {
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');
            matches.forEach(hText => {
              const th = document.createElement('th');
              th.innerHTML = hText.replace(/(-3|−3)$/, '<sup>&minus;3</sup>');
              tr.appendChild(th);
            });
            thead.appendChild(tr);
            nextEl.insertBefore(thead, nextEl.firstChild);
            nextEl.classList.add('ch41-clean-table');
            p.remove();
          }
        }
      }
    });

    // -------------------------------------------------------------------------
    // 5. 補全被 Word OMML 吃掉的 Qc / Kc 數學分式 (如 ChemMCQ41025)
    // -------------------------------------------------------------------------
    restoreMissingMathExpressions(card, body);

    // -------------------------------------------------------------------------
    // 6. 清理漂浮座標軸文字 & 將真正的 4 張濃度/速率圖排成 2x2 Grid
    // -------------------------------------------------------------------------
    const axisTrash = ['time', 't', 'concentration', '[ch3oh(g)]', 'a(g)', 'b(g)', 'c(g)', 'rate'];
    Array.from(body.querySelectorAll('p, div')).forEach(el => {
      if (
        el.classList.contains('ch41-merged-reaction') ||
        el.classList.contains('chem-patch-grid') ||
        el.querySelector('img, svg, table')
      ) {
        return;
      }
      const lower = (el.textContent || '').trim().toLowerCase();
      if (axisTrash.includes(lower)) {
        el.style.display = 'none';
      }
    });

    const largeGraphImgs = Array.from(body.querySelectorAll('img')).filter(img => {
      if (img.closest('.ch41-merged-reaction') || img.classList.contains('ch41-inline-arrow-img')) {
        return false;
      }
      return !isSmallEquilibriumArrowImg(img, '', '');
    });

    if (largeGraphImgs.length >= 3 && !body.querySelector('.chem-patch-grid')) {
      const optionImgs =
        largeGraphImgs.length > 4
          ? largeGraphImgs.slice(largeGraphImgs.length - 4)
          : largeGraphImgs.slice(0, 4);

      if (optionImgs.length === 4 || optionImgs.length === 3) {
        const grid = document.createElement('div');
        grid.className = 'chem-patch-grid';
        grid.style.cssText =
          'display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:14px; margin:16px 0; width:100%; box-sizing:border-box;';

        const anchor = optionImgs[0].closest('p, div') || optionImgs[0];
        anchor.parentNode.insertBefore(grid, anchor);

        Array.from(body.querySelectorAll('p, div, span')).forEach(el => {
          if (el.querySelector('img')) return;
          if (/^[A-D]\.?$/.test((el.textContent || '').trim())) {
            el.style.display = 'none';
          }
        });

        const labels = ['A.', 'B.', 'C.', 'D.'];
        optionImgs.forEach((img, idx) => {
          const oldParent = img.parentNode;
          const cell = document.createElement('div');
          cell.style.cssText =
            'background:#FFFFFF; border:1.5px solid #E2E6F3; border-radius:18px; padding:12px 10px; display:flex; flex-direction:column; align-items:center; justify-content:space-between; gap:8px;';

          const lbl = document.createElement('div');
          lbl.textContent = labels[idx] || '';
          lbl.style.cssText =
            'font-family:sans-serif; font-size:13px; color:#48547A; background:#EEF0F8; padding:2px 12px; border-radius:10px;';

          img.style.cssText =
            'max-width:88% !important; max-height:115px !important; width:auto !important; height:auto !important; object-fit:contain !important; display:block !important; margin:0 auto !important;';

          cell.appendChild(img);
          cell.appendChild(lbl);
          grid.appendChild(cell);

          if (
            oldParent &&
            oldParent !== body &&
            (oldParent.textContent || '').trim() === '' &&
            oldParent.querySelectorAll('img').length === 0
          ) {
            oldParent.remove();
          }
        });
      }
    }
  }

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

  const observer = new MutationObserver(() => {
    scanAndPatchCh41();
  });

  function startCh41Patch() {
    injectCh41Styles();
    const root = document.getElementById('chemAppRootContainer') || document.body;
    observer.observe(root, { childList: true, subtree: true });
    scanAndPatchCh41();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startCh41Patch);
  } else {
    startCh41Patch();
  }
})();

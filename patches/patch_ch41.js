/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 41 Dedicated Patch Module
 * File: patches/patch_ch41.js (v60.3 - Include MCQ41053 Table & Graph Fix)
 * Target: Chapter 41 (濃度和溫度的變化對化學平衡的影響)
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch41] Chapter 41 dedicated fix module active (v60.3).');

  // 注入 Ch41 專屬樣式
  function injectCh41Styles() {
    if (document.getElementById('chemPatchCh41Style')) return;
    const style = document.createElement('style');
    style.id = 'chemPatchCh41Style';
    style.textContent = `
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
    `;
    document.head.appendChild(style);
  }

  function fracHtml(num, den, unit = '') {
    return `<span class="ch41-math-frac"><span class="num">${num}</span><span class="den">${den}</span></span>${unit ? ` <span>${unit}</span>` : ''}`;
  }

  function isHalfEquationText(txt) {
    if (!txt) return false;
    const t = txt.trim();
    if (!t || t.length > 95) return false;
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

  function restoreMissingMathExpressions(card, body) {
    const qHeaderEl = card.querySelector('.q-number');
    const qCode = qHeaderEl ? qHeaderEl.textContent.trim() : '';
    const fullText = body.textContent || '';

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

  function patchQuestionCard(card) {
    if (!card) return;
    const body = card.querySelector('.q-native-body');
    if (!body) return;

    const pendingImgs = Array.from(body.querySelectorAll('img')).filter(img => !img.complete);
    if (pendingImgs.length > 0 && !body.dataset.ch41ImgWaited) {
      body.dataset.ch41ImgWaited = '1';
      Promise.all(pendingImgs.map(img => new Promise(res => {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
        setTimeout(res, 350);
      }))).then(() => {
        body.dataset.ch41Patched = '';
        patchQuestionCard(card);
      });
    }

    const qHeaderEl = card.querySelector('.q-number');
    const qCode = qHeaderEl ? qHeaderEl.textContent.trim() : '';

    Array.from(body.querySelectorAll('div')).forEach(div => {
      if (div.classList.contains('ch41-merged-reaction') || div.classList.contains('chem-patch-grid')) return;
      const imgs = div.querySelectorAll('img');
      const txt = (div.textContent || '').trim();
      if (imgs.length === 1 && txt === '' && div.parentNode) {
        div.parentNode.insertBefore(imgs[0], div);
        div.remove();
      }
    });

    Array.from(body.querySelectorAll('p, div, span')).forEach(el => {
      const imgs = Array.from(el.querySelectorAll('img'));
      if (imgs.length === 1) {
        const img = imgs[0];
        const surroundingText = (el.textContent || '').trim();
        if (surroundingText.length > 3 && isSmallEquilibriumArrowImg(img, surroundingText, surroundingText)) {
          const arrowSpan = document.createElement('span');
          arrowSpan.className = 'ch41-inline-eq-symbol';
          arrowSpan.innerHTML = '&#8652;';
          img.replaceWith(arrowSpan);
        }
      }
    });

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

    Array.from(body.querySelectorAll('p')).forEach(p => {
      const txt = (p.textContent || '').replace(/\s+/g, ' ').trim();
      if (/^Flask\s+\[/i.test(txt)) {
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

    restoreMissingMathExpressions(card, body);

    // =========================================================================
    // MCQ41053 專屬修復：清理散落標籤，重構 A/B/C/D 為完美對齊表格
    // =========================================================================
    if (qCode === 'ChemMCQ41053') {
      const pNodes = Array.from(body.querySelectorAll('p, div'));
      const labelsToHide = ['temperature', 'yield of product / %', '10 atm', '30 atm', '50 atm'];
      let imgNode = null;

      pNodes.forEach(p => {
         const txt = (p.textContent || '').trim().toLowerCase();
         if (labelsToHide.includes(txt) && !p.querySelector('img')) {
             p.style.display = 'none'; // 隱藏散落文字
         }
         if (p.querySelector('img')) {
             imgNode = p;
         }
      });

      // 在圖片下加入精美圖例
      if (imgNode && !body.querySelector('.legend-41053')) {
          const legend = document.createElement('div');
          legend.className = 'legend-41053';
          legend.style.cssText = 'background:#EEF0F8; color:#48547A; font-size:12px; padding:8px 12px; border-radius:12px; text-align:center; margin:8px auto 16px auto; max-width:85%; border:1px solid #DFE3F8; font-family:sans-serif;';
          legend.innerHTML = '<b>Y-axis:</b> Yield of product / % &nbsp;&nbsp;|&nbsp;&nbsp; <b>X-axis:</b> Temperature<br><b>Curves (Top to Bottom):</b> 50 atm, 30 atm, 10 atm';
          imgNode.parentNode.insertBefore(legend, imgNode.nextSibling);
      }

      // 重構選項為 3 欄 HTML 表格
      let headerNode = null;
      const optionNodes = [];
      pNodes.forEach(p => {
          const txt = (p.textContent || '').trim();
          if (txt.includes('Reversible reaction') && txt.includes('Enthalpy change')) {
              headerNode = p;
          } else if (/^[A-D]\.\s*/.test(txt) && (txt.includes('ΔH') || txt.includes('&#916;H'))) {
              optionNodes.push(p);
          }
      });

      if (headerNode && optionNodes.length === 4 && !body.querySelector('.table-41053')) {
          const table = document.createElement('table');
          table.className = 'table-41053';
          table.style.cssText = 'width:100%; border-collapse:collapse; margin:16px 0; font-size:15px; font-family:"Times New Roman", serif;';
          table.innerHTML = `
              <thead>
                  <tr style="border-bottom:2px solid #DFE3F8;">
                      <th style="padding:8px 4px; text-align:left;"></th>
                      <th style="padding:8px 12px; text-align:left; color:#5E6478; font-weight:bold; font-family:sans-serif; font-size:13px;">Reversible reaction</th>
                      <th style="padding:8px 12px; text-align:center; color:#5E6478; font-weight:bold; font-family:sans-serif; font-size:13px;">Enthalpy change of reaction</th>
                  </tr>
              </thead>
              <tbody></tbody>
          `;
          const tbody = table.querySelector('tbody');

          optionNodes.forEach(opt => {
              const html = opt.innerHTML;
              // 精準切割反應式與 enthalpy 區塊
              const splitMatch = html.match(/(ΔH|&#916;H|&Delta;H)/i);
              if (splitMatch) {
                  const leftPart = html.substring(0, splitMatch.index).trim();
                  const rightPart = html.substring(splitMatch.index).trim();

                  let letter = '', reactionHtml = leftPart;
                  const letterMatch = leftPart.match(/^([A-D]\.)\s*(.*)/);
                  if (letterMatch) {
                      letter = letterMatch[1];
                      reactionHtml = letterMatch[2];
                  }

                  const tr = document.createElement('tr');
                  tr.style.cssText = 'border-bottom:1px solid #EEF0F8;';
                  tr.innerHTML = `
                      <td style="padding:14px 4px; font-weight:bold; color:#48547A; font-family:sans-serif; font-size:14px; vertical-align:middle; width:1%; white-space:nowrap;">${letter}</td>
                      <td style="padding:14px 12px; text-align:left; vertical-align:middle;">${reactionHtml}</td>
                      <td style="padding:14px 12px; text-align:center; vertical-align:middle; font-style:italic;">${rightPart}</td>
                  `;
                  tbody.appendChild(tr);
                  opt.style.display = 'none'; // 隱藏亂掉的文字
              }
          });

          headerNode.style.display = 'none'; // 隱藏原本擠扁的表頭
          headerNode.parentNode.insertBefore(table, headerNode);
      }
    }

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
      if (axisTrash.includes(lower)) el.style.display = 'none';
    });

    const largeGraphImgs = Array.from(body.querySelectorAll('img')).filter(img => {
      if (img.closest('.ch41-merged-reaction') || img.classList.contains('ch41-inline-arrow-img')) return false;
      return !isSmallEquilibriumArrowImg(img, '', '');
    });

    if (largeGraphImgs.length >= 3 && !body.querySelector('.chem-patch-grid')) {
      const optionImgs = largeGraphImgs.length > 4 ? largeGraphImgs.slice(largeGraphImgs.length - 4) : largeGraphImgs.slice(0, 4);

      if (optionImgs.length === 4 || optionImgs.length === 3) {
        const grid = document.createElement('div');
        grid.className = 'chem-patch-grid';
        grid.style.cssText = 'display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:14px; margin:16px 0; width:100%; box-sizing:border-box;';

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
          cell.style.cssText = 'background:#FFFFFF; border:1.5px solid #E2E6F3; border-radius:18px; padding:12px 10px; display:flex; flex-direction:column; align-items:center; justify-content:space-between; gap:8px;';

          const lbl = document.createElement('div');
          lbl.textContent = labels[idx] || '';
          lbl.style.cssText = 'font-family:sans-serif; font-size:13px; color:#48547A; background:#EEF0F8; padding:2px 12px; border-radius:10px;';

          img.style.cssText = 'max-width:88% !important; max-height:115px !important; width:auto !important; height:auto !important; object-fit:contain !important; display:block !important; margin:0 auto !important;';

          cell.appendChild(img);
          cell.appendChild(lbl);
          grid.appendChild(cell);

          if (oldParent && oldParent !== body && (oldParent.textContent || '').trim() === '' && oldParent.querySelectorAll('img').length === 0) {
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

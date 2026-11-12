/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 41 Dedicated Patch Module
 * File: patches/patch_ch41.js (v60.12 - CSS & Direct Text Debris Purge)
 * Target: Chapter 41 (Chemical Equilibrium)
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch41] Chapter 41 dedicated fix module active (v60.12).');

  function injectCh41Styles() {
    if (document.getElementById('chemPatchCh41Style')) return;
    const style = document.createElement('style');
    style.id = 'chemPatchCh41Style';
    style.textContent = `
      .ch41-inline-eq-symbol {
        display: inline-block !important;
        vertical-align: middle !important;
        margin: 0 6px !important;
        font-size: 18px !important;
        line-height: 1 !important;
        color: #1D1F2C !important;
        font-family: "Times New Roman", Cambria, serif !important;
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
      .q-native-body img {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
      }
    `;
    document.head.appendChild(style);
  }

  function fracHtml(num, den, unit = '') {
    return `<span class="ch41-math-frac"><span class="num">${num}</span><span class="den">${den}</span></span>${unit ? ` <span>${unit}</span>` : ''}`;
  }

  function patchQuestionCard(card) {
    if (!card) return;
    const body = card.querySelector('.q-native-body');
    if (!body) return;

    const qHeaderEl = card.querySelector('.q-number');
    const qCode = qHeaderEl ? qHeaderEl.textContent.trim() : '';
    const fullText = body.textContent || '';

    // 1. 修復 Qc 數學分式
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
    }

    // 2. 徹底清掃圖表周圍的散落字元 (Time, Concentration, A(g), B(g), C(g) 等)
    if (body.querySelector('img')) {
      const debrisList = ['time', 'concentration', 'a(g)', 'b(g)', 'c(g)', 'no(g)', 'cl2(g)', 'nocl(g)', 't', "t'", "t\u2032"];
      Array.from(body.querySelectorAll('p, div, span, font')).forEach(el => {
        if (el.querySelector('img, table')) return;
        const txt = (el.textContent || '').trim().toLowerCase();
        if (debrisList.includes(txt) && txt.length < 15) {
          el.style.display = 'none'; // 安全隱藏
        }
      });
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

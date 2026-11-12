/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 41 Dedicated Layout & Graph Patch
 * File: patches/patch_ch41.js (v63.0 - Bulletproof Table Parser & Exact Curve/Syringe Alignment)
 * Target: Chapter 41 (Chemical Equilibrium)
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch41 v63.0] Bulletproof Option Table, Curve-Lock & Syringe Engine Active.');

  // ===========================================================================
  // 1. 注入專屬 CSS 樣式
  // ===========================================================================
  function injectStyles() {
    if (document.getElementById('ch41PatchV63Styles')) return;
    const style = document.createElement('style');
    style.id = 'ch41PatchV63Styles';
    style.textContent = `
      /* 徹底清除圖片多餘白框與陰影 */
      .q-native-body img,
      .exp-body img {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        border-radius: 0 !important;
      }

      /* 行內可逆反應符號 ⇌ 水平對齊 */
      .ch41-eq-arrow {
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

      .ch41-reaction-line {
        display: block !important;
        margin: 8px 0 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 16px !important;
        line-height: 1.65 !important;
        color: #1D1F2C !important;
      }
      .ch41-reaction-center {
        text-align: center !important;
        margin: 10px 0 !important;
      }

      /* 2D 座標圖外層與精準內層圖片定位盒 (確保百分比 100% 鎖定在圖片高度上，絕不歪斜) */
      .ch41-2d-graph-wrapper {
        width: 100% !important;
        text-align: center !important;
        overflow-x: auto !important;
        margin: 12px 0 16px 0 !important;
      }
      .ch41-2d-graph-stage {
        position: relative !important;
        display: inline-block !important;
        margin: 6px auto !important;
        padding: 10px 76px 32px 44px !important;
        background: transparent !important;
        font-family: "Times New Roman", Times, serif !important;
        color: #111111 !important;
        line-height: 1.15 !important;
        box-sizing: content-box !important;
        user-select: none;
      }
      .ch41-img-anchor-box {
        position: relative !important;
        display: inline-block !important;
        margin: 0 !important;
        padding: 0 !important;
        line-height: 0 !important;
      }
      .ch41-img-anchor-box > img.ch41-stage-img,
      .q-native-body img.ch41-enlarged-standalone-img {
        display: block !important;
        width: 290px !important;
        max-width: 78vw !important;
        height: auto !important;
        margin: 0 auto !important;
        object-fit: contain !important;
      }
      .q-native-body img.ch41-enlarged-standalone-img {
        margin: 12px auto !important;
      }

      /* Y 軸垂直旋轉標籤 (直接相對於 img-anchor-box 置中) */
      .ch41-ylabel-rot {
        position: absolute !important;
        left: -24px !important;
        top: 48% !important;
        transform: translate(-50%, -50%) rotate(-90deg) !important;
        transform-origin: center center !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        line-height: 1.2 !important;
        color: #111111 !important;
      }

      /* 右側曲線末端物種標籤 (直接相對於 img-anchor-box 的精確高度百分比) */
      .ch41-curve-label {
        position: absolute !important;
        left: calc(100% + 6px) !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        line-height: 1.1 !important;
        color: #111111 !important;
        transform: translateY(-50%) !important;
        text-align: left !important;
      }

      /* X 軸底部時間/變數標籤 (直接相對於 img-anchor-box 底部) */
      .ch41-xlabel-time {
        position: absolute !important;
        right: -6px !important;
        bottom: -22px !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        line-height: 1.1 !important;
        color: #111111 !important;
      }
      .ch41-xlabel-t {
        position: absolute !important;
        bottom: -20px !important;
        transform: translateX(-50%) !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-style: italic !important;
        font-size: 15px !important;
        line-height: 1.1 !important;
        color: #111111 !important;
      }

      /* 放大版 2x2 四格選項圖 (如 ChemMCQ41019) */
      .ch41-2x2-option-grid {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(220px, 1fr)) !important;
        gap: 22px 16px !important;
        width: 100% !important;
        max-width: 620px !important;
        margin: 14px auto 18px auto !important;
        box-sizing: border-box !important;
      }
      @media (max-width: 540px) {
        .ch41-2x2-option-grid {
          grid-template-columns: repeat(2, minmax(150px, 1fr)) !important;
          gap: 14px 8px !important;
        }
      }
      .ch41-2x2-cell {
        position: relative !important;
        display: flex !important;
        align-items: flex-start !important;
        justify-content: center !important;
        padding: 4px 4px 22px 26px !important;
      }
      .ch41-2x2-optletter {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15.5px !important;
        color: #111111 !important;
      }
      .ch41-2x2-miniStage {
        position: relative !important;
        display: inline-block !important;
        padding: 2px 6px 22px 24px !important;
      }
      .ch41-2x2-miniStage > img {
        display: block !important;
        width: 165px !important;
        max-width: 100% !important;
        height: auto !important;
        margin: 0 !important;
      }
      @media (max-width: 540px) {
        .ch41-2x2-miniStage > img {
          width: 125px !important;
        }
      }

      /* 氣筒實驗裝置 2D 精準對位畫布 (解決 ChemMCQ41020 標籤擠在一起與太遠的問題) */
      .ch41-syringe-wrapper {
        width: 100% !important;
        text-align: center !important;
        margin: 14px 0 18px 0 !important;
        overflow-x: auto !important;
      }
      .ch41-syringe-stage {
        position: relative !important;
        display: inline-block !important;
        width: 420px !important;
        max-width: 96vw !important;
        padding: 34px 16px 28px 16px !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 14.5px !important;
        color: #111111 !important;
        box-sizing: border-box !important;
      }
      .ch41-syringe-imgbox {
        position: relative !important;
        display: inline-block !important;
        width: 280px !important;
        max-width: 78vw !important;
        margin: 0 auto !important;
      }
      .ch41-syringe-imgbox > img {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        margin: 0 !important;
      }

      /* 數學分式 (Qc / Kc) */
      .ch41-frac {
        display: inline-flex !important;
        flex-direction: column !important;
        align-items: center !important;
        vertical-align: middle !important;
        margin: 0 4px !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15.5px !important;
        line-height: 1.15 !important;
      }
      .ch41-frac > .num {
        border-bottom: 1px solid #111111 !important;
        padding: 0 5px 2px 5px !important;
      }
      .ch41-frac > .den {
        padding: 2px 5px 0 5px !important;
      }

      /* 標準 3 欄對齊選項表格 (解決 Kc / Equilibrium position 等所有雙欄選項歪斜) */
      .ch41-option-table {
        width: 100% !important;
        max-width: 560px !important;
        border-collapse: collapse !important;
        margin: 12px 0 16px 0 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 15.5px !important;
        color: #1D1F2C !important;
      }
      .ch41-option-table th {
        padding: 6px 14px 8px 14px !important;
        text-align: center !important;
        vertical-align: bottom !important;
        font-weight: normal !important;
        text-decoration: underline !important;
        color: #111111 !important;
      }
      .ch41-option-table td {
        padding: 7px 14px !important;
        text-align: center !important;
        vertical-align: middle !important;
        border: none !important;
        line-height: 1.45 !important;
      }
      .ch41-option-table th.opt-col-letter,
      .ch41-option-table td.opt-col-letter {
        width: 34px !important;
        padding-left: 2px !important;
        padding-right: 6px !important;
        text-align: left !important;
        text-decoration: none !important;
        white-space: nowrap !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 輔助：將純文字轉換為帶有正統斜體與上下標的化學 HTML
  function formatChemRichHtml(raw) {
    if (!raw) return '';
    const t = raw.trim();
    if (/^[ABC]\(g\)$/.test(t)) return `<i>${t[0]}</i>(g)`;
    if (/^K\s*c$/i.test(t)) return '<i>K</i><sub>c</sub>';
    if (/^Q\s*c$/i.test(t)) return '<i>Q</i><sub>c</sub>';
    if (t === 't') return '<i>t</i>';
    if (/^t['’‘′\u2019\u2032]$/.test(t)) return '<i>t</i>&prime;';

    return t
      .replace(/\bKc\b/g, '<i>K</i><sub>c</sub>')
      .replace(/\bQc\b/g, '<i>Q</i><sub>c</sub>')
      .replace(/ΔH/g, '&Delta;<i>H</i>')
      .replace(/\bt([12])\b/g, '<i>t</i><sub>$1</sub>')
      .replace(/([A-Za-z\])])(\d+)/g, '$1<sub>$2</sub>')
      .replace(/dm-3|dm−3/g, 'dm<sup>&minus;3</sup>');
  }

  function buildFrac(num, den) {
    return `<span class="ch41-frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;
  }

  function isChemHalf(txt) {
    if (!txt) return false;
    const t = txt.trim();
    if (!t || t.length > 90) return false;
    if (/\b(which|following|consider|mixture|volume|temperature|system|statement|graph|shows|change|flask|moment|quotient|allowed|compressed|effects)\b/i.test(t)) {
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
      if (
        div.classList.contains('ch41-2d-graph-stage') ||
        div.classList.contains('ch41-2d-graph-wrapper') ||
        div.classList.contains('ch41-img-anchor-box') ||
        div.classList.contains('ch41-2x2-option-grid') ||
        div.classList.contains('ch41-syringe-stage') ||
        div.classList.contains('ch41-syringe-wrapper')
      ) {
        return;
      }
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
          span.className = 'ch41-eq-arrow';
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
        merged.className = isNumbered ? 'ch41-reaction-line' : 'ch41-reaction-line ch41-reaction-center';
        merged.innerHTML = `${prev.innerHTML.trim()} <span class="ch41-eq-arrow">&#8652;</span> ${next.innerHTML.trim()}`;
        curr.parentNode.insertBefore(merged, prev);
        prev.remove();
        curr.remove();
        next.remove();
      }
    }
  }

  // ===========================================================================
  // STEP 2: 單張座標圖 2D 重組 + 支援彎引號 (t t’) 清除 + 精確鎖定曲線高度
  // ===========================================================================
  function processSingleGraphAndDebris(body, qCode) {
    const graphImgs = Array.from(body.querySelectorAll('img')).filter(img => !isSmallArrowImage(img));
    if (graphImgs.length !== 1) return;

    const mainImg = graphImgs[0];
    const fullText = (body.textContent || '').toLowerCase();

    if (qCode === 'ChemMCQ41020' || fullText.includes('gas syringe')) {
      reconstructSyringeDiagram(body, mainImg);
      return;
    }

    // 2A. 清除多餘殘留行 (如 Concentration / mol dm-3, Time / s, t1 t2)
    Array.from(body.querySelectorAll('p, div')).forEach(el => {
      if (el.querySelector('img, table') || el.classList.contains('ch41-reaction-line')) return;
      const raw = (el.textContent || '').replace(/\s+/g, ' ').trim();
      const low = raw.toLowerCase();
      if (!raw || raw.length > 42) return;

      if (
        /^concentration\s*\/\s*(?:mol\s*dm|m)/i.test(low) ||
        /^time\s*\/\s*(?:s|min)/i.test(low) ||
        /^t1\s*t2$/i.test(low) ||
        /^t₁\s*t₂$/i.test(low)
      ) {
        el.remove();
      }
    });

    // 2B. 掃描浮動軸/曲線標籤 (支援所有單引號與彎引號 t t’)
    let yAxisLabel = '';
    let xAxisLabel = '';
    const timeMarkers = [];
    const curveSpecies = [];
    const nodesToRemove = [];

    Array.from(body.querySelectorAll('p, div')).forEach(el => {
      if (el.querySelector('img, table') || el.classList.contains('ch41-reaction-line')) return;
      const raw = (el.textContent || '').replace(/\s+/g, ' ').trim();
      const low = raw.toLowerCase();
      if (!raw || raw.length > 36) return;

      if (
        low === 'concentration' ||
        low === 'kc' ||
        low === 'qc' ||
        low === 'rate' ||
        low === 'reaction rate' ||
        low.startsWith('yield of product') ||
        /^\[[a-z0-9\(\)\+\-]+\]$/i.test(raw)
      ) {
        yAxisLabel = raw;
        nodesToRemove.push(el);
      } else if (low === 'time' || low === 'temperature' || low === 'pressure') {
        xAxisLabel = raw;
        nodesToRemove.push(el);
      }
      // 支援 t, t', t’, t t', t t’ 等所有 Word 彎引號組合！
      else if (/^t(?:\s+t['’‘′\u2019\u2032]?)?$|^t['’‘′\u2019\u2032]$/.test(low)) {
        if (/['’‘′\u2019\u2032]/.test(low)) {
          if (/^t\s+t/.test(low)) {
            timeMarkers.push('t', "t'");
          } else {
            timeMarkers.push("t'");
          }
        } else {
          timeMarkers.push('t');
        }
        nodesToRemove.push(el);
      } else if (
        /^[A-Za-z0-9]+\([glsaq]{1,2}\)$/.test(raw) ||
        /^\d+\s*atm$/i.test(raw) ||
        low === 'forward reaction' ||
        low === 'backward reaction'
      ) {
        curveSpecies.push(raw);
        nodesToRemove.push(el);
      }
    });

    if (!yAxisLabel && !xAxisLabel && curveSpecies.length === 0 && timeMarkers.length === 0) {
      mainImg.classList.add('ch41-enlarged-standalone-img');
      return;
    }

    if (body.querySelector('.ch41-2d-graph-stage')) return;

    if (!yAxisLabel && fullText.includes('concentration')) yAxisLabel = 'Concentration';
    if (!xAxisLabel && (timeMarkers.length > 0 || fullText.includes('with time') || fullText.includes('at time'))) {
      xAxisLabel = 'Time';
    }

    // 針對各題曲線末端在「圖片本體 (imgBox)」上的精確垂直高度百分比進行定位
    let orderedCurves = curveSpecies.slice();
    let curveTopPercents = ['22%', '60%', '78%'];

    if (qCode === 'ChemMCQ41018' || (curveSpecies.includes('A(g)') && curveSpecies.includes('C(g)'))) {
      orderedCurves = ['C(g)', 'B(g)', 'A(g)'];
      curveTopPercents = ['19%', '65%', '86%'];
    } else if (qCode === 'ChemMCQ41028' || (curveSpecies.includes('NO(g)') && curveSpecies.includes('NOCl(g)'))) {
      // 圖二 ChemMCQ41028：三條水平線在圖片本體上的精確高度為 21%, 54%, 72%
      orderedCurves = ['NO(g)', 'Cl2(g)', 'NOCl(g)'];
      curveTopPercents = ['21%', '54%', '72%'];
    } else if (qCode === 'ChemMCQ41053' || curveSpecies.some(s => /atm/i.test(s))) {
      orderedCurves = ['50 atm', '30 atm', '10 atm'];
      curveTopPercents = ['18%', '43%', '68%'];
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'ch41-2d-graph-wrapper';

    const stage = document.createElement('div');
    stage.className = 'ch41-2d-graph-stage';
    if (orderedCurves.length === 0) {
      stage.style.paddingRight = '24px';
    }

    // 建立與圖片 1:1 貼合的內部定位盒，讓所有座標標籤 100% 鎖定在圖片邊緣，絕不因 padding 歪斜
    const imgBox = document.createElement('div');
    imgBox.className = 'ch41-img-anchor-box';

    const imgAnchor = mainImg.closest('p, div') || mainImg;
    imgAnchor.parentNode.insertBefore(wrapper, imgAnchor);

    mainImg.className = 'ch41-stage-img';
    imgBox.appendChild(mainImg);

    if (yAxisLabel) {
      const yEl = document.createElement('div');
      yEl.className = 'ch41-ylabel-rot';
      yEl.innerHTML = formatChemRichHtml(yAxisLabel);
      imgBox.appendChild(yEl);
    }

    if (orderedCurves.length > 0) {
      orderedCurves.forEach((cTxt, idx) => {
        const cEl = document.createElement('div');
        cEl.className = 'ch41-curve-label';
        cEl.style.top = curveTopPercents[idx] || `${20 + idx * 28}%`;
        cEl.innerHTML = formatChemRichHtml(cTxt);
        imgBox.appendChild(cEl);
      });
    }

    const uniqueT = Array.from(new Set(timeMarkers));
    if (uniqueT.length === 1) {
      const tEl = document.createElement('div');
      tEl.className = 'ch41-xlabel-t';
      tEl.style.left = '36%';
      tEl.innerHTML = formatChemRichHtml(uniqueT[0]);
      imgBox.appendChild(tEl);
    } else if (uniqueT.length >= 2) {
      // 完美對準圖二 ChemMCQ41028 的兩條垂直虛線 (t 與 t')
      const t1 = document.createElement('div');
      t1.className = 'ch41-xlabel-t';
      t1.style.left = '25%';
      t1.innerHTML = '<i>t</i>';
      imgBox.appendChild(t1);

      const t2 = document.createElement('div');
      t2.className = 'ch41-xlabel-t';
      t2.style.left = '49%';
      t2.innerHTML = '<i>t</i>&prime;';
      imgBox.appendChild(t2);
    }

    if (xAxisLabel) {
      const xEl = document.createElement('div');
      xEl.className = 'ch41-xlabel-time';
      xEl.innerHTML = xAxisLabel;
      imgBox.appendChild(xEl);
    }

    stage.appendChild(imgBox);
    wrapper.appendChild(stage);

    nodesToRemove.forEach(n => n.remove());
    if (imgAnchor !== body && (imgAnchor.textContent || '').trim() === '' && imgAnchor.querySelectorAll('img').length === 0) {
      imgAnchor.remove();
    }
  }

  // ===========================================================================
  // STEP 3: 氣筒實驗圖 (`ChemMCQ41020`) 精準對位與指示線重組 (解決圖三擠在一起的問題)
  // ===========================================================================
  function reconstructSyringeDiagram(body, syringeImg) {
    if (body.querySelector('.ch41-syringe-stage')) return;

    const trashKeywords = ['a gaseous mixture', 'plunger', 'rubber cap', 'gas syringe'];
    Array.from(body.querySelectorAll('p, div')).forEach(el => {
      if (el.querySelector('img')) return;
      const t = (el.textContent || '').trim().toLowerCase();
      if (trashKeywords.some(k => t.includes(k)) && t.length < 55) el.remove();
    });

    const wrapper = document.createElement('div');
    wrapper.className = 'ch41-syringe-wrapper';

    const stage = document.createElement('div');
    stage.className = 'ch41-syringe-stage';

    const imgBox = document.createElement('div');
    imgBox.className = 'ch41-syringe-imgbox';

    const anchor = syringeImg.closest('p, div') || syringeImg;
    anchor.parentNode.insertBefore(wrapper, anchor);

    imgBox.appendChild(syringeImg);

    // 1. 左端活塞標籤 (plunger) 對準左側活塞桿
    // 2. 中央混合氣體標籤 (a gaseous mixture...) 對準灰色氣室中央
    // 3. 右端橡膠帽標籤 (rubber cap) 對準右側封口
    // 4. 底部針筒標籤 (gas syringe) 緊貼針筒外殼正下方
    imgBox.insertAdjacentHTML(
      'beforeend',
      `
      <div style="position:absolute; left:0%; top:-24px; transform:translateX(-35%); font-size:14px; white-space:nowrap;">plunger</div>
      <div style="position:absolute; left:48%; top:-26px; transform:translateX(-50%); font-size:14px; white-space:nowrap;">a gaseous mixture of H<sub>2</sub>, I<sub>2</sub> and HI</div>
      <div style="position:absolute; right:0%; top:-24px; transform:translateX(35%); font-size:14px; white-space:nowrap;">rubber cap</div>
      <div style="position:absolute; left:52%; bottom:-22px; transform:translateX(-50%); font-size:14px; white-space:nowrap;">gas syringe</div>
      `
    );

    stage.appendChild(imgBox);
    wrapper.appendChild(stage);

    if (anchor !== body && (anchor.textContent || '').trim() === '') anchor.remove();
  }

  // ===========================================================================
  // STEP 4: 2x2 四格圖表選項題 (如 `ChemMCQ41019`)
  // ===========================================================================
  function reconstruct2x2OptionGraphs(body) {
    if (body.querySelector('.ch41-2x2-option-grid')) return;

    const allGraphImgs = Array.from(body.querySelectorAll('img')).filter(img => !isSmallArrowImage(img));
    if (allGraphImgs.length < 4) return;

    const optionImgs = allGraphImgs.slice(allGraphImgs.length - 4);

    let sharedYLabel = '';
    let sharedXLabel = 'time';
    let hasTMarker = false;

    Array.from(body.querySelectorAll('p, div, span')).forEach(el => {
      if (el.querySelector('img')) return;
      const raw = (el.textContent || '').trim();
      const low = raw.toLowerCase();

      if (/^\[[a-z0-9\(\)\+\-]+\]$/i.test(raw) || low === 'concentration' || low === 'rate') {
        sharedYLabel = raw;
        el.remove();
      } else if (low === 'time') {
        sharedXLabel = raw;
        el.remove();
      } else if (/^t['’‘′\u2019\u2032]?$/.test(low)) {
        hasTMarker = true;
        el.remove();
      } else if (/^[A-D]\.?$/.test(raw)) {
        el.remove();
      }
    });

    const fullText = body.textContent || '';
    if (!sharedYLabel && fullText.includes('CH3OH')) {
      sharedYLabel = '[CH3OH(g)]';
      hasTMarker = true;
    }

    const grid = document.createElement('div');
    grid.className = 'ch41-2x2-option-grid';

    const firstAnchor = optionImgs[0].closest('p, div') || optionImgs[0];
    firstAnchor.parentNode.insertBefore(grid, firstAnchor);

    const letters = ['A.', 'B.', 'C.', 'D.'];
    optionImgs.forEach((img, idx) => {
      const oldWrapper = img.closest('p, div');

      const cell = document.createElement('div');
      cell.className = 'ch41-2x2-cell';

      const optLetter = document.createElement('div');
      optLetter.className = 'ch41-2x2-optletter';
      optLetter.textContent = letters[idx];

      const miniStage = document.createElement('div');
      miniStage.className = 'ch41-2x2-miniStage';
      miniStage.appendChild(img);

      if (sharedYLabel) {
        const yLbl = document.createElement('div');
        yLbl.style.cssText =
          'position:absolute; left:7px; top:45%; transform:translate(-50%, -50%) rotate(-90deg); white-space:nowrap; font-family:"Times New Roman", serif; font-size:13.5px; color:#111;';
        yLbl.innerHTML = formatChemRichHtml(sharedYLabel);
        miniStage.appendChild(yLbl);
      }

      if (hasTMarker) {
        const tLbl = document.createElement('div');
        tLbl.style.cssText =
          'position:absolute; left:48%; bottom:2px; transform:translateX(-50%); font-family:"Times New Roman", serif; font-style:italic; font-size:13.5px; color:#111;';
        tLbl.textContent = 't';
        miniStage.appendChild(tLbl);
      }

      if (sharedXLabel) {
        const xLbl = document.createElement('div');
        xLbl.style.cssText =
          'position:absolute; right:4px; bottom:1px; font-family:"Times New Roman", serif; font-size:13.5px; color:#111;';
        xLbl.textContent = sharedXLabel;
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
  // STEP 5: 100% 防彈級「雙欄選項轉標準 3 欄 HTML Table」引擎
  //         直接以純文字 (textContent) 進行比對切割，無視內部混亂的 HTML 標籤！
  //         徹底解決 ChemMCQ41039, 41046, 41048, 41053, 41079 等所有雙欄題！
  // ===========================================================================
  function convertTwoColumnOptionsToTable(body) {
    if (body.querySelector('.ch41-option-table')) return;

    // 只取最底層的段落區塊 (p 或沒有子段落的 div)
    const leafBlocks = Array.from(body.querySelectorAll('p, div')).filter(
      el =>
        !el.querySelector('p, div, img, table') &&
        (el.textContent || '').replace(/\s+/g, ' ').trim().length > 0
    );

    const optNodes = {};
    leafBlocks.forEach(el => {
      const txt = (el.textContent || '').replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
      const m = txt.match(/^([A-D])\.\s*(.+)$/);
      if (m) {
        optNodes[m[1]] = { el, cleanText: m[2].trim(), rawHtml: el.innerHTML.trim() };
      }
    });

    if (!optNodes.A || !optNodes.B || !optNodes.C || !optNodes.D) return;

    // 往上尋找緊接在 A. 之前的表頭段落
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

    // 用純文字精準切割表頭的左右兩欄
    function splitHeaderText(plain, rawHtml) {
      // 1. 檢查常見的 Ch41 雙欄表頭組合 (純文字比對，100% 不受 <i>/<em>/<sub> 標籤干擾)
      const headerRules = [
        /^(K\s*c|Q\s*c)\s+(Equilibrium\s+position.*)$/i,
        /^(Equilibrium\s+position)\s+(K\s*c|Q\s*c.*)$/i,
        /^(Sign\s+of\s+Δ?H)\s+(Product\s+yield.*)$/i,
        /^(At\s+time\s+t\s*1)\s+(At\s+time\s+t\s*2)$/i,
        /^(Reversible\s+reaction)\s+(Enthalpy\s+change.*)$/i,
        /^(Effect\s+on\s+K\s*c)\s+(Effect\s+on\s+equilibrium.*)$/i,
        /^(Value\s+of\s+K\s*c)\s+(Equilibrium\s+position.*)$/i,
        /^(Rate\s+of\s+forward\s+reaction)\s+(Rate\s+of\s+backward\s+reaction)$/i
      ];
      for (const rule of headerRules) {
        const m = plain.match(rule);
        if (m) {
          return [formatChemRichHtml(m[1]), formatChemRichHtml(m[2])];
        }
      }

      // 2. 若含有連續多個空白或 &nbsp; 或 Tab
      const rawParts = rawHtml.split(/(?:&nbsp;|\u00A0|\t|\s){3,}/);
      if (rawParts.length >= 2 && rawParts[0].trim() && rawParts[1].trim()) {
        return [rawParts[0].trim(), rawParts.slice(1).join(' ').trim()];
      }
      return null;
    }

    // 用純文字精準切割 A/B/C/D 選項的左右兩欄
    function splitOptionRow(plain, rawHtml) {
      const cleanHtml = rawHtml.replace(/^[A-D]\.\s*/, '').trim();

      // 1. Increases / Decreases / Remains unchanged / No change + 右欄 (如 Shifts to the left / Increases 等)
      const m1 = plain.match(
        /^(Increases|Decreases|Remains\s+unchanged|No\s+change|Unchanged)\s+(Shifts\s+to\s+the\s+(?:left|right)|Increases|Decreases|Remains\s+unchanged|No\s+change|Unchanged.*)$/i
      );
      if (m1) {
        return [m1[1].trim(), m1[2].trim()];
      }

      // 2. 正負號 (+ / - / −) + 右欄 (如 Increases / Decreases)
      const m2 = plain.match(/^([+\-−])\s+(Increases|Decreases|Remains\s+unchanged|No\s+change.*)$/i);
      if (m2) {
        return [m2[1].trim(), m2[2].trim()];
      }

      // 3. 兩個完整英文句子，以句號 "." 分隔 (如 ChemMCQ41079: "Add a catalyst. The volume of the vessel decreases.")
      const m3 = plain.match(/^([^.]+\.)\s+([A-Z][^.]+\.?)$/);
      if (m3) {
        return [formatChemRichHtml(m3[1].trim()), formatChemRichHtml(m3[2].trim())];
      }

      // 4. 反應式 + ΔH < 0 / ΔH > 0 (如 ChemMCQ41053)
      const m4 = cleanHtml.match(/^(.*?)\s*((?:ΔH|&Delta;H|&#916;H)\s*(?:&lt;|&gt;|<|>)\s*0.*)$/i);
      if (m4 && m4[1].trim()) {
        return [m4[1].trim(), `<i>${m4[2].trim()}</i>`];
      }

      // 5. 連續空白切割
      const rawParts = cleanHtml.split(/(?:&nbsp;|\u00A0|\t|\s){3,}/);
      if (rawParts.length >= 2 && rawParts[0].trim() && rawParts[1].trim()) {
        return [rawParts[0].trim(), rawParts.slice(1).join(' ').trim()];
      }

      return null;
    }

    const headerCols = splitHeaderText(headerClean, headerEl.innerHTML.trim());
    if (!headerCols) return;

    const rows = [];
    for (const letter of ['A', 'B', 'C', 'D']) {
      const item = optNodes[letter];
      const cols = splitOptionRow(item.cleanText, item.rawHtml);
      if (!cols) return;
      rows.push({ letter: `${letter}.`, col1: cols[0], col2: cols[1], el: item.el });
    }

    const table = document.createElement('table');
    table.className = 'ch41-option-table';
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
  // STEP 6: 修復遺失的 Qc 數學分式與 Flask 濃度表
  // ===========================================================================
  function restoreFractionsAndDataTables(body, qCode) {
    const fullText = body.textContent || '';

    if (qCode === 'ChemMCQ41025' || (fullText.includes('CoCl') && fullText.includes('reaction quotient'))) {
      const qcMap = {
        A: `A. &nbsp; <i>Q</i><sub>c</sub> = ${buildFrac('<i>z</i>', '<i>x y</i>')} mol<sup>&minus;4</sup> dm<sup>12</sup>`,
        B: `B. &nbsp; <i>Q</i><sub>c</sub> = ${buildFrac('<i>z</i>', '<i>x y</i><sup>4</sup>')} mol<sup>&minus;4</sup> dm<sup>12</sup>`,
        C: `C. &nbsp; <i>Q</i><sub>c</sub> = ${buildFrac('<i>x y</i>', '<i>z</i>')} mol<sup>4</sup> dm<sup>&minus;12</sup>`,
        D: `D. &nbsp; <i>Q</i><sub>c</sub> = ${buildFrac('<i>x y</i><sup>4</sup>', '<i>z</i>')} mol<sup>4</sup> dm<sup>&minus;12</sup>`
      };

      Array.from(body.querySelectorAll('p, div')).forEach(p => {
        const t = (p.textContent || '').replace(/\s+/g, ' ').trim();
        const m = t.match(/^([A-D])\.\s*(?:Qc|Q\s*c)\s*=\s*$/i);
        if (m && qcMap[m[1].toUpperCase()]) {
          p.innerHTML = qcMap[m[1].toUpperCase()];
          p.style.margin = '10px 0';
          p.style.fontFamily = '"Times New Roman", serif';
        }
      });
    }

    Array.from(body.querySelectorAll('p')).forEach(p => {
      const t = (p.textContent || '').replace(/\s+/g, ' ').trim();
      if (/^Flask\s+\[Cl/i.test(t)) {
        const nextEl = p.nextElementSibling;
        if (nextEl && nextEl.tagName === 'TABLE') {
          const thead = document.createElement('thead');
          thead.innerHTML = `
            <tr>
              <th>Flask</th>
              <th>[Cl<sub>2</sub>(g)] / mol dm<sup>&minus;3</sup></th>
              <th>[PCl<sub>3</sub>(g)] / mol dm<sup>&minus;3</sup></th>
              <th>[PCl<sub>5</sub>(g)] / mol dm<sup>&minus;3</sup></th>
            </tr>
          `;
          nextEl.insertBefore(thead, nextEl.firstChild);
          nextEl.className = 'ch41-option-table';
          p.remove();
        }
      }
    });
  }

  // ===========================================================================
  // 主控流程
  // ===========================================================================
  function processQuestionCard(card) {
    if (!card) return;
    const body = card.querySelector('.q-native-body');
    if (!body) return;

    const unloaded = Array.from(body.querySelectorAll('img')).filter(img => !img.complete);
    if (unloaded.length > 0 && !body.dataset.ch41ImgLoaded) {
      body.dataset.ch41ImgLoaded = '1';
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
        body.dataset.ch41V63Done = '';
        processQuestionCard(card);
      });
    }

    const qNumEl = card.querySelector('.q-number');
    const qCode = qNumEl ? qNumEl.textContent.trim() : '';

    rescueEquilibriumEquations(body);
    processSingleGraphAndDebris(body, qCode);
    reconstruct2x2OptionGraphs(body);
    convertTwoColumnOptionsToTable(body);
    restoreFractionsAndDataTables(body, qCode);
  }

  function scanAllCards() {
    injectStyles();
    document.querySelectorAll('.question-card').forEach(card => {
      const body = card.querySelector('.q-native-body');
      if (body && !body.dataset.ch41V63Done) {
        body.dataset.ch41V63Done = '1';
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

/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 41 Dedicated Layout & Graph Patch
 * File: patches/patch_ch41.js (v62.0 - Enlarged Graphs, Curve-Aligned Labels & Option Tables)
 * Target: Chapter 41 (Chemical Equilibrium)
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch41 v62.0] Enlarged 2D Graph, Debris Purge & Option Table Engine Loaded.');

  // ===========================================================================
  // 1. 注入專屬樣式：放大圖表、精準曲線對齊、標準 3 欄選項表格
  // ===========================================================================
  function injectStyles() {
    if (document.getElementById('ch41PatchV62Styles')) return;
    const style = document.createElement('style');
    style.id = 'ch41PatchV62Styles';
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

      /* 放大版 2D 座標圖畫布 */
      .ch41-2d-graph-wrapper {
        width: 100% !important;
        text-align: center !important;
        overflow-x: auto !important;
        margin: 10px 0 14px 0 !important;
      }
      .ch41-2d-graph-stage {
        position: relative !important;
        display: inline-block !important;
        margin: 6px auto !important;
        padding: 8px 68px 28px 42px !important;
        background: transparent !important;
        font-family: "Times New Roman", Times, serif !important;
        color: #111111 !important;
        line-height: 1.2 !important;
        box-sizing: content-box !important;
        user-select: none;
      }
      /* 放大單張圖表尺寸 (清楚易讀，手機/iPad 自適應) */
      .ch41-2d-graph-stage > img.ch41-stage-img,
      .q-native-body img.ch41-enlarged-standalone-img {
        display: block !important;
        width: 295px !important;
        max-width: 82vw !important;
        max-height: 240px !important;
        height: auto !important;
        margin: 10px auto !important;
        object-fit: contain !important;
      }
      .ch41-2d-graph-stage > img.ch41-stage-img {
        margin: 0 !important;
      }

      /* Y 軸垂直旋轉標籤 (如 Concentration / Kc) */
      .ch41-ylabel-rot {
        position: absolute !important;
        left: 16px !important;
        top: 45% !important;
        transform: translate(-50%, -50%) rotate(-90deg) !important;
        transform-origin: center center !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        color: #111111 !important;
      }

      /* 右側曲線末端物種標籤 (精準對齊三條水平線高度) */
      .ch41-curve-label {
        position: absolute !important;
        left: calc(100% - 62px) !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        color: #111111 !important;
        transform: translateY(-50%) !important;
        text-align: left !important;
      }

      /* X 軸底部時間/變數標籤 */
      .ch41-xlabel-time {
        position: absolute !important;
        right: 54px !important;
        bottom: 3px !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        color: #111111 !important;
      }
      .ch41-xlabel-t {
        position: absolute !important;
        bottom: 4px !important;
        transform: translateX(-50%) !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-style: italic !important;
        font-size: 15px !important;
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
          grid-template-columns: repeat(2, minmax(152px, 1fr)) !important;
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
          width: 126px !important;
        }
      }

      /* 氣筒實驗裝置 2D 畫布 (ChemMCQ41020) */
      .ch41-syringe-stage {
        position: relative !important;
        width: 340px !important;
        max-width: 96% !important;
        margin: 16px auto !important;
        padding: 36px 10px 32px 10px !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 14.5px !important;
        color: #111111 !important;
        text-align: center !important;
      }
      .ch41-syringe-stage > img {
        display: block !important;
        width: 265px !important;
        max-width: 92% !important;
        height: auto !important;
        margin: 0 auto !important;
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

      /* 標準 3 欄對齊選項表格 (解決圖1、圖4、圖5假表格歪斜問題) */
      .ch41-option-table {
        width: 100% !important;
        max-width: 580px !important;
        border-collapse: collapse !important;
        margin: 14px 0 16px 0 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 15.5px !important;
        color: #1D1F2C !important;
      }
      .ch41-option-table th {
        padding: 6px 10px 8px 10px !important;
        text-align: left !important;
        vertical-align: bottom !important;
        font-weight: normal !important;
        text-decoration: underline !important;
        color: #1D1F2C !important;
      }
      .ch41-option-table td {
        padding: 7px 10px !important;
        text-align: left !important;
        vertical-align: middle !important;
        border: none !important;
        line-height: 1.45 !important;
      }
      .ch41-option-table td.opt-col-letter {
        width: 34px !important;
        padding-left: 2px !important;
        padding-right: 4px !important;
        white-space: nowrap !important;
      }
    `;
    document.head.appendChild(style);
  }

  function formatChemLabelHtml(raw) {
    if (!raw) return '';
    const t = raw.trim();
    if (/^[ABC]\(g\)$/.test(t)) return `<i>${t[0]}</i>(g)`;
    if (t === 'Kc' || t === 'Qc') return `<i>${t[0]}</i><sub>c</sub>`;
    if (t === 't') return '<i>t</i>';
    if (t === "t'" || t === 't\u2032') return '<i>t</i>&prime;';
    return t
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
    if (/\b(which|following|consider|mixture|volume|temperature|system|statement|graph|shows|change|flask|moment|quotient|allowed|compressed)\b/i.test(t)) {
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
        div.classList.contains('ch41-2x2-option-grid') ||
        div.classList.contains('ch41-syringe-stage')
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
  // STEP 2: 徹底清除圖表下方多出來的雜訊文字 (如 Concentration / mol dm-3, Time / s, t1 t2)
  //         並放大單張圖表 + 精準對齊曲線與軸標籤
  // ===========================================================================
  function processSingleGraphAndDebris(body, qCode) {
    const graphImgs = Array.from(body.querySelectorAll('img')).filter(img => !isSmallArrowImage(img));
    if (graphImgs.length !== 1) return;

    const mainImg = graphImgs[0];
    const fullText = (body.textContent || '').toLowerCase();

    // 氣筒題 (ChemMCQ41020)
    if (qCode === 'ChemMCQ41020' || fullText.includes('gas syringe')) {
      reconstructSyringeDiagram(body, mainImg);
      return;
    }

    // 2A. 清除「圖片內部已經畫好字、但 Word 轉檔又在圖下面重複吐出來」的多餘殘留行
    //     例如圖1的 "Concentration / mol dm-3", "t1 t2"；圖3的 "Concentration / M", "Time / s"
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

    // 2B. 掃描真正的浮動軸/曲線標籤 (尚未畫在圖裡面的散落標籤)
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
      } else if (/^t(?:\s*t['\u2032]?)?$|^t['\u2032]$/.test(low)) {
        if (low.includes("'") || low.includes('\u2032')) {
          if (low.startsWith('t ') && low.length >= 3) timeMarkers.push('t', "t'");
          else timeMarkers.push("t'");
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

    // 若這張圖本身已經內含完整文字 (如圖1 ChemMCQ41079、圖3 ChemMCQ41043)，只需直接放大圖片即可！
    if (!yAxisLabel && !xAxisLabel && curveSpecies.length === 0 && timeMarkers.length === 0) {
      mainImg.classList.add('ch41-enlarged-standalone-img');
      return;
    }

    // 否則為空白座標圖 (如圖2 ChemMCQ41067 缺了 Y 軸 Kc，或 ChemMCQ41018/41028 缺了曲線標籤) 建立放大版 2D 畫布
    if (body.querySelector('.ch41-2d-graph-stage')) return;

    if (!yAxisLabel && fullText.includes('concentration')) yAxisLabel = 'Concentration';
    // 注意：像圖2 (ChemMCQ41067) X 軸圖裡已經畫了 Temperature，就不要多加 Time
    if (!xAxisLabel && (timeMarkers.length > 0 || fullText.includes('with time'))) xAxisLabel = 'Time';

    let orderedCurves = curveSpecies.slice();
    if (qCode === 'ChemMCQ41018' || (curveSpecies.includes('A(g)') && curveSpecies.includes('C(g)'))) {
      orderedCurves = ['C(g)', 'B(g)', 'A(g)'];
    } else if (qCode === 'ChemMCQ41028' || (curveSpecies.includes('NO(g)') && curveSpecies.includes('NOCl(g)'))) {
      orderedCurves = ['NO(g)', 'Cl2(g)', 'NOCl(g)'];
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'ch41-2d-graph-wrapper';

    const stage = document.createElement('div');
    stage.className = 'ch41-2d-graph-stage';
    // 若沒有右側曲線文字 (如圖2 ChemMCQ41067)，減少右側留白讓圖更置中
    if (orderedCurves.length === 0) {
      stage.style.paddingRight = '24px';
    }

    const imgAnchor = mainImg.closest('p, div') || mainImg;
    imgAnchor.parentNode.insertBefore(wrapper, imgAnchor);

    mainImg.className = 'ch41-stage-img';
    stage.appendChild(mainImg);

    if (yAxisLabel) {
      const yEl = document.createElement('div');
      yEl.className = 'ch41-ylabel-rot';
      yEl.innerHTML = formatChemLabelHtml(yAxisLabel);
      stage.appendChild(yEl);
    }

    if (orderedCurves.length > 0) {
      // 精準對齊放大後 295px 圖表的三條水平曲線末端高度
      const topPositions =
        orderedCurves.length === 3
          ? ['24%', '65%', '83%']
          : orderedCurves.length === 2
          ? ['32%', '74%']
          : ['50%'];

      orderedCurves.forEach((cTxt, idx) => {
        const cEl = document.createElement('div');
        cEl.className = 'ch41-curve-label';
        cEl.style.top = topPositions[idx] || `${25 + idx * 25}%`;
        cEl.innerHTML = formatChemLabelHtml(cTxt);
        stage.appendChild(cEl);
      });
    }

    const uniqueT = Array.from(new Set(timeMarkers));
    if (uniqueT.length === 1) {
      const tEl = document.createElement('div');
      tEl.className = 'ch41-xlabel-t';
      tEl.style.left = orderedCurves.length > 0 ? '42%' : '48%';
      tEl.innerHTML = formatChemLabelHtml(uniqueT[0]);
      stage.appendChild(tEl);
    } else if (uniqueT.length >= 2) {
      const t1 = document.createElement('div');
      t1.className = 'ch41-xlabel-t';
      t1.style.left = '35%';
      t1.innerHTML = '<i>t</i>';
      stage.appendChild(t1);

      const t2 = document.createElement('div');
      t2.className = 'ch41-xlabel-t';
      t2.style.left = '54%';
      t2.innerHTML = '<i>t</i>&prime;';
      stage.appendChild(t2);
    }

    if (xAxisLabel) {
      const xEl = document.createElement('div');
      xEl.className = 'ch41-xlabel-time';
      xEl.innerHTML = xAxisLabel;
      stage.appendChild(xEl);
    }

    wrapper.appendChild(stage);

    nodesToRemove.forEach(n => n.remove());
    if (imgAnchor !== body && (imgAnchor.textContent || '').trim() === '' && imgAnchor.querySelectorAll('img').length === 0) {
      imgAnchor.remove();
    }
  }

  // ===========================================================================
  // STEP 3: 氣筒實驗圖 (`ChemMCQ41020`) 2D 重組
  // ===========================================================================
  function reconstructSyringeDiagram(body, syringeImg) {
    if (body.querySelector('.ch41-syringe-stage')) return;

    const trashKeywords = ['a gaseous mixture', 'plunger', 'rubber cap', 'gas syringe'];
    Array.from(body.querySelectorAll('p, div')).forEach(el => {
      if (el.querySelector('img')) return;
      const t = (el.textContent || '').trim().toLowerCase();
      if (trashKeywords.some(k => t.includes(k)) && t.length < 55) el.remove();
    });

    const stage = document.createElement('div');
    stage.className = 'ch41-syringe-stage';

    const anchor = syringeImg.closest('p, div') || syringeImg;
    anchor.parentNode.insertBefore(stage, anchor);
    stage.appendChild(syringeImg);

    stage.insertAdjacentHTML(
      'beforeend',
      `
      <div style="position:absolute; left:8px; top:10px; font-size:14px;">plunger</div>
      <div style="position:absolute; left:52%; top:6px; transform:translateX(-50%); font-size:14px; white-space:nowrap;">a gaseous mixture of H<sub>2</sub>, I<sub>2</sub> and HI</div>
      <div style="position:absolute; right:8px; top:10px; font-size:14px;">rubber cap</div>
      <div style="position:absolute; left:50%; bottom:4px; transform:translateX(-50%); font-size:14px;">gas syringe</div>
      `
    );

    if (anchor !== body && (anchor.textContent || '').trim() === '') anchor.remove();
  }

  // ===========================================================================
  // STEP 4: 放大版 2x2 四格圖表選項題 (如 `ChemMCQ41019`)
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
      } else if (low === 't' || low === "t'") {
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
        yLbl.innerHTML = formatChemLabelHtml(sharedYLabel);
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
  // STEP 5: 自動將所有「假兩欄選項」(如圖1, 圖4, 圖5) 重構為標準 3 欄 HTML Table！
  //         同時修復 Qc 數學分式與 Flask 濃度表
  // ===========================================================================
  function convertTwoColumnOptionsToTable(body) {
    if (body.querySelector('.ch41-option-table')) return;

    const blocks = Array.from(body.querySelectorAll('p, div')).filter(
      el => !el.querySelector('img, table') && (el.textContent || '').trim().length > 0
    );

    // 尋找所有 A. B. C. D. 選項段落
    const optNodes = {};
    blocks.forEach(el => {
      const txt = (el.textContent || '').trim();
      const m = txt.match(/^([A-D])\.\s*(.+)$/);
      if (m) {
        optNodes[m[1]] = el;
      }
    });

    if (!optNodes.A || !optNodes.B || !optNodes.C || !optNodes.D) return;

    // 檢查 A. 段落的前一個兄弟元素是否為「雙欄表頭」（沒有 A./B./C./D. 開頭，且不含問號）
    const headerEl = optNodes.A.previousElementSibling;
    if (!headerEl || headerEl.querySelector('img, table')) return;

    const headerRaw = headerEl.innerHTML.trim();
    const headerTxt = (headerEl.textContent || '').replace(/\u00A0/g, ' ').trim();

    // 排除普通題幹問句 (含有 ? 或 : 或以 Which / What / In which 開頭)
    if (
      !headerTxt ||
      headerTxt.includes('?') ||
      headerTxt.endsWith(':') ||
      /^(Which|What|In which|Consider|The following)/i.test(headerTxt)
    ) {
      return;
    }

    // 拆分表頭為兩欄 (支援 Tab、連續空白、或已知 DSE 化學表頭關鍵字)
    function splitTwoColumns(htmlStr, plainStr) {
      // 1. 先嘗試用 HTML 中的 &nbsp; 連續空白或 Tab 拆分
      const nbspSplit = htmlStr.split(/(?:&nbsp;|\u00A0|\t|\s){3,}/);
      if (nbspSplit.length >= 2 && nbspSplit[0].trim() && nbspSplit[1].trim()) {
        return [nbspSplit[0].trim(), nbspSplit.slice(1).join(' ').trim()];
      }

      // 2. 針對已知化學雙欄表頭/選項特徵進行智慧切割
      const knownHeaderPatterns = [
        /^(At time\s+<i>t<\/i><sub>1<\/sub>|At time\s+t1)\s+(.+)$/i,
        /^(Sign of\s+(?:ΔH|&Delta;H|&#916;H))\s+(.+)$/i,
        /^(<i>K<\/i><sub>c<\/sub>|Kc)\s+(.+)$/i,
        /^(Reversible reaction)\s+(.+)$/i,
        /^(Change in\s+<i>K<\/i><sub>c<\/sub>|Change in Kc)\s+(.+)$/i,
        /^(Equilibrium position)\s+(.+)$/i
      ];
      for (const pat of knownHeaderPatterns) {
        const m = htmlStr.match(pat);
        if (m) return [m[1].trim(), m[2].trim()];
      }

      // 3. 針對選項內容的雙欄切割 (例如 "+ Decreases", "Increases Shifts to the left", "Add a catalyst. The volume...")
      const optPatterns = [
        /^([+\-−])\s+([A-Za-z].+)$/,
        /^(Increases|Decreases|Remains unchanged|No change)\s+(Shifts.+|Increases|Decreases|Remains unchanged|No change)$/i,
        /^(.+?\.)\s+([A-Z].+\.)$/,
        /^(.+?(?:ΔH|&Delta;H|&#916;H)\s*[<>]\s*0)\s*((?:ΔH|&Delta;H|&#916;H)\s*[<>]\s*0)$/i
      ];
      for (const pat of optPatterns) {
        const m = htmlStr.match(pat);
        if (m) return [m[1].trim(), m[2].trim()];
      }

      return null;
    }

    const headerCols = splitTwoColumns(headerRaw, headerTxt);
    if (!headerCols) return;

    const parsedRows = [];
    for (const letter of ['A', 'B', 'C', 'D']) {
      const el = optNodes[letter];
      // 去掉開頭的 "A."
      const innerWithoutLetter = el.innerHTML.trim().replace(/^[A-D]\.\s*/, '');
      const textWithoutLetter = (el.textContent || '').replace(/\u00A0/g, ' ').trim().replace(/^[A-D]\.\s*/, '');
      const cols = splitTwoColumns(innerWithoutLetter, textWithoutLetter);
      if (!cols) return; // 若四個選項無法一致拆成兩欄，則放棄轉換以策安全
      parsedRows.push({ letter: `${letter}.`, col1: cols[0], col2: cols[1], el });
    }

    // 建立乾淨整齊的 3 欄 HTML Table
    const table = document.createElement('table');
    table.className = 'ch41-option-table';
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

  function restoreFractionsAndDataTables(body, qCode) {
    const fullText = body.textContent || '';

    // 修復 ChemMCQ41025 的 Qc 分子分母上下分式
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

    // 修復 ChemMCQ41026 的 Flask 濃度數據表格
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
        body.dataset.ch41V62Done = '';
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
      if (body && !body.dataset.ch41V62Done) {
        body.dataset.ch41V62Done = '1';
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

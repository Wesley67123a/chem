/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 41 Dedicated 2D Reconstruction Patch
 * File: patches/patch_ch41.js (v61.2 - Enlarged Graphs, Exact Coordinates & Clean Sweep)
 * Description:
 *   1. Enlarges all Ch41 graphs (~30% bigger, crisp 285px stage) with pixel-accurate
 *      2D overlay coordinates for Y-axis (including units like "Concentration / mol dm⁻³",
 *      "Concentration / M", "Kc"), X-axis ("Time", "Time / s", "Temperature"),
 *      dashed-line time markers (t, t', t₁, t₂), and curve-end species labels.
 *   2. Sweeps all remaining stray floating textbox debris so zero extra text leaks.
 *   3. Aligns 2-column & 4-column option/data tables (MCQ41026, 41046, 41048, 41053).
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch41 v61.2] Enlarged 2D Graph & Clean Sweep Engine Loaded.');

  // ===========================================================================
  // 1. 注入專屬 CSS 樣式
  // ===========================================================================
  function injectStyles() {
    if (document.getElementById('ch41PatchV61Styles')) return;
    const style = document.createElement('style');
    style.id = 'ch41PatchV61Styles';
    style.textContent = `
      /* 拆除所有誤加在圖片上的白框與邊框 */
      .q-native-body img,
      .exp-body img {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        border-radius: 0 !important;
      }

      /* 行內可逆反應符號 ⇌ 與文字基線 100% 對齊 */
      .ch41-eq-arrow {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        vertical-align: middle !important;
        margin: 0 5px !important;
        font-family: "Times New Roman", Cambria, serif !important;
        font-size: 18px !important;
        font-weight: normal !important;
        line-height: 1 !important;
        color: #111111 !important;
        transform: translateY(-1px) !important;
      }

      /* 合併後的單行化學反應式 */
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

      /* 2D 座標圖重組畫布 (放大版 285px，高解析度清晰呈現) */
      .ch41-2d-graph-stageWrapper {
        width: 100% !important;
        text-align: center !important;
        overflow-x: auto !important;
        margin: 8px 0 12px 0 !important;
      }
      .ch41-2d-graph-stage {
        position: relative !important;
        display: inline-block !important;
        margin: 6px auto !important;
        padding: 10px 76px 34px 48px !important;
        background: transparent !important;
        font-family: "Times New Roman", Times, serif !important;
        color: #111111 !important;
        line-height: 1.2 !important;
        box-sizing: content-box !important;
        user-select: none;
      }
      .ch41-2d-graph-stage > img.ch41-stage-img {
        display: block !important;
        width: 285px !important;
        max-width: none !important;
        max-height: none !important;
        height: auto !important;
        margin: 0 !important;
        object-fit: contain !important;
      }
      @media (max-width: 440px) {
        .ch41-2d-graph-stage {
          padding: 10px 66px 32px 42px !important;
        }
        .ch41-2d-graph-stage > img.ch41-stage-img {
          width: 235px !important;
        }
      }

      /* Y 軸垂直旋轉標籤 (如 Concentration / mol dm⁻³, Kc) */
      .ch41-ylabel-rot {
        position: absolute !important;
        left: 20px !important;
        top: 45% !important;
        transform: translate(-50%, -50%) rotate(-90deg) !important;
        transform-origin: center center !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        color: #111111 !important;
      }
      /* 若 Y 軸是短符號 (如 Kc)，保持水平置中在 Y 軸左側 */
      .ch41-ylabel-horiz {
        position: absolute !important;
        left: 24px !important;
        top: 44% !important;
        transform: translate(-50%, -50%) !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 16px !important;
        color: #111111 !important;
      }

      /* 右側曲線末端物種標籤 (緊貼圖片右緣) */
      .ch41-curve-label {
        position: absolute !important;
        left: calc(100% - 72px) !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        color: #111111 !important;
        transform: translateY(-50%) !important;
        text-align: left !important;
      }

      /* X 軸底部時間/溫度標籤 */
      .ch41-xlabel-time {
        position: absolute !important;
        right: 68px !important;
        bottom: 6px !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        color: #111111 !important;
      }
      .ch41-xlabel-t {
        position: absolute !important;
        bottom: 7px !important;
        transform: translateX(-50%) !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        color: #111111 !important;
      }

      /* 2x2 四格濃度圖 (放大版，如 ChemMCQ41019) */
      .ch41-2x2-option-grid {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(225px, 1fr)) !important;
        gap: 24px 20px !important;
        width: 100% !important;
        max-width: 620px !important;
        margin: 16px auto 20px auto !important;
        box-sizing: border-box !important;
      }
      @media (max-width: 520px) {
        .ch41-2x2-option-grid {
          grid-template-columns: repeat(2, minmax(155px, 1fr)) !important;
          gap: 16px 8px !important;
        }
      }
      .ch41-2x2-cell {
        position: relative !important;
        display: flex !important;
        align-items: flex-start !important;
        justify-content: center !important;
        padding: 4px 4px 24px 28px !important;
        background: transparent !important;
        border: none !important;
      }
      .ch41-2x2-optletter {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 16px !important;
        color: #111111 !important;
      }
      .ch41-2x2-miniStage {
        position: relative !important;
        display: inline-block !important;
        padding: 2px 6px 22px 24px !important;
      }
      .ch41-2x2-miniStage > img {
        display: block !important;
        width: 175px !important;
        max-width: 100% !important;
        height: auto !important;
        margin: 0 !important;
      }
      @media (max-width: 520px) {
        .ch41-2x2-miniStage > img {
          width: 132px !important;
        }
      }

      /* 氣筒實驗裝置 2D 重組畫布 (放大版 290px, ChemMCQ41020) */
      .ch41-syringe-stage {
        position: relative !important;
        width: 360px !important;
        max-width: 98% !important;
        margin: 18px auto !important;
        padding: 38px 10px 34px 10px !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        color: #111111 !important;
        text-align: center !important;
      }
      .ch41-syringe-stage > img {
        display: block !important;
        width: 290px !important;
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

      /* 教科書風格對齊表格 */
      .ch41-textbook-table {
        width: 100% !important;
        max-width: 560px !important;
        border-collapse: collapse !important;
        margin: 12px auto !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15.5px !important;
        color: #111111 !important;
      }
      .ch41-textbook-table th,
      .ch41-textbook-table td {
        padding: 7px 10px !important;
        text-align: center !important;
        vertical-align: middle !important;
        border: none !important;
      }
      .ch41-textbook-table thead th {
        border-bottom: 1.5px solid #1D1F2C !important;
        font-weight: normal !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 輔助：將純文字化學式/變數轉為標準斜體與上下標 HTML
  function formatChemLabelHtml(raw) {
    if (!raw) return '';
    const t = raw.trim();
    if (/^[ABC]\(g\)$/.test(t)) return `<i>${t[0]}</i>(g)`;
    if (/^Kc$/i.test(t)) return '<i>K</i><sub>c</sub>';
    if (/^Qc$/i.test(t)) return '<i>Q</i><sub>c</sub>';
    if (t === 't') return '<i>t</i>';
    if (t === "t'" || t === 't\u2032') return '<i>t</i>&prime;';
    if (t === 't1' || t === 't₁') return '<i>t</i><sub>1</sub>';
    if (t === 't2' || t === 't₂') return '<i>t</i><sub>2</sub>';
    return t
      .replace(/\bt1\b/g, '<i>t</i><sub>1</sub>')
      .replace(/\bt2\b/g, '<i>t</i><sub>2</sub>')
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
    if (/\b(which|following|consider|mixture|volume|temperature|system|statement|graph|shows|change|flask|moment|quotient|allowed|compressed|deductions)\b/i.test(t)) {
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
    if (src.startsWith('data:image/') && src.length < 3500) {
      return true;
    }
    if (isChemHalf(prevText) && isChemHalf(nextText)) {
      return true;
    }
    return false;
  }

  // ===========================================================================
  // STEP 1: 拯救並還原所有被 app.js 誤拆或誤包進 Grid 的 `⇌` 平衡方程式
  // ===========================================================================
  function rescueEquilibriumEquations(body) {
    Array.from(body.querySelectorAll('div')).forEach(div => {
      if (
        div.classList.contains('ch41-2d-graph-stage') ||
        div.classList.contains('ch41-2d-graph-stageWrapper') ||
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
        if (imgs.length === 1) {
          div.parentNode.insertBefore(imgs[0], div);
        }
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
  // STEP 2: 單張座標圖 + 散落標籤「2D 精準原地重組 + 徹底清場」
  // ===========================================================================
  function reconstructSingle2DGraph(body, qCode) {
    if (body.querySelector('.ch41-2d-graph-stage')) return;

    const graphImgs = Array.from(body.querySelectorAll('img')).filter(img => !isSmallArrowImage(img));
    if (graphImgs.length !== 1) return;

    const mainImg = graphImgs[0];
    const fullText = (body.textContent || '').toLowerCase();

    if (qCode === 'ChemMCQ41020' || fullText.includes('gas syringe')) {
      reconstructSyringeDiagram(body, mainImg);
      return;
    }

    let yAxisLabel = '';
    let xAxisLabel = '';
    const timeMarkers = [];
    const curveSpecies = [];
    const nodesToRemove = [];

    Array.from(body.querySelectorAll('p, div')).forEach(el => {
      if (el.querySelector('img, table') || el.classList.contains('ch41-reaction-line')) return;
      const raw = (el.textContent || '').replace(/\s+/g, ' ').trim();
      const low = raw.toLowerCase();
      if (!raw || raw.length > 42) return;

      // 1. 識別 Y 軸標籤（支援 Concentration / mol dm⁻³, Concentration / M, Kc, Rate, Yield...）
      if (
        /^concentration(?:\s*\/\s*(?:mol\s*dm\s*(?:-3|−3|\u207B\u00B3)?|m))?$/i.test(low) ||
        low === 'kc' ||
        low === 'qc' ||
        low === 'rate' ||
        low === 'reaction rate' ||
        low.startsWith('yield of product') ||
        /^\[[a-z0-9\(\)\+\-]+\]$/i.test(raw)
      ) {
        // 若同時有 "Concentration" 和 "Concentration / mol dm-3"，優先保留最完整有單位的那個
        if (!yAxisLabel || raw.length > yAxisLabel.length) {
          yAxisLabel = raw;
        }
        nodesToRemove.push(el);
      }
      // 2. 識別 X 軸標籤（支援 Time, Time / s, Time / min, Temperature, Pressure）
      else if (
        /^time(?:\s*\/\s*(?:s|min|hr))?$/i.test(low) ||
        low === 'temperature' ||
        low === 'pressure'
      ) {
        if (!xAxisLabel || raw.length > xAxisLabel.length) {
          xAxisLabel = raw;
        }
        nodesToRemove.push(el);
      }
      // 3. 識別 X 軸時間點標記 (t, t', t t', t1, t2, t1 t2)
      else if (/^t[12₁₂'′]?(?:\s+t[12₁₂'′]?)?$/.test(low)) {
        if (low.includes('1') || low.includes('₁')) timeMarkers.push('t1');
        if (low.includes('2') || low.includes('₂')) timeMarkers.push('t2');
        if (!low.includes('1') && !low.includes('2') && !low.includes('₁') && !low.includes('₂')) {
          if (low.includes("'") || low.includes('\u2032')) {
            if (low.startsWith('t ') && low.length >= 3) timeMarkers.push('t', "t'");
            else timeMarkers.push("t'");
          } else {
            timeMarkers.push('t');
          }
        }
        nodesToRemove.push(el);
      }
      // 4. 識別右側曲線標籤 (CO(g), CO2(g), I2(g), H2(g), HI(g), A(g), B(g), C(g), NO(g), Cl2(g), NOCl(g), 10 atm...)
      else if (
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
      return;
    }

    if (!yAxisLabel && fullText.includes('concentration')) yAxisLabel = 'Concentration';
    if (!xAxisLabel && (timeMarkers.length > 0 || fullText.includes('time'))) xAxisLabel = 'Time';

    // 針對已知題號精準排定曲線由上到下順序，並計算該圖形專屬的垂直高度百分比
    let orderedCurves = curveSpecies.slice();
    let customCurveTops = null;

    if (qCode === 'ChemMCQ41018' || (curveSpecies.includes('A(g)') && curveSpecies.includes('C(g)'))) {
      orderedCurves = ['C(g)', 'B(g)', 'A(g)'];
      customCurveTops = ['22%', '63%', '82%'];
    } else if (qCode === 'ChemMCQ41028' || (curveSpecies.includes('NO(g)') && curveSpecies.includes('NOCl(g)'))) {
      orderedCurves = ['NO(g)', 'Cl2(g)', 'NOCl(g)'];
      customCurveTops = ['24%', '58%', '80%'];
    } else if (qCode === 'ChemMCQ41043' || (curveSpecies.includes('I2(g)') && curveSpecies.includes('HI(g)'))) {
      // 圖3 (ChemMCQ41043): 由上到下依序為 I2(g) [最上方高線], H2(g) [中間線], HI(g) [最下方低線]
      orderedCurves = ['I2(g)', 'H2(g)', 'HI(g)'];
      customCurveTops = ['18%', '67%', '83%'];
    } else if (qCode === 'ChemMCQ41079' || (curveSpecies.includes('CO(g)') && curveSpecies.includes('CO2(g)'))) {
      // 圖1 (ChemMCQ41079): t2 後上方曲線為 CO(g)，下方曲線為 CO2(g)
      orderedCurves = ['CO(g)', 'CO2(g)'];
      customCurveTops = ['27%', '77%'];
    }

    // 建立 2D 畫布容器
    const wrapper = document.createElement('div');
    wrapper.className = 'ch41-2d-graph-stageWrapper';

    const stage = document.createElement('div');
    stage.className = 'ch41-2d-graph-stage';

    const imgAnchor = mainImg.closest('p, div') || mainImg;
    imgAnchor.parentNode.insertBefore(wrapper, imgAnchor);

    mainImg.className = 'ch41-stage-img';
    stage.appendChild(mainImg);

    // 貼上左側 Y 軸標籤
    if (yAxisLabel) {
      const yEl = document.createElement('div');
      const isShortSymbol = yAxisLabel.length <= 4; // 例如 Kc, Qc
      yEl.className = isShortSymbol ? 'ch41-ylabel-horiz' : 'ch41-ylabel-rot';
      yEl.innerHTML = formatChemLabelHtml(yAxisLabel);
      stage.appendChild(yEl);
    }

    // 貼上右側曲線末端標籤
    if (orderedCurves.length > 0) {
      const defaultTops =
        orderedCurves.length === 3
          ? ['22%', '63%', '82%']
          : orderedCurves.length === 2
          ? ['28%', '76%']
          : ['50%'];
      const tops = customCurveTops || defaultTops;

      orderedCurves.forEach((cTxt, idx) => {
        const cEl = document.createElement('div');
        cEl.className = 'ch41-curve-label';
        cEl.style.top = tops[idx] || `${25 + idx * 25}%`;
        cEl.innerHTML = formatChemLabelHtml(cTxt);
        stage.appendChild(cEl);
      });
    }

    // 貼上底部 X 軸虛線時間點 (t, t', t1, t2)
    const uniqueT = Array.from(new Set(timeMarkers));
    if (uniqueT.length === 1) {
      const tEl = document.createElement('div');
      tEl.className = 'ch41-xlabel-t';
      tEl.style.left = '43%';
      tEl.innerHTML = formatChemLabelHtml(uniqueT[0]);
      stage.appendChild(tEl);
    } else if (uniqueT.length >= 2) {
      // 雙虛線圖 (如 ChemMCQ41079 的 t1 與 t2)
      const isT1T2 = uniqueT.includes('t1') && uniqueT.includes('t2');
      const t1 = document.createElement('div');
      t1.className = 'ch41-xlabel-t';
      t1.style.left = isT1T2 ? '44%' : '37%';
      t1.innerHTML = formatChemLabelHtml(uniqueT[0]);
      stage.appendChild(t1);

      const t2 = document.createElement('div');
      t2.className = 'ch41-xlabel-t';
      t2.style.left = isT1T2 ? '61%' : '56%';
      t2.innerHTML = formatChemLabelHtml(uniqueT[1]);
      stage.appendChild(t2);
    }

    // 貼上右下角 X 軸變數名稱 (如 Time, Time / s, Temperature)
    if (xAxisLabel) {
      const xEl = document.createElement('div');
      xEl.className = 'ch41-xlabel-time';
      xEl.innerHTML = formatChemLabelHtml(xAxisLabel);
      stage.appendChild(xEl);
    }

    wrapper.appendChild(stage);

    // 徹底清除所有散落在外的純文字段落，絕不留下任何多餘字！
    nodesToRemove.forEach(n => n.remove());
    if (imgAnchor !== body && (imgAnchor.textContent || '').trim() === '' && imgAnchor.querySelectorAll('img').length === 0) {
      imgAnchor.remove();
    }
  }

  // ===========================================================================
  // STEP 3: 針筒實驗圖 (`ChemMCQ41020`) 2D 原位標籤重組
  // ===========================================================================
  function reconstructSyringeDiagram(body, syringeImg) {
    if (body.querySelector('.ch41-syringe-stage')) return;

    const trashKeywords = ['a gaseous mixture', 'plunger', 'rubber cap', 'gas syringe'];
    Array.from(body.querySelectorAll('p, div')).forEach(el => {
      if (el.querySelector('img')) return;
      const t = (el.textContent || '').trim().toLowerCase();
      if (trashKeywords.some(k => t.includes(k)) && t.length < 55) {
        el.remove();
      }
    });

    const stage = document.createElement('div');
    stage.className = 'ch41-syringe-stage';

    const anchor = syringeImg.closest('p, div') || syringeImg;
    anchor.parentNode.insertBefore(stage, anchor);
    stage.appendChild(syringeImg);

    const lblPlunger = document.createElement('div');
    lblPlunger.style.cssText = 'position:absolute; left:8px; top:10px; font-size:14px;';
    lblPlunger.textContent = 'plunger';

    const lblMix = document.createElement('div');
    lblMix.style.cssText = 'position:absolute; left:52%; top:6px; transform:translateX(-50%); font-size:14px; white-space:nowrap;';
    lblMix.innerHTML = 'a gaseous mixture of H<sub>2</sub>, I<sub>2</sub> and HI';

    const lblCap = document.createElement('div');
    lblCap.style.cssText = 'position:absolute; right:8px; top:10px; font-size:14px;';
    lblCap.textContent = 'rubber cap';

    const lblSyringe = document.createElement('div');
    lblSyringe.style.cssText = 'position:absolute; left:50%; bottom:4px; transform:translateX(-50%); font-size:14px;';
    lblSyringe.textContent = 'gas syringe';

    stage.appendChild(lblPlunger);
    stage.appendChild(lblMix);
    stage.appendChild(lblCap);
    stage.appendChild(lblSyringe);

    if (anchor !== body && (anchor.textContent || '').trim() === '') {
      anchor.remove();
    }
  }

  // ===========================================================================
  // STEP 4: 四格圖表選項題 (如 `ChemMCQ41019`) 2x2 + 座標軸完整重組
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
          'position:absolute; left:48%; bottom:3px; transform:translateX(-50%); font-family:"Times New Roman", serif; font-style:italic; font-size:13.5px; color:#111;';
        tLbl.textContent = 't';
        miniStage.appendChild(tLbl);
      }

      if (sharedXLabel) {
        const xLbl = document.createElement('div');
        xLbl.style.cssText =
          'position:absolute; right:4px; bottom:2px; font-family:"Times New Roman", serif; font-size:13.5px; color:#111;';
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
  // STEP 5: 修復遺失的 Qc 分式 (`ChemMCQ41025`) 與所有壓扁的 2 欄 / 4 欄選項表格
  //         (支援 ChemMCQ41026, ChemMCQ41046, ChemMCQ41048, ChemMCQ41053)
  // ===========================================================================
  function restoreFractionsAndTables(card, body, qCode) {
    const fullText = body.textContent || '';

    // 5A. 修復 ChemMCQ41025 的 Qc 分子分母上下分式
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

    // 5B. 修復 ChemMCQ41026 的 Flask 濃度表格表頭
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
          nextEl.className = 'ch41-textbook-table';
          p.remove();
        }
      }
    });

    // 5C. 通用修復所有壓扁的 2 欄選項表格：
    //     - ChemMCQ41046: Sign of ΔH | Product yield as temperature increases
    //     - ChemMCQ41048: Kc | Equilibrium position
    //     - ChemMCQ41053: Reversible reaction | Enthalpy change of reaction
    if (!body.querySelector('.ch41-aligned-opt-table')) {
      const twoColSpecs = [
        {
          match: t => t.includes('Sign of') && t.includes('Product yield'),
          h1: '<u>Sign of &Delta;<i>H</i></u>',
          h2: '<u>Product yield as temperature increases</u>',
          splitRow: raw => {
            const m = raw.match(/^([A-D]\.)\s*([\+\-\u2212])\s*(Increases|Decreases)$/i);
            return m ? [m[1], m[2], m[3]] : null;
          }
        },
        {
          match: t => /^Kc\s+Equilibrium position$/i.test(t),
          h1: '<u><i>K</i><sub>c</sub></u>',
          h2: '<u>Equilibrium position</u>',
          splitRow: raw => {
            const m = raw.match(/^([A-D]\.)\s*(Increases|Decreases|Remains unchanged)\s+(Shifts to the left|Shifts to the right|Does not shift)$/i);
            return m ? [m[1], m[2], m[3]] : null;
          }
        },
        {
          match: t => t.includes('Reversible reaction') && t.includes('Enthalpy change'),
          h1: '<u>Reversible reaction</u>',
          h2: '<u>Enthalpy change of reaction</u>',
          splitRow: (raw, html) => {
            const idx = html.search(/ΔH|&#916;H|&Delta;H/i);
            if (idx === -1) return null;
            const left = html.slice(0, idx).trim();
            const right = html.slice(idx).trim();
            const m = left.match(/^([A-D]\.)\s*(.*)/);
            return m ? [m[1], m[2], `<i>${right}</i>`] : null;
          }
        }
      ];

      const allPs = Array.from(body.querySelectorAll('p, div'));
      for (const spec of twoColSpecs) {
        const headerP = allPs.find(p => spec.match((p.textContent || '').replace(/\s+/g, ' ').trim()));
        if (!headerP) continue;

        const optPs = allPs.filter(p => /^[A-D]\.\s*/.test((p.textContent || '').trim()));
        if (optPs.length === 4) {
          const tbl = document.createElement('table');
          tbl.className = 'ch41-textbook-table ch41-aligned-opt-table';
          tbl.innerHTML = `
            <thead>
              <tr>
                <th style="width:36px;"></th>
                <th>${spec.h1}</th>
                <th>${spec.h2}</th>
              </tr>
            </thead>
            <tbody></tbody>
          `;
          const tbody = tbl.querySelector('tbody');

          let allMatched = true;
          optPs.forEach(opt => {
            const rawTxt = (opt.textContent || '').replace(/\s+/g, ' ').trim();
            const cols = spec.splitRow(rawTxt, opt.innerHTML);
            if (cols) {
              const tr = document.createElement('tr');
              tr.innerHTML = `
                <td style="text-align:left;">${cols[0]}</td>
                <td>${cols[1]}</td>
                <td>${cols[2]}</td>
              `;
              tbody.appendChild(tr);
            } else {
              allMatched = false;
            }
          });

          if (allMatched) {
            optPs.forEach(opt => opt.remove());
            headerP.replaceWith(tbl);
          }
        }
      }
    }
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
        body.dataset.ch41V61Done = '';
        processQuestionCard(card);
      });
    }

    const qNumEl = card.querySelector('.q-number');
    const qCode = qNumEl ? qNumEl.textContent.trim() : '';

    rescueEquilibriumEquations(body);
    reconstructSingle2DGraph(body, qCode);
    reconstruct2x2OptionGraphs(body);
    restoreFractionsAndTables(card, body, qCode);
  }

  function scanAllCards() {
    injectStyles();
    document.querySelectorAll('.question-card').forEach(card => {
      const body = card.querySelector('.q-native-body');
      if (body && !body.dataset.ch41V61Done) {
        body.dataset.ch41V61Done = '1';
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

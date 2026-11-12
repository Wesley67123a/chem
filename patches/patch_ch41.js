/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 41 Dedicated 2D Reconstruction Patch
 * File: patches/patch_ch41.js (v61.0 - True 2D Graph & Diagram Overlay Engine)
 * Description:
 *   Reconstructs Word floating textboxes (<w:txbxContent>) back onto their
 *   exact 2D coordinates around bare axis images (Y-axis vertical rotated
 *   labels, curve-end species labels, X-axis time/t markers, gas syringe
 *   callouts, 2x2 multi-graphs, Qc fractions, and inline ⇌ alignment).
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch41 v61.0] True 2D Graph & Equation Reconstructor Loaded.');

  // ===========================================================================
  // 1. 注入專屬 CSS 樣式（完全復刻教科書 Times New Roman 印刷質感）
  // ===========================================================================
  function injectStyles() {
    if (document.getElementById('ch41PatchV61Styles')) return;
    const style = document.createElement('style');
    style.id = 'ch41PatchV61Styles';
    style.textContent = `
      /* 拆除所有被誤加在圖片或 ⇌ 上的白框與邊框 */
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

      /* 2D 座標圖重組畫布 (模擬 Word 浮動圖層) */
      .ch41-2d-graph-stage {
        position: relative !important;
        display: inline-block !important;
        margin: 14px auto 18px auto !important;
        padding: 8px 64px 28px 38px !important;
        background: transparent !important;
        font-family: "Times New Roman", Times, serif !important;
        color: #111111 !important;
        line-height: 1.2 !important;
        box-sizing: content-box !important;
        user-select: none;
      }
      .ch41-2d-graph-stageWrapper {
        width: 100% !important;
        text-align: center !important;
        overflow-x: auto !important;
        margin: 6px 0 !important;
      }
      .ch41-2d-graph-stage > img.ch41-stage-img {
        display: block !important;
        width: 220px !important;
        max-width: none !important;
        max-height: none !important;
        height: auto !important;
        margin: 0 !important;
        object-fit: contain !important;
      }

      /* Y 軸垂直旋轉標籤 (如 Concentration / [CH3OH(g)]) */
      .ch41-ylabel-rot {
        position: absolute !important;
        left: 14px !important;
        top: 46% !important;
        transform: translate(-50%, -50%) rotate(-90deg) !important;
        transform-origin: center center !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 14px !important;
        color: #111111 !important;
      }

      /* 右側曲線末端物種標籤 (如 C(g), B(g), A(g)) */
      .ch41-curve-label {
        position: absolute !important;
        left: calc(100% - 60px) !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 14.5px !important;
        color: #111111 !important;
        transform: translateY(-50%) !important;
        text-align: left !important;
      }

      /* X 軸底部時間標籤 (t, t', Time) */
      .ch41-xlabel-time {
        position: absolute !important;
        right: 54px !important;
        bottom: 4px !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 14px !important;
        color: #111111 !important;
      }
      .ch41-xlabel-t {
        position: absolute !important;
        bottom: 5px !important;
        transform: translateX(-50%) !important;
        white-space: nowrap !important;
        font-family: "Times New Roman", Times, serif !important;
        font-style: italic !important;
        font-size: 14px !important;
        color: #111111 !important;
      }

      /* 2x2 四格濃度圖 (如 ChemMCQ41019 圖五格式) */
      .ch41-2x2-option-grid {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(210px, 1fr)) !important;
        gap: 22px 18px !important;
        width: 100% !important;
        max-width: 560px !important;
        margin: 14px auto 18px auto !important;
        box-sizing: border-box !important;
      }
      @media (max-width: 520px) {
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
        background: transparent !important;
        border: none !important;
      }
      .ch41-2x2-optletter {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        color: #111111 !important;
      }
      .ch41-2x2-miniStage {
        position: relative !important;
        display: inline-block !important;
        padding: 2px 6px 20px 22px !important;
      }
      .ch41-2x2-miniStage > img {
        display: block !important;
        width: 145px !important;
        max-width: 100% !important;
        height: auto !important;
        margin: 0 !important;
      }
      @media (max-width: 520px) {
        .ch41-2x2-miniStage > img {
          width: 118px !important;
        }
      }

      /* 氣筒實驗裝置 2D 重組畫布 (ChemMCQ41020) */
      .ch41-syringe-stage {
        position: relative !important;
        width: 320px !important;
        max-width: 96% !important;
        margin: 16px auto !important;
        padding: 36px 10px 32px 10px !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 14px !important;
        color: #111111 !important;
        text-align: center !important;
      }
      .ch41-syringe-stage > img {
        display: block !important;
        width: 240px !important;
        max-width: 90% !important;
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
        font-size: 15px !important;
        line-height: 1.1 !important;
      }
      .ch41-frac > .num {
        border-bottom: 1px solid #111111 !important;
        padding: 0 5px 2px 5px !important;
      }
      .ch41-frac > .den {
        padding: 2px 5px 0 5px !important;
      }

      /* 乾淨無框對齊表格 (如 ChemMCQ41026 & ChemMCQ41053) */
      .ch41- textbook-table {
        width: 100% !important;
        max-width: 540px !important;
        border-collapse: collapse !important;
        margin: 12px auto !important;
        font-family: "Times New Roman", Times, serif !important;
        font-size: 15px !important;
        color: #111111 !important;
      }
      .ch41-textbook-table th,
      .ch41-textbook-table td {
        padding: 6px 10px !important;
        text-align: center !important;
        vertical-align: middle !important;
        border: none !important;
      }
      .ch41-textbook-table thead th {
        border-bottom: 1.5px solid #1D1F2C !important;
        font-weight: normal !important;
        text-decoration: underline !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 輔助：將純文字化學式自動加上正確的斜體與下標 (如 A(g) -> <i>A</i>(g), Cl2(g) -> Cl<sub>2</sub>(g))
  function formatChemLabelHtml(raw) {
    if (!raw) return '';
    const t = raw.trim();
    if (/^[ABC]\(g\)$/.test(t)) {
      return `<i>${t[0]}</i>(g)`;
    }
    if (t === 't') return '<i>t</i>';
    if (t === "t'" || t === 't\u2032') return '<i>t</i>&prime;';
    if (t === 't t\'' || t === 't t\u2032') return '<i>t</i>';
    return t
      .replace(/([A-Za-z\])])(\d+)/g, '$1<sub>$2</sub>')
      .replace(/dm-3|dm−3/g, 'dm<sup>&minus;3</sup>');
  }

  function buildFrac(num, den) {
    return `<span class="ch41-frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;
  }

  // 判斷一段文字是否為化學方程式的一半
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

  // 判斷一張 <img> 是否為小尺寸的 ⇌ 符號圖片（而非大張的座標軸圖）
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
    // 1A. 若 app.js 已經先把小圖片包進了多欄 grid 或單獨白框，先把它解救出來還原成普通段落
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

      // 情況 1: app.js 因為看到圖片數量 >= 3 (例如題幹有 1 個 ⇌ 小圖 + 選項有 4 張大圖，或 3 個 ⇌ 小圖)，把所有圖片都塞進了 grid-template-columns
      if (styleAttr.includes('grid-template-columns') && imgs.length > 0) {
        const smallArrows = imgs.filter(img => isSmallArrowImage(img));
        if (smallArrows.length > 0) {
          // 把整個誤判的 Grid 拆開，將裡面的圖片放回原本的空白長條框位置或題幹中
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

      // 情況 2: 包著單張圖片或空白的長條白框 div
      if (imgs.length <= 1 && (div.textContent || '').trim() === '' && div.parentNode) {
        if (imgs.length === 1) {
          div.parentNode.insertBefore(imgs[0], div);
        }
        div.remove();
      }
    });

    // 1B. 將「跟化學式同在一個 <p> 裡的小 ⇌ 圖片」換成水平對齊的行內符號 &#8652;
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

    // 1C. 將「被斷成三行（上段反應物、中段 ⇌ 或空白框、下段生成物）」的平衡反應式合併為同一行
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
  // STEP 2: 將單張空白座標圖 + 散落的軸/曲線標籤「2D 原地重組」為圖一格式！
  //         適用於 ChemMCQ41018, ChemMCQ41028, ChemMCQ41053 等所有單圖題
  // ===========================================================================
  function reconstructSingle2DGraph(body, qCode) {
    if (body.querySelector('.ch41-2d-graph-stage')) return;

    // 找出題目內所有「非 ⇌ 符號」的真正圖表圖片
    const graphImgs = Array.from(body.querySelectorAll('img')).filter(img => !isSmallArrowImage(img));
    if (graphImgs.length !== 1) return;

    const mainImg = graphImgs[0];

    // 針筒題 (ChemMCQ41020) 交給專屬的針筒 2D 重組器處理
    const fullText = (body.textContent || '').toLowerCase();
    if (qCode === 'ChemMCQ41020' || fullText.includes('gas syringe')) {
      reconstructSyringeDiagram(body, mainImg);
      return;
    }

    // 掃描並收集圖片周圍散落的「Word 文字方塊」段落
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

      // 1. 識別 Y 軸變數標籤
      if (
        low === 'concentration' ||
        low === 'rate' ||
        low === 'reaction rate' ||
        low.startsWith('yield of product') ||
        /^\[[a-z0-9\(\)\+\-]+\]$/i.test(raw)
      ) {
        yAxisLabel = raw;
        nodesToRemove.push(el);
      }
      // 2. 識別 X 軸變數標籤
      else if (low === 'time' || low === 'temperature' || low === 'pressure') {
        xAxisLabel = raw;
        nodesToRemove.push(el);
      }
      // 3. 識別 X 軸時間點標記 (t, t', t t')
      else if (/^t(?:\s*t['\u2032]?)?$|^t['\u2032]$/.test(low)) {
        if (low.includes("'") || low.includes('\u2032')) {
          if (low.startsWith('t ') && low.length >= 3) {
            timeMarkers.push('t', "t'");
          } else {
            timeMarkers.push("t'");
          }
        } else {
          timeMarkers.push('t');
        }
        nodesToRemove.push(el);
      }
      // 4. 識別右側曲線標籤 (例如 A(g), B(g), C(g), NO(g), Cl2(g), NOCl(g), 10 atm, 30 atm, 50 atm)
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

    // 若沒有任何散落標籤，代表不需重組
    if (!yAxisLabel && !xAxisLabel && curveSpecies.length === 0 && timeMarkers.length === 0) {
      return;
    }

    // 根據題意補齊預設座標軸名稱（例如 ChemMCQ41028 的 Y 軸是 Concentration、X 軸是 Time）
    if (!yAxisLabel && fullText.includes('concentration')) yAxisLabel = 'Concentration';
    if (!xAxisLabel && (timeMarkers.length > 0 || fullText.includes('time'))) xAxisLabel = 'Time';

    // 針對已知題號調整曲線由上到下的正確順序 (100% 對應原稿圖一)
    let orderedCurves = curveSpecies.slice();
    if (qCode === 'ChemMCQ41018' || (curveSpecies.includes('A(g)') && curveSpecies.includes('C(g)'))) {
      // 圖一原稿由上到下為：C(g) [最上], B(g) [中間], A(g) [最下]
      orderedCurves = ['C(g)', 'B(g)', 'A(g)'];
    } else if (qCode === 'ChemMCQ41028' || (curveSpecies.includes('NO(g)') && curveSpecies.includes('NOCl(g)'))) {
      // ChemMCQ41028 原稿由上到下為：NO(g), Cl2(g), NOCl(g)
      orderedCurves = ['NO(g)', 'Cl2(g)', 'NOCl(g)'];
    } else if (qCode === 'ChemMCQ41053' || curveSpecies.some(s => /atm/i.test(s))) {
      // ChemMCQ41053 原稿曲線由上到下：10 atm, 30 atm, 50 atm (或依原順序)
      orderedCurves = curveSpecies;
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

    // 貼上左側垂直旋轉 -90deg 的 Y 軸標籤 (如 Concentration)
    if (yAxisLabel) {
      const yEl = document.createElement('div');
      yEl.className = 'ch41-ylabel-rot';
      yEl.innerHTML = formatChemLabelHtml(yAxisLabel);
      stage.appendChild(yEl);
    }

    // 貼上右側曲線末端標籤 (如 C(g), B(g), A(g))
    if (orderedCurves.length > 0) {
      // 根據曲線數量計算垂直高度百分比，完美對準圖中三條水平平衡線的尾端
      const topPositions =
        orderedCurves.length === 3
          ? ['24%', '64%', '82%']
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

    // 貼上底部 X 軸虛線對應的 t 與 t'
    const uniqueT = Array.from(new Set(timeMarkers));
    if (uniqueT.length === 1) {
      const tEl = document.createElement('div');
      tEl.className = 'ch41-xlabel-t';
      tEl.style.left = '43%';
      tEl.innerHTML = formatChemLabelHtml(uniqueT[0]);
      stage.appendChild(tEl);
    } else if (uniqueT.length >= 2) {
      const t1 = document.createElement('div');
      t1.className = 'ch41-xlabel-t';
      t1.style.left = '36%';
      t1.innerHTML = '<i>t</i>';
      stage.appendChild(t1);

      const t2 = document.createElement('div');
      t2.className = 'ch41-xlabel-t';
      t2.style.left = '55%';
      t2.innerHTML = '<i>t</i>&prime;';
      stage.appendChild(t2);
    }

    // 貼上右下角 X 軸變數名稱 (如 Time)
    if (xAxisLabel) {
      const xEl = document.createElement('div');
      xEl.className = 'ch41-xlabel-time';
      xEl.innerHTML = xAxisLabel;
      stage.appendChild(xEl);
    }

    wrapper.appendChild(stage);

    // 移除原本散落在外的純文字段落與空容器
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

    // 左上方：plunger
    const lblPlunger = document.createElement('div');
    lblPlunger.style.cssText = 'position:absolute; left:8px; top:10px; font-size:13.5px;';
    lblPlunger.textContent = 'plunger';

    // 正上方：a gaseous mixture of H2, I2 and HI
    const lblMix = document.createElement('div');
    lblMix.style.cssText = 'position:absolute; left:52%; top:6px; transform:translateX(-50%); font-size:13.5px; white-space:nowrap;';
    lblMix.innerHTML = 'a gaseous mixture of H<sub>2</sub>, I<sub>2</sub> and HI';

    // 右上方：rubber cap
    const lblCap = document.createElement('div');
    lblCap.style.cssText = 'position:absolute; right:8px; top:10px; font-size:13.5px;';
    lblCap.textContent = 'rubber cap';

    // 正下方：gas syringe
    const lblSyringe = document.createElement('div');
    lblSyringe.style.cssText = 'position:absolute; left:50%; bottom:4px; transform:translateX(-50%); font-size:13.5px;';
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
  // STEP 4: 四格圖表選項題 (如 `ChemMCQ41019` 圖五格式) 2x2 + 座標軸完整重組
  // ===========================================================================
  function reconstruct2x2OptionGraphs(body) {
    if (body.querySelector('.ch41-2x2-option-grid')) return;

    const allGraphImgs = Array.from(body.querySelectorAll('img')).filter(img => !isSmallArrowImage(img));
    if (allGraphImgs.length < 4) return;

    const optionImgs = allGraphImgs.slice(allGraphImgs.length - 4);

    // 偵測這 4 張小圖共用的 Y 軸與 X 軸標籤 (例如 [CH3OH(g)], time, t)
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

      // 為每一張小圖裝回左側垂直旋轉的 Y 軸標籤 (如 [CH3OH(g)])
      if (sharedYLabel) {
        const yLbl = document.createElement('div');
        yLbl.style.cssText =
          'position:absolute; left:6px; top:45%; transform:translate(-50%, -50%) rotate(-90deg); white-space:nowrap; font-family:"Times New Roman", serif; font-size:12.5px; color:#111;';
        yLbl.innerHTML = formatChemLabelHtml(sharedYLabel);
        miniStage.appendChild(yLbl);
      }

      // 為每一張小圖裝回底部虛線下的 t 與右下角的 time
      if (hasTMarker) {
        const tLbl = document.createElement('div');
        tLbl.style.cssText =
          'position:absolute; left:48%; bottom:2px; transform:translateX(-50%); font-family:"Times New Roman", serif; font-style:italic; font-size:12.5px; color:#111;';
        tLbl.textContent = 't';
        miniStage.appendChild(tLbl);
      }

      if (sharedXLabel) {
        const xLbl = document.createElement('div');
        xLbl.style.cssText =
          'position:absolute; right:4px; bottom:1px; font-family:"Times New Roman", serif; font-size:12.5px; color:#111;';
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
  // STEP 5: 修復遺失的 Qc 數學分式 (`ChemMCQ41025`) 與壓扁的表格 (`ChemMCQ41026` / `41053`)
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

    // 5C. 修復 ChemMCQ41053 的 Reversible reaction / Enthalpy change 選項表格
    if (qCode === 'ChemMCQ41053' && !body.querySelector('.ch41-table-41053')) {
      let headerP = null;
      const optPs = [];
      Array.from(body.querySelectorAll('p, div')).forEach(p => {
        const t = (p.textContent || '').trim();
        if (t.includes('Reversible reaction') && t.includes('Enthalpy change')) {
          headerP = p;
        } else if (/^[A-D]\.\s*/.test(t) && (t.includes('ΔH') || t.includes('H <') || t.includes('H >'))) {
          optPs.push(p);
        }
      });

      if (headerP && optPs.length === 4) {
        const tbl = document.createElement('table');
        tbl.className = 'ch41-textbook-table ch41-table-41053';
        tbl.innerHTML = `
          <thead>
            <tr>
              <th style="width:36px;"></th>
              <th>Reversible reaction</th>
              <th>Enthalpy change of reaction</th>
            </tr>
          </thead>
          <tbody></tbody>
        `;
        const tbody = tbl.querySelector('tbody');

        optPs.forEach(opt => {
          const html = opt.innerHTML;
          const idx = html.search(/ΔH|&#916;H|&Delta;H/i);
          if (idx !== -1) {
            const left = html.slice(0, idx).trim();
            const right = html.slice(idx).trim();
            const m = left.match(/^([A-D]\.)\s*(.*)/);
            const letter = m ? m[1] : '';
            const eqHtml = m ? m[2] : left;

            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td style="text-align:left;">${letter}</td>
              <td>${eqHtml}</td>
              <td><i>${right}</i></td>
            `;
            tbody.appendChild(tr);
            opt.remove();
          }
        });

        headerP.replaceWith(tbl);
      }
    }
  }

  // ===========================================================================
  // 主控流程：對每一張題目卡片依序執行 5 步修復
  // ===========================================================================
  function processQuestionCard(card) {
    if (!card) return;
    const body = card.querySelector('.q-native-body');
    if (!body) return;

    // 確保圖片已經載入完畢（取得正確的 naturalWidth 以區分 ⇌ 小圖與座標大圖）
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

    // 依序執行修復：
    // 1. 先把所有 ⇌ 小圖片歸位並與上下行化學式合併（防止 ⇌ 被當成圖表選項）
    rescueEquilibriumEquations(body);
    // 2. 將單張空白座標圖 + 散落文字方塊重組為 2D 原位圖表 (圖一格式)
    reconstructSingle2DGraph(body, qCode);
    // 3. 將 4 張空白選項座標圖重組為 2x2 並各自貼回 Y 軸與 X 軸標籤 (圖五格式)
    reconstruct2x2OptionGraphs(body);
    // 4. 修復遺失的 Qc 分式與壓扁的表格
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

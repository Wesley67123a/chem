/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 45 Dedicated Organic Synthesis Patch
 * File: patches/patch_ch45.js (v3.0 - Portrait Responsive Route Engine,
 *                                    Step-Pair Binding & Shared-Prefix Table Parser)
 * Target: Chapter 45 (Organic Synthesis / 有機合成)
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch45 v3.0] Portrait-Optimized Organic Synthesis & Table Engine Loaded.');

  // ===========================================================================
  // 1. 注入第 45 課專屬 CSS（修復 Flex 吃掉 sub 下標、豎屏防斷行、2x2 網格、對齊表格）
  // ===========================================================================
  function injectStyles() {
    if (document.getElementById('ch45PatchV3Styles')) return;
    const style = document.createElement('style');
    style.id = 'ch45PatchV3Styles';
    style.textContent = `
      .q-native-body img,
      .exp-body img {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        border-radius: 0 !important;
        mix-blend-mode: multiply !important;
      }

      /* 合成路線主容器：桌面與豎屏自適應 */
      .ch45-route-flow {
        display: flex !important;
        flex-wrap: wrap !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 14px 2px !important;
        margin: 14px 0 18px 0 !important;
        padding: 6px 2px !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        color: #111111 !important;
        box-sizing: border-box !important;
        width: 100% !important;
      }

      /* 將「箭頭 + 指向的物種」綁定為不可分割的組合，防止豎屏箭頭懸空 */
      .ch45-step-pair {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex-wrap: nowrap !important;
        white-space: nowrap !important;
      }

      /* 化學物種節點：內層使用 inline span 確保 sub/sup 上下標 100% 正常生效 */
      .ch45-species-node {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 2px 5px !important;
        color: #111111 !important;
      }
      .ch45-species-text {
        display: inline !important;
        font-size: 16px !important;
        line-height: 1.35 !important;
        white-space: nowrap !important;
        color: #111111 !important;
      }
      .ch45-species-text sub {
        vertical-align: sub !important;
        font-size: 0.76em !important;
        line-height: 0 !important;
      }
      .ch45-species-text sup {
        vertical-align: super !important;
        font-size: 0.76em !important;
        line-height: 0 !important;
      }
      .ch45-species-node img {
        max-height: 74px !important;
        max-width: 175px !important;
        width: auto !important;
        height: auto !important;
        display: block !important;
        margin: 0 auto !important;
        object-fit: contain !important;
      }

      /* 水平指向箭頭組件 (上方試劑 + 實線箭頭 ───► + 下方反應條件) */
      .ch45-arrow-unit {
        display: inline-flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        min-width: 78px !important;
        margin: 0 3px !important;
        flex-shrink: 0 !important;
      }
      .ch45-arrow-top {
        display: block !important;
        font-size: 13.5px !important;
        line-height: 1.25 !important;
        text-align: center !important;
        padding: 0 6px 3px 6px !important;
        min-height: 17px !important;
        white-space: nowrap !important;
        color: #111111 !important;
      }
      .ch45-arrow-shaft {
        position: relative !important;
        width: 100% !important;
        height: 1.6px !important;
        background: #111111 !important;
        margin: 1px 0 !important;
      }
      .ch45-arrow-shaft::after {
        content: "" !important;
        position: absolute !important;
        right: -1px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        width: 0 !important;
        height: 0 !important;
        border-top: 4.5px solid transparent !important;
        border-bottom: 4.5px solid transparent !important;
        border-left: 7px solid #111111 !important;
      }
      .ch45-arrow-bottom {
        display: block !important;
        font-size: 13.5px !important;
        line-height: 1.25 !important;
        text-align: center !important;
        padding: 3px 6px 0 6px !important;
        min-height: 17px !important;
        white-space: nowrap !important;
        color: #111111 !important;
      }

      /* 手機豎屏專用優化：自動微縮結構式圖片與字級，讓 2 步合成路線保持在同一橫行 */
      @media (max-width: 560px) {
        .ch45-route-flow {
          gap: 10px 1px !important;
          padding: 4px 0 !important;
        }
        .ch45-species-text {
          font-size: 14.5px !important;
        }
        .ch45-species-node {
          padding: 2px 3px !important;
        }
        .ch45-species-node img {
          max-height: 54px !important;
          max-width: 108px !important;
        }
        .ch45-arrow-unit {
          min-width: 60px !important;
          margin: 0 2px !important;
        }
        .ch45-arrow-top,
        .ch45-arrow-bottom {
          font-size: 12px !important;
          padding-left: 4px !important;
          padding-right: 4px !important;
        }
      }

      /* 2x2 四格結構式選項網格（防止 A. 的句點掉到下一行） */
      .ch45-2x2-option-grid {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(140px, 1fr)) !important;
        gap: 16px 12px !important;
        width: 100% !important;
        max-width: 580px !important;
        margin: 14px 0 18px 0 !important;
        box-sizing: border-box !important;
      }
      .ch45-2x2-cell {
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 6px !important;
        padding: 4px 4px !important;
        font-family: "Times New Roman", serif !important;
        font-size: 15.5px !important;
        color: #111111 !important;
      }
      .ch45-opt-lbl {
        white-space: nowrap !important;
        flex-shrink: 0 !important;
        display: inline-block !important;
        min-width: 20px !important;
      }
      .ch45-2x2-cell img {
        max-height: 70px !important;
        max-width: calc(100% - 28px) !important;
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
        margin: 0 !important;
      }
      @media (max-width: 520px) {
        .ch45-2x2-cell {
          font-size: 14px !important;
        }
        .ch45-2x2-cell img {
          max-height: 56px !important;
        }
      }

      /* 雙欄選擇題對齊表格 */
      table.ch45-option-table {
        width: 100% !important;
        max-width: 600px !important;
        border-collapse: collapse !important;
        margin: 12px 0 16px 0 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 15px !important;
        color: #111111 !important;
        border: none !important;
      }
      table.ch45-option-table th {
        padding: 6px 8px 8px 8px !important;
        text-align: left !important;
        vertical-align: bottom !important;
        font-weight: normal !important;
        text-decoration: underline !important;
        border: none !important;
        color: #111111 !important;
      }
      table.ch45-option-table td {
        padding: 7px 8px !important;
        text-align: left !important;
        vertical-align: top !important;
        border: none !important;
        line-height: 1.4 !important;
      }
      table.ch45-option-table th.opt-col-letter,
      table.ch45-option-table td.opt-col-letter {
        width: 28px !important;
        padding-left: 2px !important;
        padding-right: 4px !important;
        text-decoration: none !important;
        white-space: nowrap !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ===========================================================================
  // 2. 化學式與試劑條件格式化（支援 Unicode 減號 − 與上下標）
  // ===========================================================================
  function formatOrganicHtml(raw) {
    if (!raw) return '';
    const t = raw.trim();

    if (/^[A-Z]$/.test(t)) {
      return `<i>${t}</i>`;
    }
    if (/^[A-Z]\s*\+\s*[A-Z]$/.test(t)) {
      return t.replace(/([A-Z])/g, '<i>$1</i>');
    }

    const rxnMatch = t.match(/^(Reaction|Step)\s+([A-Z0-9]+)$/i);
    if (rxnMatch) {
      const label = /^[A-Z]$/.test(rxnMatch[2]) ? `<i>${rxnMatch[2]}</i>` : rxnMatch[2];
      return `${rxnMatch[1]} ${label}`;
    }

    return t
      .replace(/Cr2O7\s*(?:\^?\s*2[\-−]|2[\-−])/gi, 'Cr<sub>2</sub>O<sub>7</sub><sup>2&minus;</sup>')
      .replace(/MnO4\s*(?:\^?\s*[\-−]|[\-−])/gi, 'MnO<sub>4</sub><sup>&minus;</sup>')
      .replace(/H\+/g, 'H<sup>+</sup>')
      .replace(/OH[\-−]/g, 'OH<sup>&minus;</sup>')
      .replace(/([A-Za-z\)])(\d+)/g, '$1<sub>$2</sub>');
  }

  function createArrowUnit(topLabels = [], bottomLabels = []) {
    const unit = document.createElement('div');
    unit.className = 'ch45-arrow-unit';

    const topDiv = document.createElement('div');
    topDiv.className = 'ch45-arrow-top';
    topDiv.innerHTML = topLabels.map(formatOrganicHtml).join('<br>');

    const shaft = document.createElement('div');
    shaft.className = 'ch45-arrow-shaft';

    const botDiv = document.createElement('div');
    botDiv.className = 'ch45-arrow-bottom';
    botDiv.innerHTML = bottomLabels.map(formatOrganicHtml).join('<br>');

    unit.appendChild(topDiv);
    unit.appendChild(shaft);
    unit.appendChild(botDiv);
    return unit;
  }

  function createSpeciesNode(item) {
    const node = document.createElement('div');
    node.className = 'ch45-species-node';
    if (item.img) {
      node.appendChild(item.img);
    } else {
      const span = document.createElement('span');
      span.className = 'ch45-species-text';
      span.innerHTML = formatOrganicHtml(item.text || '');
      node.appendChild(span);
    }
    return node;
  }

  // 將 S1, S2, S3... 與 A1, A2... 組裝為帶 .ch45-step-pair 保護的路線容器
  function buildBoundRouteFlow(speciesNodes, arrowUnits) {
    const flow = document.createElement('div');
    flow.className = 'ch45-route-flow';
    if (speciesNodes.length === 0) return flow;

    // 第一個起始物種
    flow.appendChild(createSpeciesNode(speciesNodes[0]));

    // 後續每個步驟將 (Arrow + Species) 綁在同一個 .ch45-step-pair 內，徹底杜絕孤立箭頭
    for (let i = 1; i < speciesNodes.length; i++) {
      const pair = document.createElement('div');
      pair.className = 'ch45-step-pair';

      const arrowInfo = arrowUnits[i - 1] || { top: [], bottom: [] };
      pair.appendChild(createArrowUnit(arrowInfo.top, arrowInfo.bottom));
      pair.appendChild(createSpeciesNode(speciesNodes[i]));

      flow.appendChild(pair);
    }

    return flow;
  }

  // 判斷文字屬於試劑 (arrow_top)、條件 (arrow_bottom) 還是化學物種 (species)
  function classifyRouteToken(txt) {
    const t = txt.replace(/\u2212|\u2013/g, '-').replace(/\s+/g, ' ').trim();
    const low = t.toLowerCase();

    if (/^(?:reaction|step)\s+[a-z0-9]+$/i.test(t)) {
      return 'arrow_top';
    }

    if (
      /^(?:heat|reflux|heat under reflux|room temperature|r\.t\.p\.|uv|uv light|light|catalyst|excess|cold|warm)$/i.test(low) ||
      /^2\.\s*(?:nh3|h\+\(aq\)|h3o\+\(aq\)|h2o)$/i.test(low)
    ) {
      return 'arrow_bottom';
    }

    if (
      /^[123]\.\s*/.test(t) ||
      /^(?:conc\.|dil\.|dilute|acidified|alkaline|aqueous|ethanolic)\s+/i.test(low) ||
      /^(?:pcl3|pcl5|pbr3|pi3|socl2|nabh4|lialh4|cr2o7|mno4|k2cr2o7|na2cr2o7|kmno4|h2so4|hno3|hcl|hbr|hi|naoh|koh|nh3|kcn|nacn|h2,\s*pt|h2,\s*ni|h2,\s*pd|br2|cl2|h2o)/i.test(low) ||
      /^(?:h\+|oh-|naoh|koh|cl2|br2|hcl|hbr|hi)\s*(?:\([a-z]+\))?$/i.test(low) ||
      t.includes('dry ether') ||
      t.includes('/')
    ) {
      return 'arrow_top';
    }

    return 'species';
  }

  // 將散落的 arrow_top / arrow_bottom 標籤智慧歸併為獨立的箭頭步驟陣列 [{top, bottom}, ...]
  function groupArrowTokensIntoSteps(arrowTokens) {
    const steps = [];

    // 先處理含有 "1. ..." 與 "2. ..." 的配對（即使在 DOM 中被拆開也自動合併為同一支箭頭的上下方）
    const usedIndices = new Set();
    for (let i = 0; i < arrowTokens.length; i++) {
      if (usedIndices.has(i)) continue;
      const tok = arrowTokens[i];
      const txt = tok.text;

      if (/^1\.\s*/.test(txt)) {
        usedIndices.add(i);
        const step = { top: [txt], bottom: [], order: tok.idx };
        const partnerIdx = arrowTokens.findIndex(
          (other, j) => !usedIndices.has(j) && /^2\.\s*/.test(other.text)
        );
        if (partnerIdx !== -1) {
          usedIndices.add(partnerIdx);
          step.bottom.push(arrowTokens[partnerIdx].text);
          step.order = Math.min(step.order, arrowTokens[partnerIdx].idx);
        }
        steps.push(step);
      }
    }

    // 處理剩餘的試劑與條件（如試劑 + heat 合併為同一支箭頭）
    let currentStep = null;
    for (let i = 0; i < arrowTokens.length; i++) {
      if (usedIndices.has(i)) continue;
      const tok = arrowTokens[i];

      if (/^2\.\s*/.test(tok.text)) {
        // 若 2. 出現在 1. 之前且尚未配對
        const partnerIdx = arrowTokens.findIndex(
          (other, j) => !usedIndices.has(j) && j > i && /^1\.\s*/.test(other.text)
        );
        if (partnerIdx !== -1) {
          usedIndices.add(i);
          usedIndices.add(partnerIdx);
          steps.push({
            top: [arrowTokens[partnerIdx].text],
            bottom: [tok.text],
            order: tok.idx
          });
          continue;
        }
      }

      if (tok.type === 'arrow_top') {
        currentStep = { top: [tok.text], bottom: [], order: tok.idx };
        steps.push(currentStep);
      } else if (tok.type === 'arrow_bottom') {
        if (currentStep && currentStep.bottom.length === 0) {
          currentStep.bottom.push(tok.text);
        } else {
          currentStep = { top: [], bottom: [tok.text], order: tok.idx };
          steps.push(currentStep);
        }
      }
    }

    steps.sort((a, b) => a.order - b.order);
    return steps;
  }

  // ===========================================================================
  // STEP 1: 解救被 app.js 誤包進網格或白框的圖片
  // ===========================================================================
  function unwrapMisplacedContainers(container) {
    if (!container) return;
    Array.from(container.querySelectorAll('div')).forEach(div => {
      if (
        div.classList.contains('ch45-route-flow') ||
        div.classList.contains('ch45-step-pair') ||
        div.classList.contains('ch45-2x2-option-grid')
      ) {
        return;
      }
      const styleAttr = div.getAttribute('style') || '';
      const imgs = Array.from(div.querySelectorAll('img'));

      if (styleAttr.includes('grid-template-columns') && imgs.length > 0) {
        imgs.forEach(img => {
          const p = document.createElement('p');
          p.appendChild(img);
          div.parentNode.insertBefore(p, div);
        });
        div.remove();
        return;
      }

      if (imgs.length <= 1 && (div.textContent || '').trim() === '' && div.parentNode) {
        if (imgs.length === 1) div.parentNode.insertBefore(imgs[0], div);
        div.remove();
      }
    });
  }

  // ===========================================================================
  // STEP 2: 題幹合成路線重組（分離 Species 與 Arrow Steps 後 1:1 交錯組裝）
  // ===========================================================================
  function reconstructStemSyntheticRoute(body, qCode) {
    if (!body || body.querySelector('.ch45-route-flow')) return;

    const blocks = Array.from(body.children);
    const introIdx = blocks.findIndex(el =>
      /synthetic\s+route|conversion\s+scheme|following\s+conversions/i.test(el.textContent || '')
    );
    if (introIdx === -1) return;

    let endIdx = blocks.length;
    for (let i = introIdx + 1; i < blocks.length; i++) {
      const t = (blocks[i].textContent || '').trim();
      if (/^(?:Which|What|How|Identify|Name|Deduce|State|Given\s+that|In\s+which|A\.)\b/i.test(t) || t.endsWith('?')) {
        endIdx = i;
        break;
      }
    }

    const routeBlocks = blocks.slice(introIdx + 1, endIdx);
    if (routeBlocks.length < 3) return;

    const rawTexts = routeBlocks.map(el => (el.textContent || '').replace(/\u2212|\u2013/g, '-').replace(/\s+/g, ' ').trim());

    // -------------------------------------------------------------------------
    // 特例 1：ChemMCQ45010 (圖三：CH3CH=CH2 -> CH3CHClCH2Cl -> A -> B)
    // -------------------------------------------------------------------------
    if (
      qCode === 'ChemMCQ45010' ||
      (rawTexts.includes('CH3CH=CH2') && rawTexts.includes('CH3CHClCH2Cl') && rawTexts.includes('A') && rawTexts.includes('B'))
    ) {
      const flow = buildBoundRouteFlow(
        [
          { text: 'CH3CH=CH2' },
          { text: 'CH3CHClCH2Cl' },
          { text: 'A' },
          { text: 'B' }
        ],
        [
          { top: ['Cl2'], bottom: [] },
          { top: ['OH-(aq)'], bottom: ['heat'] },
          { top: ['Cr2O7^2-(aq)/H+(aq)'], bottom: ['heat'] }
        ]
      );
      routeBlocks[0].parentNode.insertBefore(flow, routeBlocks[0]);
      routeBlocks.forEach(el => el.remove());
      return;
    }

    // -------------------------------------------------------------------------
    // 特例 2：ChemMCQ45035 (C(CH3)3CHO -> X -> Y)
    // -------------------------------------------------------------------------
    if (
      qCode === 'ChemMCQ45035' ||
      (rawTexts.includes('X') && rawTexts.includes('C(CH3)3CHO') && rawTexts.includes('Y'))
    ) {
      const flow = buildBoundRouteFlow(
        [{ text: 'C(CH3)3CHO' }, { text: 'X' }, { text: 'Y' }],
        [
          { top: ['Cr2O7^2-(aq)/H+(aq)'], bottom: ['heat'] },
          { top: ['1. PCl3'], bottom: ['2. NH3'] }
        ]
      );
      routeBlocks[0].parentNode.insertBefore(flow, routeBlocks[0]);
      routeBlocks.forEach(el => el.remove());
      return;
    }

    // -------------------------------------------------------------------------
    // 通用分離式合成路線重組器（徹底解決 45001, 45002, 45004, 45014, 45026 等所有題目）
    // -------------------------------------------------------------------------
    const speciesList = [];
    const rawArrowTokens = [];

    routeBlocks.forEach((el, idx) => {
      const img = el.querySelector('img');
      const txt = (el.textContent || '').replace(/\u2212|\u2013/g, '-').replace(/\s+/g, ' ').trim();
      if (img) {
        speciesList.push({ img, isImg: true, isUnknown: false, idx });
      } else if (txt) {
        const kind = classifyRouteToken(txt);
        if (kind === 'species') {
          speciesList.push({
            text: txt,
            isImg: false,
            isUnknown: /^[A-Z](?:\s*\+\s*[A-Z])?$/.test(txt),
            idx
          });
        } else {
          rawArrowTokens.push({ type: kind, text: txt, idx });
        }
      }
    });

    const arrowSteps = groupArrowTokensIntoSteps(rawArrowTokens);

    // 檢查是否有像 ChemMCQ45004 一樣，最後一個未知字母 Y 其實是第二支箭頭上的試劑
    // 特徵：有 4 個 species（含 2 個具體化合物與 2 個單字母 X, Y），但只有 1 個 arrowStep
    if (
      speciesList.length === 4 &&
      arrowSteps.length === 1 &&
      /^[A-Z]$/.test(speciesList[speciesList.length - 1].text || '')
    ) {
      const reagentLetter = speciesList.pop();
      arrowSteps.push({ top: [reagentLetter.text], bottom: [], order: 999 });
    }

    // 修正 Word 浮動圖層 Z-Order：若具體結構圖/示性式被排在未知字母 (A, B / X, Y) 後面，自動將具體起始物移到最前面
    if (speciesList.length >= 3) {
      const concreteItems = speciesList.filter(s => !s.isUnknown);
      const unknownItems = speciesList.filter(s => s.isUnknown);

      // 情況 A：1 個具體起始物 + 2 個未知物 (如 45001, 45002, 45014, 45035)，但具體物不在第 1 個
      if (concreteItems.length === 1 && unknownItems.length >= 2 && speciesList[0].isUnknown) {
        speciesList.length = 0;
        speciesList.push(concreteItems[0], ...unknownItems);
      }
    }

    // 若像 ChemMCQ45001 一樣，題幹敘述 "reaction between X and HCl" 把第二支箭頭的 HCl 寫在問句或漏在箭頭外
    const fullBodyText = body.textContent || '';
    if (speciesList.length === 3 && arrowSteps.length === 1) {
      const mBetween = fullBodyText.match(/reaction\s+between\s+[A-Z]\s+and\s+([A-Za-z0-9\(\)]+)/i);
      if (mBetween) {
        arrowSteps.push({ top: [mBetween[1]], bottom: [] });
      }
    }

    if (speciesList.length >= 2 && arrowSteps.length >= 1) {
      const flow = buildBoundRouteFlow(speciesList, arrowSteps);
      routeBlocks[0].parentNode.insertBefore(flow, routeBlocks[0]);
      routeBlocks.forEach(el => el.remove());
    }
  }

  // ===========================================================================
  // STEP 3: 將帶結構式圖片的 A/B/C/D 選項排成整齊 2x2 網格（鎖定 A. 不斷行）
  // ===========================================================================
  function formatImageOptions2x2(body) {
    if (!body || body.querySelector('.ch45-2x2-option-grid')) return;

    const blocks = Array.from(body.children);
    const optStartIdx = blocks.findIndex(el => /^A\./.test((el.textContent || '').trim()));
    if (optStartIdx === -1) return;

    const optZone = blocks.slice(optStartIdx);
    const imgsInOptions = optZone.reduce((acc, el) => acc + el.querySelectorAll('img').length, 0);
    if (imgsInOptions < 2) return;

    const parsedOpts = { A: null, B: null, C: null, D: null };
    let currentLetter = null;

    optZone.forEach(el => {
      const txt = (el.textContent || '').trim();
      const img = el.querySelector('img');
      const m = txt.match(/^([A-D])\.\s*(.*)$/);
      if (m) {
        currentLetter = m[1];
        parsedOpts[currentLetter] = {
          letter: `${currentLetter}.`,
          img: img || null,
          html: img ? '' : formatOrganicHtml(m[2])
        };
      } else if (currentLetter && img && parsedOpts[currentLetter] && !parsedOpts[currentLetter].img) {
        parsedOpts[currentLetter].img = img;
      }
    });

    if (!parsedOpts.A || !parsedOpts.B || !parsedOpts.C || !parsedOpts.D) return;

    const grid = document.createElement('div');
    grid.className = 'ch45-2x2-option-grid';

    ['A', 'B', 'C', 'D'].forEach(letter => {
      const item = parsedOpts[letter];
      const cell = document.createElement('div');
      cell.className = 'ch45-2x2-cell';

      const lbl = document.createElement('span');
      lbl.className = 'ch45-opt-lbl';
      lbl.textContent = item.letter;
      cell.appendChild(lbl);

      if (item.img) {
        cell.appendChild(item.img);
      } else {
        const span = document.createElement('span');
        span.className = 'ch45-species-text';
        span.innerHTML = item.html;
        cell.appendChild(span);
      }
      grid.appendChild(cell);
    });

    optZone[0].parentNode.insertBefore(grid, optZone[0]);
    optZone.forEach(el => el.remove());
  }

  // ===========================================================================
  // STEP 4: 雙欄純文字選擇題轉標準 3 欄 HTML Table
  //         支援單字母表頭 (A B / X Y) 與「成對選項共同前綴切割演算法」
  // ===========================================================================
  function convertTwoColumnOptionsToTable(body) {
    if (!body || body.querySelector('.ch45-option-table') || body.querySelector('.ch45-2x2-option-grid')) return;

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

    function splitHeader(plain, rawHtml) {
      const rules = [
        /^([A-Z])\s+([A-Z])$/, // 支援單字母表頭如 "A B", "X Y", "P Q" (解決圖四 45014 & 圖五 45004)
        /^(Reagent\s+used\s+in\s+step\s+1)\s+(Reagent\s+used\s+in\s+step\s+2)$/i,
        /^(Reaction\s+[A1])\s+(Reaction\s+[B2])$/i,
        /^(Step\s+[1I])\s+(Step\s+[2II])$/i,
        /^(Reagent(?:\s+in\s+step\s+1)?)\s+(Condition|Reagent.*)$/i,
        /^(Product\s+[A-Z]|Compound\s+[A-Z])\s+(Product\s+[A-Z]|Compound\s+[A-Z])$/i,
        /^(Type\s+of\s+reaction)\s+(Reagent.*)$/i
      ];
      for (const r of rules) {
        const m = plain.match(r);
        if (m) return [formatOrganicHtml(m[1]), formatOrganicHtml(m[2])];
      }

      const rawParts = rawHtml.split(/(?:&nbsp;|\u00A0|\t|\s){2,}/);
      if (rawParts.length >= 2 && rawParts[0].trim() && rawParts[1].trim()) {
        return [rawParts[0].trim(), rawParts.slice(1).join(' ').trim()];
      }
      return null;
    }

    const headerCols = splitHeader(headerClean, headerEl.innerHTML.trim());
    if (!headerCols) return;

    // 輔助：找出兩個選項字串共享的「以空白為邊界的最長共同前綴」（即第 1 欄！）
    function findSharedWordPrefix(s1, s2) {
      const w1 = s1.split(' ');
      const w2 = s2.split(' ');
      const common = [];
      const minLen = Math.min(w1.length, w2.length);
      for (let i = 0; i < minLen - 1; i++) {
        if (w1[i] === w2[i]) {
          common.push(w1[i]);
        } else {
          break;
        }
      }
      return common.length > 0 ? common.join(' ') : null;
    }

    const texts = {
      A: optNodes.A.cleanText,
      B: optNodes.B.cleanText,
      C: optNodes.C.cleanText,
      D: optNodes.D.cleanText
    };

    // 自動計算 (A,B)/(C,D) 或 (A,C)/(B,D) 的共同第 1 欄前綴
    const prefixAB = findSharedWordPrefix(texts.A, texts.B);
    const prefixCD = findSharedWordPrefix(texts.C, texts.D);
    const prefixAC = findSharedWordPrefix(texts.A, texts.C);
    const prefixBD = findSharedWordPrefix(texts.B, texts.D);

    const detectedCol1 = {};
    if (prefixAB && prefixCD) {
      detectedCol1.A = prefixAB;
      detectedCol1.B = prefixAB;
      detectedCol1.C = prefixCD;
      detectedCol1.D = prefixCD;
    } else if (prefixAC && prefixBD) {
      detectedCol1.A = prefixAC;
      detectedCol1.C = prefixAC;
      detectedCol1.B = prefixBD;
      detectedCol1.D = prefixBD;
    }

    function splitOptionRow(letter, plain, rawHtml) {
      // 1. 若共同前綴演算法已精準鎖定第 1 欄，直接按前綴長度切開！
      const col1Prefix = detectedCol1[letter];
      if (col1Prefix && plain.startsWith(col1Prefix + ' ')) {
        const col2 = plain.slice(col1Prefix.length).trim();
        if (col2) {
          return [formatOrganicHtml(col1Prefix), formatOrganicHtml(col2)];
        }
      }

      const cleanHtml = rawHtml.replace(/^[A-D]\.\s*/, '').trim();

      // 2. HTML 連續空白 / &nbsp; / Tab
      const rawParts = cleanHtml.split(/(?:&nbsp;|\u00A0|\t|\s){2,}/);
      if (rawParts.length >= 2 && rawParts[0].trim() && rawParts[1].trim()) {
        return [rawParts[0].trim(), rawParts.slice(1).join(' ').trim()];
      }

      // 3. 常見試劑名稱邊界切割
      const reagentBoundary = plain.match(
        /^(.+?\b(?:solution|acid|ether|heat|reflux|trichloride|pentachloride|borohydride|permanganate|dichromate|hydroxide|ammonia|bromine|hydrogen))\s+((?:Acidified|Sodium|Potassium|Concentrated|Dilute|Lithium|Phosphorus|Aqueous|Ethanolic|Bromine|Hydrogen|Heat|Reflux).+)$/i
      );
      if (reagentBoundary) {
        return [reagentBoundary[1].trim(), reagentBoundary[2].trim()];
      }

      // 4. 單一空格分隔的兩個獨立詞彙/化學式
      const twoTokens = plain.split(/\s+/);
      if (twoTokens.length === 2) {
        return [formatOrganicHtml(twoTokens[0]), formatOrganicHtml(twoTokens[1])];
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
    table.className = 'ch45-option-table';
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
  // STEP 5: 修復解析區 (.exp-body) 散落的多步有機合成路線
  // ===========================================================================
  function patchExplanationSyntheticRoute(expBody, qCode) {
    if (!expBody || expBody.dataset.ch45ExpV3Done) return;
    expBody.dataset.ch45ExpV3Done = '1';

    unwrapMisplacedContainers(expBody);

    const blocks = Array.from(expBody.children);
    const expText = expBody.textContent || '';
    const imgs = Array.from(expBody.querySelectorAll('img'));
    const ansEl = blocks.find(el => /^Answer:/i.test((el.textContent || '').trim()));

    // 特例 1：ChemMCQ45005 解析區 (2-bromobutane -> butan-2-ol -> butanone)
    if (
      qCode === 'ChemMCQ45005' ||
      (imgs.length === 3 && expText.includes('OH') && expText.includes('Cr2O7') && !expText.includes('Cl'))
    ) {
      const flow = buildBoundRouteFlow(
        [{ img: imgs[0] }, { img: imgs[1] }, { img: imgs[2] }],
        [
          { top: ['OH-(aq)'], bottom: ['heat'] },
          { top: ['Cr2O7^2-(aq)/H+(aq)'], bottom: ['heat'] }
        ]
      );

      if (ansEl && ansEl.nextSibling) {
        expBody.insertBefore(flow, ansEl.nextSibling);
      } else {
        expBody.appendChild(flow);
      }
      blocks.forEach(el => {
        if (el !== ansEl && el !== flow) el.remove();
      });
      return;
    }

    // 特例 2：ChemMCQ45006 解析區 (Propanamide -> Propanoic acid -> CH3CH2CH2OH -> CH3CH=CH2 -> CH3CH2CH3)
    if (
      qCode === 'ChemMCQ45006' ||
      (imgs.length === 2 && expText.includes('CH3CH2CH2OH') && expText.includes('CH3CH=CH2') && expText.includes('CH3CH2CH3'))
    ) {
      const flow = buildBoundRouteFlow(
        [
          { img: imgs[0] },
          { img: imgs[1] },
          { text: 'CH3CH2CH2OH' },
          { text: 'CH3CH=CH2' },
          { text: 'CH3CH2CH3' }
        ],
        [
          { top: ['H+(aq)'], bottom: ['heat'] },
          { top: ['1. LiAlH4, dry ether'], bottom: ['2. H+(aq)'] },
          { top: ['conc. H2SO4'], bottom: ['heat'] },
          { top: ['H2, Pt'], bottom: [] }
        ]
      );

      if (ansEl && ansEl.nextSibling) {
        expBody.insertBefore(flow, ansEl.nextSibling);
      } else {
        expBody.appendChild(flow);
      }
      blocks.forEach(el => {
        if (el !== ansEl && el !== flow) el.remove();
      });
      return;
    }

    // 通用解析區多步路線重組（如圖一 1,2-dichlorobutane -> butane-2,3-diol -> butanedione 等）
    const contentBlocks = blocks.filter(el => el !== ansEl);
    if (contentBlocks.length >= 3) {
      const speciesList = [];
      const rawArrowTokens = [];
      let hasProse = false;

      contentBlocks.forEach((el, idx) => {
        const img = el.querySelector('img');
        const txt = (el.textContent || '').replace(/\u2212|\u2013/g, '-').replace(/\s+/g, ' ').trim();
        if (img) {
          speciesList.push({ img });
        } else if (txt) {
          if (txt.length > 55 || /\b(?:because|therefore|reacts|reduces|oxidizes|gives|forms)\b/i.test(txt)) {
            hasProse = true;
          } else {
            const kind = classifyRouteToken(txt);
            if (kind === 'species') {
              speciesList.push({ text: txt });
            } else {
              rawArrowTokens.push({ type: kind, text: txt, idx });
            }
          }
        }
      });

      if (!hasProse && speciesList.length >= 2 && rawArrowTokens.length >= 1) {
        const arrowSteps = groupArrowTokensIntoSteps(rawArrowTokens);
        const flow = buildBoundRouteFlow(speciesList, arrowSteps);
        contentBlocks[0].parentNode.insertBefore(flow, contentBlocks[0]);
        contentBlocks.forEach(el => el.remove());
      }
    }
  }

  // ===========================================================================
  // 主控流程：同步處理第 45 課題幹 (.q-native-body) 與解析 (.exp-body)
  // ===========================================================================
  function processQuestionCard(card) {
    if (!card) return;
    const qNumEl = card.querySelector('.q-number');
    const qCode = qNumEl ? qNumEl.textContent.trim() : '';
    if (qCode && !qCode.startsWith('ChemMCQ45')) return;

    const body = card.querySelector('.q-native-body');
    const expBody = card.querySelector('.exp-body');

    if (body && !body.dataset.ch45V3Done) {
      body.dataset.ch45V3Done = '1';
      unwrapMisplacedContainers(body);
      reconstructStemSyntheticRoute(body, qCode);
      formatImageOptions2x2(body);
      convertTwoColumnOptionsToTable(body);
    }

    if (expBody && !expBody.dataset.ch45ExpV3Done) {
      patchExplanationSyntheticRoute(expBody, qCode);
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

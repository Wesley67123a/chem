/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 45 Dedicated Organic Synthesis Patch
 * File: patches/patch_ch45.js (v2.0 - Zero-Bug Synthetic Route Reconstructor,
 *                                    Z-Order Auto-Fix, 2x2 Options & Option Tables)
 * Target: Chapter 45 (Organic Synthesis / 有機合成)
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch45 v2.0] Zero-Bug Organic Synthesis & Layout Engine Loaded.');

  // ===========================================================================
  // 1. 注入第 45 課專屬 CSS（結構式透明無白底、水平合成路線、2x2 結構圖選項、對齊表格）
  // ===========================================================================
  function injectStyles() {
    if (document.getElementById('ch45PatchV2Styles')) return;
    const style = document.createElement('style');
    style.id = 'ch45PatchV2Styles';
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

      /* 合成路線主容器（自動換行、左對齊或置中流暢銜接） */
      .ch45-route-flow {
        display: flex !important;
        flex-wrap: wrap !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 16px 4px !important;
        margin: 14px 0 18px 0 !important;
        padding: 6px 2px !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        color: #111111 !important;
        box-sizing: border-box !important;
      }

      /* 化學物種節點 (結構式圖片 / 示性式 / A, B, X, Y) */
      .ch45-species-node {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 16px !important;
        line-height: 1.4 !important;
        padding: 2px 6px !important;
        color: #111111 !important;
        white-space: nowrap !important;
      }
      .ch45-species-node img {
        max-height: 78px !important;
        max-width: 195px !important;
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
        min-width: 82px !important;
        margin: 0 4px !important;
      }
      .ch45-arrow-top {
        font-size: 13.5px !important;
        line-height: 1.25 !important;
        text-align: center !important;
        padding: 0 8px 3px 8px !important;
        min-height: 18px !important;
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
        border-left: 7.5px solid #111111 !important;
      }
      .ch45-arrow-bottom {
        font-size: 13.5px !important;
        line-height: 1.25 !important;
        text-align: center !important;
        padding: 3px 8px 0 8px !important;
        min-height: 18px !important;
        white-space: nowrap !important;
        color: #111111 !important;
      }

      /* 2x2 四格結構式選項網格 (徹底解決圖二 ChemMCQ45002 A/B 橫向擠壓貼在一起的問題) */
      .ch45-2x2-option-grid {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(150px, 1fr)) !important;
        gap: 18px 14px !important;
        width: 100% !important;
        max-width: 580px !important;
        margin: 14px 0 18px 0 !important;
        box-sizing: border-box !important;
      }
      .ch45-2x2-cell {
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 8px !important;
        padding: 4px 6px !important;
        font-family: "Times New Roman", serif !important;
        font-size: 15.5px !important;
        color: #111111 !important;
        overflow-x: auto !important;
      }
      .ch45-2x2-cell img {
        max-height: 76px !important;
        max-width: 155px !important;
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
        margin: 0 !important;
      }

      /* 雙欄選擇題對齊表格 (解決圖一 ChemMCQ45005 與 ChemMCQ45026 兩欄文字重疊擠壓) */
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
        padding: 6px 10px 8px 10px !important;
        text-align: left !important;
        vertical-align: bottom !important;
        font-weight: normal !important;
        text-decoration: underline !important;
        border: none !important;
        color: #111111 !important;
      }
      table.ch45-option-table td {
        padding: 8px 10px !important;
        text-align: left !important;
        vertical-align: top !important;
        border: none !important;
        line-height: 1.45 !important;
      }
      table.ch45-option-table th.opt-col-letter,
      table.ch45-option-table td.opt-col-letter {
        width: 30px !important;
        padding-left: 2px !important;
        padding-right: 4px !important;
        text-decoration: none !important;
        white-space: nowrap !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ===========================================================================
  // 2. 化學式與試劑條件格式化（確保 CH3CH2CH2OH 等全部帶有正確下標與離子電荷）
  // ===========================================================================
  function formatOrganicHtml(raw) {
    if (!raw) return '';
    const t = raw.trim();

    // 單一未知代號 A, B, X, Y, Z, P, Q, R, W -> 斜體
    if (/^[A-Z]$/.test(t)) {
      return `<i>${t}</i>`;
    }

    const rxnMatch = t.match(/^(Reaction|Step)\s+([A-Z0-9]+)$/i);
    if (rxnMatch) {
      const label = /^[A-Z]$/.test(rxnMatch[2]) ? `<i>${rxnMatch[2]}</i>` : rxnMatch[2];
      return `${rxnMatch[1]} ${label}`;
    }

    return t
      .replace(/Cr2O7\^?2-/gi, 'Cr<sub>2</sub>O<sub>7</sub><sup>2&minus;</sup>')
      .replace(/MnO4\^?-/gi, 'MnO<sub>4</sub><sup>&minus;</sup>')
      .replace(/H\+/g, 'H<sup>+</sup>')
      .replace(/OH-/g, 'OH<sup>&minus;</sup>')
      .replace(/([A-Za-z\])])(\d+)/g, '$1<sub>$2</sub>');
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
      node.innerHTML = formatOrganicHtml(item.text || '');
    }
    return node;
  }

  // 完整有機試劑與反應條件分類器（包含 PBr3, OH-(aq), NaOH, H+/heat 等所有試劑）
  function classifyRouteToken(txt) {
    const t = txt.replace(/\s+/g, ' ').trim();
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
      /^(?:conc\.|dil\.|dilute|acidified|alkaline)\s+/i.test(low) ||
      /^(?:pcl3|pcl5|pbr3|pi3|socl2|nabh4|lialh4|cr2o7|mno4|h2so4|hcl|hbr|hi|naoh|koh|nh3|h2,\s*pt|h2,\s*ni|h2,\s*pd|br2|cl2|h2o)/i.test(low) ||
      /^(?:h\+|oh-|naoh|koh)\s*\((?:aq|alc)\)$/i.test(low) ||
      t.includes('dry ether') ||
      t.includes('/')
    ) {
      return 'arrow_top';
    }

    return 'species';
  }

  // ===========================================================================
  // STEP 1: 解救被 app.js 誤包進網格或白框的圖片
  // ===========================================================================
  function unwrapMisplacedContainers(container) {
    if (!container) return;
    Array.from(container.querySelectorAll('div')).forEach(div => {
      if (div.classList.contains('ch45-route-flow') || div.classList.contains('ch45-2x2-option-grid')) return;
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
  // STEP 2: 題幹合成路線重組（自動修正 Word 浮動文字方塊 Z-Order 倒置）
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
      if (/^(?:Which|What|How|Identify|Name|Deduce|State|In\s+which|A\.)\b/i.test(t) || t.endsWith('?')) {
        endIdx = i;
        break;
      }
    }

    const routeBlocks = blocks.slice(introIdx + 1, endIdx);
    if (routeBlocks.length < 3) return;

    const rawTexts = routeBlocks.map(el => (el.textContent || '').replace(/\s+/g, ' ').trim());

    // 特例 1：ChemMCQ45035 (C(CH3)3CHO -> X -> Y)
    if (
      qCode === 'ChemMCQ45035' ||
      (rawTexts.includes('X') && rawTexts.includes('C(CH3)3CHO') && rawTexts.includes('Y'))
    ) {
      const flow = document.createElement('div');
      flow.className = 'ch45-route-flow';
      flow.appendChild(createSpeciesNode({ text: 'C(CH3)3CHO' }));
      flow.appendChild(createArrowUnit(['Cr2O7^2-(aq)/H+(aq)'], ['heat']));
      flow.appendChild(createSpeciesNode({ text: 'X' }));
      flow.appendChild(createArrowUnit(['1. PCl3'], ['2. NH3']));
      flow.appendChild(createSpeciesNode({ text: 'Y' }));

      routeBlocks[0].parentNode.insertBefore(flow, routeBlocks[0]);
      routeBlocks.forEach(el => el.remove());
      return;
    }

    // 通用合成路線解析（含自動修復圖二 ChemMCQ45002 起始結構式跑到最後一格的 Z-Order Bug！）
    const tokens = [];
    routeBlocks.forEach(el => {
      const img = el.querySelector('img');
      const txt = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (img) {
        tokens.push({ type: 'species', img, isImg: true });
      } else if (txt) {
        tokens.push({ type: classifyRouteToken(txt), text: txt, isUnknownLetter: /^[A-Z]$/.test(txt) });
      }
    });

    // 修正 Z-Order 倒置情況 A：起始具體結構式圖片 (img) 被 Word 排在最後一個，而第一個物種是未知字母 A 或 X
    const firstSpeciesIdx = tokens.findIndex(t => t.type === 'species');
    const lastToken = tokens[tokens.length - 1];
    if (
      firstSpeciesIdx !== -1 &&
      tokens[firstSpeciesIdx].isUnknownLetter &&
      lastToken &&
      lastToken.isImg
    ) {
      const startingImgToken = tokens.pop();
      tokens.unshift(startingImgToken);
    }

    // 修正 Z-Order 倒置情況 B：前兩個物種是「未知字母 X」接「具體化合物」，自動對調
    const speciesList = tokens.filter(t => t.type === 'species');
    if (
      speciesList.length >= 3 &&
      speciesList[0].isUnknownLetter &&
      !speciesList[1].isUnknownLetter &&
      speciesList[2].isUnknownLetter
    ) {
      const idx0 = tokens.indexOf(speciesList[0]);
      const idx1 = tokens.indexOf(speciesList[1]);
      const tmp = tokens[idx0];
      tokens[idx0] = tokens[idx1];
      tokens[idx1] = tmp;
    }

    const flow = document.createElement('div');
    flow.className = 'ch45-route-flow';

    let pendingTop = [];
    let pendingBottom = [];
    let hasPlacedFirstSpecies = false;

    tokens.forEach(tok => {
      if (tok.type === 'arrow_top') {
        pendingTop.push(tok.text);
      } else if (tok.type === 'arrow_bottom') {
        pendingBottom.push(tok.text);
      } else if (tok.type === 'species') {
        if (hasPlacedFirstSpecies) {
          flow.appendChild(createArrowUnit(pendingTop, pendingBottom));
          pendingTop = [];
          pendingBottom = [];
        }
        flow.appendChild(createSpeciesNode(tok));
        hasPlacedFirstSpecies = true;
      }
    });

    if (flow.querySelectorAll('.ch45-arrow-unit').length > 0) {
      routeBlocks[0].parentNode.insertBefore(flow, routeBlocks[0]);
      routeBlocks.forEach(el => el.remove());
    }
  }

  // ===========================================================================
  // STEP 3: 將帶結構式圖片的 A/B/C/D 選項排成整齊 2x2 網格 (解決圖二 A/B 橫向擠壓)
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
      lbl.textContent = item.letter;
      cell.appendChild(lbl);

      if (item.img) {
        cell.appendChild(item.img);
      } else {
        const span = document.createElement('span');
        span.innerHTML = item.html;
        cell.appendChild(span);
      }
      grid.appendChild(cell);
    });

    optZone[0].parentNode.insertBefore(grid, optZone[0]);
    optZone.forEach(el => el.remove());
  }

  // ===========================================================================
  // STEP 4: 雙欄純文字選擇題轉標準 3 欄 HTML Table (解決圖一 ChemMCQ45005 選項重疊)
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
        /^(Reagent\s+used\s+in\s+step\s+1)\s+(Reagent\s+used\s+in\s+step\s+2)$/i,
        /^(Reaction\s+[A1])\s+(Reaction\s+[B2])$/i,
        /^(Step\s+[1I])\s+(Step\s+[2II])$/i,
        /^(Reagent(?:\s+in\s+step\s+1)?)\s+(Condition|Reagent.*)$/i,
        /^(Product\s+X|Compound\s+X|X)\s+(Product\s+Y|Compound\s+Y|Y)$/i
      ];
      for (const r of rules) {
        const m = plain.match(r);
        if (m) return [formatOrganicHtml(m[1]), formatOrganicHtml(m[2])];
      }

      const rawParts = rawHtml.split(/(?:&nbsp;|\u00A0|\t|\s){3,}/);
      if (rawParts.length >= 2 && rawParts[0].trim() && rawParts[1].trim()) {
        return [rawParts[0].trim(), rawParts.slice(1).join(' ').trim()];
      }
      return null;
    }

    function splitOptionRow(plain, rawHtml) {
      const cleanHtml = rawHtml.replace(/^[A-D]\.\s*/, '').trim();

      // 1. 先嘗試用 HTML 中的連續空白 / &nbsp; / Tab 分隔
      const rawParts = cleanHtml.split(/(?:&nbsp;|\u00A0|\t|\s){2,}/);
      if (rawParts.length >= 2 && rawParts[0].trim() && rawParts[1].trim()) {
        return [rawParts[0].trim(), rawParts.slice(1).join(' ').trim()];
      }

      // 2. 針對單空白黏在一起的常見雙欄試劑名稱進行精準切割 (解決圖一 D 選項兩欄貼死的問題)
      const reagentBoundary = plain.match(
        /^(.+?\b(?:solution|acid|ether|heat|reflux|trichloride|pentachloride|borohydride|permanganate|dichromate|hydroxide|ammonia|bromine|hydrogen))\s+((?:Acidified|Sodium|Potassium|Concentrated|Dilute|Lithium|Phosphorus|Aqueous|Ethanolic|Bromine|Hydrogen|Heat|Reflux).+)$/i
      );
      if (reagentBoundary) {
        return [reagentBoundary[1].trim(), reagentBoundary[2].trim()];
      }

      // 3. 有機反應類型雙詞配對
      const rxnTypes =
        '(?:Addition|Substitution|Dehydration|Hydrogenation|Oxidation|Reduction|Hydrolysis|Esterification|Condensation|Elimination|Neutralization|Polymerization)';
      const mType = plain.match(new RegExp(`^(${rxnTypes})\\s+(${rxnTypes})$`, 'i'));
      if (mType) {
        return [mType[1], mType[2]];
      }

      return null;
    }

    const headerCols = splitHeader(headerClean, headerEl.innerHTML.trim());
    if (!headerCols) return;

    const rows = [];
    for (const letter of ['A', 'B', 'C', 'D']) {
      const item = optNodes[letter];
      const cols = splitOptionRow(item.cleanText, item.rawHtml);
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
  // STEP 5: 修復解析區 (.exp-body) 散落的多步有機合成路線 (解決圖一 45005 & 圖三 45006)
  // ===========================================================================
  function patchExplanationSyntheticRoute(expBody, qCode) {
    if (!expBody || expBody.dataset.ch45ExpV2Done) return;
    expBody.dataset.ch45ExpV2Done = '1';

    unwrapMisplacedContainers(expBody);

    const blocks = Array.from(expBody.children);
    const expText = expBody.textContent || '';
    const imgs = Array.from(expBody.querySelectorAll('img'));
    const ansEl = blocks.find(el => /^Answer:/i.test((el.textContent || '').trim()));

    // -------------------------------------------------------------------------
    // 特例 1：ChemMCQ45005 解析區 (圖一：2-bromobutane -> butan-2-ol -> butanone)
    // 修正 Word 把 OH-(aq) 與 Cr2O7^2-/H+ 試劑順序倒置的 Bug！
    // -------------------------------------------------------------------------
    if (
      qCode === 'ChemMCQ45005' ||
      (imgs.length === 3 && expText.includes('OH') && expText.includes('Cr2O7'))
    ) {
      const flow = document.createElement('div');
      flow.className = 'ch45-route-flow';

      // Step 1: 2-bromobutane (imgs[0]) —[OH-(aq), heat]→ butan-2-ol (imgs[1])
      flow.appendChild(createSpeciesNode({ img: imgs[0] }));
      flow.appendChild(createArrowUnit(['OH-(aq)'], ['heat']));
      flow.appendChild(createSpeciesNode({ img: imgs[1] }));

      // Step 2: butan-2-ol —[Cr2O7^2-(aq)/H+(aq), heat]→ butanone (imgs[2])
      flow.appendChild(createArrowUnit(['Cr2O7^2-(aq)/H+(aq)'], ['heat']));
      flow.appendChild(createSpeciesNode({ img: imgs[2] }));

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

    // -------------------------------------------------------------------------
    // 特例 2：ChemMCQ45006 解析區 (圖三：補齊所有下標並串接 4 步路線)
    // -------------------------------------------------------------------------
    if (
      qCode === 'ChemMCQ45006' ||
      (imgs.length === 2 && expText.includes('CH3CH2CH2OH') && expText.includes('CH3CH=CH2') && expText.includes('CH3CH2CH3'))
    ) {
      const flow = document.createElement('div');
      flow.className = 'ch45-route-flow';

      flow.appendChild(createSpeciesNode({ img: imgs[0] }));
      flow.appendChild(createArrowUnit(['H+(aq)'], ['heat']));
      flow.appendChild(createSpeciesNode({ img: imgs[1] }));
      flow.appendChild(createArrowUnit(['1. LiAlH4, dry ether'], ['2. H+(aq)']));
      flow.appendChild(createSpeciesNode({ text: 'CH3CH2CH2OH' }));
      flow.appendChild(createArrowUnit(['conc. H2SO4'], ['heat']));
      flow.appendChild(createSpeciesNode({ text: 'CH3CH=CH2' }));
      flow.appendChild(createArrowUnit(['H2, Pt'], []));
      flow.appendChild(createSpeciesNode({ text: 'CH3CH2CH3' }));

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

    // -------------------------------------------------------------------------
    // 通用解析區多步路線重組
    // -------------------------------------------------------------------------
    const contentBlocks = blocks.filter(el => el !== ansEl);
    if (contentBlocks.length >= 3) {
      const classified = contentBlocks.map(el => {
        const img = el.querySelector('img');
        const txt = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (img) return { el, type: 'species', img };
        if (!txt || txt.length > 55) return { el, type: 'prose', text: txt };
        return { el, type: classifyRouteToken(txt), text: txt };
      });

      const hasArrowTokens = classified.some(c => c.type === 'arrow_top' || c.type === 'arrow_bottom');
      const hasProse = classified.some(c => c.type === 'prose');

      if (hasArrowTokens && !hasProse) {
        const flow = document.createElement('div');
        flow.className = 'ch45-route-flow';
        let pendingTop = [];
        let pendingBottom = [];
        let started = false;

        classified.forEach(item => {
          if (item.type === 'arrow_top') {
            pendingTop.push(item.text);
          } else if (item.type === 'arrow_bottom') {
            pendingBottom.push(item.text);
          } else if (item.type === 'species') {
            if (started) {
              flow.appendChild(createArrowUnit(pendingTop, pendingBottom));
              pendingTop = [];
              pendingBottom = [];
            }
            flow.appendChild(createSpeciesNode(item));
            started = true;
          }
        });

        if (flow.querySelectorAll('.ch45-arrow-unit').length > 0) {
          contentBlocks[0].parentNode.insertBefore(flow, contentBlocks[0]);
          contentBlocks.forEach(el => el.remove());
        }
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

    if (body && !body.dataset.ch45V2Done) {
      body.dataset.ch45V2Done = '1';
      unwrapMisplacedContainers(body);
      reconstructStemSyntheticRoute(body, qCode);
      formatImageOptions2x2(body);
      convertTwoColumnOptionsToTable(body);
    }

    if (expBody && !expBody.dataset.ch45ExpV2Done) {
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

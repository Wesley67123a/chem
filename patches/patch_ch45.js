/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Chapter 45 Dedicated Organic Synthesis Patch
 * File: patches/patch_ch45.js (v1.0 - Synthetic Route Arrow Reconstructor,
 *                                    Multi-Step Pathway & Option Table Engine)
 * Target: Chapter 45 (Organic Synthesis / 有機合成)
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch Ch45 v1.0] Organic Synthesis Route & Arrow Engine Loaded.');

  // ===========================================================================
  // 1. 注入第 45 課專屬 CSS（水平合成路線箭頭 ───►、試劑上下對齊、選項表格）
  // ===========================================================================
  function injectStyles() {
    if (document.getElementById('ch45PatchV1Styles')) return;
    const style = document.createElement('style');
    style.id = 'ch45PatchV1Styles';
    style.textContent = `
      .q-native-body img,
      .exp-body img {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        border-radius: 0 !important;
      }

      /* 行內反應箭頭 (→ / ⇌) 水平對齊 */
      .ch45-inline-arrow {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        vertical-align: middle !important;
        margin: 0 6px !important;
        font-family: "Times New Roman", Cambria, serif !important;
        font-size: 18px !important;
        line-height: 1 !important;
        color: #111111 !important;
      }

      /* 合成路線主容器 (自動換行、置中對齊) */
      .ch45-route-flow {
        display: flex !important;
        flex-wrap: wrap !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 14px 4px !important;
        margin: 14px 0 18px 0 !important;
        padding: 6px 2px !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        color: #111111 !important;
        box-sizing: border-box !important;
      }

      /* 化學物種節點 (結構式圖片 / 示性式 / X, Y) */
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
        max-height: 86px !important;
        max-width: 210px !important;
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
        min-width: 84px !important;
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

      /* 雙欄選擇題對齊表格 (如 ChemMCQ45026: Reaction A | Reaction B) */
      table.ch45-option-table {
        width: 100% !important;
        max-width: 560px !important;
        border-collapse: collapse !important;
        margin: 12px 0 16px 0 !important;
        font-family: "Times New Roman", "Noto Serif TC", serif !important;
        font-size: 15.5px !important;
        color: #111111 !important;
        border: none !important;
      }
      table.ch45-option-table th {
        padding: 6px 14px 8px 14px !important;
        text-align: left !important;
        vertical-align: bottom !important;
        font-weight: normal !important;
        text-decoration: underline !important;
        border: none !important;
        color: #111111 !important;
      }
      table.ch45-option-table td {
        padding: 7px 14px !important;
        text-align: left !important;
        vertical-align: middle !important;
        border: none !important;
        line-height: 1.45 !important;
      }
      table.ch45-option-table th.opt-col-letter,
      table.ch45-option-table td.opt-col-letter {
        width: 34px !important;
        padding-left: 2px !important;
        padding-right: 6px !important;
        text-decoration: none !important;
        white-space: nowrap !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ===========================================================================
  // 2. 化學式與試劑條件格式化輔助函式
  // ===========================================================================
  function formatOrganicHtml(raw) {
    if (!raw) return '';
    const t = raw.trim();

    // 單一未知代號 X, Y, Z, P, Q, R, W -> 斜體
    if (/^[A-Z]$/.test(t)) {
      return `<i>${t}</i>`;
    }

    // "Reaction A" / "Reaction B" / "Step 1"
    const rxnMatch = t.match(/^(Reaction|Step)\s+([A-Z0-9]+)$/i);
    if (rxnMatch) {
      const label = /^[A-Z]$/.test(rxnMatch[2]) ? `<i>${rxnMatch[2]}</i>` : rxnMatch[2];
      return `${rxnMatch[1]} ${label}`;
    }

    return t
      .replace(/Cr2O7\^?2-/gi, 'Cr<sub>2</sub>O<sub>7</sub><sup>2&minus;</sup>')
      .replace(/Cr2O72-/gi, 'Cr<sub>2</sub>O<sub>7</sub><sup>2&minus;</sup>')
      .replace(/MnO4\^?-/gi, 'MnO<sub>4</sub><sup>&minus;</sup>')
      .replace(/H\+/g, 'H<sup>+</sup>')
      .replace(/OH-/g, 'OH<sup>&minus;</sup>')
      .replace(/([A-Za-z\])])(\d+)/g, '$1<sub>$2</sub>');
  }

  // 建立單個水平箭頭單元 (上方試劑 + ───► + 下方條件)
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

  // 建立化學物種節點 (純文字示性式或結構式 <img>)
  function createSpeciesNode(item) {
    const node = document.createElement('div');
    node.className = 'ch45-species-node';
    if (item.img) {
      node.appendChild(item.img);
    } else if (item.html) {
      node.innerHTML = item.html;
    } else {
      node.innerHTML = formatOrganicHtml(item.text);
    }
    return node;
  }

  // 判斷一段文字是否為「箭頭上的試劑 / 反應條件 / 步驟標籤」而非「化學物種」
  function classifyRouteToken(txt) {
    const t = txt.replace(/\s+/g, ' ').trim();
    const low = t.toLowerCase();

    // 1. 明確的 Reaction A / Step 1 標籤
    if (/^(?:reaction|step)\s+[a-z0-9]+$/i.test(t)) {
      return 'arrow_top';
    }

    // 2. 明確的反應條件 (放箭頭下方)
    if (
      /^(?:heat|reflux|heat under reflux|room temperature|r\.t\.p\.|uv|uv light|light|catalyst|excess|cold|warm)$/i.test(low) ||
      /^2\.\s*nh3$/i.test(low) ||
      /^2\.\s*h\+\(aq\)$/i.test(low)
    ) {
      return 'arrow_bottom';
    }

    // 3. 明確的試劑 / 編號步驟 (放箭頭上方)
    if (
      /^[123]\.\s*/.test(t) ||
      /^(?:conc\.|dil\.|dilute|acidified|alkaline)\s+/i.test(low) ||
      /^(?:pcl3|pcl5|socl2|nabh4|lialh4|cr2o7|mno4|h2so4|hcl|hbr|hi|naoh|koh|nh3|h2,\s*pt|h2,\s*ni|h2,\s*pd|br2|cl2|h2o)/i.test(low) ||
      /^h\+\(aq\)$/i.test(low) ||
      /^oh-\(aq\)$/i.test(low) ||
      t.includes('dry ether') ||
      t.includes('/')
    ) {
      return 'arrow_top';
    }

    // 4. 否則判定為化學物種 (如 CH3CH2OH, C(CH3)3CHO, X, Y, Z)
    return 'species';
  }

  // ===========================================================================
  // STEP 1: 解救被 app.js 誤包進網格或白框的圖片與小箭頭
  // ===========================================================================
  function unwrapMisplacedContainers(container) {
    if (!container) return;
    Array.from(container.querySelectorAll('div')).forEach(div => {
      if (div.classList.contains('ch45-route-flow')) return;
      const styleAttr = div.getAttribute('style') || '';
      const imgs = Array.from(div.querySelectorAll('img'));

      // 若 app.js 把多張結構式圖片包進了 grid-template-columns，拆回依序排列的段落
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
  // STEP 2: 題幹合成路線重組引擎 (解決圖一 ChemMCQ45035 & 圖二 ChemMCQ45026)
  // ===========================================================================
  function reconstructStemSyntheticRoute(body, qCode) {
    if (!body || body.querySelector('.ch45-route-flow')) return;

    const blocks = Array.from(body.children);
    const introIdx = blocks.findIndex(el =>
      /synthetic\s+route|conversion\s+scheme|following\s+conversions/i.test(el.textContent || '')
    );
    if (introIdx === -1) return;

    // 尋找合成路線結束的位置（遇到問句 Which / What / How 或選項 A. 之前）
    let endIdx = blocks.length;
    for (let i = introIdx + 1; i < blocks.length; i++) {
      const t = (blocks[i].textContent || '').trim();
      if (
        /^(?:Which|What|How|Identify|Name|Deduce|State|In\s+which|A\.)\b/i.test(t) ||
        t.endsWith('?')
      ) {
        endIdx = i;
        break;
      }
    }

    const routeBlocks = blocks.slice(introIdx + 1, endIdx);
    if (routeBlocks.length < 3) return;

    // -------------------------------------------------------------------------
    // 特例精準還原：ChemMCQ45035 (Word 浮動文字方塊 Z-order 錯亂，X 排在起始物之前)
    // 原稿路線：C(CH3)3CHO —[Cr2O7^2-(aq)/H+(aq), heat]→ X —[1. PCl3, 2. NH3]→ Y
    // -------------------------------------------------------------------------
    const rawTexts = routeBlocks.map(el => (el.textContent || '').replace(/\s+/g, ' ').trim());
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

    // -------------------------------------------------------------------------
    // 通用合成路線解析器 (適用於 ChemMCQ45026 及所有含文字/結構圖的路線)
    // -------------------------------------------------------------------------
    const tokens = [];
    routeBlocks.forEach(el => {
      const img = el.querySelector('img');
      const txt = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (img) {
        tokens.push({ type: 'species', img, html: '' });
      } else if (txt) {
        const kind = classifyRouteToken(txt);
        tokens.push({ type: kind, text: txt, html: el.innerHTML.trim() });
      }
    });

    // 若起點是單一未知字母 (如 X) 而緊接著具體化合物、且結尾是 Y，自動交換起始物與中間體 X
    if (
      tokens.length >= 4 &&
      tokens[0].type === 'species' &&
      /^[A-Z]$/.test(tokens[0].text || '') &&
      tokens[1].type === 'species' &&
      !/^[A-Z]$/.test(tokens[1].text || '')
    ) {
      const temp = tokens[0];
      tokens[0] = tokens[1];
      tokens[1] = temp;
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
          // 在兩個物種之間插入指向箭頭 ───►
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
  // STEP 3: 雙欄選擇題自動轉為標準 3 欄 HTML Table (解決圖二 Reaction A | Reaction B)
  // ===========================================================================
  function convertTwoColumnOptionsToTable(body) {
    if (!body || body.querySelector('.ch45-option-table')) return;

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
        /^(Reaction\s+[A1])\s+(Reaction\s+[B2])$/i,
        /^(Step\s+[1I])\s+(Step\s+[2II])$/i,
        /^(Reagent(?:\s+in\s+step\s+1)?)\s+(Condition|Reagent.*)$/i,
        /^(Product\s+X|Compound\s+X|X)\s+(Product\s+Y|Compound\s+Y|Y)$/i,
        /^(Type\s+of\s+reaction)\s+(Reagent.*)$/i
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

      // 常見有機反應類型雙詞配對 (如 "Addition Substitution", "Dehydration Addition")
      const rxnTypes =
        '(?:Addition|Substitution|Dehydration|Hydrogenation|Oxidation|Reduction|Hydrolysis|Esterification|Condensation|Elimination|Neutralization|Polymerization)';
      const mType = plain.match(new RegExp(`^(${rxnTypes})\\s+(${rxnTypes})$`, 'i'));
      if (mType) {
        return [mType[1], mType[2]];
      }

      // 連續空白分隔
      const rawParts = cleanHtml.split(/(?:&nbsp;|\u00A0|\t|\s){2,}/);
      if (rawParts.length >= 2 && rawParts[0].trim() && rawParts[1].trim()) {
        return [rawParts[0].trim(), rawParts.slice(1).join(' ').trim()];
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
  // STEP 4: 修復解析區 (.exp-body) 散落的多步有機合成路線 (解決圖三 ChemMCQ45006)
  // ===========================================================================
  function patchExplanationSyntheticRoute(expBody, qCode) {
    if (!expBody || expBody.dataset.ch45ExpDone) return;
    expBody.dataset.ch45ExpDone = '1';

    unwrapMisplacedContainers(expBody);

    const blocks = Array.from(expBody.children);
    const expText = expBody.textContent || '';

    // -------------------------------------------------------------------------
    // 特例精準還原：ChemMCQ45006 解析區的 4 步連續轉換合成路線
    // 原稿路線：Propanamide (圖1) —[H+(aq), heat]→ Propanoic acid (圖2)
    //           —[1. LiAlH4, dry ether; 2. H+(aq)]→ CH3CH2CH2OH
    //           —[conc. H2SO4, heat]→ CH3CH=CH2 —[H2, Pt]→ CH3CH2CH3
    // -------------------------------------------------------------------------
    const imgs = Array.from(expBody.querySelectorAll('img'));
    if (
      qCode === 'ChemMCQ45006' ||
      (imgs.length === 2 && expText.includes('CH3CH2CH2OH') && expText.includes('CH3CH=CH2') && expText.includes('CH3CH2CH3'))
    ) {
      const flow = document.createElement('div');
      flow.className = 'ch45-route-flow';

      // Step 1: 丙醯胺 (imgs[0]) -> 丙酸 (imgs[1])
      flow.appendChild(createSpeciesNode({ img: imgs[0] }));
      flow.appendChild(createArrowUnit(['H+(aq)'], ['heat']));
      flow.appendChild(createSpeciesNode({ img: imgs[1] }));

      // Step 2: 丙酸 -> 丙-1-醇 (CH3CH2CH2OH)
      flow.appendChild(createArrowUnit(['1. LiAlH4, dry ether'], ['2. H+(aq)']));
      flow.appendChild(createSpeciesNode({ text: 'CH3CH2CH2OH' }));

      // Step 3: 丙-1-醇 -> 丙烯 (CH3CH=CH2)
      flow.appendChild(createArrowUnit(['conc. H2SO4'], ['heat']));
      flow.appendChild(createSpeciesNode({ text: 'CH3CH=CH2' }));

      // Step 4: 丙烯 -> 丙烷 (CH3CH2CH3)
      flow.appendChild(createArrowUnit(['H2, Pt'], []));
      flow.appendChild(createSpeciesNode({ text: 'CH3CH2CH3' }));

      // 插入到 "Answer: D" 下方並清除原本散落的文字與空圖段落
      const ansEl = blocks.find(el => /^Answer:/i.test((el.textContent || '').trim()));
      if (ansEl && ansEl.nextSibling) {
        expBody.insertBefore(flow, ansEl.nextSibling);
      } else {
        expBody.appendChild(flow);
      }

      blocks.forEach(el => {
        if (el !== ansEl && el !== flow) {
          el.remove();
        }
      });
      return;
    }

    // -------------------------------------------------------------------------
    // 通用解析區多步路線重組：若解析區出現獨立成行的試劑/條件 + 化學式，自動串接箭頭 ───►
    // -------------------------------------------------------------------------
    const contentBlocks = blocks.filter(el => !/^Answer:/i.test((el.textContent || '').trim()));
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

    if (body && !body.dataset.ch45V1Done) {
      body.dataset.ch45V1Done = '1';
      unwrapMisplacedContainers(body);
      reconstructStemSyntheticRoute(body, qCode);
      convertTwoColumnOptionsToTable(body);
    }

    if (expBody && !expBody.dataset.ch45ExpDone) {
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

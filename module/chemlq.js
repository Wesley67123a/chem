// 更新時間：2026-11-13 10:54:00 (HKT) | 版本：v0.1.21
// 檔案位置：module/chemlq.js
// 功能說明：HKDSE Chemistry Long Question (LQ) 獨立模組，讀取 chemlq/chemlq_chxx_e.js

(function () {
  'use strict';

  const MODULE_VERSION = '0.1.21';
  const UPDATED_AT = '2026-11-13 10:54:00';

  const CHEM_LQ_CHAPTERS = [
    { id: '41', title: 'Ch 41: Chemical Equilibrium (化學平衡 — 35 Marks)', file: './chemlq/chemlq_ch41_e.js' },
    { id: '40', title: 'Ch 40: Equilibrium Constant (平衡常數)', file: './chemlq/chemlq_ch40_e.js' },
    { id: '45', title: 'Ch 45: Organic Synthesis (有機合成)', file: './chemlq/chemlq_ch45_e.js' }
  ];

  // ==========================================================================
  // 1. 注入 Chem LQ 專屬與頂部分區切換列樣式
  // ==========================================================================
  function injectChemLqStyles() {
    if (document.getElementById('dseChemLqModuleStyleV0121')) return;
    const style = document.createElement('style');
    style.id = 'dseChemLqModuleStyleV0121';
    style.textContent = `
      /* 為左上角分區切換膠囊預留頂部安全距離 */
      .chem-responsive-container {
        padding-top: 58px !important;
      }

      #dseTopSectionBar {
        position: fixed !important;
        top: max(12px, env(safe-area-inset-top)) !important;
        left: 12px !important;
        z-index: 9999 !important;
        display: inline-flex !important;
        align-items: center !important;
        padding: 3px !important;
        border-radius: 999px !important;
        border: 1.5px solid rgba(29, 31, 44, 0.14) !important;
        background: rgba(255, 255, 255, 0.94) !important;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        user-select: none !important;
      }
      .dse-sec-pill {
        padding: 5px 12px !important;
        border-radius: 999px !important;
        border: none !important;
        background: transparent !important;
        color: #475569 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-size: 12.5px !important;
        font-weight: 700 !important;
        letter-spacing: 0.2px !important;
        cursor: pointer !important;
        transition: background 0.18s ease, color 0.18s ease !important;
        white-space: nowrap !important;
      }
      .dse-sec-pill.active[data-sec="chem_mc"] {
        background: #1D1F2C !important;
        color: #FFFFFF !important;
      }
      .dse-sec-pill.active[data-sec="chem_lq"] {
        background: #1E40AF !important;
        color: #FFFFFF !important;
      }
      .dse-sec-pill.active[data-sec="bio"] {
        background: #1B5E20 !important;
        color: #FFFFFF !important;
      }

      /* Chem LQ 主容器 */
      #chemLqRootContainer {
        display: none;
        max-width: 820px;
        margin: 0 auto;
        padding: 60px 16px 120px 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", sans-serif;
        color: #1D1F2C;
        box-sizing: border-box;
      }
      #chemLqRootContainer.active {
        display: block !important;
      }

      .lq-header-card {
        background: linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%);
        border: 1.5px solid #BFDBFE;
        border-radius: 24px;
        padding: 18px 22px;
        margin-bottom: 18px;
        box-shadow: 0 4px 16px rgba(30, 64, 175, 0.06);
      }
      .lq-header-title {
        font-size: 19px;
        font-weight: 700;
        color: #1E3A8A;
        margin: 0 0 6px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
      }
      .lq-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 12px;
        align-items: center;
      }
      .lq-select {
        flex: 1;
        min-width: 210px;
        padding: 9px 12px;
        border-radius: 14px;
        border: 1.5px solid #93C5FD;
        background: #FFFFFF;
        color: #1D1F2C;
        font-size: 14px;
        outline: none;
      }
      .lq-btn {
        padding: 9px 15px;
        border-radius: 14px;
        border: none;
        background: #1E40AF;
        color: #FFFFFF;
        font-size: 13.5px;
        cursor: pointer;
        white-space: nowrap;
      }
      .lq-btn-outline {
        padding: 8px 13px;
        border-radius: 14px;
        border: 1.5px solid #1E40AF;
        background: #FFFFFF;
        color: #1E3A8A;
        font-size: 13.5px;
        cursor: pointer;
        white-space: nowrap;
      }

      .lq-q-card {
        background: #FFFFFF;
        border: 1.5px solid #E2E8F0;
        border-radius: 24px;
        padding: 20px 24px;
        margin-bottom: 18px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
      }
      .lq-q-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        color: #1E40AF;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px dashed #CBD5E1;
      }
      .lq-stem {
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 16px;
        line-height: 1.65;
        color: #111111;
        margin-bottom: 14px;
      }
      .lq-eq-arrow {
        display: inline-block;
        vertical-align: middle;
        margin: 0 5px;
        font-size: 18px;
      }
      .lq-frac {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        vertical-align: middle;
        margin: 2px 4px;
        font-family: "Times New Roman", serif;
        font-size: 15px;
        line-height: 1.15;
      }
      .lq-frac > .num {
        border-bottom: 1px solid #111111;
        padding: 0 5px 2px 5px;
        white-space: nowrap;
      }
      .lq-frac > .den {
        padding: 2px 5px 0 5px;
        white-space: nowrap;
      }

      table.lq-data-table,
      table.lq-ice-table {
        width: 100%;
        max-width: 580px;
        border-collapse: collapse;
        margin: 10px auto 14px auto;
        font-family: "Times New Roman", serif;
        font-size: 14.5px;
        color: #111111;
      }
      table.lq-data-table th,
      table.lq-data-table td,
      table.lq-ice-table th,
      table.lq-ice-table td {
        border: 1px solid #333333;
        padding: 7px 10px;
        text-align: center;
      }
      table.lq-data-table th,
      table.lq-ice-table th {
        background: #F1F5F9;
      }

      .lq-subq-block {
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid #F1F5F9;
      }
      .lq-subq-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 16px;
        line-height: 1.55;
        color: #111111;
      }
      .lq-mark-tag {
        flex-shrink: 0;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 12px;
        color: #1E40AF;
        background: #EFF6FF;
        border: 1px solid #BFDBFE;
        padding: 2px 8px;
        border-radius: 999px;
      }
      .lq-scratchpad {
        width: 100%;
        min-height: 68px;
        margin-top: 8px;
        padding: 9px 12px;
        border-radius: 14px;
        border: 1px solid #CBD5E1;
        background: #F8FAFC;
        font-family: "Times New Roman", "Noto Sans TC", sans-serif;
        font-size: 15px;
        line-height: 1.5;
        color: #1E293B;
        box-sizing: border-box;
        resize: vertical;
        outline: none;
      }
      .lq-scratchpad:focus {
        border-color: #2563EB;
        background: #FFFFFF;
      }
      .lq-subq-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        gap: 8px;
      }
      .lq-toggle-ms-btn {
        padding: 6px 12px;
        border-radius: 12px;
        border: 1px solid #93C5FD;
        background: #EFF6FF;
        color: #1E40AF;
        font-size: 12.5px;
        cursor: pointer;
      }
      .lq-ms-box {
        display: none;
        margin-top: 10px;
        padding: 12px 14px;
        border-radius: 14px;
        background: #F0FDF4;
        border-left: 4px solid #16A34A;
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 15px;
        line-height: 1.6;
        color: #111111;
      }
      .lq-ms-box.open {
        display: block;
      }
      .lq-ms-box ul {
        margin: 4px 0;
        padding-left: 20px;
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================================================
  // 2. 建立 Chem LQ 題庫工作台與腳本動態載入器
  // ==========================================================================
  function ensureChemLqWorkspace() {
    if (document.getElementById('chemLqRootContainer')) return;

    const lqRoot = document.createElement('div');
    lqRoot.id = 'chemLqRootContainer';

    const optionsHtml = CHEM_LQ_CHAPTERS.map(
      ch => `<option value="${ch.id}" data-file="${ch.file}">${ch.title}</option>`
    ).join('');

    lqRoot.innerHTML = `
      <div class="lq-header-card">
        <div class="lq-header-title">
          <span>HKDSE Chemistry Long Questions</span>
          <span id="lqTotalMarksBadge" style="font-size:12.5px; background:#1E40AF; color:#fff; padding:3px 10px; border-radius:999px;">準備就緒</span>
        </div>
        <div style="font-size:13px; color:#1E3A8A;">
          對應 <code>chemlq/chemlq_chxx_e.js</code> 長題目庫；支援草稿自動儲存與核對 Marking Scheme。
        </div>
        <div class="lq-toolbar">
          <select id="chemLqChapterSelect" class="lq-select">${optionsHtml}</select>
          <button id="chemLqLoadBtn" type="button" class="lq-btn">載入本章 LQ</button>
          <button id="chemLqToggleAllMsBtn" type="button" class="lq-btn-outline">展開/收合全部答案</button>
        </div>
      </div>
      <div id="chemLqFeed"></div>
    `;

    document.body.appendChild(lqRoot);

    document.getElementById('chemLqLoadBtn').addEventListener('click', () => {
      const sel = document.getElementById('chemLqChapterSelect');
      const opt = sel.options[sel.selectedIndex];
      loadChemLqScript(opt.value, opt.dataset.file, opt.textContent);
    });

    let allMsExpanded = false;
    document.getElementById('chemLqToggleAllMsBtn').addEventListener('click', () => {
      allMsExpanded = !allMsExpanded;
      document.querySelectorAll('#chemLqFeed .lq-ms-box').forEach(box => {
        box.classList.toggle('open', allMsExpanded);
      });
    });

    // 預設載入 Ch 41 長題目
    loadChemLqScript('41', './chemlq/chemlq_ch41_e.js', CHEM_LQ_CHAPTERS[0].title);
  }

  function loadChemLqScript(chId, scriptPath, titleText) {
    const feed = document.getElementById('chemLqFeed');
    const badge = document.getElementById('lqTotalMarksBadge');

    if (window.CHEM_LQ_BANK && window.CHEM_LQ_BANK[chId]) {
      renderChemLqBank(window.CHEM_LQ_BANK[chId]);
      return;
    }

    badge.textContent = '載入中...';
    feed.innerHTML = `<div class="lq-q-card" style="text-align:center; padding:24px;">正在載入 <b>${titleText}</b> ...</div>`;

    const oldScript = document.getElementById(`chemlq-script-${chId}`);
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = `chemlq-script-${chId}`;
    script.src = `${scriptPath}?v=${Date.now()}`;
    script.onload = () => {
      if (window.CHEM_LQ_BANK && window.CHEM_LQ_BANK[chId]) {
        renderChemLqBank(window.CHEM_LQ_BANK[chId]);
      } else {
        badge.textContent = '格式錯誤';
        feed.innerHTML = `<div class="lq-q-card">已讀取 <code>${scriptPath}</code>，但未找到 <code>window.CHEM_LQ_BANK['${chId}']</code> 資料。</div>`;
      }
    };
    script.onerror = () => {
      badge.textContent = '尚未上傳';
      feed.innerHTML = `
        <div class="lq-q-card" style="border-left:4px solid #D97706;">
          <div style="color:#B45309; margin-bottom:6px;">找不到長題目檔案：${scriptPath}</div>
          <div style="font-size:14px; color:#334155; line-height:1.6;">
            請確認你已在 GitHub 倉庫根目錄建立 <code>chemlq/</code> 資料夾並上傳 <code>${scriptPath}</code>。
          </div>
        </div>
      `;
    };
    document.body.appendChild(script);
  }

  function renderChemLqBank(bankData) {
    const feed = document.getElementById('chemLqFeed');
    const badge = document.getElementById('lqTotalMarksBadge');
    badge.textContent = `共 ${bankData.questions.length} 大題 / ${bankData.totalMarks} 分`;

    feed.innerHTML = bankData.questions
      .map(
        q => `
        <div class="lq-q-card" id="${q.id}">
          <div class="lq-q-meta">
            <span>${q.id} &nbsp;|&nbsp; Question ${q.number}</span>
            <span>(${q.marks} marks)</span>
          </div>
          <div class="lq-stem">${q.stemHtml}</div>
          ${q.subQuestions
            .map((sq, sIdx) => {
              const draftKey = `dse_lq_draft_${q.id}_${sIdx}`;
              const savedDraft = localStorage.getItem(draftKey) || '';
              return `
              <div class="lq-subq-block">
                <div class="lq-subq-header">
                  <div><b>${sq.label}</b> &nbsp;${sq.textHtml}</div>
                  <span class="lq-mark-tag">${sq.marks}M</span>
                </div>
                <textarea class="lq-scratchpad" data-draft-key="${draftKey}" placeholder="在此輸入 ${sq.label} 的計算步驟或文字作答草稿...">${savedDraft}</textarea>
                <div class="lq-subq-actions">
                  <button type="button" class="lq-toggle-ms-btn" data-target="${q.id}-ms-${sIdx}">顯示 / 隱藏 Marking Scheme</button>
                </div>
                <div class="lq-ms-box" id="${q.id}-ms-${sIdx}">${sq.markingSchemeHtml}</div>
              </div>
            `;
            })
            .join('')}
        </div>
      `
      )
      .join('');

    // 自動儲存草稿文字
    feed.querySelectorAll('.lq-scratchpad').forEach(ta => {
      ta.addEventListener('input', () => {
        localStorage.setItem(ta.dataset.draftKey, ta.value);
      });
    });

    // 展開/收合 Marking Scheme
    feed.querySelectorAll('.lq-toggle-ms-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const box = document.getElementById(btn.dataset.target);
        if (box) box.classList.toggle('open');
      });
    });
  }

  // ==========================================================================
  // 3. 左上角分區切換控制器 (預留擴充接口給未來的 module/bio.js)
  // ==========================================================================
  const sectionHandlers = {
    chem_mc: () => {
      const chemMcRoot = document.getElementById('chemAppRootContainer');
      const chemLqRoot = document.getElementById('chemLqRootContainer');
      const bioRoot = document.getElementById('bioAppRootContainer');
      const floatingGrp = document.getElementById('floatingActionGroup');

      if (chemMcRoot) chemMcRoot.style.display = '';
      if (chemLqRoot) chemLqRoot.classList.remove('active');
      if (bioRoot) bioRoot.classList.remove('active');
      if (floatingGrp) floatingGrp.style.display = 'flex';
    },
    chem_lq: () => {
      const chemMcRoot = document.getElementById('chemAppRootContainer');
      const chemLqRoot = document.getElementById('chemLqRootContainer');
      const bioRoot = document.getElementById('bioAppRootContainer');
      const floatingGrp = document.getElementById('floatingActionGroup');

      if (chemMcRoot) chemMcRoot.style.display = 'none';
      if (chemLqRoot) chemLqRoot.classList.add('active');
      if (bioRoot) bioRoot.classList.remove('active');
      if (floatingGrp) floatingGrp.style.display = 'none';
    }
  };

  function switchDseSection(secId) {
    if (!sectionHandlers[secId]) secId = 'chem_mc';
    localStorage.setItem('dse_active_section', secId);
    sectionHandlers[secId]();

    document.querySelectorAll('#dseTopSectionBar .dse-sec-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.sec === secId);
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function ensureTopSectionBar() {
    let bar = document.getElementById('dseTopSectionBar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'dseTopSectionBar';
      bar.innerHTML = `
        <button type="button" class="dse-sec-pill" data-sec="chem_mc">Chem MC</button>
        <button type="button" class="dse-sec-pill" data-sec="chem_lq">Chem LQ</button>
      `;
      bar.querySelectorAll('.dse-sec-pill').forEach(pill => {
        pill.addEventListener('click', () => switchDseSection(pill.dataset.sec));
      });
      document.body.appendChild(bar);
    }
    return bar;
  }

  // 對外暴露模組 API，方便之後 module/bio.js 直接註冊按鈕與切換
  window.DseSectionManager = {
    version: MODULE_VERSION,
    updatedAt: UPDATED_AT,
    switchSection: switchDseSection,
    registerSection: function (secId, label, activateFn) {
      sectionHandlers[secId] = activateFn;
      const bar = ensureTopSectionBar();
      if (!bar.querySelector(`.dse-sec-pill[data-sec="${secId}"]`)) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'dse-sec-pill';
        btn.dataset.sec = secId;
        btn.textContent = label;
        btn.addEventListener('click', () => switchDseSection(secId));
        bar.appendChild(btn);
      }
      const saved = localStorage.getItem('dse_active_section');
      if (saved === secId) switchDseSection(secId);
    }
  };

  function init() {
    injectChemLqStyles();
    ensureChemLqWorkspace();
    ensureTopSectionBar();
    const savedSection = localStorage.getItem('dse_active_section') || 'chem_mc';
    switchDseSection(savedSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// 更新時間：2026-11-13 11:02:00 (HKT) | 版本：v0.1.23
// 檔案位置：module/chemlq.js
// 功能說明：首頁 LQ 入口卡片、15課題/65章 LQ 專屬目錄彈窗、Long Question 渲染與草稿/Marking Scheme 核對

(function () {
  'use strict';

  const MODULE_VERSION = '0.1.23';
  const UPDATED_AT = '2026-11-13 11:02:00';

  let activeLqChapterId = null;
  let currentMode = 'chem_mc'; // 'chem_mc' | 'chem_lq' | 'bio'

  const ICONS = {
    docList: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    list: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>`
  };

  // ==========================================================================
  // 1. 注入樣式表
  // ==========================================================================
  function injectChemLqStyles() {
    if (document.getElementById('dseChemLqModuleStyleV0123')) return;
    const style = document.createElement('style');
    style.id = 'dseChemLqModuleStyleV0123';
    style.textContent = `
      .chem-responsive-container {
        padding-top: 58px !important;
      }

      /* 左上角分區切換膠囊 */
      #dseTopSectionBar {
        position: fixed !important;
        top: max(12px, env(safe-area-inset-top)) !important;
        left: 12px !important;
        z-index: 9997 !important;
        display: inline-flex !important;
        align-items: center !important;
        padding: 3px !important;
        border-radius: 999px !important;
        border: 1.5px solid #E2E6F3 !important;
        background: rgba(255, 255, 255, 0.94) !important;
        box-shadow: 0 3px 12px rgba(72, 84, 122, 0.1) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        user-select: none !important;
      }
      .dse-sec-pill {
        padding: 5px 12px !important;
        border-radius: 999px !important;
        border: none !important;
        background: transparent !important;
        color: #5E6478 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-size: 12.5px !important;
        cursor: pointer !important;
        transition: background 0.18s ease, color 0.18s ease !important;
        white-space: nowrap !important;
      }
      .dse-sec-pill.active[data-sec="chem_mc"] {
        background: #48547A !important;
        color: #FFFFFF !important;
      }
      .dse-sec-pill.active[data-sec="chem_lq"] {
        background: #333D5C !important;
        color: #FFFFFF !important;
      }
      .dse-sec-pill.active[data-sec="bio"] {
        background: #1B5E20 !important;
        color: #FFFFFF !important;
      }

      /* 首頁 LQ 入口卡片 */
      #homeLqEntryCard {
        background: #FFFFFF;
        border: 2.5px solid #E2E6F3;
        border-radius: 28px;
        padding: 20px 26px;
        margin-bottom: 18px;
        box-shadow: 0 6px 24px rgba(72, 84, 122, 0.05);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        box-sizing: border-box;
      }

      /* Chem LQ 主容器 (與 MC 容器寬度響應一致) */
      #chemLqRootContainer {
        display: none;
        width: 100%;
        max-width: 860px;
        margin: 0 auto;
        padding: 58px clamp(20px, 5vw, 48px) 180px clamp(20px, 5vw, 48px);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #1D1F2C;
        box-sizing: border-box;
      }
      @media (orientation: landscape) and (min-width: 768px) {
        #chemLqRootContainer {
          max-width: 980px;
          padding: 58px 160px 160px 56px;
        }
      }
      @media (orientation: portrait) {
        #chemLqRootContainer {
          max-width: 92vw;
          padding: 58px 4vw 190px 4vw;
        }
      }
      #chemLqRootContainer.active {
        display: block !important;
      }

      .lq-top-nav-card {
        background: #FFFFFF;
        border: 2.5px solid #E2E6F3;
        border-radius: 28px;
        padding: 18px 26px;
        margin-bottom: 20px;
        box-shadow: 0 6px 24px rgba(72, 84, 122, 0.05);
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .lq-q-card {
        background: #FFFFFF;
        border: 2.5px solid #E2E6F3;
        border-radius: 28px;
        padding: 26px clamp(22px, 4vw, 38px);
        margin-bottom: 20px;
        box-shadow: 0 6px 24px rgba(72, 84, 122, 0.05);
        box-sizing: border-box;
      }
      .lq-q-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13.5px;
        color: #48547A;
        margin-bottom: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid #E2E6F3;
      }
      .lq-stem {
        font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;
        font-size: 16px;
        line-height: 1.75;
        color: #1D1F2C;
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
        border-bottom: 1px solid #1D1F2C;
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
        margin: 12px auto 16px auto;
        font-family: "Times New Roman", serif;
        font-size: 14.5px;
        color: #1D1F2C;
      }
      table.lq-data-table th,
      table.lq-data-table td,
      table.lq-ice-table th,
      table.lq-ice-table td {
        border: 1px solid #C5CCE6;
        padding: 7px 10px;
        text-align: center;
      }
      table.lq-data-table th,
      table.lq-ice-table th {
        background: #EEF0F8;
      }

      .lq-subq-block {
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px dashed #E2E6F3;
      }
      .lq-subq-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
        font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;
        font-size: 16px;
        line-height: 1.6;
        color: #1D1F2C;
      }
      .lq-mark-tag {
        flex-shrink: 0;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 12px;
        color: #48547A;
        background: #DFE3F8;
        padding: 3px 10px;
        border-radius: 12px;
      }
      .lq-scratchpad {
        width: 100%;
        min-height: 70px;
        margin-top: 10px;
        padding: 10px 14px;
        border-radius: 16px;
        border: 1.5px solid #E2E6F3;
        background: #F4F5FA;
        font-family: "Times New Roman", "Noto Sans TC", sans-serif;
        font-size: 15px;
        line-height: 1.55;
        color: #1D1F2C;
        box-sizing: border-box;
        resize: vertical;
        outline: none;
        -webkit-user-select: text !important;
        user-select: text !important;
      }
      .lq-scratchpad:focus {
        border-color: #48547A;
        background: #FFFFFF;
      }
      .lq-subq-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 8px;
      }
      .lq-toggle-ms-btn {
        border: none;
        background: #EEF0F8;
        color: #48547A;
        font-size: 12px;
        cursor: pointer;
        padding: 5px 12px;
        border-radius: 12px;
      }
      .lq-ms-box {
        display: none;
        margin-top: 12px;
        padding: 16px 20px;
        border-radius: 18px;
        background: #DFE3F8;
        border-left: 3.5px solid #48547A;
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 15px;
        line-height: 1.65;
        color: #1D1F2C;
      }
      .lq-ms-box.open {
        display: block;
      }
      .lq-ms-box ul {
        margin: 4px 0;
        padding-left: 20px;
      }

      /* LQ 專屬懸浮目錄按鈕 */
      #lqFloatingDirBtn {
        position: fixed;
        bottom: 18px;
        right: 16px;
        z-index: 9996;
        display: none;
        background: #48547A;
        color: #FFFFFF;
        border: none;
        padding: 0 16px;
        border-radius: 20px;
        font-size: 12px;
        box-shadow: 0 4px 14px rgba(72, 84, 122, 0.22);
        cursor: pointer;
        height: 40px;
        min-width: 118px;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        gap: 6px;
        white-space: nowrap;
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================================================
  // 2. 在首頁 (#chemDashboardHome) 自動注入 Long Questions 入口卡片
  // ==========================================================================
  function injectHomeLqCard() {
    const dashboard = document.getElementById('chemDashboardHome');
    if (!dashboard || document.getElementById('homeLqEntryCard')) return;

    // 尋找首頁標題區塊 (HKDSE / Chemistry Question Bank) 下方的第一個卡片
    const cards = dashboard.querySelectorAll('.m3-card');
    if (cards.length === 0) return;

    const lqCard = document.createElement('div');
    lqCard.id = 'homeLqEntryCard';
    lqCard.innerHTML = `
      <div style="display:flex; align-items:center; gap:14px; min-width:0; flex:1;">
        <div style="width:40px; height:40px; border-radius:20px; background:#DFE3F8; color:#48547A; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          ${ICONS.docList}
        </div>
        <div style="min-width:0; flex:1;">
          <div class="m3-title-medium" style="font-size:15px; color:#1D1F2C;">Long Questions (LQ)</div>
          <div style="font-size:12px; color:#5E6478; margin-top:2px;">
            ${activeLqChapterId && window.CHAPTER_MAP && window.CHAPTER_MAP[activeLqChapterId]
              ? `上次選擇：${window.CHAPTER_MAP[activeLqChapterId].chapter.name}`
              : '按 15 課題 / 65 章瀏覽結構化長題目與 Marking Scheme'}
          </div>
        </div>
      </div>
      <button type="button" id="homeOpenLqDirBtn" style="background:#48547A; color:#FFFFFF; border:none; padding:9px 16px; border-radius:20px; font-size:12.5px; cursor:pointer; flex-shrink:0; white-space:nowrap;">
        選擇 LQ 目錄 &rsaquo;
      </button>
    `;

    // 插入在首頁第一個設定卡片的上方（緊接在 HKDSE 大標題下方）
    cards[0].parentNode.insertBefore(lqCard, cards[0]);

    lqCard.querySelector('#homeOpenLqDirBtn').addEventListener('click', () => {
      openLqDirectoryModal();
    });
  }

  // ==========================================================================
  // 3. 15 課題 / 65 章 LQ 專屬目錄彈窗 (與 MC 目錄完全一致的互動體驗)
  // ==========================================================================
  function openLqDirectoryModal() {
    let modal = document.getElementById('lqCenterDirectoryModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lqCenterDirectoryModal';
      modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(29,31,44,0.35); z-index:99999; justify-content:center; align-items:center; padding:18px; box-sizing:border-box; font-family:sans-serif;';
      document.body.appendChild(modal);
    }

    const syllabus = window.SYLLABUS_CONFIG || [];
    const loadedBank = window.CHEM_LQ_BANK || {};

    let contentHtml = `
      <div style="background:#FFFFFF; width:100%; max-width:440px; height:82vh; max-height:640px; border-radius:28px; box-shadow:0 14px 44px rgba(72,84,122,0.15); display:flex; flex-direction:column; overflow:hidden; border:1px solid #E2E6F3;">
        <div style="padding:18px 24px; background:#DFE3F8; color:#48547A; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h2 class="m3-title-medium" style="margin:0; font-size:16px;">Long Questions (LQ) 目錄</h2>
            <div style="font-size:11px; color:#5E6478; margin-top:2px;">選擇 Topic / Chapter 進入結構化長題目</div>
          </div>
          <button type="button" id="closeLqDirModalBtn" style="background:#FFFFFF; border:none; color:#48547A; width:32px; height:32px; border-radius:16px; font-size:18px; cursor:pointer; line-height:1;">&times;</button>
        </div>
        <div style="flex:1; overflow-y:auto; padding:16px 20px; background:#F4F5FA; overscroll-behavior:contain;">
    `;

    syllabus.forEach(topic => {
      // 預設展開目前選中的課題，或預設展開 CHEM-10 (包含 Ch 41)
      const isExpanded = activeLqChapterId
        ? topic.chapters.some(c => c.id === activeLqChapterId)
        : topic.topicId === 'CHEM-10';

      contentHtml += `
        <div style="background:#FFFFFF; border-radius:20px; margin-bottom:10px; border:1.5px solid #E2E6F3; overflow:hidden;">
          <div class="lq-dir-topic-header" style="padding:13px 16px; background:#FFFFFF; font-size:14px; color:#1D1F2C; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>${topic.topicName}</span>
            <span class="lq-dir-arrow" style="font-size:11px; color:#5E6478;">${isExpanded ? '▼' : '▶'}</span>
          </div>
          <div class="lq-dir-chapter-list" style="display:${isExpanded ? 'flex' : 'none'}; flex-direction:column;">
      `;

      topic.chapters.forEach(ch => {
        const isActive = ch.id === activeLqChapterId;
        const cachedData = loadedBank[String(ch.id)];
        const statusTag = cachedData
          ? `${cachedData.questions.length} 大題 (${cachedData.totalMarks}分) · `
          : '';

        contentHtml += `
          <div class="lq-dir-chapter-item" data-chid="${ch.id}" style="padding:11px 16px 11px 20px; border-top:1px solid #E2E6F3; font-size:13px; color:${isActive ? '#48547A' : '#1D1F2C'}; background:${isActive ? '#DFE3F8' : '#FFFFFF'}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>${ch.name}</span>
            <span style="font-size:12px; color:#48547A; white-space:nowrap; margin-left:8px;">
              ${statusTag}進入 LQ &rsaquo;
            </span>
          </div>
        `;
      });

      contentHtml += `</div></div>`;
    });

    contentHtml += `</div></div>`;
    modal.innerHTML = contentHtml;

    modal.querySelector('#closeLqDirModalBtn').onclick = () => {
      modal.style.display = 'none';
    };
    modal.onclick = e => {
      if (e.target === modal) modal.style.display = 'none';
    };

    modal.querySelectorAll('.lq-dir-topic-header').forEach(header => {
      header.onclick = e => {
        const list = e.currentTarget.nextElementSibling;
        const arrow = e.currentTarget.querySelector('.lq-dir-arrow');
        const isHidden = list.style.display === 'none';
        list.style.display = isHidden ? 'flex' : 'none';
        if (arrow) arrow.textContent = isHidden ? '▼' : '▶';
      };
    });

    modal.querySelectorAll('.lq-dir-chapter-item').forEach(item => {
      item.onclick = e => {
        const chId = parseInt(e.currentTarget.getAttribute('data-chid'), 10);
        modal.style.display = 'none';
        openLqChapter(chId);
      };
    });

    modal.style.display = 'flex';
  }

  // ==========================================================================
  // 4. Chem LQ 工作台與章節載入引擎
  // ==========================================================================
  function ensureChemLqWorkspace() {
    if (document.getElementById('chemLqRootContainer')) return;

    const lqRoot = document.createElement('div');
    lqRoot.id = 'chemLqRootContainer';
    lqRoot.innerHTML = `
      <div class="lq-top-nav-card">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:10px; min-width:0; flex:1;">
            <button type="button" id="lqBackHomeBtn" style="padding:6px 14px; font-size:12px; border:none; border-radius:18px; background:#DFE3F8; color:#48547A; cursor:pointer; white-space:nowrap;">
              &lsaquo; 首頁
            </button>
            <h2 id="lqCurrentChapterTitle" class="m3-title-medium" style="margin:0; font-size:15px; color:#1D1F2C; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              Long Questions
            </h2>
          </div>
          <div style="display:flex; align-items:center; gap:8px; white-space:nowrap;">
            <span id="lqTotalMarksBadge" style="font-size:12px; color:#5E6478;"></span>
            <button type="button" id="lqToggleAllMsBtn" style="padding:6px 12px; font-size:11.5px; border:1px solid #E2E6F3; border-radius:16px; background:#FFFFFF; cursor:pointer; color:#48547A;">
              展開 / 收合全部答案
            </button>
          </div>
        </div>
      </div>
      <div id="chemLqFeed"></div>
    `;
    document.body.appendChild(lqRoot);

    // 建立 LQ 模式下右下角懸浮「LQ 目錄選單」按鈕
    if (!document.getElementById('lqFloatingDirBtn')) {
      const fBtn = document.createElement('button');
      fBtn.id = 'lqFloatingDirBtn';
      fBtn.type = 'button';
      fBtn.innerHTML = `${ICONS.list}<span>LQ 目錄選單</span>`;
      fBtn.onclick = () => openLqDirectoryModal();
      document.body.appendChild(fBtn);
    }

    document.getElementById('lqBackHomeBtn').addEventListener('click', () => {
      switchDseSection('chem_mc');
      if (typeof showHomeView === 'function') showHomeView();
    });

    let allMsExpanded = false;
    document.getElementById('lqToggleAllMsBtn').addEventListener('click', () => {
      allMsExpanded = !allMsExpanded;
      document.querySelectorAll('#chemLqFeed .lq-ms-box').forEach(box => {
        box.classList.toggle('open', allMsExpanded);
      });
    });
  }

  async function openLqChapter(chapId) {
    activeLqChapterId = chapId;
    localStorage.setItem('dse_last_lq_chap', String(chapId));

    switchDseSection('chem_lq');

    const lookup = window.CHAPTER_MAP && window.CHAPTER_MAP[chapId];
    const chapTitle = lookup ? lookup.chapter.name : `第 ${chapId} 章`;
    const titleEl = document.getElementById('lqCurrentChapterTitle');
    const badgeEl = document.getElementById('lqTotalMarksBadge');
    const feedEl = document.getElementById('chemLqFeed');

    if (titleEl) titleEl.textContent = `${chapTitle} (LQ)`;

    const keyStr = String(chapId);
    if (window.CHEM_LQ_BANK && window.CHEM_LQ_BANK[keyStr]) {
      renderChemLqBank(window.CHEM_LQ_BANK[keyStr]);
      return;
    }

    if (badgeEl) badgeEl.textContent = '載入中...';
    if (feedEl) {
      feedEl.innerHTML = `
        <div class="lq-q-card" style="text-align:center; padding:48px 20px; color:#5E6478;">
          <div style="font-size:15px; color:#48547A; margin-bottom:6px;">正在載入 ${chapTitle} Long Questions ...</div>
        </div>
      `;
    }

    const padId = String(chapId).padStart(2, '0');
    const lang = (window.chemApp && window.chemApp.currentLang) || 'e';
    const candidateScripts = Array.from(
      new Set([
        `./chemlq/chemlq_ch${padId}_${lang}.js`,
        `./chemlq/chemlq_ch${chapId}_${lang}.js`,
        `./chemlq/chemlq_ch${padId}_e.js`,
        `./chemlq/chemlq_ch${chapId}_e.js`
      ])
    );

    let loaded = false;
    for (const src of candidateScripts) {
      const ok = await new Promise(resolve => {
        const s = document.createElement('script');
        s.src = `${src}?v=${Date.now()}`;
        s.onload = () => resolve(!!(window.CHEM_LQ_BANK && window.CHEM_LQ_BANK[keyStr]));
        s.onerror = () => resolve(false);
        document.head.appendChild(s);
      });
      if (ok) {
        loaded = true;
        break;
      }
    }

    if (loaded && window.CHEM_LQ_BANK && window.CHEM_LQ_BANK[keyStr]) {
      renderChemLqBank(window.CHEM_LQ_BANK[keyStr]);
    } else {
      if (badgeEl) badgeEl.textContent = '尚未上傳';
      if (feedEl) {
        feedEl.innerHTML = `
          <div class="lq-q-card" style="text-align:center; padding:48px 24px; color:#5E6478;">
            <div style="font-size:15px; color:#1D1F2C; margin-bottom:8px;">本章節尚未建立 Long Question 題庫 (chemlq_ch${padId}_${lang}.js)</div>
            <div style="font-size:13px; margin-bottom:18px;">請點擊「LQ 目錄選單」選擇其他已上傳章節（例如第 41 章）。</div>
            <button type="button" id="emptyLqOpenDirBtn" style="background:#48547A; color:#FFFFFF; border:none; padding:9px 18px; border-radius:18px; font-size:13px; cursor:pointer;">
              開啟 LQ 目錄選單
            </button>
          </div>
        `;
        const btn = document.getElementById('emptyLqOpenDirBtn');
        if (btn) btn.onclick = () => openLqDirectoryModal();
      }
    }
  }

  function renderChemLqBank(bankData) {
    const feed = document.getElementById('chemLqFeed');
    const badge = document.getElementById('lqTotalMarksBadge');
    if (badge) badge.textContent = `共 ${bankData.questions.length} 大題 / ${bankData.totalMarks} 分`;

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

    feed.querySelectorAll('.lq-scratchpad').forEach(ta => {
      ta.addEventListener('input', () => {
        localStorage.setItem(ta.dataset.draftKey, ta.value);
      });
    });

    feed.querySelectorAll('.lq-toggle-ms-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const box = document.getElementById(btn.dataset.target);
        if (box) box.classList.toggle('open');
      });
    });
  }

  // ==========================================================================
  // 5. 分區切換控制器 (Chem MC / Chem LQ / Bio)
  // ==========================================================================
  const sectionHandlers = {
    chem_mc: () => {
      const chemMcRoot = document.getElementById('chemAppRootContainer');
      const chemLqRoot = document.getElementById('chemLqRootContainer');
      const bioRoot = document.getElementById('bioAppRootContainer');
      const floatingGrp = document.getElementById('floatingActionGroup');
      const lqFloatBtn = document.getElementById('lqFloatingDirBtn');

      if (chemMcRoot) chemMcRoot.style.display = '';
      if (chemLqRoot) chemLqRoot.classList.remove('active');
      if (bioRoot) bioRoot.classList.remove('active');
      if (lqFloatBtn) lqFloatBtn.style.display = 'none';
      if (floatingGrp) {
        if (typeof updateFloatingButtonsVisibility === 'function') {
          updateFloatingButtonsVisibility();
        } else {
          floatingGrp.style.display = 'flex';
        }
      }
    },
    chem_lq: () => {
      const chemMcRoot = document.getElementById('chemAppRootContainer');
      const chemLqRoot = document.getElementById('chemLqRootContainer');
      const bioRoot = document.getElementById('bioAppRootContainer');
      const floatingGrp = document.getElementById('floatingActionGroup');
      const lqFloatBtn = document.getElementById('lqFloatingDirBtn');

      if (chemMcRoot) chemMcRoot.style.display = 'none';
      if (chemLqRoot) chemLqRoot.classList.add('active');
      if (bioRoot) bioRoot.classList.remove('active');
      if (floatingGrp) floatingGrp.style.display = 'none';
      if (lqFloatBtn) lqFloatBtn.style.display = 'flex';
    }
  };

  function switchDseSection(secId) {
    if (!sectionHandlers[secId]) secId = 'chem_mc';
    currentMode = secId;
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
        pill.addEventListener('click', () => {
          const targetSec = pill.dataset.sec;
          if (targetSec === 'chem_lq') {
            if (!activeLqChapterId) {
              openLqDirectoryModal();
            } else {
              openLqChapter(activeLqChapterId);
            }
          } else {
            switchDseSection(targetSec);
          }
        });
      });
      document.body.appendChild(bar);
    }
    return bar;
  }

  function syncOverlayVisibility() {
    const authOverlay = document.getElementById('chemAuthOverlay');
    const bar = document.getElementById('dseTopSectionBar');
    if (bar && authOverlay) {
      const isLoginVisible = authOverlay.style.display !== 'none';
      bar.style.display = isLoginVisible ? 'none' : 'inline-flex';
    }
    injectHomeLqCard();
  }

  window.DseSectionManager = {
    version: MODULE_VERSION,
    updatedAt: UPDATED_AT,
    switchSection: switchDseSection,
    openLqDirectory: openLqDirectoryModal,
    openLqChapter: openLqChapter,
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
    injectHomeLqCard();

    const savedChap = parseInt(localStorage.getItem('dse_last_lq_chap') || '0', 10);
    if (savedChap > 0) activeLqChapterId = savedChap;

    const savedSection = localStorage.getItem('dse_active_section') || 'chem_mc';
    if (savedSection === 'chem_lq' && activeLqChapterId) {
      openLqChapter(activeLqChapterId);
    } else {
      switchDseSection('chem_mc');
    }

    // 監聽首頁重新渲染與登入遮罩變化，確保首頁 LQ 按鈕永遠存在
    const observer = new MutationObserver(() => {
      syncOverlayVisibility();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    syncOverlayVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

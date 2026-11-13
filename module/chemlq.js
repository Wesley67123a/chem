// 更新時間：2026-11-13 13:02:00 (HKT) | 版本：v0.1.36
// 檔案位置：module/chemlq.js
// 功能說明：
//   1. 首頁設定卡片內新增與 Sound FX 同風格的「長題目模式 (Chem LQ)」撥動開關
//   2. 全站目錄箭頭改用純 SVG 向量繪製（徹底消除 iPad 藍色 Emoji 箭頭）
//   3. Chem LQ 15 課題 / 65 章目錄與長題目草稿 / Marking Scheme 核對工作台

(function () {
  'use strict';

  const MODULE_VERSION = '0.1.36';
  const UPDATED_AT = '2026-11-13 13:02:00';

  const M3_LQ = {
    bg: '#F4F5FA',
    surface: '#FFFFFF',
    surfaceVariant: '#DFE3F8',
    surfaceMuted: '#EEF0F8',
    surfaceTrack: '#E3E6F5',
    primary: '#48547A',
    primaryDark: '#333D5C',
    textMain: '#1D1F2C',
    textSub: '#5E6478',
    textMuted: '#8F94A6',
    outline: '#E2E6F3',
    outlineStrong: '#C5CCE6'
  };

  const ICONS = {
    docList: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    list: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>`,
    chevronRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block; transition:transform 0.2s ease;"><polyline points="9 6 15 12 9 18"/></svg>`
  };

  let isChemLqMode = localStorage.getItem('dse_chem_lq_mode') === '1';
  let activeLqChapterId = parseInt(localStorage.getItem('dse_last_lq_chap') || '0', 10) || null;

  // ==========================================================================
  // 1. 將全站目錄中的 Emoji 箭頭 (▶ / ▼) 替換為純 SVG 向量折線箭頭
  // ==========================================================================
  function renderChevronSvg(isExpanded) {
    return `<span style="display:inline-flex; align-items:center; justify-content:center; transform:${isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}; transition:transform 0.2s ease; color:${M3_LQ.textSub};">${ICONS.chevronRight}</span>`;
  }

  function upgradeAllEmojiArrows() {
    document.querySelectorAll('.dir-arrow, .lq-dir-arrow, .bio-dir-arrow').forEach(el => {
      const txt = (el.textContent || '').trim();
      if (txt.includes('▼') || txt.includes('▶')) {
        const expanded = txt.includes('▼');
        el.innerHTML = renderChevronSvg(expanded);
      }
    });
  }

  // ==========================================================================
  // 2. 注入 Chem LQ 樣式表
  // ==========================================================================
  function injectChemLqStyles() {
    if (document.getElementById('dseChemLqModuleStyleV0136')) return;
    const style = document.createElement('style');
    style.id = 'dseChemLqModuleStyleV0136';
    style.textContent = `
      #chemLqRootContainer {
        display: none;
        width: 100%;
        max-width: 860px;
        margin: 0 auto;
        padding: 20px clamp(20px, 5vw, 48px) 190px clamp(20px, 5vw, 48px);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: ${M3_LQ.textMain};
        box-sizing: border-box;
      }
      @media (orientation: landscape) and (min-width: 768px) {
        #chemLqRootContainer {
          max-width: 780px;
          padding: 24px 24px 180px 24px;
        }
      }
      @media (orientation: portrait) {
        #chemLqRootContainer {
          max-width: 92vw;
          padding: 16px 4vw 200px 4vw;
        }
      }
      #chemLqRootContainer.active {
        display: block !important;
      }

      .lq-top-nav-card {
        background: ${M3_LQ.surface};
        border: 2.5px solid ${M3_LQ.outline};
        border-radius: 28px;
        padding: 18px 26px;
        margin-bottom: 20px;
        box-shadow: 0 6px 24px rgba(72, 84, 122, 0.05);
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .lq-q-card {
        background: ${M3_LQ.surface};
        border: 2.5px solid ${M3_LQ.outline};
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
        color: ${M3_LQ.primary};
        margin-bottom: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid ${M3_LQ.outline};
      }
      .lq-stem {
        font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;
        font-size: 16px;
        line-height: 1.75;
        color: ${M3_LQ.textMain};
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
        border-bottom: 1px solid ${M3_LQ.textMain};
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
        color: ${M3_LQ.textMain};
      }
      table.lq-data-table th,
      table.lq-data-table td,
      table.lq-ice-table th,
      table.lq-ice-table td {
        border: 1px solid ${M3_LQ.outlineStrong};
        padding: 7px 10px;
        text-align: center;
      }
      table.lq-data-table th,
      table.lq-ice-table th {
        background: ${M3_LQ.surfaceMuted};
      }

      .lq-subq-block {
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px dashed ${M3_LQ.outline};
      }
      .lq-subq-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
        font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;
        font-size: 16px;
        line-height: 1.6;
        color: ${M3_LQ.textMain};
      }
      .lq-mark-tag {
        flex-shrink: 0;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 12px;
        color: ${M3_LQ.primary};
        background: ${M3_LQ.surfaceVariant};
        padding: 3px 10px;
        border-radius: 12px;
      }
      .lq-scratchpad {
        width: 100%;
        min-height: 70px;
        margin-top: 10px;
        padding: 10px 14px;
        border-radius: 16px;
        border: 1.5px solid ${M3_LQ.outline};
        background: ${M3_LQ.bg};
        font-family: "Times New Roman", "Noto Sans TC", sans-serif;
        font-size: 15px;
        line-height: 1.55;
        color: ${M3_LQ.textMain};
        box-sizing: border-box;
        resize: vertical;
        outline: none;
      }
      .lq-scratchpad:focus {
        border-color: ${M3_LQ.primary};
        background: ${M3_LQ.surface};
      }
      .lq-subq-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 8px;
      }
      .lq-toggle-ms-btn {
        border: none;
        background: ${M3_LQ.surfaceMuted};
        color: ${M3_LQ.primary};
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
        background: ${M3_LQ.surfaceVariant};
        border-left: 3.5px solid ${M3_LQ.primary};
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 15px;
        line-height: 1.65;
        color: ${M3_LQ.textMain};
      }
      .lq-ms-box.open {
        display: block;
      }
      .lq-ms-box ul {
        margin: 4px 0;
        padding-left: 20px;
      }

      #lqFloatingDirBtn {
        position: fixed;
        bottom: 18px;
        right: 16px;
        z-index: 9998;
        display: none;
        background: ${M3_LQ.primary};
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
  // 3. 在首頁設定卡片內注入與 Sound FX 同風格的「Chem LQ」撥動開關
  // ==========================================================================
  function injectHomeChemLqSwitchRow() {
    const dashboard = document.getElementById('chemDashboardHome');
    if (!dashboard) return;

    const soundSwitch = dashboard.querySelector('#m3SoundSwitch');
    if (!soundSwitch) return;

    const soundRow = soundSwitch.parentElement;
    if (!soundRow || !soundRow.parentElement) return;

    // 同步首頁副標題與右下角目錄選單按鈕狀態
    const subTitleDiv = dashboard.querySelector('h1 + div');
    if (subTitleDiv) {
      subTitleDiv.textContent = isChemLqMode
        ? 'Chemistry Question Bank (LQ)'
        : 'Chemistry Question Bank';
    }

    const dirBtn = document.getElementById('mobileToggleSidebarBtn');
    if (dirBtn) {
      const span = dirBtn.querySelector('span');
      if (span) {
        span.textContent = isChemLqMode ? 'LQ 目錄選單' : '目錄選單';
      }
      if (dirBtn.dataset.v0136Intercepted !== '1') {
        dirBtn.dataset.v0136Intercepted = '1';
        dirBtn.addEventListener(
          'click',
          function (e) {
            if (isChemLqMode) {
              e.preventDefault();
              e.stopImmediatePropagation();
              if (typeof SoundFX !== 'undefined') SoundFX.playClick();
              openLqDirectoryModal();
            }
          },
          true
        );
      }
    }

    let lqRow = document.getElementById('homeChemLqSwitchRow');
    if (!lqRow) {
      lqRow = document.createElement('div');
      lqRow.id = 'homeChemLqSwitchRow';
      lqRow.style.cssText = `display:flex; justify-content:space-between; align-items:center; padding:18px 0; border-bottom:1px solid ${M3_LQ.outline};`;
      lqRow.innerHTML = `
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:36px; height:36px; border-radius:18px; background:${M3_LQ.bg}; display:flex; align-items:center; justify-content:center; color:${M3_LQ.primary};">
            ${ICONS.docList}
          </div>
          <span style="font-size:15px; color:${M3_LQ.textMain};">長題目模式 (Chem LQ)</span>
        </div>
        <div id="m3ChemLqSwitch" class="m3-switch-track" style="background-color:${isChemLqMode ? M3_LQ.primary : M3_LQ.surfaceTrack};">
          <div id="m3ChemLqSwitchThumb" class="m3-switch-thumb" style="transform:${isChemLqMode ? 'translateX(26px)' : 'translateX(4px)'};"></div>
        </div>
      `;

      // 插入在 Sound FX 下方、登入學生上方
      soundRow.parentElement.insertBefore(lqRow, soundRow.nextSibling);

      const switchEl = lqRow.querySelector('#m3ChemLqSwitch');
      switchEl.onclick = () => {
        if (typeof SoundFX !== 'undefined') SoundFX.playClick();
        isChemLqMode = !isChemLqMode;
        localStorage.setItem('dse_chem_lq_mode', isChemLqMode ? '1' : '0');
        updateChemLqSwitchVisual();

        if (isChemLqMode) {
          openLqDirectoryModal();
        } else {
          exitChemLqToHome();
        }
      };
    }

    updateChemLqSwitchVisual();
  }

  function updateChemLqSwitchVisual() {
    const track = document.getElementById('m3ChemLqSwitch');
    const thumb = document.getElementById('m3ChemLqSwitchThumb');
    if (track) {
      track.style.backgroundColor = isChemLqMode ? M3_LQ.primary : M3_LQ.surfaceTrack;
    }
    if (thumb) {
      thumb.style.transform = isChemLqMode ? 'translateX(26px)' : 'translateX(4px)';
    }

    const dashboard = document.getElementById('chemDashboardHome');
    if (dashboard) {
      const subTitleDiv = dashboard.querySelector('h1 + div');
      if (subTitleDiv) {
        subTitleDiv.textContent = isChemLqMode
          ? 'Chemistry Question Bank (LQ)'
          : 'Chemistry Question Bank';
      }
    }

    const dirBtn = document.getElementById('mobileToggleSidebarBtn');
    if (dirBtn) {
      const span = dirBtn.querySelector('span');
      if (span) {
        span.textContent = isChemLqMode ? 'LQ 目錄選單' : '目錄選單';
      }
    }
  }

  // ==========================================================================
  // 4. 15 課題 / 65 章 Chem LQ 目錄彈窗（純 SVG 箭頭 + 毛玻璃背景模糊）
  // ==========================================================================
  function openLqDirectoryModal() {
    let modal = document.getElementById('lqCenterDirectoryModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lqCenterDirectoryModal';
      modal.className = 'dse-blurred-backdrop';
      modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(29,31,44,0.28); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:99999; justify-content:center; align-items:center; padding:18px; box-sizing:border-box; font-family:sans-serif;';
      document.body.appendChild(modal);
    }

    const syllabus = window.SYLLABUS_CONFIG || [];
    const loadedBank = window.CHEM_LQ_BANK || {};

    let contentHtml = `
      <div class="dse-dialog-card-anim" style="background:${M3_LQ.surface}; width:100%; max-width:440px; height:82vh; max-height:640px; border-radius:28px; box-shadow:0 14px 44px rgba(72,84,122,0.15); display:flex; flex-direction:column; overflow:hidden; border:1px solid ${M3_LQ.outline};">
        <div style="padding:18px 24px; background:${M3_LQ.surfaceVariant}; color:${M3_LQ.primary}; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h2 class="m3-title-medium" style="margin:0; font-size:16px;">選擇 Chem LQ 課題 / 章節</h2>
            <div style="font-size:11px; color:${M3_LQ.textSub}; margin-top:2px;">共 15 個課題、65 個章節</div>
          </div>
          <button type="button" id="closeLqDirModalBtn" style="background:${M3_LQ.surface}; border:none; color:${M3_LQ.primary}; width:32px; height:32px; border-radius:16px; font-size:18px; cursor:pointer; line-height:1;">&times;</button>
        </div>
        <div style="flex:1; overflow-y:auto; padding:16px 20px; background:${M3_LQ.bg}; -webkit-overflow-scrolling:touch; overscroll-behavior:contain;">
    `;

    syllabus.forEach(topic => {
      const isExpanded = activeLqChapterId
        ? topic.chapters.some(c => c.id === activeLqChapterId)
        : false;

      contentHtml += `
        <div style="background:${M3_LQ.surface}; border-radius:20px; margin-bottom:10px; border:1.5px solid ${M3_LQ.outline}; overflow:hidden;">
          <div class="lq-dir-topic-header" data-expanded="${isExpanded ? '1' : '0'}" style="padding:13px 16px; background:${M3_LQ.surface}; font-size:14px; color:${M3_LQ.textMain}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>${topic.topicName}</span>
            <span class="lq-dir-arrow" style="display:inline-flex; align-items:center; justify-content:center; transform:${isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}; transition:transform 0.2s ease; color:${M3_LQ.textSub};">
              ${ICONS.chevronRight}
            </span>
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
          <div class="lq-dir-chapter-item" data-chid="${ch.id}" style="padding:11px 16px 11px 20px; border-top:1px solid ${M3_LQ.outline}; font-size:13px; color:${isActive ? M3_LQ.primary : M3_LQ.textMain}; background:${isActive ? M3_LQ.surfaceVariant : M3_LQ.surface}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>${ch.name}</span>
            <span style="font-size:12px; color:${M3_LQ.primary}; white-space:nowrap; margin-left:8px;">
              ${statusTag}進入 &rsaquo;
            </span>
          </div>
        `;
      });

      contentHtml += `</div></div>`;
    });

    contentHtml += `</div></div>`;
    modal.innerHTML = contentHtml;

    modal.querySelector('#closeLqDirModalBtn').onclick = () => {
      if (typeof SoundFX !== 'undefined') SoundFX.playClick();
      modal.style.display = 'none';
    };
    modal.onclick = e => {
      if (e.target === modal) modal.style.display = 'none';
    };

    modal.querySelectorAll('.lq-dir-topic-header').forEach(header => {
      header.onclick = e => {
        if (typeof SoundFX !== 'undefined') SoundFX.playClick();
        const list = e.currentTarget.nextElementSibling;
        const arrow = e.currentTarget.querySelector('.lq-dir-arrow');
        const isHidden = list.style.display === 'none';
        list.style.display = isHidden ? 'flex' : 'none';
        if (arrow) {
          arrow.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
        }
      };
    });

    modal.querySelectorAll('.lq-dir-chapter-item').forEach(item => {
      item.onclick = e => {
        if (typeof SoundFX !== 'undefined') SoundFX.playClick();
        const chId = parseInt(e.currentTarget.getAttribute('data-chid'), 10);
        modal.style.display = 'none';
        openLqChapter(chId);
      };
    });

    modal.style.display = 'flex';
  }

  // ==========================================================================
  // 5. Chem LQ 做題工作台與視圖切換
  // ==========================================================================
  function ensureChemLqWorkspace() {
    if (document.getElementById('chemLqRootContainer')) return;

    const lqRoot = document.createElement('div');
    lqRoot.id = 'chemLqRootContainer';
    lqRoot.innerHTML = `
      <div class="lq-top-nav-card">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:10px; min-width:0; flex:1;">
            <button type="button" id="lqBackHomeBtn" style="padding:6px 14px; font-size:12px; border:none; border-radius:18px; background:${M3_LQ.surfaceVariant}; color:${M3_LQ.primary}; cursor:pointer; white-space:nowrap;">
              &lsaquo; 首頁
            </button>
            <h2 id="lqCurrentChapterTitle" class="m3-title-medium" style="margin:0; font-size:15px; color:${M3_LQ.textMain}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              Chem LQ
            </h2>
          </div>
          <div style="display:flex; align-items:center; gap:8px; white-space:nowrap;">
            <span id="lqTotalMarksBadge" style="font-size:12px; color:${M3_LQ.textSub};"></span>
            <button type="button" id="lqToggleAllMsBtn" style="padding:6px 12px; font-size:11.5px; border:1px solid ${M3_LQ.outline}; border-radius:16px; background:${M3_LQ.surface}; cursor:pointer; color:${M3_LQ.primary};">
              展開 / 收合全部答案
            </button>
          </div>
        </div>
      </div>
      <div id="chemLqFeed"></div>
    `;
    document.body.appendChild(lqRoot);

    if (!document.getElementById('lqFloatingDirBtn')) {
      const fBtn = document.createElement('button');
      fBtn.id = 'lqFloatingDirBtn';
      fBtn.type = 'button';
      fBtn.innerHTML = `${ICONS.list}<span>LQ 目錄選單</span>`;
      fBtn.onclick = () => {
        if (typeof SoundFX !== 'undefined') SoundFX.playClick();
        openLqDirectoryModal();
      };
      document.body.appendChild(fBtn);
    }

    document.getElementById('lqBackHomeBtn').addEventListener('click', () => {
      if (typeof SoundFX !== 'undefined') SoundFX.playClick();
      exitChemLqToHome();
    });

    let allMsExpanded = false;
    document.getElementById('lqToggleAllMsBtn').addEventListener('click', () => {
      if (typeof SoundFX !== 'undefined') SoundFX.playClick();
      allMsExpanded = !allMsExpanded;
      document.querySelectorAll('#chemLqFeed .lq-ms-box').forEach(box => {
        box.classList.toggle('open', allMsExpanded);
      });
    });
  }

  function exitChemLqToHome() {
    const chemMcRoot = document.getElementById('chemAppRootContainer');
    const chemLqRoot = document.getElementById('chemLqRootContainer');
    const lqFloatBtn = document.getElementById('lqFloatingDirBtn');

    if (chemLqRoot) chemLqRoot.classList.remove('active');
    if (lqFloatBtn) lqFloatBtn.style.display = 'none';
    if (chemMcRoot) chemMcRoot.style.display = '';
    if (typeof showHomeView === 'function') showHomeView();
    if (typeof updateFloatingButtonsVisibility === 'function') updateFloatingButtonsVisibility();
    injectHomeChemLqSwitchRow();
  }

  async function openLqChapter(chapId) {
    activeLqChapterId = chapId;
    isChemLqMode = true;
    localStorage.setItem('dse_chem_lq_mode', '1');
    localStorage.setItem('dse_last_lq_chap', String(chapId));

    const chemMcRoot = document.getElementById('chemAppRootContainer');
    const chemLqRoot = document.getElementById('chemLqRootContainer');
    const floatingGrp = document.getElementById('floatingActionGroup');
    const lqFloatBtn = document.getElementById('lqFloatingDirBtn');

    if (chemMcRoot) chemMcRoot.style.display = 'none';
    if (floatingGrp) floatingGrp.style.display = 'none';
    if (chemLqRoot) chemLqRoot.classList.add('active');
    if (lqFloatBtn) lqFloatBtn.style.display = 'flex';

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
        <div class="lq-q-card" style="text-align:center; padding:48px 20px; color:${M3_LQ.textSub};">
          <div style="font-size:15px; color:${M3_LQ.primary}; margin-bottom:6px;">正在載入 ${chapTitle} (LQ) ...</div>
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
          <div class="lq-q-card" style="text-align:center; padding:48px 24px; color:${M3_LQ.textSub};">
            <div style="font-size:15px; color:${M3_LQ.textMain}; margin-bottom:8px;">本章節尚未建立 Long Question 題庫 (chemlq_ch${padId}_${lang}.js)</div>
            <div style="font-size:13px; margin-bottom:18px;">請點擊右下角「LQ 目錄選單」選擇其他已上傳章節。</div>
            <button type="button" id="emptyLqOpenDirBtn" style="background:${M3_LQ.primary}; color:#FFFFFF; border:none; padding:9px 18px; border-radius:18px; font-size:13px; cursor:pointer;">
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

  window.ChemLqModule = {
    version: MODULE_VERSION,
    updatedAt: UPDATED_AT,
    openDirectory: openLqDirectoryModal,
    openChapter: openLqChapter,
    exitToHome: exitChemLqToHome
  };

  function init() {
    injectChemLqStyles();
    ensureChemLqWorkspace();
    injectHomeChemLqSwitchRow();
    upgradeAllEmojiArrows();

    const observer = new MutationObserver(() => {
      injectHomeChemLqSwitchRow();
      upgradeAllEmojiArrows();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

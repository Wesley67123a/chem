// 更新時間：2026-11-13 11:04:00 (HKT) | 版本：v0.1.24
// 檔案位置：module/biomclq.js
// 功能說明：HKDSE Biology MC & LQ 雙模式題庫模組、主頁入口卡片、29章分冊目錄與作答/Marking Scheme 引擎

(function () {
  'use strict';

  const MODULE_VERSION = '0.1.24';
  const UPDATED_AT = '2026-11-13 11:04:00';

  // HKDSE Biology 完整 29 章分冊架構 (對應 biodocs/qb_x_chxx_e.docx 與 biolq/biolq_chxx_e.js)
  const BIO_SYLLABUS = [
    {
      bookId: 'BOOK-1A',
      bookName: 'Book 1A 細胞與生命分子 (Ch 1 – 4)',
      bookNum: '1',
      chapters: [
        { id: 1, name: 'Ch 1: Introducing Biology (生物學入門)' },
        { id: 2, name: 'Ch 2: The Cell as the Basic Unit of Life (細胞)' },
        { id: 3, name: 'Ch 3: Movement of Substances across Membrane (物質穿越細胞膜)' },
        { id: 4, name: 'Ch 4: Enzymes and Metabolism (酶與新陳代謝)' }
      ]
    },
    {
      bookId: 'BOOK-1B',
      bookName: 'Book 1B 營養與氣體交換及轉運 (Ch 5 – 10)',
      bookNum: '1',
      chapters: [
        { id: 5, name: 'Ch 5: Food and Humans (食物與人類)' },
        { id: 6, name: 'Ch 6: Nutrition in Humans (人的營養)' },
        { id: 7, name: 'Ch 7: Gas Exchange in Humans (人的氣體交換)' },
        { id: 8, name: 'Ch 8: Transport in Humans (人體內的轉運)' },
        { id: 9, name: 'Ch 9: Nutrition and Gas Exchange in Plants (植物的營養與氣體交換)' },
        { id: 10, name: 'Ch 10: Transpiration, Transport and Support in Plants (蒸騰、轉運與支持)' }
      ]
    },
    {
      bookId: 'BOOK-2',
      bookName: 'Book 2 生物與環境：生殖、協調與體內平衡 (Ch 11 – 18)',
      bookNum: '2',
      chapters: [
        { id: 11, name: 'Ch 11: Cell Cycle and Division (細胞週期與分裂)' },
        { id: 12, name: 'Ch 12: Reproduction in Flowering Plants (有花植物的生殖)' },
        { id: 13, name: 'Ch 13: Reproduction in Humans (人的生殖)' },
        { id: 14, name: 'Ch 14: Growth and Development (生長與發育)' },
        { id: 15, name: 'Ch 15: Detecting the Environment (環境的探測)' },
        { id: 16, name: 'Ch 16: Coordination in Humans (人體的協調)' },
        { id: 17, name: 'Ch 17: Movement in Humans (人體的運動)' },
        { id: 18, name: 'Ch 18: Homeostasis (體內平衡)' }
      ]
    },
    {
      bookId: 'BOOK-3',
      bookName: 'Book 3 生態系、能量轉換與健康及疾病 (Ch 19 – 24)',
      bookNum: '3',
      chapters: [
        { id: 19, name: 'Ch 19: Ecosystems (生態系)' },
        { id: 20, name: 'Ch 20: Photosynthesis (光合作用)' },
        { id: 21, name: 'Ch 21: Respiration (呼吸作用)' },
        { id: 22, name: 'Ch 22: Non-infectious Diseases (非傳染病)' },
        { id: 23, name: 'Ch 23: Infectious Diseases (傳染病)' },
        { id: 24, name: 'Ch 24: Body Defence Mechanisms (身體防禦機制)' }
      ]
    },
    {
      bookId: 'BOOK-4',
      bookName: 'Book 4 遺傳與進化 (Ch 25 – 29)',
      bookNum: '4',
      chapters: [
        { id: 25, name: 'Ch 25: Basic Genetics (基礎遺傳學)' },
        { id: 26, name: 'Ch 26: Molecular Genetics (分子遺傳學)' },
        { id: 27, name: 'Ch 27: Biotechnology (生物工程)' },
        { id: 28, name: 'Ch 28: Biodiversity (生物多樣性)' },
        { id: 29, name: 'Ch 29: Evolution (進化)' }
      ]
    }
  ];

  const BIO_CHAPTER_MAP = {};
  BIO_SYLLABUS.forEach(b => {
    b.chapters.forEach(c => {
      BIO_CHAPTER_MAP[c.id] = { book: b, chapter: c };
    });
  });

  let activeBioSubMode = localStorage.getItem('dse_bio_submode') || 'mc'; // 'mc' | 'lq'
  let activeBioChapterId = parseInt(localStorage.getItem('dse_last_bio_chap') || '0', 10) || null;
  let bioMcScore = { answered: 0, correct: 0, total: 0 };

  const ICONS = {
    dna: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M17 6l-2.5-2.5"/><path d="M14 8l-1-1"/><path d="M7 18l2.5 2.5"/><path d="M3.5 14.5l.5.5"/><path d="M20 9l.5.5"/><path d="M6.5 12.5l1 1"/><path d="M16.5 10.5l1 1"/><path d="M10 16l1.5 1.5"/></svg>`,
    list: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    cross: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
  };

  // ==========================================================================
  // 1. 確保 mammoth.js 已載入（用於解析 biodocs/*.docx）
  // ==========================================================================
  async function ensureMammothReady() {
    if (typeof mammoth !== 'undefined') return true;
    const urls = [
      'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js',
      'https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js'
    ];
    for (const src of urls) {
      try {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = src;
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
        if (typeof mammoth !== 'undefined') return true;
      } catch (e) {}
    }
    return false;
  }

  // ==========================================================================
  // 2. 注入 Bio MC & LQ 專屬樣式表
  // ==========================================================================
  function injectBioModuleStyles() {
    if (document.getElementById('dseBioMcLqStyleV0124')) return;
    const style = document.createElement('style');
    style.id = 'dseBioMcLqStyleV0124';
    style.textContent = `
      /* 首頁 Biology (MC / LQ) 入口卡片 */
      #homeBioEntryCard {
        background: #FFFFFF;
        border: 2.5px solid #C8E6C9;
        border-radius: 28px;
        padding: 20px 26px;
        margin-bottom: 18px;
        box-shadow: 0 6px 24px rgba(27, 94, 32, 0.05);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        box-sizing: border-box;
      }
      .bio-home-btn-group {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      .bio-home-mc-btn {
        background: #1B5E20;
        color: #FFFFFF;
        border: none;
        padding: 9px 15px;
        border-radius: 20px;
        font-size: 12.5px;
        cursor: pointer;
        white-space: nowrap;
      }
      .bio-home-lq-btn {
        background: #E8F5E9;
        color: #1B5E20;
        border: 1.5px solid #A5D6A7;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 12.5px;
        cursor: pointer;
        white-space: nowrap;
      }

      /* Bio 主工作區容器（使用 !important 防止被 cleanLegacyPageLayout 誤隱藏） */
      #bioAppRootContainer {
        display: none !important;
        width: 100%;
        max-width: 860px;
        margin: 0 auto;
        padding: 58px clamp(20px, 5vw, 48px) 180px clamp(20px, 5vw, 48px);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #1D1F2C;
        box-sizing: border-box;
      }
      @media (orientation: landscape) and (min-width: 768px) {
        #bioAppRootContainer {
          max-width: 980px;
          padding: 58px 160px 160px 56px;
        }
      }
      @media (orientation: portrait) {
        #bioAppRootContainer {
          max-width: 92vw;
          padding: 58px 4vw 190px 4vw;
        }
      }
      #bioAppRootContainer.active {
        display: block !important;
      }

      .bio-top-nav-card {
        background: #FFFFFF;
        border: 2.5px solid #C8E6C9;
        border-radius: 28px;
        padding: 18px 26px;
        margin-bottom: 20px;
        box-shadow: 0 6px 24px rgba(27, 94, 32, 0.05);
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .bio-submode-switch {
        display: inline-flex;
        background: #E8F5E9;
        border-radius: 16px;
        padding: 3px;
        gap: 3px;
      }
      .bio-submode-pill {
        border: none;
        background: transparent;
        color: #2E7D32;
        padding: 5px 14px;
        border-radius: 13px;
        font-size: 12.5px;
        cursor: pointer;
      }
      .bio-submode-pill.active {
        background: #1B5E20;
        color: #FFFFFF;
      }

      /* Bio 題目卡片 */
      .bio-q-card {
        background: #FFFFFF;
        border: 2.5px solid #E2E8F0;
        border-radius: 28px;
        padding: 26px clamp(22px, 4vw, 38px);
        margin-bottom: 20px;
        box-shadow: 0 6px 24px rgba(27, 94, 32, 0.04);
        box-sizing: border-box;
      }
      .bio-q-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13.5px;
        color: #1B5E20;
        margin-bottom: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid #E2E8F0;
      }
      .bio-q-body {
        font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;
        font-size: 16px;
        line-height: 1.75;
        color: #1D1F2C;
        overflow-x: auto;
        word-break: break-word;
      }
      .bio-q-body img {
        max-width: 75% !important;
        max-height: 220px !important;
        width: auto !important;
        height: auto !important;
        display: block;
        margin: 10px auto;
        object-fit: contain;
        mix-blend-mode: multiply;
      }
      .bio-q-body table {
        width: 100%;
        max-width: 580px;
        border-collapse: collapse;
        margin: 12px auto;
        font-size: 14.5px;
      }
      .bio-q-body table th,
      .bio-q-body table td {
        border: 1px solid #CBD5E1;
        padding: 7px 10px;
        text-align: center;
      }

      /* Bio MC 選項列 */
      .bio-ans-row {
        display: flex;
        gap: 12px;
        margin-top: 16px;
      }
      .bio-opt-btn {
        flex: 1;
        padding: 10px 2px;
        border: 1.5px solid #CBD5E1;
        border-radius: 16px;
        background: #F8FAFC;
        color: #1B5E20;
        font-size: 14px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        transition: all 0.15s ease;
      }
      .bio-opt-btn.correct {
        background: #1B5E20 !important;
        border-color: #1B5E20 !important;
        color: #FFFFFF !important;
      }
      .bio-opt-btn.wrong {
        background: #FFEBEE !important;
        border: 1.5px dashed #C62828 !important;
        color: #C62828 !important;
      }
      .bio-opt-btn.dimmed {
        background: #FFFFFF !important;
        border-color: #E2E8F0 !important;
        color: #94A3B8 !important;
        opacity: 0.4;
      }
      .bio-exp-box {
        display: none;
        margin-top: 16px;
        padding: 16px 20px;
        border-radius: 18px;
        background: #E8F5E9;
        border-left: 3.5px solid #1B5E20;
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 14.5px;
        line-height: 1.65;
        color: #1D1F2C;
      }
      .bio-exp-box.open {
        display: block;
      }

      /* Bio LQ 分題草稿與 Marking Scheme */
      .bio-lq-subq {
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px dashed #CBD5E1;
      }
      .bio-lq-scratchpad {
        width: 100%;
        min-height: 70px;
        margin-top: 10px;
        padding: 10px 14px;
        border-radius: 16px;
        border: 1.5px solid #CBD5E1;
        background: #F8FAFC;
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
      .bio-lq-scratchpad:focus {
        border-color: #1B5E20;
        background: #FFFFFF;
      }

      /* Bio 懸浮目錄按鈕 */
      #bioFloatingDirBtn {
        position: fixed;
        bottom: 18px;
        right: 16px;
        z-index: 9996;
        display: none;
        background: #1B5E20;
        color: #FFFFFF;
        border: none;
        padding: 0 16px;
        border-radius: 20px;
        font-size: 12px;
        box-shadow: 0 4px 14px rgba(27, 94, 32, 0.25);
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
  // 3. 在首頁 (#chemDashboardHome) 自動注入 Biology (MC & LQ) 入口卡片
  // ==========================================================================
  function injectHomeBioCard() {
    const dashboard = document.getElementById('chemDashboardHome');
    if (!dashboard || document.getElementById('homeBioEntryCard')) return;

    const lqCard = document.getElementById('homeLqEntryCard');
    const firstM3Card = dashboard.querySelector('.m3-card');
    const anchorNode = lqCard ? lqCard.nextSibling : firstM3Card;
    if (!anchorNode) return;

    const bioCard = document.createElement('div');
    bioCard.id = 'homeBioEntryCard';
    bioCard.innerHTML = `
      <div style="display:flex; align-items:center; gap:14px; min-width:0; flex:1;">
        <div style="width:40px; height:40px; border-radius:20px; background:#E8F5E9; color:#1B5E20; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          ${ICONS.dna}
        </div>
        <div style="min-width:0; flex:1;">
          <div class="m3-title-medium" style="font-size:15px; color:#1D1F2C;">Biology Question Bank (MC &amp; LQ)</div>
          <div style="font-size:12px; color:#5E6478; margin-top:2px;">
            ${activeBioChapterId && BIO_CHAPTER_MAP[activeBioChapterId]
              ? `上次選擇：${BIO_CHAPTER_MAP[activeBioChapterId].chapter.name}`
              : '按 Book 1A – 4 共 29 章瀏覽生物科 MC 與長題目'}
          </div>
        </div>
      </div>
      <div class="bio-home-btn-group">
        <button type="button" id="homeOpenBioMcBtn" class="bio-home-mc-btn">Bio MC &rsaquo;</button>
        <button type="button" id="homeOpenBioLqBtn" class="bio-home-lq-btn">Bio LQ &rsaquo;</button>
      </div>
    `;

    anchorNode.parentNode.insertBefore(bioCard, anchorNode);

    bioCard.querySelector('#homeOpenBioMcBtn').addEventListener('click', () => {
      openBioDirectoryModal('mc');
    });
    bioCard.querySelector('#homeOpenBioLqBtn').addEventListener('click', () => {
      openBioDirectoryModal('lq');
    });
  }

  // ==========================================================================
  // 4. 生物科 29 章分冊目錄彈窗 (支援頂部直接切換 MC / LQ 模式)
  // ==========================================================================
  function openBioDirectoryModal(forcedMode = null) {
    if (forcedMode === 'mc' || forcedMode === 'lq') {
      activeBioSubMode = forcedMode;
      localStorage.setItem('dse_bio_submode', activeBioSubMode);
    }

    let modal = document.getElementById('bioCenterDirectoryModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'bioCenterDirectoryModal';
      modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(29,31,44,0.35); z-index:99999; justify-content:center; align-items:center; padding:18px; box-sizing:border-box; font-family:sans-serif;';
      document.body.appendChild(modal);
    }

    const renderModalBody = () => {
      const modeLabel = activeBioSubMode === 'lq' ? 'Long Questions (LQ)' : 'Multiple Choice (MC)';
      let html = `
        <div style="background:#FFFFFF; width:100%; max-width:440px; height:82vh; max-height:640px; border-radius:28px; box-shadow:0 14px 44px rgba(27,94,32,0.16); display:flex; flex-direction:column; overflow:hidden; border:1.5px solid #C8E6C9;">
          <div style="padding:18px 22px; background:#E8F5E9; color:#1B5E20; display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <div>
              <h2 class="m3-title-medium" style="margin:0; font-size:16px;">Biology ${modeLabel}</h2>
              <div style="font-size:11px; color:#2E7D32; margin-top:2px;">選擇 Book / Chapter 進入練習</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <div class="bio-submode-switch" style="background:#FFFFFF;">
                <button type="button" class="bio-submode-pill ${activeBioSubMode === 'mc' ? 'active' : ''}" data-bmode="mc">MC</button>
                <button type="button" class="bio-submode-pill ${activeBioSubMode === 'lq' ? 'active' : ''}" data-bmode="lq">LQ</button>
              </div>
              <button type="button" id="closeBioDirModalBtn" style="background:#FFFFFF; border:none; color:#1B5E20; width:32px; height:32px; border-radius:16px; font-size:18px; cursor:pointer; line-height:1;">&times;</button>
            </div>
          </div>
          <div style="flex:1; overflow-y:auto; padding:16px 20px; background:#F4F5FA; overscroll-behavior:contain;">
      `;

      BIO_SYLLABUS.forEach((book, bIdx) => {
        const isExpanded = activeBioChapterId
          ? book.chapters.some(c => c.id === activeBioChapterId)
          : bIdx === 0;

        html += `
          <div style="background:#FFFFFF; border-radius:20px; margin-bottom:10px; border:1.5px solid #E2E8F0; overflow:hidden;">
            <div class="bio-dir-book-header" style="padding:13px 16px; background:#FFFFFF; font-size:13.5px; color:#1D1F2C; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>${book.bookName}</span>
              <span class="bio-dir-arrow" style="font-size:11px; color:#2E7D32;">${isExpanded ? '▼' : '▶'}</span>
            </div>
            <div class="bio-dir-chap-list" style="display:${isExpanded ? 'flex' : 'none'}; flex-direction:column;">
        `;

        book.chapters.forEach(ch => {
          const isActive = ch.id === activeBioChapterId;
          html += `
            <div class="bio-dir-chap-item" data-chid="${ch.id}" style="padding:11px 16px 11px 20px; border-top:1px solid #E2E8F0; font-size:13px; color:${isActive ? '#1B5E20' : '#1D1F2C'}; background:${isActive ? '#E8F5E9' : '#FFFFFF'}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>${ch.name}</span>
              <span style="font-size:12px; color:#1B5E20; white-space:nowrap; margin-left:8px;">
                進入 ${activeBioSubMode.toUpperCase()} &rsaquo;
              </span>
            </div>
          `;
        });

        html += `</div></div>`;
      });

      html += `</div></div>`;
      modal.innerHTML = html;

      modal.querySelector('#closeBioDirModalBtn').onclick = () => {
        modal.style.display = 'none';
      };
      modal.querySelectorAll('.bio-submode-pill').forEach(btn => {
        btn.onclick = () => {
          activeBioSubMode = btn.dataset.bmode;
          localStorage.setItem('dse_bio_submode', activeBioSubMode);
          renderModalBody();
        };
      });
      modal.querySelectorAll('.bio-dir-book-header').forEach(header => {
        header.onclick = e => {
          const list = e.currentTarget.nextElementSibling;
          const arrow = e.currentTarget.querySelector('.bio-dir-arrow');
          const hidden = list.style.display === 'none';
          list.style.display = hidden ? 'flex' : 'none';
          if (arrow) arrow.textContent = hidden ? '▼' : '▶';
        };
      });
      modal.querySelectorAll('.bio-dir-chap-item').forEach(item => {
        item.onclick = e => {
          const chId = parseInt(e.currentTarget.getAttribute('data-chid'), 10);
          modal.style.display = 'none';
          openBioChapter(chId, activeBioSubMode);
        };
      });
    };

    modal.onclick = e => {
      if (e.target === modal) modal.style.display = 'none';
    };

    renderModalBody();
    modal.style.display = 'flex';
  }

  // ==========================================================================
  // 5. 建立 Bio 主工作台 (支援 MC / LQ 即時切換與手動匯入 .docx)
  // ==========================================================================
  function ensureBioWorkspace() {
    if (document.getElementById('bioAppRootContainer')) return;

    const bioRoot = document.createElement('div');
    bioRoot.id = 'bioAppRootContainer';
    bioRoot.innerHTML = `
      <div class="bio-top-nav-card">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:10px; min-width:0; flex:1;">
            <button type="button" id="bioBackHomeBtn" style="padding:6px 14px; font-size:12px; border:none; border-radius:18px; background:#E8F5E9; color:#1B5E20; cursor:pointer; white-space:nowrap;">
              &lsaquo; 首頁
            </button>
            <h2 id="bioCurrentChapterTitle" class="m3-title-medium" style="margin:0; font-size:15px; color:#1D1F2C; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              Biology
            </h2>
          </div>
          <div style="display:flex; align-items:center; gap:8px; white-space:nowrap;">
            <div class="bio-submode-switch">
              <button type="button" class="bio-submode-pill" id="bioBarMcBtn">MC</button>
              <button type="button" class="bio-submode-pill" id="bioBarLqBtn">LQ</button>
            </div>
            <label style="padding:6px 12px; font-size:11.5px; border:1px solid #A5D6A7; border-radius:16px; background:#FFFFFF; cursor:pointer; color:#1B5E20;">
              載入 .docx
              <input type="file" id="bioManualDocxInput" accept=".docx" style="display:none;" />
            </label>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:8px; border-top:1px solid #E2E8F0; font-size:12px; color:#5E6478;">
          <span id="bioStatsLabel">準備就緒</span>
          <button type="button" id="bioToggleAllExpBtn" style="border:none; background:#E8F5E9; color:#1B5E20; padding:4px 10px; border-radius:10px; font-size:11.5px; cursor:pointer;">
            展開 / 收合全部答案
          </button>
        </div>
      </div>
      <div id="bioQuestionsFeed"></div>
    `;
    document.body.appendChild(bioRoot);

    if (!document.getElementById('bioFloatingDirBtn')) {
      const fBtn = document.createElement('button');
      fBtn.id = 'bioFloatingDirBtn';
      fBtn.type = 'button';
      fBtn.innerHTML = `${ICONS.list}<span>Bio 目錄選單</span>`;
      fBtn.onclick = () => openBioDirectoryModal(activeBioSubMode);
      document.body.appendChild(fBtn);
    }

    document.getElementById('bioBackHomeBtn').onclick = () => {
      if (window.DseSectionManager) {
        window.DseSectionManager.switchSection('chem_mc');
      }
      if (typeof showHomeView === 'function') showHomeView();
    };

    document.getElementById('bioBarMcBtn').onclick = () => {
      if (activeBioChapterId) openBioChapter(activeBioChapterId, 'mc');
    };
    document.getElementById('bioBarLqBtn').onclick = () => {
      if (activeBioChapterId) openBioChapter(activeBioChapterId, 'lq');
    };

    let allOpen = false;
    document.getElementById('bioToggleAllExpBtn').onclick = () => {
      allOpen = !allOpen;
      document.querySelectorAll('#bioQuestionsFeed .bio-exp-box').forEach(box => {
        box.classList.toggle('open', allOpen);
      });
    };

    document.getElementById('bioManualDocxInput').onchange = async e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const buf = await file.arrayBuffer();
      if (activeBioSubMode === 'lq') {
        await parseAndRenderBioLqDocx(buf, file.name);
      } else {
        await parseAndRenderBioMcDocx(buf, file.name);
      }
      e.target.value = '';
    };
  }

  function activateBioSection() {
    const chemMcRoot = document.getElementById('chemAppRootContainer');
    const chemLqRoot = document.getElementById('chemLqRootContainer');
    const bioRoot = document.getElementById('bioAppRootContainer');
    const floatingGrp = document.getElementById('floatingActionGroup');
    const lqFloatBtn = document.getElementById('lqFloatingDirBtn');
    const bioFloatBtn = document.getElementById('bioFloatingDirBtn');

    if (chemMcRoot) chemMcRoot.style.display = 'none';
    if (chemLqRoot) chemLqRoot.classList.remove('active');
    if (floatingGrp) floatingGrp.style.display = 'none';
    if (lqFloatBtn) lqFloatBtn.style.display = 'none';
    if (bioRoot) bioRoot.classList.add('active');
    if (bioFloatBtn) bioFloatBtn.style.display = 'flex';
  }

  // ==========================================================================
  // 6. 開啟指定 Bio 章節 (MC 讀 biodocs/qb_x_chxx_e.docx | LQ 讀 biolq/ 或 biodocs/)
  // ==========================================================================
  async function openBioChapter(chapId, subMode = 'mc') {
    activeBioChapterId = chapId;
    activeBioSubMode = subMode === 'lq' ? 'lq' : 'mc';
    localStorage.setItem('dse_last_bio_chap', String(chapId));
    localStorage.setItem('dse_bio_submode', activeBioSubMode);

    if (window.DseSectionManager) {
      window.DseSectionManager.switchSection('bio');
    } else {
      activateBioSection();
    }

    const info = BIO_CHAPTER_MAP[chapId];
    const chapName = info ? info.chapter.name : `Ch ${chapId}`;
    const bookNum = info ? info.book.bookNum : '1';
    const padId = String(chapId).padStart(2, '0');

    const titleEl = document.getElementById('bioCurrentChapterTitle');
    const statsEl = document.getElementById('bioStatsLabel');
    const feedEl = document.getElementById('bioQuestionsFeed');

    document.getElementById('bioBarMcBtn').classList.toggle('active', activeBioSubMode === 'mc');
    document.getElementById('bioBarLqBtn').classList.toggle('active', activeBioSubMode === 'lq');

    if (titleEl) titleEl.textContent = `${chapName} (${activeBioSubMode.toUpperCase()})`;
    if (statsEl) statsEl.textContent = '載入中...';
    if (feedEl) {
      feedEl.innerHTML = `
        <div class="bio-q-card" style="text-align:center; padding:48px 20px; color:#5E6478;">
          <div style="font-size:15px; color:#1B5E20;">正在載入 ${chapName} (${activeBioSubMode.toUpperCase()}) ...</div>
        </div>
      `;
    }

    if (activeBioSubMode === 'mc') {
      const candidateUrls = Array.from(
        new Set([
          `./biodocs/qb_${bookNum}_ch${padId}_e.docx`,
          `./biodocs/qb_1_ch${padId}_e.docx`,
          `./biodocs/qb_1a_ch${padId}_e.docx`,
          `./biodocs/qb_1b_ch${padId}_e.docx`,
          `./biodocs/qb_2_ch${padId}_e.docx`,
          `./biodocs/qb_3_ch${padId}_e.docx`,
          `./biodocs/qb_4_ch${padId}_e.docx`
        ])
      );

      let buf = null;
      for (const u of candidateUrls) {
        try {
          const res = await fetch(u, { cache: 'no-cache' });
          if (res.ok) {
            buf = await res.arrayBuffer();
            break;
          }
        } catch (e) {}
      }

      if (!buf) {
        if (statsEl) statsEl.textContent = '尚未上傳題庫';
        if (feedEl) {
          feedEl.innerHTML = `
            <div class="bio-q-card" style="text-align:center; padding:48px 24px; color:#5E6478;">
              <div style="font-size:15px; color:#1D1F2C; margin-bottom:8px;">尚未找到遠端檔案：biodocs/qb_${bookNum}_ch${padId}_e.docx</div>
              <div style="font-size:13px; margin-bottom:16px;">可將 Word 檔上傳至 GitHub 的 <code>biodocs/</code> 資料夾，或點擊右上角「載入 .docx」直接開啟。</div>
            </div>
          `;
        }
        return;
      }

      await parseAndRenderBioMcDocx(buf, chapName);
    } else {
      // Bio LQ 模式：優先嘗試讀取 biolq/biolq_chXX_e.js，其次嘗試讀取 biodocs/lq_x_chXX_e.docx
      const keyStr = String(chapId);
      if (window.BIO_LQ_BANK && window.BIO_LQ_BANK[keyStr]) {
        renderBioLqBank(window.BIO_LQ_BANK[keyStr]);
        return;
      }

      const jsCandidates = [`./biolq/biolq_ch${padId}_e.js`, `./biolq/biolq_ch${chapId}_e.js`];
      for (const src of jsCandidates) {
        const ok = await new Promise(resolve => {
          const s = document.createElement('script');
          s.src = `${src}?v=${Date.now()}`;
          s.onload = () => resolve(!!(window.BIO_LQ_BANK && window.BIO_LQ_BANK[keyStr]));
          s.onerror = () => resolve(false);
          document.head.appendChild(s);
        });
        if (ok && window.BIO_LQ_BANK && window.BIO_LQ_BANK[keyStr]) {
          renderBioLqBank(window.BIO_LQ_BANK[keyStr]);
          return;
        }
      }

      const docxCandidates = [
        `./biodocs/lq_${bookNum}_ch${padId}_e.docx`,
        `./biodocs/qb_${bookNum}_ch${padId}_lq_e.docx`
      ];
      let lqBuf = null;
      for (const u of docxCandidates) {
        try {
          const res = await fetch(u, { cache: 'no-cache' });
          if (res.ok) {
            lqBuf = await res.arrayBuffer();
            break;
          }
        } catch (e) {}
      }

      if (lqBuf) {
        await parseAndRenderBioLqDocx(lqBuf, chapName);
      } else {
        if (statsEl) statsEl.textContent = '尚未上傳 Bio LQ';
        if (feedEl) {
          feedEl.innerHTML = `
            <div class="bio-q-card" style="text-align:center; padding:48px 24px; color:#5E6478;">
              <div style="font-size:15px; color:#1D1F2C; margin-bottom:8px;">本章節尚未建立 Bio LQ 題庫</div>
              <div style="font-size:13px;">可上傳 <code>biolq/biolq_ch${padId}_e.js</code> 或 <code>biodocs/lq_${bookNum}_ch${padId}_e.docx</code>，或點擊右上角「載入 .docx」匯入練習。</div>
            </div>
          `;
        }
      }
    }
  }

  // ==========================================================================
  // 7. Bio MC Word (.docx) 解析與渲染引擎
  // ==========================================================================
  async function parseAndRenderBioMcDocx(arrayBuffer, labelName) {
    const feedEl = document.getElementById('bioQuestionsFeed');
    const statsEl = document.getElementById('bioStatsLabel');

    const ready = await ensureMammothReady();
    if (!ready || typeof mammoth === 'undefined') {
      if (feedEl) feedEl.innerHTML = `<div class="bio-q-card">無法載入 mammoth.js 解析引擎，請檢查網絡連線。</div>`;
      return;
    }

    try {
      const result = await mammoth.convertToHtml(
        { arrayBuffer },
        {
          convertImage: mammoth.images.imgElement(image => {
            return image.read('base64').then(imageBuffer => {
              let cType = (image.contentType || 'image/png').toLowerCase();
              if (!cType.startsWith('image/')) cType = 'image/png';
              return { src: 'data:' + cType + ';base64,' + imageBuffer };
            });
          })
        }
      );

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.value;

      const blocks = Array.from(tempDiv.children);
      const questions = [];
      let currQ = null;

      blocks.forEach(el => {
        const txt = (el.textContent || '').trim();
        if (!txt && !el.querySelector('img, table')) return;
        if (/^©\s*\d{4}|^HKDSE NEW BIOLOGY|^Question Bank|^Multiple-choice/i.test(txt)) return;

        const codeMatch = txt.match(/^(BioMCQ\s*\d+|Question\s*\d+|\d+\s*[\.、])/i);
        if (codeMatch && (/^BioMCQ/i.test(txt) || txt.length < 22)) {
          if (currQ && currQ.stemNodes.length > 0) questions.push(currQ);
          currQ = {
            code: codeMatch[1].replace(/\s+/g, ''),
            stemNodes: [],
            expNodes: [],
            answer: '',
            inExp: false
          };
          return;
        }

        if (!currQ) {
          currQ = { code: `BioQ${questions.length + 1}`, stemNodes: [], expNodes: [], answer: '', inExp: false };
        }

        const ansMatch = txt.match(/^(?:Answer|Ans|答案)\s*[:：]?\s*\(?([A-D])\)?/i);
        if (ansMatch && !/^[A-D][\.\)]/.test(txt)) {
          currQ.answer = ansMatch[1].toUpperCase();
          currQ.inExp = true;
          const rest = el.innerHTML.replace(/^(?:Answer|Ans|答案)\s*[:：]?\s*\(?[A-D]\)?[\s\.、:：\-—]*/i, '').trim();
          if (rest) currQ.expNodes.push(`<p>${rest}</p>`);
        } else if (currQ.inExp) {
          currQ.expNodes.push(el.outerHTML);
        } else {
          currQ.stemNodes.push(el.outerHTML);
        }
      });

      if (currQ && currQ.stemNodes.length > 0) questions.push(currQ);

      if (questions.length === 0) {
        if (statsEl) statsEl.textContent = '0 題';
        if (feedEl) feedEl.innerHTML = `<div class="bio-q-card">未能從 <b>${labelName}</b> 識別出標準題目。</div>`;
        return;
      }

      bioMcScore = { answered: 0, correct: 0, total: questions.length };
      if (statsEl) statsEl.textContent = `共 ${questions.length} 題 · 已答 0 / ${questions.length}`;

      feedEl.innerHTML = questions
        .map(
          (q, idx) => `
          <div class="bio-q-card" data-ans="${q.answer}">
            <div class="bio-q-meta">
              <span>${q.code}</span>
              <span>第 ${idx + 1} / ${questions.length} 題</span>
            </div>
            <div class="bio-q-body">${q.stemNodes.join('')}</div>
            <div style="margin-top:16px; padding-top:14px; border-top:1px dashed #E2E8F0;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span class="bio-q-status" style="font-size:12px; color:#5E6478;">請選擇答案：</span>
                <button type="button" class="bio-peek-btn" style="border:none; background:#E8F5E9; color:#1B5E20; font-size:11.5px; cursor:pointer; padding:4px 10px; border-radius:10px;">顯示 / 隱藏解析</button>
              </div>
              <div class="bio-ans-row">
                ${['A', 'B', 'C', 'D']
                  .map(opt => `<button type="button" class="bio-opt-btn" data-opt="${opt}">${opt}</button>`)
                  .join('')}
              </div>
            </div>
            <div class="bio-exp-box">
              <div style="color:#1B5E20; font-size:14px; margin-bottom:6px;">Answer: ${q.answer || '未標註'}</div>
              <div>${q.expNodes.join('') || '（本題原檔無附帶文字解析）'}</div>
            </div>
          </div>
        `
        )
        .join('');

      feedEl.querySelectorAll('.bio-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('.bio-q-card');
          if (card.dataset.locked === '1') return;
          card.dataset.locked = '1';

          const correctAns = card.dataset.ans;
          const chosen = btn.dataset.opt;
          const isRight = !correctAns || chosen === correctAns;
          const statusEl = card.querySelector('.bio-q-status');
          const expBox = card.querySelector('.bio-exp-box');

          bioMcScore.answered += 1;
          if (isRight) bioMcScore.correct += 1;
          if (statsEl) {
            statsEl.textContent = `共 ${bioMcScore.total} 題 · 已答 ${bioMcScore.answered} / ${bioMcScore.total} (對 ${bioMcScore.correct})`;
          }

          if (statusEl) {
            statusEl.textContent = `已鎖定：選 ${chosen}（${isRight ? '對' : '錯'}）`;
            statusEl.style.color = isRight ? '#1B5E20' : '#C62828';
          }

          card.querySelectorAll('.bio-opt-btn').forEach(b => {
            b.disabled = true;
            if (b.dataset.opt === correctAns) {
              b.classList.add('correct');
              b.innerHTML = `${b.dataset.opt} ${ICONS.check}`;
            } else if (b.dataset.opt === chosen && chosen !== correctAns) {
              b.classList.add('wrong');
              b.innerHTML = `${b.dataset.opt} ${ICONS.cross}`;
            } else {
              b.classList.add('dimmed');
            }
          });

          if (expBox) expBox.classList.add('open');
        });
      });

      feedEl.querySelectorAll('.bio-peek-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('.bio-q-card');
          const expBox = card.querySelector('.bio-exp-box');
          if (expBox) expBox.classList.toggle('open');
        });
      });
    } catch (err) {
      if (statsEl) statsEl.textContent = '解析失敗';
      if (feedEl) feedEl.innerHTML = `<div class="bio-q-card">解析檔案時發生錯誤：${err.message}</div>`;
    }
  }

  // ==========================================================================
  // 8. Bio LQ 渲染引擎 (支援 JS 題庫與 Word .docx 長題目)
  // ==========================================================================
  function renderBioLqBank(bankData) {
    const feedEl = document.getElementById('bioQuestionsFeed');
    const statsEl = document.getElementById('bioStatsLabel');
    if (statsEl) statsEl.textContent = `共 ${bankData.questions.length} 大題 / ${bankData.totalMarks} 分`;

    feedEl.innerHTML = bankData.questions
      .map(
        q => `
        <div class="bio-q-card" id="${q.id}">
          <div class="bio-q-meta">
            <span>${q.id} &nbsp;|&nbsp; Question ${q.number}</span>
            <span>(${q.marks} marks)</span>
          </div>
          <div class="bio-q-body">${q.stemHtml}</div>
          ${q.subQuestions
            .map((sq, sIdx) => {
              const draftKey = `dse_biolq_draft_${q.id}_${sIdx}`;
              const savedDraft = localStorage.getItem(draftKey) || '';
              return `
              <div class="bio-lq-subq">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; font-family:'Times New Roman', 'Noto Serif TC', serif; font-size:16px; line-height:1.6;">
                  <div><b>${sq.label}</b> &nbsp;${sq.textHtml}</div>
                  <span style="flex-shrink:0; font-family:sans-serif; font-size:12px; color:#1B5E20; background:#E8F5E9; padding:3px 10px; border-radius:12px;">${sq.marks}M</span>
                </div>
                <textarea class="bio-lq-scratchpad" data-draft-key="${draftKey}" placeholder="在此輸入 ${sq.label} 的生物作答草稿...">${savedDraft}</textarea>
                <div style="display:flex; justify-content:flex-end; margin-top:8px;">
                  <button type="button" class="bio-toggle-ms-btn" data-target="${q.id}-ms-${sIdx}" style="border:none; background:#E8F5E9; color:#1B5E20; font-size:12px; cursor:pointer; padding:5px 12px; border-radius:12px;">
                    顯示 / 隱藏 Marking Scheme
                  </button>
                </div>
                <div class="bio-exp-box" id="${q.id}-ms-${sIdx}">${sq.markingSchemeHtml}</div>
              </div>
            `;
            })
            .join('')}
        </div>
      `
      )
      .join('');

    feedEl.querySelectorAll('.bio-lq-scratchpad').forEach(ta => {
      ta.addEventListener('input', () => {
        localStorage.setItem(ta.dataset.draftKey, ta.value);
      });
    });

    feedEl.querySelectorAll('.bio-toggle-ms-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const box = document.getElementById(btn.dataset.target);
        if (box) box.classList.toggle('open');
      });
    });
  }

  async function parseAndRenderBioLqDocx(arrayBuffer, labelName) {
    const feedEl = document.getElementById('bioQuestionsFeed');
    const statsEl = document.getElementById('bioStatsLabel');

    const ready = await ensureMammothReady();
    if (!ready || typeof mammoth === 'undefined') {
      if (feedEl) feedEl.innerHTML = `<div class="bio-q-card">無法載入 mammoth.js 解析引擎。</div>`;
      return;
    }

    try {
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.value;

      const blocks = Array.from(tempDiv.children);
      const questions = [];
      let currQ = null;

      blocks.forEach(el => {
        const txt = (el.textContent || '').trim();
        if (!txt && !el.querySelector('img, table')) return;
        const qMatch = txt.match(/^(BioLQ\s*\d+|Question\s*\d+|\d+\s*[\.、])/i);
        if (qMatch && (/^BioLQ/i.test(txt) || txt.length < 25)) {
          if (currQ) questions.push(currQ);
          currQ = { code: qMatch[1].replace(/\s+/g, ''), stemNodes: [], ansNodes: [], inAns: false };
          return;
        }
        if (!currQ) {
          currQ = { code: `BioLQ-${questions.length + 1}`, stemNodes: [], ansNodes: [], inAns: false };
        }

        if (/^(?:Suggested Answer|Marking Scheme|Answer|Ans|參考答案)\s*[:：]?/i.test(txt)) {
          currQ.inAns = true;
          currQ.ansNodes.push(el.outerHTML);
        } else if (currQ.inAns) {
          currQ.ansNodes.push(el.outerHTML);
        } else {
          currQ.stemNodes.push(el.outerHTML);
        }
      });
      if (currQ && currQ.stemNodes.length > 0) questions.push(currQ);

      if (statsEl) statsEl.textContent = `共 ${questions.length} 大題 (LQ)`;
      feedEl.innerHTML = questions
        .map((q, idx) => {
          const draftKey = `dse_biolq_docx_${labelName}_${idx}`;
          const savedDraft = localStorage.getItem(draftKey) || '';
          return `
          <div class="bio-q-card">
            <div class="bio-q-meta">
              <span>${q.code}</span>
              <span>第 ${idx + 1} / ${questions.length} 大題</span>
            </div>
            <div class="bio-q-body">${q.stemNodes.join('')}</div>
            <textarea class="bio-lq-scratchpad" data-draft-key="${draftKey}" placeholder="在此輸入本題長題目作答草稿...">${savedDraft}</textarea>
            <div style="display:flex; justify-content:flex-end; margin-top:8px;">
              <button type="button" class="bio-toggle-ms-btn" data-target="biolq-docx-ms-${idx}" style="border:none; background:#E8F5E9; color:#1B5E20; font-size:12px; cursor:pointer; padding:5px 12px; border-radius:12px;">
                顯示 / 隱藏 Marking Scheme
              </button>
            </div>
            <div class="bio-exp-box" id="biolq-docx-ms-${idx}">${q.ansNodes.join('') || '（本題原檔無附帶參考答案）'}</div>
          </div>
        `;
        })
        .join('');

      feedEl.querySelectorAll('.bio-lq-scratchpad').forEach(ta => {
        ta.addEventListener('input', () => localStorage.setItem(ta.dataset.draftKey, ta.value));
      });
      feedEl.querySelectorAll('.bio-toggle-ms-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const box = document.getElementById(btn.dataset.target);
          if (box) box.classList.toggle('open');
        });
      });
    } catch (err) {
      if (feedEl) feedEl.innerHTML = `<div class="bio-q-card">解析失敗：${err.message}</div>`;
    }
  }

  // ==========================================================================
  // 9. 與 DseSectionManager 註冊並同步隐藏浮動按鈕
  // ==========================================================================
  function registerWithSectionManager() {
    if (window.DseSectionManager && typeof window.DseSectionManager.registerSection === 'function') {
      window.DseSectionManager.registerSection('bio', 'Bio', activateBioSection);
      return true;
    }
    return false;
  }

  function syncBioUiVisibility() {
    const bioRoot = document.getElementById('bioAppRootContainer');
    const bioFloatBtn = document.getElementById('bioFloatingDirBtn');
    if (bioFloatBtn && bioRoot) {
      bioFloatBtn.style.display = bioRoot.classList.contains('active') ? 'flex' : 'none';
    }
    injectHomeBioCard();
  }

  window.BioMcLqModule = {
    version: MODULE_VERSION,
    updatedAt: UPDATED_AT,
    openDirectory: openBioDirectoryModal,
    openChapter: openBioChapter
  };

  function init() {
    injectBioModuleStyles();
    ensureBioWorkspace();
    injectHomeBioCard();

    if (!registerWithSectionManager()) {
      const retryTimer = setInterval(() => {
        if (registerWithSectionManager()) clearInterval(retryTimer);
      }, 150);
      setTimeout(() => clearInterval(retryTimer), 4000);
    }

    const observer = new MutationObserver(() => {
      syncBioUiVisibility();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    syncBioUiVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

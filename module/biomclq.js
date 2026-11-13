// 更新時間：2026-11-13 12:56:00 (HKT) | 版本：v0.1.35
// 檔案位置：module/biomclq.js
// 功能說明：
//   1. 左上角三條橫線 (☰) 點開背景模糊毛玻璃「切換科目主頁」彈出對話框（附「確定切換」按鈕）
//   2. 獨立 HKDSE Biology 主頁（與 Chemistry 主頁外觀、配色、功能完全一致，支援 Bio MC 與 Bio LQ）
//   3. 清除化學首頁多餘的綠色 Bio 卡片

(function () {
  'use strict';

  const MODULE_VERSION = '0.1.35';
  const UPDATED_AT = '2026-11-13 12:56:00';

  const M3_BIO = {
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

  const BIO_SYLLABUS = [
    {
      bookId: 'BOOK-1A',
      bookName: 'Book 1A 細胞與生命分子 (Ch 1 – 4)',
      bookNum: '1',
      chapters: [
        { id: 1, name: '第 1 章：生物學入門 (Introducing Biology)' },
        { id: 2, name: '第 2 章：細胞 (The Cell as the Basic Unit of Life)' },
        { id: 3, name: '第 3 章：物質穿越細胞膜 (Movement of Substances across Membrane)' },
        { id: 4, name: '第 4 章：酶與新陳代謝 (Enzymes and Metabolism)' }
      ]
    },
    {
      bookId: 'BOOK-1B',
      bookName: 'Book 1B 營養與氣體交換及轉運 (Ch 5 – 10)',
      bookNum: '1',
      chapters: [
        { id: 5, name: '第 5 章：食物與人類 (Food and Humans)' },
        { id: 6, name: '第 6 章：人的營養 (Nutrition in Humans)' },
        { id: 7, name: '第 7 章：人的氣體交換 (Gas Exchange in Humans)' },
        { id: 8, name: '第 8 章：人體內的轉運 (Transport in Humans)' },
        { id: 9, name: '第 9 章：植物的營養與氣體交換 (Nutrition and Gas Exchange in Plants)' },
        { id: 10, name: '第 10 章：蒸騰、轉運與支持 (Transpiration, Transport and Support in Plants)' }
      ]
    },
    {
      bookId: 'BOOK-2',
      bookName: 'Book 2 生物與環境：生殖、協調與體內平衡 (Ch 11 – 18)',
      bookNum: '2',
      chapters: [
        { id: 11, name: '第 11 章：細胞週期與分裂 (Cell Cycle and Division)' },
        { id: 12, name: '第 12 章：有花植物的生殖 (Reproduction in Flowering Plants)' },
        { id: 13, name: '第 13 章：人的生殖 (Reproduction in Humans)' },
        { id: 14, name: '第 14 章：生長與發育 (Growth and Development)' },
        { id: 15, name: '第 15 章：環境的探測 (Detecting the Environment)' },
        { id: 16, name: '第 16 章：人體的協調 (Coordination in Humans)' },
        { id: 17, name: '第 17 章：人體的運動 (Movement in Humans)' },
        { id: 18, name: '第 18 章：體內平衡 (Homeostasis)' }
      ]
    },
    {
      bookId: 'BOOK-3',
      bookName: 'Book 3 生態系、能量轉換與健康及疾病 (Ch 19 – 24)',
      bookNum: '3',
      chapters: [
        { id: 19, name: '第 19 章：生態系 (Ecosystems)' },
        { id: 20, name: '第 20 章：光合作用 (Photosynthesis)' },
        { id: 21, name: '第 21 章：呼吸作用 (Respiration)' },
        { id: 22, name: '第 22 章：非傳染病 (Non-infectious Diseases)' },
        { id: 23, name: '第 23 章：傳染病 (Infectious Diseases)' },
        { id: 24, name: '第 24 章：身體防禦機制 (Body Defence Mechanisms)' }
      ]
    },
    {
      bookId: 'BOOK-4',
      bookName: 'Book 4 遺傳與進化 (Ch 25 – 29)',
      bookNum: '4',
      chapters: [
        { id: 25, name: '第 25 章：基礎遺傳學 (Basic Genetics)' },
        { id: 26, name: '第 26 章：分子遺傳學 (Molecular Genetics)' },
        { id: 27, name: '第 27 章：生物工程 (Biotechnology)' },
        { id: 28, name: '第 28 章：生物多樣性 (Biodiversity)' },
        { id: 29, name: '第 29 章：進化 (Evolution)' }
      ]
    }
  ];

  const BIO_CHAPTER_MAP = {};
  BIO_SYLLABUS.forEach(b => {
    b.chapters.forEach(c => {
      BIO_CHAPTER_MAP[c.id] = { book: b, chapter: c };
    });
  });

  const ICONS = {
    menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>`,
    moreVert: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="18" r="1.6"/></svg>`,
    volumeOn: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    volumeOff: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
    person: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M5 20c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5"/></svg>`,
    dna: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M17 6l-2.5-2.5"/><path d="M14 8l-1-1"/><path d="M7 18l2.5 2.5"/><path d="M3.5 14.5l.5.5"/><path d="M20 9l.5.5"/><path d="M6.5 12.5l1 1"/><path d="M16.5 10.5l1 1"/><path d="M10 16l1.5 1.5"/></svg>`,
    flask: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6"/><path d="M10 3v5l-4.5 7.5A3 3 0 0 0 8.1 20h7.8a3 3 0 0 0 2.6-4.5L14 8V3"/></svg>`,
    calendar: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><line x1="16" y1="3" x2="16" y2="7"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    list: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    cross: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
  };

  let activeSubject = localStorage.getItem('dse_active_subject') || 'chem'; // 'chem' | 'bio'
  let activeBioSubMode = localStorage.getItem('dse_bio_submode') || 'mc'; // 'mc' | 'lq'
  let activeBioChapterId = parseInt(localStorage.getItem('dse_last_bio_chap') || '0', 10) || null;
  let bioCurrentView = 'home'; // 'home' | 'chapter'
  let showAllBioRecent = false;

  // ==========================================================================
  // 1. 清除化學首頁多餘的綠色 Bio 卡片與舊版頂部切換條
  // ==========================================================================
  function cleanUnwantedElements() {
    const greenCard = document.getElementById('homeBioEntryCard');
    if (greenCard) greenCard.remove();

    const lqCard = document.getElementById('homeLqEntryCard');
    if (lqCard) lqCard.remove();

    const topBar = document.getElementById('dseTopSectionBar');
    if (topBar) topBar.style.display = 'none';
  }

  function injectBioStyles() {
    if (document.getElementById('dseBioSameAsChemStyleV0135')) return;
    const style = document.createElement('style');
    style.id = 'dseBioSameAsChemStyleV0135';
    style.textContent = `
      #homeBioEntryCard,
      #homeLqEntryCard,
      #dseTopSectionBar {
        display: none !important;
      }

      /* 彈出對話框毛玻璃背景模糊效果 */
      .dse-blurred-backdrop {
        background: rgba(29, 31, 44, 0.28) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
      }

      @keyframes dseDialogPopIn {
        0% {
          opacity: 0;
          transform: scale(0.95) translateY(8px);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      .dse-dialog-card-anim {
        animation: dseDialogPopIn 0.18s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }

      .chem-responsive-container {
        padding-top: 20px !important;
      }
      @media (orientation: landscape) and (min-width: 768px) {
        .chem-responsive-container,
        #bioAppRootContainer {
          width: 100% !important;
          max-width: 780px !important;
          margin-left: auto !important;
          margin-right: auto !important;
          padding: 24px 24px 180px 24px !important;
          box-sizing: border-box !important;
        }
      }
      @media (orientation: portrait) {
        #bioAppRootContainer {
          width: 100% !important;
          max-width: 92vw !important;
          margin: 0 auto !important;
          padding: 16px 4vw 200px 4vw !important;
          box-sizing: border-box !important;
        }
      }

      #bioAppRootContainer {
        display: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
        color: ${M3_BIO.textMain};
      }
      #bioAppRootContainer.active {
        display: block !important;
      }

      .bio-m3-card,
      .bio-q-card {
        background: ${M3_BIO.surface};
        border: 2.5px solid ${M3_BIO.outline};
        border-radius: 28px;
        box-shadow: 0 6px 24px rgba(72, 84, 122, 0.05);
        box-sizing: border-box;
        overflow: hidden;
      }
      .bio-q-card {
        padding: 26px clamp(22px, 4vw, 38px);
        margin-bottom: 20px;
      }
      .bio-q-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: ${M3_BIO.primary};
        margin-bottom: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid ${M3_BIO.outline};
      }
      .bio-q-body {
        font-family: "Times New Roman", "Noto Serif TC", "PMingLiU", serif;
        font-size: 16px;
        line-height: 1.75;
        color: ${M3_BIO.textMain};
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
        border: 1px solid ${M3_BIO.outlineStrong};
        padding: 7px 10px;
        text-align: center;
      }

      .bio-ans-row {
        display: flex;
        gap: 12px;
      }
      .bio-opt-btn {
        flex: 1;
        padding: 10px 2px;
        border: 1.5px solid ${M3_BIO.outline};
        border-radius: 16px;
        background: ${M3_BIO.bg};
        color: ${M3_BIO.primary};
        font-size: 14px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        transition: all 0.15s ease;
      }
      .bio-opt-btn.correct {
        background: ${M3_BIO.primary} !important;
        border-color: ${M3_BIO.primary} !important;
        color: #FFFFFF !important;
      }
      .bio-opt-btn.wrong {
        background: ${M3_BIO.surfaceVariant} !important;
        border: 1.5px dashed ${M3_BIO.primary} !important;
        color: ${M3_BIO.primary} !important;
      }
      .bio-opt-btn.dimmed {
        background: ${M3_BIO.surface} !important;
        border-color: ${M3_BIO.outline} !important;
        color: ${M3_BIO.textMuted} !important;
        opacity: 0.35;
      }
      .bio-exp-box {
        display: none;
        margin-top: 16px;
        padding: 16px 20px;
        border-radius: 18px;
        background: ${M3_BIO.surfaceVariant};
        border-left: 3.5px solid ${M3_BIO.primary};
        font-family: "Times New Roman", "Noto Serif TC", serif;
        font-size: 14.5px;
        line-height: 1.7;
        color: ${M3_BIO.textMain};
      }
      .bio-exp-box.open {
        display: block;
      }

      .bio-lq-subq {
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px dashed ${M3_BIO.outline};
      }
      .bio-lq-scratchpad {
        width: 100%;
        min-height: 70px;
        margin-top: 10px;
        padding: 10px 14px;
        border-radius: 16px;
        border: 1.5px solid ${M3_BIO.outline};
        background: ${M3_BIO.bg};
        font-family: "Times New Roman", "Noto Sans TC", sans-serif;
        font-size: 15px;
        line-height: 1.55;
        color: ${M3_BIO.textMain};
        box-sizing: border-box;
        resize: vertical;
        outline: none;
      }
      .bio-lq-scratchpad:focus {
        border-color: ${M3_BIO.primary};
        background: ${M3_BIO.surface};
      }

      #bioFloatingDirBtn {
        position: fixed;
        bottom: 18px;
        right: 16px;
        z-index: 9998;
        display: none;
        background: ${M3_BIO.primary};
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
  // 2. 生物科進度儲存引擎
  // ==========================================================================
  function getBioStorageKey() {
    const uid =
      (window.ChemUserLog && window.ChemUserLog.currentUser) ||
      localStorage.getItem('CHEM_CURRENT_USER_ID') ||
      'GUEST';
    return `HKDSE_BIO_PROGRESS_V1_${uid}`;
  }

  function loadBioProgress() {
    try {
      const raw = localStorage.getItem(getBioStorageKey());
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          chapterTotals: parsed.chapterTotals || {},
          records: parsed.records || {},
          dailyLogs: parsed.dailyLogs || {}
        };
      }
    } catch (e) {}
    return { chapterTotals: {}, records: {}, dailyLogs: {} };
  }

  function saveBioProgress(data) {
    try {
      localStorage.setItem(getBioStorageKey(), JSON.stringify(data));
    } catch (e) {}
  }

  function recordBioQuestionProgress({ chapId, mode, code, qOrder, chosen, correctAns, isCorrect }) {
    const data = loadBioProgress();
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 8);
    const isoTs = now.toISOString();

    const recKey = `${mode}_${chapId}_${code}`;
    data.records[recKey] = {
      recKey,
      chapId,
      mode,
      code,
      qOrder,
      chosen,
      correctAns,
      isCorrect: !!isCorrect,
      date: dateStr,
      time: timeStr,
      timestamp: isoTs
    };

    if (!data.dailyLogs[dateStr]) {
      data.dailyLogs[dateStr] = { count: 0, correctCount: 0, wrongCount: 0, items: [] };
    }
    const dayObj = data.dailyLogs[dateStr];
    dayObj.count += 1;
    if (isCorrect) dayObj.correctCount += 1;
    else dayObj.wrongCount += 1;
    dayObj.items.unshift({
      chapId,
      mode,
      code,
      qOrder,
      chosen,
      correctAns,
      isCorrect: !!isCorrect,
      time: timeStr
    });

    saveBioProgress(data);
    return data;
  }

  function updateBioChapterTotal(chapId, mode, totalCount) {
    if (!chapId || !totalCount) return;
    const data = loadBioProgress();
    data.chapterTotals[`${mode}_${chapId}`] = totalCount;
    saveBioProgress(data);
  }

  function buildBioRecentChapters() {
    const data = loadBioProgress();
    const groups = {};

    Object.values(data.records).forEach(rec => {
      if (!rec || !rec.chapId) return;
      const gKey = `${rec.mode}_${rec.chapId}`;
      if (!groups[gKey]) {
        const info = BIO_CHAPTER_MAP[rec.chapId];
        groups[gKey] = {
          gKey,
          chapId: rec.chapId,
          mode: rec.mode,
          bookName: info ? info.book.bookName : 'HKDSE Biology',
          chapterName: info ? info.chapter.name : `第 ${rec.chapId} 章`,
          totalInChapter: data.chapterTotals[gKey] || 0,
          answered: 0,
          correct: 0,
          wrong: 0,
          latestRec: null,
          lastTimestamp: ''
        };
      }
      const g = groups[gKey];
      g.answered += 1;
      if (rec.isCorrect) g.correct += 1;
      else g.wrong += 1;
      if ((rec.timestamp || '') >= g.lastTimestamp) {
        g.lastTimestamp = rec.timestamp || '';
        g.latestRec = rec;
      }
    });

    return Object.values(groups)
      .map(g => {
        const completionRate =
          g.totalInChapter > 0
            ? Math.min(100, Math.round((g.answered / g.totalInChapter) * 100))
            : 100;
        const remainingRate = Math.max(0, 100 - completionRate);
        return { ...g, completionRate, remainingRate };
      })
      .sort((a, b) => (b.lastTimestamp || '').localeCompare(a.lastTimestamp || ''));
  }

  // ==========================================================================
  // 3. 左上角三條橫線 (☰) 背景模糊彈出對話框（附「確定切換」按鈕）
  // ==========================================================================
  function openSubjectSwitchModal() {
    if (typeof SoundFX !== 'undefined') SoundFX.playClick();

    let modal = document.getElementById('dseSubjectSwitchModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'dseSubjectSwitchModal';
      modal.className = 'dse-blurred-backdrop';
      modal.style.cssText =
        'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(29,31,44,0.28); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:100002; justify-content:center; align-items:center; padding:18px; box-sizing:border-box; font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
      document.body.appendChild(modal);
    }

    let selectedTarget = activeSubject === 'bio' ? 'chem' : 'bio';

    const renderSwitchCard = () => {
      const isChemSelected = selectedTarget === 'chem';
      const isBioSelected = selectedTarget === 'bio';

      modal.innerHTML = `
        <div class="dse-dialog-card-anim" style="background:${M3_BIO.surface}; width:100%; max-width:360px; padding:26px 26px; border-radius:28px; box-shadow:0 16px 48px rgba(29,31,44,0.18); border:1.5px solid ${M3_BIO.outline}; box-sizing:border-box;">
          <h3 class="m3-title-medium" style="margin:0 0 6px 0; font-size:17px; color:${M3_BIO.textMain}; text-align:center;">
            切換科目主頁
          </h3>
          <p style="margin:0 0 18px 0; font-size:12.5px; color:${M3_BIO.textSub}; text-align:center;">
            目前位於：${activeSubject === 'bio' ? 'Biology Question Bank' : 'Chemistry Question Bank'}
          </p>

          <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
            <div class="dse-sub-choice" data-target="chem" style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-radius:20px; border:2px solid ${isChemSelected ? M3_BIO.primary : M3_BIO.outline}; background:${isChemSelected ? M3_BIO.surfaceVariant : M3_BIO.bg}; cursor:pointer; transition:all 0.15s ease;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:36px; height:36px; border-radius:18px; background:${M3_BIO.surface}; color:${M3_BIO.primary}; display:flex; align-items:center; justify-content:center;">
                  ${ICONS.flask}
                </div>
                <div>
                  <div style="font-size:14.5px; color:${M3_BIO.textMain};">HKDSE Chemistry</div>
                  <div style="font-size:11.5px; color:${M3_BIO.textSub}; margin-top:2px;">化學科題庫主頁 (15 課題 · 65 章)</div>
                </div>
              </div>
              <span style="font-size:12px; color:${M3_BIO.primary};">${isChemSelected ? '已選取' : ''}</span>
            </div>

            <div class="dse-sub-choice" data-target="bio" style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-radius:20px; border:2px solid ${isBioSelected ? M3_BIO.primary : M3_BIO.outline}; background:${isBioSelected ? M3_BIO.surfaceVariant : M3_BIO.bg}; cursor:pointer; transition:all 0.15s ease;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:36px; height:36px; border-radius:18px; background:${M3_BIO.surface}; color:${M3_BIO.primary}; display:flex; align-items:center; justify-content:center;">
                  ${ICONS.dna}
                </div>
                <div>
                  <div style="font-size:14.5px; color:${M3_BIO.textMain};">HKDSE Biology</div>
                  <div style="font-size:11.5px; color:${M3_BIO.textSub}; margin-top:2px;">生物科題庫主頁 (Book 1A–4 · 29 章)</div>
                </div>
              </div>
              <span style="font-size:12px; color:${M3_BIO.primary};">${isBioSelected ? '已選取' : ''}</span>
            </div>
          </div>

          <div style="display:flex; gap:12px;">
            <button type="button" id="cancelSwitchSubBtn" style="flex:1; background:${M3_BIO.bg}; color:${M3_BIO.textSub}; border:1.5px solid ${M3_BIO.outline}; padding:11px; border-radius:16px; font-size:14px; cursor:pointer;">
              取消
            </button>
            <button type="button" id="confirmSwitchSubBtn" style="flex:1; background:${M3_BIO.primary}; color:#FFFFFF; border:none; padding:11px; border-radius:16px; font-size:14px; cursor:pointer;">
              確定切換
            </button>
          </div>
        </div>
      `;

      modal.querySelectorAll('.dse-sub-choice').forEach(card => {
        card.onclick = () => {
          if (typeof SoundFX !== 'undefined') SoundFX.playClick();
          selectedTarget = card.getAttribute('data-target');
          renderSwitchCard();
        };
      });

      modal.querySelector('#cancelSwitchSubBtn').onclick = () => {
        if (typeof SoundFX !== 'undefined') SoundFX.playClick();
        modal.style.display = 'none';
      };

      modal.querySelector('#confirmSwitchSubBtn').onclick = () => {
        if (typeof SoundFX !== 'undefined') SoundFX.playClick();
        modal.style.display = 'none';
        switchSubjectHomepage(selectedTarget);
      };
    };

    modal.onclick = e => {
      if (e.target === modal) modal.style.display = 'none';
    };

    renderSwitchCard();
    modal.style.display = 'flex';
  }

  function switchSubjectHomepage(subject) {
    activeSubject = subject === 'bio' ? 'bio' : 'chem';
    localStorage.setItem('dse_active_subject', activeSubject);

    const chemRoot = document.getElementById('chemAppRootContainer');
    const chemFloating = document.getElementById('floatingActionGroup');
    const bioRoot = document.getElementById('bioAppRootContainer');
    const bioFloating = document.getElementById('bioFloatingDirBtn');

    if (activeSubject === 'bio') {
      if (chemRoot) chemRoot.style.display = 'none';
      if (chemFloating) chemFloating.style.display = 'none';
      if (bioRoot) bioRoot.classList.add('active');
      if (bioFloating) bioFloating.style.display = 'flex';
      renderBioHomeDashboard();
    } else {
      if (bioRoot) bioRoot.classList.remove('active');
      if (bioFloating) bioFloating.style.display = 'none';
      if (chemRoot) chemRoot.style.display = '';
      if (typeof showHomeView === 'function') {
        showHomeView();
      }
      if (typeof updateFloatingButtonsVisibility === 'function') {
        updateFloatingButtonsVisibility();
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // ==========================================================================
  // 4. 渲染 Bio 主頁 — 與 Chem 主頁完全相同的外觀與功能排版
  // ==========================================================================
  function renderBioHomeDashboard() {
    bioCurrentView = 'home';
    const bioRoot = document.getElementById('bioAppRootContainer');
    if (!bioRoot) return;

    let homeEl = document.getElementById('bioDashboardHome');
    let chapEl = document.getElementById('bioChapterViewWrapper');
    if (chapEl) chapEl.style.display = 'none';

    if (!homeEl) {
      homeEl = document.createElement('div');
      homeEl.id = 'bioDashboardHome';
      bioRoot.appendChild(homeEl);
    }
    homeEl.style.display = 'block';

    const data = loadBioProgress();
    const recentList = buildBioRecentChapters();
    const visibleList = showAllBioRecent ? recentList : recentList.slice(0, 3);
    const todayStr = new Date().toISOString().slice(0, 10);

    const muted = window.chemApp ? window.chemApp.isMuted : false;
    const currentLang = (window.chemApp && window.chemApp.currentLang) || 'e';
    const studentId =
      (window.ChemUserLog && window.ChemUserLog.currentUser) ||
      localStorage.getItem('CHEM_CURRENT_USER_ID') ||
      'GUEST';
    const currentStreak =
      (window.ChemUserLog && window.ChemUserLog.state && window.ChemUserLog.state.currentStreak) || 0;

    const allRecs = Object.values(data.records);
    const totalAnswered = allRecs.length;
    const totalCorrect = allRecs.filter(r => r.isCorrect).length;
    const accuracyText = totalAnswered > 0 ? `${Math.round((totalCorrect / totalAnswered) * 100)}%` : '0%';

    const recentHtml =
      visibleList.length === 0
        ? `
        <div style="background:${M3_BIO.surfaceVariant}; border-radius:28px; padding:22px; margin-bottom:16px; border:2px solid ${M3_BIO.outlineStrong};">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:38px; height:38px; border-radius:19px; background:${M3_BIO.surface}; color:${M3_BIO.primary}; display:flex; align-items:center; justify-content:center;">
              ${ICONS.dna}
            </div>
            <div>
              <div class="m3-title-medium" style="font-size:15px; color:${M3_BIO.textMain};">尚未開始練習</div>
              <div style="font-size:13px; color:${M3_BIO.textSub}; margin-top:2px;">點擊右下角「目錄選單」選擇課題</div>
            </div>
          </div>
        </div>
      `
        : visibleList
            .map((item, idx) => {
              const isFirst = idx === 0;
              const cardBg = isFirst ? M3_BIO.surfaceVariant : M3_BIO.surface;
              const cardBorder = isFirst ? M3_BIO.outlineStrong : M3_BIO.outline;
              const modeTag = item.mode === 'lq' ? 'LQ' : 'MC';
              const totalTxt =
                item.totalInChapter > 0
                  ? `${item.answered} / ${item.totalInChapter} 題`
                  : `${item.answered} 題`;
              const latestTxt = item.latestRec
                ? item.mode === 'mc'
                  ? `最新做到：第 ${item.latestRec.qOrder} 題 (${item.latestRec.code} · 選 ${item.latestRec.chosen})`
                  : `最新完成：${item.latestRec.code}`
                : '';

              return `
              <div style="background:${cardBg}; border:2.5px solid ${cardBorder}; border-radius:28px; padding:22px 26px; margin-bottom:16px; box-shadow:0 4px 18px rgba(72,84,122,0.04);">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:8px;">
                  <div style="display:flex; align-items:center; gap:12px; min-width:0; flex:1;">
                    <div style="width:38px; height:38px; border-radius:19px; background:${isFirst ? M3_BIO.surface : M3_BIO.surfaceVariant}; color:${M3_BIO.primary}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                      ${ICONS.dna}
                    </div>
                    <div style="min-width:0; flex:1;">
                      <div class="m3-title-medium" style="font-size:15px; color:${M3_BIO.textMain}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                        ${item.chapterName} (${modeTag})
                      </div>
                      <div style="font-size:12px; color:${M3_BIO.textSub}; margin-top:2px;">
                        ${item.bookName} · 還差 ${item.remainingRate}% 完成
                      </div>
                    </div>
                  </div>
                  <button type="button" class="bio-recent-jump-btn" data-chid="${item.chapId}" data-mode="${item.mode}" style="background:${M3_BIO.primary}; color:#FFFFFF; border:none; padding:8px 16px; border-radius:20px; font-size:12px; cursor:pointer; flex-shrink:0;">
                    繼續 &rsaquo;
                  </button>
                </div>

                <div style="width:100%; background:${isFirst ? '#CBD2F3' : M3_BIO.surfaceVariant}; height:6px; border-radius:3px; overflow:hidden; margin:12px 0 8px 0;">
                  <div style="width:${item.completionRate}%; background:${M3_BIO.primary}; height:100%; transition:width 0.3s;"></div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; color:${M3_BIO.textSub}; flex-wrap:wrap; gap:6px;">
                  <div>進度：${totalTxt} (完成 ${item.completionRate}%)${item.mode === 'mc' ? ` · 對 ${item.correct} · 錯 ${item.wrong}` : ''}</div>
                  <div>${latestTxt}</div>
                </div>
              </div>
            `;
            })
            .join('');

    const dailyDates = Object.keys(data.dailyLogs).sort((a, b) => b.localeCompare(a));
    const dailyHtml =
      dailyDates.length === 0
        ? `<div style="font-size:13px; color:${M3_BIO.textMuted}; text-align:center; padding:18px 0;">尚無作答記錄。</div>`
        : dailyDates
            .map(dStr => {
              const dObj = data.dailyLogs[dStr];
              return `
              <div class="bio-daily-item" data-date="${dStr}" style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:${M3_BIO.surface}; border-radius:20px; margin-bottom:8px; border:1.5px solid ${M3_BIO.outline}; cursor:pointer;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="color:${M3_BIO.textMain}; font-size:13px;">${dStr}</span>
                  <span style="font-size:11px; color:${M3_BIO.primary}; background:${M3_BIO.surfaceVariant}; padding:2px 9px; border-radius:10px;">對 ${dObj.correctCount}</span>
                  <span style="font-size:11px; color:${M3_BIO.textSub}; background:${M3_BIO.surfaceMuted}; padding:2px 9px; border-radius:10px;">錯 ${dObj.wrongCount}</span>
                </div>
                <span style="color:${M3_BIO.primary}; font-size:13px;">答了 ${dObj.count} 題 &rsaquo;</span>
              </div>
            `;
            })
            .join('');

    homeEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; padding:0 4px;">
        <button type="button" id="bioTopMenuHamburgerBtn" style="background:none; border:none; color:${M3_BIO.textMain}; cursor:pointer; padding:4px; display:inline-flex; align-items:center;">
          ${ICONS.menu}
        </button>
        <button type="button" id="bioTopAdminBtn" style="background:none; border:none; color:${M3_BIO.textSub}; cursor:pointer; padding:4px; display:inline-flex; align-items:center;" title="Admin">
          ${ICONS.moreVert}
        </button>
      </div>

      <div style="margin-bottom:24px; padding:0 4px;">
        <h1 class="m3-title-medium" style="margin:0 0 6px 0; font-size:32px; color:${M3_BIO.textMain}; letter-spacing:-0.3px;">HKDSE</h1>
        <div style="font-size:15px; color:${M3_BIO.textSub};">Biology Question Bank</div>
      </div>

      <div class="bio-m3-card" style="padding:22px 26px; margin-bottom:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:18px; border-bottom:1px solid ${M3_BIO.outline};">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:36px; height:36px; border-radius:18px; background:${M3_BIO.bg}; display:flex; align-items:center; justify-content:center; color:${M3_BIO.primary};">
              ${!muted ? ICONS.volumeOn : ICONS.volumeOff}
            </div>
            <span style="font-size:15px; color:${M3_BIO.textMain};">音效反饋 (Sound FX)</span>
          </div>
          <div id="bioSoundSwitch" class="m3-switch-track" style="background-color:${!muted ? M3_BIO.primary : M3_BIO.surfaceTrack};">
            <div class="m3-switch-thumb" style="transform:${!muted ? 'translateX(26px)' : 'translateX(4px)'};"></div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:18px; flex-wrap:wrap; gap:10px;">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:36px; height:36px; border-radius:18px; background:${M3_BIO.bg}; display:flex; align-items:center; justify-content:center; color:${M3_BIO.primary};">
              ${ICONS.person}
            </div>
            <div>
              <div style="font-size:15px; color:${M3_BIO.textMain};">登入學生</div>
              <div style="font-size:12px; color:${M3_BIO.textSub}; margin-top:2px;">${studentId} · Streak ${currentStreak}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="display:flex; background:${M3_BIO.surfaceVariant}; border-radius:16px; padding:3px; gap:2px;">
              <button type="button" id="bioLangEnBtn" style="border:none; background:${currentLang === 'e' ? M3_BIO.primary : 'transparent'}; color:${currentLang === 'e' ? '#fff' : M3_BIO.textSub}; padding:4px 12px; border-radius:14px; font-size:12px; cursor:pointer;">英</button>
              <button type="button" id="bioLangZhBtn" style="border:none; background:${currentLang === 'c' ? M3_BIO.primary : 'transparent'}; color:${currentLang === 'c' ? '#fff' : M3_BIO.textSub}; padding:4px 12px; border-radius:14px; font-size:12px; cursor:pointer;">中</button>
            </div>
            <button type="button" id="bioHomeLogoutBtn" style="background:${M3_BIO.surfaceMuted}; border:none; color:${M3_BIO.textSub}; font-size:12px; cursor:pointer; padding:6px 12px; border-radius:14px;">
              登出
            </button>
          </div>
        </div>
      </div>

      <div style="margin-bottom:18px;">
        ${recentHtml}
        ${
          recentList.length > 3
            ? `<div style="text-align:center; margin-top:-4px; margin-bottom:12px;">
                <button type="button" id="bioToggleMoreRecentBtn" style="background:${M3_BIO.surface}; color:${M3_BIO.primary}; border:1.5px solid ${M3_BIO.outline}; padding:6px 16px; border-radius:16px; font-size:12px; cursor:pointer;">
                  ${showAllBioRecent ? '收起部分' : `顯示全部 (${recentList.length} 個章節)`}
                </button>
              </div>`
            : ''
        }
      </div>

      <div class="bio-m3-card" style="padding:22px 26px; margin-bottom:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:10px; color:${M3_BIO.primary};">
            ${ICONS.calendar}
            <span class="m3-title-medium" style="font-size:15px; color:${M3_BIO.textMain};">每日練習紀錄</span>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <input type="date" id="bioQuickDatePicker" value="${todayStr}" style="padding:4px 8px; border:1px solid ${M3_BIO.outline}; border-radius:12px; font-size:12px; cursor:pointer; background:${M3_BIO.bg}; color:${M3_BIO.textMain};" />
            <button type="button" id="bioOpenDailyDetailBtn" style="background:${M3_BIO.surfaceVariant}; color:${M3_BIO.primary}; border:none; padding:5px 12px; border-radius:12px; font-size:11px; cursor:pointer;">明細</button>
          </div>
        </div>
        <div style="max-height:170px; overflow-y:auto;">
          ${dailyHtml}
        </div>
      </div>

      <div class="bio-m3-card" style="padding:18px 26px; display:flex; justify-content:space-around; align-items:center; text-align:center;">
        <div>
          <div style="font-size:12px; color:${M3_BIO.textSub};">總 Book</div>
          <div style="font-size:18px; color:${M3_BIO.textMain}; margin-top:2px;">5</div>
        </div>
        <div>
          <div style="font-size:12px; color:${M3_BIO.textSub};">總 Chapter</div>
          <div style="font-size:18px; color:${M3_BIO.textMain}; margin-top:2px;">29</div>
        </div>
        <div>
          <div style="font-size:12px; color:${M3_BIO.textSub};">總題目數</div>
          <div style="font-size:18px; color:${M3_BIO.textMain}; margin-top:2px;">${totalAnswered}</div>
        </div>
        <div>
          <div style="font-size:12px; color:${M3_BIO.textSub};">完成率</div>
          <div style="font-size:18px; color:${M3_BIO.primary}; margin-top:2px;">${accuracyText}</div>
        </div>
      </div>
    `;

    homeEl.querySelector('#bioTopMenuHamburgerBtn').onclick = () => openSubjectSwitchModal();
    homeEl.querySelector('#bioTopAdminBtn').onclick = () => {
      if (typeof openDiscreetAdminModal === 'function') openDiscreetAdminModal();
    };
    homeEl.querySelector('#bioSoundSwitch').onclick = () => {
      if (typeof SoundFX !== 'undefined') {
        SoundFX.toggleMute();
        renderBioHomeDashboard();
      }
    };
    homeEl.querySelector('#bioLangEnBtn').onclick = () => {
      if (window.chemApp) window.chemApp.currentLang = 'e';
      localStorage.setItem('CHEM_LANG_V47', 'e');
      renderBioHomeDashboard();
    };
    homeEl.querySelector('#bioLangZhBtn').onclick = () => {
      if (window.chemApp) window.chemApp.currentLang = 'c';
      localStorage.setItem('CHEM_LANG_V47', 'c');
      renderBioHomeDashboard();
    };
    homeEl.querySelector('#bioHomeLogoutBtn').onclick = () => {
      sessionStorage.removeItem('DSE_UNLOCKED_USER');
      localStorage.removeItem('CHEM_CURRENT_USER_ID');
      switchSubjectHomepage('chem');
      if (window.ChemUserLog) window.ChemUserLog.logout();
    };

    const moreBtn = homeEl.querySelector('#bioToggleMoreRecentBtn');
    if (moreBtn) {
      moreBtn.onclick = () => {
        showAllBioRecent = !showAllBioRecent;
        renderBioHomeDashboard();
      };
    }

    homeEl.querySelectorAll('.bio-recent-jump-btn').forEach(btn => {
      btn.onclick = e => {
        const chId = parseInt(e.currentTarget.getAttribute('data-chid'), 10);
        const mode = e.currentTarget.getAttribute('data-mode') || 'mc';
        if (chId) openBioChapter(chId, mode);
      };
    });

    homeEl.querySelector('#bioOpenDailyDetailBtn').onclick = () => {
      const picked = homeEl.querySelector('#bioQuickDatePicker').value;
      openBioDailyInspectorModal(picked);
    };
    homeEl.querySelector('#bioQuickDatePicker').onchange = e => {
      if (e.target.value) openBioDailyInspectorModal(e.target.value);
    };
    homeEl.querySelectorAll('.bio-daily-item').forEach(item => {
      item.onclick = e => {
        const dStr = e.currentTarget.getAttribute('data-date');
        openBioDailyInspectorModal(dStr);
      };
    });
  }

  function openBioDailyInspectorModal(dateStr) {
    let modal = document.getElementById('bioDailyInspectorModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'bioDailyInspectorModal';
      modal.className = 'dse-blurred-backdrop';
      modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(29,31,44,0.28); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:99999; justify-content:center; align-items:center; padding:18px; box-sizing:border-box; font-family:sans-serif;';
      document.body.appendChild(modal);
    }

    const data = loadBioProgress();
    const dayObj = data.dailyLogs[dateStr] || { count: 0, correctCount: 0, wrongCount: 0, items: [] };

    const itemsHtml =
      dayObj.items.length === 0
        ? `<div style="text-align:center; color:${M3_BIO.textMuted}; padding:28px 0; font-size:13px;">${dateStr} 尚無生物科作答紀錄。</div>`
        : dayObj.items
            .map(it => {
              const info = BIO_CHAPTER_MAP[it.chapId];
              const chName = info ? info.chapter.name : `第 ${it.chapId} 章`;
              return `
              <div style="background:${M3_BIO.surface}; border:1px solid ${M3_BIO.outline}; border-radius:16px; padding:11px 14px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
                <div style="min-width:0; flex:1;">
                  <div style="font-size:13px; color:${M3_BIO.textMain};">${it.code} <span style="font-size:11px; color:${M3_BIO.primary};">(${it.mode.toUpperCase()})</span></div>
                  <div style="font-size:11.5px; color:${M3_BIO.textSub}; margin-top:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${chName} · ${it.time}</div>
                </div>
                <div style="font-size:12px; color:${it.isCorrect ? M3_BIO.primary : M3_BIO.textSub}; background:${it.isCorrect ? M3_BIO.surfaceVariant : M3_BIO.surfaceMuted}; padding:3px 10px; border-radius:10px; white-space:nowrap;">
                  ${it.mode === 'mc' ? `選 ${it.chosen} (${it.isCorrect ? '對' : '錯'})` : '已完成 LQ'}
                </div>
              </div>
            `;
            })
            .join('');

    modal.innerHTML = `
      <div class="dse-dialog-card-anim" style="background:${M3_BIO.bg}; width:100%; max-width:440px; max-height:78vh; border-radius:28px; box-shadow:0 14px 44px rgba(72,84,122,0.16); display:flex; flex-direction:column; overflow:hidden; border:1px solid ${M3_BIO.outline};">
        <div style="padding:18px 22px; background:${M3_BIO.surfaceVariant}; color:${M3_BIO.primary}; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 class="m3-title-medium" style="margin:0; font-size:16px;">${dateStr} 作答明細</h3>
            <div style="font-size:11.5px; color:${M3_BIO.textSub}; margin-top:2px;">共 ${dayObj.count} 題 · 對 ${dayObj.correctCount} · 錯 ${dayObj.wrongCount}</div>
          </div>
          <button type="button" id="closeBioDailyModalBtn" style="background:${M3_BIO.surface}; border:none; color:${M3_BIO.primary}; width:32px; height:32px; border-radius:16px; font-size:18px; cursor:pointer;">&times;</button>
        </div>
        <div class="dse-modal-scroller" style="flex:1; overflow-y:auto; padding:14px 18px; -webkit-overflow-scrolling:touch; overscroll-behavior:contain;">
          ${itemsHtml}
        </div>
      </div>
    `;

    modal.querySelector('#closeBioDailyModalBtn').onclick = () => {
      modal.style.display = 'none';
    };
    modal.onclick = e => {
      if (e.target === modal) modal.style.display = 'none';
    };
    modal.style.display = 'flex';
  }

  // ==========================================================================
  // 5. 生物科目錄彈窗（內含 MC / LQ 切換 + 背景模糊）
  // ==========================================================================
  function openBioDirectoryModal() {
    let modal = document.getElementById('bioCenterDirectoryModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'bioCenterDirectoryModal';
      modal.className = 'dse-blurred-backdrop';
      modal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(29,31,44,0.28); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:99999; justify-content:center; align-items:center; padding:18px; box-sizing:border-box; font-family:sans-serif;';
      document.body.appendChild(modal);
    }

    const data = loadBioProgress();

    const renderDirBody = () => {
      const isMc = activeBioSubMode === 'mc';
      let html = `
        <div class="dse-dialog-card-anim" style="background:${M3_BIO.surface}; width:100%; max-width:440px; height:82vh; max-height:640px; border-radius:28px; box-shadow:0 14px 44px rgba(72,84,122,0.15); display:flex; flex-direction:column; overflow:hidden; border:1px solid ${M3_BIO.outline};">
          <div style="padding:18px 22px; background:${M3_BIO.surfaceVariant}; color:${M3_BIO.primary}; display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <div>
              <h2 class="m3-title-medium" style="margin:0; font-size:16px;">選擇 Book / Chapter</h2>
              <div style="font-size:11px; color:${M3_BIO.textSub}; margin-top:2px;">共 5 冊、29 個章節</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="display:inline-flex; background:${M3_BIO.surface}; border-radius:14px; padding:3px; gap:2px;">
                <button type="button" class="bio-dir-mode-btn" data-mode="mc" style="border:none; background:${isMc ? M3_BIO.primary : 'transparent'}; color:${isMc ? '#FFFFFF' : M3_BIO.textSub}; padding:4px 11px; border-radius:11px; font-size:12px; cursor:pointer;">MC</button>
                <button type="button" class="bio-dir-mode-btn" data-mode="lq" style="border:none; background:${!isMc ? M3_BIO.primary : 'transparent'}; color:${!isMc ? '#FFFFFF' : M3_BIO.textSub}; padding:4px 11px; border-radius:11px; font-size:12px; cursor:pointer;">LQ</button>
              </div>
              <button type="button" id="closeBioDirModalBtn" style="background:${M3_BIO.surface}; border:none; color:${M3_BIO.primary}; width:32px; height:32px; border-radius:16px; font-size:18px; cursor:pointer; line-height:1;">&times;</button>
            </div>
          </div>
          <div class="dse-modal-scroller" style="flex:1; overflow-y:auto; padding:16px 20px; background:${M3_BIO.bg}; -webkit-overflow-scrolling:touch; overscroll-behavior:contain;">
      `;

      BIO_SYLLABUS.forEach((book, bIdx) => {
        const isExpanded = activeBioChapterId
          ? book.chapters.some(c => c.id === activeBioChapterId)
          : bIdx === 0;

        html += `
          <div style="background:${M3_BIO.surface}; border-radius:20px; margin-bottom:10px; border:1.5px solid ${M3_BIO.outline}; overflow:hidden;">
            <div class="bio-dir-book-header" style="padding:13px 16px; background:${M3_BIO.surface}; font-size:13.5px; color:${M3_BIO.textMain}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>${book.bookName}</span>
              <span class="bio-dir-arrow" style="font-size:11px; color:${M3_BIO.textSub};">${isExpanded ? '▼' : '▶'}</span>
            </div>
            <div class="bio-dir-chap-list" style="display:${isExpanded ? 'flex' : 'none'}; flex-direction:column;">
        `;

        book.chapters.forEach(ch => {
          const isActive = ch.id === activeBioChapterId;
          const doneCount = Object.values(data.records).filter(
            r => r.chapId === ch.id && r.mode === activeBioSubMode
          ).length;
          const doneTag = doneCount > 0 ? `已答 ${doneCount} 題 · ` : '';

          html += `
            <div class="bio-dir-chap-item" data-chid="${ch.id}" style="padding:11px 16px 11px 20px; border-top:1px solid ${M3_BIO.outline}; font-size:13px; color:${isActive ? M3_BIO.primary : M3_BIO.textMain}; background:${isActive ? M3_BIO.surfaceVariant : M3_BIO.surface}; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>${ch.name}</span>
              <span style="font-size:12px; color:${M3_BIO.primary}; white-space:nowrap; margin-left:8px;">
                ${doneTag}進入 &rsaquo;
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
      modal.querySelectorAll('.bio-dir-mode-btn').forEach(btn => {
        btn.onclick = () => {
          activeBioSubMode = btn.getAttribute('data-mode');
          localStorage.setItem('dse_bio_submode', activeBioSubMode);
          renderDirBody();
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

    renderDirBody();
    modal.style.display = 'flex';
  }

  // ==========================================================================
  // 6. Bio 做題工作台（支援 Bio MC 與 Bio LQ）
  // ==========================================================================
  function ensureBioWorkspace() {
    if (document.getElementById('bioAppRootContainer')) return;

    const bioRoot = document.createElement('div');
    bioRoot.id = 'bioAppRootContainer';

    const chapWrapper = document.createElement('div');
    chapWrapper.id = 'bioChapterViewWrapper';
    chapWrapper.style.display = 'none';
    chapWrapper.innerHTML = `
      <div class="bio-m3-card" style="padding:18px 26px; margin-bottom:20px; display:flex; flex-direction:column; gap:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:10px; min-width:0; flex:1;">
            <button type="button" id="bioBackHomeBtn" style="padding:6px 14px; font-size:12px; border:none; border-radius:18px; background:${M3_BIO.surfaceVariant}; color:${M3_BIO.primary}; cursor:pointer; white-space:nowrap;">
              &lsaquo; 首頁
            </button>
            <h2 id="bioCurrentChapterTitle" class="m3-title-medium" style="margin:0; font-size:15px; color:${M3_BIO.textMain}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              請選擇章節
            </h2>
          </div>
          <div style="display:flex; align-items:center; gap:8px; white-space:nowrap;">
            <span id="bioStatsLabel" style="font-size:12px; color:${M3_BIO.textSub};"></span>
            <label style="padding:6px 12px; font-size:11px; border:1px solid ${M3_BIO.outline}; border-radius:16px; background:${M3_BIO.surface}; cursor:pointer; color:${M3_BIO.textSub};">
              載入 .docx
              <input type="file" id="bioManualDocxInput" accept=".docx" style="display:none;" />
            </label>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:8px; border-top:1px solid ${M3_BIO.outline}; gap:8px;">
          <div style="display:inline-flex; background:${M3_BIO.surfaceVariant}; border-radius:14px; padding:3px; gap:2px;">
            <button type="button" id="bioBarMcBtn" style="border:none; padding:4px 12px; border-radius:11px; font-size:11.5px; cursor:pointer;">MC</button>
            <button type="button" id="bioBarLqBtn" style="border:none; padding:4px 12px; border-radius:11px; font-size:11.5px; cursor:pointer;">LQ</button>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <button type="button" id="bioResetChapBtn" style="border:1px solid ${M3_BIO.outline}; background:${M3_BIO.surface}; color:${M3_BIO.textSub}; padding:4px 10px; border-radius:12px; font-size:11.5px; cursor:pointer;">
              重置本章
            </button>
            <button type="button" id="bioToggleAllExpBtn" style="border:none; background:${M3_BIO.surfaceMuted}; color:${M3_BIO.primary}; padding:4px 10px; border-radius:12px; font-size:11.5px; cursor:pointer;">
              顯示 / 隱藏全部解析
            </button>
          </div>
        </div>
      </div>
      <div id="bioQuestionsFeed"></div>
    `;

    bioRoot.appendChild(chapWrapper);
    document.body.appendChild(bioRoot);

    if (!document.getElementById('bioFloatingDirBtn')) {
      const fBtn = document.createElement('button');
      fBtn.id = 'bioFloatingDirBtn';
      fBtn.type = 'button';
      fBtn.innerHTML = `${ICONS.list}<span>目錄選單</span>`;
      fBtn.onclick = () => openBioDirectoryModal();
      document.body.appendChild(fBtn);
    }

    document.getElementById('bioBackHomeBtn').onclick = () => renderBioHomeDashboard();
    document.getElementById('bioBarMcBtn').onclick = () => {
      if (activeBioChapterId) openBioChapter(activeBioChapterId, 'mc');
    };
    document.getElementById('bioBarLqBtn').onclick = () => {
      if (activeBioChapterId) openBioChapter(activeBioChapterId, 'lq');
    };
    document.getElementById('bioResetChapBtn').onclick = () => {
      if (!activeBioChapterId) return;
      const data = loadBioProgress();
      Object.keys(data.records).forEach(k => {
        if (k.startsWith(`${activeBioSubMode}_${activeBioChapterId}_`)) delete data.records[k];
      });
      saveBioProgress(data);
      openBioChapter(activeBioChapterId, activeBioSubMode);
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
        await parseAndRenderBioLqDocx(buf, file.name, activeBioChapterId || 1);
      } else {
        await parseAndRenderBioMcDocx(buf, file.name, activeBioChapterId || 1);
      }
      e.target.value = '';
    };
  }

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

  async function openBioChapter(chapId, mode = 'mc') {
    activeBioChapterId = chapId;
    activeBioSubMode = mode === 'lq' ? 'lq' : 'mc';
    bioCurrentView = 'chapter';
    localStorage.setItem('dse_last_bio_chap', String(chapId));
    localStorage.setItem('dse_bio_submode', activeBioSubMode);

    const homeEl = document.getElementById('bioDashboardHome');
    const chapEl = document.getElementById('bioChapterViewWrapper');
    if (homeEl) homeEl.style.display = 'none';
    if (chapEl) chapEl.style.display = 'block';

    const info = BIO_CHAPTER_MAP[chapId];
    const chapName = info ? info.chapter.name : `第 ${chapId} 章`;
    const bookNum = info ? info.book.bookNum : '1';
    const padId = String(chapId).padStart(2, '0');
    const lang = (window.chemApp && window.chemApp.currentLang) || 'e';

    const titleEl = document.getElementById('bioCurrentChapterTitle');
    const statsEl = document.getElementById('bioStatsLabel');
    const feedEl = document.getElementById('bioQuestionsFeed');
    const mcBtn = document.getElementById('bioBarMcBtn');
    const lqBtn = document.getElementById('bioBarLqBtn');

    if (mcBtn) {
      mcBtn.style.background = activeBioSubMode === 'mc' ? M3_BIO.primary : 'transparent';
      mcBtn.style.color = activeBioSubMode === 'mc' ? '#FFFFFF' : M3_BIO.textSub;
    }
    if (lqBtn) {
      lqBtn.style.background = activeBioSubMode === 'lq' ? M3_BIO.primary : 'transparent';
      lqBtn.style.color = activeBioSubMode === 'lq' ? '#FFFFFF' : M3_BIO.textSub;
    }

    if (titleEl) titleEl.textContent = chapName;
    if (statsEl) statsEl.textContent = '載入中...';
    if (feedEl) {
      feedEl.innerHTML = `
        <div class="bio-q-card" style="text-align:center; padding:56px 20px; color:${M3_BIO.textSub};">
          <div style="font-size:15px; color:${M3_BIO.primary};">正在載入並解析題庫...</div>
        </div>
      `;
    }

    if (activeBioSubMode === 'mc') {
      const candidateUrls = Array.from(
        new Set([
          `./biodocs/qb_${bookNum}_ch${padId}_${lang}.docx`,
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
        if (statsEl) statsEl.textContent = '';
        if (feedEl) {
          feedEl.innerHTML = `
            <div class="bio-q-card" style="text-align:center; padding:48px 24px; color:${M3_BIO.textSub};">
              <div style="font-size:15px; color:${M3_BIO.textMain}; margin-bottom:8px;">找不到遠端題庫檔案 (qb_${bookNum}_ch${padId}_${lang}.docx)</div>
              <div style="font-size:13px;">可點擊上方「載入 .docx」手動選擇題庫練習。</div>
            </div>
          `;
        }
        return;
      }

      await parseAndRenderBioMcDocx(buf, chapName, chapId);
    } else {
      const keyStr = String(chapId);
      if (window.BIO_LQ_BANK && window.BIO_LQ_BANK[keyStr]) {
        renderBioLqBank(window.BIO_LQ_BANK[keyStr], chapId);
        return;
      }

      const jsCandidates = [`./biolq/biolq_ch${padId}_${lang}.js`, `./biolq/biolq_ch${padId}_e.js`];
      for (const src of jsCandidates) {
        const ok = await new Promise(resolve => {
          const s = document.createElement('script');
          s.src = `${src}?v=${Date.now()}`;
          s.onload = () => resolve(!!(window.BIO_LQ_BANK && window.BIO_LQ_BANK[keyStr]));
          s.onerror = () => resolve(false);
          document.head.appendChild(s);
        });
        if (ok && window.BIO_LQ_BANK && window.BIO_LQ_BANK[keyStr]) {
          renderBioLqBank(window.BIO_LQ_BANK[keyStr], chapId);
          return;
        }
      }

      const docxCandidates = [
        `./biodocs/lq_${bookNum}_ch${padId}_${lang}.docx`,
        `./biodocs/lq_${bookNum}_ch${padId}_e.docx`
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
        await parseAndRenderBioLqDocx(lqBuf, chapName, chapId);
      } else {
        if (statsEl) statsEl.textContent = '';
        if (feedEl) {
          feedEl.innerHTML = `
            <div class="bio-q-card" style="text-align:center; padding:48px 24px; color:${M3_BIO.textSub};">
              <div style="font-size:15px; color:${M3_BIO.textMain}; margin-bottom:8px;">找不到遠端 Bio LQ 題庫檔案 (biolq_ch${padId}_${lang}.js)</div>
              <div style="font-size:13px;">可點擊上方「載入 .docx」手動選擇題庫練習。</div>
            </div>
          `;
        }
      }
    }
  }

  async function parseAndRenderBioMcDocx(arrayBuffer, labelName, chapId) {
    const feedEl = document.getElementById('bioQuestionsFeed');
    const statsEl = document.getElementById('bioStatsLabel');

    const ready = await ensureMammothReady();
    if (!ready || typeof mammoth === 'undefined') {
      if (feedEl) feedEl.innerHTML = `<div class="bio-q-card">無法載入 mammoth.js 解析引擎。</div>`;
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
        if (statsEl) statsEl.textContent = '共 0 題';
        if (feedEl) feedEl.innerHTML = `<div class="bio-q-card">未能從 <b>${labelName}</b> 識別出標準題目。</div>`;
        return;
      }

      updateBioChapterTotal(chapId, 'mc', questions.length);
      const savedData = loadBioProgress();
      if (statsEl) statsEl.textContent = `共 ${questions.length} 題`;

      feedEl.innerHTML = questions
        .map(
          (q, idx) => `
          <div class="bio-q-card" data-code="${q.code}" data-order="${idx + 1}" data-ans="${q.answer}">
            <div class="bio-q-meta">
              <span>${q.code}</span>
              <span style="font-size:12px; color:${M3_BIO.textMuted};">第 ${idx + 1} / ${questions.length} 題</span>
            </div>
            <div class="bio-q-body">${q.stemNodes.join('')}</div>
            <div style="margin-top:18px; padding-top:14px; border-top:1px dashed ${M3_BIO.outline};">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span class="bio-q-status" style="font-size:12px; color:${M3_BIO.textSub};">請選擇答案：</span>
                <button type="button" class="bio-peek-btn" style="border:none; background:${M3_BIO.surfaceMuted}; color:${M3_BIO.primary}; font-size:11px; cursor:pointer; padding:4px 10px; border-radius:10px;">顯示 / 隱藏解析</button>
              </div>
              <div class="bio-ans-row">
                ${['A', 'B', 'C', 'D']
                  .map(opt => `<button type="button" class="bio-opt-btn" data-opt="${opt}">${opt}</button>`)
                  .join('')}
              </div>
            </div>
            <div class="bio-exp-box">
              <div style="color:${M3_BIO.primary}; font-size:14px; margin-bottom:8px;">Answer: ${q.answer || '未標註'}</div>
              <div>${q.expNodes.join('') || '（本題原檔無附帶文字解析）'}</div>
            </div>
          </div>
        `
        )
        .join('');

      const applyLockVisual = (card, chosen) => {
        card.dataset.locked = '1';
        const correctAns = card.dataset.ans;
        const isRight = !correctAns || chosen === correctAns;
        const statusEl = card.querySelector('.bio-q-status');
        const expBox = card.querySelector('.bio-exp-box');

        if (statusEl) {
          statusEl.textContent = `已鎖定：選 ${chosen}（${isRight ? '對' : '錯'}）`;
          statusEl.style.color = isRight ? M3_BIO.primary : M3_BIO.textSub;
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
      };

      feedEl.querySelectorAll('.bio-q-card').forEach(card => {
        const code = card.dataset.code;
        const recKey = `mc_${chapId}_${code}`;
        if (savedData.records[recKey] && savedData.records[recKey].chosen) {
          applyLockVisual(card, savedData.records[recKey].chosen);
        }
      });

      feedEl.querySelectorAll('.bio-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('.bio-q-card');
          if (card.dataset.locked === '1') return;

          const code = card.dataset.code;
          const qOrder = parseInt(card.dataset.order || '1', 10);
          const correctAns = card.dataset.ans;
          const chosen = btn.dataset.opt;
          const isRight = !correctAns || chosen === correctAns;

          if (typeof SoundFX !== 'undefined') SoundFX.playClick(isRight);
          applyLockVisual(card, chosen);
          recordBioQuestionProgress({
            chapId,
            mode: 'mc',
            code,
            qOrder,
            chosen,
            correctAns,
            isCorrect: isRight
          });
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

  function renderBioLqBank(bankData, chapId) {
    const feedEl = document.getElementById('bioQuestionsFeed');
    const statsEl = document.getElementById('bioStatsLabel');

    let totalSubCount = 0;
    bankData.questions.forEach(q => {
      totalSubCount += q.subQuestions ? q.subQuestions.length : 1;
    });
    updateBioChapterTotal(chapId, 'lq', totalSubCount);

    if (statsEl) statsEl.textContent = `共 ${bankData.questions.length} 大題 / ${bankData.totalMarks} 分`;

    const savedData = loadBioProgress();

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
              const subCode = `${q.id} ${sq.label}`;
              const isDone = !!savedData.records[`lq_${chapId}_${subCode}`];

              return `
              <div class="bio-lq-subq">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; font-family:'Times New Roman', 'Noto Serif TC', serif; font-size:16px; line-height:1.6;">
                  <div><b>${sq.label}</b> &nbsp;${sq.textHtml}</div>
                  <span style="flex-shrink:0; font-family:sans-serif; font-size:12px; color:${M3_BIO.primary}; background:${M3_BIO.surfaceVariant}; padding:3px 10px; border-radius:12px;">${sq.marks}M</span>
                </div>
                <textarea class="bio-lq-scratchpad" data-draft-key="${draftKey}" placeholder="在此輸入 ${sq.label} 的生物作答草稿...">${savedDraft}</textarea>
                <div style="display:flex; justify-content:flex-end; align-items:center; gap:8px; margin-top:8px;">
                  <button type="button" class="bio-mark-lq-done-btn" data-code="${subCode}" data-order="${q.number}" style="border:1px solid ${M3_BIO.outline}; background:${isDone ? M3_BIO.primary : M3_BIO.surface}; color:${isDone ? '#FFFFFF' : M3_BIO.primary}; font-size:12px; cursor:pointer; padding:5px 12px; border-radius:12px;">
                    ${isDone ? '已完成 ✓' : '標記已完成'}
                  </button>
                  <button type="button" class="bio-toggle-ms-btn" data-target="${q.id}-ms-${sIdx}" style="border:none; background:${M3_BIO.surfaceMuted}; color:${M3_BIO.primary}; font-size:12px; cursor:pointer; padding:5px 12px; border-radius:12px;">
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
      ta.addEventListener('input', () => localStorage.setItem(ta.dataset.draftKey, ta.value));
    });

    feedEl.querySelectorAll('.bio-mark-lq-done-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        recordBioQuestionProgress({
          chapId,
          mode: 'lq',
          code: btn.dataset.code,
          qOrder: parseInt(btn.dataset.order || '1', 10),
          chosen: 'LQ',
          correctAns: 'LQ',
          isCorrect: true
        });
        btn.style.background = M3_BIO.primary;
        btn.style.color = '#FFFFFF';
        btn.textContent = '已完成 ✓';
      });
    });

    feedEl.querySelectorAll('.bio-toggle-ms-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const box = document.getElementById(btn.dataset.target);
        if (box) box.classList.toggle('open');
      });
    });
  }

  async function parseAndRenderBioLqDocx(arrayBuffer, labelName, chapId) {
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

      updateBioChapterTotal(chapId, 'lq', questions.length);
      const savedData = loadBioProgress();

      if (statsEl) statsEl.textContent = `共 ${questions.length} 大題`;
      feedEl.innerHTML = questions
        .map((q, idx) => {
          const draftKey = `dse_biolq_docx_${labelName}_${idx}`;
          const savedDraft = localStorage.getItem(draftKey) || '';
          const isDone = !!savedData.records[`lq_${chapId}_${q.code}`];

          return `
          <div class="bio-q-card">
            <div class="bio-q-meta">
              <span>${q.code}</span>
              <span>第 ${idx + 1} / ${questions.length} 大題</span>
            </div>
            <div class="bio-q-body">${q.stemNodes.join('')}</div>
            <textarea class="bio-lq-scratchpad" data-draft-key="${draftKey}" placeholder="在此輸入本題生物作答草稿...">${savedDraft}</textarea>
            <div style="display:flex; justify-content:flex-end; align-items:center; gap:8px; margin-top:8px;">
              <button type="button" class="bio-mark-lq-done-btn" data-code="${q.code}" data-order="${idx + 1}" style="border:1px solid ${M3_BIO.outline}; background:${isDone ? M3_BIO.primary : M3_BIO.surface}; color:${isDone ? '#FFFFFF' : M3_BIO.primary}; font-size:12px; cursor:pointer; padding:5px 12px; border-radius:12px;">
                ${isDone ? '已完成 ✓' : '標記已完成'}
              </button>
              <button type="button" class="bio-toggle-ms-btn" data-target="biolq-docx-ms-${idx}" style="border:none; background:${M3_BIO.surfaceMuted}; color:${M3_BIO.primary}; font-size:12px; cursor:pointer; padding:5px 12px; border-radius:12px;">
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
      feedEl.querySelectorAll('.bio-mark-lq-done-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          recordBioQuestionProgress({
            chapId,
            mode: 'lq',
            code: btn.dataset.code,
            qOrder: parseInt(btn.dataset.order || '1', 10),
            chosen: 'LQ',
            correctAns: 'LQ',
            isCorrect: true
          });
          btn.style.background = M3_BIO.primary;
          btn.style.color = '#FFFFFF';
          btn.textContent = '已完成 ✓';
        });
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
  // 7. 攔截化學首頁左上角三條橫線 (#topMenuHamburgerBtn) -> 開啟毛玻璃切換視窗
  // ==========================================================================
  function bindChemHamburgerSwitcher() {
    const chemHamBtn = document.getElementById('topMenuHamburgerBtn');
    if (chemHamBtn && chemHamBtn.dataset.v0135SwitchBound !== '1') {
      chemHamBtn.dataset.v0135SwitchBound = '1';
      chemHamBtn.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          openSubjectSwitchModal();
        },
        true
      );
    }
  }

  window.BioMcLqModule = {
    version: MODULE_VERSION,
    updatedAt: UPDATED_AT,
    openSubjectModal: openSubjectSwitchModal,
    switchSubject: switchSubjectHomepage,
    openHome: renderBioHomeDashboard,
    openDirectory: openBioDirectoryModal,
    openChapter: openBioChapter
  };

  function init() {
    injectBioStyles();
    cleanUnwantedElements();
    ensureBioWorkspace();
    bindChemHamburgerSwitcher();

    if (activeSubject === 'bio') {
      switchSubjectHomepage('bio');
    } else {
      switchSubjectHomepage('chem');
    }

    const observer = new MutationObserver(() => {
      cleanUnwantedElements();
      bindChemHamburgerSwitcher();
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

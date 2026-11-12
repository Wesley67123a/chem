/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Additional Layout Patch Module
 * File: patches/patch_v60.js (v60.2 - Image-Equilibrium & 2x2 Graph Fix)
 * Description: Fixes image-based ⇌ symbols being mistaken for A/B/C/D graph
 *              options, merges split equations, and cleans floating labels.
 * ============================================================================
 */

(function () {
  'use strict';

  console.log('[Patch v60.2] Smart Equilibrium & Graph Layout Engine Loaded.');

  // 判斷一段文字是否像化學反應式的一半 (例如含有 (g), (aq), (l), (s), H2O, 2SO3, 離子電荷等)
  function isChemicalHalfEquation(text) {
    if (!text) return false;
    const t = text.trim();
    if (!t || t.length > 95) return false;
    // 排除長篇英文句子
    if (/\b(which|following|consider|mixture|volume|temperature|system|statement|graph|shows|change)\b/i.test(t)) {
      return false;
    }
    // 含有狀態符號 (g), (l), (s), (aq) 或典型化學式特徵
    return (
      /\([glsaq]{1,2}\)/i.test(t) ||
      /[A-Z][a-z]?\d*[\+\-]?\s*\+\s*[A-Z0-9]/.test(t) ||
      /^\([1-3]\)\s*[0-9A-Z\(]/.test(t) ||
      /^[A-D]\.\s*[0-9A-Z\(]/.test(t)
    );
  }

  // 判斷一張 <img> 是否其實是「平衡符號 ⇌」或行內小符號（而非大型 A/B/C/D 選項圖表）
  function isInlineSymbolImage(img, prevText, nextText) {
    if (!img) return false;

    const natW = img.naturalWidth || 0;
    const natH = img.naturalHeight || 0;

    // 1. 若圖片已經載入且原始尺寸很小 (通常 ⇌ 圖片寬度 < 75px, 高度 < 45px)
    if (natW > 0 && natH > 0) {
      if (natW <= 80 && natH <= 50) return true;
      // 真正的座標圖/裝置圖通常寬高都大於 85px
      if (natW >= 95 && natH >= 75) return false;
    }

    // 2. 若圖片尚未完成解碼，檢查它的 base64 長度 (⇌ 小圖的 base64 極短，通常 < 3500 字元)
    const src = img.getAttribute('src') || '';
    if (src.startsWith('data:image/') && src.length < 3200) {
      return true;
    }

    // 3. 根據前後文判斷：若圖片夾在兩段化學式中間，它 100% 是反應箭頭/平衡符號
    if (isChemicalHalfEquation(prevText) && isChemicalHalfEquation(nextText)) {
      return true;
    }

    return false;
  }

  // 主修復函數：針對單一題目的 .q-native-body 進行深度手術
  function applyLayoutFixesToBody(body) {
    if (!body) return;

    // 若圖片還沒載入完（naturalWidth === 0），等待圖片載入後再重跑一次以確保尺寸判斷 100% 準確
    const unloadedImgs = Array.from(body.querySelectorAll('img')).filter(img => !img.complete);
    if (unloadedImgs.length > 0 && !body.dataset.patchWaitedImg) {
      body.dataset.patchWaitedImg = '1';
      Promise.all(
        unloadedImgs.map(
          img =>
            new Promise(res => {
              img.addEventListener('load', res, { once: true });
              img.addEventListener('error', res, { once: true });
              setTimeout(res, 400);
            })
        )
      ).then(() => {
        body.dataset.patchV60Applied = '';
        applyLayoutFixesToBody(body);
      });
    }

    // =========================================================================
    // STEP 0: 拆除 app.js 先前可能誤包的「空白長條外框」(即包住單張 ⇌ 圖片的 div)
    // =========================================================================
    Array.from(body.querySelectorAll('div')).forEach(div => {
      if (div.classList.contains('chem-eq-merged-line') || div.classList.contains('chem-patch-grid')) return;
      const imgs = div.querySelectorAll('img');
      const txt = (div.textContent || '').trim();
      // 如果這個 div 是 app.js 產生的圖片外框 (只含 1 張圖且沒有文字)
      if (imgs.length === 1 && txt === '' && div.parentNode) {
        const parentP = div.parentNode;
        parentP.insertBefore(imgs[0], div);
        div.remove();
      }
    });

    // =========================================================================
    // STEP 1: 找出所有「只含一張 ⇌ 圖片（或純文字 ⇌）」的段落，與上下行化學式合併為一行！
    // =========================================================================
    const blocks = Array.from(body.children);
    for (let i = 0; i < blocks.length; i++) {
      const curr = blocks[i];
      if (!curr || !curr.parentNode) continue;

      const prev = curr.previousElementSibling;
      const next = curr.nextElementSibling;
      if (!prev || !next) continue;

      const currText = (curr.textContent || '').trim();
      const prevText = (prev.textContent || '').trim();
      const nextText = (next.textContent || '').trim();

      const currImgs = curr.querySelectorAll('img');
      const isTextEq = currText === '⇌' || currText === '⇋' || currText === '↔';
      const isImgEq =
        currImgs.length === 1 &&
        currText === '' &&
        isInlineSymbolImage(currImgs[0], prevText, nextText);

      if ((isTextEq || isImgEq) && isChemicalHalfEquation(prevText) && isChemicalHalfEquation(nextText)) {
        const mergedLine = document.createElement('div');
        mergedLine.className = 'chem-eq-merged-line';
        mergedLine.style.cssText =
          'display:flex; align-items:center; flex-wrap:wrap; gap:6px; margin:8px 0; padding:4px 0; font-family:"Times New Roman", "Noto Serif TC", serif; font-size:16px; color:#1D1F2C; line-height:1.6;';

        const leftSpan = document.createElement('span');
        leftSpan.innerHTML = prev.innerHTML.trim();

        const midSpan = document.createElement('span');
        midSpan.style.cssText =
          'display:inline-flex; align-items:center; justify-content:center; margin:0 4px; color:#48547A; font-size:18px; line-height:1;';
        // 統一替換成清晰銳利的標準向量 ⇌ 符號（或保留小尺寸原圖），徹底解決圖片版 ⇌ 忽大忽小問題
        midSpan.innerHTML = '&#8652;';

        const rightSpan = document.createElement('span');
        rightSpan.innerHTML = next.innerHTML.trim();

        mergedLine.appendChild(leftSpan);
        mergedLine.appendChild(midSpan);
        mergedLine.appendChild(rightSpan);

        curr.parentNode.insertBefore(mergedLine, prev);
        prev.remove();
        curr.remove();
        next.remove();
      }
    }

    // =========================================================================
    // STEP 2: 清理 Word 圖表拆散出來的漂浮座標軸文字 (Time, t, [CH3OH(g)], Concentration 等)
    // =========================================================================
    const floatingAxisTrash = [
      'time',
      't',
      'concentration',
      '[ch3oh(g)]',
      'a(g)',
      'b(g)',
      'c(g)',
      'rate',
      'volume'
    ];

    Array.from(body.querySelectorAll('p, div')).forEach(el => {
      if (el.classList.contains('chem-eq-merged-line') || el.classList.contains('chem-patch-grid')) return;
      if (el.querySelector('img, svg, table')) return;

      const rawTxt = (el.textContent || '').trim();
      const lowerTxt = rawTxt.toLowerCase();

      // 清除孤立的座標軸標籤或空得只剩 A. / B. / C. / D. 的殘留行
      if (floatingAxisTrash.includes(lowerTxt)) {
        el.style.display = 'none';
      }
    });

    // 針對氣筒 (Gas syringe) 實驗圖散落的標籤進行收納
    const syringeLabels = [];
    Array.from(body.querySelectorAll('p')).forEach(p => {
      if (p.querySelector('img')) return;
      const t = (p.textContent || '').trim();
      const tl = t.toLowerCase();
      if (
        (tl === 'plunger' ||
          tl === 'rubber cap' ||
          tl === 'gas syringe' ||
          tl.startsWith('a gaseous mixture of')) &&
        t.length < 48
      ) {
        syringeLabels.push(p);
      }
    });

    if (syringeLabels.length >= 2) {
      const allImgs = Array.from(body.querySelectorAll('img'));
      const mainDiagram = allImgs.find(img => !isInlineSymbolImage(img, '', ''));
      if (mainDiagram) {
        const cap = document.createElement('div');
        cap.style.cssText =
          'font-size:12px; color:#5E6478; text-align:center; margin:4px 0 12px 0; font-family:sans-serif;';
        cap.textContent =
          '[' + syringeLabels.map(el => el.textContent.trim()).join(' · ') + ']';
        const anchor = mainDiagram.closest('p, div') || mainDiagram;
        anchor.parentNode.insertBefore(cap, anchor.nextSibling);
        syringeLabels.forEach(el => (el.style.display = 'none'));
      }
    }

    // =========================================================================
    // STEP 3: 只篩選出「真正的大型圖表選項 (4 張濃度/速率圖)」，排成整齊 2x2 Grid！
    // =========================================================================
    const candidateGraphImgs = Array.from(body.querySelectorAll('img')).filter(img => {
      if (img.closest('.chem-eq-merged-line')) return false;
      return !isInlineSymbolImage(img, '', '');
    });

    // 當題目內正好有 4 張大圖（或 >= 3 張大圖選項）時，建立 2x2 選項 Grid
    if (candidateGraphImgs.length >= 3) {
      // 取最後 4 張大圖作為 A, B, C, D 選項圖（避免把題幹最上方的實驗裝置圖算進去）
      const optionImgs =
        candidateGraphImgs.length > 4
          ? candidateGraphImgs.slice(candidateGraphImgs.length - 4)
          : candidateGraphImgs.slice(0, 4);

      if (optionImgs.length === 4 || optionImgs.length === 3) {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'chem-patch-grid';
        gridContainer.style.cssText =
          'display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:14px; margin:16px 0; width:100%; box-sizing:border-box;';

        const firstImgBlock = optionImgs[0].closest('p, div') || optionImgs[0];
        firstImgBlock.parentNode.insertBefore(gridContainer, firstImgBlock);

        // 清除這幾張圖片附近殘留的純文字 "A.", "B.", "C.", "D." 段落，統一由 Grid 卡片標示
        Array.from(body.querySelectorAll('p, div, span')).forEach(el => {
          if (el.querySelector('img')) return;
          const t = (el.textContent || '').trim();
          if (/^[A-D]\.?$/.test(t)) {
            el.style.display = 'none';
          }
        });

        const optLetters = ['A.', 'B.', 'C.', 'D.'];
        optionImgs.forEach((img, idx) => {
          const oldWrapper = img.parentNode;
          const cellCard = document.createElement('div');
          cellCard.style.cssText =
            'background:#FFFFFF; border:1.5px solid #E2E6F3; border-radius:18px; padding:12px 10px; display:flex; flex-direction:column; align-items:center; justify-content:space-between; gap:8px; box-sizing:border-box;';

          const badge = document.createElement('div');
          badge.textContent = optLetters[idx] || '';
          badge.style.cssText =
            'font-family:sans-serif; font-size:13px; color:#48547A; background:#EEF0F8; padding:2px 12px; border-radius:10px;';

          // 固定圖表尺寸，清晰又不佔位
          img.style.cssText =
            'max-width:88% !important; max-height:115px !important; width:auto !important; height:auto !important; object-fit:contain !important; display:block !important; margin:0 auto !important;';

          cellCard.appendChild(img);
          cellCard.appendChild(badge);
          gridContainer.appendChild(cellCard);

          // 若原本包著圖片的空框變空了，順手清掉
          if (
            oldWrapper &&
            oldWrapper !== body &&
            (oldWrapper.textContent || '').trim() === '' &&
            oldWrapper.querySelectorAll('img').length === 0
          ) {
            oldWrapper.remove();
          }
        });
      }
    }
  }

  // 掃描頁面上所有題目卡片並套用修復
  function scanAndPatchAllQuestions() {
    document.querySelectorAll('.q-native-body').forEach(body => {
      if (!body.dataset.patchV60Applied) {
        body.dataset.patchV60Applied = 'true';
        applyLayoutFixesToBody(body);
      }
    });
  }

  // 啟動 DOM 監聽器：當切換章節或題目渲染出來時自動執行
  const observer = new MutationObserver(() => {
    scanAndPatchAllQuestions();
  });

  function initPatchObserver() {
    const root = document.getElementById('chemAppRootContainer') || document.body;
    observer.observe(root, { childList: true, subtree: true });
    scanAndPatchAllQuestions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPatchObserver);
  } else {
    initPatchObserver();
  }
})();

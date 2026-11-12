/**
 * ============================================================================
 * HKDSE Chemistry Question Bank - Additional Layout Patch Module
 * File: patch_v60.js
 * Description: Targeted fixes for Equilibrium layout bugs without altering app.js
 * ============================================================================
 */

(function() {
  'use strict';

  console.log('[Patch v60] Layout fix module loaded.');

  // 核心修復邏輯
  function applyLayoutFixesToContainer(container) {
    if (!container) return;

    // 1. 修復落單的化學平衡符號 (⇌ 或 ⇋)
    const paragraphs = Array.from(container.querySelectorAll('p, div'));
    for (let i = 1; i < paragraphs.length - 1; i++) {
      const p = paragraphs[i];
      const text = (p.textContent || '').trim();
      
      // 如果這行只是一個平衡符號
      if (text === '⇌' || text === '⇋' || text === '&#8652;') {
        const prev = paragraphs[i - 1];
        const next = paragraphs[i + 1];
        
        // 確保前後都是化學式 (通常包含狀態標記如 (g), (aq), (l))
        if (prev && next && /\([glaqs]+\)/i.test(prev.textContent) && /\([glaqs]+\)/i.test(next.textContent)) {
          // 建立一個保護區塊，把反應物、符號、生成物綁在一起
          const wrapper = document.createElement('div');
          wrapper.style.cssText = 'display:block; text-align:left; margin:12px 0; padding:10px 14px; background:#F4F5FA; border:1px solid #CED4EC; border-radius:12px; font-family:"Times New Roman", serif; font-size:17px; line-height:1.6; word-break:break-all;';
          
          wrapper.innerHTML = `
            <span style="display:inline-block; margin-right:8px;">${prev.innerHTML}</span>
            <span style="display:inline-block; color:#48547A; font-weight:bold; margin:0 8px;">⇌</span>
            <span style="display:inline-block; margin-left:8px;">${next.innerHTML}</span>
          `;
          
          // 替換原本的 3 行
          p.parentNode.insertBefore(wrapper, prev);
          prev.remove();
          p.remove();
          next.remove();
          
          // 調整索引避免報錯
          i += 1; 
        }
      }
    }

    // 2. 修復多圖選項排版崩潰 (連續 3 張以上的圖片轉為 2x2 Grid)
    const allImages = Array.from(container.querySelectorAll('img'));
    let imgGroup = [];
    
    for (let i = 0; i < allImages.length; i++) {
      const img = allImages[i];
      const nextImg = allImages[i + 1];
      imgGroup.push(img);
      
      // 判斷是否連續 (中間不能夾雜長文字段落)
      let isContinuous = false;
      if (nextImg) {
        let curr = img.nextElementSibling;
        isContinuous = true;
        while (curr && curr !== nextImg && curr !== nextImg.parentNode) {
          if (curr.textContent.trim().length > 10) { // 如果中間夾了超過 10 個字的文字，視為斷開
            isContinuous = false;
            break;
          }
          curr = curr.nextElementSibling;
        }
      }

      if (!isContinuous) {
        if (imgGroup.length >= 3) {
          // 觸發 Grid 轉換
          const gridWrapper = document.createElement('div');
          gridWrapper.style.cssText = 'display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:16px; margin:16px 0; justify-items:center; align-items:end;';
          
          // 找到第一張圖的父節點位置插入 Grid
          const anchor = imgGroup[0].closest('p') || imgGroup[0];
          anchor.parentNode.insertBefore(gridWrapper, anchor);
          
          const labels = ['A.', 'B.', 'C.', 'D.'];
          imgGroup.forEach((gImg, idx) => {
            const itemBox = document.createElement('div');
            itemBox.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:8px; width:100%;';
            
            // 嘗試抓取圖片前面的標籤 (A., B. ...)
            let labelText = labels[idx] || '';
            let prevNode = gImg.previousSibling;
            while(prevNode) {
              if (prevNode.nodeType === Node.TEXT_NODE && /^[A-D]\./.test(prevNode.textContent.trim())) {
                labelText = prevNode.textContent.trim();
                prevNode.textContent = ''; // 清除原本的文字
                break;
              }
              prevNode = prevNode.previousSibling;
            }

            const labelSpan = document.createElement('span');
            labelSpan.textContent = labelText;
            labelSpan.style.cssText = 'font-weight:bold; color:#48547A; font-family:sans-serif;';
            
            // 設定圖片樣式
            gImg.style.cssText = 'max-width:90%; height:auto; max-height:120px; object-fit:contain; border:1px solid #E2E6F3; border-radius:8px; padding:4px;';
            
            itemBox.appendChild(gImg);
            itemBox.appendChild(labelSpan);
            gridWrapper.appendChild(itemBox);
          });
        }
        imgGroup = []; // 重置
      }
    }

    // 3. 清理圖片旁邊散落的零碎文字 (如 Time, Concentration, a gaseous mixture, plunger 等)
    // 這些通常是單獨成行，且字數極短
    const floatingWords = ['time', 't', 'concentration', 'a(g)', 'b(g)', 'c(g)'];
    paragraphs.forEach(p => {
      const txt = p.textContent.trim().toLowerCase();
      // 如果這行文字完全等於我們要清掉的雜訊，且沒有包含圖片
      if (floatingWords.includes(txt) && !p.querySelector('img, svg, table')) {
        p.style.display = 'none';
      }
    });

    // 針對氣筒 (Gas syringe) 實驗的標註進行特殊處理
    const labelsToCombine = [];
    paragraphs.forEach(p => {
      const txt = p.textContent.trim().toLowerCase();
      if ((txt.includes('plunger') || txt.includes('rubber cap') || txt.includes('gas syringe') || txt.includes('a gaseous mixture')) && txt.length < 50 && !p.querySelector('img')) {
        labelsToCombine.push(p);
      }
    });

    if (labelsToCombine.length > 0) {
      // 找到氣筒圖片
      const syringeImg = Array.from(container.querySelectorAll('img')).find(img => img.src && img.src.length > 100); // 假設這張圖有被載入
      if (syringeImg) {
        const captionBox = document.createElement('div');
        captionBox.style.cssText = 'font-size:12px; color:#5E6478; text-align:center; margin-top:-4px; margin-bottom:12px; font-style:italic;';
        
        let combinedText = labelsToCombine.map(l => l.textContent.trim()).join(' · ');
        captionBox.textContent = `[Diagram Labels: ${combinedText}]`;
        
        const anchor = syringeImg.closest('p') || syringeImg;
        if (anchor.nextSibling) {
          anchor.parentNode.insertBefore(captionBox, anchor.nextSibling);
        } else {
          anchor.parentNode.appendChild(captionBox);
        }
        
        // 隱藏原本散落的標籤
        labelsToCombine.forEach(l => l.style.display = 'none');
      }
    }
  }

  // 監聽 DOM 變化，當新的題目卡片被渲染出來時，自動套用修復
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // 如果新增的是題目列表容器或題目卡片
            if (node.id === 'questionList' || node.classList.contains('question-card')) {
              // 稍微延遲執行，確保原本的 app.js 已經把 HTML 都塞進去了
              setTimeout(() => {
                const targetBodies = node.id === 'questionList' 
                  ? node.querySelectorAll('.q-native-body') 
                  : [node.querySelector('.q-native-body')];
                
                targetBodies.forEach(body => {
                  if (body && !body.dataset.patchV60Applied) {
                    applyLayoutFixesToContainer(body);
                    body.dataset.patchV60Applied = 'true'; // 標記已處理，避免重複執行
                  }
                });
              }, 50);
            }
          }
        });
      }
    });
  });

  // 啟動監聽器，監視整個 #chemAppRootContainer 或是 body
  window.addEventListener('load', () => {
    const root = document.getElementById('chemAppRootContainer') || document.body;
    observer.observe(root, { childList: true, subtree: true });
    
    // 如果載入時已經有題目了，先執行一次
    setTimeout(() => {
      document.querySelectorAll('.q-native-body').forEach(body => {
        if (!body.dataset.patchV60Applied) {
          applyLayoutFixesToContainer(body);
          body.dataset.patchV60Applied = 'true';
        }
      });
    }, 500);
  });

})();

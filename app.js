// 修改後的開啟章節函式：自動從 GitHub 的 pdfs 目錄抓取對應 PDF
async function openChapter(chapId) {
  activeChapterId = chapId;
  const lookup = CHAPTER_LOOKUP[chapId];
  if (!lookup) return;

  // 更新 UI active 狀態
  document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
  const activeEl = document.getElementById(`chap-item-${chapId}`);
  if (activeEl) activeEl.classList.add('active');

  // 更新麵包屑與標題
  document.getElementById('bcTopicName').textContent = lookup.topic.topicName;
  document.getElementById('bcChapterName').textContent = `第 ${lookup.chapter.id} 章`;
  document.getElementById('currentChapterTitle').textContent = lookup.chapter.name;

  document.getElementById('dashboardView').classList.remove('active');
  document.getElementById('chapterView').classList.add('active');

  const container = document.getElementById('questionList');
  container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 48px 0;">正在從 GitHub 載入第 ${chapId} 章 PDF 題庫與圖片...</div>`;

  try {
    // 從 GitHub Pages 的 pdfs 資料夾讀取對應 PDF (例如 ./pdfs/ch11.pdf)
    // 檔名補零對應 (ch01.pdf, ch11.pdf)
    const paddedId = String(chapId).padStart(2, '0');
    const pdfUrl = `./pdfs/ch${paddedId}.pdf`;

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDoc = await loadingTask.promise;

    // 解析該 PDF 的文字與圖片
    const parsedQuestions = await parseQuestionsAndImagesFromPdf(pdfDoc);
    questionsDB[chapId] = parsedQuestions;

    renderChapterQuestions(chapId);
    updateCounts();
  } catch (err) {
    console.warn(`無法從 GitHub 載入 ch${chapId}.pdf：`, err);
    
    // 如果遠端找不到 PDF，退回顯示快取或提示
    if (!questionsDB[chapId] || questionsDB[chapId].length === 0) {
      container.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 48px 0;">
          在 GitHub 倉庫的 <code>pdfs/ch${String(chapId).padStart(2, '0')}.pdf</code> 找不到對應檔案。<br/>
          請確認已將該章 PDF 檔案上傳至 GitHub 的 <code>pdfs/</code> 資料夾中。
        </div>
      `;
    } else {
      renderChapterQuestions(chapId);
    }
  }
}

/**
 * 從 PDF 物件中同時擷取文字與圖片（例如化學結構骨架式）
 */
async function parseQuestionsAndImagesFromPdf(pdfDoc) {
  let fullText = '';
  const imageMap = {}; // 依頁碼或位置對應圖片

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    
    // 1. 擷取文字
    const textContent = await page.getTextContent();
    const strings = textContent.items.map(item => item.str);
    fullText += `--- PAGE ${pageNum} ---\n` + strings.join(' ') + '\n';

    // 2. 擷取頁面中的圖片（如化學結構骨架式）
    try {
      const operatorList = await page.getOperatorList();
      for (let i = 0; i < operatorList.fnArray.length; i++) {
        // 偵測 PDF 內的圖片物件操作子
        if (operatorList.fnArray[i] === pdfjsLib.OPS.paintImageXObject || 
            operatorList.fnArray[i] === pdfjsLib.OPS.paintInlineImageXObject) {
          const imgName = operatorList.args[i][0];
          try {
            const imgObj = await page.objs.get(imgName);
            if (imgObj && imgObj.data) {
              // 將 PDF 圖片轉為 Base64 網頁可顯示格式
              const base64Img = convertPdfImageToBase64(imgObj);
              if (!imageMap[pageNum]) imageMap[pageNum] = [];
              imageMap[pageNum].push(base64Img);
            }
          } catch(imgErr) {
            // 略過無法解碼的圖片
          }
        }
      }
    } catch(opErr) {
      console.warn('解析頁面圖像操作子失敗:', opErr);
    }
  }

  // 利用原本的解析邏輯把文字轉成結構化題目
  const questions = parseQuestionsFromText(fullText);
  
  // 若該頁有抓到圖片，嘗試掛載到對應題目中
  questions.forEach((q, idx) => {
    // 簡單示範：若抓到圖片，指派給對應題目顯示化學結構式
    const sampleImg = imageMap[1] ? imageMap[1][idx] : null;
    if (sampleImg) {
      q.imageUrl = sampleImg;
    }
  });

  return questions;
}

/**
 * 輔助函式：將 PDF 原始圖形數據轉為 Canvas / Base64
 */
function convertPdfImageToBase64(imgObj) {
  const canvas = document.createElement('canvas');
  canvas.width = imgObj.width;
  canvas.height = imgObj.height;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(imgObj.width, imgObj.height);
  
  // 處理色彩通道 (RGBA / Grayscale)
  if (imgObj.data.length === imgObj.width * imgObj.height * 3) {
    let p = 0;
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = imgObj.data[p];     // R
      imgData.data[i+1] = imgObj.data[p+1]; // G
      imgData.data[i+2] = imgObj.data[p+2]; // B
      imgData.data[i+3] = 255;              // A
      p += 3;
    }
  } else {
    imgData.data.set(imgObj.data);
  }
  
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL('image/png');
}

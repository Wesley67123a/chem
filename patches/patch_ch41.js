(function () {
  'use strict';

  const styleId = 'ch41-patch-style-v2';
  const wrapperClass = 'ch41-chart-wrapper';
  const imageClass = 'ch41-chart-image';
  const labelClass = 'ch41-chart-label';

  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement('style');
  style.id = styleId;
  const cssRules = [
    '.ch41-chart-wrapper {',
    'display: block;',
    'position: relative;',
    'margin-top: 24px;',
    'margin-bottom: 24px;',
    'margin-left: auto;',
    'margin-right: auto;',
    'width: 100%;',
    'max-width: 640px;',
    'min-height: 320px;',
    'background-color: transparent;',
    'border-radius: 8px;',
    'overflow: visible;',
    'padding-left: 48px;',
    'padding-right: 48px;',
    'padding-top: 24px;',
    'padding-bottom: 24px;',
    'box-sizing: border-box;',
    '}',
    '.ch41-chart-image {',
    'display: block;',
    'width: 100%;',
    'max-width: 100%;',
    'height: auto;',
    'max-height: none;',
    'margin-top: 0;',
    'margin-bottom: 0;',
    'margin-left: auto;',
    'margin-right: auto;',
    'padding: 0;',
    'border: none;',
    'outline: none;',
    'background: transparent;',
    'object-fit: contain;',
    'object-position: center;',
    'box-sizing: border-box;',
    '}',
    '.ch41-chart-label {',
    'position: absolute;',
    'font-family: "Times New Roman", Cambria, serif;',
    'font-size: 15px;',
    'color: rgb(29, 31, 44);',
    'white-space: nowrap;',
    'user-select: none;',
    'pointer-events: none;',
    'line-height: 1;',
    'margin: 0;',
    'padding: 0;',
    '}',
    '.ch41-label-time {',
    'bottom: 0;',
    'right: 24px;',
    '}',
    '.ch41-label-t {',
    'bottom: 0;',
    'left: 30%;',
    'font-style: italic;',
    '}',
    '.ch41-label-concentration {',
    'top: 50%;',
    'left: 0;',
    'transform: translateY(-50%) rotate(-90deg);',
    'transform-origin: center center;',
    '}',
    '.ch41-label-a {',
    'top: 30%;',
    'right: 0;',
    '}',
    '.ch41-label-b {',
    'top: 50%;',
    'right: 0;',
    '}',
    '.ch41-label-c {',
    'top: 70%;',
    'right: 0;',
    '}',
    '@media screen and (max-width: 768px) {',
    '.ch41-chart-wrapper {',
    'padding-left: 36px;',
    'padding-right: 36px;',
    'padding-top: 20px;',
    'padding-bottom: 20px;',
    'margin-top: 20px;',
    'margin-bottom: 20px;',
    '}',
    '.ch41-chart-label {',
    'font-size: 14px;',
    '}',
    '.ch41-label-time {',
    'right: 16px;',
    '}',
    '.ch41-label-a {',
    'right: 4px;',
    '}',
    '.ch41-label-b {',
    'right: 4px;',
    '}',
    '.ch41-label-c {',
    'right: 4px;',
    '}',
    '}',
    '@media screen and (max-width: 480px) {',
    '.ch41-chart-wrapper {',
    'padding-left: 28px;',
    'padding-right: 28px;',
    'padding-top: 16px;',
    'padding-bottom: 16px;',
    'min-height: 240px;',
    '}',
    '.ch41-chart-label {',
    'font-size: 12px;',
    '}',
    '.ch41-label-time {',
    'right: 12px;',
    'bottom: -4px;',
    '}',
    '.ch41-label-t {',
    'left: 25%;',
    'bottom: -4px;',
    '}',
    '.ch41-label-a {',
    'right: -4px;',
    'top: 28%;',
    '}',
    '.ch41-label-b {',
    'right: -4px;',
    'top: 48%;',
    '}',
    '.ch41-label-c {',
    'right: -4px;',
    'top: 68%;',
    '}',
    '}',
    '@media print {',
    '.ch41-chart-wrapper {',
    'padding-left: 40px;',
    'padding-right: 40px;',
    'page-break-inside: avoid;',
    'break-inside: avoid;',
    '}',
    '.ch41-chart-image {',
    'max-height: 350px;',
    '}',
    '.ch41-chart-label {',
    'font-size: 14px;',
    '}',
    '}',
    '.ch41-inline-eq-symbol {',
    'display: inline-flex;',
    'align-items: center;',
    'justify-content: center;',
    'vertical-align: middle;',
    'margin-left: 6px;',
    'margin-right: 6px;',
    'font-size: 18px;',
    'line-height: 1;',
    'color: rgb(29, 31, 44);',
    'font-family: "Times New Roman", Cambria, serif;',
    'transform: translateY(-1px);',
    '}',
    '.ch41-merged-reaction {',
    'display: block;',
    'margin-top: 8px;',
    'margin-bottom: 8px;',
    'line-height: 1.75;',
    'font-family: "Times New Roman", "Noto Serif TC", serif;',
    'font-size: 16px;',
    'color: rgb(29, 31, 44);',
    '}',
    '.ch41-math-frac {',
    'display: inline-flex;',
    'flex-direction: column;',
    'align-items: center;',
    'vertical-align: middle;',
    'margin-top: 2px;',
    'margin-bottom: 2px;',
    'margin-left: 5px;',
    'margin-right: 5px;',
    'font-family: "Times New Roman", serif;',
    'font-size: 15px;',
    'line-height: 1.15;',
    '}',
    '.ch41-math-frac > .num {',
    'border-bottom: 1px solid rgb(29, 31, 44);',
    'padding-top: 0;',
    'padding-bottom: 2px;',
    'padding-left: 5px;',
    'padding-right: 5px;',
    'text-align: center;',
    'white-space: nowrap;',
    '}',
    '.ch41-math-frac > .den {',
    'padding-top: 2px;',
    'padding-bottom: 0;',
    'padding-left: 5px;',
    'padding-right: 5px;',
    'text-align: center;',
    'white-space: nowrap;',
    '}',
    '.ch41-clean-table {',
    'width: 100%;',
    'max-width: 540px;',
    'border-collapse: collapse;',
    'margin-top: 12px;',
    'margin-bottom: 12px;',
    'font-family: "Times New Roman", serif;',
    'font-size: 15px;',
    '}',
    '.ch41-clean-table th {',
    'border: 1px solid rgb(206, 212, 236);',
    'padding-top: 6px;',
    'padding-bottom: 6px;',
    'padding-left: 10px;',
    'padding-right: 10px;',
    'text-align: center;',
    'vertical-align: middle;',
    'background-color: rgb(238, 240, 248);',
    'color: rgb(29, 31, 44);',
    '}',
    '.ch41-clean-table td {',
    'border: 1px solid rgb(206, 212, 236);',
    'padding-top: 6px;',
    'padding-bottom: 6px;',
    'padding-left: 10px;',
    'padding-right: 10px;',
    'text-align: center;',
    'vertical-align: middle;',
    '}'
  ];
  style.textContent = cssRules.join('\n');
  document.head.appendChild(style);

  const labelMap = {
    'Time': 'ch41-label-time',
    't': 'ch41-label-t',
    'Concentration': 'ch41-label-concentration',
    'A(g)': 'ch41-label-a',
    'B(g)': 'ch41-label-b',
    'C(g)': 'ch41-label-c'
  };

  function getCleanText(node) {
    if (!node) {
      return '';
    }
    let text = node.textContent || '';
    text = text.replace(/\u00A0/g, ' ');
    text = text.trim();
    return text;
  }

  function createLabelElement(text, className) {
    const el = document.createElement('div');
    el.className = labelClass + ' ' + className;
    el.textContent = text;
    return el;
  }

  function removeNode(node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  function extractLabels(wrapper) {
    let sibling = wrapper.nextSibling;
    while (sibling) {
      let nextSibling = sibling.nextSibling;
      let text = getCleanText(sibling);
      if (text === '') {
        removeNode(sibling);
        sibling = nextSibling;
        continue;
      }
      if (labelMap[text]) {
        const labelEl = createLabelElement(text, labelMap[text]);
        wrapper.appendChild(labelEl);
        removeNode(sibling);
        sibling = nextSibling;
      } else if (text === 'Time' || text === 'A(g)' || text === 'B(g)' || text === 'C(g)' || text === 'Concentration' || text === 't') {
        const labelEl = createLabelElement(text, labelMap[text]);
        wrapper.appendChild(labelEl);
        removeNode(sibling);
        sibling = nextSibling;
      } else {
        break;
      }
    }
  }

  function processChartImage(img) {
    if (!img || img.closest('.' + wrapperClass)) {
      return;
    }
    const natW = img.naturalWidth || 0;
    const natH = img.naturalHeight || 0;
    const src = img.getAttribute('src') || '';
    const isChart = (natW > 150 && natH > 100) || 
                    src.includes('graph') || 
                    src.includes('chart') || 
                    src.includes('diagram');
    if (!isChart) {
      return;
    }
    const wrapper = document.createElement('div');
    wrapper.className = wrapperClass;
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    img.className = imageClass;
    img.removeAttribute('width');
    img.removeAttribute('height');
    img.style.setProperty('max-height', 'none', 'important');
    img.style.setProperty('max-width', '100%', 'important');
    img.style.setProperty('width', '100%', 'important');
    img.style.setProperty('height', 'auto', 'important');
    extractLabels(wrapper);
  }

  function scanAndPatch() {
    const images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
      processChartImage(images[i]);
    }
  }

  const observer = new MutationObserver(function (mutations) {
    let shouldScan = false;
    for (let i = 0; i < mutations.length; i++) {
      if (mutations[i].addedNodes.length > 0) {
        shouldScan = true;
        break;
      }
    }
    if (shouldScan) {
      scanAndPatch();
    }
  });

  function init() {
    const root = document.getElementById('chemAppRootContainer') || document.body;
    observer.observe(root, {
      childList: true,
      subtree: true
    });
    scanAndPatch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

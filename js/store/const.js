const PAGE_SIZE = 24;
const ROLLING_TIME = 5000;
const ROLLING_LATENCY = 1000;
const MODAL_POPUP_TIME = 5000;
const SNACKBAR_POPUP_TIME = 2000;

const ARROW_SVG_PATH = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
<path d="M5.48317 10.5L4.6665 9.68333L7.34984 7L4.6665 4.31667L5.48317 3.5L8.98317 7L5.48317 10.5Z" fill="white"/>
</svg>`;

const UNSUB_BTN_PATH = "../img/icons/unsubBtn.svg";

const SUB_BTN_PATH = "../img/icons/Button.svg";

const CANCEL_SUB_BTN_PATH = "../img/icons/cancelSubBtn.svg";

function LIST_ELEMENT_HTML(img_src, btn_src) {
  return `
    <li class="press-item">
      <img class="original" src=${img_src} />
      <button class="hidden">
        <img src=${btn_src} />
      </button>
    </li>
    `;
}

function COUNT_DIV_ELEMENT_HTML(now_count, total_count) {
  return `
    <div class="count font-init">
        <span class="now-count">${now_count}</span>
        <span>/</span>
        <span class="total-count">${total_count}</span>
    </div>
    `;
}

function SUB_NEWS_TITLE_ELEMENT_HTML(sub_news_title) {
  return `
        <li class="text-bold available-medium16">${sub_news_title}</li>
    `;
}

function CAPTION_ELEMENT_HTML(press_name) {
  return ` <li class="caption display-medium14 text-weak">${press_name} 언론사에서 직접 편집한 뉴스입니다.</li> `;
}

export {
  PAGE_SIZE,
  ROLLING_LATENCY,
  ROLLING_TIME,
  MODAL_POPUP_TIME,
  ARROW_SVG_PATH,
  SNACKBAR_POPUP_TIME,
  UNSUB_BTN_PATH,
  SUB_BTN_PATH,
  CANCEL_SUB_BTN_PATH,
  LIST_ELEMENT_HTML,
  COUNT_DIV_ELEMENT_HTML,
  SUB_NEWS_TITLE_ELEMENT_HTML,
  CAPTION_ELEMENT_HTML,
};

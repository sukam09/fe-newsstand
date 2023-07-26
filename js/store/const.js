const PAGE_SIZE = 24;
const ROLLING_TIME = 5000;
const ROLLING_LATENCY = 1000;
const MODAL_POPUP_TIME = 5000;
const SNACKBAR_POPUP_TIME = 2000;

const ARROW_SVG_PATH = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
<path d="M5.48317 10.5L4.6665 9.68333L7.34984 7L4.6665 4.31667L5.48317 3.5L8.98317 7L5.48317 10.5Z" fill="white"/>
</svg>`;

function LIST_ELEMENT(img_src, btn_src) {
  return `
    <li class="press-item">
      <img class="original" src=${img_src} />
      <button class="hidden">
        <img src=${btn_src} />
      </button>
    </li>
    `;
}

export { PAGE_SIZE, ROLLING_LATENCY, ROLLING_TIME, MODAL_POPUP_TIME, ARROW_SVG_PATH, SNACKBAR_POPUP_TIME, LIST_ELEMENT };

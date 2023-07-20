const PAGE_SIZE = 24;
const ROLLING_TIME = 5000;
const ROLLING_LATENCY = 1000;
const MODAL_POPUP_TIME = 5000;
const STATE = {
  SUB_DATA: [],
  IS_GRID_VIEW: false,
  IS_SUB_VIEW: false,
  SUB_NEWS_PAGE: 0,
  SUB_GRID_PAGE:0,
  GRID_PAGE:0,
  IS_DARK: false,
  CLICKED_UNSUB_NAME:"",
};

const DATA = {
  category: ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"],
  now_category: "종합/경제",
  total_pages: {},
  page_count: {},
};

function setSubData(target) {
  if (STATE.SUB_DATA.find(press => press.name === target.name) === undefined) {
    STATE.SUB_DATA.push(target);
  } else {
    STATE.SUB_DATA = STATE.SUB_DATA.filter(press => press.name !== target.name);
  }
}

const ARROW_SVG_PATH = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
<path d="M5.48317 10.5L4.6665 9.68333L7.34984 7L4.6665 4.31667L5.48317 3.5L8.98317 7L5.48317 10.5Z" fill="white"/>
</svg>`

export { PAGE_SIZE, ROLLING_LATENCY, ROLLING_TIME, MODAL_POPUP_TIME, setSubData, STATE, DATA, ARROW_SVG_PATH };

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

export { PAGE_SIZE, ROLLING_LATENCY, ROLLING_TIME, MODAL_POPUP_TIME, setSubData, STATE, DATA };

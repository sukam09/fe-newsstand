const PAGE_SIZE = 24;
const ROLLING_TIME = 5000;
const ROLLING_LATENCY = 1000;
const MODAL_POPUP_TIME = 5000;
const STATE = {
  SUB_DATA: [],
  IS_GRID_VIEW: false,
  IS_SUB_VIEW: false,
  SUB_NEWS_PAGE: 0,
};

function setSubData(target) {
  if (STATE.SUB_DATA.find(press => press.name === target.name) === undefined) {
    STATE.SUB_DATA.push(target);
  } else {
    STATE.SUB_DATA = STATE.SUB_DATA.filter(press => press.name !== target.name);
  }
}

export { PAGE_SIZE, ROLLING_LATENCY, ROLLING_TIME, MODAL_POPUP_TIME, setSubData, STATE };

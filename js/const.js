const PAGE_SIZE = 24;
const ROLLING_TIME = 5000;
const ROLLING_LATENCY = 1000;
const MODAL_POPUP_TIME = 5000;
let SUB_DATA = [];

function getSubData() {
  return SUB_DATA;
}

function setSubData(target) {
  if (SUB_DATA.find(press => press.name === target.name) === undefined) {
    SUB_DATA.push(target);
  } else {
    SUB_DATA = SUB_DATA.filter(press => press.name !== target.name);
  }
}

export { PAGE_SIZE, ROLLING_LATENCY, ROLLING_TIME, MODAL_POPUP_TIME, getSubData, setSubData };

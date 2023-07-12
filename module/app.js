import { initDate, initBtn } from "./util.js";
import { initGrid } from "./grid.js";
import { initRollingNews } from "./rolling.js";

function init() {
  initDate();
  initRollingNews();
  initBtn();
  initGrid();
}

init();

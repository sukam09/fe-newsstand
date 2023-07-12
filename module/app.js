import { initDate, initBtn } from "./util.js";
import { printGrid, moveGrid } from "./grid.js";
import { initRollingNews } from "./rolling.js";

function init() {
  initDate();
  initRollingNews();
  initBtn();
  printGrid();
}

init();

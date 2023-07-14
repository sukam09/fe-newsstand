import { initNewsData } from "./api.js";
import { initDate, initBtn } from "./util.js";
import { initRollingNews } from "./rolling.js";
import { initGrid } from "./grid.js";

(async function init() {
  await initNewsData();
  initDate();
  initBtn();
  initRollingNews();
  initGrid();
})();

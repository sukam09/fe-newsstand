import { setDate } from "./setDate.js";
import { initRolling } from "./newsRolling.js";
import { initPressGrid } from "./gridFunction.js";
import { now_category, drawNews, initCategoryClass } from "./newsList.js";

document.addEventListener("DOMContentLoaded", () => {
  setDate();
  initPressGrid();
  initRolling();
  initCategoryClass();
  drawNews(now_category, 0);
});

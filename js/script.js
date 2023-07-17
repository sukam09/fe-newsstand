import { setDate } from "./setDate.js";
import { initRolling } from "./newsRolling.js";
import { initPressGrid } from "./gridFunction.js";
import { now_category, drawNews, initCategoryClass } from "./newsList.js";
import { initSpanEvent } from "./subscribe.js";
import { initModalBtn } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  setDate();
  initPressGrid();
  initRolling();
  initCategoryClass();
  initSpanEvent();
  initModalBtn();
  drawNews(now_category, 0);
});

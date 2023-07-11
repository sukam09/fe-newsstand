import { setDate } from "./setDate.js";
import { initRolling } from "./newsRolling.js";
import { initPressGrid } from "./gridFunction.js";
import { now_category, clickListRightBtn, clickListLeftBtn, drawNews, initCategoryClass } from "./newsList.js";

function initDisplayNone() {
  document.querySelector(".list-selected").style.display = "none";
  document.querySelector(".press-list-section").style.display = "none";
  document.getElementById("grid-prev").style.display = "none";
  document.querySelector(".left-btn").classList.add("hidden");
  document.querySelector(".right-btn").addEventListener("click", () => clickListRightBtn(now_category));

  document.querySelector(".left-btn").addEventListener("click", () => clickListLeftBtn(now_category));
}

document.addEventListener("DOMContentLoaded", () => {
  initDisplayNone();
  setDate();
  initPressGrid();
  initRolling();
  initCategoryClass();
  drawNews(now_category, 0);
});

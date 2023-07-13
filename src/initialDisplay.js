import { appendCategoryTabNum } from "./progressBar.js";

/***** 초기 화면 *****/
function countDisplayNone() {
  document.querySelectorAll(".count").forEach((count) => {
    count.style.display = "none";
  });
}

function initDisplay() {
  document.querySelector(".list-selected").style.display = "none";
  document.querySelector(".press-list-section").style.display = "none";
  document.getElementById("grid-prev").style.display = "none";
  appendCategoryTabNum();
  countDisplayNone();
  document.querySelector(".count").style.display = "block";
}

export { countDisplayNone, initDisplay };

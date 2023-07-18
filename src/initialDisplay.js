import { appendCategoryTabNum } from "./progressBar.js";
import { setDisplay } from "./utils.js";

/***** 초기 화면 *****/
function countDisplayNone() {
  document.querySelectorAll(".count").forEach((count) => {
    count.style.display = "none";
  });
}

function initDisplay() {
  setDisplay(".list-selected", "none");
  setDisplay(".press-list-section", "none");
  setDisplay("#grid-prev", "none");
  appendCategoryTabNum();
  countDisplayNone();
  setDisplay(".count", "block");
}

export { countDisplayNone, initDisplay };

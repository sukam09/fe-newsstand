import { appendCategoryTabNum } from "./components/listNews.js";
import { setDisplay, setDisplayofArr } from "./util/utils.js";

/***** 초기 화면 *****/
function countDisplayNone() {
  document.querySelectorAll(".count").forEach((count) => {
    count.style.display = "none";
  });
}

function initDisplay() {
  const none_display = [
    ".list-selected",
    ".press-list-section",
    "#grid-prev",
    ".sub-alert",
  ];
  setDisplayofArr(none_display, "none");
  appendCategoryTabNum();
  countDisplayNone();
  setDisplay(".count", "block");
}

export { countDisplayNone, initDisplay };

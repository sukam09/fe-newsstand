import { FIRST_PAGE_NUM, LAST_PAGE_NUM } from "../constants/constants.js";
import { getPage, getView } from "../core/getter.js";
export function checkPage(hiddenMode = "false") {
  const left_btn = document.getElementById("left-btn");
  const right_btn = document.getElementById("right-btn");
  left_btn.style.visibility = "visible";
  right_btn.style.visibility = "visible";
  if (getView() === "grid") {
    //구독한 언론사 마지막 페이지
    if (hiddenMode) {
      right_btn.style.visibility = "hidden";
    } else {
      if (getPage() === FIRST_PAGE_NUM) {
        left_btn.style.visibility = "hidden";
      } else if (getPage() === LAST_PAGE_NUM) {
        right_btn.style.visibility = "hidden";
      }
    }
  }
}

import { FIRST_PAGE_NUM, LAST_PAGE_NUM } from "../constants/constants.js";
export function checkPage(page, view) {
  if (view === "grid") {
    const left_btn = document.getElementById("left-btn");
    const right_btn = document.getElementById("right-btn");
    if (page === FIRST_PAGE_NUM) left_btn.style.visibility = "hidden";
    else if (page === LAST_PAGE_NUM) right_btn.style.visibility = "hidden";
    else {
      left_btn.style.visibility = "visible";
      right_btn.style.visibility = "visible";
    }
  }
}

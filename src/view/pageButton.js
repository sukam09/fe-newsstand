import { GRID_PAGE, VIEW } from "../model/global.js";
import { store } from "../model/store.js";
const GRID_ENTIRE_PAGE = 3;
const PRESS_CNT_PER_PAGE = 24;

const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");

export function renderPageButton() {
  if (VIEW.layout === "grid") {
    GRID_PAGE.page === 0 ? (left_btn.style.display = "none") : (left_btn.style.display = "block");

    const SUBSCRIBE_PRESS_CNT = store.getSubscribe().length;
    let pageLength = VIEW.tab === "entire" ? GRID_ENTIRE_PAGE : Math.floor(SUBSCRIBE_PRESS_CNT / PRESS_CNT_PER_PAGE);

    GRID_PAGE.page < pageLength || pageLength === 0 ? (right_btn.style.display = "block") : (right_btn.style.display = "none");
  } else {
    // 리스트뷰
    right_btn.style.display = "block";
    left_btn.style.display = "block";
  }
}

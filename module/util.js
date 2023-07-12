import { moveGrid } from "./grid.js";
import { ICON, BTN, GLOBAL } from "./variable.js";

// 날짜 관련 함수
function initDate() {
  const date = new Date();
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const todaystr = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}. ${week[date.getDay()]}`;
  GLOBAL.DOM.today.innerHTML = todaystr;
}

// 버튼 관련 함수
function initBtn() {
  GLOBAL.DOM.right_btn.addEventListener("click", () => moveGrid(BTN.NEXT_PAGE));
  GLOBAL.DOM.left_btn.addEventListener("click", () => moveGrid(BTN.PREV_PAGE));

  GLOBAL.DOM.list_btn.addEventListener("click", () => {
    toggleView(BTN.LIST_VIEW);
  });
  GLOBAL.DOM.grid_btn.addEventListener("click", () => {
    toggleView(BTN.GRID_VIEW);
  });
}

function toggleView(mode) {
  if (mode === BTN.GRID_VIEW) {
    GLOBAL.DOM.grid_btn.childNodes[1].src = ICON.GRID_BTN_BLUE;
    GLOBAL.DOM.grid_view.style.display = "flex";
    GLOBAL.DOM.list_btn.childNodes[1].src = ICON.LIST_BTN;
    GLOBAL.DOM.list_view.style.display = "none";
  } else {
    GLOBAL.DOM.grid_btn.childNodes[1].src = ICON.GRID_BTN;
    GLOBAL.DOM.grid_view.style.display = "none";
    GLOBAL.DOM.list_btn.childNodes[1].src = ICON.LIST_BTN_BLUE;
    GLOBAL.DOM.list_view.style.display = "inline-flex";
  }
}

export { initDate, initBtn };

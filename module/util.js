import { moveGrid } from "./grid.js";
import { ICON, BTN } from "./variable.js";

// 날짜 관련 함수
function initDate() {
  const date = new Date();
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const todaystr = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}. ${week[date.getDay()]}`;
  document.querySelector(".today").innerHTML = todaystr;
}

// 버튼 관련 함수
const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");
const list_btn = document.querySelector(".list-btn");
const grid_btn = document.querySelector(".grid-btn");
const grid_view = document.querySelector(".grid");
const list_view = document.querySelector(".list-view");

function initBtn() {
  right_btn.addEventListener("click", () => moveGrid(+1));
  left_btn.addEventListener("click", () => moveGrid(-1));

  list_btn.addEventListener("click", (e) => {
    toggleView(e, BTN.LIST_VIEW);
  });
  grid_btn.addEventListener("click", (e) => {
    toggleView(e, BTN.GRID_VIEW);
  });
}

function toggleView(event, mode) {
  if (mode === BTN.GRID_VIEW) {
    event.target.src = ICON.GRID_BTN_BLUE;
    list_btn.childNodes[1].src = ICON.LIST_BTN;
    grid_view.style.display = "flex";
    list_view.style.display = "none";
  } else {
    event.target.src = ICON.LIST_BTN_BLUE;
    grid_btn.childNodes[1].src = ICON.GRID_BTN;
    grid_view.style.display = "none";
    list_view.style.display = "inline-flex";
  }
}

export { initDate, initBtn };

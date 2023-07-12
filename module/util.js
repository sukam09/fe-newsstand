import { moveGrid } from "./grid.js";

// 날짜 관련 함수
function initDate() {
  const date = new Date();
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const todaystr = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}. ${week[date.getDay()]}`;
  document.querySelector(".today").innerHTML = todaystr;
}

// 좌우 버튼 관련 함수
function initBtn() {
  const right_btn = document.querySelector(".right-btn");
  const left_btn = document.querySelector(".left-btn");
  const list_btn = document.querySelector(".list-btn");
  const grid_btn = document.querySelector(".grid-btn");
  const grid_view = document.querySelector(".grid");
  const list_view = document.querySelector(".list-view");

  right_btn.addEventListener("click", () => moveGrid(+1));
  left_btn.addEventListener("click", () => moveGrid(-1));

  list_btn.addEventListener("click", (e) => {
    e.target.src = "./icons/ListButton-Blue.svg";
    grid_btn.childNodes[1].src = "./icons/GridButton.svg";

    grid_view.style.display = "none";
    list_view.style.display = "inline-flex";
  });
  grid_btn.addEventListener("click", (e) => {
    e.target.src = "./icons/GridButton-Blue.svg";
    list_btn.childNodes[1].src = "./icons/ListButton.svg";

    grid_view.style.display = "flex";
    list_view.style.display = "none";
  });
}

export { initDate, initBtn };

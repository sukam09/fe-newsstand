import { removeDisplay, setDisplay } from "./utils.js";
import { setSubListNav } from "./newsList.js";
import { drawSubGridView } from "./gridFunction.js";

let sub_view_selected = false;
let grid_view_selected = true;

function checkViewStatus(target) {
  // option 선택
  document.querySelector(".option-selected").classList.remove("option-selected");
  target.classList.add("option-selected");
  removeDisplay();
  if (target.textContent === "내가 구독한 언론사") {
    setDisplay(".grid-selected", "query", "none");
    setDisplay(".list-selected", "query", "flex");
    setDisplay(".sub-press-list-section", "query", "block");
    sub_view_selected = true;
    grid_view_selected = false;
  } else {
    setDisplay(".grid-selected", "query", "flex");
    setDisplay(".list-selected", "query", "none");
    setDisplay(".press-grid", "query", "block");
    sub_view_selected = false;
    grid_view_selected = true;
  }
}

function changeToGrid() {
  console.log("click");
  //그리드 클릭 시
  setDisplay(".grid-selected", "query", "flex");
  setDisplay(".list-selected", "query", "none");
  removeDisplay();
  if (sub_view_selected) {
    setDisplay(".press-grid-sub", "query", "block");
    drawSubGridView();
    sub_view_selected = true;
  } else {
    setDisplay(".press-grid", "query", "block");
    sub_view_selected = false;
  }
  grid_view_selected = true;
}

function changeToList() {
  //리스트 클릭 시
  setDisplay(".grid-selected", "query", "none");
  setDisplay(".list-selected", "query", "flex");
  removeDisplay();
  if (sub_view_selected) {
    // svs true면
    setDisplay(".sub-press-list-section", "query", "block");
    sub_view_selected = true;
    setSubListNav();
  } else {
    // svs false면
    setDisplay(".press-list-section", "query", "block");
    sub_view_selected = false;
  }
  grid_view_selected = false;
}

function addEventInSymbol() {
  let $list_symbol = document.querySelectorAll(".list-symbol");
  let $grid_symbol = document.querySelectorAll(".grid-symbol");
  $list_symbol.forEach(symbol => {
    symbol.addEventListener("click", () => {
      if (grid_view_selected) {
        // grid 상태이면
        changeToList();
      }
    });
  });
  $grid_symbol.forEach(symbol => {
    symbol.addEventListener("click", () => {
      if (!grid_view_selected) {
        // grid 상태 아니면
        changeToGrid();
      }
    });
  });
}

export { checkViewStatus, changeToGrid, changeToList, addEventInSymbol };

import { removeDisplay, setDisplay, getJSON } from "./utils.js";
import { drawSubNews, setSubListNav } from "./newsList.js";
import { drawGridView, drawSubGridView } from "./gridFunction.js";
import { getSubData } from "./const.js";

let sub_view_selected = false;
let grid_view_selected = true;

let presses;
function checkViewStatus(target) {
  // option 선택
  document.querySelector(".option-selected").classList.remove("option-selected");
  target.classList.add("option-selected");
  removeDisplay();
  if (target.textContent === "내가 구독한 언론사") {
    setDisplay(".grid-selected", "query", "none");
    setDisplay(".list-selected", "query", "flex");
    if (getSubData().length === 0) {
      setDisplay(".no-sub-item-div", "query", "block");
    } else {
      setDisplay(".sub-press-list-section", "query", "block");
      setSubListNav();
      drawSubNews(0);
    }

    sub_view_selected = true;
    grid_view_selected = false;
  } else {
    setDisplay(".grid-selected", "query", "flex");
    setDisplay(".list-selected", "query", "none");
    setDisplay(".press-grid", "query", "block");
    drawGridView();
    sub_view_selected = false;
    grid_view_selected = true;
  }
}

function changeToGrid() {
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
    drawGridView();
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
    if (getSubData().length === 0) {
      setDisplay(".no-sub-item-div", "query", "block");
    } else {
      setDisplay(".sub-press-list-section", "query", "block");
      sub_view_selected = true;
      setSubListNav();
      drawSubNews(0);
    }
  } else {
    // svs false면
    setDisplay(".press-list-section", "query", "block");
    sub_view_selected = false;
  }
  grid_view_selected = false;
}

async function addEventInSymbol() {
  presses = await getJSON("../assets/media.json");
  presses = Object.values(presses).reduce((acc, cur) => {
    return acc.concat(cur);
  });

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

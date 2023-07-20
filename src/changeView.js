import {
  initializeProgress,
  runProgress,
  clearProgress,
} from "./progressBar.js";
import { setDisplay } from "./util/utils.js";
import { setSubGrid } from "./subGrid.js";
import { subscribeState } from "./store/subscribeState.js";

let grid_view_selected = true;
let sub_grid_length = 0;

/***** grid형 <-> list형 뷰 변경 *****/
//grid형 보기로 바꾸기
function changeToGridView() {
  setDisplay(".list-selected", "none");
  setDisplay(".grid-selected", "block");
  setDisplay(".press-list-section", "none");
  setDisplay(".press-grid", "block");
  setDisplay(".press-sub-grid", "none");
  setDisplay(".sub-press-list-section", "none");

  document.querySelector(".total-press").classList.remove("not-clicked");
  document.querySelector(".total-press").classList.add("bold-font-init");
  document
    .querySelector(".subscribed-press")
    .classList.remove("bold-font-init");
  document.querySelector(".subscribed-press").classList.add("not-clicked");
  grid_view_selected = true;
}

function changeToSubGridView() {
  document.querySelector(".total-press").classList.remove("bold-font-init");
  document.querySelector(".total-press").classList.add("not-clicked");
  document.querySelector(".subscribed-press").classList.remove("not-clicked");
  document.querySelector(".subscribed-press").classList.add("bold-font-init");

  setDisplay(".list-selected", "none");
  setDisplay(".grid-selected", "block");
  setDisplay(".press-grid", "none");
  setDisplay(".press-sub-grid", "block");
  setDisplay(".press-list-section", "none");
  setDisplay(".sub-press-list-section", "none");

  if (subscribeState.subPressList.length !== sub_grid_length) {
    setSubGrid();
    sub_grid_length = subscribeState.subPressList.length;
  }
}

//list형 보기로 바꾸기
function changeToListView() {
  setDisplay(".grid-selected", "none");
  setDisplay(".list-selected", "block");
  setDisplay(".press-list-section", "block");
  setDisplay(".press-grid", "none");
  setDisplay(".press-sub-grid", "none");
  setDisplay(".sub-press-list-section", "none");

  document.querySelector(".total-press").classList.remove("not-clicked");
  document.querySelector(".total-press").classList.add("bold-font-init");
  document
    .querySelector(".subscribed-press")
    .classList.remove("bold-font-init");
  document.querySelector(".subscribed-press").classList.add("not-clicked");
  grid_view_selected = false;
}

function changeToSubListView() {
  setDisplay(".grid-selected", "none");
  setDisplay(".list-selected", "block");
  setDisplay(".press-list-section", "none");
  setDisplay(".press-grid", "none");
  setDisplay(".press-sub-grid", "none");
  setDisplay(".sub-press-list-section", "block");

  document.querySelector(".total-press").classList.remove("not-clicked");
  document.querySelector(".total-press").classList.add("bold-font-init");
  document
    .querySelector(".subscribed-press")
    .classList.remove("bold-font-init");
  document.querySelector(".subscribed-press").classList.add("not-clicked");
  grid_view_selected = false;
}

const grid_symbol = document.querySelectorAll(".grid-symbol");
grid_symbol.forEach((symbol) => {
  symbol.addEventListener("click", () => {
    if (!grid_view_selected) {
      // grid 상태 아니면
      changeToGridView();
      grid_view_selected = true;
      document.querySelector(".progress-bar").classList.remove("progress-bar");
      clearProgress();
      initializeProgress();
    }
  });
});

const list_symbol = document.querySelectorAll(".list-symbol");
list_symbol.forEach((symbol) => {
  symbol.addEventListener("click", () => {
    if (grid_view_selected) {
      //grid 상태라면
      changeToListView();
      grid_view_selected = false;
      document
        .getElementsByClassName("progress-item")[0]
        .classList.add("progress-bar");
      runProgress();
    }
  });
});

const my_sub = document.querySelector(".subscribed-press");
my_sub.addEventListener("click", () => {
  if (grid_view_selected) {
    //grid 상태라면
    changeToSubGridView();
  } else {
    changeToSubListView();
  }
});

const total_press = document.querySelector(".total-press");
total_press.addEventListener("click", () => {
  if (grid_view_selected) {
    //grid 상태라면
    changeToGridView();
  } else {
    changeToListView();
  }
});

export { changeToGridView, changeToListView };

import {
  initializeProgress,
  runProgress,
  clearProgress,
} from "./components/progressBar.js";
import { runSubProgress } from "./components/subProgressBar.js";
import { setDisplayofArr, removeAddClass } from "./util/utils.js";
import { setSubGrid } from "./components/subGrid.js";
import { drawListView } from "./components/listNews.js";
import {
  appendSubCategory,
  drawSubListView,
} from "./components/subListNews.js";
import { subscribeState } from "./store/subscribeState.js";

let grid_view_selected = true;
let total_press;
let subscribed_press;

function getTotalSubClass() {
  total_press = document.querySelector(".total-press");
  subscribed_press = document.querySelector(".subscribed-press");
}

/***** grid형 <-> list형 뷰 변경 *****/
//grid형 보기로 바꾸기
function changeToGridView() {
  const block_display = [".grid-selected", ".press-grid"];
  const none_display = [
    ".list-selected",
    ".press-list-section",
    ".press-sub-grid",
    ".sub-press-list-section",
  ];
  setDisplayofArr(block_display, "block");
  setDisplayofArr(none_display, "none");

  getTotalSubClass();
  removeAddClass(total_press, "not-clicked", "bold-font-init");
  removeAddClass(subscribed_press, "bold-font-init", "not-clicked");
  grid_view_selected = true;
}

function changeToSubGridView() {
  const block_display = [".grid-selected", ".press-sub-grid"];
  const none_display = [
    ".list-selected",
    ".press-grid",
    ".press-list-section",
    ".sub-press-list-section",
  ];
  setDisplayofArr(block_display, "block");
  setDisplayofArr(none_display, "none");

  getTotalSubClass();
  removeAddClass(total_press, "bold-font-init", "not-clicked");
  removeAddClass(subscribed_press, "not-clicked", "bold-font-init");

  setSubGrid();
}

//list형 보기로 바꾸기
function changeToListView() {
  const block_display = [".list-selected", ".press-list-section"];
  const none_display = [
    ".grid-selected",
    ".press-grid",
    ".press-sub-grid",
    ".sub-press-list-section",
  ];
  setDisplayofArr(block_display, "block");
  setDisplayofArr(none_display, "none");

  getTotalSubClass;
  removeAddClass(total_press, "not-clicked", "bold-font-init");
  removeAddClass(subscribed_press, "bold-font-init", "not-clicked");
  drawListView(0, 0);
  grid_view_selected = false;
}

function changeToSubListView() {
  const block_display = [".list-selected", ".sub-press-list-section"];
  const none_display = [
    ".grid-selected",
    ".press-grid",
    ".press-list-section",
    ".press-sub-grid",
  ];
  setDisplayofArr(block_display, "block");
  setDisplayofArr(none_display, "none");

  getTotalSubClass();
  removeAddClass(total_press, "bold-font-init", "not-clicked");
  removeAddClass(subscribed_press, "not-clicked", "bold-font-init");
  appendSubCategory();
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
    document
      .querySelector(".sub-list-nav .progress-item")
      .classList.add("progress-bar");
    runSubProgress();
    drawSubListView(0);
  }
});

const total = document.querySelector(".total-press");
total.addEventListener("click", () => {
  if (grid_view_selected) {
    //grid 상태라면
    changeToGridView();
  } else {
    changeToListView();
  }
});

export { changeToGridView, changeToListView };

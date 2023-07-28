import {
  initializeProgress,
  runProgress,
  clearProgress,
} from "./components/progressBar.js";
import {
  initializeSubProgress,
  runSubProgress,
  clearSubProgress,
} from "./components/subProgressBar.js";
import { setDisplayofArr, removeAddClass } from "./util/utils.js";
import { drawListView } from "./components/listNews.js";
import {
  appendSubCategory,
  drawSubListView,
  showAlertForNonSub,
} from "./components/subListNews.js";
import { setState, getState } from "./observer/observer.js";
import {
  isLight,
  isGridView,
  isMySubView,
  subListPageIdx,
  subscribedPress,
} from "./store/store.js";
import { setGrid } from "./components/gridView.js";
import { DARK_MODE_ICON, LIGHT_MODE_ICON } from "./util/path.js";

let total_press;
let subscribed_press;

function addEventToViewOption() {
  const $list_symbol = document.querySelectorAll(".list-symbol");
  const $grid_symbol = document.querySelectorAll(".grid-symbol");
  const $my_sub = document.querySelector(".subscribed-press");
  const $total = document.querySelector(".total-press");
  $list_symbol.forEach((symbol) =>
    symbol.addEventListener("click", changeView)
  );
  $grid_symbol.forEach((symbol) =>
    symbol.addEventListener("click", changeView)
  );
  $my_sub.addEventListener("click", changeView);
  $total.addEventListener("click", changeView);
}

function changeView({ target: target }) {
  const target_class = target.classList;
  if (target_class.contains("grid-symbol")) {
    setState(isGridView, true);
    if (getState(isMySubView)) {
      changeToSubGridViewDisplay();
      setGrid();
    } else {
      changeToGridViewDisplay();
    }
    if (document.querySelector(".progress-bar") !== null) {
      document.querySelector(".progress-bar").classList.remove("progress-bar");
      clearProgress();
      initializeProgress();
    }
  }
  if (target_class.contains("list-symbol")) {
    setState(subListPageIdx, 0);
    setState(isGridView, false);
    if (getState(isMySubView) && getState(subscribedPress).length === 0) {
      showAlertForNonSub();
    } else if (
      getState(isMySubView) &&
      getState(subscribedPress).length !== 0
    ) {
      changeToSubListViewDisplay();
    } else {
      changeToListViewDisplay();
      document
        .getElementsByClassName("progress-item")[0]
        .classList.add("progress-bar");
      runProgress();
    }
  }
  if (target_class.contains("total-press")) {
    setState(isGridView, true);
    setState(isMySubView, false);
    changeToGridViewDisplay();
  }
  if (target_class.contains("subscribed-press")) {
    setState(subListPageIdx, 0);
    if (getState(subscribedPress).length === 0) {
      showAlertForNonSub();
    } else {
      setState(isGridView, false);
      setState(isMySubView, true);
      changeToSubListViewDisplay();
      document
        .querySelector(".sub-list-nav .progress-item")
        .classList.add("progress-bar");
      runSubProgress();
      drawSubListView(0);
    }
  }
}

function getTotalSubClass() {
  total_press = document.querySelector(".total-press");
  subscribed_press = document.querySelector(".subscribed-press");
}

/***** grid형 <-> list형 뷰 변경 *****/
//grid형 보기로 바꾸기
function changeToGridViewDisplay() {
  const block_display = [".grid-selected", ".press-grid"];
  const none_display = [
    ".list-selected",
    ".press-list-section",
    ".sub-press-list-section",
  ];
  setDisplayofArr(block_display, "block");
  setDisplayofArr(none_display, "none");

  getTotalSubClass();
  removeAddClass(total_press, "not-clicked", "bold-font-init");
  removeAddClass(subscribed_press, "bold-font-init", "not-clicked");
}

function changeToSubGridViewDisplay() {
  const block_display = [".grid-selected", ".press-grid"];
  const none_display = [
    ".list-selected",
    ".press-list-section",
    ".sub-press-list-section",
  ];
  setDisplayofArr(block_display, "block");
  setDisplayofArr(none_display, "none");

  getTotalSubClass();
  removeAddClass(total_press, "bold-font-init", "not-clicked");
  removeAddClass(subscribed_press, "not-clicked", "bold-font-init");
}

//list형 보기로 바꾸기
function changeToListViewDisplay() {
  const block_display = [".list-selected", ".press-list-section"];
  const none_display = [
    ".grid-selected",
    ".press-grid",
    ".sub-press-list-section",
  ];
  setDisplayofArr(block_display, "block");
  setDisplayofArr(none_display, "none");

  getTotalSubClass;
  removeAddClass(total_press, "not-clicked", "bold-font-init");
  removeAddClass(subscribed_press, "bold-font-init", "not-clicked");
  drawListView(0, 0);
}

function changeToSubListViewDisplay() {
  const block_display = [".list-selected", ".sub-press-list-section"];
  const none_display = [".grid-selected", ".press-grid", ".press-list-section"];
  setDisplayofArr(block_display, "block");
  setDisplayofArr(none_display, "none");

  getTotalSubClass();
  removeAddClass(total_press, "bold-font-init", "not-clicked");
  removeAddClass(subscribed_press, "not-clicked", "bold-font-init");
  appendSubCategory();
}

/***** 라이트모드 <-> 다크모드 변경 *****/
const body = document.querySelector("body");
const dark_mode_icon = document.querySelectorAll(".dark-mode-icon");

dark_mode_icon.forEach((icon) =>
  icon.addEventListener("click", handleDarkMode)
);

function handleDarkMode() {
  setState(isLight, !getState(isLight));
  if (getState(isLight)) {
    dark_mode_icon.forEach((item) => (item.src = LIGHT_MODE_ICON));
  } else {
    dark_mode_icon.forEach((item) => (item.src = DARK_MODE_ICON));
  }
  body.classList.toggle("dark"), 100;
}

export {
  changeToGridViewDisplay,
  changeToListViewDisplay,
  addEventToViewOption,
};

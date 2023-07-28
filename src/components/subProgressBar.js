import {
  appendSubCategory,
  drawSubListView,
  showAlertForNonSub,
} from "./subListNews.js";
import { getState, setState } from "../observer/observer.js";
import { subscribedPress } from "../store/store.js";
import { removePressFromSubList } from "./gridView.js";
import { getPressObj } from "../api/api.js";
import { setDisplay } from "../util/utils.js";

const PROGRESS_TIME = 2000;
let category_num = 0;
let current_category = 0;
let clicked_idx = 0;
let progress_interval;
let presses = null;

function getSubPressLength() {
  category_num = getState(subscribedPress).length;
}

//제자리에서 프로그레스바 다시 차오르게 해주는 함수
function reloadProgressAnimation() {
  const currentCategory = document.querySelector(".sub-list-nav .progress-bar");
  currentCategory.classList.remove("progress-bar");
  void currentCategory.offsetWidth;
  currentCategory.classList.add("progress-bar");
}

function clearAndReload() {
  clearSubProgress();
  reloadProgressAnimation();
}

function countUp() {
  getSubPressLength();
  if (category_num === 1) {
    reloadProgressAnimation();
  } else {
    if (current_category < category_num - 1) {
      changeCategory(current_category, current_category + 1);
      drawSubListView(current_category);
    } else if (current_category === category_num - 1) {
      changeCategory(current_category, 0);
      drawSubListView(current_category);
    }
  }
}

function countUpInterval() {
  return window.setInterval(() => countUp(), PROGRESS_TIME);
}

function runSubProgress() {
  progress_interval = countUpInterval();
}

function clearSubProgress() {
  clearInterval(progress_interval);
}

/***** 프로그레스바 카테고리 이동 함수 *****/
function changeCategory(idx_1, idx_2) {
  document
    .querySelectorAll(".sub-list-nav .progress-item")
    [idx_1].classList.remove("progress-bar");
  document.getElementsByClassName("count")[idx_1].style.display = "none";

  document
    .querySelectorAll(".sub-list-nav .progress-item")
    [idx_2].classList.add("progress-bar");
  document.getElementsByClassName("count")[idx_2].style.display = "block";

  current_category = idx_2;
}

function findCategoryIdx(element) {
  const sub_categories = document.querySelectorAll(".sub-list-nav li");
  for (let i = 0; i < sub_categories.length; i++) {
    if (element === sub_categories[i]) {
      clicked_idx = i;
    }
  }
}

function initializeSubProgress() {
  current_category = 0;
}

/***** 프로그레스바 카테고리 누르면 이동 *****/
const categories = document.querySelector(".sub-list-nav");
categories.addEventListener("click", async (e) => {
  const press_name = e.target.innerText.slice(0, -2);
  presses = await getPressObj();
  const filtered_press = await Promise.all(
    presses.filter((item) => item.name === press_name)
  );
  const press = filtered_press[0];
  const press_id = press.id;
  const clicked_category = document.querySelector(`.press${press_id}`);
  findCategoryIdx(clicked_category);
  clearSubProgress();
  changeCategory(current_category, clicked_idx);
  runSubProgress();
  drawSubListView(current_category);
});

const unsub_btn = document.querySelector(".unsub-btn");
unsub_btn.addEventListener("click", async (e) => {
  const target_innertext = document.querySelector(
    ".sub-list-nav .progress-bar"
  ).innerText;
  const press_name = target_innertext.slice(0, -2);
  presses = await getPressObj();
  const filtered_press = await Promise.all(
    presses.filter((item) => item.name === press_name)
  );
  let sub_press = filtered_press[0];
  sub_press = removePressFromSubList(sub_press);
  setState(subscribedPress, sub_press);
  if (getState(subscribedPress).length !== 0) {
    clearSubProgress();
    initializeSubProgress();
    appendSubCategory();
    runSubProgress();
  } else {
    showAlertForNonSub();
  }
});

export {
  runSubProgress,
  clearSubProgress,
  reloadProgressAnimation,
  initializeSubProgress,
};

import { drawSubListView } from "./subListNews.js";
import { subscribeState } from "./store/subscribeState.js";

const PROGRESS_TIME = 2000;
let category_num = 0;
let current_category = 0;
let clicked_idx = 0;
let progress_interval;

function getSubPressLength() {
  category_num = subscribeState.getSubscribeState().length;
}

//제자리에서 프로그레스바 다시 차오르게 해주는 함수
function reloadProgressAnimation() {
  const currentCategory = document.querySelector(".sub-list-nav .progress-bar");
  currentCategory.classList.remove("progress-bar");
  void currentCategory.offsetWidth;
  currentCategory.classList.add("progress-bar");
}

function clearAndReload() {
  clearProgress();
  reloadProgressAnimation();
}

function countUp() {
  getSubPressLength();
  if (category_num === 1) {
    console.log("Category num is 1");
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

function clearProgress() {
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

/***** 프로그레스바 카테고리 누르면 이동 *****/
const categories = document.querySelector(".sub-list-nav");
categories.addEventListener("click", (e) => {
  const press_name = e.target.innerText.slice(0, -2);
  const press = subscribeState.getSubInfoByName(press_name)[0];
  const press_id = press[0];
  const clicked_category = document.querySelector(`.press${press_id}`);
  findCategoryIdx(clicked_category);
  clearProgress();
  changeCategory(current_category, clicked_idx);
  runSubProgress();
  drawSubListView(current_category);
});

export { runSubProgress, clearProgress, reloadProgressAnimation };

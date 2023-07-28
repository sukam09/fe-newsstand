import { getNewsContent } from "../api/api.js";
import { drawListView } from "./listNews.js";
import { setDisplay } from "../util/utils.js";

const CATEGORY_NUM = 7;
const PROGRESS_TIME = 2000;
let current_category = 0;
let up_count = 1;
let total_count = 0;
let progress_interval;
let categoryList = null;

async function getTabNum(current_category) {
  categoryList = await getNewsContent();
  const tabNum = categoryList[current_category].tabs;
  return tabNum;
}

function checkTotalCount() {
  total_count = parseInt(
    document.querySelectorAll(".progress-bar span")[2].innerHTML
  );
}

function putUpCountToNowCount() {
  document.querySelector(".progress-bar .now-count").innerHTML =
    up_count.toString();
}

//카운트 올릴 시 프로그레스바 다시 차오르게 해주는 함수
function reloadProgressAnimation() {
  const currentCategory = document.querySelector(".progress-bar");
  currentCategory.classList.remove("progress-bar");
  void currentCategory.offsetWidth;
  currentCategory.classList.add("progress-bar");
}

//마지막 카테고리인지 아닌지 판별
function isLastCategory() {
  return current_category === CATEGORY_NUM - 1;
}

function isNotLastCategory() {
  return current_category < CATEGORY_NUM - 1 && current_category >= 0;
}

function clearAndReload() {
  clearProgress();
  putUpCountToNowCount();
  reloadProgressAnimation();
}

/***** 카운트 올리고, total_count에 도달하면 다음 카테고리로 넘어가는 함수 *****/
function countUpInSameCategory() {
  document.querySelector(".progress-bar .now-count").innerHTML =
    up_count.toString();
  reloadProgressAnimation();
  drawListView(current_category, up_count - 1);
  up_count++;
}

function countUp() {
  checkTotalCount();
  if (up_count > total_count) {
    document.querySelector(".progress-bar .now-count").innerHTML = "1";
    if (current_category === CATEGORY_NUM - 1) {
      changeCategory(current_category, 0);
      drawListView(current_category, 0);
      up_count = 1;
    } else if (isNotLastCategory) {
      changeCategory(current_category, current_category + 1);
      drawListView(current_category, 0);
      up_count = 2;
    }
  } else {
    if (current_category === 0 && up_count === 1) {
      up_count = 2;
    }
    countUpInSameCategory();
  }
}

function countUpInterval() {
  return window.setInterval(() => countUp(), PROGRESS_TIME);
}

function runProgress() {
  progress_interval = countUpInterval();
}

function clearProgress() {
  clearInterval(progress_interval);
}

/***** 프로그레스바 카테고리 이동 함수 *****/
function changeCategory(idx_1, idx_2) {
  document
    .getElementsByClassName("progress-item")
    [idx_1].classList.remove("progress-bar");
  document.getElementsByClassName("count")[idx_1].style.display = "none";

  document
    .getElementsByClassName("progress-item")
    [idx_2].classList.add("progress-bar");
  document.getElementsByClassName("count")[idx_2].style.display = "block";

  current_category = idx_2;
}

/***** 프로그레스바 카테고리 누르면 이동 *****/
const categories = document.querySelectorAll(".progress-item");
for (let i = 0; i < categories.length; i++) {
  categories[i].addEventListener("click", () => {
    clearProgress();
    changeCategory(current_category, i);
    up_count = 2;
    runProgress();
    drawListView(i, 0);
  });
}

/***** list 넘기는 화살표 관련 함수 *****/
/* 다음으로 넘기기 */
const list_next = document.getElementById("list-next");
list_next.addEventListener("click", () => {
  up_count = parseInt(
    document.querySelector(".progress-bar .now-count").innerHTML
  );
  checkTotalCount();
  up_count++;
  if (up_count <= total_count) {
    clearAndReload();
    up_count++;
    runProgress();
    drawListView(current_category, up_count - 2);
  } else {
    up_count = 1;
    clearAndReload();
    if (current_category === CATEGORY_NUM - 1) {
      changeCategory(current_category, 0);
      drawListView(current_category, 0);
    } else if (isNotLastCategory) {
      changeCategory(current_category, current_category + 1);
      drawListView(current_category, 0);
    }
    up_count = 2;
    runProgress();
  }
});

/* 앞으로 넘기기 */
const list_prev = document.getElementById("list-prev");
list_prev.addEventListener("click", async () => {
  up_count = parseInt(
    document.querySelector(".progress-bar .now-count").innerHTML
  );
  up_count--;
  if (up_count >= 1) {
    clearAndReload();
    drawListView(current_category, up_count - 1);
  } else if (up_count === 0) {
    clearProgress();
    reloadProgressAnimation();
    if (current_category > 0) {
      changeCategory(current_category, current_category - 1);
    } else if (current_category === 0) {
      changeCategory(current_category, CATEGORY_NUM - 1);
    }
    const tab_num = await getTabNum(current_category);
    up_count = tab_num;
    putUpCountToNowCount();
    checkTotalCount();
    drawListView(current_category, total_count - 1);
  }
  up_count++;
  runProgress();
});

function initializeProgress() {
  current_category = 0;
  up_count = 2;
  document.querySelector(".now-count").innerHTML = "1";
  setDisplay(".count", "block");
}

export {
  runProgress,
  clearProgress,
  initializeProgress,
  reloadProgressAnimation,
  CATEGORY_NUM,
};

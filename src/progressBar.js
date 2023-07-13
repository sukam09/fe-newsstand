import { categoryList } from "../data/NewsContents.js";
import { drawListView } from "./listNews.js";
import { countDisplayNone } from "./initialDisplay.js";

const CATEGORY_NUM = 7;
const PROGRESS_TIME = 20000;
let current_page = 0;
let up_count = 2;
let total_count = 0;
let progress_interval;

function checkTotalCount() {
  total_count = parseInt(
    document.querySelectorAll(".progress-bar span")[2].innerHTML
  );
}

/***** 카테고리별 탭 넘버 append *****/
function appendCategoryTabNum() {
  for (let i = 0; i < CATEGORY_NUM; i++) {
    const tab = document.querySelectorAll(".progress-item .count");
    const $span = document.createElement("span");
    $span.innerHTML = `${categoryList[i].tabs}`;
    tab[i].append($span);
  }
}

/***** 카테고리 count 올리기 *****/
//카운트 올릴 시 프로그레스바 다시 차오르게 해주는 함수
function reloadProgressAnimation() {
  const currentCategory = document.querySelector(".progress-bar");
  currentCategory.classList.remove("progress-bar");
  void currentCategory.offsetWidth;
  currentCategory.classList.add("progress-bar");
}

//카운트 올리고, total_count에 도달하면 다음 카테고리로 넘어가는 함수
function countUp() {
  checkTotalCount();
  console.log(up_count);
  if (up_count > total_count) {
    console.log("yes");
    up_count = 2;
    document.querySelector(".progress-bar .now-count").innerHTML = "1";
    if (current_page <= CATEGORY_NUM - 1 && current_page >= 0) {
      if (current_page === CATEGORY_NUM - 1) {
        changeCategory(current_page, 0);
        drawListView(0, 0);
        current_page = 0;
        up_count = 2;
      } else {
        changeCategory(current_page, current_page + 1);
        drawListView(current_page + 1, 0);
        current_page++;
      }
    }
  } else {
    console.log("in");
    document.querySelector(".progress-bar .now-count").innerHTML =
      up_count.toString();
    reloadProgressAnimation();
    drawListView(current_page, up_count - 1);
    up_count++;
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

function setNowCount(increment) {
  let now_count = document.querySelector(".progress-bar .now-count").innerHTML;
  if (now_count == 1) {
    up_count = 2;
    document.querySelector(".progress-bar .now-count").innerHTML = up_count;
  } else {
    up_count = up_count + increment;
    document.querySelector(".progress-bar .now-count").innerHTML = up_count;
  }
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
}

/***** 프로그레스바 카테고리 누르면 이동 *****/
const categories = document.querySelectorAll(".progress-item");
for (let i = 0; i < categories.length; i++) {
  categories[i].addEventListener("click", () => {
    countDisplayNone();
    const counts = document.querySelectorAll(".count");
    counts[i].style.display = "block";
    clearProgress();
    document.querySelector(".progress-bar .now-count").innerHTML = "1";
    document.querySelector(".progress-bar").classList.remove("progress-bar");
    categories[i].classList.add("progress-bar");
    current_page = i;
    up_count = 2;
    runProgress();
    drawListView(i, 0);
  });
}

/***** list 넘기는 화살표 관련 함수 *****/
/* 다음으로 넘기기 */
const list_next = document.getElementById("list-next");
list_next.addEventListener("click", () => {
  const current_page = parseInt(
    document.querySelector(".progress-bar .now-count").innerHTML
  );
  checkTotalCount();
  up_count++;
  if (up_count < total_count) {
    reloadProgressAnimation();
    clearProgress();
    runProgress();
    drawListView(0, current_page - 1);
  } else {
    reloadProgressAnimation();
    clearProgress();
    up_count = 1;
    runProgress();
    drawListView(0, 0);
  }
});

/* 앞으로 넘기기 */
const list_prev = document.getElementById("list-prev");
list_prev.addEventListener("click", () => {
  const current_page = parseInt(
    document.querySelector(".progress-bar .now-count").innerHTML
  );
  up_count--;
  reloadProgressAnimation();
  clearProgress();
  //runProgress();
  drawListView(0, current_page - 1);
});

let interval1;
function movingProgress() {
  while (current_page <= CATEGORY_NUM - 1 && current_page >= 0) {
    interval1 = setInterval(function () {
      if (current_page == CATEGORY_NUM - 1) {
        changeCategory(current_page, 0);
        current_page = 0;
      } else {
        changeCategory(current_page, current_page + 1);
        current_page++;
      }
    }, PROGRESS_TIME);
    break;
  }
}

function initializeProgress() {
  current_page = 0;
  up_count = 2;
  document.querySelector(".now-count").innerHTML = "1";
  document.getElementsByClassName("count")[0].style.display = "block";
}

export {
  runProgress,
  clearProgress,
  initializeProgress,
  reloadProgressAnimation,
  setNowCount,
  appendCategoryTabNum,
  CATEGORY_NUM,
};

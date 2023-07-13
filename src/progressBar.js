const CATEGORY_NUM = 7;
const PROGRESS_TIME = 1000;
let category_clicked = false;
let idx = 0;

let total_count = 5;
let up_count = 2;
let progress_interval;

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
  if (up_count > total_count) {
    up_count = 2;
    document.querySelector(".progress-bar .now-count").innerHTML = "1";
    if (idx <= CATEGORY_NUM - 1 && idx >= 0) {
      if (idx == CATEGORY_NUM - 1) {
        changeCategory(idx, 0);
        idx = 0;
        up_count = 2;
      } else {
        changeCategory(idx, idx + 1);
        idx++;
      }
    }
  } else {
    document.querySelector(".progress-bar .now-count").innerHTML =
      up_count.toString();
    reloadProgressAnimation();
    up_count++;
  }
}

function countUpInterval() {
  return window.setInterval(() => countUp(), PROGRESS_TIME);
}

function runProgress() {
  progress_interval = countUpInterval();
}

/***** 프로그레스바 이동 함수 *****/
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
    category_clicked = true;

    const counts = document.querySelectorAll(".count");
    counts.forEach((count) => {
      count.style.display = "none";
    });
    counts[i].style.display = "block";

    document.querySelector(".progress-bar").classList.remove("progress-bar");
    categories[i].classList.add("progress-bar");
  });
}

let interval1;
function movingProgress() {
  while (idx <= CATEGORY_NUM - 1 && idx >= 0) {
    interval1 = setInterval(function () {
      if (idx == CATEGORY_NUM - 1) {
        changeCategory(idx, 0);
        idx = 0;
      } else {
        changeCategory(idx, idx + 1);
        idx++;
      }
    }, PROGRESS_TIME);
    break;
  }
}

function initializeProgress() {
  idx = 0;
  up_count = 2;
  document.querySelector(".now-count").innerHTML = "1";
  document.getElementsByClassName("count")[0].style.display = "block";
}

export { runProgress, initializeProgress, progress_interval };

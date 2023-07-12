const CATEGORY_NUM = 7;
const PROGRESS_TIME = 20000;
let category_clicked = false;
let idx = 0;

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

let progress_interval;
function movingProgress() {
  while (idx <= CATEGORY_NUM - 1 && idx >= 0) {
    progress_interval = setInterval(function () {
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
  document.getElementsByClassName("count")[0].style.display = "block";
}

export { movingProgress, progress_interval, initializeProgress };

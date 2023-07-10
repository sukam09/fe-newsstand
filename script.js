const PRESS_NUM_IN_GRID = 24;
const TOTAL_PRESS_NUM = 96;
const CATEGORY_NUM = 7;
let grid_page_count = 0;
let grid_view_selected = true;
let is_light_mode = true;
let category_clicked = false;
let idx = 0;

/***** 언론사 사진 셔플 *****/
const presses = Array.from(
  { length: TOTAL_PRESS_NUM },
  (_, idx) => `${idx + 1}.png`
);
const shuffle = () => Math.random() - 0.5;
let shuffled_presses = [...presses].sort(shuffle);

/***** 초기 화면 *****/
function initDisplayNone() {
  document.querySelector(".list-selected").style.display = "none";
  document.querySelector(".press-list-section").style.display = "none";
  document.getElementById("grid-prev").style.display = "none";
  document.querySelectorAll(".count").forEach((count) => {
    count.style.display = "none";
  });
  document.querySelector(".count").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  initDisplayNone();
  changeToGrid();
  while (idx <= CATEGORY_NUM - 1 && idx >= 0) {
    setInterval(function () {
      if (idx == CATEGORY_NUM - 1) {
        movingProgress(idx, 0);
        idx = 0;
      } else {
        movingProgress(idx, idx + 1);
        idx++;
      }
    }, 20000);
    break;
  }
  const slice_shuffled_presses = shuffled_presses.slice(0, PRESS_NUM_IN_GRID);
  slice_shuffled_presses.forEach((press) => {
    appendPressInGrid(press);
  });
});

/***** grid형 <-> list형 뷰 변경 *****/
//grid형 보기로 바꾸기
function changeToGrid() {
  document.getElementsByClassName("list-selected")[0].style.display = "none";
  document.getElementsByClassName("grid-selected")[0].style.display = "block";
  document.getElementsByClassName("press-list-section")[0].style.display =
    "none";
  document.getElementsByClassName("press-grid")[0].style.display = "block";
  grid_view_selected = true;
}

//list형 보기로 바꾸기
function changeToList() {
  document.getElementsByClassName("grid-selected")[0].style.display = "none";
  document.getElementsByClassName("list-selected")[0].style.display = "block";
  document.getElementsByClassName("press-list-section")[0].style.display =
    "block";
  document.getElementsByClassName("press-grid")[0].style.display = "none";
  grid_view_selected = false;
}

const grid_symbol = document.querySelectorAll(".grid-symbol");
grid_symbol.forEach((symbol) => {
  symbol.addEventListener("click", () => {
    if (!grid_view_selected) {
      // grid 상태 아니면
      changeToGrid();
      grid_view_selected = true;
    }
  });
});

const list_symbol = document.querySelectorAll(".list-symbol");
list_symbol.forEach((symbol) => {
  symbol.addEventListener("click", () => {
    if (grid_view_selected) {
      //grid 상태라면
      changeToList();
      grid_view_selected = false;
    }
  });
});

/***** grid에 언론사 & 구독 이미지 추가 *****/
function appendPressInGrid(press) {
  //언론사 이미지 추가
  const $image = document.createElement("img");
  $image.src = is_light_mode
    ? `./icons/press_logo/${press}`
    : `./icons/darkmode_logo/${press}`;
  $image.classList.add("original");

  //구독하기 이미지 추가
  const $sub = document.createElement("img");
  $sub.src = `./icons/Button.svg`;
  $sub.classList.add("sub");

  //ul에 li 추가
  const $list = document.createElement("li");
  $list.classList.add("press-item");
  $list.append($image, $sub);
  document.getElementById("press-list").appendChild($list);
}

/***** grid 넘기는 화살표 표시 관련 함수 *****/
/* 뒤로 넘기기 */
const grid_next = document.getElementById("grid-next");
grid_next.addEventListener("click", () => {
  if (grid_page_count + 1 === TOTAL_PRESS_NUM / PRESS_NUM_IN_GRID - 1) {
    grid_next.style.display = "none";
  }
  if (grid_page_count + 1 < TOTAL_PRESS_NUM / PRESS_NUM_IN_GRID) {
    document.getElementById("grid-prev").style.display = "block";
    document.getElementById("press-list").innerHTML = "";
    grid_page_count += 1;
    const slice_shuffled_presses = shuffled_presses.slice(
      grid_page_count * 24,
      grid_page_count * 24 + 24
    );
    slice_shuffled_presses.forEach((press) => {
      appendPressInGrid(press);
    });
  }
});

/* 앞으로 넘기기 */
const grid_prev = document.getElementById("grid-prev");
grid_prev.addEventListener("click", () => {
  if (grid_page_count - 1 === 0) {
    grid_prev.style.display = "none";
  }
  if (grid_page_count - 1 >= 0) {
    document.getElementById("grid-next").style.display = "block";
    document.getElementById("press-list").innerHTML = "";
    grid_page_count -= 1;
    const slice_shuffled_presses = shuffled_presses.slice(
      grid_page_count * 24,
      grid_page_count * 24 + 24
    );
    slice_shuffled_presses.forEach((press) => {
      appendPressInGrid(press);
    });
  }
});

/***** 프로그레스바 이동 함수 *****/
function movingProgress(idx_1, idx_2) {
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
categories.forEach((category) => {
  category.addEventListener("click", () => {
    category_clicked = true;
    document.querySelector(".progress-bar").classList.remove("progress-bar");
    category.classList.add("progress-bar");
  });
});

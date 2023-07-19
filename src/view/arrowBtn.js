import { PATH, MODE, GLOBAL, CONSTANT } from "../model/variable.js";

function initArrowBtn(parentNode) {
  const dom = `
  <button class="left-btn">
    <img src="${PATH.LEFT_BTN}" />
  </button>
  <button class="right-btn">
    <img src="${PATH.RIGHT_BTN}" />
  </button>`;

  parentNode.innerHTML += dom;
}

function drawLeftArrowBtn() {
  const leftBtn = document.querySelector(".left-btn");

  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL && GLOBAL.GRID_CURRENT_PAGE === 0) {
    leftBtn.style.display = "none";
  } else if (GLOBAL.CURRENT_MODE === MODE.GRID_SUB && GLOBAL.GRID_CURRENT_PAGE === 0) {
    leftBtn.style.display = "none";
  } else {
    leftBtn.style.display = "block";
  }
}

GLOBAL;

function drawRightArrowBtn() {
  const rightBtn = document.querySelector(".right-btn");

  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL && GLOBAL.GRID_CURRENT_PAGE === CONSTANT.GRID_MAX_PAGE) {
    rightBtn.style.display = "none";
  } else if (GLOBAL.CURRENT_MODE === MODE.GRID_SUB && GLOBAL.GRID_CURRENT_PAGE === Math.floor(GLOBAL.SUB_NEWS_NUM / CONSTANT.GRID_NEWS_NUM)) {
    rightBtn.style.display = "none";
  } else {
    rightBtn.style.display = "block";
  }
}

export { initArrowBtn, drawLeftArrowBtn, drawRightArrowBtn };

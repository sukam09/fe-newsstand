import { PATH, MODE, CONSTANT } from "../model/variable.js";
import { getState, subscribe } from "../controller/observer.js";
import { toggleDarkMode, gridCurrentPage, listCurrentPage, currentMode, subscribeNewsNum } from "../model/store.js";

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
  const curMode = getState(currentMode);
  const leftBtn = document.querySelector(".left-btn");

  if (curMode === MODE.GRID_ALL && getState(gridCurrentPage) === 0) {
    leftBtn.style.display = "none";
  } else if (curMode === MODE.GRID_SUB && getState(gridCurrentPage) === 0) {
    leftBtn.style.display = "none";
  } else if (curMode === MODE.LIST_SUB && getState(subscribeNewsNum) === 1) {
    leftBtn.style.display = "none";
  } else {
    leftBtn.style.display = "block";
  }
}

function drawRightArrowBtn() {
  const curMode = getState(currentMode);
  const rightBtn = document.querySelector(".right-btn");

  if (curMode === MODE.GRID_ALL && getState(gridCurrentPage) === CONSTANT.GRID_MAX_PAGE) {
    rightBtn.style.display = "none";
  } else if (curMode === MODE.GRID_SUB && getState(gridCurrentPage) === Math.floor((getState(subscribeNewsNum) - 1) / CONSTANT.GRID_NEWS_NUM)) {
    rightBtn.style.display = "none";
  } else if (curMode === MODE.LIST_SUB && getState(subscribeNewsNum) === 1) {
    rightBtn.style.display = "none";
  } else {
    rightBtn.style.display = "block";
  }
}

subscribe(gridCurrentPage, drawLeftArrowBtn);
subscribe(listCurrentPage, drawLeftArrowBtn);
subscribe(currentMode, drawLeftArrowBtn);
subscribe(subscribeNewsNum, drawRightArrowBtn);
subscribe(toggleDarkMode, drawLeftArrowBtn);
subscribe(gridCurrentPage, drawRightArrowBtn);
subscribe(listCurrentPage, drawRightArrowBtn);
subscribe(currentMode, drawRightArrowBtn);
subscribe(subscribeNewsNum, drawLeftArrowBtn);
subscribe(toggleDarkMode, drawRightArrowBtn);

export { initArrowBtn, drawLeftArrowBtn, drawRightArrowBtn };

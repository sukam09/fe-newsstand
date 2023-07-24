import { PATH, MODE, GLOBAL, CONSTANT } from "../model/variable.js";
import { subscribe } from "../controller/observer.js";
import { moveGrid, moveList, toggleView, toggleSubscription, toggleDarkMode } from "../model/store.js";

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
  } else if (GLOBAL.CURRENT_MODE === MODE.LIST_SUB && GLOBAL.SUBSCRIBE_NEWS_NUM === 1) {
    leftBtn.style.display = "none";
  } else {
    leftBtn.style.display = "block";
  }
}

function drawRightArrowBtn() {
  const rightBtn = document.querySelector(".right-btn");

  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL && GLOBAL.GRID_CURRENT_PAGE === CONSTANT.GRID_MAX_PAGE) {
    rightBtn.style.display = "none";
  } else if (GLOBAL.CURRENT_MODE === MODE.GRID_SUB && GLOBAL.GRID_CURRENT_PAGE === Math.floor((GLOBAL.SUBSCRIBE_NEWS_NUM - 1) / CONSTANT.GRID_NEWS_NUM)) {
    rightBtn.style.display = "none";
  } else if (GLOBAL.CURRENT_MODE === MODE.LIST_SUB && GLOBAL.SUBSCRIBE_NEWS_NUM === 1) {
    rightBtn.style.display = "none";
  } else {
    rightBtn.style.display = "block";
  }
}

subscribe(moveGrid, drawLeftArrowBtn);
subscribe(moveList, drawLeftArrowBtn);
subscribe(toggleView, drawLeftArrowBtn);
subscribe(toggleSubscription, drawLeftArrowBtn);
subscribe(toggleDarkMode, drawLeftArrowBtn);
subscribe(moveGrid, drawRightArrowBtn);
subscribe(moveList, drawRightArrowBtn);
subscribe(toggleView, drawRightArrowBtn);
subscribe(toggleSubscription, drawRightArrowBtn);
subscribe(toggleDarkMode, drawRightArrowBtn);

export { initArrowBtn, drawLeftArrowBtn, drawRightArrowBtn };

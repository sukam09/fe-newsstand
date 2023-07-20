import { changeState } from "./mainController.js";
import { updateCategory } from "./fieldTabController.js";
import { STATE, MODE, GLOBAL } from "../model/variable.js";

function initArrowBtnEvnet() {
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  leftBtn.addEventListener("click", () => moveLeft());
  rightBtn.addEventListener("click", () => moveRight());
}

function moveLeft() {
  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    GLOBAL.GRID_CURRENT_PAGE--;
    changeState(STATE.MOVE_GRID_LEFT);
  } else {
    GLOBAL.LIST_CURRENT_PAGE = GLOBAL.LIST_CURRENT_PAGE === 0 ? GLOBAL.TOTAL_NEWS_NUM - 1 : LIST_CURRENT_PAGE - 1;
    updateCategory();
    changeState(STATE.MOVE_LIST_LEFT);
  }
}

function moveRight() {
  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    GLOBAL.GRID_CURRENT_PAGE++;
    changeState(STATE.MOVE_GRID_RIGHT);
  } else {
    GLOBAL.LIST_CURRENT_PAGE = (GLOBAL.LIST_CURRENT_PAGE + 1) % GLOBAL.TOTAL_NEWS_NUM;
    updateCategory();
    changeState(STATE.MOVE_LIST_LEFT);
  }
}

export { initArrowBtnEvnet };

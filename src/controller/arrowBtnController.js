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
    const listModeMaxPage = GLOBAL.CURRENT_MODE === MODE.LIST_ALL ? GLOBAL.TOTAL_NEWS_NUM : GLOBAL.SUBSCRIBE_NEWS_NUM;
    GLOBAL.LIST_CURRENT_PAGE = GLOBAL.LIST_CURRENT_PAGE === 0 ? listModeMaxPage - 1 : GLOBAL.LIST_CURRENT_PAGE - 1;
    updateCategory();
    changeState(STATE.MOVE_LIST_LEFT);
  }
}

function moveRight() {
  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    GLOBAL.GRID_CURRENT_PAGE++;
    changeState(STATE.MOVE_GRID_RIGHT);
  } else {
    const listModeMaxPage = GLOBAL.CURRENT_MODE === MODE.LIST_ALL ? GLOBAL.TOTAL_NEWS_NUM : GLOBAL.SUBSCRIBE_NEWS_NUM;
    GLOBAL.LIST_CURRENT_PAGE = (GLOBAL.LIST_CURRENT_PAGE + 1) % listModeMaxPage;
    updateCategory();
    changeState(STATE.MOVE_LIST_RIGHT);
  }
}

export { initArrowBtnEvnet, moveRight };

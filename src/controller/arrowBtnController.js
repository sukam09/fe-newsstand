import { changeState } from "./mainController.js";
import { STATE, MODE, GLOBAL } from "../model/variable.js";

function initArrowBtnEvnet() {
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  leftBtn.addEventListener("click", () => moveLeft());
  rightBtn.addEventListener("click", () => moveRight());
  return 0;
}

function moveLeft() {
  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    GLOBAL.GRID_CURRENT_PAGE--;
    changeState(STATE.GRID_MOVE_LEFT);
  }
}

function moveRight() {
  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    GLOBAL.GRID_CURRENT_PAGE++;
    changeState(STATE.GRID_MOVE_RIGHT);
  }
}

export { initArrowBtnEvnet };

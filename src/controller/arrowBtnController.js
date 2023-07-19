import { changeState } from "./mainController.js";
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
  }
}

function moveRight() {
  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    GLOBAL.GRID_CURRENT_PAGE++;
    changeState(STATE.MOVE_GRID_RIGHT);
  }
}

export { initArrowBtnEvnet };

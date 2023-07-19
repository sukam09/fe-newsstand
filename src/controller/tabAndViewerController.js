import { changeState } from "./mainController.js";
import { STATE, CATEGORY, MODE, GLOBAL } from "../model/variable.js";

function initTabAndViewerEvent() {
  const allPressBtn = document.querySelector(".all-press-btn");
  const subPressBtn = document.querySelector(".sub-press-btn");
  const gridModeBtn = document.querySelector(".grid-btn");
  const listModeBtn = document.querySelector(".list-btn");

  allPressBtn.addEventListener("click", () => moveAllPress());
  subPressBtn.addEventListener("click", () => moveSubPress());
  gridModeBtn.addEventListener("click", () => moveGridMode());
  listModeBtn.addEventListener("click", () => moveListMode());
}

function moveAllPress() {
  resetPage();

  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    GLOBAL.CURRENT_MODE = MODE.GRID_ALL;
    changeState(STATE.MOVE_GRID_ALL);
  } else if (GLOBAL.CURRENT_MODE === MODE.LIST_ALL || GLOBAL.CURRENT_MODE === MODE.LIST_SUB) {
    GLOBAL.CURRENT_MODE = MODE.LIST_ALL;
    changeState(STATE.MOVE_LIST_ALL);
  }
}

function moveSubPress() {
  if (GLOBAL.SUBSCRIBE_NEWS_NUM === 0) return;

  resetPage();

  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    GLOBAL.CURRENT_MODE = MODE.GRID_SUB;
    changeState(STATE.MOVE_GRID_SUB);
  } else if (GLOBAL.CURRENT_MODE === MODE.LIST_ALL || GLOBAL.CURRENT_MODE === MODE.LIST_SUB) {
    GLOBAL.CURRENT_MODE = MODE.LIST_SUB;
    changeState(STATE.MOVE_LIST_SUB);
  }
}

function moveGridMode() {
  resetPage();

  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.LIST_ALL) {
    GLOBAL.CURRENT_MODE = MODE.GRID_ALL;
    changeState(STATE.MOVE_GRID_ALL);
  } else if (GLOBAL.CURRENT_MODE === MODE.GRID_SUB || GLOBAL.CURRENT_MODE === MODE.LIST_SUB) {
    GLOBAL.CURRENT_MODE = MODE.GRID_SUB;
    changeState(STATE.MOVE_GRID_SUB);
  }
}

function moveListMode() {
  resetPage();

  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.LIST_ALL) {
    GLOBAL.CURRENT_MODE = MODE.LIST_ALL;
    changeState(STATE.MOVE_LIST_ALL);
  } else if (GLOBAL.CURRENT_MODE === MODE.GRID_SUB || GLOBAL.CURRENT_MODE === MODE.LIST_SUB) {
    GLOBAL.CURRENT_MODE = MODE.LIST_SUB;
    changeState(STATE.MOVE_LIST_SUB);
  }
}

function resetPage() {
  GLOBAL.GRID_CURRENT_PAGE = 0;
  GLOBAL.LIST_CURRENT_PAGE = 0;
  GLOBAL.LIST_CURRENT_CATEGORY = CATEGORY.ECONOMY;
}

export { initTabAndViewerEvent };

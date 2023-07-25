import { CATEGORY, MODE, GLOBAL } from "../model/variable.js";
import { getState, setState } from "./observer.js";
import { currentMode, gridCurrentPage, listCurrentPage, subscribeNewsNum } from "../model/store.js";

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
  setState(gridCurrentPage, 0);
  setState(currentMode, MODE.GRID_ALL);
}

function moveSubPress() {
  if (getState(subscribeNewsNum) === 0) return;

  setState(listCurrentPage, 0);
  GLOBAL.LIST_CURRENT_CATEGORY = CATEGORY.ECONOMY;
  setState(currentMode, MODE.LIST_SUB);
}

function moveGridMode() {
  const curMode = getState(currentMode);

  if (curMode === MODE.GRID_ALL || curMode === MODE.LIST_ALL) {
    setState(currentMode, MODE.GRID_ALL);
  } else {
    setState(currentMode, MODE.GRID_SUB);
  }
  setState(gridCurrentPage, 0);
}

function moveListMode() {
  const curMode = getState(currentMode);

  if (curMode === MODE.GRID_ALL || curMode === MODE.LIST_ALL) {
    setState(currentMode, MODE.LIST_ALL);
  } else {
    setState(currentMode, MODE.LIST_SUB);
  }
  setState(listCurrentPage, 0);
}

export { initTabAndViewerEvent, moveListMode };

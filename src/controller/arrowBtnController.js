import { updateCategory } from "./fieldTabController.js";
import { MODE, GLOBAL } from "../model/variable.js";
import { getState, setState } from "./observer.js";
import { currentMode, gridCurrentPage, listCurrentPage, subscribeNewsNum } from "../model/store.js";

function initArrowBtnEvnet() {
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  leftBtn.addEventListener("click", () => moveLeft());
  rightBtn.addEventListener("click", () => moveRight());
}

function moveLeft() {
  const curMode = getState(currentMode);

  if (curMode === MODE.GRID_ALL || curMode === MODE.GRID_SUB) {
    setState(gridCurrentPage, getState(gridCurrentPage) - 1);
  } else {
    const listModeMaxPage = curMode === MODE.LIST_ALL ? GLOBAL.TOTAL_NEWS_NUM : getState(subscribeNewsNum);
    const nextListPage = getState(listCurrentPage) === 0 ? listModeMaxPage - 1 : getState(listCurrentPage) - 1;
    updateCategory(nextListPage);
    setState(listCurrentPage, nextListPage);
  }
}

function moveRight() {
  const curMode = getState(currentMode);

  if (curMode === MODE.GRID_ALL || curMode === MODE.GRID_SUB) {
    setState(gridCurrentPage, getState(gridCurrentPage) + 1);
  } else {
    const listModeMaxPage = curMode === MODE.LIST_ALL ? GLOBAL.TOTAL_NEWS_NUM : getState(subscribeNewsNum);
    const nextListPage = (getState(listCurrentPage) + 1) % listModeMaxPage;
    updateCategory(nextListPage);
    setState(listCurrentPage, nextListPage);
  }
}

export { initArrowBtnEvnet, moveLeft, moveRight };

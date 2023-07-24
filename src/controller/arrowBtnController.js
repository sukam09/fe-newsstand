import { updateCategory } from "./fieldTabController.js";
import { MODE, GLOBAL } from "../model/variable.js";
import { setState } from "./observer.js";
import { moveGrid, moveList } from "../model/store.js";

function initArrowBtnEvnet() {
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  leftBtn.addEventListener("click", () => moveLeft());
  rightBtn.addEventListener("click", () => moveRight());
}

function moveLeft() {
  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    GLOBAL.GRID_CURRENT_PAGE--;
    setState(moveGrid, true);
  } else {
    const listModeMaxPage = GLOBAL.CURRENT_MODE === MODE.LIST_ALL ? GLOBAL.TOTAL_NEWS_NUM : GLOBAL.SUBSCRIBE_NEWS_NUM;
    GLOBAL.LIST_CURRENT_PAGE = GLOBAL.LIST_CURRENT_PAGE === 0 ? listModeMaxPage - 1 : GLOBAL.LIST_CURRENT_PAGE - 1;
    updateCategory();
    setState(moveList, true);
  }
}

function moveRight() {
  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    GLOBAL.GRID_CURRENT_PAGE++;
    setState(moveGrid, true);
  } else {
    const listModeMaxPage = GLOBAL.CURRENT_MODE === MODE.LIST_ALL ? GLOBAL.TOTAL_NEWS_NUM : GLOBAL.SUBSCRIBE_NEWS_NUM;
    GLOBAL.LIST_CURRENT_PAGE = (GLOBAL.LIST_CURRENT_PAGE + 1) % listModeMaxPage;
    updateCategory();
    setState(moveList, true);
  }
}

export { initArrowBtnEvnet, moveLeft, moveRight };

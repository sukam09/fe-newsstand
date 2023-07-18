import { renderCardList } from "./renderCardList.js";
import { renderGrid } from "./renderGrid.js";
import { clickCardListImage, clickGridImage } from "../chooseMode.js";

const rightAsideButton = document.getElementById("aside-right");
const leftAsideButton = document.getElementById("aside-left");
const gridMain = document.getElementById("main-grid");
const listMain = document.getElementById("main-list");

function renderMain(isGrid) {
  if (isGrid) renderGrid();
  else renderCardList();
  clickCardListImage();
  clickGridImage();
}

export { renderMain, leftAsideButton, rightAsideButton, gridMain, listMain };

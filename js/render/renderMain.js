import { renderCardList } from "./renderCardList.js";
import { renderGrid } from "./renderGrid.js";
import { clickCardListImage, clickGridImage } from "../clickGridCardList.js";

const rightAsideButton = document.getElementById("aside-right");
const leftAsideButton = document.getElementById("aside-left");
const gridMain = document.getElementById("main-grid");
const listMain = document.getElementById("main-list");

function renderAll(isGrid) {
  if (isGrid) renderGrid();
  else renderCardList();
  clickCardListImage();
  clickGridImage();
}

function renderSubscribe(isGrid) {
  if (isGrid) renderGrid();
  else renderCardList();
  clickCardListImage();
  clickGridImage();
}

export {
  renderAll,
  renderSubscribe,
  leftAsideButton,
  rightAsideButton,
  gridMain,
  listMain,
};

import { renderCardList } from "./renderCardList.js";
import { renderGrid } from "./renderGrid.js";
import { clickCardListImage, clickGridImage } from "../clickGridCardList.js";

const gridMain = document.getElementById("main-grid");
const listMain = document.getElementById("main-list");

const renderMain = (isAllNews, isGrid) => {
  clickCardListImage();
  clickGridImage();
  if (isAllNews === "all") renderAll(isGrid);
  else renderSubscribe(isGrid);
};

const renderAll = (isGrid) => {
  if (isGrid) renderGrid();
  else renderCardList();
};

const renderSubscribe = (isGrid) => {
  if (isGrid) renderGrid();
  else renderCardList();
};

export { renderMain, renderAll, renderSubscribe, gridMain, listMain };

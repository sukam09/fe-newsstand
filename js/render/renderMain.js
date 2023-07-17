import { renderCardList } from "./renderCardList.js";
import { renderGrid } from "./renderGrid.js";
import { clickCardListImage, clickGridImage } from "../chooseMode.js";

const rightAsideButton = document.getElementById("aside-right");
const leftAsideButton = document.getElementById("aside-left");
const gridMain = document.getElementById("main-grid-01");
const listMain = document.getElementById("main-grid-02");

class Page {
  #PageNumber;
  constructor() {
    this.#PageNumber = 0;
  }
  setPage(Pagenumber) {
    this.#PageNumber = Pagenumber;
  }
  
}

function renderMain(isGrid) {
  if (isGrid) renderGrid(0);
  else renderCardList();
  clickCardListImage();
  clickGridImage();
}

export { renderMain, leftAsideButton, rightAsideButton, gridMain, listMain };

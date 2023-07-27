import { makeArrow, removeArrow } from "../../utils/utils.js";
import { makeGrid, clickSubscribeButtonInGrid } from "../render/renderGrid.js";
import Stores from "../core/Store.js";

const MAX_PAGE_NUMBER = 3;
const MIN_PAGE_NUMBER = 0;

function addEventArrowGrid(logos) {
  removeArrow();
  makeArrow();
  const leftAsideButton = document.getElementById("left-arrow");
  const rightAsideButton = document.getElementById("right-arrow");
  leftAsideButton.addEventListener("click", () => {
    decreaseGridPage(logos, leftAsideButton, rightAsideButton);
  });
  rightAsideButton.addEventListener("click", () => {
    increaseGridPage(logos, leftAsideButton, rightAsideButton);
  });
}

function increaseGridPage(logos, leftAsideButton, rightAsideButton) {
  if (Stores.getPage() === MAX_PAGE_NUMBER - 1) {
    rightAsideButton.style.visibility = "hidden";
    Stores.setPage(parseInt(Stores.getPage()) + 1);
    makeGrid(logos);
    clickSubscribeButtonInGrid(logos);
    return;
  }
  leftAsideButton.style.visibility = "visible";
  Stores.setPage(parseInt(Stores.getPage()) + 1);
  makeGrid(logos);
  clickSubscribeButtonInGrid(logos);
}

function decreaseGridPage(logos, leftAsideButton, rightAsideButton) {
  if (Stores.getPage() === MIN_PAGE_NUMBER + 1) {
    leftAsideButton.style.visibility = "hidden";
    Stores.setPage(parseInt(Stores.getPage()) - 1);
    makeGrid(logos);
    clickSubscribeButtonInGrid(logos);
    return;
  }
  rightAsideButton.style.visibility = "visible";
  Stores.setPage(parseInt(Stores.getPage()) - 1);
  makeGrid(logos);
  clickSubscribeButtonInGrid(logos);
}

export { addEventArrowGrid };

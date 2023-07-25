import { makeArrow } from "../utils/utils.js";
import { makeGrid, clickSubscribeButton } from "./render/renderGrid.js";
import Stores from "./core/Store.js";

const MAX_PAGE_NUMBER = 3;
const MIN_PAGE_NUMBER = 0;

function addEventArrowGrid(logos) {
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
    clickSubscribeButton(logos);
    return;
  }
  leftAsideButton.style.visibility = "visible";
  Stores.setPage(parseInt(Stores.getPage()) + 1);
  makeGrid(logos);
  clickSubscribeButton(logos);
}

function decreaseGridPage(logos, leftAsideButton, rightAsideButton) {
  if (Stores.getPage() === MIN_PAGE_NUMBER + 1) {
    leftAsideButton.style.visibility = "hidden";
    Stores.setPage(parseInt(Stores.getPage()) - 1);
    makeGrid(logos);
    clickSubscribeButton(logos);
    return;
  }
  rightAsideButton.style.visibility = "visible";
  Stores.setPage(parseInt(Stores.getPage()) - 1);
  makeGrid(logos);
  clickSubscribeButton(logos);
}

export { addEventArrowGrid };

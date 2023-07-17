import { rightAsideButton, leftAsideButton } from "./render/renderMain.js";
import { increaseListPage, decreaseListPage } from "./category.js";
import { increaseGridPage, decreaseGridPage } from "./render/renderGrid.js";

function addAsideClickEvent(isGrid) {
  clickRightAsideButton(isGrid);
  clickLeftAsideButton(isGrid);
}

function clickRightAsideButton(isGrid) {
  if (isGrid) {
    rightAsideButton.removeEventListener("click", increaseListPage);
    rightAsideButton.addEventListener("click", increaseGridPage);
  } else {
    rightAsideButton.removeEventListener("click", increaseGridPage);
    rightAsideButton.addEventListener("click", increaseListPage);
  }
}

function clickLeftAsideButton(isGrid) {
  if (isGrid) {
    leftAsideButton.removeEventListener("click", decreaseListPage);
    leftAsideButton.addEventListener("click", decreaseGridPage);
  } else {
    leftAsideButton.removeEventListener("click", decreaseGridPage);
    leftAsideButton.addEventListener("click", decreaseListPage);
  }
}

export { addAsideClickEvent };

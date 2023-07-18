import { getState, resister, setState } from "./observer/observer.js";
import { gridPageIdx, isGrid, listPageIdx } from "./store/store.js";
import { $ } from "./util.js";

const leftButton = $(".left_navigation_button");
const rightButton = $(".right_navigation_button");

function updatePages(increment) {
  const currentMode = getState(isGrid);
  const nowGridPage = getState(gridPageIdx);
  const nowListPage = getState(listPageIdx);
  currentMode
    ? setState(gridPageIdx, nowGridPage + increment)
    : setState(listPageIdx, nowListPage + increment);
}

function updateNavigtaionButton() {
  const currentMode = getState(isGrid);
  if (currentMode) {
    switch (getState(gridPageIdx)) {
      case 0:
        leftButton.style.display = "none";
        rightButton.style.display = "block";
        return;
      case 3:
        leftButton.style.display = "block";
        rightButton.style.display = "none";
        return;
      default:
        leftButton.style.display = "block";
        rightButton.style.display = "block";
    }
  } else {
    leftButton.style.display = "block";
    rightButton.style.display = "block";
  }
}

function setNavigationButton() {
  leftButton.addEventListener("click", () => updatePages(-1));
  rightButton.addEventListener("click", () => updatePages(1));
  resister(gridPageIdx, updateNavigtaionButton);
  resister(listPageIdx, updateNavigtaionButton);
  resister(isGrid, updateNavigtaionButton);
}

export { setNavigationButton };

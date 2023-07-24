import { MAX_GRID_COUNT } from "../core/store/constants.js";
import { getState, register, setState } from "../core/observer/observer.js";
import {
  gridPageIdx,
  isGrid,
  isSubTab,
  listPageIdx,
  subscribeList,
} from "../core/store/store.js";
import { $ } from "../core/utils/util.js";

const leftButton = $(".left_navigation_button");
const rightButton = $(".right_navigation_button");

function updatePages(increment) {
  return () => {
    const currentMode = getState(isGrid);
    const key = currentMode ? gridPageIdx : listPageIdx;
    setState(key, getState(key) + increment);
  };
}

function updateNavigationButton() {
  const isGridMode = getState(isGrid);
  const isSubMode = getState(isSubTab);
  const subListCount = getState(subscribeList).length;

  if (isGridMode && !isSubMode) {
    changeButton(3);
  } else if (isGridMode && isSubMode) {
    if (subListCount <= MAX_GRID_COUNT) {
      hideBothButton();
    } else if (subListCount <= MAX_GRID_COUNT * 2) {
      changeButton(1);
    } else if (subListCount <= MAX_GRID_COUNT * 3) {
      changeButton(2);
    } else {
      changeButton(3);
    }
  } else {
    showBothButton();
  }
}

function changeButton(index) {
  switch (getState(gridPageIdx)) {
    case 0:
      showRightButton();
      break;
    case index:
      showLeftButton();
      break;
    default:
      showBothButton();
  }
}

function showBothButton() {
  leftButton.style.display = "block";
  rightButton.style.display = "block";
}

function hideBothButton() {
  leftButton.style.display = "none";
  rightButton.style.display = "none";
}

function showRightButton() {
  leftButton.style.display = "none";
  rightButton.style.display = "block";
}

function showLeftButton() {
  leftButton.style.display = "block";
  rightButton.style.display = "none";
}

function setNavigationButton() {
  leftButton.addEventListener("click", updatePages(-1));
  rightButton.addEventListener("click", updatePages(1));
  register(gridPageIdx, updateNavigationButton);
  register(listPageIdx, updateNavigationButton);
  register(isGrid, updateNavigationButton);
  register(isSubTab, updateNavigationButton);
  register(isSubTab, () => setState(gridPageIdx, 0));
}

export { setNavigationButton };

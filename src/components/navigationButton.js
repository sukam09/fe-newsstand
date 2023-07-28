import { MAX_GRID_COUNT } from "../core/store/constants.js";
import { getState, register, setState } from "../core/observer/observer.js";
import {
  gridPageIdx,
  isGrid,
  isSubTab,
  listIdx,
  subscribeList,
} from "../core/store/store.js";
import { $ } from "../core/utils/util.js";

const leftButton = $(".left_navigation_button");
const rightButton = $(".right_navigation_button");

function updatePages(increment) {
  return () => {
    const isGridMode = getState(isGrid);
    const isSubMode = getState(isSubTab);
    if (isGridMode) {
      setState(gridPageIdx, getState(gridPageIdx) + increment);
    } else {
      const currentIdx = getState(listIdx);
      if (isSubMode) {
        currentIdx.category += increment;
      } else {
        currentIdx.list += increment;
      }
      setState(listIdx, currentIdx);
    }
  };
}
// 키보드 방향키로 탭 이동
function keyboardClicked({ key: key }) {
  const currentGridMode = getState(isGrid);
  const nowGridPage = getState(gridPageIdx);
  const currentIdx = getState(listIdx);
  const isSubMode = getState(isSubTab);
  if (currentGridMode) {
    if (key === "ArrowRight" && nowGridPage < 3) {
      setState(gridPageIdx, nowGridPage + 1);
    } else if (key === "ArrowLeft" && nowGridPage > 0) {
      setState(gridPageIdx, nowGridPage - 1);
    }
  } else {
    if (key === "ArrowRight") {
      if (isSubMode) {
        currentIdx.category += 1;
      } else {
        currentIdx.list += 1;
      }
    } else if (key === "ArrowLeft") {
      if (isSubMode) {
        currentIdx.category += -1;
      } else {
        currentIdx.list += -1;
      }
    }
    setState(listIdx, currentIdx);
  }
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
  window.addEventListener("keydown", keyboardClicked);
  register(gridPageIdx, updateNavigationButton);
  register(listIdx, updateNavigationButton);
  register(isGrid, updateNavigationButton);
  register(isSubTab, updateNavigationButton);
  register(isSubTab, () => setState(gridPageIdx, 0));
}

export { setNavigationButton };

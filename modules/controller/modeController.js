import { getState, setState } from "../store/observer.js";
import {
  GRID,
  LIST,
  MODE_ALL,
  MODE_MY,
  gridPageState,
  pageModeState,
  pageTypeState,
} from "../store/pageState.js";
import { qs } from "../utils.js";
import { showGridPage } from "./pageController.js";

export function handleAllModeClick({ currentTarget }) {
  const $myModeButton = qs(".my_mode_button");
  $myModeButton.classList.remove("mode_clicked");
  currentTarget.classList.add("mode_clicked");
  setState(pageModeState, MODE_ALL);
}

export function handleMyModeClick({ currentTarget }) {
  const $allModeButton = qs(".all_mode_button");
  $allModeButton.classList.remove("mode_clicked");
  currentTarget.classList.add("mode_clicked");
  setState(pageModeState, MODE_MY);
}

export function controllPageMode() {
  const pageMode = getState(pageModeState);
  const pageType = getState(pageTypeState);

  switch (pageMode) {
    case MODE_ALL:
      showAllModeGridContainer();
      showModeAll(pageType);
      break;
    case MODE_MY:
      showMyMode();
      break;
    default:
      break;
  }
}

/**
 * ALL 모드 페이지를 pageType(grid, list)에 맞게 보여줌
 * @param {string} pageType 페이지 타입(GRID | LIST)
 */
function showModeAll(pageType) {
  hideMyModeListContainer();
  hideMyModeGridContainer();
  switch (pageType) {
    case GRID:
      showAllModeGridContainer();
      showGridPage(MODE_ALL, getState(gridPageState));
      break;
    case LIST:
      hideAllModeGridContainer();
      showAllModeListContainer();
      break;
    default:
      break;
  }
}

function showMyMode() {
  const pageType = getState(pageTypeState);
  hideAllModeListContainer();
  hideAllModeGridContainer();
  switch (pageType) {
    case GRID:
      hideMyModeListContainer();
      showMyModeGridContainer();
      showGridPage(MODE_MY, getState(gridPageState));
      break;
    case LIST:
      showMyModeListContainer();
      break;
    default:
      break;
  }
}

export function showAllModeGridContainer() {
  const $gridContainer = qs("#grid_container");
  $gridContainer.style.display = "block";
}

export function showAllModeListContainer() {
  const $gridContainer = qs("#list_container");
  $gridContainer.style.display = "block";
}

export function hideAllModeGridContainer() {
  const $gridContainer = qs("#grid_container");
  $gridContainer.style.display = "none";
}

export function hideAllModeListContainer() {
  const $gridContainer = qs("#list_container");
  $gridContainer.style.display = "none";
}

export function showMyModeGridContainer() {
  const $gridContainer = qs("#my_mode_grid_container");
  $gridContainer.style.display = "block";
  console.log($gridContainer);
}

export function showMyModeListContainer() {
  const $gridContainer = qs("#my_mode_list_container");
  $gridContainer.style.display = "block";
}

export function hideMyModeGridContainer() {
  const $gridContainer = qs("#my_mode_grid_container");
  $gridContainer.style.display = "none";
}

export function hideMyModeListContainer() {
  const $gridContainer = qs("#my_mode_list_container");
  $gridContainer.style.display = "none";
}

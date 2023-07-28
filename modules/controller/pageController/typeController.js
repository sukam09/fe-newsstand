/**
 * GRID, LIST 타입 변화에대한 이벤트
 */

import { addObserver, getState, setState } from "../../store/observer.js";
import {
  MAX_GRID_PAGE,
  MODE_ALL,
  MODE_MY,
  NUM_IN_A_GRID,
  myGridPageState,
  pageModeState,
} from "../../store/pageState.js";
import {
  GRID,
  LIST,
  gridPageState,
  pageTypeState,
} from "../../store/pageState.js";
import { myPressCntState } from "../../store/subState.js";
import { qs } from "../../utils.js";
import { controllPage } from "./pageController.js";

export function addObserverOnPageType() {
  addObserver(pageTypeState, controllPage);
  addObserver(pageTypeState, controllButtonShowing);
}

export function handleGridViewButton(e) {
  const $listViewButton = qs(".list_view_button");
  e.currentTarget.classList.add("view_clicked");
  $listViewButton.classList.remove("view_clicked");
  setState(pageTypeState, GRID);
}

export function handleListViewButton(e) {
  const $gridViewButton = qs(".grid_view_button");
  e.currentTarget.classList.add("view_clicked");
  $gridViewButton.classList.remove("view_clicked");
  setState(pageTypeState, LIST);
}

export function controllButtonShowing() {
  const $leftButton = qs(".left_button");
  const $rightButton = qs(".right_button");
  const pageType = getState(pageTypeState);
  const pageMode = getState(pageModeState);

  const modeAllGrid = pageType === GRID && pageMode === MODE_ALL;
  const modeMyGrid = pageType === GRID && pageMode === MODE_MY;
  const modeAllList = pageType === LIST && pageMode === MODE_ALL;
  const modeMyList = pageType === LIST && pageMode === MODE_MY;

  if (modeAllGrid) {
    const gridPage = getState(gridPageState);
    if (gridPage >= MAX_GRID_PAGE - 1) {
      $leftButton.style.display = "block";
      $rightButton.style.display = "none";
    } else if (gridPage <= 0) {
      $leftButton.style.display = "none";
      $rightButton.style.display = "block";
    } else {
      $leftButton.style.display = "block";
      $rightButton.style.display = "block";
    }
  } else if (modeMyGrid) {
    const myGridPage = getState(myGridPageState);
    const maxPage = parseInt(getState(myPressCntState) / NUM_IN_A_GRID) + 1;
    if (maxPage === 1) {
      $leftButton.style.display = "none";
      $rightButton.style.display = "none";
    } else if (myGridPage >= maxPage - 1) {
      $leftButton.style.display = "block";
      $rightButton.style.display = "none";
    } else if (myGridPage <= 0) {
      $leftButton.style.display = "none";
      $rightButton.style.display = "block";
    } else {
      $leftButton.style.display = "block";
      $rightButton.style.display = "block";
    }
  } else if (modeAllList || modeMyList) {
    $leftButton.style.display = "block";
    $rightButton.style.display = "block";
  }
}

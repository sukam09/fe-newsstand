import {
  leftRollingId,
  leftViewIdx,
  rightRollingId,
  rightViewIdx,
  rollingAnimation,
  setLeftRollingId,
  setLeftViewIdx,
  setRightRollingId,
  setRightViewIdx,
} from "../components/headlineSection/headline/headline.js";

import {
  handleLogoButton,
  handleThemeButtonClick,
} from "../components/titleSection/titleSection.js";
import { handleCategoryItemClick } from "./categoryController.js";
import {
  handleGridItemClick,
  handleGridItemMouseout,
  handleGridItemMouseover,
} from "./gridController.js";
import { getState, setState } from "../store/observer.js";
import {
  MAX_CATEGORY_ID,
  MAX_GRID_PAGE,
  MAX_LIST_PAGE,
  GRID,
  LIST,
  categoryIdState,
  gridPageState,
  listPageState,
  pageTypeState,
  pageModeState,
  MODE_ALL,
  MODE_MY,
  myListPageState,
  myGridPageState,
} from "../store/pageState.js";
import { qs, qsa } from "../utils.js";
import { handleListSubButton } from "./listController.js";
import {
  handleGridViewButton,
  handleListViewButton,
} from "./pageController/typeController.js";
import {
  handleModeAllClick,
  handleModeMyClick,
} from "./pageController/modeController.js";
import { myPressCntState } from "../store/subState.js";
import {
  setNextPageState,
  setPrevPageState,
  showPage,
} from "./pageController/pageController.js";

export function addEventsOnGridItem() {
  const $gridItems = qsa(".grid_item");
  [...$gridItems].forEach(($gridItem) => {
    $gridItem.addEventListener("mouseover", (e) => handleGridItemMouseover(e));
    $gridItem.addEventListener("mouseout", (e) => handleGridItemMouseout(e));
    $gridItem.addEventListener("click", (e) => handleGridItemClick(e));
  });
}

export function addEventsOnPageButton() {
  const $leftBtn = qs(".left_button");
  const $rightBtn = qs(".right_button");

  $leftBtn.addEventListener("click", () => {
    const pageType = getState(pageTypeState);
    const pageMode = getState(pageModeState);
    setPrevPageState({ pageMode, pageType });
  });

  $rightBtn.addEventListener("click", () => {
    const pageType = getState(pageTypeState);
    const pageMode = getState(pageModeState);
    setNextPageState({ pageMode, pageType });
  });
}

export function addEventsOnSubButton() {
  const $gridItems = qsa(".grid_items");

  [...$gridItems].forEach(($item) => {
    $item.addEventListener("click", (e) => handleGridItemClick(e));
  });
}

export function addEventsOnViewButton() {
  const $listViewButton = qs(".list_view_button");
  const $gridViewButton = qs(".grid_view_button");

  $gridViewButton.addEventListener("click", (e) => handleGridViewButton(e));
  $listViewButton.addEventListener("click", (e) => handleListViewButton(e));
}

export function addEventsOnCategoryItem() {
  const $categoryItems = qsa(".category_item");

  [...$categoryItems].forEach(($categoryItem) => {
    $categoryItem.addEventListener("click", (e) => handleCategoryItemClick(e));
  });
}

export function addEventsOnThemeButton() {
  const $themeButtons = qsa(".theme_button");
  [...$themeButtons].forEach(($button) => {
    $button.addEventListener("click", handleThemeButtonClick);
  });
}

export function addEventsOnRollingList() {
  const $leftContainer = qs(".left_rolling_list");
  const $rightContainer = qs(".right_rolling_list");
  const $leftRollingList = qsa(".left_rolling_list_item");
  const $rightRollingList = qsa(".right_rolling_list_item");

  $leftContainer.addEventListener("mouseover", () => {
    clearInterval(leftRollingId);
  });
  $leftContainer.addEventListener("mouseout", () => {
    const id = setInterval(() => {
      rollingAnimation($leftRollingList, leftViewIdx);
      setLeftViewIdx(leftViewIdx + 1);
    }, 5000);
    setLeftRollingId(id);
  });

  $rightContainer.addEventListener("mouseover", () => {
    clearInterval(rightRollingId);
  });
  $rightContainer.addEventListener("mouseout", () => {
    const id = setInterval(() => {
      rollingAnimation($rightRollingList, rightViewIdx);
      setRightViewIdx(rightViewIdx + 1);
    }, 5000);
    setRightRollingId(id);
  });
}

export function addEventsOnTitle() {
  const $titleContainer = qs(".title_container");
  $titleContainer.addEventListener("click", handleLogoButton);
}

export function addEventsOnListSubButton() {
  const $subButtons = qsa(".list_sub_button");
  const $unsubButtons = qsa(".list_unsub_button");
  [...$subButtons].forEach(($subButton) => {
    $subButton.addEventListener("click", (e) => handleListSubButton(e));
  });
  [...$unsubButtons].forEach(($unsubButton) => {
    $unsubButton.addEventListener("click", (e) => handleListSubButton(e));
  });
}

export function addEventsOnPageModeButton() {
  const $modeMyButton = qs(".mode_all_button");
  const $ModeallButton = qs(".mode_my_button");
  $modeMyButton.addEventListener("click", (e) => handleModeAllClick(e));
  $ModeallButton.addEventListener("click", (e) => handleModeMyClick(e));
}

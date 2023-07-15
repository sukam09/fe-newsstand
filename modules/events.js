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
} from "./components/headlineSection/headline/headline.js";
import { handleClickCategoryItem } from "./components/mainSection/mainBody/mainContent/pressList/category/categoryItem.js";
import {
  showNextPage,
  showPrevPage,
} from "./components/mainSection/mainBody/pageButtons/pageButtons.js";
import {
  handleGirdViewButton,
  handleListViewButton,
} from "./components/mainSection/mainHeader/mainHeader.js";
import {
  handleLogoButton,
  handleThemeButtonClick,
} from "./components/titleSection/titleSection.js";
import { qs, qsa } from "./utils.js";

export function addEventsOnGridItem() {
  const $gridItems = qsa(".grid_item");
  [...$gridItems].forEach((gridItem) => {
    gridItem.addEventListener("mouseover", (e) => showSubButton(e));
    gridItem.addEventListener("mouseout", (e) => showLogo(e));
  });
}

export function addEventsOnPageButton() {
  const $leftBtn = qs(".left_button");
  const $rightBtn = qs(".right_button");
  $leftBtn.addEventListener("click", () => showPrevPage());
  $rightBtn.addEventListener("click", () => showNextPage());
}

export function addEventsOnSubButton() {
  const $subButtonContainers = qsa(".sub_button_container");
  [...$subButtonContainers].forEach(($subButtonContainer) => {
    const $subButton = $subButtonContainer.querySelector(".sub_button");
    const $unsubButton = $subButtonContainer.querySelector(".unsub_button");

    $subButton.addEventListener("click", () => {});
    $unsubButton.addEventListener("click", () => {});
  });
}

export function addEventsOnViewButton() {
  const $listViewButton = qs(".list_view_button");
  const $gridViewButton = qs(".grid_view_button");

  $gridViewButton.addEventListener("click", (e) => handleGirdViewButton(e));
  $listViewButton.addEventListener("click", (e) => handleListViewButton(e));
}

export function addEventsOnCategoryItem() {
  const $categoryItems = qsa(".category_item");

  [...$categoryItems].forEach(($categoryItem) => {
    $categoryItem.addEventListener("click", (e) => handleClickCategoryItem(e));
  });
}

export function addEventOnThemeButton() {
  const $themeButton = qs("#theme_button");
  $themeButton.addEventListener("click", handleThemeButtonClick);
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

function showSubButton(e) {
  const target = e.currentTarget;
  const $logo = target.querySelector("img");
  const $subButtonContainer = target.querySelector(".sub_button_container");
  $subButtonContainer.style.display = "flex";
  $logo.style.display = "none";
}

function showLogo(e) {
  const target = e.currentTarget;
  const $logo = target.querySelector("img");
  const $subButtonContainer = target.querySelector(".sub_button_container");
  $subButtonContainer.style.display = "none";
  $logo.style.display = "flex";
}

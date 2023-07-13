import {
  MAX_GRID_PAGE,
  gridPage,
  hideGridPage,
  showGridPage,
} from "./components/mainSection/mainBody/mainContent/pressGrid/pressGrid.js";
import {
  showNextPage,
  showPrevPage,
} from "./components/mainSection/mainBody/pageButtons/pageButtons.js";
import {
  handleGirdViewButton,
  handleListViewButton,
} from "./components/mainSection/mainHeader/mainHeader.js";
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
  $leftBtn.addEventListener("click", () => showPrevPage("grid"));
  $rightBtn.addEventListener("click", () => showNextPage("grid"));
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

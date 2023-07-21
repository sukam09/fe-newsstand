import { createPressItem } from "../components/mainSection/mainBody/content/pressGrid/pressGrid.js";
import { pressDataState } from "../store/dataState.js";
import { subStateList } from "../store/gridState.js";
import { getState, setState } from "../store/observer.js";
import { NUM_IN_A_GRID } from "../store/pageState.js";
import { qs } from "../utils.js";

function getGridItemIndex($gridItem) {
  const gridItemKey = $gridItem.getAttribute("key");
  const [page, indexOfPage] = gridItemKey.split("_");
  const index = parseInt(page) * NUM_IN_A_GRID + parseInt(indexOfPage);
  return index;
}

export function handleGridItemMouseover(e) {
  const $gridItem = e.currentTarget;
  const index = getGridItemIndex($gridItem);
  const { pressList } = getState(pressDataState);
  const press = pressList[index];
  const subButtonState = subStateList[press.id];
  const isSub = getState(subButtonState);

  if (isSub) {
    //show unsubButton
    const $unsubButtonContainer = $gridItem.querySelector(
      ".unsub_button_container"
    );
    $unsubButtonContainer.style.display = "flex";
  } else {
    //show subButton
    const $subButtonContainer = $gridItem.querySelector(
      ".sub_button_container"
    );
    $subButtonContainer.style.display = "flex";
  }
}

export function handleGridItemMouseout(e) {
  const $gridItem = e.currentTarget;
  const $subButtonContainer = $gridItem.querySelector(".sub_button_container");
  const $unsubButtonContainer = $gridItem.querySelector(
    ".unsub_button_container"
  );
  $subButtonContainer.style.display = "none";
  $unsubButtonContainer.style.display = "none";
}

export function handleGridItemClick(e) {
  const $gridItem = e.currentTarget;
  const $target = e.target;
  const gridItemKey = $gridItem.getAttribute("key");
  const [page, indexOfPage] = gridItemKey.split("_");
  const index = parseInt(page) * NUM_IN_A_GRID + parseInt(indexOfPage);
  const { pressList } = getState(pressDataState);
  const press = pressList[index];

  if ($target.className === "sub_button") {
    const subState = subStateList[press.id];
    setState(subState, true);
  } else if ($target.className === "unsub_button") {
    const subState = subStateList[press.id];
    setState(subState, false);
  }
}

export function controllGridSubButtonShowing(id) {
  const isSub = getState(subStateList[id]);
  const $gridItem = qs(`#press_${id}`);
  const $subContainer = $gridItem.querySelector(".sub_button_container");
  const $unsubContainer = $gridItem.querySelector(".unsub_button_container");

  if (isSub) {
    $subContainer.style.display = "none";
  } else {
    $unsubContainer.style.display = "none";
  }
}

export function controllMyPressGrid(subState) {
  const $targetGrid = qs(`#mode_my_grid_0`);
  const { pressList } = getState(pressDataState);
  createPressItem(subState);
  const isSub = getState(subState);
  console.log(isSub, subState);
}

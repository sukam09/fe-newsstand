import { createAlert } from "../components/alert.js";
import { pressDataState } from "../store/dataState.js";
import { subButtonStateList } from "../store/gridState.js";
import { addObserver, getState, setState } from "../store/observer.js";
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
  const subButtonState = subButtonStateList[press.id];
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
    const subButtonState = subButtonStateList[press.id];
    setState(subButtonState, true);
  } else if ($target.className === "unsub_button") {
    const subButtonState = subButtonStateList[press.id];
    setState(subButtonState, false);
  }
}

export function controllSubButton(id) {
  const isSub = getState(subButtonStateList[id]);
  const $gridItem = qs(`#press_${id}`);
  const $subContainer = $gridItem.querySelector(".sub_button_container");
  const $unsubContainer = $gridItem.querySelector(".unsub_button_container");

  if (isSub) {
    $unsubContainer.style.display = "flex";
    $subContainer.style.display = "none";
  } else {
    $unsubContainer.style.display = "none";
    $subContainer.style.display = "flex";
  }
}

export function alertSubscribe() {
  const $alert = qs(".alert");
  $alert.style.display = "flex";
  console.log("Alert");
}

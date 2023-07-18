import { pressDataState } from "../store/dataState.js";
import { addObserver, getState, setState } from "../store/observer.js";
import { NUM_IN_A_GRID } from "../store/pageState.js";

export function showSubButton(e) {
  const target = e.currentTarget;
  const $subButtonContainer = target.querySelector(".sub_button_container");
  $subButtonContainer.style.display = "flex";
}

export function hiddenSubButton(e) {
  const target = e.currentTarget;
  const $subButtonContainer = target.querySelector(".sub_button_container");
  $subButtonContainer.style.display = "none";
}
export function handleSubButtonClick(e) {
  console.log(e);
}

export function handleUnsubButtonClick(e) {
  console.log("unsub");
}
export function handleGridItemClick(e) {
  const $gridItem = e.currentTarget;
  const gridItemKey = $gridItem.getAttribute("key");
  const $target = e.target;
  const [page, indexOfPage] = gridItemKey.split("_");
  const index = parseInt(page) * NUM_IN_A_GRID + parseInt(indexOfPage);

  const { pressList } = getState(pressDataState);
  pressList[index].isSub = true;
  setState(pressDataState, {
    pressList,
  });

  console.log(getState(pressDataState));
}

export function addObserverOnPressData() {
  const controllSubButton = () => {
    console.log("controll sub button");
  };
  addObserver(pressDataState, controllSubButton);
}

import {
  createEmptyPressItem,
  createPressItem,
} from "../components/mainSection/mainBody/content/pressGrid/pressGrid.js";
import { pressDataState } from "../store/dataState.js";
import {
  myPressCntState,
  myPressListState,
  subStateList,
} from "../store/subState.js";
import { getState, setState } from "../store/observer.js";
import { MAX_GRID_PAGE, NUM_IN_A_GRID } from "../store/pageState.js";
import { qs, strToHtmlElemnt } from "../utils.js";

function getPressId($gridItem) {
  const press_id = $gridItem.classList[1].split("_")[1];
  return press_id;
}

export function handleGridItemMouseover(e) {
  const $gridItem = e.currentTarget;
  const pressId = getPressId(e.currentTarget);
  const { pressList } = getState(pressDataState);
  const press = [...pressList].find((press) => press.id === parseInt(pressId));
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

export function handleGridItemClick({
  currentTarget: $gridItem,
  target: $target,
}) {
  const pressId = parseInt($gridItem.classList[1].split("_")[1]);
  if ($target.className === "sub_button") {
    const subState = subStateList[pressId];
    setState(subState, true);
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

//todo 에러 수정
export function drawMyPressToGrid() {
  const { pressList } = getState(pressDataState);
  const myPressList = getState(myPressListState);
  const myPressCnt = getState(myPressCntState);

  let cnt = 0;
  myPressList.forEach((pressId) => {
    const subState = subStateList[pressId];
    const isSub = getState(subState);
    const targetPress = [...pressList].find((press) => press.id === pressId);

    const targetPage = Math.floor(cnt / NUM_IN_A_GRID);
    const $targetGrid = qs(`#mode_my_grid_page_${targetPage}`);

    if (isSub) {
      const newItem = createPressItem(pressId, targetPress);
      const $newItem = strToHtmlElemnt(newItem);
      const $oldItem = $targetGrid.children[cnt % NUM_IN_A_GRID];
      $newItem.addEventListener("mouseover", handleGridItemMouseover);
      $newItem.addEventListener("mouseout", handleGridItemMouseout);
      $newItem.addEventListener("click", handleGridItemClick);
      $targetGrid.replaceChild($newItem, $oldItem);
      cnt++;
    }
  });

  for (let i = cnt; i < MAX_GRID_PAGE * NUM_IN_A_GRID; i++) {
    const targetPage = Math.floor(i / NUM_IN_A_GRID);
    const $targetGrid = qs(`#mode_my_grid_page_${targetPage}`);
    const emptyItem = createEmptyPressItem();
    const $emptyItem = strToHtmlElemnt(emptyItem);
    const $oldItem = $targetGrid.children[i % NUM_IN_A_GRID];
    $targetGrid.replaceChild($emptyItem, $oldItem);
  }
  setState(myPressCntState, myPressList.length);
}

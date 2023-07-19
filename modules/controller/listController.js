import { subStateList } from "../store/gridState.js";
import { getState, setState } from "../store/observer.js";
import { qs } from "../utils.js";

export function handleListSubButton(e) {
  const $button = e.currentTarget;
  const pressId = parseInt($button.parentNode.parentNode.id.split("_")[2]);
  const subState = getState(subStateList[pressId]);
  setState(subStateList[pressId], !subState);
}

export function controllListSubButtonShowing(id) {
  const isSub = getState(subStateList[id]);
  const $pressList = qs(`#list_press_${id}`);
  if (!$pressList) {
    console.log("데이터 엄씀");
    return;
  }
  console.log(($pressList.style.display = "flex"));

  const $subButton = $pressList.querySelector(".list_sub_button");
  const $unsubButton = $pressList.querySelector(".list_unsub_button");

  console.log($subButton, isSub);

  if (isSub) {
    $subButton.style.display = "none";
    $unsubButton.style.display = "flex";
    console.log("   x버튼 표시");
  } else {
    $subButton.style.display = "flex";
    $unsubButton.style.display = "none";
    console.log("   구독 버튼 표시");
  }
}

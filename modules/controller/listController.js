import { subStateList } from "../store/gridState.js";
import { getState, setState } from "../store/observer.js";
import { qsa } from "../utils.js";

export function handleListSubButton({ currentTarget: $button }) {
  const pressId = parseInt($button.getAttribute("key").split("_")[1]);
  console.log(pressId);
  const subState = getState(subStateList[pressId]);
  setState(subStateList[pressId], !subState);
}

// id의 리스트 뷰의 구독, 해지 버튼 조정
export function controllListsSubButtonShowing(id) {
  const isSub = getState(subStateList[id]);
  const $pressLists = qsa(`.list_press_${id}`);

  if (!$pressLists) {
    console.log("리스트 뷰에 데이터 엄씀");
    return;
  }
  [...$pressLists].forEach(($pressList) => {
    const $subButton = $pressList.querySelector(".list_sub_button");
    const $unsubButton = $pressList.querySelector(".list_unsub_button");

    if (isSub) {
      $subButton.style.display = "none";
      $unsubButton.style.display = "flex";
    } else {
      $subButton.style.display = "flex";
      $unsubButton.style.display = "none";
    }
  });
}

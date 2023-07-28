import { getState, setState } from "../../store/observer.js";
import { MODE_ALL, MODE_MY, pageModeState } from "../../store/pageState.js";
import { myPressCntState } from "../../store/subState.js";
import { qs } from "../../utils.js";

export function handleModeAllClick({ currentTarget }) {
  const $ModeMyButton = qs(".mode_my_button");
  $ModeMyButton.classList.remove("mode_clicked");
  currentTarget.classList.add("mode_clicked");
  setState(pageModeState, MODE_ALL);
}

export function handleModeMyClick({ currentTarget }) {
  const myPressCnt = getState(myPressCntState);
  if (myPressCnt <= 0) {
    alert("구독한 언론사가 없어요!!!!!!!!");
    return;
  }

  const $allModeButton = qs(".mode_all_button");
  $allModeButton.classList.remove("mode_clicked");
  currentTarget.classList.add("mode_clicked");

  setState(pageModeState, MODE_MY);
}

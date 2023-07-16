import { isListActivateState } from "../../store/store.js";
import { getState, setState } from "../../observer/observer.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../utils/my-query-selector.js";

const $gridView = _querySelector(".grid-view");
const $listView = _querySelector(".list-view");

const $mainNavViewWrapper = _querySelector(".main-nav_viewer");
const $mainNavView = _querySelectorAll("button", $mainNavViewWrapper);
const $listButton = $mainNavView[0];
const $gridButton = $mainNavView[1];

const handleListButtonClick = () => {
  setState(isListActivateState, true);
};

const handleGridButtonClick = () => {
  setState(isListActivateState, false);
};

const setCurrentView = () => {
  if (getState(isListActivateState)) {
    $listButton.className = "main-nav_viewer--selected";
    $gridButton.className = "";

    $gridView.classList.add("hidden");
    $listView.classList.remove("hidden");
  } else {
    $listButton.className = "";
    $gridButton.className = "main-nav_viewer--selected";

    $gridView.classList.remove("hidden");
    $listView.classList.add("hidden");
  }
};

const setEvents = () => {
  $listButton.addEventListener("click", handleListButtonClick);
  $gridButton.addEventListener("click", handleGridButtonClick);
};

export { setCurrentView, setEvents };

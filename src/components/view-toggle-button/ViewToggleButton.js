import { isListActivateState } from "../../store/store.js";
import { getState, setState } from "../../observer/observer.js";

const $gridView = document.querySelector(".grid-view");
const $listView = document.querySelector(".list-view");

const $mainNavView = document.querySelectorAll(".main-nav_viewer > button");
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

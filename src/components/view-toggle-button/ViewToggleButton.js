import {
  _querySelector,
  _querySelectorAll,
} from "../../utils/my-query-selector.js";
import { viewState } from "../../store/store.js";
import { VIEW_TYPE } from "../../constants/constants.js";
import { getState, setState } from "../../observer/observer.js";

const $gridView = _querySelector(".grid-view");
const $listView = _querySelector(".list-view");
const $mainNavViewWrapper = _querySelector(".main-nav_viewer");
const $mainNavView = _querySelectorAll("button", $mainNavViewWrapper);
const $listButton = $mainNavView[0];
const $gridButton = $mainNavView[1];

const handleListButtonClick = () => {
  setState(viewState, VIEW_TYPE.LIST);
};

const handleGridButtonClick = () => {
  setState(viewState, VIEW_TYPE.GRID);
};

const setCurrentView = () => {
  const currentViewState = getState(viewState);

  if (currentViewState === VIEW_TYPE.LIST) {
    $listButton.className = "main-nav_viewer--selected";
    $gridButton.className = "";

    $gridView.classList.add("hidden");
    $listView.classList.remove("hidden");
  } else {
    $gridButton.className = "main-nav_viewer--selected";
    $listButton.className = "";

    $listView.classList.add("hidden");
    $gridView.classList.remove("hidden");
  }
};

const setEvents = () => {
  $listButton.addEventListener("click", handleListButtonClick);
  $gridButton.addEventListener("click", handleGridButtonClick);
};

export { setCurrentView, setEvents };

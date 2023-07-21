import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { viewState } from "../../../store/storeKey.js";
import { setState } from "../../../store/observer.js";
import { checkIsGridView } from "../../../utils/utils.js";
import { VIEW_TYPE } from "../../../constants/constants.js";

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
  const isListView = !checkIsGridView();

  if (isListView) {
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

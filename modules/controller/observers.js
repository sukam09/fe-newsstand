import { myPressListState, subStateList } from "../store/subState.js";
import { addObserver, getState } from "../store/observer.js";
import {
  gridPageState,
  listPageState,
  myGridPageState,
  myListPageState,
  pageModeState,
} from "../store/pageState.js";
import {
  controllGridSubButtonShowing,
  drawMyPressToGrid,
} from "./gridController.js";
import {
  controllListsSubButtonShowing,
  drawMyPressToList,
} from "./listController.js";
import {
  controllPage,
  showModeAllGridPage,
  showModeMyGridPage,
} from "./pageController/pageController.js";
import { controllSnackbarShowing } from "./popupController.js";
import { updateMyPressList } from "./subscribeController.js";

export function addObserverOnIsSub() {
  subStateList.forEach((subState, idx) => {
    addObserver(subState, () => controllGridSubButtonShowing(idx));
    addObserver(subState, () => controllListsSubButtonShowing(idx));
    addObserver(subState, () => controllSnackbarShowing(subState));
    addObserver(subState, () => updateMyPressList(subState, idx));
  });
}

export function addObserverOnMyPress() {
  addObserver(myPressListState, drawMyPressToGrid);
  addObserver(myPressListState, drawMyPressToList);
}

export function addObserverOnPageMode() {
  addObserver(pageModeState, controllPage);
}

export function addObserverOnGridPage() {
  addObserver(gridPageState, () => {
    const gridPage = getState(gridPageState);
    showModeAllGridPage(gridPage);
  });
  addObserver(myGridPageState, () => {
    const myGridPage = getState(myGridPageState);
    showModeMyGridPage(myGridPage);
  });
}

export function addObserverOnListPage() {
  addObserver(listPageState, controllPage);
  addObserver(myListPageState, controllPage);
}

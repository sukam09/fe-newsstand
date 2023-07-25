import { myPressListState, subStateList } from "../store/subState.js";
import { addObserver } from "../store/observer.js";
import { pageModeState } from "../store/pageState.js";
import {
  controllGridSubButtonShowing,
  drawMyPressToGrid,
} from "./gridController.js";
import {
  controllListsSubButtonShowing,
  drawMyPressToList,
} from "./listController.js";
import { controllPage } from "./pageController/pageController.js";
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

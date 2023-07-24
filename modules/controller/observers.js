import { myPressListState, subStateList } from "../store/subState.js";
import { addObserver } from "../store/observer.js";
import { pageModeState } from "../store/pageState.js";
import {
  controllGridSubButtonShowing,
  controlldMyPressGrid,
} from "./gridController.js";
import { controllListsSubButtonShowing } from "./listController.js";
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
  addObserver(myPressListState, controlldMyPressGrid);
}

export function addObserverOnPageMode() {
  addObserver(pageModeState, controllPage);
}

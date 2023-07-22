import { subStateList } from "../store/gridState.js";
import { addObserver } from "../store/observer.js";
import { pageModeState } from "../store/pageState.js";
import {
  controllGridSubButtonShowing,
  controllMyPressGrid,
} from "./gridController.js";
import { controllListsSubButtonShowing } from "./listController.js";
import { controllPage } from "./pageController/pageController.js";
import { controllSnackbarShowing } from "./popupController.js";

export function addObserverOnIsSub() {
  subStateList.forEach((subState, idx) => {
    addObserver(subState, () => controllGridSubButtonShowing(idx));
    addObserver(subState, () => controllListsSubButtonShowing(idx));
    addObserver(subState, () => controllSnackbarShowing(subState));
    addObserver(subState, () => controllMyPressGrid(subState, idx));
  });
}

export function addObserverOnPageMode() {
  addObserver(pageModeState, controllPage);
}

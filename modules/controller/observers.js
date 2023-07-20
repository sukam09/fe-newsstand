import { subStateList } from "../store/gridState.js";
import { addObserver } from "../store/observer.js";
import { pageModeState } from "../store/pageState.js";
import { controllGridSubButtonShowing } from "./gridController.js";
import { controllListsSubButtonShowing } from "./listController.js";
import { controllPageMode } from "./modeController.js";
import { controllSnackbarShowing } from "./snackbarController.js";

export function addObserverOnIsSub() {
  subStateList.forEach((subState, idx) => {
    addObserver(subState, () => controllGridSubButtonShowing(idx));
    addObserver(subState, () => controllListsSubButtonShowing(idx));
    addObserver(subState, () => controllSnackbarShowing(subState));
  });
}

export function addObserverOnPageMode() {
  addObserver(pageModeState, controllPageMode);
}

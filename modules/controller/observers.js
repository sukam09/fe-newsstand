import { subStateList } from "../store/gridState.js";
import { addObserver } from "../store/observer.js";
import { controllGridSubButtonShowing } from "./gridController.js";
import { controllListSubButtonShowing } from "./listController.js";
import { controllSnackbarShowing } from "./snackbarController.js";

export function addObserverOnIsSub() {
  subStateList.forEach((subState, idx) => {
    addObserver(subState, () => controllGridSubButtonShowing(idx));
    addObserver(subState, () => controllListSubButtonShowing(idx));
    addObserver(subState, () => controllSnackbarShowing(subState));
  });
}

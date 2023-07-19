import { subButtonStateList } from "../store/gridState.js";
import { addObserver, getState } from "../store/observer.js";
import {
  displayAlert,
  controllSubButton,
  displaySnackbar,
} from "./gridController.js";

export function addObserverOnIsSub() {
  subButtonStateList.forEach((subButtonState, idx) => {
    addObserver(subButtonState, () => controllSubButton(idx));
    addObserver(subButtonState, () => {
      const isSub = getState(subButtonState);
      if (isSub) {
        const snackbarDelay = 2300;
        displaySnackbar(snackbarDelay);
      }
    });
  });
}

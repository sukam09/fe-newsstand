import { subButtonStateList } from "../store/gridState.js";
import { addObserver } from "../store/observer.js";
import { alertSubscribe, controllSubButton } from "./gridController.js";

export function addObserverOnIsSub() {
  subButtonStateList.forEach((subButtonState, idx) => {
    addObserver(subButtonState, () => controllSubButton(idx));
    addObserver(subButtonState, alertSubscribe);
  });
}

import { subscribe } from "../../../store/observer.js";
import { setEvents, showSnackBar } from "./SnackBar.js";
import { snackBarMsgState } from "../../../store/storeKey.js";

export const setSnackBar = () => {
  subscribe(snackBarMsgState, showSnackBar);

  setEvents();
};

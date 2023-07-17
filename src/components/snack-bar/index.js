import { subscribe } from "../../observer/observer.js";
import { snackBarMsgState } from "../../store/store.js";
import { setEvents, showSnackBar } from "./SnackBar.js";

export const setSnackBar = () => {
  subscribe(snackBarMsgState, showSnackBar);

  setEvents();
};

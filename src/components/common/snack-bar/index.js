import { useSubscribeAtom } from "../../../store/atom.js";
import { renderSnackBar, setEvents } from "./SnackBar.js";
import { snackBarMsgState } from "../../../store/store.js";

export const setSnackBar = () => {
  useSubscribeAtom(snackBarMsgState, renderSnackBar);

  setEvents();
};

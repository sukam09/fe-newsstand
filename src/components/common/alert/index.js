import { setEvents, showAlert } from "./Alert.js";
import { alertMsgState } from "../../../store/storeKey.js";
import { subscribe } from "../../../store/observer.js";

export const setAlert = () => {
  subscribe(alertMsgState, showAlert);

  setEvents();
};

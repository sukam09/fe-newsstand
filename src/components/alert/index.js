import { setEvents, showAlert } from "./Alert.js";
import { alertMsgState } from "../../store/store.js";
import { subscribe } from "../../observer/observer.js";

export const setAlert = () => {
  subscribe(alertMsgState, showAlert);

  setEvents();
};

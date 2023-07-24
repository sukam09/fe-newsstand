import { renderAlert, setEvents } from "./Alert.js";
import { alertMsgState } from "../../../store/store.js";
import { useSubscribeAtom } from "../../../store/atom.js";

export const setAlert = () => {
  useSubscribeAtom(alertMsgState, renderAlert);

  setEvents();
};

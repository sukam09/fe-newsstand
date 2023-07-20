import { subscribe } from "../../../observer/observer.js";
import { viewOptionState } from "../../../store/store.js";
import { changeActivateState, setEvents } from "./OptionToggleButton.js";

export const setOptionToggleButton = () => {
  subscribe(viewOptionState, changeActivateState);

  setEvents();
};

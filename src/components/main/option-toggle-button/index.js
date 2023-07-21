import { subscribe } from "../../../store/observer.js";
import { viewOptionState } from "../../../store/storeKey.js";
import { changeActivateState, setEvents } from "./OptionToggleButton.js";

export const setOptionToggleButton = () => {
  subscribe(viewOptionState, changeActivateState);

  setEvents();
};

import { subscribe } from "../../observer/observer.js";
import { isListActivateState } from "../../store/store.js";
import { setCurrentView, setEvents } from "./ViewToggleButton.js";

export const setViewToggleButton = () => {
  subscribe(isListActivateState, setCurrentView);

  setEvents();
};

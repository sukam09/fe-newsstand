import { viewState } from "../../../store/store.js";
import { subscribe } from "../../../observer/observer.js";
import { setCurrentView, setEvents } from "./ViewToggleButton.js";

export const setViewToggleButton = () => {
  subscribe(viewState, setCurrentView);

  setEvents();
};

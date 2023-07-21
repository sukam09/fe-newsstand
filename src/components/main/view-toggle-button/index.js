import { viewState } from "../../../store/storeKey.js";
import { subscribe } from "../../../store/observer.js";
import { setCurrentView, setEvents } from "./ViewToggleButton.js";

export const setViewToggleButton = () => {
  subscribe(viewState, setCurrentView);

  setEvents();
};

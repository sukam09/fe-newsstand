import {
  toggleNavigateButtonDisplay,
  setEvents,
  setGridButtonDisplay,
} from "./NavigateButton.js";
import {
  gridPageState,
  subscribeGridPageState,
  subscribeState,
  viewOptionState,
  viewState,
} from "../../../store/storeKey.js";
import { subscribe } from "../../../store/observer.js";

export const setNavigateButton = () => {
  subscribe(gridPageState, setGridButtonDisplay);
  subscribe(viewOptionState, setGridButtonDisplay);
  subscribe(subscribeGridPageState, setGridButtonDisplay);
  subscribe(subscribeState, setGridButtonDisplay);
  subscribe(subscribeState, toggleNavigateButtonDisplay);
  subscribe(viewState, toggleNavigateButtonDisplay);
  subscribe(viewOptionState, toggleNavigateButtonDisplay);

  setEvents();
};

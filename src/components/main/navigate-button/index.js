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
} from "../../../store/store.js";
import { subscribe } from "../../../observer/observer.js";

export const setNavigateButton = () => {
  subscribe(gridPageState, setGridButtonDisplay);
  subscribe(viewOptionState, setGridButtonDisplay);
  subscribe(subscribeGridPageState, setGridButtonDisplay);
  subscribe(subscribeState, setGridButtonDisplay);
  subscribe(viewState, toggleNavigateButtonDisplay);

  setEvents();
};

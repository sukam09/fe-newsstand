import {
  toggleNavigateButtonDisplay,
  setEvents,
  setGridButtonDisplay,
} from "./NavigateButton.js";
import { subscribe } from "../../observer/observer.js";
import { gridPageState, viewState } from "../../store/store.js";

export const setNavigateButton = () => {
  subscribe(gridPageState, setGridButtonDisplay);
  subscribe(viewState, toggleNavigateButtonDisplay);

  setEvents();
};

import { isDarkMode } from "../../../store/storeKey.js";
import { subscribe } from "../../../store/observer.js";
import { setEvents, toggleMode } from "./ModeToggleButton.js";

export const setModeToggleButton = () => {
  subscribe(isDarkMode, toggleMode);

  setEvents();
};

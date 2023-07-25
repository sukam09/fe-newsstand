import { isDarkMode } from "../../../store/store.js";
import { useSubscribeAtom } from "../../../store/atom.js";
import { setEvents, toggleMode } from "./ModeToggleButton.js";

export const setModeToggleButton = () => {
  setEvents();

  useSubscribeAtom(isDarkMode, toggleMode);
};

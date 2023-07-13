import { fillPressIcons } from "./Grid.js";
import { gridPageState, isDarkMode } from "../../store/store.js";
import { subscribe } from "../../observer/observer.js";

export const setGrid = () => {
  subscribe(gridPageState, fillPressIcons);
  subscribe(isDarkMode, fillPressIcons);

  fillPressIcons();
};

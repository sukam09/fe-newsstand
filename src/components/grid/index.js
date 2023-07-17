import {
  gridPageState,
  isDarkMode,
  subscribeState,
} from "../../store/store.js";
import { fillPressIcons } from "./Grid.js";
import { subscribe } from "../../observer/observer.js";

export const setGrid = () => {
  subscribe(gridPageState, fillPressIcons);
  subscribe(isDarkMode, fillPressIcons);
  subscribe(subscribeState, fillPressIcons);

  fillPressIcons();
};

import {
  gridPageState,
  isDarkMode,
  subscribeGridPageState,
  subscribeState,
  viewOptionState,
} from "../../../store/store.js";
import { fillPressIcons } from "./Grid.js";
import { subscribe } from "../../../observer/observer.js";

export const setGrid = () => {
  subscribe(gridPageState, fillPressIcons);
  subscribe(isDarkMode, fillPressIcons);
  subscribe(subscribeState, fillPressIcons);
  subscribe(viewOptionState, fillPressIcons);
  subscribe(subscribeGridPageState, fillPressIcons);

  fillPressIcons();
};

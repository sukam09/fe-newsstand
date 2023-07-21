import {
  gridPageState,
  isDarkMode,
  subscribeGridPageState,
  subscribeState,
  viewOptionState,
} from "../../../store/storeKey.js";
import { fillPressIcons } from "./Grid.js";
import { subscribe } from "../../../store/observer.js";

export const setGrid = () => {
  subscribe(gridPageState, fillPressIcons);
  subscribe(isDarkMode, fillPressIcons);
  subscribe(subscribeState, fillPressIcons);
  subscribe(viewOptionState, fillPressIcons);
  subscribe(subscribeGridPageState, fillPressIcons);

  fillPressIcons();
};

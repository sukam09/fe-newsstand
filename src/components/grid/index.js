import { fillPressIcons } from "./Grid.js";
import { gridPageState } from "../../store/store.js";
import { subscribe } from "../../observer/observer.js";

export const setGrid = () => {
  subscribe(gridPageState, fillPressIcons);

  fillPressIcons();
};

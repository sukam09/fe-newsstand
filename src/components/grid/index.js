import { subscribe } from "../../observer/observer.js";
import { fillPressIcons, setGridButtonDisplay } from "./Grid.js";
import { gridPageState, isListActivateState } from "../../store/store.js";

export const setGrid = () => {
  fillPressIcons();
  subscribe(gridPageState, fillPressIcons);

  subscribe(gridPageState, setGridButtonDisplay);
  subscribe(isListActivateState, setGridButtonDisplay);
};

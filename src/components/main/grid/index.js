import {
  gridPageState,
  isDarkMode,
  subscribeGridPageState,
  subscribeState,
  viewOptionState,
} from "../../../store/store.js";
import { renderGrid } from "./Grid.js";
import { useSubscribeAtom } from "../../../store/atom.js";

export const setGrid = () => {
  renderGrid();

  useSubscribeAtom(gridPageState, renderGrid);
  useSubscribeAtom(isDarkMode, renderGrid);
  useSubscribeAtom(subscribeState, renderGrid);
  useSubscribeAtom(viewOptionState, renderGrid);
  useSubscribeAtom(subscribeGridPageState, renderGrid);
};

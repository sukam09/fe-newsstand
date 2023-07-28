import { setGrid, drawGridArrow } from "../components/gridView.js";
import {
  isLight,
  isGridView,
  isMySubView,
  gridPageIdx,
  subGridPageIdx,
} from "../store/store.js";
import { subscribe } from "./observer.js";

export function initSubscribe() {
  subscribe(subGridPageIdx, setGrid);
  subscribe(subGridPageIdx, drawGridArrow);

  subscribe(gridPageIdx, setGrid);
  subscribe(gridPageIdx, drawGridArrow);

  subscribe(isGridView, setGrid);
  subscribe(isGridView, drawGridArrow);

  subscribe(isMySubView, setGrid);
  subscribe(isMySubView, drawGridArrow);

  subscribe(isLight, setGrid);
}

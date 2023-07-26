import { initState } from "./observer.js";
import { GRID_VIEW, ALL_PRESS } from "../constant.js";

const viewType = initState({ key: "viewType", defaultState: GRID_VIEW });

const viewOption = initState({ key: "viewOption", defaultState: ALL_PRESS });

const listAllPage = initState({ key: "listPage", defaultState: 0 });

const gridAllPage = initState({ key: "gridAllPage", defaultState: 1 });

const isDark = initState({ key: "isDark", defaultState: false });

const subPress = initState({
  key: "subPress",
  defaultState: JSON.parse(localStorage.getItem("press")),
});

const gridSubPage = initState({ key: "gridAllPage", defaultState: 1 });

export {
  viewType,
  listAllPage,
  gridAllPage,
  viewOption,
  isDark,
  subPress,
  // listSubPage,
  gridSubPage,
};

import { initState } from "./observer.js";

const viewType = initState({ key: "viewType", defaultState: "grid" });

const viewOption = initState({ key: "viewOption", defaultState: "all" });

const listAllPage = initState({ key: "listPage", defaultState: 0 });

const gridAllPage = initState({ key: "gridAllPage", defaultState: 1 });

const isDark = initState({ key: "isDark", defaultState: false });

const subPress = initState({
  key: "subPress",
  defaultState: JSON.parse(localStorage.getItem("press")),
});

// const listSubPage = initState({ key: "listPage", defaultState: 0 });

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

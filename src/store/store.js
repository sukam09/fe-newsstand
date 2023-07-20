import { initState } from "../observer/observer.js";

const isDarkMode = initState({
  key: "isDarkMode",
  defaultState: false,
});

const isGrid = initState({
  key: "isGrid",
  defaultState: true,
});

const categoryIdx = initState({
  key: "categoryIdx",
  defaultState: 0,
});

const listPageIdx = initState({
  key: "listPageIdx",
  defaultState: 1,
});

const gridPageIdx = initState({
  key: "gridPageIdx",
  defaultState: 0,
});

const subscribeList = initState({
  key: "subscribeList",
  defaultState: [],
});

export {
  isDarkMode,
  isGrid,
  categoryIdx,
  listPageIdx,
  gridPageIdx,
  subscribeList,
};

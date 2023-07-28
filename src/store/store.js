import { initState } from "../observer/observer.js";

export const isLight = initState({
  key: "isLight",
  defaultState: true,
});

export const isGridView = initState({
  key: "isGridView",
  defaultState: true,
});

export const isMySubView = initState({
  key: "isMySubView",
  defaultState: false,
});

export const subscribedPress = initState({
  key: "subscribedPress",
  defaultState: [],
});

export const subListPageIdx = initState({
  key: "subListPageIdx",
  defaultState: 0,
});

export const subGridPageIdx = initState({
  key: "subGridPageIdx",
  defaultState: 0,
});

export const gridPageIdx = initState({
  key: "gridPageIdx",
  defaultState: 0,
});

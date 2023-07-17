import { initState } from "../observer/observer.js";
import { VIEW_TYPE } from "../constants/constants.js";

const viewState = initState({
  key: "viewState",
  defaultValue: VIEW_TYPE.GRID,
});

const isDarkMode = initState({
  key: "isDarkMode",
  defaultValue: false,
});

const gridPageState = initState({
  key: "gridPageState",
  defaultValue: 0,
});

const listPageState = initState({
  key: "listPageState",
  defaultValue: 0,
});

const categoryState = initState({
  key: "categoryState",
  defaultValue: "",
});

export { viewState, isDarkMode, gridPageState, listPageState, categoryState };

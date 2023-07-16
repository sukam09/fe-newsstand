import { initState } from "../observer/observer.js";

const isListActivateState = initState({
  key: "isListActivateState",
  defaultValue: false,
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

export {
  isListActivateState,
  isDarkMode,
  gridPageState,
  listPageState,
  categoryState,
};

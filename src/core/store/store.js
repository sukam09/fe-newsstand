import { initState } from "../observer/observer.js";

const isDarkMode = initState({
  key: "isDarkMode",
  defaultState: false,
});

const isGrid = initState({
  key: "isGrid",
  defaultState: true,
});

const isSubTab = initState({
  key: "isSubTab",
  defaultState: false,
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
  defaultState: ["datanews", "세계일보"],
});

const isAlertOn = initState({
  key: "isAlertOn",
  defaultState: false,
});

const isSnackOn = initState({
  key: "isSnackOn",
  defaultState: false,
});

const deletePress = initState({
  key: "deletePress",
  defaultState: "",
});

export {
  isDarkMode,
  isGrid,
  isSubTab,
  categoryIdx,
  listPageIdx,
  gridPageIdx,
  subscribeList,
  isAlertOn,
  isSnackOn,
  deletePress,
};

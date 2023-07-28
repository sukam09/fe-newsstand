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

const listIdx = initState({
  key: "listIdx",
  defaultState: { category: 0, list: 1 },
});

const gridPageIdx = initState({
  key: "gridPageIdx",
  defaultState: 0,
});

const subscribeList = initState({
  key: "subscribeList",
  defaultState: JSON.parse(localStorage.getItem("subscribeList")),
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
  gridPageIdx,
  subscribeList,
  isAlertOn,
  isSnackOn,
  deletePress,
  listIdx,
};

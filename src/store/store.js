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

const subscribeState = initState({
  key: "subscribeState",
  defaultValue: [],
});

const snackBarMsgState = initState({
  key: "snackBarMsgState",
  defaultValue: "",
});

const alertMsgState = initState({
  key: "alertMsgState",
  defaultValue: "",
});

export {
  viewState,
  isDarkMode,
  gridPageState,
  listPageState,
  categoryState,
  subscribeState,
  snackBarMsgState,
  alertMsgState,
};

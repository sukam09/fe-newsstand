import { MODE } from "./variable.js";
import { initState } from "../controller/observer.js";

const toggleSubscription = initState({
  key: "toggleSubscription",
  defaultValue: false,
});

const showSnackBar = initState({
  key: "showSnackBar",
  defaultValue: false,
});

const showAlert = initState({
  key: "showAlert",
  defaultValue: false,
});

const toggleDarkMode = initState({
  key: "toggleDarkMode",
  defaultValue: false,
});

const gridCurrentPage = initState({
  key: "gridCurrentPage",
  defaultValue: 0,
});

const listCurrentPage = initState({
  key: "listCurrentPage",
  defaultValue: 0,
});

const currentMode = initState({
  key: "currentMode",
  defaultValue: MODE.GRID_ALL,
});

export { toggleSubscription, showSnackBar, showAlert, toggleDarkMode, gridCurrentPage, listCurrentPage, currentMode };

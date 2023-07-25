import { MODE } from "./variable.js";
import { initState } from "../controller/observer.js";

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

const subscribeNewsNum = initState({
  key: "subscribeNewsNum",
  defaultValue: 0,
});

export { showSnackBar, showAlert, toggleDarkMode, gridCurrentPage, listCurrentPage, currentMode, subscribeNewsNum };

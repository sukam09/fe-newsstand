import { initState } from "../controller/observer.js";

const moveGrid = initState({
  key: "moveGrid",
  defaultValue: false,
});

const moveList = initState({
  key: "moveList",
  defaultValue: false,
});

const toggleView = initState({
  key: "toggleView",
  defaultValue: false,
});

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

export { moveGrid, moveList, toggleView, toggleSubscription, showSnackBar, showAlert, toggleDarkMode };

import { initState } from "../controller/observer.js";

const moveGrid = initState({
  key: "moveGridPage",
  defaultValue: false,
});

const moveList = initState({
  key: "moveListPage",
  defaultValue: false,
});

const toggleView = initState({
  key: "moveView",
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

export { moveGrid, moveList, toggleView, toggleSubscription, showSnackBar, showAlert };

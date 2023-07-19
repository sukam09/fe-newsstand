import { CONSTANT } from "../model/variable.js";

function initSnackBarTimer() {
  const snackBar = document.querySelector(".snack-bar");

  window.setTimeout(() => {
    snackBar.style.display = "none";
  }, CONSTANT.SNACK_BAR_TIME);
}

function initAlertEvent() {
  return 0;
}

export { initSnackBarTimer, initAlertEvent };

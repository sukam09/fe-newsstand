import { MODE, CONSTANT, GLOBAL } from "../model/variable.js";
import { toggleSubscribe } from "./subscribeController.js";
import { moveListMode } from "./tabAndViewerController.js";

function initSnackBarTimer() {
  const snackBar = document.querySelector(".snack-bar");

  GLOBAL.SNACKBAR_TIME_OUT = window.setTimeout(() => {
    snackBar.style.display = "none";
    GLOBAL.CURRENT_MODE = MODE.LIST_SUB;
    moveListMode();
  }, CONSTANT.SNACK_BAR_TIME);
}

function resetSnackBarTimer() {
  document.querySelector(".snack-bar").style.display = "none";
  window.clearTimeout(GLOBAL.SNACKBAR_TIME_OUT);
  GLOBAL.SNACKBAR_TIME_OUT = null;
}

function initAlertEvent() {
  const alert = document.querySelector(".alert");
  const yesBtn = document.querySelector(".yes-btn");
  const noBtn = document.querySelector(".no-btn");

  yesBtn.addEventListener("click", () => {
    alert.style.display = "none";
    toggleSubscribe(GLOBAL.TEMP_TARGET.path);
  });
  noBtn.addEventListener("click", () => {
    alert.style.display = "none";
  });
}

export { initSnackBarTimer, resetSnackBarTimer, initAlertEvent };

import { MODE, CONSTANT, GLOBAL } from "../model/variable.js";
import { toggleSubscribe } from "./subscribeController.js";
import { moveListMode } from "./tabAndViewerController.js";

function initSnackBarTimer() {
  const snackBar = document.querySelector(".snack-bar");

  window.setTimeout(() => {
    snackBar.style.display = "none";
    GLOBAL.CURRENT_MODE = MODE.LIST_SUB;
    moveListMode();
  }, CONSTANT.SNACK_BAR_TIME);
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

export { initSnackBarTimer, initAlertEvent };

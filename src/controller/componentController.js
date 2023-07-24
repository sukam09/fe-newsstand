import { MODE, CONSTANT, GLOBAL } from "../model/variable.js";
import { toggleSubscribe } from "./subscribeController.js";
import { moveListMode } from "./tabAndViewerController.js";
import { isDarkMode } from "../model/model.js";
import { setState } from "./observer.js";
import { toggleDarkMode } from "../model/store.js";

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

function initDarkToggleBtn() {
  const darkToggleBtn = document.querySelector(".dark-mode-btn");

  darkToggleBtn.addEventListener("click", () => {
    const gridLiAll = document.querySelectorAll(".grid-view li");
    gridLiAll.forEach((li) => {
      li.style.backgroundColor = "";
    });

    if (isDarkMode()) {
      document.querySelector("html").className = "";
    } else {
      document.querySelector("html").className = "dark-mode";
    }
    setState(toggleDarkMode, true);
  });
}

export { initSnackBarTimer, resetSnackBarTimer, initAlertEvent, initDarkToggleBtn };

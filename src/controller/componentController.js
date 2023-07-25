import { PATH, MODE, CONSTANT, GLOBAL } from "../model/variable.js";
import { toggleSubscribe } from "./subscribeController.js";
import { isDarkMode } from "../model/model.js";
import { setState, setState2 } from "./observer.js";
import { currentMode, listCurrentPage, toggleDarkMode } from "../model/store.js";

function initSnackBarTimer() {
  const snackBar = document.querySelector(".snack-bar");

  GLOBAL.SNACKBAR_TIME_OUT = window.setTimeout(() => {
    snackBar.style.display = "none";
    setState(listCurrentPage, 0);
    setState(currentMode, MODE.LIST_SUB);
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
      document.querySelector(".dark-mode-btn img").src = PATH.SUN;
    } else {
      document.querySelector("html").className = "dark-mode";
      document.querySelector(".dark-mode-btn img").src = PATH.MOON;
    }
    setState2(toggleDarkMode, true);
  });
}

export { initSnackBarTimer, resetSnackBarTimer, initAlertEvent, initDarkToggleBtn };

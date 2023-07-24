import { getState } from "../store/observer.js";
import { qs } from "../utils.js";

let timeoutId;

export function controllSnackbarShowing(subState) {
  const isSub = getState(subState);
  if (isSub) {
    const snackbarDelay = 300;
    displaySnackbar(snackbarDelay);
  }
}

function displaySnackbar(delay) {
  const $snackbar = qs(".snackbar");
  $snackbar.classList.add("animate");

  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    removeSnackbar();
  }, delay);
}

function removeSnackbar() {
  const $snackbar = qs(".snackbar");
  $snackbar.classList.remove("animate");
}

export function displayAlert() {
  const $alert = qs(".alert");
  $alert.style.display = "flex";
}

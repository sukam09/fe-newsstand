import { register } from "../core/observer/observer.js";
import { subscribeList } from "../core/store/store.js";
import { $ } from "../core/util.js";

const snackbar = $(".snackbar");
const progressLine = $(".progress_line");

function setVisible() {
  snackbar.style.display = "flex";
  progressLine.style.display = "flex";
  setTimeout(() => {
    snackbar.style.display = "none";
    progressLine.style.display = "none";
  }, 5000);
}

export function setSnackbar() {
  register(subscribeList, setVisible);
}

import { register, setState } from "../core/observer/observer.js";
import {
  categoryIdx,
  isAlertOn,
  isSnackOn,
  isSubTab,
} from "../core/store/store.js";
import { $ } from "../core/utils/util.js";

const snackbar = $(".snackbar");
const progressLine = $(".progress_line");

function toggleSnackbar() {
  setInvisible();
  snackbar.offsetWidth;
  progressLine.offsetWidth;
  setVisible();
}

function setVisible() {
  snackbar.style.display = "flex";
  progressLine.style.display = "flex";
}
function setInvisible() {
  snackbar.style.display = "none";
  progressLine.style.display = "none";
}

export function setSnackbar() {
  register(isSnackOn, toggleSnackbar);
  register(isAlertOn, setInvisible);
  progressLine.addEventListener("animationend", () => {
    setInvisible();
    setState(isSubTab, true);
    setState(categoryIdx, 0);
  });
  snackbar.addEventListener("click", setInvisible);
}

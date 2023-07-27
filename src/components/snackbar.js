import { getState, register, setState } from "../core/observer/observer.js";
import {
  isAlertOn,
  isSnackOn,
  isSubTab,
  listIdx,
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
function progressEnd() {
  setInvisible();
  setState(isSubTab, true);
  const currentIdx = getState(listIdx);
  currentIdx.category = 0;
  setState(listIdx, currentIdx);
}

export function setSnackbar() {
  register(isSnackOn, toggleSnackbar);
  register(isAlertOn, setInvisible);
  progressLine.addEventListener("animationend", progressEnd);
  snackbar.addEventListener("click", setInvisible);
}

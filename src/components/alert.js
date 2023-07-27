import { getState, register, setState } from "../core/observer/observer.js";
import {
  deletePress,
  isAlertOn,
  listIdx,
  subscribeList,
} from "../core/store/store.js";
import { $ } from "../core/utils/util.js";

const alert = $(".alert_container");
const yesButton = $(".confirm_button--yes", alert);
const noButton = $(".confirm_button--no", alert);
const pressName = $(".alert_press", alert);

function noButtonClicked() {
  setState(isAlertOn, false);
  setState(deletePress, "");
}

function yesButtonClicked() {
  const currentSubList = getState(subscribeList);
  const deletePressName = getState(deletePress);
  const newSubList = currentSubList.filter((item) => {
    return item != deletePressName;
  });
  setState(subscribeList, newSubList);
  const currentIdx = getState(listIdx);
  currentIdx.category = 0;
  setState(listIdx, currentIdx);
  setState(isAlertOn, false);
}

function toggleVisible() {
  const isAlertPageOn = getState(isAlertOn);
  alert.style.display = isAlertPageOn ? "flex" : "none";
}

function updateAlert() {
  const isAlertPageOn = getState(isAlertOn);
  const deletePressName = getState(deletePress);
  if (isAlertPageOn) {
    pressName.innerHTML = deletePressName;
  }
}
export function setAlert() {
  noButton.addEventListener("click", noButtonClicked);
  yesButton.addEventListener("click", yesButtonClicked);
  register(isAlertOn, toggleVisible);
  register(deletePress, updateAlert);
}

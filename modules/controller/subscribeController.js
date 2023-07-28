import { pressDataState } from "../store/dataState.js";
import { getState, setState } from "../store/observer.js";
import {
  LIST,
  MODE_MY,
  pageModeState,
  pageTypeState,
} from "../store/pageState.js";
import { myPressListState, subStateList } from "../store/subState.js";
import { qs } from "../utils.js";
import { showPage } from "./pageController/pageController.js";
import { displayAlert, removeAlert } from "./popupController.js";

export function updateMyPressList(subState, pressId) {
  const isSub = getState(subState);
  const myPressList = getState(myPressListState);

  if (isSub) {
    myPressList.push(pressId);
    setState(myPressListState, myPressList);
  } else {
    const filtered = myPressList.filter((value) => value !== pressId);
    setState(myPressListState, filtered);
    const pageType = getState(pageTypeState);
    const pageMode = getState(pageModeState);
    if (pageType === LIST && pageMode === MODE_MY) {
      showPage({ pageMode, pageType });
    }
  }
}

export function handleGridUnsubClick({ target }) {
  const targetClass = target.className;
  if (targetClass === "unsub_button") {
    const { pressList } = getState(pressDataState);
    const $pressItem = target.parentNode.parentNode;
    const pressId = parseInt($pressItem.classList[1].split("_")[1]);
    const targetPress = [...pressList].find((press) => press.id === pressId);

    displayAlert({
      name: targetPress.name,
      pressId: targetPress.id,
    });
  }
}

export function handleListUnsubClick({ target }) {
  const targetClass = target.className;
  if (targetClass === "list_unsub_button") {
    const { pressList } = getState(pressDataState);
    const $pressItem = target.parentNode.parentNode;
    const pressId = parseInt($pressItem.classList[0].split("_")[2]);
    const targetPress = [...pressList].find((press) => press.id === pressId);

    displayAlert({
      name: targetPress.name,
      pressId: targetPress.id,
    });
  }
}

export function handleAlertOkButtonClick() {
  const $alert = qs(".alert");
  const $targetPressDiv = $alert.querySelector(".target_press");
  const pressId = parseInt($targetPressDiv.classList[1]);
  const subState = subStateList[pressId];
  setState(subState, false);
  removeAlert();
}

export function handleAlertCancelButtonClick() {
  removeAlert();
}

import { getState } from "../../../store/observer.js";
import { snackBarMsgState } from "../../../store/storeKey.js";
import { _querySelector } from "../../../utils/my-query-selector.js";

const $snackBar = _querySelector(".snackbar");
const $snackBarInner = _querySelector(".snackbar-body", $snackBar);
const $snackBarProgress = _querySelector(".snackbar-progress", $snackBar);

const showSnackBar = () => {
  const content = getState(snackBarMsgState);

  const isInvisible = $snackBar.classList.contains("invisible");

  $snackBarInner.textContent = content;

  if (isInvisible) {
    invisibleToVisible();
  } else {
    visibleToInvisible();
    setTimeout(invisibleToVisible, 0);
  }
};

const visibleToInvisible = () => {
  const classList = $snackBar.classList;

  classList.replace("visible", "invisible");
};
const invisibleToVisible = () => {
  const classList = $snackBar.classList;

  classList.replace("invisible", "visible");
};

const setEvents = () => {
  $snackBar.addEventListener("click", visibleToInvisible);
  $snackBarProgress.addEventListener("animationend", visibleToInvisible);
};

export { showSnackBar, setEvents };

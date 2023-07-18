import { getState } from "../../../observer/observer.js";
import { snackBarMsgState } from "../../../store/store.js";
import { _querySelector } from "../../../utils/my-query-selector.js";

const $snackBar = _querySelector(".snackbar");
const $snackBarInner = _querySelector(".snackbar-body", $snackBar);
const $snackBarProgress = _querySelector(".snackbar-progress", $snackBar);

const showSnackBar = () => {
  const content = getState(snackBarMsgState);

  const classList = $snackBar.classList;

  $snackBarInner.textContent = content;
  if (classList.contains("invisible")) {
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

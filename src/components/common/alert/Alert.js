import {
  alertMsgState,
  selectedSubscribeState,
  snackBarMsgState,
  subscribeGridPageState,
  subscribeState,
} from "../../../store/storeKey.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { getState, setState } from "../../../store/observer.js";
import { NEWS_COUNT, SUBSCRIBE_MESSAGE } from "../../../constants/constants.js";

const $snackBar = _querySelector(".snackbar");
const $alert = _querySelector(".alert");
const $alertInner = _querySelector(".alert-font-activate", $alert);
const $alertButtons = _querySelectorAll("button", $alert);
const $unSubscribeButton = $alertButtons[0];
const $closeButton = $alertButtons[1];

const showAlert = () => {
  const content = getState(alertMsgState);

  $alertInner.firstChild.textContent = content;

  invisibleToVisible();
};

const visibleToInvisible = () => {
  const classList = $alert.classList;
  const snackClassList = $snackBar.classList;

  snackClassList.replace("visible", "invisible");
  classList.replace("visible", "invisible");
};
const invisibleToVisible = () => {
  const classList = $alert.classList;

  classList.replace("invisible", "visible");
};

const handleUnSubscribeButtonClick = () => {
  const subscribeList = getState(subscribeState);
  const subscribeItem = getState(alertMsgState);

  const itemIndex = subscribeList.indexOf(subscribeItem);

  const updateArray = subscribeList.filter((_, idx) => idx !== itemIndex);
  const selectedSubscribeItem =
    updateArray[itemIndex % (subscribeList.length - 1)];

  setState(selectedSubscribeState, selectedSubscribeItem);
  setState(subscribeState, updateArray);

  if (updateArray.length % NEWS_COUNT === 0) {
    const currentPage = getState(subscribeGridPageState);

    currentPage !== 0 && setState(subscribeGridPageState, currentPage - 1);
  }

  visibleToInvisible();
  setState(snackBarMsgState, SUBSCRIBE_MESSAGE.DELETE);
};

const handleCloseButtonClick = () => {
  visibleToInvisible();
};

const setEvents = () => {
  $unSubscribeButton.addEventListener("click", handleUnSubscribeButtonClick);
  $closeButton.addEventListener("click", handleCloseButtonClick);
};

export { showAlert, setEvents };

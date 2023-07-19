import {
  alertMsgState,
  snackBarMsgState,
  subscribeGridPageState,
  subscribeState,
} from "../../../store/store.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { NEWS_COUNT } from "../../../constants/constants.js";
import { getState, setState } from "../../../observer/observer.js";

const $snackBar = _querySelector(".snackbar");
const $alert = _querySelector(".alert");
const $alertInner = _querySelector(".alert-font-activate", $alert);
const $alertButtons = _querySelectorAll("button", $alert);
const $unSubscribeButton = $alertButtons[0];
const $closeButton = $alertButtons[1];

const showAlert = () => {
  const content = getState(alertMsgState);

  const classList = $alert.classList;

  $alertInner.firstChild.textContent = content;

  classList.contains("invisible") ? invisibleToVisible() : visibleToInvisible();
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

  setState(subscribeState, updateArray);
  if (updateArray.length % NEWS_COUNT === 0) {
    const currentPage = getState(subscribeGridPageState);

    currentPage !== 0 && setState(subscribeGridPageState, currentPage - 1);
  }
  setState(snackBarMsgState, "내가 구독한 언론사에서 삭제되었습니다.");

  visibleToInvisible();
};

const handleCloseButtonClick = () => {
  visibleToInvisible();
};
const setEvents = () => {
  $unSubscribeButton.addEventListener("click", handleUnSubscribeButtonClick);
  $closeButton.addEventListener("click", handleCloseButtonClick);
};

export { showAlert, setEvents };

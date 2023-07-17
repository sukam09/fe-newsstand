import {
  alertMsgState,
  snackBarMsgState,
  subscribeState,
} from "../../store/store.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../utils/my-query-selector.js";
import { getState, setState } from "../../observer/observer.js";

const $alert = _querySelector(".alert");
const $alertInner = _querySelector(".alert-font-activate", $alert);
const $alertButtons = _querySelectorAll("button", $alert);
const $unSubscribeButton = $alertButtons[0];
const $closeButton = $alertButtons[1];

const showAlert = () => {
  //todo alert
  const content = getState(alertMsgState);

  const classList = $alert.classList;

  $alertInner.firstChild.textContent = content;

  if (classList.contains("invisible")) {
    invisibleToVisible();
  } else {
    visibleToInvisible();
  }
};

const visibleToInvisible = () => {
  const classList = $alert.classList;

  classList.replace("visible", "invisible");
};
const invisibleToVisible = () => {
  const classList = $alert.classList;

  classList.replace("invisible", "visible");
};

const handleUnSubscribeButtonClick = () => {
  const subList = getState(subscribeState);
  const subItem = getState(alertMsgState);

  const itemIndex = subList.indexOf(subItem);
  const updateArray = subList.filter((_, idx) => idx !== itemIndex);

  // 구독 삭제 이벤트 -> alert 해지합니다 버튼에 넣어야함
  setState(subscribeState, updateArray);
  setState(snackBarMsgState, "내가 구독한 언론사에서 삭제되었습니다.");

  console.log(getState(subscribeState));

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

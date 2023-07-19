import {
  alertMsgState,
  snackBarMsgState,
  subscribeState,
  viewState,
} from "../../../store/store.js";
import { checkIsGridView } from "../../../utils/utils.js";
import { getState, setState } from "../../../observer/observer.js";
import { _querySelector } from "../../../utils/my-query-selector.js";

const createNormalSubscribeButton = (name) => {
  const $button = document.createElement("button");

  $button.className = "subscribe-btn";
  $button.name = name;
  $button.addEventListener("click", handleSubscribeButtonClick(name));
  $button.innerHTML = `
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z"
        fill="#879298"
      />
    </svg>
    <div class="available-medium12">구독하기</div>`;

  return $button;
};

const createUnSubscribeButton = (name) => {
  const $button = document.createElement("button");

  $button.name = name;
  $button.addEventListener("click", handleSubscribeButtonClick(name));
  $button.className = "subscribe-btn";
  $button.innerHTML = `
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z"
          fill="#879298"
        />
      </svg>
      <div class="available-medium12">해지하기</div>`;

  return $button;
};

const createCircleSubscribeButton = (name) => {
  const $button = document.createElement("button");

  $button.name = name;
  $button.addEventListener("click", handleSubscribeButtonClick(name));
  $button.className = "subscribe-circle-btn";
  $button.innerHTML = `
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z"
        fill="#879298"
      />
    </svg>`;

  return $button;
};

const createSubscribeButton = (name) => {
  const currentView = getState(viewState);

  const isSubscribed = checkSubscribe(name);
  const isGridView = checkIsGridView();

  if (isSubscribed) {
    if (isGridView) {
      return createUnSubscribeButton(name);
    }
    return createCircleSubscribeButton(name);
  } else {
    return createNormalSubscribeButton(name);
  }
};

const handleSubscribeButtonClick = (subItem) => () => {
  const subList = getState(subscribeState);

  const isSubscribed = checkSubscribe(subItem);

  if (isSubscribed) {
    setState(alertMsgState, subItem);
  } else {
    setState(subscribeState, [...subList, subItem]);
    setState(snackBarMsgState, "내가 구독한 언론사에 추가되었습니다.");
  }
};

const checkSubscribe = (subItem) => {
  const subList = getState(subscribeState);

  const result = subList.includes(subItem);

  return result;
};

export { createSubscribeButton };

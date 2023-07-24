import { dispatcher } from "../../store/dispatcher.js";
import { store } from "../../store/store.js";
import alert from "../Alert/Alert.js";
import snackbar from "../SnackBar/SnackBar.js";

export const makeSubscribeBtn = (current_page, agencies) => {
  const isSubscribed = store.subscriptions.find(
    (item) => item.name === agencies[current_page].name
  ).subscribe;

  const $press_subscribe = document.createElement("button");
  $press_subscribe.className = "press-subscribe";
  $press_subscribe.id = `${agencies[current_page].name}`;

  const sr_only = document.createElement("span");
  sr_only.className = "screen-reader-only";
  sr_only.innerText = isSubscribed ? "해지하기" : "구독하기";

  const icon = document.createElement("img");
  icon.className = isSubscribed ? "minus" : "plus";
  icon.src = isSubscribed ? "./asset/icon/closed.svg" : "./asset/icon/plus.svg";
  icon.alt = isSubscribed ? "minus" : "plus";

  const $subscribe = document.createElement("div");
  $subscribe.className = "subscribe-text";
  $subscribe.innerText = isSubscribed ? "" : "구독하기";

  $press_subscribe.appendChild(sr_only);
  $press_subscribe.appendChild(icon);
  $press_subscribe.appendChild($subscribe);

  $press_subscribe.addEventListener("click", ({ target }) => {
    const isSubscribed = store.subscriptions.find(
      (item) => item.name === target.id
    ).subscribe;

    const message = isSubscribed
      ? `${agencies[current_page].name}`
      : "내가 구독한 언론사에 추가되었습니다.";

    if (isSubscribed) {
      alert.show(message);
      alert.setState(target.id, isSubscribed, current_page, agencies);
    } else {
      snackbar.show(message);
      dispatcher({
        type: "TOGGLE_SUBSCRIPTIONS",
        name: agencies[current_page].name,
        value: !isSubscribed,
      });
    }
    updateSubscribeButton(agencies[current_page].name);
  });
  return $press_subscribe;
};

export const updateSubscribeButton = (name) => {
  const btn = document.getElementById(`${name}`);
  if (btn) {
    const data = store.subscriptions.find((item) => item.name === name);
    const icon = btn.querySelector("img");
    const $subscribe = btn.querySelector(".subscribe-text");
    const sr_only = btn.querySelector(".screen-reader-only");

    icon.alt = data.subscribe ? "minus" : "plus";
    icon.src = data.subscribe
      ? "./asset/icon/closed.svg"
      : "./asset/icon/plus.svg";
    $subscribe.innerText = data.subscribe ? "" : "구독하기";
    sr_only.innerText = data.subscribe ? "해지하기" : "구독하기";
  }
};

import { dispatcher } from "../../store/dispatcher.js";
import { store } from "../../store/store.js";
import { Alert } from "../Alert/Alert.js";
import { SnackBar } from "../SnackBar/SnackBar.js";

// 구독 or 해지 버튼 누르고 버튼 다시 렌더시키는 것 필요

export const makeGrid = (data) => {
  const li = document.createElement("li");

  const img = document.createElement("img");
  img.src = data.logo;

  li.appendChild(img);

  li.addEventListener("mouseenter", () => {
    li.appendChild(createButton(data)); // Show the button when hovering
  });

  li.addEventListener("mouseleave", () => {
    const btn = document.querySelector(`#${data.name}`);
    if (btn) li.removeChild(btn); // Remove the button when not hovering
  });

  document.querySelector(".agency-grid").appendChild(li);
};

const alert = new Alert();
const snackbar = new SnackBar();

// 호버 시 나타날 구독 or 해지 버튼 생성

const createButton = (data) => {
  const btn = document.createElement("button");

  const isSubscribed = store.subscriptions.find(
    (item) => item.name === data.name
  ).subscribe;

  const sr_only = document.createElement("span");
  sr_only.className = "screen-reader-only";
  sr_only.innerText = isSubscribed ? "해지하기" : "구독하기";

  const icon = document.createElement("img");
  icon.alt = isSubscribed ? "minus" : "plus";
  icon.src = isSubscribed ? "./asset/icon/closed.svg" : "./asset/icon/plus.svg";
  icon.className = isSubscribed ? "plus" : "minus";

  const $subscribe = document.createElement("div");
  $subscribe.className = "subscribe-text";
  $subscribe.innerText = isSubscribed ? "해지하기" : "구독하기";

  btn.appendChild(sr_only);
  btn.appendChild(icon);
  btn.appendChild($subscribe);

  btn.className = "agency-btn-hover";
  btn.id = `${data.name}`;

  btn.addEventListener("click", (e) => {
    const message = store.subscriptions.find(
      (item) => item.name === e.target.id
    ).subscribe
      ? `${data.name}을(를) 구독해지 하시겠습니까?`
      : `내가 구독한 언론사에 추가되었습니다.`;

    if (
      store.subscriptions.find((item) => item.name === e.target.id)
        .subscribe === true
    ) {
      alert.show(message);
    } else {
      snackbar.show(message);
    }
    dispatcher({
      type: "TOGGLE_SUBSCRIPTIONS",
      name: e.target.id,
      value: !store.subscriptions.find((item) => item.name === e.target.id)
        .subscribe,
    });
    updateButton(data.name);
  });
  return btn;
};

// 구독 or 해지 버튼 클릭 시, dispatcher를 통해 구독 상태를 변화 시키고 구독 상태에 따라 버튼을 변경하는 함수

const updateButton = (name) => {
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
    $subscribe.innerText = data.subscribe ? "해지하기" : "구독하기";
    sr_only.innerText = data.subscribe ? "해지하기" : "구독하기";
  }
};

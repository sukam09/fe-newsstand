import { DARK_MODE, LIGHT_MODE, LOGO_PATH } from "../../constants/constant.js";
import { dispatcher } from "../../store/dispatcher.js";
import { store } from "../../store/store.js";
import { absoluteFilePath, ce, qs } from "../../utils/utils.js";
import alert from "../Alert/Alert.js";
import snackbar from "../SnackBar/SnackBar.js";

// 구독 or 해지 버튼 누르고 버튼 다시 렌더시키는 것 필요

export const makeGrid = (data) => {
  const li = ce("li");
  li.className = data.name;

  if (data.logo !== "") {
    const img = ce("img");
    img.src = store.isDarkMode
      ? absoluteFilePath(`${LOGO_PATH}/${DARK_MODE}/${data.logo}`)
      : absoluteFilePath(`${LOGO_PATH}/${LIGHT_MODE}/${data.logo}`);

    li.appendChild(img);
    if (data.logo) {
      li.addEventListener("mouseenter", () => {
        li.appendChild(createButton(data));
      });

      li.addEventListener("mouseleave", () => {
        const btn = qs(`#${data.name}`);
        if (btn) li.removeChild(btn);
      });
    }
  }
  qs(".agency-grid").appendChild(li);
};

// 호버 시 나타날 구독 or 해지 버튼 생성

const createButton = (data) => {
  const btn = ce("button");

  const isSubscribed = store.subscriptions.find(
    (item) => item.name === data.name
  ).subscribe;

  const sr_only = ce("span");
  sr_only.className = "screen-reader-only";
  sr_only.innerText = isSubscribed ? "해지하기" : "구독하기";

  const icon = ce("img");
  icon.alt = isSubscribed ? "minus" : "plus";
  icon.src = isSubscribed ? "./asset/icon/closed.svg" : "./asset/icon/plus.svg";
  icon.className = isSubscribed ? "plus" : "minus";

  const $subscribe = ce("div");
  $subscribe.className = "subscribe-text";
  $subscribe.innerText = isSubscribed ? "해지하기" : "구독하기";

  btn.appendChild(sr_only);
  btn.appendChild(icon);
  btn.appendChild($subscribe);

  btn.className = "agency-btn-hover";
  btn.id = `${data.name}`;

  btn.addEventListener("click", (e) => {
    const isSubscribed = store.subscriptions.find(
      (item) => item.name === e.target.id
    ).subscribe;

    const message = isSubscribed
      ? `${data.name}`
      : `내가 구독한 언론사에 추가되었습니다.`;

    const $snackbar = qs(".snackbar");

    if (isSubscribed) {
      if ($snackbar.style.display == "block") {
        snackbar.cancelTimer();
        snackbar.close();
      }
      alert.show(message);
      alert.setState(e.target.id, isSubscribed);
    } else {
      dispatcher({
        type: "TOGGLE_SUBSCRIPTIONS",
        name: e.target.id,
        value: !isSubscribed,
      });
      snackbar.show(message);
    }
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

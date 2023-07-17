// Grid 내에 list를 추가

import { dispatcher } from "../../store/dispatcher.js";
import { store } from "../../store/store.js";

// 구독 or 해지 버튼 누르고 버튼 다시 렌더시키는 것 필요

// const render = () => {
//   const $agency_btn_hover = document.querySelector(".agency-btn-hover");
// };

export const makeGrid = (data) => {
  const li = document.createElement("li");

  const img = document.createElement("img");
  li.appendChild(img);

  const btn = document.createElement("button");

  const sr_only = document.createElement("span");
  sr_only.className = "screen-reader-only";
  sr_only.innerText = data.subscribe ? "해지하기" : "구독하기";

  if (store.subscriptions.find((item) => item.name === data.name).subscribe) {
    const $minus_btn = document.createElement("img");
    $minus_btn.className = "minus";
    $minus_btn.src = "./asset/icon/closed.svg";
    $minus_btn.alt = "minus";

    const $subscribe = document.createElement("div");
    $subscribe.className = "subscribe-text";
    $subscribe.innerText = "해지하기";

    btn.appendChild(sr_only);
    btn.appendChild($minus_btn);
    btn.appendChild($subscribe);
  } else {
    const $plus_btn = document.createElement("img");
    $plus_btn.className = "plus";
    $plus_btn.src = "./asset/icon/plus.svg";
    $plus_btn.alt = "plus";

    const $subscribe = document.createElement("div");
    $subscribe.className = "subscribe-text";
    $subscribe.innerText = "구독하기";

    btn.appendChild(sr_only);
    btn.appendChild($plus_btn);
    btn.appendChild($subscribe);
  }

  btn.className = "agency-btn-hover";
  btn.id = data.name;

  li.addEventListener("mouseenter", () => {
    li.appendChild(btn);
  });

  li.addEventListener("mouseleave", () => {
    li.removeChild(btn);
  });

  btn.addEventListener("click", (e) => {
    dispatcher({
      type: "TOGGLE_SUBSCRIPTIONS",
      name: e.target.id,
      value: !store.subscriptions.find((item) => item.name === e.target.id)
        .subscribe,
    });
    console.log(store);
  });

  img.src = data.logo;

  document.querySelector(".agency-grid").appendChild(li);
};

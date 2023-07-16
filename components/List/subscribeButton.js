export const makeSubscribeBtn = (agency) => {
  const $press_subscribe = document.createElement("button");
  $press_subscribe.className = "press-subscribe";

  const sr_only = document.createElement("span");
  sr_only.className = "screen-reader-only";
  sr_only.innerText = agency.subscribe ? "해지하기" : "구독하기";

  const $plus_btn = document.createElement("img");
  $plus_btn.className = "plus";
  $plus_btn.src = "./asset/icon/plus.svg";
  $plus_btn.alt = "plus";

  const $subscribe = document.createElement("div");
  $subscribe.className = "subscribe-text";
  $subscribe.innerText = "구독하기";

  $press_subscribe.appendChild(sr_only);
  $press_subscribe.appendChild($plus_btn);
  $press_subscribe.appendChild($subscribe);

  return $press_subscribe;
};

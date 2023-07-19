import { PATH } from "../model/variable.js";
import { checkSubscribe } from "../controller/subscribeController.js";

function drawSubscribeBtn(src) {
  const isSubscribe = checkSubscribe(src);

  const subscribeBtn = document.createElement("button");
  subscribeBtn.className = "list-sub-btn";
  const dom = `
    <img src="${isSubscribe ? PATH.X : PATH.PLUS}">
    <span class="available-medium12">${isSubscribe ? "해지하기" : "구독하기"}</span>`;
  subscribeBtn.innerHTML += dom;

  return subscribeBtn;
}

export { drawSubscribeBtn };

import { clickSubscribeBtn } from "./subscribeController.js";

function initListEvent() {
  const listSubscribeBtn = document.querySelector(".list-view .list-sub-btn");

  listSubscribeBtn.addEventListener("click", (event) => {
    const targetSrc = document.querySelector(".list-press-icon").src;
    clickSubscribeBtn(targetSrc);
  });
}

export { initListEvent };

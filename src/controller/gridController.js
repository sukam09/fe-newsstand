import { drawSubscribeBtn } from "../view/subscribe.js";
import { initSubscribeBtnEvnet } from "./subscribeController.js";
import { getState } from "./observer.js";
import { toggleDarkMode } from "../model/store.js";

function initGridEvent() {
  const gridLiAll = document.querySelectorAll(".grid-row li");
  gridLiAll.forEach((gridLi) => {
    gridLi.addEventListener("mouseenter", (event) => {
      gridHoverIn(event);
    });
    gridLi.addEventListener("mouseleave", (event) => {
      gridHoverOut(event);
    });
  });

  return 0;
}

function gridHoverIn(event) {
  if (event.target.firstChild.src.slice(-3) !== "svg") return;

  event.target.style.backgroundColor = getState(toggleDarkMode) ? "#4b5966" : "#f5f7f9";
  const subscribeBtn = drawSubscribeBtn(event.target.firstChild.src);
  event.target.appendChild(subscribeBtn);
  event.target.querySelector(".press-logo").style.display = "none";
  initSubscribeBtnEvnet(subscribeBtn);
}

function gridHoverOut(event) {
  if (event.target.firstChild.src.slice(-3) !== "svg") return;

  event.target.style.backgroundColor = getState(toggleDarkMode) ? "#14212b" : "#ffffff";
  event.target.querySelector(".list-sub-btn").remove();
  event.target.querySelector(".press-logo").style.display = "block";
}

export { initGridEvent };

import { LIST_PAGE, VIEW } from "../../model/global.js";
import { actionCreator, store } from "../../model/store.js";
import { news_data } from "../../view/grid.js";
import { news } from "../../view/list.js";

import { AlertHandler } from "./alert.js";
import { GRID, LIST, SUBSCRIBE } from "../../constant.js";

function SubscribeBtnEventHandler(e, btnElement, pressID) {
  let pressData;
  if (VIEW.layout === LIST) {
    const index = VIEW.tab === SUBSCRIBE ? LIST_PAGE.category : LIST_PAGE.page;

    pressData = news[index];
    pressID = news[index].ID;
  } else {
    pressData = news_data.find((press) => press.ID === pressID);
  }

  const isSubscribe = store.getIsSubscribe(pressID);
  //구독하기
  if (!isSubscribe) {
    //구독 배열에 저장
    store.dispatch(actionCreator(SUBSCRIBE, { press: pressData }));
    btnElement.querySelector(".subscribe-text").innerHTML = "해지하기";
    btnElement.querySelector(".plus-btn").setAttribute("src", "../../asset/button/closed.png");
  } else {
    //해지하기
    const main = document.querySelector("main");
    const snackBar = document.querySelector("main .snack-bar");
    if (snackBar) {
      main.removeChild(snackBar);
    }
    AlertHandler({ pressName: pressData.name, pressData });
  }
}

function EventHandlerRegister({ btnElement, pressID }) {
  btnElement?.addEventListener("click", (e) => SubscribeBtnEventHandler(e, btnElement, pressID));
}

export function subscribeButton(element) {
  function createSubscribeDiv(li, pressID) {
    let btnElement;
    const isSubscribe = store.getIsSubscribe(pressID);

    const UnSubscribeModeDiv = `
      <div class="subscribe-wrap">
        <button class="subscribe-btn">
            <img class="plus-btn" src="../../asset/button/${isSubscribe ? "closed" : "plus"}.png">
            <span class="subscribe-text available-medium12">${isSubscribe ? "해지하기" : "구독하기"}</span>
        </button>
      </div>`;

    li.innerHTML += UnSubscribeModeDiv;
    btnElement = li.querySelector(".subscribe-btn");
    EventHandlerRegister({ btnElement, pressID });
  }
  function pressMouseOver(li) {
    const ID = li.getAttribute("data-id");

    const subscribeMode = li.querySelector("div");
    if (!subscribeMode) {
      createSubscribeDiv(li, ID);
      const pressLogo = li.querySelector(".press-logo");
      pressLogo.classList.add("hidden");
    }
  }
  function pressMouseOut(li) {
    const subscribeModeDiv = li.querySelector("div");

    if (subscribeModeDiv) {
      li.removeChild(subscribeModeDiv);
      const pressLogo = li.querySelector(".press-logo");
      pressLogo.classList.remove("hidden");
    }
  }

  if (VIEW.layout === GRID) {
    element.addEventListener("mouseenter", pressMouseOver.bind(this, element));
    element.addEventListener("mouseleave", pressMouseOut.bind(this, element));
  } else {
    const btnElement = document.querySelector(".list .press-news-wrap .press-info .subscribe-btn");
    EventHandlerRegister({ btnElement });
  }
}

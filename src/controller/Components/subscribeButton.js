import { LIST_PAGE, VIEW } from "../../model/global.js";
import { actionCreator, store } from "../../model/store.js";
import { updateCategory } from "../../view/field.js";
import { news_data, renderGrid } from "../../view/grid.js";
import { news, renderList, updateList } from "../../view/list.js";
import { timerId } from "../timer.js";

function snackBarForceDisappear() {
  const main = VIEW.layout === "grid" ? document.querySelector(".grid") : document.querySelector(".list");
  const snackBarElement = main.querySelector(".snack-bar");
  if (snackBarElement) {
    main.removeChild(snackBarElement);
  }
}

function snackBar() {
  const snackBarElement = document.createElement("div");
  snackBarElement.className = "snack-bar";
  snackBarElement.innerHTML = `<span class="snack-bar-text display-medium16">내가 구독한 언론사에 추가되었습니다.</span>`;
  const main = VIEW.layout === "grid" ? document.querySelector(".grid") : document.querySelector(".list");
  main.appendChild(snackBarElement);

  setTimeout(() => {
    if (snackBarElement) {
      main.removeChild(snackBarElement);
    }
  }, 5000);
}

function createAlert(pressName) {
  const alertElement = document.createElement("div");
  alertElement.className = "unsubscribe-alert";
  alertElement.innerHTML = `
            <div class="alert-contents">
              <span class="alert-contents-text display-bold16">${pressName}<span class="display-medium16"> 을(를)</span> </span>
              <span class="alert-contents-text display-medium16">구독해지하시겠습니까?</span>
            </div>
            <div class="alert-buttons">
                <div class="each-button confirm-unsubscribe available-medium16">예, 해지합니다</div>
                <div class="each-button reject available-medium16">아니오</div>
            </div>
        `;

  const main = VIEW.layout === "grid" ? document.querySelector(".grid") : document.querySelector(".list");
  main.appendChild(alertElement);

  return alertElement;
}
function AlertHandler({ pressName, pressData }) {
  snackBarForceDisappear();
  const alertElement = createAlert(pressName);
  const confirmBtn = alertElement.querySelector(".confirm-unsubscribe");
  const rejectBtn = alertElement.querySelector(".reject");

  confirmBtn.addEventListener("click", async () => {
    store.dispatch(actionCreator("unsubscribe", { press: pressData }));

    const main = VIEW.layout === "grid" ? document.querySelector(".grid") : document.querySelector(".list");
    main.removeChild(alertElement);

    if (VIEW.layout === "grid") {
      renderGrid();
    } else {
      const listBtn = document.querySelector(".press-news-wrap .press-info .subscribe-btn");
      listBtn.querySelector(".subscribe-text").innerHTML = "구독하기";
      listBtn.querySelector(".plus-btn").setAttribute("src", "../../../../asset/button/plus.png");
      if (VIEW.tab === "subscribe") {
        //렌더
        if (news.length - 1 === LIST_PAGE.category) {
          LIST_PAGE.setCategory(0);
          renderList();
        } else {
          renderList();
          updateCategory();
          updateList();
        }
      }
    }
  });

  rejectBtn.addEventListener("click", () => {
    const main = VIEW.layout === "grid" ? document.querySelector(".grid") : document.querySelector(".list");
    main.removeChild(alertElement);
  });
}

function SubscribeBtnEventHandler(e, btnElement, pressID) {
  let pressData;
  let changeSubscribeView;
  if (VIEW.layout === "list") {
    const index = VIEW.tab === "subscribe" ? LIST_PAGE.category : LIST_PAGE.page;

    pressData = news[index];
    pressID = news[index].ID;
    changeSubscribeView = true;
  } else {
    pressData = news_data.find((press) => press.ID === pressID);
  }

  const isSubscribe = store.getIsSubscribe(pressID);
  if (!isSubscribe) {
    snackBar(e);
    store.dispatch(actionCreator("subscribe", { press: pressData }));
    if (VIEW.layout === "list") {
      // 내가 구독한 언론사 페이지로 이동
      if (timerId) {
        clearInterval(timerId);
      }
      LIST_PAGE.category = store.getSubscribe().length - 1;
      VIEW.setTab("subscribe", changeSubscribeView);
    } else {
      btnElement.querySelector(".subscribe-text").innerHTML = "해지하기";
      btnElement.querySelector(".plus-btn").setAttribute("src", "../../asset/button/closed.png");
    }
  } else {
    const grid = document.querySelector(".grid");
    const snackBar = document.querySelector(".grid .snack-bar");
    if (snackBar) {
      grid.removeChild(snackBar);
    }
    AlertHandler({ pressName: pressData.name, pressData });
  }
}

function EventHandlerRegister({ btnElement, pressID }) {
  btnElement?.addEventListener("click", (e) => SubscribeBtnEventHandler(e, btnElement, pressID));
}

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

export function subscribeButton(element) {
  if (VIEW.layout === "grid") {
    element.addEventListener("mouseenter", pressMouseOver.bind(this, element));
    element.addEventListener("mouseleave", pressMouseOut.bind(this, element));
  } else {
    const btnElement = document.querySelector(".list .press-news-wrap .press-info .subscribe-btn");
    EventHandlerRegister({ btnElement });
  }
}

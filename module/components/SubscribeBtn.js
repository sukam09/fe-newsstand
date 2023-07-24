import { store, actionCreator } from "../../store.js";
import { updateGrid, FetchData } from "../view/GridView.js";
import { VIEW_MODE, SUBSCRIBE, LIST_PAGE } from "../../global.js";
import { GRID, LIST } from "./LayoutBtn.js";

function snackBarForceDisappear() {
  const main = VIEW_MODE.CURRENT_LAYOUT === GRID ? document.querySelector(".grid") : document.querySelector(".list");
  const snackBarElement = main.querySelector(".snack-bar");
  if (snackBarElement) {
    main.removeChild(snackBarElement);
  }
}

function snackBar() {
  const snackBarElement = document.createElement("div");
  snackBarElement.className = "snack-bar";
  snackBarElement.innerHTML = `<span class="snack-bar-text display-medium16">내가 구독한 언론사에 추가되었습니다.</span>`;
  const main = VIEW_MODE.CURRENT_LAYOUT === GRID ? document.querySelector(".grid") : document.querySelector(".list");
  main.appendChild(snackBarElement);

  setTimeout(() => {
    main.removeChild(snackBarElement);
  }, 5000);
}

function createAlert(pressName) {
  const alertElement = document.createElement("div");
  alertElement.className = "unsubscribe-alert";
  alertElement.innerHTML = `
          <div class="alert-contents">
            <span class="alert-contents-text display-bold16">${pressName}<span class="display-medium16">을(를)</span> </span>
            <span class="alert-contents-text display-medium16">구독해지하시겠습니까?</span>
          </div>
          <div class="alert-buttons">
              <div class="each-button confirm-unsubscribe available-medium16">예, 해지합니다</div>
              <div class="each-button reject available-medium16">아니오</div>
          </div>
      `;

  const main = VIEW_MODE.CURRENT_LAYOUT === GRID ? document.querySelector(".grid") : document.querySelector(".list");
  main.appendChild(alertElement);

  return alertElement;
}
function AlertHandler(pressID, press_names) {
  let pressName;
  if (VIEW_MODE.CURRENT_LAYOUT === GRID) {
    pressName = press_names[pressID - 1];
  } else {
    //리스트뷰
    pressName = press_names[LIST_PAGE.CURRENT_CATEGORY][LIST_PAGE.CURRENT_PAGE - 1];
  }
  snackBarForceDisappear();
  const alertElement = createAlert(pressName);
  const confirmBtn = alertElement.querySelector(".confirm-unsubscribe");
  const rejectBtn = alertElement.querySelector(".reject");

  confirmBtn.addEventListener("click", async () => {
    store.dispatch(actionCreator("unsubscribe", { pressID }));

    const main = VIEW_MODE.CURRENT_LAYOUT === GRID ? document.querySelector(".grid") : document.querySelector(".list");
    main.removeChild(alertElement);

    if (VIEW_MODE.CURRENT_LAYOUT === GRID && VIEW_MODE.CURRENT_TAB === SUBSCRIBE) {
      await FetchData();
      updateGrid();
    } else if (VIEW_MODE.CURRENT_LAYOUT === LIST) {
      const listBtn = document.querySelector(".press-news-wrap .press-info .subscribe-btn");
      listBtn.querySelector(".subscribe-text").innerHTML = "구독하기";
      listBtn.querySelector(".plus-btn").setAttribute("src", "../../../../asset/button/plus.png");
    }
  });

  rejectBtn.addEventListener("click", () => {
    const main = VIEW_MODE.CURRENT_LAYOUT === GRID ? document.querySelector(".grid") : document.querySelector(".list");
    main.removeChild(alertElement);
  });
}

function SubscribeBtnEventHandler(e, btnElement, pressID, press_names, news_data) {
  if (!pressID && VIEW_MODE.CURRENT_LAYOUT === LIST) {
    pressID = news_data[LIST_PAGE.CURRENT_CATEGORY].press[LIST_PAGE.CURRENT_PAGE - 1].ID;
  }

  const isSubscribe = SubscribeState(pressID);
  if (!isSubscribe) {
    snackBar(e);
    store.dispatch(actionCreator("subscribe", { pressID }));
    if (VIEW_MODE.CURRENT_LAYOUT === LIST) {
      btnElement.querySelector(".subscribe-text").innerHTML = "";
      btnElement.querySelector(".plus-btn").setAttribute("src", "../../../../asset/button/closed.png");
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

    AlertHandler(pressID, press_names);
  }
}

export function EventHandlerRegister({ btnElement, pressID, press_names, news_data = [] }) {
  btnElement.addEventListener("click", (e) => SubscribeBtnEventHandler(e, btnElement, pressID, press_names, news_data));
}

export function SubscribeState(pressID) {
  return store.getIsSubscribe(pressID);
}

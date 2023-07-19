import { store, actionCreator } from "../../store.js";
import { updateGrid, FetchData } from "../view/GridView.js";
import { VIEW_MODE, SUBSCRIBE } from "../../global.js";

let timeoutId;

function snackBar() {
  const snackBarElement = document.createElement("div");
  snackBarElement.className = "snack-bar";
  snackBarElement.innerHTML = `<span class="snack-bar-text display-medium16">내가 구독한 언론사에 추가되었습니다.</span>`;
  const gridMain = document.querySelector(".grid");
  gridMain.appendChild(snackBarElement);

  timeoutId = setTimeout(() => {
    gridMain.removeChild(snackBarElement);
  }, 5000);
}

function createAlert(pressID) {
  const alertElement = document.createElement("div");
  alertElement.className = "unsubscribe-alert";
  alertElement.innerHTML = `
          <div class="alert-contents">
            <span class="alert-contents-text display-bold16">${pressID}<span class="display-medium16">을(를)</span> </span>
            <span class="alert-contents-text display-medium16">구독해지하시겠습니까?</span>
          </div>
          <div class="alert-buttons">
              <div class="each-button confirm-unsubscribe available-medium16">예, 해지합니다</div>
              <div class="each-button reject available-medium16">아니오</div>
          </div>
      `;

  const gridMain = document.querySelector(".grid");
  gridMain.appendChild(alertElement);

  return alertElement;
}
function AlertHandler(pressID) {
  const alertElement = createAlert(pressID);
  const confirmBtn = alertElement.querySelector(".confirm-unsubscribe");
  const rejectBtn = alertElement.querySelector(".reject");

  confirmBtn.addEventListener("click", async () => {
    store.dispatch(actionCreator("unsubscribe", { pressID }));

    const gridMain = document.querySelector(".grid");
    gridMain.removeChild(alertElement);

    if (VIEW_MODE.CURRENT_TAB === SUBSCRIBE) {
      await FetchData();
      updateGrid();
    }
  });

  rejectBtn.addEventListener("click", () => {
    const gridMain = document.querySelector(".grid");
    gridMain.removeChild(alertElement);
  });
}

function SubscribeBtnEventHandler(e, btnElement, pressID) {
  const isSubscribe = SubscribeState(pressID);
  if (!isSubscribe) {
    snackBar(e);
    store.dispatch(actionCreator("subscribe", { pressID }));
    btnElement.querySelector(".subscribe-text").innerHTML = "해지하기";
    btnElement.querySelector(".plus-btn").setAttribute("src", "../../asset/button/closed.png") = "해지하기";
  } else {
    const grid = document.querySelector(".grid");
    const snackBar = document.querySelector(".grid .snack-bar");
    if (snackBar) {
      grid.removeChild(snackBar);
    }

    AlertHandler(pressID);
  }
}

export function EventHandlerRegister(btnElement, pressID) {
  btnElement.addEventListener("click", (e) => SubscribeBtnEventHandler(e, btnElement, pressID));
}

export function SubscribeState(pressID) {
  return store.getIsSubscribe(pressID);
}

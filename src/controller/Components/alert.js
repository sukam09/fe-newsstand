import { UNSUBSCRIBE } from "../../constant.js";
import { actionCreator, store } from "../../model/store.js";
import { snackBarForceDisappear } from "../../view/snackBar.js";
import { timerId } from "../timer.js";

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

  const main = document.querySelector("main");
  main.appendChild(alertElement);

  return alertElement;
}

export function AlertHandler({ pressName, pressData }) {
  snackBarForceDisappear();
  const alertElement = createAlert(pressName);
  const confirmBtn = alertElement.querySelector(".confirm-unsubscribe");
  const rejectBtn = alertElement.querySelector(".reject");

  const main = document.querySelector("main");
  confirmBtn.addEventListener("click", async () => {
    timerId && clearInterval(timerId);

    store.dispatch(actionCreator(UNSUBSCRIBE, { press: pressData }));

    main.removeChild(alertElement);
  });

  rejectBtn.addEventListener("click", () => {
    const main = document.querySelector("main");
    main.removeChild(alertElement);
  });
}

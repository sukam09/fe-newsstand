import Stores from "./core/Store.js";
import { renderMain } from "./render/renderMain.js";
import { changeImageSrc } from "../utils/utils.js";
import { currentCategoryPageNumber } from "./category.js";

function alertList(news, newsPress, progressBarId) {
  const alertDiv = document.querySelector(".alert");
  alertDiv.style.display = "flex";
  let alertInnerDiv = `<div class="alert-main"><div class="alert-question"><div><span>${newsPress}</span>을(를)</div>구독해지하시겠습니까?</div><div class="alert-answer"><div class="alert-yes">예, 해지합니다</div><div class="alert-no">아니오</div></div></div>`;
  alertDiv.innerHTML = alertInnerDiv;
  alertClickList(news, alertDiv, progressBarId);
}

function alertClickList(news, alertDiv, progressBarId) {
  const alertYes = document.querySelector(".alert-yes");
  const alertNo = document.querySelector(".alert-no");
  alertYes.addEventListener("click", () => {
    alertDiv.style.display = "none";
    Stores.removeSubscribeNewsContent(
      news[progressBarId][currentCategoryPageNumber - 1].id
    );
    Stores.setPageMode("list");
    replaceSubscribeButtonList("subscribe");
    if (!Object.keys(Stores.getSubscribeNewsContent()).length)
      Stores.setSubscribedMode("all");
    renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
  });
  alertNo.addEventListener("click", () => {
    alertDiv.style.display = "none";
  });
}

function alertGrid(subscribeButton) {
  const alertDiv = document.querySelector(".alert");
  alertDiv.style.display = "flex";
  let alertInnerDiv = `<div class="alert-main"><div class="alert-question"><div><span>${subscribeButton.alt}</span>을(를)</div>구독해지하시겠습니까?</div><div class="alert-answer"><div class="alert-yes">예, 해지합니다</div><div class="alert-no">아니오</div></div></div>`;
  alertDiv.innerHTML = alertInnerDiv;
  alertClickGrid(subscribeButton, alertDiv);
}

function alertClickGrid(subscribeButton, alertDiv) {
  const alertYes = document.querySelector(".alert-yes");
  const alertNo = document.querySelector(".alert-no");
  alertYes.addEventListener("click", () => {
    alertDiv.style.display = "none";
    Stores.removeSubscribeNewsContent(subscribeButton.id);
    replaceSubscribeButtonGrid(subscribeButton, "subscribe");
    if (Object.keys(Stores.getSubscribeNewsContent()).length === 0)
      Stores.setSubscribedMode("all");
    renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
  });
  alertNo.addEventListener("click", () => {
    alertDiv.style.display = "none";
  });
}

function replaceSubscribeButtonInGrid(subscribeButton, buttonType) {
  changeImageSrc(
    subscribeButton,
    buttonType === "subscribe"
      ? "./img/subscribe_button.svg"
      : "./img/dis-subscribe-button.svg"
  );
}

function replaceSubscribeButtonInList(buttonType) {
  if (buttonType === "subscribe")
    changeImageSrc(
      document.querySelector(".subscribe-buttonList"),
      "./img/subscribe_button.svg"
    );
  else
    changeImageSrc(
      document.querySelector(".subscribe-buttonList"),
      "./img/subscribe_cancel_button.svg"
    );
}

export {
  alertList,
  alertGrid,
  replaceSubscribeButtonInList,
  replaceSubscribeButtonInGrid,
};

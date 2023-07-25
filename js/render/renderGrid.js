import { shuffle } from "../../utils/utils.js";
import Stores from "../core/Store.js";
import { addEventArrowGrid } from "../addEventArrowGrid.js";
import { snackBar } from "../snackBar.js";
import { changeImageSrc } from "../../utils/utils.js";
import { renderMain } from "./renderMain.js";

const gridMain = document.getElementById("main-grid");

const renderGrid = (logos) => {
  if (Stores.getSubscribedMode() == "all") shuffle(logos);
  makeGrid(logos);
  addEventArrowGrid(logos);
  clickSubscribeButtonGrid(logos);
};

function makeGrid(logos) {
  const COUNT_PER_PAGE = 24;
  gridMain.innerHTML = "";
  let outerDiv = "";
  for (
    let logoIndex = Stores.getPage() * COUNT_PER_PAGE;
    logoIndex < COUNT_PER_PAGE * Stores.getPage() + 24;
    logoIndex++
  ) {
    outerDiv += `<div class="grid-list">${drawLogo(logos, logoIndex)}</div>`;
  }
  gridMain.innerHTML = outerDiv;
}

function drawLogo(logos, LOGO_INDEX) {
  if (logos[LOGO_INDEX]) {
    const newsLogo = `<div class="hover-subscribe-button"><img id="${logos[LOGO_INDEX].id}" class="subscribe-button" alt="${logos[LOGO_INDEX].name}" src="./img/subscribe_button.svg"></div><img class="grid-image" src="${logos[LOGO_INDEX].logo}">`;
    return newsLogo;
  }
  return "";
}

function clickSubscribeButtonGrid(logos) {
  const subscribeButton = document.querySelectorAll(".subscribe-button");
  subscribeButton.forEach((value, index) => {
    if (isSubscribedGrid(subscribeButton[index]))
      replaceSubscribeButton(subscribeButton[index], "cancel");
    subscribeButton[index].addEventListener("click", function () {
      if (!isSubscribedGrid(subscribeButton[index])) {
        Stores.setSubscribeNewsContent(subscribeButton[index].id);
        replaceSubscribeButton(subscribeButton[index], "cancel");
        snackBar("내가 구독한 언론사에 추가되었습니다!");
        Stores.setPageMode("list");
        renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
      } else alertGrid(subscribeButton[index]);
    });
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
    Stores.setPageMode("grid");
    replaceSubscribeButton(subscribeButton, "subscribe");
    if (Object.keys(Stores.getSubscribeNewsContent()).length === 0)
      Stores.setSubscribedMode("all");
    renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
  });
  alertNo.addEventListener("click", () => {
    alertDiv.style.display = "none";
  });
}

function isSubscribedGrid(subscribeButton) {
  if (Stores.getSubscribedMode() != "all") return true;
  else {
    const subscribeData = Stores.getSubscribeNewsContent();
    for (const key in subscribeData) {
      const articles = subscribeData[key];
      for (const article of articles) {
        if (article.id == subscribeButton.id) return true;
      }
    }
  }
  return false;
}

function replaceSubscribeButton(subscribeButton, buttonType) {
  changeImageSrc(
    subscribeButton,
    buttonType === "subscribe"
      ? "./img/subscribe_button.svg"
      : "./img/dis-subscribe-button.svg"
  );
}

export { renderGrid, makeGrid, clickSubscribeButtonGrid };

import { shuffle } from "../../utils/utils.js";
import Stores from "../core/Store.js";
import { addEventArrowGrid } from "../addEventArrowGrid.js";
import { snackBar } from "../snackBar.js";
import { changeImageSrc } from "../../utils/utils.js";

const gridMain = document.getElementById("main-grid");

const renderGrid = (logos) => {
  console.log(logos);
  if (Stores.getSubscribedMode() == "all") shuffle(logos);
  makeGrid(logos);
  addEventArrowGrid(logos);
  clickSubscribeButton(logos);
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
    const newsLogo = `<div class="hover-subscribe-button"><img id="${logos[LOGO_INDEX].id}" class="subscribe-button" src="./img/subscribe_button.svg"></div><img class="grid-image" src="${logos[LOGO_INDEX].logo}">`;
    return newsLogo;
  }
  return "";
}

function clickSubscribeButton(logos) {
  const subscribeButton = document.querySelectorAll(".subscribe-button");
  subscribeButton.forEach((value, index) => {
    if (isSubscribed(subscribeButton[index]))
      replaceSubscribeButton(subscribeButton[index], "cancel");
    subscribeButton[index].addEventListener("click", function () {
      if (!isSubscribed(subscribeButton[index])) {
        console.log("A");
        Stores.setSubscribeNewsContent(subscribeButton[index].id);
        replaceSubscribeButton(subscribeButton[index], "cancel");
        snackBar("내가 구독한 언론사에 추가되었습니다!");
      } else {
        snackBar("구독이 해지되었습니다");
        replaceSubscribeButton(subscribeButton[index], "subscribe");
        console.log("구독중~");
      }
    });
  });
}

function isSubscribed(subscribeButton) {
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

export { renderGrid, makeGrid, clickSubscribeButton };

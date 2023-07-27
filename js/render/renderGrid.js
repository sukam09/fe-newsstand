import Stores from "../core/Store.js";
import { addEventArrowGrid } from "../clickEvent/addEventArrowGrid.js";
import { snackBar } from "../snackBar.js";
import { shuffle, doBeforeRender } from "../../utils/utils.js";
import { renderMain } from "./renderMain.js";
import { rollingTime } from "../../utils/constants.js";
import { alertGrid, replaceSubscribeButtonInGrid } from "../alert.js";
let timeOut;

const renderGrid = (logos) => {
  doBeforeRender("grid");
  if (Stores.getSubscribedMode() == "all") {
    shuffle(logos);
    addEventArrowGrid(logos);
  }
  makeGrid(logos);
  clickSubscribeButtonInGrid(logos);
};

function makeGrid(logos) {
  const COUNT_PER_PAGE = 24;
  const gridMain = document.getElementById("main-grid");
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

function clickSubscribeButtonInGrid() {
  const subscribeButton = document.querySelectorAll(".subscribe-button");
  subscribeButton.forEach((value, index) => {
    if (isSubscribedGrid(subscribeButton[index]))
      replaceSubscribeButtonInGrid(subscribeButton[index], "cancel");
    subscribeButton[index].addEventListener("click", function () {
      if (!isSubscribedGrid(subscribeButton[index])) {
        Stores.setSubscribeNewsContent(subscribeButton[index].id);
        replaceSubscribeButtonInGrid(subscribeButton[index], "cancel");
        snackBar("내가 구독한 언론사에 추가되었습니다!");
        Stores.setSubscribedMode("subscribe");
        Stores.setPageMode("list");
        if (timeOut) clearTimeout(timeOut);
        timeOut = setTimeout(() => {
          Stores.setSubscribedMode("subscribed");
          renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
        }, rollingTime);
      } else {
        if (timeOut) clearTimeout(timeOut);
        alertGrid(subscribeButton[index]);
      }
    });
  });
}

function isSubscribedGrid(subscribeButton) {
  const subscribeData = Stores.getSubscribeNewsContent();
  for (const key in subscribeData) {
    const articles = subscribeData[key];
    for (const article of articles)
      if (article.id == subscribeButton.id) return true;
  }
  return false;
}

export { renderGrid, makeGrid, clickSubscribeButtonInGrid };

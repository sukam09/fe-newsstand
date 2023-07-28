import { currentCategoryIndex, currentCategoryPageNumber } from "./category.js";
import Stores from "./core/Store.js";
import { snackBar } from "./snackBar.js";
import { rollingTime } from "../utils/constants.js";
import { renderMain } from "./render/renderMain.js";
import { alertList, replaceSubscribeButtonInList } from "./alert.js";

let timeOut;
const drawNews = (news) => {
  const progressBarId =
    document.getElementsByClassName("progress-bar")[currentCategoryIndex].id;
  let pageIndex =
    Stores.getSubscribedMode() === "subscribed"
      ? 0
      : currentCategoryPageNumber - 1;
  drawNewsDiv(news, progressBarId, pageIndex);
  drawNewsHeader(news, progressBarId, pageIndex);
  clickSubscribeButtonInList(news, progressBarId);
};

function drawNewsImage(news, progressBarId, pageIndex) {
  return `<img class="news-main-image" src="${news[progressBarId][pageIndex].thumbnail}">${news[progressBarId][pageIndex].title}`;
}

function drawNewsArticle(news, progressBarId, pageIndex) {
  let article_div = "";
  for (let article_cnt = 0; article_cnt < 6; article_cnt++) {
    article_div += `<div class="news-main-article">${news[progressBarId][pageIndex].article[article_cnt]}</div>`;
  }
  article_div += `<div class="news-main-article-press">${news[progressBarId][pageIndex].name}언론사에서 직접 편집한 뉴스입니다.</div>`;
  return article_div;
}

function drawNewsDiv(news, progressBarId, pageIndex) {
  const listDiv = document.querySelector(".news-content");
  listDiv.innerHTML = "";
  let new_div = `<div class="news-main-left-div">${drawNewsImage(
    news,
    progressBarId,
    pageIndex
  )}</div><div class="news-main-right-div">${drawNewsArticle(
    news,
    progressBarId,
    pageIndex
  )}</div>`;
  listDiv.innerHTML = new_div;
}

function drawNewsHeader(news, progressBarId, pageIndex) {
  const news_header = document.querySelector(".news-header");
  news_header.innerHTML = "";
  let new_div = `<div class="news-header-div"><img class="news-thumbnail"  id="${news[progressBarId][pageIndex].name}"  src="${news[progressBarId][pageIndex].logo}"><span class="news-edit-time">${news[progressBarId][pageIndex].editTime}</span><img class="subscribe-buttonList" src="./img/subscribe_button.svg"></div>`;
  news_header.innerHTML = new_div;
  if (isSubscribed(news, progressBarId)) replaceSubscribeButtonInList("cancel");
}

function isSubscribed(news, progressBarId) {
  if (Stores.getSubscribedMode() != "all") return true;
  else {
    const subscribeData = Stores.getSubscribeNewsContent();
    for (const key in subscribeData) {
      const articles = subscribeData[key];
      for (const article of articles) {
        if (article.id == news[progressBarId][currentCategoryPageNumber - 1].id)
          return true;
      }
    }
  }
  return false;
}

function clickSubscribeButtonInList(news, progressBarId) {
  const subscribedButton = document.querySelector(".subscribe-buttonList");
  subscribedButton.addEventListener("click", function () {
    if (!isSubscribed(news, progressBarId)) {
      Stores.setSubscribeNewsContent(
        news[progressBarId][currentCategoryPageNumber - 1].id
      );
      snackBar("내가 구독한 언론사에 추가되었습니다!");
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        Stores.setSubscribedMode("subscribed");
        renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
      }, rollingTime);
      replaceSubscribeButtonInList("cancel");
    } else {
      if (timeOut) clearTimeout(timeOut);
      alertList(
        news,
        news[progressBarId][currentCategoryPageNumber - 1].name,
        progressBarId
      );
    }
  });
}

export { drawNews };

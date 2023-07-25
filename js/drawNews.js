import { currentCategoryIndex, currentCategoryPageNumber } from "./category.js";
import Stores from "./core/Store.js";
import { snackBar } from "./snackBar.js";
import { rollingTime } from "../utils/constants.js";
import { renderMain } from "./render/renderMain.js";
import { changeImageSrc } from "../utils/utils.js";

let timeOut;
const drawNews = (news) => {
  let progressBarId =
    document.getElementsByClassName("progress-bar")[currentCategoryIndex].id;
  drawNewsDiv(news, progressBarId);
  drawNewsHeader(news, progressBarId);
  clickSubscribeButton(news, progressBarId);
};

function drawNewsImage(news, progressBarId) {
  return `<img class="news-main-image" src="${news[progressBarId][0].thumbnail}">${news[progressBarId][0].title}`;
}

function drawNewsArticle(news, progressBarId) {
  let article_div = "";
  for (let article_cnt = 0; article_cnt < 6; article_cnt++) {
    article_div += `<div class="news-main-article">${news[progressBarId][0].article[article_cnt]}</div>`;
  }
  article_div += `<div class="news-main-article-press">${news[progressBarId][0].press}언론사에서 직접 편집한 뉴스입니다.</div>`;
  return article_div;
}

function drawNewsDiv(news, progressBarId) {
  const listDiv = document.querySelector(".news-content");
  listDiv.innerHTML = "";
  let new_div = `<div class="news-main-left-div">${drawNewsImage(
    news,
    progressBarId
  )}</div><div class="news-main-right-div">${drawNewsArticle(
    news,
    progressBarId
  )}</div>`;
  listDiv.innerHTML = new_div;
}

function drawNewsHeader(news, progressBarId) {
  const news_header = document.querySelector(".news-header");
  news_header.innerHTML = "";
  let new_div = `<div class="news-header-div"><img class="news-thumbnail"  id="${
    news[progressBarId][currentCategoryPageNumber - 1].press
  }"  src="${
    news[progressBarId][currentCategoryPageNumber - 1].logo
  }"><span class="news-edit-time">${
    news[progressBarId][currentCategoryPageNumber - 1].editTime
  }</span><img class="subscribe-buttonList" src="./img/subscribe_button.svg"></div>`;
  news_header.innerHTML = new_div;
  if (isSubscribed(news, progressBarId)) replaceSubscribeButton("cancel");
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

function clickSubscribeButton(news, progressBarId) {
  const subscribedButton = document.querySelector(".subscribe-buttonList");
  subscribedButton.addEventListener("click", function () {
    if (!isSubscribed(news, progressBarId)) {
      Stores.setSubscribeNewsContent(
        news[progressBarId][currentCategoryPageNumber - 1].id
      );
      snackBar("내가 구독한 언론사에 추가되었습니다!");
      timeOut = setTimeout(() => {
        Stores.setSubscribedMode("subscribed");
        renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
      }, rollingTime);
      replaceSubscribeButton("cancel");
    } else {
      if (timeOut) clearTimeout(timeOut);
      alert(
        news,
        news[progressBarId][currentCategoryPageNumber - 1].press,
        progressBarId
      );
    }
  });
}

function alert(news, newsPress, progressBarId) {
  const alertDiv = document.querySelector(".alert");
  alertDiv.style.display = "flex";
  let alertInnerDiv = `<div class="alert-main"><div class="alert-question"><div><span>${newsPress}</span>을(를)</div>구독해지하시겠습니까?</div><div class="alert-answer"><div class="alert-yes">예, 해지합니다</div><div class="alert-no">아니오</div></div></div>`;
  alertDiv.innerHTML = alertInnerDiv;
  alertClick(news, alertDiv, progressBarId);
}

function alertClick(news, alertDiv, progressBarId) {
  const alertYes = document.querySelector(".alert-yes");
  const alertNo = document.querySelector(".alert-no");
  alertYes.addEventListener("click", () => {
    alertDiv.style.display = "none";
    Stores.removeSubscribeNewsContent(
      news[progressBarId][currentCategoryPageNumber - 1].id
    );
    Stores.setPageMode("list");
    replaceSubscribeButton("subscribe");
    if (!Object.keys(Stores.getSubscribeNewsContent()).length)
      Stores.setSubscribedMode("all");
    renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
  });
  alertNo.addEventListener("click", () => {
    alertDiv.style.display = "none";
  });
}

function replaceSubscribeButton(buttonType) {
  if (buttonType === "subscribe") {
    changeImageSrc(
      document.querySelector(".subscribe-buttonList"),
      "./img/subscribe_button.svg"
    );
  } else {
    changeImageSrc(
      document.querySelector(".subscribe-buttonList"),
      "./img/subscribe_cancel_button.svg"
    );
  }
}

export { drawNews };

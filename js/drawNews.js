import news from "../json/news.json" assert { type: "json" };
import { currentCategoryIndex, currentCategoryPageNumber } from "./category.js";
import Stores from "./core/Store.js";
import { snackBar } from "./snackBar.js";
import { rollingTime } from "../utils/constants.js";
import { renderMain } from "./render/renderMain.js";

const drawNews = (categoryNews) => {
  console.log(categoryNews);
  drawNewsDiv(categoryNews);
  drawNewsHeader(categoryNews);
  clickSubscribeButton();
};

function drawNewsImage(categoryNews, PageNumberIndex) {
  return `<img class="news-main-image" src="${categoryNews[currentCategoryIndex][PageNumberIndex].thumbnail}">${categoryNews[currentCategoryIndex][PageNumberIndex].title}`;
}

function drawNewsArticle(categoryNews, PageNumberIndex) {
  let article_div = "";
  for (let article_cnt = 0; article_cnt < 6; article_cnt++) {
    article_div += `<div class="news-main-article">${
      news.News[Stores.getPage()].article[article_cnt]
    }</div>`;
  }
  article_div += `<div class="news-main-article-press">${categoryNews[currentCategoryIndex][PageNumberIndex].press}언론사에서 직접 편집한 뉴스입니다.</div>`;
  return article_div;
}

function drawNewsDiv(categoryNews) {
  const PageNumberIndex = currentCategoryPageNumber - 1;
  const listDiv = document.querySelector(".news-content");
  listDiv.innerHTML = "";
  let new_div = `<div class="news-main-left-div">${drawNewsImage(
    categoryNews,
    PageNumberIndex
  )}</div><div class="news-main-right-div">${drawNewsArticle(
    categoryNews,
    PageNumberIndex
  )}</div>`;
  listDiv.innerHTML = new_div;
}

function drawNewsHeader(categoryNews) {
  let PageNumberIndex = currentCategoryPageNumber - 1;
  const news_header = document.querySelector(".news-header");
  news_header.innerHTML = "";
  let new_div = `<div class="news-header-div"><img class="news-thumbnail"  id="${categoryNews[currentCategoryIndex][PageNumberIndex].press}"  src="${categoryNews[currentCategoryIndex][PageNumberIndex].thumbnail}"><span class="news-edit-time">${categoryNews[currentCategoryIndex][PageNumberIndex].editTime}</span><img class="subscribe-button" src="./img/subscribe_button.svg"></div>`;
  // replaceSubscribeCancelButton(document.querySelector(".subscribe-button"));
  news_header.innerHTML = new_div;
}

function clickSubscribeButton(categoryNews) {
  const subscribedButton = document.querySelector(".subscribe-button");
  subscribedButton.addEventListener("click", function () {
    Stores.setSubscribeNewsCnt(
      subscribedButton.previousSibling.previousSibling.id
    );
    Stores.setSubscribeNewsContent("a");
    Stores.setSubscribedMode("subscribed");
    for (const categoryIndex in categoryNews) {
      const newsList = categoryNews[categoryIndex];
      for (const news of newsList) {
        if (news.id === Stores.getPage()) console.log(news.id);
      }
    }
    snackBar("내가 구독한 언론사에 추가되었습니다.");
    setTimeout(() => {
      renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
    }, rollingTime);
    // replaceSubscribeCancelButton(subscribedButton);
  });
}

function replaceSubscribeCancelButton(subscribeButton) {
  Stores.getSubscribeNews().forEach(() => {});
  const cancelButton = document.createElement("img");
  cancelButton.src = "./img/subscribe_cancel_button.svg";
  subscribeButton.replaceWith(cancelButton);
}

export { drawNews };

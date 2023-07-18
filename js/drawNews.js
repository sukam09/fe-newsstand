import news_article from "../json/news_article.json" assert { type: "json" };
import { currentCategoryIndex, currentCategoryPageNumber } from "./category.js";
import { categoryNews } from "./setData.js/setCategoryData.js";
import Stores from "../utils/Store.js";
import { rollingTime } from "../utils/constants.js";

function drawNewsImage(PageNumberIndex) {
  return `<img class="news-main-image" src="${categoryNews[currentCategoryIndex][PageNumberIndex].thumbnail}">${categoryNews[currentCategoryIndex][PageNumberIndex].title}`;
}

function drawNewsArticle(PageNumberIndex) {
  let article_div = "";
  for (let article_cnt = 0; article_cnt < 6; article_cnt++) {
    article_div += `<div class="news-main-article">${news_article.article[article_cnt]}</div>`;
  }
  article_div += `<div class="news-main-article-press">${categoryNews[currentCategoryIndex][PageNumberIndex].press}언론사에서 직접 편집한 뉴스입니다.</div>`;
  return article_div;
}

function drawNewsDiv() {
  const PageNumberIndex = currentCategoryPageNumber - 1;
  const listDiv = document.querySelector(".news-content");
  listDiv.innerHTML = "";
  let new_div = `<div class="news-main-left-div">${drawNewsImage(
    PageNumberIndex
  )}</div><div class="news-main-right-div">${drawNewsArticle(
    PageNumberIndex
  )}</div>`;
  listDiv.innerHTML = new_div;
}

function drawNewsHeader() {
  let PageNumberIndex = currentCategoryPageNumber - 1;
  const news_header = document.querySelector(".news-header");
  news_header.innerHTML = "";
  let new_div = `<div class="news-header-div"><img class="news-thumbnail" id="${categoryNews[currentCategoryIndex][PageNumberIndex].id}" src="${categoryNews[currentCategoryIndex][PageNumberIndex].thumbnail}"><span class="news-edit-time">${categoryNews[currentCategoryIndex][PageNumberIndex].editTime}</span><img class="subscribe-button" src="./img/subscribe_button.svg"></div>`;
  news_header.innerHTML = new_div;
}

function clickSubscribeButton() {
  const subscribedButton = document.querySelector(".subscribe-button");
  const snackbar = document.querySelector(".snackbar");
  subscribedButton.addEventListener("click", function () {
    Stores.setSubscribed(subscribedButton.previousSibling.previousSibling);
    snackbar.style.opacity = "1";
    setTimeout(() => {
      snackbar.style.opacity = "0";
      setTimeout(() => {}, 1000);
    }, rollingTime);
  });
}

function drawNews() {
  drawNewsDiv();
  drawNewsHeader();
  clickSubscribeButton();
}

export { drawNews };

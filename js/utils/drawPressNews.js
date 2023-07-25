import { getPage, getTabMode } from "../core/getter.js";

function generateMainNews(main_news) {
  return `<div class="main-img"><img src="${main_news.thumbnail}" alt="thumbnail"/></div>
    <p class="available-medium16 thumbnail-title">${main_news.title}</p>`;
}

function generateSubNews(subNewsArray) {
  let subNewsHtml = "";
  subNewsArray.forEach((subnews) => {
    subNewsHtml += `<li class="available-medium16">${subnews}</li>`;
  });
  return subNewsHtml;
}

export function drawPressNews(list_content) {
  let main_news,
    sub_news = "";

  list_content.forEach((news) => {
    if (
      getTabMode() === "all" &&
      news.name === list_content[getPage() - 1].name
    ) {
      main_news = generateMainNews(news.main_news);
      sub_news = generateSubNews(news.sub_news);
    } else if (
      getTabMode() === "subscribe" &&
      news.category === list_content[getPage() - 1].category
    ) {
      main_news = generateMainNews(news.main_news);
      sub_news = generateSubNews(news.sub_news);
    }
  });

  sub_news += `<li class="display-medium14" id="caption">
  ${list_content[getPage() - 1].name} 언론사에서 직접 편집한 뉴스입니다.
  </li>`;
  const news_content = document.querySelector(".news-content");
  news_content.innerHTML = `<div class="main-news">
      ${main_news}
    </div>
    <div class = "sub-news">
    <ul class = "sub-news-ul">
     ${sub_news}
  </ul>
  </div>`;
}

import { getPage, getTabMode } from "../core/getter.js";

export function drawPressNews(list_content) {
  let main_news,
    sub_news = "";

  list_content.forEach((news) => {
    if (
      getTabMode() === "all" &&
      news.name === list_content[getPage() - 1].name
    ) {
      main_news = `<img src="${news.main_news.thumbnail}" alt="thumbnail"/>
        <p class="thumbnail-title">${news.main_news.title}</p>`;
      news.sub_news.forEach((subnews) => {
        sub_news += `<li>
          ${subnews}
        </li>`;
      });
    } else if (
      getTabMode() === "subscribe" &&
      news.category === list_content[getPage() - 1].category
    ) {
      main_news = `<img src="${news.main_news.thumbnail}" alt="thumbnail"/>
        <p class="thumbnail-title">${news.main_news.title}</p>`;
      news.sub_news.forEach((subnews) => {
        sub_news += `<li>
          ${subnews}
        </li>`;
      });
    }
  });
  sub_news += `<li id="caption">
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

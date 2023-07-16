import { makeMainNews } from "./mainNews.js";
import { makePressInfo } from "./pressInfo.js";
import { makeSubNews } from "./subNews.js";

export const makePressNews = (agency) => {
  const $press_news = document.querySelector(".press-news");
  const $news_list = document.createElement("div");
  $news_list.className = "news-list";

  $news_list.appendChild(makeMainNews(agency));
  $news_list.appendChild(makeSubNews(agency));

  $press_news.appendChild(makePressInfo(agency));
  $press_news.appendChild($news_list);
};

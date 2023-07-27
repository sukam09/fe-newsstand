import { ce, qs } from "../../utils/utils.js";
import { makeMainNews } from "./mainNews.js";
import { makePressInfo } from "./pressInfo.js";
import { makeSubNews } from "./subNews.js";

export const makePressNews = (current_page, agencies) => {
  const $press_news = qs(".press-news");
  const $news_list = ce("div");
  $news_list.className = "news-list";

  $news_list.appendChild(makeMainNews(agencies[current_page]));
  $news_list.appendChild(makeSubNews(agencies[current_page]));

  $press_news.appendChild(makePressInfo(current_page, agencies));
  $press_news.appendChild($news_list);
};

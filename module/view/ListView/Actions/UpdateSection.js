/**
 * 언론사 변경에 따른 뉴스 내용 업데이트
 */
import { LIST_PAGE } from "../../../../global.js";
import { news_data } from "../../ListView/ListView.js";

export function updatePressNewsSection() {
  const pressInfo = document.querySelector("main .news-list-wrap .press-news-wrap .press-info ");
  const pressLogo = pressInfo.querySelector(".press-icon");
  pressLogo.src = `../../../../asset/icons/basic/${news_data[LIST_PAGE.CURRENT_CATEGORY].press[LIST_PAGE.CURRENT_PAGE - 1].path}`;

  const mainNews = document.querySelector(".press-news-wrap .news .news-main");
  const subNews = document.querySelector(".press-news-wrap .news .news-sub");

  mainNews.querySelector(".news-title").innerHTML = news_data[LIST_PAGE.CURRENT_CATEGORY].press[LIST_PAGE.CURRENT_PAGE - 1].news[0];
  mainNews.querySelector(".news-img").setAttribute("src", `https://picsum.photos/320/200?random=${Math.random()}`);
  subNews.querySelectorAll(".each-news-title").forEach((news, index) => {
    news.innerHTML = news_data[LIST_PAGE.CURRENT_CATEGORY].press[LIST_PAGE.CURRENT_PAGE - 1].news[index + 1];
  });
  subNews.querySelector(".explain").innerHTML = `${news_data[LIST_PAGE.CURRENT_CATEGORY].press[LIST_PAGE.CURRENT_PAGE - 1].name}에서 직접 편집한 뉴스입니다.`;
}

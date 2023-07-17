import { tabClassChange } from "./ChangeTabStyle.js";
import { LIST_PAGE } from "../../../../global.js";
import { news_data } from "../../ListView/ListView.js";

/**
 * 현재 카테고리의 페이지 정보 변경
 */

function changePageInfo() {
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const progressTabNumber = progressTab.querySelector(".text-category-number");
  progressTabNumber.querySelector(".present").innerHTML = `${LIST_PAGE.CURRENT_PAGE} / `;
}

/**
 * <카테고리 변경 >
 * - 프로그래스 타켓 변경(스타일)
 */
function changeCategory() {
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const nextProgressEl = document.querySelectorAll(".news-list-wrap .field-tab .each-tab")[LIST_PAGE.CURRENT_CATEGORY];

  //카테고리 타켓 탭 스타일 변경
  tabClassChange(nextProgressEl, progressTab);
}

function changePressNewsSection() {
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

export { changePageInfo, changeCategory, changePressNewsSection };

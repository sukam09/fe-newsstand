import { ALL_ECONOMY, FIRST_NEWS_PAGE_INDEX } from "./constant.js";
import { fetchpressNews } from "./dataFetch.js"
import turnNewsPage from "./turnNewsPage.js";
import showNews from "./showNews.js";
import showNewsOfCategory from "./clickCategory.js";
import {initProgress} from "./showProgress.js";

const pressNewsList = [[], [], [], [], [], [], []];
const shuffledPressNews = [[], [], [], [], [], [], []];

/**
카테고리 별 언론사 순서 랜덤으로 섞기
 */
async function randomizeNews() {
  const pressNewsData = await fetchpressNews();
  const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문직", "지역"];

  pressNewsList.forEach((arr, idx) => {
    pressNewsList[idx] = pressNewsData.filter(press => press["category"] === category[idx]);
    shuffledPressNews[idx] = [...pressNewsList[idx]].sort(() => Math.random() - 0.5);
  })
  return category;
}

/**
초기값으로 첫번 째 종합/경제 뉴스 보여주기
 */
async function initNews() {
  const category = await randomizeNews();
  showNews(shuffledPressNews, ALL_ECONOMY, FIRST_NEWS_PAGE_INDEX);
  initProgress(shuffledPressNews, ALL_ECONOMY, FIRST_NEWS_PAGE_INDEX);
  turnNewsPage(shuffledPressNews, ALL_ECONOMY);
  showNewsOfCategory(shuffledPressNews, category)
}

export default initNews
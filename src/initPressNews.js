import { fetchpressNews } from "./dataFetch.js"
import turnNewsPage from "./turnListPage.js";
import showNews from "./showPressNews.js";

const pressNewsList = [[], [], [], [], [], [], []];
const shuffledPressNews = [[], [], [], [], [], [], []];

const ALL_ECONOMY = 0;
const BROADCAST_COMMUNICATION = 1;
const IT = 2;
const ENGLISHCOCK = 3;
const SPORTS_ENTERTAIN=4;
const MAGAZINE_PROFESSION=5;

const FIRST_NEWS_PAGE = 0;

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
}

/**
초기값으로 첫번 째 종합/경제 뉴스 보여주기
 */
async function initNews() {
  await randomizeNews();
  showNews(shuffledPressNews, ALL_ECONOMY, FIRST_NEWS_PAGE);
  turnNewsPage(shuffledPressNews, ALL_ECONOMY);
}



export default initNews
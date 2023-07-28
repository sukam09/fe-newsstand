import { dataFetch } from "./utils.js";

/**
 언론사 id, 로고 가져옴
 */
async function fetchPressInfos() {
  return dataFetch("./assets/data/pressInfo.json");
}

/**
 언론사 정보와 뉴스 데이터를 가져옴
 */
async function fetchpressNews() {
  return dataFetch("./assets/data/pressNews.json");
}

/** 최신 뉴스 가져오기 */
async function fetchRollingNews() {
  return dataFetch("./assets/data/latestNews.json");
}


export { fetchpressNews, fetchRollingNews }


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

export { fetchpressNews }


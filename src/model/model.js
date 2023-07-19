import { PATH, CATEGORY, GLOBAL } from "./variable.js";

async function initData() {
  GLOBAL.ROLLING_NEWS = await fetchRollingNewsData();
  GLOBAL.NEWS_DATA = await fetchNewsData();
}

async function fetchJsonFile(path) {
  return fetch(path).then((response) => response.json());
}

async function fetchRollingNewsData() {
  const jsonData = await fetchJsonFile(PATH.ROLLING_NEWS);
  return jsonData;
}

async function fetchNewsData() {
  const jsonData = await fetchJsonFile(PATH.NEWS_DATA);
  shuffleData(jsonData);
  initListNewsData(jsonData);
  initCategoryStartIndex();
  GLOBAL.TOTAL_NEWS_NUM = jsonData.length;
  return jsonData;
}

function shuffleData(jsonData) {
  for (let currentIndex = jsonData.length - 1; currentIndex >= 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    [jsonData[currentIndex], jsonData[randomIndex]] = [jsonData[randomIndex], jsonData[currentIndex]];
  }
}

function initListNewsData(jsonData) {
  const categoryArr = {
    [CATEGORY.ECONOMY]: [],
    [CATEGORY.BROADCAST]: [],
    [CATEGORY.IT]: [],
    [CATEGORY.ENGLISH]: [],
    [CATEGORY.SPORTS]: [],
    [CATEGORY.MAGAZINE]: [],
    [CATEGORY.LOCAL]: [],
  };

  jsonData.forEach((data) => {
    categoryArr[data.category].push(data);
    GLOBAL.CATEGORY_NUM[strToCategory(data.category)]++;
  });
  GLOBAL.LIST_NEWS_DATA = Array().concat(...Object.values(categoryArr));
}

function initCategoryStartIndex() {
  for (const category in CATEGORY) {
    GLOBAL.CATEGORY_START_INDEX[category] = GLOBAL.LIST_NEWS_DATA.findIndex((news) => {
      return news.category === CATEGORY[category];
    });
  }
}

function strToCategory(str) {
  const categoryMapping = {
    [CATEGORY.ECONOMY]: "ECONOMY",
    [CATEGORY.BROADCAST]: "BROADCAST",
    [CATEGORY.IT]: "IT",
    [CATEGORY.ENGLISH]: "ENGLISH",
    [CATEGORY.SPORTS]: "SPORTS",
    [CATEGORY.MAGAZINE]: "MAGAZINE",
    [CATEGORY.LOCAL]: "LOCAL",
  };

  return categoryMapping[str];
}

export { initData };

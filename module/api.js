import { JSONDATA, CATEGORY, GLOBAL } from "./variable.js";
import { strToCategory } from "./list.js";

async function initNewsData() {
  GLOBAL.ROLLING_NEWS = await fetchRollingNewsData();
  GLOBAL.NEWS_DATA = await fetchNewsData();
}

async function fetchJsonFile(path) {
  return fetch(path).then((response) => {
    return response.json();
  });
}

async function fetchRollingNewsData() {
  const jsonData = await fetchJsonFile(JSONDATA.ROLLING_NEWS);
  return jsonData;
}

async function fetchNewsData() {
  const jsonData = await fetchJsonFile(JSONDATA.NEWS_DATA);
  shuffleId(jsonData);
  sortCategory(jsonData);
  GLOBAL.TOTAL_NEWS_NUM = jsonData.length;
  return jsonData;
}

function shuffleId(jsonData) {
  for (let currentIndex = jsonData.length - 1; currentIndex >= 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    const tempValue = jsonData[currentIndex];
    jsonData[currentIndex] = jsonData[randomIndex];
    jsonData[randomIndex] = tempValue;
  }
}

function sortCategory(jsonData) {
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
    if (data.category in categoryArr) {
      categoryArr[data.category].push(data);
      GLOBAL.CATEGORY_NUM[strToCategory(data.category)]++;
    }
  });

  GLOBAL.LIST_NEWS_DATA = Array().concat(...Object.values(categoryArr));

  for (const category in CATEGORY) {
    GLOBAL.CATEGORY_START_INDEX[category] = GLOBAL.LIST_NEWS_DATA.findIndex((news) => {
      return news.category === CATEGORY[category];
    });
  }
}

export { initNewsData };

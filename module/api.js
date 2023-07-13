import { JSONDATA, CATEGORY, GLOBAL } from "./variable.js";
import { strToCategory } from "./list.js";

async function fetchJsonFile(path) {
  return fetch(path).then((response) => {
    return response.json();
  });
}

async function fetchNewsData() {
  const jsonData = await fetchJsonFile(JSONDATA.NEWS_DATA);
  shuffle_id(jsonData);
  sortCategory(jsonData);
  GLOBAL.total_news_num = jsonData.length;
  return jsonData;
}

async function fetchRollingNewsData() {
  const jsonData = await fetchJsonFile(JSONDATA.ROLLING_NEWS);
  return jsonData;
}

function shuffle_id(jsonData) {
  let currentIndex = jsonData.length,
    tempValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tempValue = jsonData[currentIndex];
    jsonData[currentIndex] = jsonData[randomIndex];
    jsonData[randomIndex] = tempValue;
  }
}

function sortCategory(jsonData) {
  const arr = {
    [CATEGORY.ECONOMY]: [],
    [CATEGORY.BROADCAST]: [],
    [CATEGORY.IT]: [],
    [CATEGORY.ENGLISH]: [],
    [CATEGORY.SPORTS]: [],
    [CATEGORY.MAGAZINE]: [],
    [CATEGORY.LOCAL]: [],
  };

  jsonData.forEach((data) => {
    if (data.category in arr) {
      arr[data.category].push(data);
      GLOBAL.CATEGORY_NUM[strToCategory(data.category)]++;
    }
  });

  GLOBAL.list_news_data = Array().concat(...Object.values(arr));

  for (const category in CATEGORY) {
    GLOBAL.CATEGORY_START_INDEX[category] = GLOBAL.list_news_data.findIndex((news) => {
      return news.category === CATEGORY[category];
    });
  }
}
export { fetchNewsData, fetchRollingNewsData, strToCategory };

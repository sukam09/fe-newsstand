import { GLOBAL, JSONDATA } from "./variable.js";

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
  jsonData.forEach((data) => {
    switch (data.category) {
      case "종합/경제":
        GLOBAL.CATEGORY_NUM.ECONOMY++;
        GLOBAL.CATEGORY_ARR.ECONOMY.push(data);
        break;
      case "방송/통신":
        GLOBAL.CATEGORY_NUM.BROADCAST++;
        GLOBAL.CATEGORY_ARR.BROADCAST.push(data);
        break;
      case "IT":
        GLOBAL.CATEGORY_NUM.IT++;
        GLOBAL.CATEGORY_ARR.IT.push(data);
        break;
      case "영자지":
        GLOBAL.CATEGORY_NUM.ENGLISH++;
        GLOBAL.CATEGORY_ARR.ENGLISH.push(data);
        break;
      case "스포츠/연예":
        GLOBAL.CATEGORY_NUM.SPORTS++;
        GLOBAL.CATEGORY_ARR.SPORTS.push(data);
        break;
      case "매거진/전문지":
        GLOBAL.CATEGORY_NUM.MAGAZINE++;
        GLOBAL.CATEGORY_ARR.MAGAZINE.push(data);
        break;
      case "지역":
        GLOBAL.CATEGORY_NUM.LOCAL++;
        GLOBAL.CATEGORY_ARR.LOCAL.push(data);
        break;
    }
  });

  GLOBAL.list_news_data = [
    ...GLOBAL.CATEGORY_ARR.ECONOMY,
    ...GLOBAL.CATEGORY_ARR.BROADCAST,
    ...GLOBAL.CATEGORY_ARR.IT,
    ...GLOBAL.CATEGORY_ARR.ENGLISH,
    ...GLOBAL.CATEGORY_ARR.SPORTS,
    ...GLOBAL.CATEGORY_ARR.MAGAZINE,
    ...GLOBAL.CATEGORY_ARR.LOCAL,
  ];
}

export { fetchNewsData, fetchRollingNewsData };

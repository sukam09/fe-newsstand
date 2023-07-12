import { GLOBAL, JSONDATA } from "./variable.js";

async function fetchJsonFile(path) {
  return fetch(path).then((response) => {
    return response.json();
  });
}

async function fetchNewsData() {
  const jsonData = await fetchJsonFile(JSONDATA.NEWS_DATA);
  shuffle_id(jsonData);
  getCategoryNum(jsonData);
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

function getCategoryNum(jsonData) {
  jsonData.forEach((data) => {
    switch (data.category) {
      case "종합/경제":
        GLOBAL.CATEGORY_NUM.ECONOMY++;
        break;
      case "방송/통신":
        GLOBAL.CATEGORY_NUM.BROADCAST++;
        break;
      case "IT":
        GLOBAL.CATEGORY_NUM.IT++;
        break;
      case "영자지":
        GLOBAL.CATEGORY_NUM.ENGLISH++;
        break;
      case "스포츠/연예":
        GLOBAL.CATEGORY_NUM.SPORTS++;
        break;
      case "매거진/전문지":
        GLOBAL.CATEGORY_NUM.MAGAZINE++;
        break;
      case "지역":
        GLOBAL.CATEGORY_NUM.LOCAL++;
        break;
    }
  });
}

export { fetchNewsData, fetchRollingNewsData };

import { JSONDATA } from "./variable.js";

async function fetchJsonFile(path) {
  return fetch(path).then((response) => {
    return response.json();
  });
}

async function fetchNewsData() {
  const jsonData = await fetchJsonFile(JSONDATA.NEWS_DATA);
  shuffle_id(jsonData);
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

export { fetchNewsData, fetchRollingNewsData };

export async function fetchNewsIconData() {
  const jsonData = await fetchJsonFile("./Data/News_Icon.json");
  shuffle_id(jsonData);
  return jsonData;
}

async function fetchJsonFile(path) {
  return fetch(path).then((response) => {
    return response.json();
  });
}

function shuffle_id(news_icon) {
  let currentIndex = news_icon.length,
    tempValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tempValue = news_icon[currentIndex].path;
    news_icon[currentIndex].path = news_icon[randomIndex].path;
    news_icon[randomIndex].path = tempValue;
  }
}

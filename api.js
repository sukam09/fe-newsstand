export async function fetchPressData(path) {
  const jsonData = await jsonfetch(path);
  shuffle_id(jsonData);
  return jsonData;
}

export async function fetchRollingArticle(path) {
  const jsonData = await jsonfetch(path);
  return jsonData;
}

export async function fetchCategoryNews(path) {
  const jsonData = await jsonfetch(path);
  jsonData.forEach((eachCategory) => {
    shuffle_press(eachCategory.press);
  });
  return jsonData;
}

async function jsonfetch(path) {
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
function shuffle_press(press) {
  console.log(press);
  let currentIndex = press.length,
    tempValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tempValue = press[currentIndex];
    press[currentIndex] = press[randomIndex];
    press[randomIndex] = tempValue;
  }
}

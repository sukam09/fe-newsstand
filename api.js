export async function fetchData() {
  const jsonData = await jsonfetch();
  shuffle_id(jsonData);
  console.log(jsonData);
  return jsonData;
}

async function jsonfetch() {
  return fetch("./Data/grid_icon.json").then((response) => {
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

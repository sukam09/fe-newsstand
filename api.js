const news_icon = require("./Data/grid_icon.json");

function shuffle_id() {
  let currentIndex = news_icon.length,
    tempValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tempValue = news_icon[currentIndex].id;
    news_icon[currentIndex].id = news_icon[randomIndex].id;
    news_icon[randomIndex].id = tempValue;
  }
}

shuffle_id();

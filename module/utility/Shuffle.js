export function shuffle_id(news_icon) {
  let currentIndex = news_icon.length,
    tempValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tempValue = news_icon[currentIndex];
    news_icon[currentIndex] = news_icon[randomIndex];
    news_icon[randomIndex] = tempValue;
  }
}
export function shuffle_press(press) {
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

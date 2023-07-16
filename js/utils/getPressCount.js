export function getPressCount(category_news) {
  const uniquePressSet = new Set();
  category_news.forEach((news) => {
    uniquePressSet.add(news.press);
  });
  return Array.from(uniquePressSet);
}

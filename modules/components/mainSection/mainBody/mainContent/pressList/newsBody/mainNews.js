export function mainNews(categoryNews) {
  const mainNews = `
    <div class="main_news flex_column">
      <img src=${categoryNews.imgSrc} class="main_news_img"/>
      <div class="main_news_title">${categoryNews.mainTitle}</div>
    </div>`;

  return mainNews;
}

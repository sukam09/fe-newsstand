export function mainNews(categoryNews) {
  const mainNews = `
    <div class="main_news flex_column">
      <img src=${categoryNews.imgSrc} class="news_main_img"/>
      <div class="news_info_title">${categoryNews.mainTitle}</div>
    </div>`;

  return mainNews;
}

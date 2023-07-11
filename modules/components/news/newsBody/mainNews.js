export function mainNews(press) {
  const mainNews = `
    <div class="main_news flex_column">
      <img src=${press.imgSrc} class="news_info_main_img"/>
      <div class="news_info_title">${press.mainTitle}</div>
    </div>`;

  return mainNews;
}

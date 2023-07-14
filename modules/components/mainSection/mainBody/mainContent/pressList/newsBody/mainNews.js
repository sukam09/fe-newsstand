export function createMainNews(categoryNews) {
  const mainNews = `
    <div class="main_news flex_column">
      <div class="main_news_img_container"> 
        <img src=${categoryNews.imgSrc} class="main_news_img"/>
      </div>
      <div class="main_news_title">${categoryNews.mainTitle}</div>
    </div>`;

  return mainNews;
}

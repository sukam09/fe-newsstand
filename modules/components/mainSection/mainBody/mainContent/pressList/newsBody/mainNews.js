export function createMainNews(press) {
  const mainNews = `
    <div class="main_news flex_column">
      <div class="main_news_img_container"> 
        <img src=${press.data.mainImgSrc} class="main_news_img"/>
      </div>
      <div class="main_news_title">${press.data.mainTitle}</div>
    </div>`;

  return mainNews;
}

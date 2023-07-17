export function drawPressNews(category_news, press) {
  let main_news,
    sub_news = "";
  category_news.forEach((news) => {
    if (news.name === press) {
      main_news = `<img src="${news.main_news.thumbnail}" alt="thumbnail"/>
        <p class="thumbnail-title">${news.main_news.title}</p>`;
      news.sub_news.forEach((subnews) => {
        sub_news += `<li>
        ${subnews}
      </li>`;
      });
    }
  });
  sub_news += `<li id="caption">
  ${press} 언론사에서 직접 편집한 뉴스입니다.
  </li>`;
  const news_content = document.querySelector(".news-content");
  news_content.innerHTML = `<div class="main-news">
      ${main_news}
    </div>
    <div class = "sub-news">
    <ul class = "sub-news-ul">
     ${sub_news}
  </ul>
  </div>`;
}

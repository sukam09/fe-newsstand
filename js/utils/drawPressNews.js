export function drawPressNews(category_news, press) {
  let main_news,
    sub_news = "";
  category_news.forEach((news) => {
    if (news.press === press) {
      if (news.thumbnail === "") {
        sub_news += ` <li>
        ${news.title}
      </li>`;
      } else {
        main_news = `<img src="${news.thumbnail}" alt="thumbnail"/>
        <p class="thumbnail-title">${news.title}</p>`;
      }
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

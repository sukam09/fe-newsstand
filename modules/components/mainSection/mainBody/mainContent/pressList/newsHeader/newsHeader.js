export function newsHeader(categoryNews) {
  const newsHeader = `
    <div class="news_header">
      <img src=${categoryNews.logoSrc} />
      <button class="news_info_sub_button"> + 구독하기 </button>
    </div>
    `;

  return newsHeader;
}

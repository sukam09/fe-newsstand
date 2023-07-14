export function createNewsHeader(categoryNews) {
  const newsHeader = `
    <div class="news_header flex_row">
      <img src=${categoryNews.logoSrc} />
      <span>${categoryNews.editTime} 편집</span>
      <button class="news_info_sub_button"> + 구독하기 </button>
    </div>
    `;

  return newsHeader;
}

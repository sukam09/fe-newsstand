export function createNewsHeader(press) {
  const newsHeader = `
    <div class="news_header flex_row">
      <img src=${press.lightSrc} />
      <span>${press.data.editTime} 편집</span>
      <button class="news_info_sub_button"> + 구독하기 </button>
    </div>
    `;

  return newsHeader;
}

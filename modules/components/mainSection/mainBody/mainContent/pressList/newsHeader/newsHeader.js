export function newsHeader(press) {
  const newsHeader = `
    <div class="news_header">
      <img src=${press.logoSrc} />
      <button class="news_info_sub_button"> + 구독하기 </button>
    </div>
    `;

  return newsHeader;
}

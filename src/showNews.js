function showNews(shuffledPressNews, category_idx, newsPage) {
  /** 언론사 로고, 편집 날짜 띄우기 */
  const $pressNewsInfo = document.querySelector('.press-news-info');
  $pressNewsInfo.innerHTML = `
    <img src="./assets/logo/light/img${shuffledPressNews[category_idx][newsPage]["id"]}.svg" alt="${shuffledPressNews[category_idx][newsPage]["name"]}">
    <span class="display-medium12 text-default">${shuffledPressNews[category_idx][newsPage]["editDate"]}</span>
    <img src="./assets/Icon/subscribeButton.svg" alt="">
  `
  /**썸네일, main-title 띄우기*/
  const $pressNewsMain = document.querySelector('.press-news-main');
  $pressNewsMain.innerHTML = `
    <img class="press-news-thumbnail" src="./assets/thumbnail/Thumbnail.png">
    <p class="press-news-title available-medium16 text-strong">${shuffledPressNews[category_idx][newsPage]["mainTitle"]}</p>
  `
  /** sub-title */
  const $pressNewsSub = document.querySelector('.press-news-sub');
  $pressNewsSub.innerHTML = `
    ${shuffledPressNews[category_idx][newsPage]["subTitle"].map(sub => `<li class = "press-news-sub-list">${sub}</li>`).join('')}
  `
}

export default showNews
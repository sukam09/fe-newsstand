import turnNewsPage from "./turnNewsPage.js";

function showNews(shuffledPressNews, categoryIdx, newsPage) {
  /** 언론사 로고, 편집 날짜 띄우기 */
  const $pressNewsInfo = document.querySelector('.press-news-info');
  $pressNewsInfo.innerHTML = `
    <img src="./assets/logo/light/img${shuffledPressNews[categoryIdx][newsPage]["id"]}.svg" alt="${shuffledPressNews[categoryIdx][newsPage]["name"]}">
    <span class="display-medium12 text-default">${shuffledPressNews[categoryIdx][newsPage]["editDate"]}</span>
    <img src="./assets/Icon/subscribeButton.svg" alt="">
  `
  /**썸네일, main-title 띄우기*/
  const $pressNewsMain = document.querySelector('.press-news-main');
  $pressNewsMain.innerHTML = `
    <img class="press-news-thumbnail" src="./assets/thumbnail/Thumbnail.png">
    <p class="press-news-title available-medium16 text-strong">${shuffledPressNews[categoryIdx][newsPage]["mainTitle"]}</p>
  `
  /** sub-title 띄우기*/
  const $pressNewsSub = document.querySelector('.press-news-sub');
  $pressNewsSub.innerHTML = `
    ${shuffledPressNews[categoryIdx][newsPage]["subTitle"].map(sub => `<li class = "press-news-sub-list">${sub}</li>`).join('')}
  `
}

export default showNews
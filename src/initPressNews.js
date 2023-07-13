import { fetchpressNews } from "./dataFetch.js"

const pressNewsList = [[], [], [], [], [], [], []];
const shuffledPressNewsList = [[], [], [], [], [], [], []];

/**
카테고리 별 언론사 순서 랜덤으로 섞기
 */
async function randomizeNews() {
  const pressNewsData = await fetchpressNews();
  const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문직", "지역"];
  pressNewsList.forEach((arr, idx) => {
    pressNewsList[idx] = pressNewsData.filter(press => press["category"] === category[idx]);
    shuffledPressNewsList[idx] = [...pressNewsList[idx]].sort(() => Math.random() - 0.5);
  })
}

/**
초기값으로 첫번 째 종합/경제 뉴스 보여주기
 */
async function initNews() {
  await randomizeNews();
  const $pressNewsInfo = document.querySelector('.press-news-info');
  $pressNewsInfo.innerHTML = `
    <img src="./assets/logo/light/img${shuffledPressNewsList[0][0]["id"]}.svg" alt="${shuffledPressNewsList[0][0]["name"]}">
    <span class="display-medium12 text-default">${shuffledPressNewsList[0][0]["editDate"]}</span>
    <img src="./assets/Icon/subscribeButton.svg" alt="">
  `

  const $pressNewsMain = document.querySelector('.press-news-main');
  $pressNewsMain.innerHTML = `
    <img class="press-news-thumbnail" src="./assets/thumbnail/Thumbnail.png">
    <p class="press-news-title available-medium16 text-strong">${shuffledPressNewsList[0][0]["mainTitle"]}</p>
  `

  const $pressNewsSub = document.querySelector('.press-news-sub');
  $pressNewsSub.innerHTML = `
    ${shuffledPressNewsList[0][0]["subTitle"].map(sub => `<li class = "press-news-sub-list">${sub}</li>`).join('')}
  `
}

export default initNews
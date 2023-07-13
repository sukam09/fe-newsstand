import { FIRST_PAGE_IDX, ONE_PRESS_CNT } from "./constant.js";
import { fetchPressInfos } from "./dataFetch.js";
import turnPressPage from "./turnPressPage.js";

const $sectionNewsList = document.querySelector('.press-lists');
const pressList = [];
const page = [[], [], [], []];

async function randomizeImgs() {
  const pressInfoArr = await fetchPressInfos();
  pressInfoArr.forEach(pressInfo => {
    pressList.push({ "id": pressInfo["id"] })
  })

  const shuffledArray = [...pressList].sort(() => Math.random() - 0.5);
  shuffledArray.forEach((pressId, idx) => {
    const pageIndex = Math.floor(idx / ONE_PRESS_CNT);
    page[pageIndex].push(pressId);
  })
}

async function initPressImg() {
  await randomizeImgs();
  $sectionNewsList.innerHTML = `
  ${page[FIRST_PAGE_IDX].map(arr => `<li><img class="pointer" src="./assets/logo/light/img${arr["id"]}.svg"</li>`).join('')};
`
  turnPressPage(page);
}

export default initPressImg;


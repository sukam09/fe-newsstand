import { FIRST_PAGE_IDX, ONE_PRESS_CNT } from "./constant.js";
import { fetchPressInfos } from "./dataFetch.js";
import turnPressPage from "./turnPressPage.js";

const $sectionNewsList = document.querySelector('.press-lists');
const pressList = [];
const page = [[], [], [], []];

/**
 언론사 정보를 가져오고 id를 배열에 넣음
 */
async function randomizeImgs() {
  const pressInfoArr = await fetchPressInfos();
  pressInfoArr.forEach(pressInfo => {
    pressList.push({ "id": pressInfo["id"] })
  })

  /**
   id가 들어있는 배열을 랜덤화함
   */
  const shuffledArray = [...pressList].sort(() => Math.random() - 0.5);
  shuffledArray.forEach((pressId, idx) => {
    const pageIndex = Math.floor(idx / ONE_PRESS_CNT);
    page[pageIndex].push(pressId);
  })
}

/**
 맨 처음 화면을 구성하는 전체 언론사 그리드 페이지 만듦
 */
async function initPressImg() {
  await randomizeImgs();
  $sectionNewsList.innerHTML = `
  ${page[FIRST_PAGE_IDX].map(arr => `<li><img class="pointer" src="./assets/logo/light/img${arr["id"]}.svg"</li>`).join('')};
`
  turnPressPage(page);
}

export default initPressImg;


import { FIRST_PAGE_IDX, ONE_PRESS_CNT } from "../../constant.js";
import { fetchPressInfos } from "../../dataFetch.js";
import turnPressPage from "./pageMoveButton.js";

const $sectionNewsList = document.querySelector('.press-lists');
const pressList = [];
const page = [[], [], [], []];

/**
 언론사 id 순서 랜덤화해서 각 페이지에 id할당
 */
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

/**
 맨 처음 화면을 구성하는 전체 언론사 그리드 페이지 띄우기
 */
async function initPressImg() {
  await randomizeImgs();
  drawPressImg(page, FIRST_PAGE_IDX);
  turnPressPage(page);
}

function drawPressImg(page, gridPageIndex) {
  $sectionNewsList.innerHTML = `
  ${page[gridPageIndex].map(arr => `<li><img class="pointer" src="./assets/logo/light/img${arr["id"]}.svg"</li>`).join('')};
`
}

export { initPressImg, drawPressImg }

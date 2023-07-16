import { FIRST_PAGE_IDX, LEFT_UNDISPLAY, RIGHT_UNDISPLAY } from "./constant.js";
const $pagePrevButton = document.querySelector('.left-button');
const $pageNextButton = document.querySelector('.right-button');
let pageCnt = FIRST_PAGE_IDX;

/**
 페이지 넘기는 버튼의 클릭 이벤트 핸들링
 */
function turnPressPage(page) {
  $pagePrevButton.addEventListener('click', (event) => handleClickTurner(event, page));
  $pageNextButton.addEventListener('click', (event) => handleClickTurner(event, page));
}

/**
 페이지 넘기는 버튼 유무 설정
 */
function showPageTurner() {
  $pagePrevButton.style.display = pageCnt !== LEFT_UNDISPLAY ? "block" : "none";
  $pageNextButton.style.display = pageCnt >= RIGHT_UNDISPLAY ? "none" : "block"
}

/**
 해당 페이지에 맞는 언론사 리스트 띄우기
 */
function handleClickTurner(event, page) {
  const $sectionNewsList = document.querySelector('.press-lists');
  event.target.className.animVal === 'left-button' ? pageCnt-- : pageCnt++;
  $sectionNewsList.innerHTML = `
  ${page[pageCnt].map(arr => `<li><img class="pointer" src="./assets/logo/light/img${arr["id"]}.svg"</li>`).join('')};
  `
  showPageTurner();
}

export default turnPressPage;
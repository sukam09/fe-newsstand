import { LEFT_UNDISPLAY, PRESS_CNT_PER_PAGE } from "../../constant.js";
import pressStore from "../../pressDataStore.js";
import { getPage, getPress, getSubscribedPressId, setPage } from "../../store.js";
import { _changeDispay } from "../../utils.js";
import { drawPressImg } from "./pressLogos.js";

const $pagePrevButton = document.querySelector('.left-button');
const $pageNextButton = document.querySelector('.right-button');
const shuffledAllPress = pressStore.getShuffledAllPress

/**
 페이지 넘기고 해당 페이지에 맞는 로고와 페이지 버튼 그리기
 */
function handleClickTurner(event) {
  const $sectionNewsList = document.querySelector('.press-lists');
  event.target.className.animVal === 'left-button'
    ? setPage(getPage() - 1)
    : setPage(getPage() + 1);
  setPageTurner();
  drawPressImg();
}

/**
 전체 언론사 그리드 보기, 내가 구독한 언론사 그리드 보기에 따라 페이지 넘기는 버튼 유무 설정
 */
function setPageTurner() {
  getPress() === 'my'
    ? showPageTurner(getSubscribedPressId())
    : showPageTurner(shuffledAllPress);
}

/**
 페이지 넘기는 버튼 유무 설정
 */
function showPageTurner(whatPress) {
  if (whatPress.length % PRESS_CNT_PER_PAGE === 0 && whatPress.length === 0) {
    _changeDispay($pagePrevButton, 'none', $pageNextButton, 'none');
  }
  else {
    $pagePrevButton.style.display = getPage() === LEFT_UNDISPLAY ? "none" : "block";
    $pageNextButton.style.display = getPage() === Math.ceil(whatPress.length / PRESS_CNT_PER_PAGE) - 1 ? "none" : "block"
  }
}

/**
 페이지 넘기는 버튼의 클릭 이벤트 핸들링
 */
function turnPressPage() {
  $pagePrevButton.addEventListener('click', handleClickTurner);
  $pageNextButton.addEventListener('click', handleClickTurner);
}

export { turnPressPage, setPageTurner };
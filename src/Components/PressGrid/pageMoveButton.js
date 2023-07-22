import { FIRST_PAGE_IDX, LEFT_UNDISPLAY, RIGHT_UNDISPLAY } from "../../constant.js";
import { shuffledAllPress } from "../../dataFetch.js";
import { getPage, getPress, getSubscribedPressId, setPage } from "../../store.js";
import { _changeDispay } from "../../utils.js";
import { drawPressImg, handleSubscribe } from "./pressLogos.js";

const $pagePrevButton = document.querySelector('.left-button');
const $pageNextButton = document.querySelector('.right-button');

/**
 페이지 넘기는 버튼의 클릭 이벤트 핸들링
 */
function turnPressPage() {
  setPageTurner();
  $pagePrevButton.addEventListener('click', handleClickTurner);
  $pageNextButton.addEventListener('click', handleClickTurner);
}

/**
 페이지 카운트 하기
 */
function handleClickTurner(event) {
  const $sectionNewsList = document.querySelector('.press-lists');
  event.target.className.animVal === 'left-button'
    ? setPage(getPage() - 1)
    : setPage(getPage() + 1);
  setPageTurner();
  drawPressImg()
  handleSubscribe();
}

/**
 페이지 넘기는 버튼 유무 설정
 */
function setPageTurner() {
  if (getPress() === 'my') showPageTurner(getSubscribedPressId());
  else showPageTurner(shuffledAllPress);
}

function showPageTurner(whatPress) {
  if (whatPress.length % 24 === 0 && whatPress.length === 0) {
    _changeDispay($pagePrevButton, 'none', $pageNextButton, 'none');
  }
  else {
    $pagePrevButton.style.display = getPage() === LEFT_UNDISPLAY ? "none" : "block";
    $pageNextButton.style.display = getPage() === Math.ceil(whatPress.length / 24) - 1 ? "none" : "block"
  }

}

export default turnPressPage;
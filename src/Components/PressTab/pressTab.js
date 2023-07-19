import { TEXT_WEAK, TEXT_POINT } from "../../constant.js";
import { _changeDispay } from "../../utils.js";

const $listIcon = document.querySelector('.list-button');
const $gridIcon = document.querySelector('.grid-button');

/**
리스트 아이콘 클릭하면 뉴스 보기로 바뀜
 */
function changeViewToList() {
  $listIcon.addEventListener('click', () => handleChangeView('list-button'));
}

/**
 그리드 아이콘 클릭하면 언론사 보기로 바뀜
 */
function changeViewToGrid() {
  $gridIcon.addEventListener('click', () => handleChangeView('grid-button'));
}

/**
 그리드, 리스트 아이콘 클릭 시 화면에서 없애기 또는 띄우기
 */
function handleChangeView(clickedButton) {
  const $pressGrid = document.querySelector('.press-grid-container');
  const $newsList = document.querySelector('.press-news-list-container');

  if (clickedButton === 'list-button') {
    _changeDispay($pressGrid, 'none', $newsList, 'block')
    changeIconColor(clickedButton, 'grid-button')
  }
  else {
    _changeDispay($newsList, 'none', $pressGrid, 'block');
    changeIconColor(clickedButton, 'list-button');
  }
}

/**
 그리드, 리스트 아이콘 클릭 시 아이콘의 색 변화 주기
 */
function changeIconColor(clickedButton, unClickedButton) {
  const $clickedButtonContent = document.querySelector(`.${clickedButton}-content`);
  const $unClickedButtonContent = document.querySelector(`.${unClickedButton}-content`);
  $clickedButtonContent.setAttribute('fill', TEXT_POINT);
  $unClickedButtonContent.setAttribute('fill', TEXT_WEAK);
}



function changeView() {
  changeViewToGrid();
  changeViewToList();
}

export default changeView

import { TEXT_WEAK, TEXT_POINT } from "../../constant.js";
import { getPress, getView, setClickedCategoryIndex, setPage, setPress, setView, store } from "../../store.js";
import { _changeClass, _changeDispay } from "../../utils.js";
import { initPressImg } from "../PressGrid/pressLogos.js";
import { initNews } from "../PressList/pressNews.js";

const $pressGrid = document.querySelector('.press-grid-container');
const $newsList = document.querySelector('.press-news-list-container');
const $allPress = document.querySelector('.tab-all-press');
const $mySubscribedPress = document.querySelector('.tab-subscribed-press');
const $listViewBtnContent = document.querySelector('.list-button-content');
const $gridViewBtnContent = document.querySelector('.grid-button-content');

/** 모든 언론사 또는 내가 구독한 언론사 클릭 이벤트 설정*/
function clickChangePressViewBtn() {
  $allPress.addEventListener('click', handleClickChangePressViewBtn.bind(null, 'all'));
  $mySubscribedPress.addEventListener('click', handleClickChangePressViewBtn.bind(null, 'my'));
}

/** 모든 언론사 또는 내가 구독한 언론사 클릭 이벤틑 핸들러 */
function handleClickChangePressViewBtn(whatPressView) {
  setPress(whatPressView)
  changePressView();
}

/** 클릭한 언론사 보기에 따라 화면 설정 */
function changePressView() {
  setPressViewDisplay();
  setViewIconColor();
}

/** 클릭한 언론사 보기에 따른 메인 화면 설정 */
function setPressViewDisplay() {
  if (getPress() === 'all') setClickAllPress();
  else setClickMyPress();
}

/** 모든 언론사 클릭 했을 때의 메인 화면 설정 */
function setClickAllPress() {
  changeClass($mySubscribedPress, $allPress);
  _changeDispay($newsList, 'none', $pressGrid, 'block')
  setPress('all');
  setView('grid');
  initPressImg();
}

/** 내가 구독한 언론사 클릭 했을 때의 메인 화면 설정 */
function setClickMyPress() {
  changeClass($allPress, $mySubscribedPress)
  _changeDispay($pressGrid, 'none', $newsList, 'block')
  setPress('my');
  setView('list');
  initNews();
}

/** 클릭한 언론사 보기에 따라 전체 언론사와 내가 구독한 언론사 CSS 설정 */
function changeClass(unclicked, clicked) {
  _changeClass(unclicked, 'press-view-active', 'press-view-nonactive');
  _changeClass(clicked, 'press-view-nonactive', 'press-view-active');
}

/** 리스트 보기 또는 그리드 보기 클릭 이벤트 설정 */
function clickChangeViewerViewBtn() {
  const $listIcon = document.querySelector('.list-button');
  const $gridIcon = document.querySelector('.grid-button');
  $listIcon.addEventListener('click', handleChangeViewerView.bind(null, 'list'));
  $gridIcon.addEventListener('click', handleChangeViewerView.bind(null, 'grid'));
}

/** 리스트 보기 도는 그리드 보기 클릭 이벤트 핸들러 */
function handleChangeViewerView(howView) {
  setView(howView);
  changeViewerView();
}

/** 클릭한 뷰어에 따라 화면 설정 */
function changeViewerView() {
  setViewerViewDisplay();
  setViewIconColor();
}

/** 클릭한 뷰어에 따른 메인 화면 설정 */
function setViewerViewDisplay() {
  if (getView() === 'list') {
    _changeDispay($pressGrid, 'none', $newsList, 'block')
    initNews();
  }
  else {
    _changeDispay($newsList, 'none', $pressGrid, 'block');
    initPressImg();
  }
}

/** 클릭한 리스트 보기 또는 뷰어에 따라 뷰 아이콘 색 설정 */
function setViewIconColor() {
  if (getView() === 'list') setViewIconColorOfList();
  else setViewIconColorOfGrid();
}

/** 리스트 보기 클릭 했을 때의 뷰 아이콘 색 설정 */
function setViewIconColorOfList() {
  $listViewBtnContent.setAttribute('fill', TEXT_POINT);
  $gridViewBtnContent.setAttribute('fill', TEXT_WEAK);
}

/** 그리드 보기 클릭 했을 때의 뷰 아이콘 색 설정 */
function setViewIconColorOfGrid() {
  $listViewBtnContent.setAttribute('fill', TEXT_WEAK);
  $gridViewBtnContent.setAttribute('fill', TEXT_POINT);
}

function changeView() {
  changePressView();
  changeViewerView();
}

function clickchangeViewBtn() {
  clickChangeViewerViewBtn();
  clickChangePressViewBtn();
}

/** 초기화면 설정 */
function initView() {
  $allPress.classList.add('press-view-active')
  $mySubscribedPress.classList.add('press-view-nonactive')
  setPress('all');
  setView('grid');
  clickchangeViewBtn();
}
export { changeView, initView }

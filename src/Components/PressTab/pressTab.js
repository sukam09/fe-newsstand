import { TEXT_WEAK, TEXT_POINT, FIRST_PAGE_IDX } from "../../constant.js";
import { getPress, getView, setPage, setPress, setView, store } from "../../store.js";
import { _changeClass, _changeDispay } from "../../utils.js";
import { drawPressImg } from "../PressGrid/pressLogos.js";
import turnPressPage from "../PressGrid/pageMoveButton.js";


const $allPress = document.querySelector('.tab-all-press');
const $mySubscribedPress = document.querySelector('.tab-subscribed-press');

function clickChangePressViewBtn() {
  $allPress.addEventListener('click', handleClickChangePressViewBtn.bind(null, 'all'));
  $mySubscribedPress.addEventListener('click', handleClickChangePressViewBtn.bind(null, 'my'));
}

function handleClickChangePressViewBtn(whatPressView) {
  setPress(whatPressView)
  changePressView();
}

function changePressView() {
  if (getPress() === 'all') {
    _changeClass($allPress, 'press-view-nonactive', 'press-view-active')
    _changeClass($mySubscribedPress, 'press-view-active', 'press-view-nonactive')
    setPress('all');
    setView('grid')
    setPage(0);
    drawPressImg();
    turnPressPage();
  }
  else {
    _changeClass($mySubscribedPress, 'press-view-nonactive', 'press-view-active')
    _changeClass($allPress, 'press-view-active', 'press-view-nonactive')
    setPress('my');
    setView('list');
    setPage(0);
    drawPressImg();
    turnPressPage();
  }
}

function clickChangeViewerViewBtn() {
  const $listIcon = document.querySelector('.list-button');
  const $gridIcon = document.querySelector('.grid-button');
  $listIcon.addEventListener('click', handleChangeViewerView.bind(null, 'list'));
  $gridIcon.addEventListener('click', handleChangeViewerView.bind(null, 'grid'));
}

function handleChangeViewerView(howView) {
  setView(howView);
  changeViewerView();
}


function setDisplay() {
  const $pressGrid = document.querySelector('.press-grid-container');
  const $newsList = document.querySelector('.press-news-list-container');
  if (getView() === 'list') _changeDispay($pressGrid, 'none', $newsList, 'block')
  else _changeDispay($newsList, 'none', $pressGrid, 'block');
}

function setViewIconColor() {
  const $listViewBtnContent = document.querySelector('.list-button-content');
  const $gridViewBtnContent = document.querySelector('.grid-button-content');
  if (getView() === 'list') {
    $listViewBtnContent.setAttribute('fill', TEXT_POINT);
    $gridViewBtnContent.setAttribute('fill', TEXT_WEAK);
  }
  else {
    $listViewBtnContent.setAttribute('fill', TEXT_WEAK);
    $gridViewBtnContent.setAttribute('fill', TEXT_POINT);
  }
}

function changeViewerView() {
  setDisplay();
  setViewIconColor();
}

function changeView() {
  changePressView();
  changeViewerView();
}

function clickchangeViewBtn() {
  clickChangeViewerViewBtn();
  clickChangePressViewBtn();
}

function initView() {
  $allPress.classList.add('press-view-active')
  $mySubscribedPress.classList.add('press-view-nonactive')
  setPress('all');
  setView('grid');
  clickchangeViewBtn();
}
export { changeView, initView }

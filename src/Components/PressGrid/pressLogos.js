import { FIRST_PAGE_IDX, ONE_PRESS_CNT } from "../../constant.js";
import { fetchPressInfos } from "../../dataFetch.js";
import turnPressPage from "./pageMoveButton.js";
import { store, addpress, removepress } from "../../store.js"


/**
 언론사 id 순서 랜덤화해서 각 페이지에 id할당
 */
async function randomizeImgs() {
  const pressInfoArr = await fetchPressInfos();
  const pressList = [...Array(0)].map(() => []);
  const pressLogoPage = [...Array(4)].map(() => []);

  pressInfoArr.forEach(pressInfo => {
    pressList.push({ "id": pressInfo["id"] })
  })

  const shuffledArray = [...pressList].sort(() => Math.random() - 0.5);
  shuffledArray.forEach((pressId, idx) => {
    const pageIndex = Math.floor(idx / ONE_PRESS_CNT);
    pressLogoPage[pageIndex].push(pressId);
  })

  return pressLogoPage;
}

/**
 언론사 이미지 띄우기
 */
function drawPressImg(page, gridPageIndex) {
  const $sectionNewsList = document.querySelector('.press-lists');
  $sectionNewsList.innerHTML = `
  ${page[gridPageIndex].map(arr =>
    `<li class="current-logos-container">
    <img class="pointer current-logos" data-id=${arr["id"]} src="./assets/logo/light/img${arr["id"]}.svg"></li>`).join('')}
    `
}

/** 마우스 호버 이벤트 걸기 */
function showSubscribeBtn() {
  const $presses = document.querySelectorAll('.current-logos-container');
  $presses.forEach((press) => {
    press.addEventListener('mouseenter', () => handleShowSubscribeBtn(event, 'subscribeBtn'));
    press.addEventListener('mouseleave', () => handleShowSubscribeBtn(event, 'logo'));
  })
}

/** 구독하기/해지하기 어떤 것 띄울 지 결정하기 */
function handleShowSubscribeBtn(event, whatDisplay) {
  const hoveredPressId = event.target.children[0].getAttribute('data-id');
  const isSubscribedPress = store.isExist(store.pressesId, hoveredPressId) === true ? true : false
  if (whatDisplay === 'subscribeBtn' && !isSubscribedPress) {
    event.target.children[0].src = "/assets/Icon/subscribeButton.svg"
    event.target.style.backgroundColor = '#F5F7F9'
  }
  if (whatDisplay === 'subscribeBtn' && isSubscribedPress) {
    event.target.children[0].src = "/assets/Icon/unsubscribeButton.svg"
    event.target.style.backgroundColor = '#F5F7F9'
  }
  if (whatDisplay === 'logo') {
    event.target.children[0].src = `/assets/logo/light/img${hoveredPressId}.svg`
    event.target.style.backgroundColor = '#FFFFFF'
  }
}

/** 구독하기 또는 해지하기 클릭 이벤트 걸기 */
function clickSubscribeBtn() {
  const $presses = document.querySelectorAll(".current-logos");
  $presses.forEach((press) => {
    press.addEventListener('click', handleClickSubscribeBtn)
  })
}

/** 구독/해지 하기  */
function handleClickSubscribeBtn(event) {
  const clickedPressId = event.target.getAttribute('data-id');
  store.isExist(store.pressesId, clickedPressId) === true ? removepress(clickedPressId) : addpress(clickedPressId);
}

function handleSubscribe() {
  showSubscribeBtn();
  clickSubscribeBtn();
}


/**
 맨 처음 화면을 구성하는 전체 언론사 그리드 페이지 띄우기
 */
async function initPressImg() {
  const page = await randomizeImgs();
  drawPressImg(page, FIRST_PAGE_IDX);
  turnPressPage(page);
  handleSubscribe()
}


export { initPressImg, drawPressImg, handleSubscribe }

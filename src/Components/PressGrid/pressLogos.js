import { addpress, getPage, getPress, getSubscribedPressId, getView, removepress, setPage, setPress, setView, store } from "../../Store/store.js";
import { FIRST_PAGE_IDX, PRESS_CNT_PER_PAGE, SURFACE_ALT, SURFACE_DEFAULT, SNACKBAR_DURATION } from "../../constant.js";
import { PATH_SUBSCRIBE_BTN, PATH_UNSUBSCRIBE_BTN } from "../../path.js";
import pressStore from "../../pressDataStore.js";
import { changeView } from "../PressTab/pressTab.js";
import { setPageTurner, turnPressPage } from "./pageMoveButton.js";

const $gridSnackBar = document.querySelector('.grid-snackbar')
const shuffledAllPress = pressStore.getShuffledAllPress

/**
 언론사 그리드 띄우기
 */
function drawPressImgContent(whatPress) {
  resetGridView();
  drawGridLogos(whatPress);
  handleSubscribe();
}

/** 언론사 로고 띄우기 */
function drawGridLogos(whatPress) {
  const currentPageGridPress = whatPress.slice(getPage() * PRESS_CNT_PER_PAGE, getPage() * PRESS_CNT_PER_PAGE + PRESS_CNT_PER_PAGE);
  const $pressList = document.querySelectorAll('.current-logos-container');
  for (let i = 0; i < currentPageGridPress.length; i++) {
    $pressList[i].innerHTML = `
    <img class = "pointer current-logos" data-id = "${currentPageGridPress[i].id}" src="${currentPageGridPress[i].lightSrc}">
    `
  }
}

/** 그리드 초기화 */
function resetGridView() {
  const $allLogos = document.querySelectorAll('.current-logos');
  $allLogos.forEach(press => {
    press.remove();
  })
}

/** 구독하기/해지하기 마우스 호버, 클릭 이벤트 등록과 핸들링 */
function handleSubscribe() {
  showSubUnsubBtn();
  clickSubUnsubBtn();
}

/** 언론사 이미지 마우스 호버 이벤트 걸기 */
function showSubUnsubBtn() {
  const $presses = document.querySelectorAll('.current-logos');
  Array.from($presses).forEach((press) => {
    press.parentElement.addEventListener('mouseenter', () => handleShowSubUnsubBtn(event, 'subscribeBtn'));
    press.parentElement.addEventListener('mouseleave', () => handleShowSubUnsubBtn.call(this, event, 'logo'));
  })
}

/** 구독하기/해지하기 어떤 것 띄울 지 결정하기 */
function handleShowSubUnsubBtn({ target }, whatDisplay) {
  if (isLogoExist(target)) {
    const hoveredPressId = parseInt(target.children[0].getAttribute('data-id'));
    const isSubscribedPress = store.isSubscribed(hoveredPressId);

    if (whatDisplay === 'subscribeBtn' && !isSubscribedPress) {
      setImgAndBackgroundColor(target, PATH_SUBSCRIBE_BTN, SURFACE_ALT)
    }
    else if (whatDisplay === 'subscribeBtn' && isSubscribedPress) {
      setImgAndBackgroundColor(target, PATH_UNSUBSCRIBE_BTN, SURFACE_ALT)
    }
    else if (whatDisplay === 'logo') {
      shuffledAllPress.filter(press => press.id === hoveredPressId)
        .forEach(press => setImgAndBackgroundColor(target, press.lightSrc, SURFACE_DEFAULT))
    }
  }
}

/** 로고가 있어야 구독하기/해지하기 띄움 */
function isLogoExist(target) {
  return (target.getElementsByClassName('current-logos').length !== 0)
}

/** 마우스 호버시 버튼과 배경색 바뀜 */
function setImgAndBackgroundColor(target, path, backgroundColor) {
  target.children[0].src = path;
  target.style.backgroundColor = backgroundColor;
}

/** 구독하기 또는 해지하기 클릭 이벤트 걸기 */
function clickSubUnsubBtn() {
  const $presses = document.querySelectorAll(".current-logos");
  $presses.forEach(press => {
    press.addEventListener('click', handleClickSubUnsubBtn)
  })
}

/** 구독하기/해지하기  */
function handleClickSubUnsubBtn({ target }) {
  const clickedPressId = parseInt(target.getAttribute('data-id'));
  if (store.isSubscribed(clickedPressId) && getPress() === 'my') {
    target.parentElement.style.backgroundColor = SURFACE_DEFAULT;
    removeClickedPressId(clickedPressId);
  }
  else if (store.isSubscribed(clickedPressId) && getPress() === 'all') {
    removeClickedPressId(clickedPressId);
  }
  else {
    addpress(clickedPressId);
  }
}

/** 구독 해지하기 */
function removeClickedPressId(clickedPressId) {
  removepress(clickedPressId);
}

/** 구독하면 내가 구독한 언론사 리스트로 이동 */
function moveSubscribedList() {
  $gridSnackBar.style.display = 'block'
  const $moveSubscribedListTimeout = setTimeout(() => {
    setView('list');
    setPress('my');
    changeView();
    $gridSnackBar.style.display = 'none'
  }, SNACKBAR_DURATION)
}

/** 바깥 border 그리기 */
function drawBorder() {
  const $pressLists = document.querySelector('.press-lists');
  $pressLists.innerHTML = `
    ${new Array(PRESS_CNT_PER_PAGE).fill('').map(arr =>
    `<li class="current-logos-container"></li>`).join('')
    }
  `
}

/**
 내가 구독한 언론사에 대한 정보 받아오기[{},{},{}]
 */
function getSubscribedPressOfGrid() {
  const myPress = shuffledAllPress.filter(press => getSubscribedPressId().includes(press.id))
  return myPress
}

/**
 전체 언론사 보기 / 내가 구독한 언론사 보기
 */
function drawPressImg() {
  const subscribedPress = getSubscribedPressOfGrid();
  getView() === 'grid' && getPress() === 'all'
    ? drawPressImgContent(shuffledAllPress)
    : ''
  getView() === 'grid' && getPress() === 'my'
    ? drawPressImgContent(subscribedPress)
    : ''
}

/**
 맨 처음 화면을 구성하는 전체 언론사 그리드 페이지 띄우기
 */
function initPressImg() {
  setPage(FIRST_PAGE_IDX);
  drawBorder();
  drawPressImg();
  setPageTurner();
  turnPressPage();
}


export { drawPressImg, initPressImg, moveSubscribedList };

import { FIRST_PAGE_IDX, ONE_PRESS_CNT } from "../../constant.js";
import { shuffledAllPress } from "../../dataFetch.js";
import turnPressPage from "./pageMoveButton.js";
import { store, addpress, removepress, setView, setPress, getPress, getSubscribedPressId, getPage, setPage } from "../../store.js"
import { changeViewerView } from "../PressTab/pressTab.js"

/**
 언론사 이미지 띄우기
 */
function drawPressImgContent(whatPress) {
  const $pressList = document.querySelectorAll('.current-logos-container');
  for (let i = getPage() * 24; i < getPage() * 24 + 24; i++) {
    if (i < whatPress.length) {
      $pressList[i].innerHTML = `
      <img class = "pointer current-logos" data-id = "${whatPress[i].id}" src="${whatPress[i].lightSrc}">
    `
    }
  }
}

/**
 내가 구독한 언론사에 대한 정보 받아오기
 */
function getSubscribedPress() {
  const myPress = shuffledAllPress.filter(press => getSubscribedPressId().includes(press.id))
  return myPress
}

/**
 전체 언론사 보기 / 내가 구독한 언론사 보기
 */
function drawPressImg() {
  resetGridView();
  if (getPress() === 'all' && shuffledAllPress.length !== 0) {
    drawPressImgContent(shuffledAllPress)
  }
  else if (getPress() === 'my' && getSubscribedPressId().length !== 0) {
    const subscribedPress = getSubscribedPress();
    drawPressImgContent(subscribedPress);
  }
  handleSubscribe();
}


/** 언론사 이미지 마우스 호버 이벤트 걸기 */
function showSubUnsubBtn() {
  const $presses = document.querySelectorAll('.current-logos');
  Array.from($presses).forEach((press) => {
    press.parentElement.addEventListener('mouseenter', () => handleShowSubUnsubBtn(event, 'subscribeBtn'));
    press.parentElement.addEventListener('mouseleave', () => handleShowSubUnsubBtn.call(this, event, 'logo'));
  })
}

/** 마우스 호버시 버튼과 배경색 바뀜 */
function setImgAndBackgroundColor(target, path, backgroundColor) {
  target.children[0].src = path;
  target.style.backgroundColor = backgroundColor;
}

/** 구독하기/해지하기 어떤 것 띄울 지 결정하기 */
function handleShowSubUnsubBtn({ target }, whatDisplay) {
  if (target.hasChildNodes()) {
    const hoveredPressId = parseInt(target.children[0].getAttribute('data-id'));
    const isSubscribedPress = store.isSubscribed(hoveredPressId);
    if (whatDisplay === 'subscribeBtn' && !isSubscribedPress) {
      setImgAndBackgroundColor(target, "/assets/Icon/subscribeButton.svg", '#F5F7F9')
    }
    else if (whatDisplay === 'subscribeBtn' && isSubscribedPress) {
      setImgAndBackgroundColor(target, "/assets/Icon/unsubscribeButton.svg", '#F5F7F9')
    }
    else if (whatDisplay === 'logo') {
      shuffledAllPress.forEach(press => {
        if (press.id === hoveredPressId) {
          setImgAndBackgroundColor(target, press.lightSrc, '#FFFFFF')
        }
      })
    }
  }
}

/** 구독하기 또는 해지하기 클릭 이벤트 걸기 */
function clickSubUnsubBtn() {
  const $presses = document.querySelectorAll(".current-logos");
  $presses.forEach((press) => {
    press.addEventListener('click', handleClickSubUnsubBtn)
  })
}

/** 구독/해지 하기  */
function handleClickSubUnsubBtn({ target }) {
  const clickedPressId = parseInt(target.getAttribute('data-id'));
  const $gridSnackBar = document.querySelector('.grid-snackbar')
  if (store.isSubscribed(clickedPressId)) {
    removepress(clickedPressId);
    drawPressImg();
  }
  else {
    addpress(clickedPressId);
    $gridSnackBar.style.display = 'block'
    const $moveSubscribedListTimeout = setTimeout(() => {
      setView('list');
      setPress('my');
      changeViewerView();
      $gridSnackBar.style.display = 'none'
    }, 1000)
  }
}

function handleSubscribe() {
  showSubUnsubBtn();
  clickSubUnsubBtn();
}

/** 바깥 border 그리기 */
function drawBorder() {
  const $pressLists = document.querySelector('.press-lists');
  $pressLists.innerHTML = `
    ${new Array(24).fill('').map(arr =>
    `<li class="current-logos-container"></li>`).join('')
    }
  `
}

/** 그리드 초기화 */
function resetGridView() {
  const $allLogos = document.querySelectorAll('.current-logos');
  $allLogos.forEach(press => {
    press.remove();
  })
}

/**
 맨 처음 화면을 구성하는 전체 언론사 그리드 페이지 띄우기
 */
function initPressImg() {
  setPage(0);
  drawBorder();
  drawPressImg();
  turnPressPage();
  handleSubscribe();
}


export { initPressImg, drawPressImg, handleSubscribe }

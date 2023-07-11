function showDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, 0);
  const date = String(now.getDate()).padStart(2, 0);
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const day = week[now.getDay()];
  const $todayDate = document.querySelector('.date');
  $todayDate.innerText = `${year}. ${month}. ${date}. ${day}요일`;
}

function handleClickLogo() {
  const $logo = document.querySelector('.title-icon');
  $logo.addEventListener('click', function () { location.reload() });
}

function initImgs() {
  const $sectionNewsList = document.querySelector('.press-lists');
  const newsList = [];
  const imgId = [];
  const page = [[], [], [], []];
  const PRESS_CNT = 96;
  const ONE_PRESS_CNT = 24;

  for (let i = 0; i < PRESS_CNT; i++) {
    imgId.push(i);
  }

  imgId.forEach(arr => {
    newsList.push({ "id": arr });
  })

  const shuffledArray = [...newsList].sort(() => Math.random() - 0.5);

  shuffledArray.forEach((arr, idx) => {
    const pageIndex = Math.floor(idx / ONE_PRESS_CNT);
    page[pageIndex].push(arr);
  })

  $sectionNewsList.innerHTML = `
    ${page[0].map(arr => `<li><img class="pointer" src="./img/asset ${arr["id"]} 1.png"</li>`).join('')};
  `
  turnPage(page);
}

function turnPage(page) {
  const $pagePrevButton = document.querySelector('.left-button');
  const $pageNextButton = document.querySelector('.right-button');
  const LEFT_UNDISPLAY = 0;
  const RIGHT_UNDISPLAY = 3;
  let pageCnt = 0;

  function showPageTurner() {
    $pagePrevButton.style.display = pageCnt !== LEFT_UNDISPLAY ? "block" : "none";
    $pageNextButton.style.display = pageCnt >= RIGHT_UNDISPLAY ? "none" : "block"
  }

  function handleClickTurner() {
    const $sectionNewsList = document.querySelector('.press-lists');
    this.className === 'left-button' ? pageCnt-- : pageCnt++;
    $sectionNewsList.innerHTML = `
    ${page[pageCnt].map(arr => `<li><img class="pointer" src="./img/asset ${arr["id"]} 1.png"</li>`).join('')};
    `
    showPageTurner();
  }
  $pagePrevButton.addEventListener('click', handleClickTurner);
  $pageNextButton.addEventListener('click', handleClickTurner);
}

function rollNews() {

  function rollNewsLeft() {
    document.addEventListener('DOMContentLoaded', () => {
      const leftInterval = window.setInterval(rollNewsCallback, 5000, 1);
    })
  }

  function rollNewsRight() {
    document.addEventListener('DOMContentLoaded', () => {
      const rightInterval = window.setTimeout(setSpace, 1000)
    })
  }

  rollNewsLeft();
  rollNewsRight();
}

function setSpace() {
  const interval = window.setInterval(rollNewsCallback, 5000, 0);
}

function rollNewsCallback(isLeftNews, isLeftInterval) {
  let newsIdx = null
  isLeftNews === 1 ? newsIdx = 0 : newsIdx = 1;
  const $prev = document.querySelectorAll('.rolling-banner .prev')[newsIdx];
  $prev.classList.remove('prev');

  const $current = document.querySelectorAll('.rolling-banner .current')[newsIdx];
  $current.classList.remove('current');
  $current.classList.add('prev');
  $current.addEventListener('mouseenter', handleSpauseRolling)

  const $next = document.querySelectorAll('.rolling-banner .next')[newsIdx];
  if ($next.nextElementSibling === null) {
    const $nullNext = document.querySelectorAll('.rolling-banner ul li:first-child')[newsIdx];
    $nullNext.classList.add('next');
  }
  else {
    $next.nextElementSibling.classList.add('next');
  }
  $next.classList.remove('next');
  $next.classList.add('current');

  function handleSpauseRolling() {
    
  }
}



export { handleClickLogo, initImgs, showDate, rollNews };


function showDate() {
	const now = new Date();
	const year = now.getFullYear();
  const month = String(now.getMonth()+1).padStart(2,0);
	const date = String(now.getDate()).padStart(2,0);
	const week = ['일', '월', '화', '수', '목', '금', '토'];
	const day = week[now.getDay()];
	const $todayDate = document.querySelector('.date');
	$todayDate.innerText = `${year}. ${month}. ${date}. ${day}요일`;
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
    ${page[0].map(arr => `<li><img src="./img/asset ${arr["id"]} 1.png"</li>`).join('')};
  `
  return page;
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

  function showPressImg() {
    const $sectionNewsList = document.querySelector('.press-lists');
    this.className === 'left-button' ? pageCnt-- : pageCnt++;
    $sectionNewsList.innerHTML = `
    ${page[pageCnt].map(arr => `<li><img src="./img/asset ${arr["id"]} 1.png"</li>`).join('')};
    `
    showPageTurner();
  }
  $pagePrevButton.addEventListener('click', showPressImg);
  $pageNextButton.addEventListener('click', showPressImg);
}

export {turnPage, initImgs, showDate};

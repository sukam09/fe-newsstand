//매직넘버 밖으로 또는 constant file 따로 만들어서 넣기

/**
 년, 월, 일, 요일 화면에 띄우기
 */
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

/**
 로고 클릭하면 새로고침
 */
function handleClickLogo() {
  const $logo = document.querySelector('.title-icon');
  $logo.addEventListener('click', function () { location.reload() });
}

/**
 언론사 리스트 랜덤화해서 첫 페이지 띄우기
 */
function initImgs() {
  const $sectionNewsList = document.querySelector('.press-lists');
  const newsList = [];
  const page = [[], [], [], []];
  const ONE_PRESS_CNT = 24;
  const FIRST_PAGE_IDX = 0;

  async function fetchPressInfos() {
    const response = await fetch("./assets/data/pressInfo.json");
    const jsonData = await response.json();
    return jsonData.pressInfoArr;
  }

  fetchPressInfos().then(pressInfoArr => {
    pressInfoArr.forEach(pressInfo => {
      newsList.push({"id":pressInfo["id"]});
    })

    const shuffledArray = [...newsList].sort(() => Math.random() - 0.5);
    shuffledArray.forEach((pressId, idx) => {
      const pageIndex = Math.floor(idx / ONE_PRESS_CNT);
      page[pageIndex].push(pressId);
    })

    $sectionNewsList.innerHTML = `
      ${page[FIRST_PAGE_IDX].map(arr => `<li><img class="pointer" src="./assets/logo/light/img${arr["id"]}.svg"</li>`).join('')};
    `
  })

   turnPage(page);
}

/**
 페이지 넘기는 버튼의 클릭 이벤트 핸들링
 */
function turnPage(page) {
  const $pagePrevButton = document.querySelector('.left-button');
  const $pageNextButton = document.querySelector('.right-button');
  const LEFT_UNDISPLAY = 0;
  const RIGHT_UNDISPLAY = 3;
  let pageCnt = 0;

  /**
   페이지 넘기는 버튼 유무 설정
   */
  function showPageTurner() {
    $pagePrevButton.style.display = pageCnt !== LEFT_UNDISPLAY ? "block" : "none";
    $pageNextButton.style.display = pageCnt >= RIGHT_UNDISPLAY ? "none" : "block"
  }

  /**
   해당 페이지에 맞는 언론사 리스트 띄우기
   */
  function handleClickTurner() {
    const $sectionNewsList = document.querySelector('.press-lists');
    this.className === 'left-button' ? pageCnt-- : pageCnt++;
    $sectionNewsList.innerHTML = `
    ${page[pageCnt].map(arr => `<li><img class="pointer" src="./assets/logo/light/img${arr["id"]}.svg"</li>`).join('')};
    `
    showPageTurner();
  }
  $pagePrevButton.addEventListener('click', handleClickTurner);
  $pageNextButton.addEventListener('click', handleClickTurner);
}

/**
 최신 뉴스 자동 롤링
 */
function rollNews() {
  const ROLLING_INTERVAL_TIME = 5000;
  const ROLLING_INTERVAL_SPACE_TIME = 1000;

  /**
   왼쪽 최신 뉴스 자동 롤링 설정
   */
  function rollNewsLeft() { //clearInterval을 위해 interval을 전역으로 빼기
    let leftInterval = window.setInterval(rollNewsCallback, ROLLING_INTERVAL_TIME, 'left');
    const $lists = document.querySelectorAll('.rolling-banner .wrap-left li');
    $lists.forEach($list => {
      $list.addEventListener('mouseenter', () => {
        clearInterval(leftInterval);
      });
    })

    $lists.forEach($list => {
      $list.addEventListener('mouseleave', () => {
        leftInterval = window.setInterval(rollNewsCallback, ROLLING_INTERVAL_TIME, 'left');
      })
    })
  }

  /**
   오른쪽 최신 뉴스 자동 롤링 설정
   */
  function rollNewsRight() {
    let rightInterval = window.setTimeout(setSpace, ROLLING_INTERVAL_SPACE_TIME);
  }

  function setSpace() {
    let rightInterval = window.setInterval(rollNewsCallback, ROLLING_INTERVAL_TIME, 'right');
    const $lists = document.querySelectorAll('.rolling-banner .wrap-right li');
    $lists.forEach($list => {
      $list.addEventListener('mouseenter', () => {
        clearInterval(rightInterval);
      });
    })

    $lists.forEach($list => {
      $list.addEventListener('mouseleave', () => {
        rightInterval = window.setInterval(rollNewsCallback, ROLLING_INTERVAL_TIME, 'right');
      })
    })
  }

  rollNewsLeft();
  rollNewsRight();

  /** 
  롤링을 위한 객체의 class명 변경
  (next -> current, current -> prev)
  */
  function rollNewsCallback(isLeftNews) { //줄일 수 있음. 클래스 명에 템플릿 리터럴 이용하기
    const FIRST_NEWS_IDX = 0;
    const SECOND_NEWS_IDX = 1;
    let newsIdx = null;

    isLeftNews === 'left' ? newsIdx = FIRST_NEWS_IDX : newsIdx = SECOND_NEWS_IDX;
    const $prev = document.querySelectorAll('.rolling-banner li.prev')[newsIdx];
    $prev.classList.remove('prev');

    const $current = document.querySelectorAll('.rolling-banner li.current')[newsIdx];
    $current.classList.remove('current');
    $current.classList.add('prev');

    const $next = document.querySelectorAll('.rolling-banner li.next')[newsIdx];
    if ($next.nextElementSibling === null) {
      const $nullNext = document.querySelectorAll('.rolling-banner ul li:first-child')[newsIdx];
      $nullNext.classList.add('next');
    }
    else {
      $next.nextElementSibling.classList.add('next');
    }
    $next.classList.remove('next');
    $next.classList.add('current');
  }

}

export { handleClickLogo, initImgs, showDate, rollNews };


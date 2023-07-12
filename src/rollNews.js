//매직넘버 밖으로 또는 constant file 따로 만들어서 넣기

const ROLLING_INTERVAL_TIME = 5000;
const ROLLING_INTERVAL_SPACE_TIME = 1000;
let newsList = [];

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

/**
최신 뉴스 자동 롤링
*/
function rollNews() {
  rollNewsLeft();
  rollNewsRight();
}

export default rollNews;


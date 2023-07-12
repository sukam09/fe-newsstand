import { ROLLING_INTERVAL_SPACE_TIME, ROLLING_INTERVAL_TIME } from "./constant.js";

/**
 왼쪽 최신 뉴스 자동 롤링 설정
 */
function rollNewsLeft() {
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
function rollNewsCallback(whatNews) {
  const $prev = document.querySelector(`.rolling-banner .wrap-${whatNews} li.prev`);
  $prev.classList.remove('prev');

  const $current = document.querySelector(`.rolling-banner .wrap-${whatNews} li.current`);
  $current.classList.remove('current');
  $current.classList.add('prev');

  const $next = document.querySelector(`.rolling-banner .wrap-${whatNews} li.next`);
  if ($next.nextElementSibling === null) {
    const $nullNext = document.querySelector(`.rolling-banner .wrap-${whatNews} li:first-child`);
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


let interval1; // 왼쪽 article 반복적으로 rolling하는 변수
let interval2; // 오른쪽 article 반복적으로 rolling하는 변수
let timeout; // 오른쪽 article 1초 뒤 실행 관리하는 변수

/**
 * 특정 위치의 롤링 시작 함수
 */
const startRolling = (location, delay) => {
  return window.setInterval(() => rollingCallback(location), delay);
}

/**
 * 전반적인 rolling 관리 함수
 */
const rollingHandler = () => {
  const newsTitleWrapper = document.querySelector('.news_title_wrapper');

  interval1 = startRolling('first', 5000);
  timeout = setTimeout(() => interval2 = startRolling('second', 5000), 1000);

  const clearAllIntervalsAndTimeouts = () => {
    window.clearInterval(interval1);
    window.clearInterval(interval2);
    window.clearTimeout(timeout);
  }

  const restartRolling = () => {
    interval1 = startRolling('first', 5000);
    timeout = setTimeout(() => interval2 = startRolling('second', 5000), 1000);
  }

  newsTitleWrapper.addEventListener('mouseenter', clearAllIntervalsAndTimeouts);
  newsTitleWrapper.addEventListener('mouseleave', restartRolling);
}

/**
 * rolling시 요소 움직이게 하는 함수
 */
const rollingCallback = (location) => {
  const newsWrapper = document.querySelector(`.news_title_wrapper.${location}`);

  const prev = newsWrapper.querySelector('.prev');
  prev.classList.remove('prev');

  const current = newsWrapper.querySelector('.current');
  current.classList.remove('current');
  current.classList.add('prev');

  const next = newsWrapper.querySelector('.next');
  next.classList.remove('next');
  next.classList.add('current');

  const newNext = next.nextElementSibling || newsWrapper.querySelector('p:first-child');
  newNext.classList.add('next');
}

/**
 * 즉시실행함수
 */
(() => {
  rollingHandler();
})();
import { ROLLING_INTERVAL_SPACE_TIME, ROLLING_INTERVAL_TIME, ONE_ROLLINGNEWS_CNT } from "../../constant.js";
import { fetchRollingNews } from "../../dataFetch.js";


async function setLatestNews() {
  const latestNews = await fetchRollingNews();
  const rollingNews = Array.from({ length: 2 }, () => []);

  rollingNews[0] = latestNews.slice(0, ONE_ROLLINGNEWS_CNT);
  rollingNews[1] = latestNews.slice(ONE_ROLLINGNEWS_CNT, 2 * ONE_ROLLINGNEWS_CNT);

  drawRollingNews(rollingNews);
  setRollingNewsClass(rollingNews);
}

function drawRollingNews(rollingNews) {
  const $rollingContainer = document.querySelector('.rolling-news-container');
  $rollingContainer.innerHTML = `
    <div class="rolling-news surface-alt rolling-banner">
      <h3 class="press display-bold14 text-strong">연합뉴스</h3>
      <div class="wrap">
        <ul class="wrap-left">
          ${rollingNews[0].map(news => `
          <li class="available-medium14 text-default">
            <a href="#"> ${news.title} </a>
          </li>
          `).join('')}
        </ul>
      </div>
    </div>

    <div class="rolling-news surface-alt rolling-banner">
      <h3 class="press display-bold14 text-strong">연합뉴스</h3>
      <div class="wrap">
        <ul class="wrap-right">
          ${rollingNews[1].map(news => `
          <li class="available-medium14 text-default">
            <a href="#"> ${news.title} </a>
          </li>
          `).join('')}
        </ul>
      </div>
    </div>
    `
}

function setRollingNewsClass(rollingNews) {
  const $leftNewsList = document.querySelectorAll('.wrap-left li');
  const $rightNewsList = document.querySelectorAll('.wrap-right li');
  console.log($leftNewsList)
  $leftNewsList[0].classList.add("current");
  $rightNewsList[0].classList.add("current");

  $leftNewsList[1].classList.add("next");
  $rightNewsList[1].classList.add("next");

  $leftNewsList[rollingNews[0].length - 1].classList.add("prev");
  $rightNewsList[rollingNews[1].length - 1].classList.add("prev");
}

/**
 뉴스 자동 롤링 설정
 */
function rollNewsBoth(whatRolling) {
  let interval = window.setInterval(rollNewsCallback, ROLLING_INTERVAL_TIME, whatRolling);
  const $lists = document.querySelectorAll(`.rolling-banner .wrap-${whatRolling} li`);
  console.log($lists)
  $lists.forEach($list => {
    $list.addEventListener('mouseenter', () => {
      clearInterval(interval);
    })
    $list.addEventListener('mouseleave', () => {
      interval = window.setInterval(rollNewsCallback, ROLLING_INTERVAL_TIME, `${whatRolling}`);
    })
  })
}

/**
왼쪽 최신 뉴스 자동 롤링 설정
 */
function rollNewsLeft() {
  rollNewsBoth('left');
}

/**
오른쪽 최신 뉴스 1초 후 자동 롤링 설정
*/
function rollNewsRight() {
  let rightInterval = window.setTimeout(rollNewsBoth, ROLLING_INTERVAL_SPACE_TIME, 'right');
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
  setLatestNews();
  rollNewsLeft();
  rollNewsRight();
}

export default rollNews;


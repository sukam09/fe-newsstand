import { getFetchData } from '../utils/fetch.js';

const wrapperElements = {
  left: document.querySelector('.latest_news__wrapper-left'),
  right: document.querySelector('.latest_news__wrapper-right'),
};

const interval = {
  left: null,
  right: null,
  timeOut: null,
};

const HEADER_CLASS = {
  LI: 'latest_news__li',
  H2: 'latest_news__h2',
  P: 'latest_news__p',
};

const SIDE = {
  RIGHT: 'right',
  LEFT: 'left',
};

const NEWS_SLICE = {
  MIN: 0,
  MAX: 10,
};

const ROLLING = {
  INTERVAL: 5000,
  DELAY: 1000,
  PREV: 'prev',
  CURRENT: 'current',
  NEXT: 'next',
};

const DATA_URL = './assets/data/latest-news.json';
const ERROR_MESSES = '최신 뉴스를 불러오는 중에 오류가 발생했습니다.';

/**
 * 최신 뉴스의 INIT
 */
const initLatestNews = async () => {
  try {
    const fetchData = await getFetchData(DATA_URL);
    const latestNews = fetchData.latestNews;
    const newsLeft = divideNews(latestNews, SIDE.LEFT);
    const newsRight = divideNews(latestNews, SIDE.RIGHT);
    setNews(newsLeft, SIDE.LEFT);
    setNews(newsRight, SIDE.RIGHT);
  } catch (error) {
    console.error(ERROR_MESSES, error);
  }
};

const divideNews = (latestNews, side) => {
  if (side === SIDE.LEFT) return latestNews.slice(NEWS_SLICE.MIN, NEWS_SLICE.MAX / 2);
  if (side === SIDE.RIGHT) return latestNews.slice(NEWS_SLICE.MAX / 2, NEWS_SLICE.MAX);
};

const setNews = (latestNews, side) => {
  setWrapper(latestNews, side);
  setHover(side);
  setRolling(side);
  startRolling(side);
};

const getWrapper = (side) => {
  return wrapperElements[side];
};

const setWrapper = (latestNews, side) => {
  const newsWrapper = getWrapper(side);
  latestNews.forEach((news) => setWrapperElement(newsWrapper, news));
};

const setWrapperElement = (newsWrapper, news) => {
  const newsElement = `
    <li class=${HEADER_CLASS.LI}>
      <h2 class=${HEADER_CLASS.H2}'>${news.press}</h2>
      <p class=${HEADER_CLASS.P}>${news.title}</p>
    </li>
  `;
  newsWrapper.insertAdjacentHTML('beforeend', newsElement);
};

const setHover = (side) => {
  const newsWrapper = getWrapper(side);
  const liList = newsWrapper.querySelectorAll(`.latest_news__li`);

  liList.forEach((li) => {
    li.addEventListener('mouseover', setHoverOver, side);
    li.addEventListener('mouseout', setHoverOut);
  });
};

const setHoverOver = (side) => {
  clearInterval(interval[side]);
};

const setHoverOut = () => {
  clearInterval(interval.left);
  clearInterval(interval.right);
  clearTimeout(interval.timeOut);
  interval.left = startInterval(SIDE.LEFT);
  interval.timeOut = setTimeout(() => (interval.right = startInterval(SIDE.RIGHT)), ROLLING.DELAY);
};

/**
 * 최신 뉴스의 롤링 설정
 */
const setRolling = (side) => {
  const liElements = getWrapper(side).querySelectorAll('li');

  liElements[0].classList.add(ROLLING.PREV);
  liElements[1].classList.add(ROLLING.CURRENT);
  liElements[2].classList.add(ROLLING.NEXT);
};

const setRollingName = (side) => {
  setRollingPrev(side);
  setRollingCurrent(side);
  setRollingNext(side);
};

const setRollingPrev = (side) => {
  const prev = getWrapper(side).querySelector(`.${ROLLING.PREV}`);
  prev.classList.remove(ROLLING.PREV);
};

const setRollingCurrent = (side) => {
  const current = getWrapper(side).querySelector(`.${ROLLING.CURRENT}`);
  current.classList.remove(ROLLING.CURRENT);
  current.classList.add(ROLLING.PREV);
};

const setRollingNext = (side) => {
  const next = getWrapper(side).querySelector(`.${ROLLING.NEXT}`);
  const nextSibling = next?.nextElementSibling;

  if (nextSibling) nextSibling.classList.add(ROLLING.NEXT);
  if (!nextSibling) getWrapper(side).querySelector(`li:first-child`).classList.add(ROLLING.NEXT);
  next.classList.remove(ROLLING.NEXT);
  next.classList.add(ROLLING.CURRENT);
};

const startInterval = (side) => {
  return setInterval(setRollingName, ROLLING.INTERVAL, side);
};

const startRolling = (side) => {
  if (side === SIDE.LEFT) interval.left = startInterval(SIDE.LEFT);
  if (side === SIDE.RIGHT) setTimeout(() => (interval.right = startInterval(SIDE.RIGHT)), ROLLING.DELAY);
};

export { initLatestNews };

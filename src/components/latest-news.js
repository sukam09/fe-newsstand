import { getFetchData } from '../utils/fetch.js';

let intervalLeft;
let intervalRight;

/**
 * 최신 뉴스의 INIT
 */
const initLatestNews = async () => {
  try {
    const fetchData = await getFetchData('./assets/data/latest-news.json');
    const latestNews = fetchData.latestNews;
    const newsLeft = divideNews(latestNews, 'left');
    const newsRight = divideNews(latestNews, 'right');
    setNews(newsLeft, 'left');
    setNews(newsRight, 'right');
  } catch (error) {
    console.error('최신 뉴스를 불러오는 중에 오류가 발생했습니다.', error);
  }
};

const divideNews = (latestNews, side) => {
  if (side === 'left') return latestNews.slice(0, 5);
  if (side === 'right') return latestNews.slice(5, 10);
};

const setNews = (latestNews, side) => {
  setWrapper(latestNews, side);
  setHover(side);
  setRolling(side);
  startRolling(side);
};

const getWrapper = (side) => {
  return document.querySelector(`.latest_news__wrapper-${side}`);
};

const setWrapper = (latestNews, side) => {
  const newsWrapper = getWrapper(side);
  latestNews.forEach((news) => setWrapperElement(newsWrapper, news));
};

const setWrapperElement = (newsWrapper, news) => {
  const newsElement = `
    <li class='latest_news__li'>
      <h2 class='latest_news__h2'>${news.press}</h2>
      <p class='latest_news__p'>${news.title}</p>
    </li>
  `;
  newsWrapper.insertAdjacentHTML('beforeend', newsElement);
};

/**
 * 최신 뉴스의 롤링 설정
 */
const setRolling = (side) => {
  const liElements = getWrapper(side).querySelectorAll('li');

  liElements[0].classList.add(`prev`);
  liElements[1].classList.add(`current`);
  liElements[2].classList.add(`next`);
};

const setRollingName = (side) => {
  setRollingPrev(side);
  setRollingCurrent(side);
  setRollingNext(side);
};

const setRollingPrev = (side) => {
  const prev = getWrapper(side).querySelector(`.prev`);
  prev.classList.remove('prev');
};

const setRollingCurrent = (side) => {
  const current = getWrapper(side).querySelector(`.current`);
  current.classList.remove('current');
  current.classList.add('prev');
};

const setRollingNext = (side) => {
  const next = getWrapper(side).querySelector(`.next`);
  const nextSibling = next?.nextElementSibling;

  if (nextSibling) nextSibling.classList.add('next');
  if (!nextSibling) getWrapper(side).querySelector(`li:first-child`).classList.add('next');
  next.classList.remove('next');
  next.classList.add('current');
};

const startInterval = (side) => {
  return setInterval(setRollingName, 5000, side);
};

const startRolling = (side) => {
  if (side === 'left') intervalLeft = startInterval(side);
  if (side === 'right') setTimeout(() => (intervalRight = startInterval(side)), 1000);
};

export { initLatestNews };

import { HEADER_CLASS, NEWS_SLICE, SIDE, ROLLING, URL, ERROR } from '../../constants/news-stand-rolling.js';
import { getFetchData } from '../../utils/fetch.js';
import { Subject } from '../../utils/observer.js';

class LatestNewsSubject extends Subject {
  constructor() {
    super();
    this.wrapperElements = {
      left: document.querySelector('.latest_news__wrapper-left'),
      right: document.querySelector('.latest_news__wrapper-right'),
    };
    this.interval = {
      left: null,
      right: null,
      timeOut: null,
    };
  }

  async initLatestNews() {
    try {
      const fetchData = await getFetchData(URL.DATA);
      const latestNews = fetchData.latestNews;
      const newsLeft = this.divideNews(latestNews, SIDE.LEFT);
      const newsRight = this.divideNews(latestNews, SIDE.RIGHT);
      this.setNews(newsLeft, SIDE.LEFT);
      this.setNews(newsRight, SIDE.RIGHT);
    } catch (error) {
      console.error(ERROR.MESSAGES, error);
    }
  }

  divideNews(latestNews, side) {
    if (side === SIDE.LEFT) return latestNews.slice(NEWS_SLICE.MIN, NEWS_SLICE.MAX / 2);
    if (side === SIDE.RIGHT) return latestNews.slice(NEWS_SLICE.MAX / 2, NEWS_SLICE.MAX);
  }

  setNews(latestNews, side) {
    this.setWrapper(latestNews, side);
    this.setHover(side);
    this.setRolling(side);
    this.startRolling(side);
  }

  getWrapper(side) {
    return this.wrapperElements[side];
  }

  setWrapper(latestNews, side) {
    const newsWrapper = this.getWrapper(side);
    latestNews.forEach((news) => this.setWrapperElement(newsWrapper, news));
  }

  setWrapperElement(newsWrapper, news) {
    const newsElement = `
      <li class=${HEADER_CLASS.LI}>
        <h2 class=${HEADER_CLASS.H2}>${news.press}</h2>
        <p class=${HEADER_CLASS.P}>${news.title}</p>
      </li>
    `;
    newsWrapper.insertAdjacentHTML('beforeend', newsElement);
  }

  setHover(side) {
    const newsWrapper = this.getWrapper(side);
    const liList = newsWrapper.querySelectorAll(`.latest_news__li`);

    liList.forEach((li) => {
      li.addEventListener('mouseover', () => {
        this.setHoverOver(side);
      });
      li.addEventListener('mouseout', () => {
        this.setHoverOut();
      });
    });
  }

  setHoverOver(side) {
    clearInterval(this.interval[side]);
  }

  setHoverOut() {
    clearInterval(this.interval.left);
    clearInterval(this.interval.right);
    clearTimeout(this.interval.timeOut);
    this.interval.left = this.startInterval(SIDE.LEFT);
    this.interval.timeOut = setTimeout(() => (this.interval.right = this.startInterval(SIDE.RIGHT)), ROLLING.DELAY);
  }

  setRolling(side) {
    const liElements = this.getWrapper(side).querySelectorAll('li');

    liElements[0].classList.add(ROLLING.PREV);
    liElements[1].classList.add(ROLLING.CURRENT);
    liElements[2].classList.add(ROLLING.NEXT);
  }

  setRollingName(side) {
    this.setRollingPrev(side);
    this.setRollingCurrent(side);
    this.setRollingNext(side);
  }

  setRollingPrev(side) {
    const prev = this.getWrapper(side).querySelector(`.${ROLLING.PREV}`);
    prev.classList.remove(ROLLING.PREV);
  }

  setRollingCurrent(side) {
    const current = this.getWrapper(side).querySelector(`.${ROLLING.CURRENT}`);
    current.classList.remove(ROLLING.CURRENT);
    current.classList.add(ROLLING.PREV);
  }

  setRollingNext(side) {
    const next = this.getWrapper(side).querySelector(`.${ROLLING.NEXT}`);
    const nextSibling = next?.nextElementSibling;

    if (nextSibling) nextSibling.classList.add(ROLLING.NEXT);
    if (!nextSibling) this.getWrapper(side).querySelector(`li:first-child`).classList.add(ROLLING.NEXT);
    next.classList.remove(ROLLING.NEXT);
    next.classList.add(ROLLING.CURRENT);
  }

  startInterval(side) {
    return setInterval(() => this.setRollingName(side), ROLLING.INTERVAL);
  }

  startRolling(side) {
    if (side === SIDE.LEFT) this.interval.left = this.startInterval(SIDE.LEFT);
    if (side === SIDE.RIGHT) setTimeout(() => (this.interval.right = this.startInterval(SIDE.RIGHT)), ROLLING.DELAY);
  }
}

export { LatestNewsSubject };

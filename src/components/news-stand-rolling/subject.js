import { HEADER_CLASS, NEWS_SLICE, SIDE, ROLLING, URL, ERROR } from '../../constants/news-stand-rolling.js';
import { getFetchData } from '../../utils/fetch.js';
import { Subject } from '../../utils/observer.js';

class LatestNewsSubject extends Subject {
  constructor() {
    super();
    this.newsWrappers = {
      left: document.querySelector(`.${HEADER_CLASS.LEFT}`),
      right: document.querySelector(`.${HEADER_CLASS.RIGHT}`),
    };
    this.intervals = {
      left: null,
      right: null,
      timeOut: null,
    };
  }

  async initLatestNews() {
    try {
      const fetchData = await getFetchData(URL.DATA);
      const latestNews = fetchData.latestNews;
      const newsLeft = this.splitNewsBySide(latestNews, SIDE.LEFT);
      const newsRight = this.splitNewsBySide(latestNews, SIDE.RIGHT);
      this.displayNewsOnSide(newsLeft, SIDE.LEFT);
      this.displayNewsOnSide(newsRight, SIDE.RIGHT);
    } catch (error) {
      console.error(ERROR.MESSAGES, error);
    }
  }

  splitNewsBySide(latestNews, side) {
    if (side === SIDE.LEFT) return latestNews.slice(NEWS_SLICE.MIN, NEWS_SLICE.MAX / NEWS_SLICE.NUM);
    if (side === SIDE.RIGHT) return latestNews.slice(NEWS_SLICE.MAX / NEWS_SLICE.NUM, NEWS_SLICE.MAX);
  }

  displayNewsOnSide(latestNews, side) {
    this.populateNewsWrapper(latestNews, side);
    this.enableHoverEffect(side);
    this.initializeRolling(side);
    this.beginRolling(side);
  }

  getNewsWrapperBySide(side) {
    return this.newsWrappers[side];
  }

  populateNewsWrapper(latestNews, side) {
    const newsWrapper = this.getNewsWrapperBySide(side);
    latestNews.forEach((news) => this.addNewsToWrapper(newsWrapper, news));
  }

  addNewsToWrapper(newsWrapper, news) {
    const newsElement = `
      <li class=${HEADER_CLASS.LI}>
        <h2 class=${HEADER_CLASS.H2}>${news.press}</h2>
        <p class=${HEADER_CLASS.P}>${news.title}</p>
      </li>
    `;
    newsWrapper.insertAdjacentHTML('beforeend', newsElement);
  }

  enableHoverEffect(side) {
    const newsWrapper = this.getNewsWrapperBySide(side);
    const liList = newsWrapper.querySelectorAll(`.${HEADER_CLASS.LI}`);

    liList.forEach((li) => {
      li.addEventListener('mouseover', () => {
        this.stopRollingOnHover(side);
      });
      li.addEventListener('mouseout', () => {
        this.startRollingAfterHover();
      });
    });
  }

  stopRollingOnHover(side) {
    clearInterval(this.intervals[side]);
  }

  startRollingAfterHover() {
    clearInterval(this.intervals.left);
    clearInterval(this.intervals.right);
    clearTimeout(this.intervals.timeOut);
    this.intervals.left = this.startRollingInterval(SIDE.LEFT);
    this.intervals.timeOut = setTimeout(
      () => (this.intervals.right = this.startRollingInterval(SIDE.RIGHT)),
      ROLLING.DELAY
    );
  }

  initializeRolling(side) {
    const liElements = this.getNewsWrapperBySide(side).querySelectorAll('li');

    liElements[0].classList.add(ROLLING.PREV);
    liElements[1].classList.add(ROLLING.CURRENT);
    liElements[2].classList.add(ROLLING.NEXT);
  }

  updateRollingClasses(side) {
    this.moveToPreviousRolling(side);
    this.moveToCurrentRolling(side);
    this.moveToNextRolling(side);
  }

  moveToPreviousRolling(side) {
    const prev = this.getNewsWrapperBySide(side).querySelector(`.${ROLLING.PREV}`);
    prev.classList.remove(ROLLING.PREV);
  }

  moveToCurrentRolling(side) {
    const current = this.getNewsWrapperBySide(side).querySelector(`.${ROLLING.CURRENT}`);
    current.classList.remove(ROLLING.CURRENT);
    current.classList.add(ROLLING.PREV);
  }

  moveToNextRolling(side) {
    const next = this.getNewsWrapperBySide(side).querySelector(`.${ROLLING.NEXT}`);
    const nextSibling = next?.nextElementSibling;

    if (nextSibling) nextSibling.classList.add(ROLLING.NEXT);
    if (!nextSibling) this.getNewsWrapperBySide(side).querySelector(`li:first-child`).classList.add(ROLLING.NEXT);
    next.classList.remove(ROLLING.NEXT);
    next.classList.add(ROLLING.CURRENT);
  }

  startRollingInterval(side) {
    return setInterval(() => this.updateRollingClasses(side), ROLLING.INTERVAL);
  }

  beginRolling(side) {
    if (side === SIDE.LEFT) this.intervals.left = this.startRollingInterval(SIDE.LEFT);
    if (side === SIDE.RIGHT)
      setTimeout(() => (this.intervals.right = this.startRollingInterval(SIDE.RIGHT)), ROLLING.DELAY);
  }
}

export { LatestNewsSubject };

import { HEADER_CLASS, ROLLING, SIDE } from '../constants/news-stand-rolling.js';

class RollingNews {
  constructor(newsWrappers, intervals, side) {
    this.newsWrappers = newsWrappers;
    this.intervals = intervals;
    this.side = side;
  }

  setupHover() {
    const newsWrapper = this.getNewsWrapper(this.side);
    const liList = newsWrapper.querySelectorAll(`.${HEADER_CLASS.LI}`);

    liList.forEach((li) => {
      li.addEventListener('mouseover', () => {
        this.stopRollingHover();
      });
      li.addEventListener('mouseout', () => {
        this.startRollingHover();
      });
    });
  }

  stopRollingHover() {
    clearInterval(this.intervals[this.side]);
  }

  startRollingHover() {
    clearInterval(this.intervals.left);
    clearInterval(this.intervals.right);
    clearTimeout(this.intervals.timeOut);
    this.intervals.left = this.setupInterval(SIDE.LEFT);
    this.intervals.timeOut = setTimeout(() => (this.intervals.right = this.setupInterval(SIDE.RIGHT)), ROLLING.DELAY);
  }

  initRolling() {
    const liElements = this.getNewsWrapper(this.side).querySelectorAll('li');

    liElements[0].classList.add(ROLLING.PREV);
    liElements[1].classList.add(ROLLING.CURRENT);
    liElements[2].classList.add(ROLLING.NEXT);
  }

  updateRolling() {
    this.moveToPrevious();
    this.moveToCurrent();
    this.moveToNext();
  }

  moveToPrevious() {
    const prev = this.getNewsWrapper(this.side).querySelector(`.${ROLLING.PREV}`);
    prev.classList.remove(ROLLING.PREV);
  }

  moveToCurrent() {
    const current = this.getNewsWrapper(this.side).querySelector(`.${ROLLING.CURRENT}`);
    current.classList.remove(ROLLING.CURRENT);
    current.classList.add(ROLLING.PREV);
  }

  moveToNext() {
    const next = this.getNewsWrapper(this.side).querySelector(`.${ROLLING.NEXT}`);
    const nextSibling = next?.nextElementSibling;

    if (nextSibling) nextSibling.classList.add(ROLLING.NEXT);
    if (!nextSibling) this.getNewsWrapper(this.side).querySelector(`li:first-child`).classList.add(ROLLING.NEXT);
    next.classList.remove(ROLLING.NEXT);
    next.classList.add(ROLLING.CURRENT);
  }

  setupInterval() {
    return setInterval(() => this.updateRolling(), ROLLING.INTERVAL);
  }

  setupRolling() {
    if (this.side === SIDE.LEFT) this.intervals.left = this.setupInterval();
    if (this.side === SIDE.RIGHT) setTimeout(() => (this.intervals.right = this.setupInterval()), ROLLING.DELAY);
  }

  getNewsWrapper(side) {
    return this.newsWrappers[side];
  }
}

const startRolling = (newsWrappers, intervals, side) => {
  const rollingManager = new RollingNews(newsWrappers, intervals, side);
  rollingManager.setupHover();
  rollingManager.initRolling();
  rollingManager.setupRolling();
};

export { startRolling };

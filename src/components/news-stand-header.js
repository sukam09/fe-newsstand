import { HEADER_CLASS, DATE_OPTIONS, PATH, TITLE } from '../constants/news-stand-header.js';
import { Subject, Observer } from '../utils/observer.js';

class NewsStandHeaderStore extends Subject {
  constructor() {
    super();
    this.dateFormat = null;
    this.headerWrapper = null;
    this.headerButton = null;
    this.headerTime = null;
  }

  setHeaderElement() {
    this.headerWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER}`);
    const headerElement = `
      <button class=${HEADER_CLASS.BUTTON}>
        <img class=${HEADER_CLASS.IMAGE} src=${PATH.LOGO}></img>
        <h1 class=${HEADER_CLASS.H1}>${TITLE.NAME}</h1>
      </button>
      <time class=${HEADER_CLASS.TIME}></time>
    `;
    this.headerWrapper.innerHTML = headerElement;
  }

  setHeaderButton() {
    this.headerButton = document.querySelector(`.${HEADER_CLASS.BUTTON}`);
    this.headerButton.addEventListener('click', () => {
      this.notifyObservers(); // 옵저버들에게 알림을 보냄
    });
  }

  getCurrentTime() {
    this.dateFormat = new Date().toLocaleDateString('ko-KR', DATE_OPTIONS);
  }

  setHeaderTime() {
    this.headerTime = document.querySelector(`.${HEADER_CLASS.TIME}`);
    this.headerTime.innerText = this.dateFormat;
  }

  initHeader() {
    this.setHeaderElement();
    this.setHeaderButton();
    this.getCurrentTime();
    this.setHeaderTime();
  }
}

class TimeObserver extends Observer {
  constructor(subject) {
    super(subject);
  }

  update() {
    location.reload();
    this.subject.getCurrentTime();
    this.subject.setHeaderTime();
  }
}

const newsStandHeaderStore = new NewsStandHeaderStore();
const timeObserver = new TimeObserver(newsStandHeaderStore);
newsStandHeaderStore.addObserver(timeObserver);

export default newsStandHeaderStore;

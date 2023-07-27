import { HEADER_CLASS, DATE_OPTIONS, PATH, TITLE } from '../../constants/news-stand-header.js';

class NewsStandHeader {
  constructor() {
    this.dateFormat = null;
    this.headerWrapper = null;
    this.headerButton = null;
    this.headerTime = null;
  }

  initHeader() {
    this.renderHeader();
    this.setupEvent();
    this.updateTime();
  }

  renderHeader() {
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

  setupEvent() {
    this.headerButton = document.querySelector(`.${HEADER_CLASS.BUTTON}`);
    this.headerButton.addEventListener('click', () => {
      location.reload();
    });
  }

  updateTime() {
    this.headerTime = document.querySelector(`.${HEADER_CLASS.TIME}`);
    this.dateFormat = new Date().toLocaleDateString('ko-KR', DATE_OPTIONS);
    this.headerTime.innerText = this.dateFormat;
  }
}

const newsStandHeader = new NewsStandHeader();
export default newsStandHeader;

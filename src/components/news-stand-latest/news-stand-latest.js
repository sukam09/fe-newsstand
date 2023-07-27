import { HEADER_CLASS, NEWS_SLICE, SIDE, URL, ERROR } from '../../constants/news-stand-rolling.js';
import { getFetchData } from '../../utils/fetch.js';
import { startRolling } from './news-stand-rolling.js';

class LatestNews {
  constructor() {
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

  async initNews() {
    try {
      const fetchData = await getFetchData(URL.DATA);
      const latestNews = fetchData.latestNews;
      const newsLeft = this.splitNews(latestNews, SIDE.LEFT);
      const newsRight = this.splitNews(latestNews, SIDE.RIGHT);
      this.showNews(newsLeft, SIDE.LEFT);
      this.showNews(newsRight, SIDE.RIGHT);
    } catch (error) {
      console.error(ERROR.MESSAGES, error);
    }
  }

  showNews(latestNews, side) {
    const newsWrapper = this.newsWrappers[side];
    latestNews.forEach((news) => this.renderElement(newsWrapper, news));
    startRolling(this.newsWrappers, this.intervals, side);
  }

  splitNews(latestNews, side) {
    if (side === SIDE.LEFT) return latestNews.slice(NEWS_SLICE.MIN, NEWS_SLICE.MAX / NEWS_SLICE.NUM);
    if (side === SIDE.RIGHT) return latestNews.slice(NEWS_SLICE.MAX / NEWS_SLICE.NUM, NEWS_SLICE.MAX);
  }

  renderElement(newsWrapper, news) {
    const newsElement = `
      <li class=${HEADER_CLASS.LI}>
        <h2 class=${HEADER_CLASS.H2}>${news.press}</h2>
        <p class=${HEADER_CLASS.P}>${news.title}</p>
      </li>
    `;
    newsWrapper.insertAdjacentHTML('beforeend', newsElement);
  }
}

const latestNews = new LatestNews();
export default latestNews;

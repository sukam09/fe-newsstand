import LatestNews from './LatestNews.js';

export default class LatestNewsWrapper {
  constructor() {
    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'main-news';
    this.init();
    return this.$wrapper;
  }

  init() {
    this.$wrapper.appendChild(new LatestNews());
    this.$wrapper.appendChild(new LatestNews());
  }
}

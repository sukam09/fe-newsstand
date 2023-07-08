import LatestNewsComponent from './LatestNewsComponent.js';

export default class LatestNews {
  constructor() {
    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'latest-main-news';

    this.render();
    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(new LatestNewsComponent());
    this.$wrapper.appendChild(new LatestNewsComponent());
  }
}

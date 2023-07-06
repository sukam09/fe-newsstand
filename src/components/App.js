import AllNews from './AllNews.js';
import Header from './Header.js';
import LatestNews from './LatestNews.js';

export default class App {
  constructor() {
    this.$app = document.getElementById('root');
    this.init();
  }

  init() {
    this.$app.appendChild(new Header());
    this.$app.appendChild(new LatestNews());
    this.$app.appendChild(new AllNews());
  }
}

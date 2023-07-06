import Header from './Header.js';
import LatestNewsWrapper from './LatestNewsWrapper.js';

export default class App {
  constructor() {
    this.$app = document.getElementById('root');
    this.init();
  }

  init() {
    this.$app.appendChild(new Header());
    this.$app.appendChild(new LatestNewsWrapper());
  }
}

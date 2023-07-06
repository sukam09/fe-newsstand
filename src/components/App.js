import Header from './Header.js';

export default class App {
  constructor() {
    this.$app = document.getElementById('root');
    this.init();
  }

  init() {
    this.$app.appendChild(new Header());
  }
}

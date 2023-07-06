import AllNewHeader from './AllNewHeader.js';
import AllNewsGrid from './AllNewsGrid.js';

export default class AllNews {
  constructor() {
    this.$wrapper = document.createElement('section');

    this.init();
    return this.$wrapper;
  }

  init() {
    this.$wrapper.appendChild(new AllNewHeader());
    this.$wrapper.appendChild(new AllNewsGrid());
  }
}

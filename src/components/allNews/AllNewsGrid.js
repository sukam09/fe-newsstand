import AllNewsList from './AllnewsList.js';
import ArrowButton from './ArrowButton.js';

export default class AllNewsGrid {
  constructor() {
    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'grid-wrapper';

    this.init();

    return this.$wrapper;
  }

  addGrid() {
    const $newsListGrid = document.createElement('div');
    const $newsLists = document.createElement('ul');
    $newsLists.className = 'news-list';
    for (let i = 0; i < 24; i++) {
      $newsLists.appendChild(new AllNewsList('데일리안'));
    }
    $newsListGrid.appendChild($newsLists);

    this.$wrapper.appendChild($newsListGrid);
  }

  init() {
    this.$wrapper.appendChild(new ArrowButton({ name: 'LeftButton' }));
    this.addGrid();
    this.$wrapper.appendChild(new ArrowButton({ name: 'RightButton' }));
  }
}

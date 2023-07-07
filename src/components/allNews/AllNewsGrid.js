import AllNewsList from './AllnewsList.js';
import ArrowButton from './ArrowButton.js';

export default class AllNewsGrid {
  constructor() {
    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'grid-wrapper';

    this.render();

    return this.$wrapper;
  }

  addGrid() {
    const $newsListGrid = document.createElement('div');
    const $newsLists = document.createElement('ul');
    $newsLists.className = 'news-list';
    for (let i = 0; i < 24; i++) {
      $newsLists.appendChild(new AllNewsList(i));
    }
    $newsListGrid.appendChild($newsLists);

    this.$wrapper.appendChild($newsListGrid);
  }

  render() {
    this.$wrapper.appendChild(new ArrowButton({ name: 'LeftButton' }));
    this.addGrid();
    this.$wrapper.appendChild(new ArrowButton({ name: 'RightButton' }));
  }
}

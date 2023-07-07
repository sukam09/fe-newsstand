import AllNewsList from './AllnewsList.js';
import ArrowButton from './ArrowButton.js';

export default class AllNewsGrid {
  constructor() {
    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'grid-wrapper';
    this.page = 0;

    this.render();

    return this.$wrapper;
  }

  addGrid() {
    const $newsListGrid = document.createElement('div');
    $newsListGrid.className = 'news-list-wrapper';
    const $newsLists = document.createElement('ul');
    $newsLists.className = 'news-list';
    for (let i = 24 * this.page; i < 24 * (this.page + 1); i++) {
      $newsLists.appendChild(new AllNewsList(i));
    }
    $newsListGrid.appendChild($newsLists);

    this.$wrapper.appendChild($newsListGrid);
  }

  goNextPage() {
    this.page += 1;
    this.render();
  }

  goPreviousPage() {
    this.page -= 1;
    this.render();
  }
  render() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(
      new ArrowButton({
        name: 'LeftButton',
        isVisible: this.page !== 0,
        action: this.goPreviousPage.bind(this),
      }),
    );
    this.addGrid();
    this.$wrapper.appendChild(
      new ArrowButton({
        name: 'RightButton',
        isVisible: this.page !== 3,
        action: this.goNextPage.bind(this),
      }),
    );
  }
}

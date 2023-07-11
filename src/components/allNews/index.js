import Component from '../Component.js';
import AllNewHeader from './AllNewHeader.js';
import AllNewsGrid from './AllNewsGrid.js';
import AllNewsList from './AllNewsList.js';
import ArrowButton from './ArrowButton.js';

import { shufflePressOrder } from '../../utils/index.js';

export default class AllNews extends Component {
  setup() {
    this.state = { view: 'grid', pressOrder: shufflePressOrder(), page: 0 };
  }

  template() {
    return `<div class='all-news-header'></div>
            <div class='all-news-wrapper'>
              <button class='left-button'></button>
              ${
                this.state.view === 'grid'
                  ? `<ul class='news-list-grid border-default'></ul>`
                  : `<div class = 'news-list-list'></div>`
              }
              <button class='right-button'></button>
            </div>`;
  }

  mounted() {
    new AllNewHeader(this.$target.querySelector('.all-news-header'), {
      onClick: this.onClick.bind(this),
      view: this.state.view,
    });

    this.state.view === 'grid'
      ? new AllNewsGrid(this.$target.querySelector('.news-list-grid'), {
          page: this.state.page,
          pressOrder: this.state.pressOrder,
        })
      : new AllNewsList(this.$target.querySelector('.news-list-list'));

    new ArrowButton(this.$target.querySelector('.left-button'), {
      name: 'left-button',
      isVisible: this.state.page !== 0,
      action: this.goPreviousPage.bind(this),
    });
    new ArrowButton(this.$target.querySelector('.right-button'), {
      name: 'right-button',
      isVisible: this.state.page !== 3,
      action: this.goNextPage.bind(this),
    });
  }

  onClick(viewType) {
    this.setState({ view: viewType });
  }

  goNextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  goPreviousPage() {
    this.setState({ page: this.state.page - 1 });
  }
}

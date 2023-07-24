import { customQuerySelector, customQuerySelectorAll } from '../../utils/index.js';
import Component from '../core/Component.js';
import ArrowButton from './ArrowButton.js';

import { GRID_NEWS_COUNT, TEXT } from '../../constants/index.js';
import SubscribeButton from './SubscribeButton.js';
import { pressStore, viewStore } from '../../../store/index.js';

let [savedAllPage, savedMyPage] = [0, 0];

export default class AllNewsGridView extends Component {
  setup() {
    this.allType = viewStore.option === TEXT.ALL;
    this.state = { ...this.props, page: this.allType ? savedAllPage : savedMyPage };
  }

  template() {
    return `
    <div class="news-list-wrapper">
      <button class="left-button"></button>
      <ul class="news-list-grid border-default"></ul>
      <button class="right-button"></button>
    </div>`;
  }

  mounted() {
    const pressOrder = this.getGridPress();
    const maxPage = Math.floor((pressOrder.length - 1) / GRID_NEWS_COUNT);
    const logoMode = document.body.className === 'dark' ? 'logodark' : 'logo';

    this.state.page > maxPage && this.setState({ page: maxPage });

    const innerHTML = Array.from({ length: GRID_NEWS_COUNT })
      .map((_, i) => {
        const index = this.state.page * GRID_NEWS_COUNT + i;
        return ` <li class="grid-logo-wrapper border-default">
        ${
          pressOrder.length > index
            ? `<div class="flip-card-inner">
            <div class="flip-card-front surface-default">
              <img
                class="press-logo"
                src="src/assets/${logoMode}/${pressOrder[index].number}.png"
              />
            </div>
            <div class="flip-card-back surface-alt">
              <div class="subscribe-button-wrapper" data-index=${index}></div>
            </div>
          </div>`
            : ``
        }
      </li>`;
      })
      .join('');

    customQuerySelector('.news-list-grid', this.$target).innerHTML = innerHTML;

    customQuerySelectorAll('.subscribe-button-wrapper', this.$target).forEach(node => {
      const index = node.dataset.index;
      const { number, name } = pressOrder[index];

      new SubscribeButton(node, {
        name,
        number,
        color: 'gray',
        text: pressStore.subscribedList.includes(number) ? TEXT.UNSUBSCRIBE_KO : TEXT.SUBSCRIBE_KO,
      });
    });

    new ArrowButton(customQuerySelector('.left-button', this.$target), {
      name: 'left-button',
      isVisible: this.state.page !== 0,
      action: this.goPreviousPage.bind(this),
    });

    new ArrowButton(customQuerySelector('.right-button', this.$target), {
      name: 'right-button',
      isVisible: this.state.page < maxPage,
      action: this.goNextPage.bind(this),
    });
  }

  goNextPage() {
    this.setState({ page: this.state.page + 1 });
    this.allType ? (savedAllPage = this.state.page) : (savedMyPage = this.state.page);
  }

  goPreviousPage() {
    this.setState({ page: this.state.page - 1 });
    this.allType ? (savedAllPage = this.state.page) : (savedMyPage = this.state.page);
  }

  getGridPress() {
    return this.allType ? pressStore.getAllPress() : pressStore.getFilteredPress();
  }
}

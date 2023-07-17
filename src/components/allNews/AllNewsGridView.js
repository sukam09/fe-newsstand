import {
  customQuerySelector,
  customQuerySelectorAll,
  shufflePressOrder,
} from '../../utils/index.js';
import Component from '../core/Component.js';
import ArrowButton from './ArrowButton.js';

import { TEXT } from '../../constants/index.js';
import SubscribeButton from './SubscribeButton.js';

export default class AllNewsGridView extends Component {
  setup() {
    this.state = { pressOrder: shufflePressOrder(), page: 0 };
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
    const logoMode = document.body.className === 'dark' ? 'logodark' : 'logo';

    let innerHTML = '';
    for (let i = this.state.page * 24; i < 24 * (this.state.page + 1); i++) {
      innerHTML += ` 
      <li class="grid-logo-wrapper border-default">
        <div class="flip-card-inner">
          <div class="flip-card-front surface-default">
            <img class="press-logo" src="src/assets/${logoMode}/${this.state.pressOrder[i]}.png" />
          </div>
          <div class="flip-card-back surface-alt">
            <div class="subscribe-button-wrapper"></div>
          </div>
        </div>
      </li>`;
    }
    customQuerySelector('.news-list-grid', this.$target).innerHTML = innerHTML;

    customQuerySelectorAll('.subscribe-button-wrapper', this.$target).forEach(node => {
      new SubscribeButton(node, {
        color: 'gray',
        text: TEXT.SUBSCRIBE,
      });
    });

    new ArrowButton(customQuerySelector('.left-button', this.$target), {
      name: 'left-button',
      isVisible: this.state.page !== 0,
      action: this.goPreviousPage.bind(this),
    });

    new ArrowButton(customQuerySelector('.right-button', this.$target), {
      name: 'right-button',
      isVisible: this.state.page !== 3,
      action: this.goNextPage.bind(this),
    });
  }

  goNextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  goPreviousPage() {
    this.setState({ page: this.state.page - 1 });
  }
}

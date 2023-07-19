import { customQuerySelector, customQuerySelectorAll } from '../../utils/index.js';
import Component from '../core/Component.js';
import ArrowButton from './ArrowButton.js';

import { TEXT } from '../../constants/index.js';
import SubscribeButton from './SubscribeButton.js';
import db from '../../../store/db.js';

export default class AllNewsGridView extends Component {
  setup() {
    this.state = { ...this.props, page: 0 };

    db.observe(this);
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
    const maxPage = Math.floor((pressOrder.length - 1) / 24);

    const logoMode = document.body.className === 'dark' ? 'logodark' : 'logo';
    let innerHTML = '';

    for (let i = this.state.page * 24; i < 24 * (this.state.page + 1); i++) {
      innerHTML += ` 
      <li class="grid-logo-wrapper border-default">
      ${
        pressOrder.length > i
          ? `<div class="flip-card-inner">
            <div class="flip-card-front surface-default">
              <img
                class="press-logo"
                src="src/assets/${logoMode}/${pressOrder[i].number}.png"
              />
            </div>
            <div class="flip-card-back surface-alt">
              <div class="subscribe-button-wrapper" data-name=${pressOrder[i].number}></div>
            </div>
          </div>`
          : ``
      }
      </li>`;
    }

    customQuerySelector('.news-list-grid', this.$target).innerHTML = innerHTML;

    customQuerySelectorAll('.subscribe-button-wrapper', this.$target).forEach(
      node =>
        new SubscribeButton(node, {
          color: 'gray',
          text: TEXT.SUBSCRIBE_KO,
          name: node.dataset.name,
        }),
    );

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
  }

  goPreviousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  getGridPress() {
    return this.props.pressType === TEXT.ALL
      ? db.allPress
      : db.allPress
          .filter(press => db.getDbData.includes(press.number))
          .sort((a, b) => db.getDbData.indexOf(a.number) - db.getDbData.indexOf(b.number));
  }
}

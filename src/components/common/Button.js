import { customQuerySelector } from '../../utils/index.js';
import Component from '../core/Component.js';
import Icon from './Icon.js';

export default class Button extends Component {
  setup() {
    this.state = { ...this.props };
  }
  template() {
    return `
      <button class="common-button border-default surface-alt text-weak">
        <img class='common-button-icon'/><span>${this.state.text}</span>
      </button>
    `;
  }

  mounted() {
    const $button = customQuerySelector('button', this.$target);
    $button.className =
      this.state.color === 'gray'
        ? `common-button border-default surface-alt text-weak`
        : `common-button border-default surface-defalut text-weak`;

    new Icon(customQuerySelector('.common-button-icon', this.$target), { name: this.state.icon });
  }

  setEvent() {
    const $button = customQuerySelector('button', this.$target);

    $button.addEventListener('mouseover', () => {
      $button.className =
        this.state.color === 'gray'
          ? `common-button border-bold surface-alt text-bold`
          : `common-button border-bold surface-defalut text-bold`;
    });

    $button.addEventListener('mouseout', () => {
      $button.className =
        this.state.color === 'gray'
          ? `common-button border-default surface-alt text-weak`
          : `common-button border-default surface-defalut text-weak`;
    });

    $button.addEventListener('click', () => {
      this.state.action();
    });
  }
}

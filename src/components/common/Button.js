import { TEXT } from '../../constants/index.js';
import { customQuerySelector } from '../../utils/index.js';
import Component from '../core/Component.js';
import Icon from './Icon.js';

export default class Button extends Component {
  setup() {
    this.state = { ...this.props, status: 'default' };
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
    const icon = this.state.text === TEXT.SUBSCRIBE_KO ? 'plus' : 'minus';

    $button.className =
      this.state.color === 'gray'
        ? `common-button border-default surface-alt text-weak`
        : `common-button border-default surface-defalut text-weak`;

    new Icon(customQuerySelector('.common-button-icon', this.$target), {
      name: icon,
      status: this.state.status,
    });
  }

  setEvent() {
    const $button = customQuerySelector('button', this.$target);

    $button.addEventListener('mouseover', () => {
      $button.className =
        this.state.color === 'gray'
          ? `common-button border-bold surface-alt text-bold`
          : `common-button border-bold surface-defalut text-bold`;
      this.setState({ status: 'hover' });
    });

    $button.addEventListener('mouseout', () => {
      $button.className =
        this.state.color === 'gray'
          ? `common-button border-default surface-alt text-weak`
          : `common-button border-default surface-defalut text-weak`;
      this.setState({ status: 'default' });
    });

    $button.addEventListener('click', () => {
      this.state.action();
    });
  }
}

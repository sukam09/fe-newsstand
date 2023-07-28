import Component from '../core/Component.js';
import Icon from './Icon.js';
import { TEXT } from '../../constants/index.js';
import { customQuerySelector } from '../../utils/index.js';

export default class Button extends Component {
  setup() {
    this.state = { ...this.props, status: 'default' };
  }
  template() {
    return `
      <button class="common-button border-default surface-alt text-weak">
        <img class='common-button-icon'/>${this.state.text && `<span>${this.state.text}</span>`}
      </button>
    `;
  }

  mounted() {
    const $button = customQuerySelector('button', this.$target);

    $button.className =
      this.state.color === 'gray'
        ? `common-button border-default surface-alt text-weak`
        : `common-button border-default surface-defalut text-weak`;
    new Icon(customQuerySelector('.common-button-icon', this.$target), {
      name: this.getIconName(),
    });
  }

  setEvent() {
    const $button = customQuerySelector('button', this.$target);

    $button.addEventListener('mouseover', () => {
      $button.className =
        this.state.color === 'gray'
          ? `common-button border-bold surface-alt text-bold`
          : `common-button border-bold surface-defalut text-bold`;
      this.state.status = 'hover';
      new Icon(customQuerySelector('.common-button-icon', this.$target), {
        name: this.getIconName(),
      });
    });

    $button.addEventListener('mouseout', () => {
      $button.className =
        this.state.color === 'gray'
          ? `common-button border-default surface-alt text-weak`
          : `common-button border-default surface-defalut text-weak`;
      this.state.status = 'default';
      new Icon(customQuerySelector('.common-button-icon', this.$target), {
        name: this.getIconName(),
      });
    });

    $button.addEventListener('click', () => {
      this.state.action();
    });
  }

  getIconName() {
    let iconName = this.state.text === TEXT.SUBSCRIBE_KO ? 'plus' : 'minus';
    if (this.state.status === 'hover') iconName += '-hover';
    if (document.body.className === 'dark') iconName += '-dark';
    return iconName;
  }
}

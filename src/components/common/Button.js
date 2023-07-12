import Component from '../core/Component.js';
import Icon from './Icon.js';

export default class Button extends Component {
  setup() {
    this.state = { ...this.props };
  }
  template() {
    return `
      <button class="common-button border-default surface-alt text-weak">
        <div class='common-button-icon'></div><span>${this.state.text}</span>
      </button>
    `;
  }

  mounted() {
    const $button = this.$target.querySelector('button');
    $button.className = `common-button ${this.state.color}`;

    new Icon(this.$target.querySelector('.common-button-icon'), { name: 'plus' });
  }
}

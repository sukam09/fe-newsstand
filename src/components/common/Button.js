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
    const $button = customQuerySelector('button');
    $button.className = `common-button ${this.state.color}`;

    new Icon(customQuerySelector('.common-button-icon'), { name: 'plus' });
  }
}

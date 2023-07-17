import { SNACK_BAR_SECOND, TEXT } from '../../constants/index.js';
import Component from '../core/Component.js';

export default class SnackBar extends Component {
  setup() {
    this.timer = setTimeout(() => this.closeSnackBar(), SNACK_BAR_SECOND);
  }
  template() {
    return `
      <div class='snack-bar surface-brand-default  text-white-default pop-up'>
        ${TEXT.SUBSCRIBE_SUCCESS}
      </div>
    `;
  }

  closeSnackBar = () => (this.$target.innerHTML = '');
}

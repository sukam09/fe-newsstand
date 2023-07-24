import { SNACK_BAR_SECOND, TEXT } from '../../constants/index.js';
import { myListPotal } from '../allNews/index.js';
import Component from '../core/Component.js';

let timer = null;
export default class SnackBar extends Component {
  setup() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.closeSnackBar();
      myListPotal();
    }, SNACK_BAR_SECOND);
  }
  template() {
    return `
      <div class='snack-bar surface-brand-default  text-white-default pop-up'>
        ${TEXT.SUBSCRIBE_SUCCESS}
      </div>
    `;
  }

  closeSnackBar = () => (this.$target.innerHTML = '');

  setEvent() {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.common-button') || target.closest('.snack-bar')) return;

      clearTimeout(timer);
      this.closeSnackBar();
    });
  }
}

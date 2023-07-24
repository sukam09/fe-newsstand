import { pressStore } from '../../../store/index.js';
import Component from '../core/Component.js';

export default class Alert extends Component {
  template() {
    return `
      <div class='alert-wrapper border-default pop-up'>
        <div class='alert-content-wrapper surface-default text-default display-medium16'>
          <p><span class='text-strong display-bold16'>${this.props.name}</span>을(를)</p>
          <p >구독해지하시겠습니까?</p>
        </div>
        <div class='alert-confirm-wrapper surface-alt border-default'>
          <div class='alert-yes text-default available-medium16 border-default'>예, 해지합니다</div>
          <div class='alert-no available-medium16 text-strong'>아니오</div>
        </div>
      </div>
    `;
  }

  setEvent() {
    this.$target.addEventListener('click', e => {
      if (e.target.classList.contains('alert-yes')) {
        pressStore.deleteSubscribedList(this.props.number);
      }
      this.$target.innerHTML = '';
    });
  }
}

import { TEXT } from '../../constants/index.js';
import { showSnackBar, toggleAlert } from '../../../store/index.js';
import Button from '../common/Button.js';
import Component from '../core/Component.js';

export default class SubscribeButton extends Component {
  setup() {
    this.state = {
      ...this.props,
      icon: document.body.className === 'dark' ? 'plus-dark' : 'plus',
      states: 'default',
    };
  }

  mounted() {
    new Button(this.$target, {
      ...this.state,
      action: () => this.action(),
    });
  }

  action() {
    if (this.state.text === TEXT.SUBSCRIBE_KO) {
      showSnackBar(TEXT.SUBSCRIBE_KO);
      this.props.addMyPress(this.props.name);
      //구독 추가 기능
    } else if (this.state.text === TEXT.UNSUBSCRIBE) {
      toggleAlert();
      // this.props.deleteMyPress();
      //구독 취소
    }
  }
}

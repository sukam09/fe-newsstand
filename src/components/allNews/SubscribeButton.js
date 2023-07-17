import { TEXT } from '../../constants/index.js';
import { showSnackBar, toggleAlert } from '../../index.js';
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
    if (this.state.text === TEXT.SUBSCRIBE) {
      showSnackBar(TEXT.SUBSCRIBE);
    } else if (this.state.text === TEXT.UNSUBSCRIBE) {
      toggleAlert();
      //구독 취소
    }
  }
}

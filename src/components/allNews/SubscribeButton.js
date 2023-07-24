import Button from '../common/Button.js';
import Component from '../core/Component.js';
import Alert from '../common/Alert.js';
import { customQuerySelector } from '../../utils/index.js';
import { pressStore } from '../../../store/index.js';
import { TEXT } from '../../constants/index.js';

export default class SubscribeButton extends Component {
  setup() {
    this.state = {
      ...this.props,
    };
  }

  mounted() {
    new Button(this.$target, {
      ...this.state,
      action: () => this.action(),
    });
  }

  action() {
    if (this.props.text === TEXT.SUBSCRIBE_KO) {
      pressStore.putSubscribedList(this.props.number);
    } else {
      new Alert(customQuerySelector('.alert-modal'), {
        name: this.props.name,
        number: this.props.number,
      });
    }
  }
}

import Button from '../common/Button.js';
import Component from '../core/Component.js';
import db from '../../../store/db.js';
import Alert from '../common/Alert.js';
import { customQuerySelector } from '../../utils/index.js';

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
      text: db.getDbData.includes(this.props.number) ? '해지하기' : '구독하기',
      action: () => this.action(),
    });
  }

  action() {
    if (db.getDbData.includes(this.props.number)) {
      new Alert(customQuerySelector('.alert-modal'), {
        name: this.props.name,
        number: this.props.number,
      });
    } else {
      db.putDbData(this.props.number);
    }
  }
}

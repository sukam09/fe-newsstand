import Component from '../core/Component.js';

export default class ArrowButton extends Component {
  setup() {
    this.state = {
      name: this.props.name,
      isVisible: this.props.isVisible,
      action: this.props.action,
    };
    this.$target.style.visibility = this.state.isVisible ? 'visible' : 'hidden';
  }

  template() {
    return `<img src=src/assets/buttons/${this.state.name}.svg>`;
  }

  setEvent() {
    this.$target.addEventListener('click', this.state.action);
  }
}

import Component from '../core/Component.js';

export default class Icon extends Component {
  setup() {
    this.state = { name: this.props.name };
    this.$target.src = `src/assets/icons/${this.state.name}.svg`;
    this.$target.alt = this.state.name;
  }
}

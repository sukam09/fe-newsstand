import Component from '../Component.js';

export default class Logo extends Component {
  setup() {
    this.state = { name: this.props.name };
    this.$target.src = `src/assets/logo/${this.state.name}.png`;
  }
}

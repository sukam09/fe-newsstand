import Component from '../core/Component.js';

export default class Icon extends Component {
  setup() {
    this.$target.src = `src/assets/icons/${this.props.name}.svg`;
  }
}

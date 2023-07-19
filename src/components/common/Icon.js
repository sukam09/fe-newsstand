import Component from '../core/Component.js';

export default class Icon extends Component {
  setup() {
    const colorMode = document.body.className === 'dark' ? 'dark' : 'light';
    this.$target.src = `src/assets/icons/${this.props.name}/${colorMode}/${this.props.status}.svg`;
  }
}

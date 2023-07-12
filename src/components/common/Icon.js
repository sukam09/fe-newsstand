import Component from '../core/Component.js';

export default class Icon extends Component {
  setup() {
    this.src = `src/assets/icons/${this.props.name}.svg`;
  }

  template() {
    return `<img src=${this.src} alt = ${this.props.name}/>`;
  }
}

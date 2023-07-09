import Component from '../Component.js';

export default class LatestNewsComponent extends Component {
  setup() {
    this.state = { ...this.props };
  }

  template() {
    return `<span>${this.state.name}</span>
            <p>${this.state.content}</p>`;
  }
}

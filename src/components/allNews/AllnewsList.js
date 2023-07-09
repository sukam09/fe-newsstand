import Component from '../Component.js';
import Logo from '../common/Logo.js';

export default class AllNewsList extends Component {
  setup() {
    this.state = { name: this.props.name };
  }

  template() {
    return `<img class='press-logo'/>`;
  }

  mounted() {
    new Logo(this.$target.querySelector('img'), { name: this.state.name });
  }
}

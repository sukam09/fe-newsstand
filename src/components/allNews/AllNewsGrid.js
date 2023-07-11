import Component from '../Component.js';

export default class AllNewsGrid extends Component {
  mounted() {
    let innerHTML = '';
    for (let i = 24 * this.props.page; i < 24 * (this.props.page + 1); i++) {
      innerHTML += `<li class='border-default'><img class='press-logo' src='src/assets/logo/${this.props.pressOrder[i]}.png'/></li>`;
    }
    this.$target.innerHTML = innerHTML;
  }
}

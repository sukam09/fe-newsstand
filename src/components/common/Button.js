import Component from '../core/Component.js';

export default class Button extends Component {
  template() {
    return `
      <button class="common-button border-default surface-alt text-weak"><img src='src/assets/icons/${this.props.icon}.svg' alt='plus' class='text-weak'/>${this.props.text}</button>
    `;
  }

  mounted() {
    const $button = this.$target.querySelector('button');
    const { states, color } = this.props;

    $button.className = 'common-button';
    if (color === 'gray') {
      $button.className +=
        states === 'hover'
          ? ' border-bold surface-alt text-bold'
          : ' border-default surface-alt text-weak';
    } else if (color === 'white') {
      $button.className +=
        states === 'hover'
          ? ' border-bold surface-default text-bold'
          : ' border-default surface-default text-weak';
    }
  }
}

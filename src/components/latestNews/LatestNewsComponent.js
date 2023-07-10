import Component from '../Component.js';

export default class LatestNewsComponent extends Component {
  setup() {
    this.state = { ...this.props };
  }

  template() {
    return `<span>${this.state.name}</span>
            <p class='auto-rolling-animation'>${this.state.content}</p>`;
  }

  setEvent() {
    this.$target.addEventListener('mouseover', () => {
      const $newsList = this.$target.querySelector('.auto-rolling-animation');
      const currentOpacity = getComputedStyle($newsList).opacity;

      if (currentOpacity === '1') {
        $newsList.style.animationPlayState = 'paused';
      }
    });

    this.$target.addEventListener('mouseout', () => {
      const $newsList = this.$target.querySelector('.auto-rolling-animation');

      $newsList.style.animationPlayState = 'running';
    });
  }
}

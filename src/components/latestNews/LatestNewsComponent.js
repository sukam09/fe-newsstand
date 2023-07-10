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
    const $newsList = this.$target.querySelector('.auto-rolling-animation');

    setTimeout(() => {
      $newsList.style.animationPlayState = 'paused';
    }, this.state.delay * 1000);
    setTimeout(() => {
      $newsList.style.animationPlayState = 'running';
    }, this.state.delay * 2000);

    this.$target.addEventListener('mouseover', () => {
      const currentOpacity = getComputedStyle($newsList).opacity;

      if (currentOpacity === '1') {
        $newsList.style.animationPlayState = 'paused';
      }
    });

    this.$target.addEventListener('mouseout', () => {
      $newsList.style.animationPlayState = 'running';
    });
  }
}

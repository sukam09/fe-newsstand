import Component from '../Component.js';

export default class LatestNewsComponent extends Component {
  setup() {
    this.state = { ...this.props };
    this.isRolling = false;
    this.timerOn();
    // setTimeout(this.timerOn.bind(this), this.state.delay * 1000);
  }

  template() {
    const currentConent = this.state.content[this.state.currentIndex];
    return `<span>${this.state.name}</span>
            <p class='auto-rolling-animation'>${currentConent}</p>
            `;
  }

  setEvent() {
    this.$target.addEventListener('mouseover', () => {
      const $newsList = this.$target.querySelector('.auto-rolling-animation');
      const currentOpacity = getComputedStyle($newsList).opacity;

      if (currentOpacity === '1') {
        $newsList.style.animationPlayState = 'paused';
        this.timerOff();
      }
    });

    this.$target.addEventListener('mouseout', this.timerOn.bind(this));
  }

  timerOn() {
    if (this.isRolling) return;
    this.isRolling = true;

    this.timer = setInterval(this.nextNews.bind(this), 5000);
  }

  timerOff() {
    clearInterval(this.timer);
    this.isRolling = false;
  }

  nextNews() {
    this.state.currentIndex = this.setState({ currentIndex: (this.state.currentIndex + 1) % 5 });
  }
}

import { ROLLING_COUNT, ROLLING_SECOND, SECOND } from '../../constants/index.js';
import Component from '../Component.js';

export default class LatestNewsComponent extends Component {
  setup() {
    this.state = { ...this.props };
    this.isRolling = false;

    this.timerOn();
  }

  template() {
    const currentConent = this.state.content[this.state.currentIndex];
    return `<span class='display-bold14'>${this.state.name}</span>
            <p class='auto-rolling-animation available-medium14'>${currentConent}</p>
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

    if (this.props.delay === 1) {
      this.props.delay = 0;

      setTimeout(() => {
        this.$target.querySelector('.auto-rolling-animation').style.animationPlayState = 'paused';
        this.timer = setInterval(this.nextNews.bind(this), ROLLING_SECOND);
      }, SECOND);
    } else {
      this.timer = setInterval(this.nextNews.bind(this), ROLLING_SECOND);
    }
  }

  timerOff() {
    clearInterval(this.timer);
    this.isRolling = false;
  }

  nextNews() {
    this.state.currentIndex = this.setState({
      currentIndex: (this.state.currentIndex + 1) % ROLLING_COUNT,
    });
  }
}

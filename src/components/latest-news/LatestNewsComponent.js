import Component from '../core/Component.js';
import { ROLLING_COUNT, ROLLING_SECOND, SECOND } from '../../constants/index.js';
import { customQuerySelector } from '../../utils/index.js';

export default class LatestNewsComponent extends Component {
  setup() {
    this.state = { ...this.props };

    setTimeout(() => {
      this.timerOn();
    }, this.state.delay * SECOND);
  }

  template() {
    const currentConent = this.state.content[this.state.currentIndex];
    const nextContent = this.state.content[(this.state.currentIndex + 1) % 5];

    return `<span class='display-bold14 text-strong'>${this.state.name}</span>
    <div>
      <div class='auto-rolling-div'>
        <p class='auto-rolling-animation available-medium14 text-default'>${currentConent}</p>
        <p class='auto-rolling-animation available-medium14 text-default'>${nextContent}</p>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.$target.addEventListener('mouseover', this.timerOff.bind(this));

    this.$target.addEventListener('mouseout', this.timerOn.bind(this));
  }

  timerOn() {
    this.timer = setInterval(() => {
      const $content = customQuerySelector('.auto-rolling-div', this.$target);
      $content.style.top = '-18px';

      setTimeout(this.nextNews.bind(this), SECOND);
    }, ROLLING_SECOND);
  }

  timerOff() {
    clearInterval(this.timer);
  }

  nextNews() {
    this.state.currentIndex = this.setState({
      currentIndex: (this.state.currentIndex + 1) % ROLLING_COUNT,
    });
  }
}

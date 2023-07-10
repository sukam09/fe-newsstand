const HEADLINE_NUMBERS = 5;

export default function RecentNewsRollingView({ $target, initialState }) {
  const $section = document.createElement('section');
  $section.classList.add('recent-news-container');

  $target.appendChild($section);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const setLeftHeadlineTimer = () => {
    setInterval(() => {
      this.setState({
        ...this.state,
        leftHeadlineIndex: (this.state.leftHeadlineIndex + 1) % HEADLINE_NUMBERS,
      });
    }, 5000);
  };

  const setRightHeadlineTimer = () => {
    setInterval(() => {
      this.setState({
        ...this.state,
        rightHeadlineIndex: (this.state.rightHeadlineIndex + 1) % HEADLINE_NUMBERS,
      });
    }, 5000);
  };

  setLeftHeadlineTimer();

  setTimeout(() => {
    setRightHeadlineTimer();
  }, 1000);

  this.render = () => {
    const { leftHeadlineIndex, rightHeadlineIndex, leftHeadlines, rightHeadlines } = this.state;

    $section.innerHTML = `
      <div class="recent-news-item">
        <span class="recent-news-press">연합뉴스</span>
        <span class="recent-news-headline">${leftHeadlines[leftHeadlineIndex]}</span>
      </div>
      <div class="recent-news-item">
        <span class="recent-news-press">연합뉴스</span>
        <span class="recent-news-headline">${rightHeadlines[rightHeadlineIndex]}</span>
      </div>
    `;
  };

  this.render();
}

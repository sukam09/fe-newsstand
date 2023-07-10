const HEADLINE_NUMBERS = 5;
const HEADLINE_ROLLING_DELAY = 5000;
const HEADLINE_DELAY_DIFF = 1000;

export default function RecentNewsRollingView({ $target, initialState }) {
  const $section = document.createElement('section');
  $section.classList.add('recent-news-container');

  $target.appendChild($section);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const setLeftHeadline = () => {
    this.setState({
      ...this.state,
      leftHeadlineIndex: (this.state.leftHeadlineIndex + 1) % HEADLINE_NUMBERS,
    });
  };

  const setRightHeadline = () => {
    this.setState({
      ...this.state,
      rightHeadlineIndex: (this.state.rightHeadlineIndex + 1) % HEADLINE_NUMBERS,
    });
  };

  this.timer = setInterval(() => {
    setLeftHeadline();
    setTimeout(() => {
      setRightHeadline();
    }, HEADLINE_DELAY_DIFF);
  }, HEADLINE_ROLLING_DELAY);

  const handleMouseEnter = () => {
    clearInterval(this.timer);
    clearTimeout(this.rightHeadlineTimer);
  };

  const handleMouseLeave = () => {
    this.timer = setInterval(() => {
      setLeftHeadline();
      this.rightHeadlineTimer = setTimeout(() => {
        setRightHeadline();
      }, HEADLINE_DELAY_DIFF);
    }, HEADLINE_ROLLING_DELAY);
  };

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

    const $recentNewsHeadlines = $section.querySelectorAll('.recent-news-headline');
    $recentNewsHeadlines.forEach($recentNewsHeadline => {
      $recentNewsHeadline.addEventListener('mouseenter', handleMouseEnter);
      $recentNewsHeadline.addEventListener('mouseleave', handleMouseLeave);
    });
  };

  this.render();
}

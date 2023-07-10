export default function RecentNewsRollingViewView({ $target, initialState }) {
  const $section = document.createElement('section');
  $section.classList.add('recent-news-container');

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { headlineIndex, leftHeadlines, rightHeadlines } = this.state;

    $section.innerHTML = `
      <div class="recent-news-item">
        <span class="recent-news-press">연합뉴스</span>
        <span class="recent-news-headline">${leftHeadlines[headlineIndex]}</span>
      </div>
      <div class="recent-news-item">
        <span class="recent-news-press">연합뉴스</span>
        <span class="recent-news-headline">${rightHeadlines[headlineIndex]}</span>
      </div>
    `;

    $target.appendChild($section);
  };

  this.render();
}

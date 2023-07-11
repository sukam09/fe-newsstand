const HEADLINE_NUMBERS = 5;
const HEADLINE_ROLLING_DELAY = 3000;

export default function Headline({ $target, initialState }) {
  const $div = document.createElement('div');
  $div.classList.add('recent-news-item');

  $target.appendChild($div);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const setHeadline = () => {
    this.setState({
      ...this.state,
      index: (this.state.index + 1) % HEADLINE_NUMBERS,
    });
  };

  const setTimer = () => {
    return setInterval(() => {
      setHeadline();
    }, HEADLINE_ROLLING_DELAY);
  };

  // this.timer = setTimer();

  // setTimeout 함수에 delay를 0으로 걸어주는 것은 엄밀하게 0초가 아니기 때문에 offset이 0이 아닐 경우에만 setTimeout을 적용
  this.timer = this.state.offset === 0 ? setTimer() : setTimeout(setTimer, this.state.offset);

  const handleMouseEnter = () => {
    clearInterval(this.timer);
  };

  const handleMouseLeave = () => {
    this.timer = setTimer();
  };

  this.render = () => {
    const { index, headlines } = this.state;

    $div.innerHTML = `
      <span class="recent-news-press">연합뉴스</span>
      <span class="recent-news-headline">${headlines[index]}</span>
    `;

    const $span = $div.querySelector('.recent-news-headline');

    $span.addEventListener('mouseenter', handleMouseEnter);
    $span.addEventListener('mouseleave', handleMouseLeave);
  };

  this.render();
}

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
    // TODO: setState 지우고 transition과 class 바꿔주는 방식으로 구현
    this.setState({
      ...this.state,
      index: (this.state.index + 1) % HEADLINE_NUMBERS,
    });
  };

  const setTimer = (callback, interval) => {
    return setTimeout(() => {
      setHeadline();
      setTimer(callback, interval);
    }, interval);
  };

  // setTimeout 함수에 delay를 0으로 걸어주는 것은 엄밀하게 0초가 아니기 때문에 offset이 0이 아닐 경우에만 setTimeout을 적용
  this.timer =
    this.state.offset === 0
      ? setTimer(setHeadline, HEADLINE_ROLLING_DELAY)
      : setTimeout(() => setTimer(setHeadline, HEADLINE_ROLLING_DELAY), this.state.offset);

  const handleMouseEnter = () => {
    clearTimeout(this.timer);
  };

  const handleMouseLeave = () => {
    this.timer = setTimer(setHeadline, HEADLINE_ROLLING_DELAY);
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

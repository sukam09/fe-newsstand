const HEADLINE_ROLLING_DELAY = 5000;

export default function Headline({ $target, initialState }) {
  const $div = document.createElement('div');
  $div.classList.add('recent-news-item');

  $target.appendChild($div);

  this.state = initialState;

  const setHeadline = () => {
    const $prev = $div.querySelector('.prev');
    const $current = $div.querySelector('.current');
    const $next = $div.querySelector('.next');

    $prev.classList.remove('prev');

    $current.classList.remove('current');
    $current.classList.add('prev');

    $next.classList.remove('next');
    $next.classList.add('current');

    if ($next.nextElementSibling === null) {
      const $first = $div.querySelector('li:first-child');
      $first.classList.add('next');
    } else {
      $next.nextElementSibling.classList.add('next');
    }
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
    const { headlines } = this.state;

    $div.innerHTML = `
      <div class="recent-news-press">연합뉴스</div>
      <div class="recent-news-headline">
        <ul>
          <li>${headlines[3]}</li>
          <li class="prev">${headlines[4]}</li>
          <li class="current">${headlines[0]}</li>
          <li class="next">${headlines[1]}</li>
          <li>${headlines[2]}</li>
        </ul>
      </div>
    `;
  };

  this.render();
}

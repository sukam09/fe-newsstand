/**
 * 최신 뉴스 불러오기
 */
const setLatestNews = () => {
  fetch('./assets/data/latest-news.json')
    .then((response) => response.json())
    .then((data) => {
      setLatestNewsElement(data.latestNewsLeft, 'left');
      setLatestNewsElement(data.latestNewsRight, 'right');
    })
    .catch((error) => {
      console.error('최신 뉴스를 불러오는 중에 오류가 발생했습니다.', error);
    });
};

/**
 * 최신 뉴스 Element 생성
 */
const setLatestNewsElement = (latestNews, side) => {
  const newsWrapper = document.querySelector(`.latest_news__wrapper-${side}`);

  latestNews.forEach((news) => {
    const $li = getLatestNewsElement(news);
    newsWrapper.appendChild($li);
  });

  addRolling(side);
  if (side === 'left') startRollingLeft('left');
  if (side === 'right') startRollingRight('right');
};

const getLatestNewsElement = (news) => {
  const $li = document.createElement('li');
  $li.classList.add('latest_news__li');

  const $h2 = document.createElement('h2');
  $h2.classList.add('latest_news__h2');
  $h2.innerText = news.press;

  const $p = document.createElement('p');
  $p.classList.add('latest_news__p');
  $p.innerText = news.title;

  $li.appendChild($h2);
  $li.appendChild($p);

  return $li;
};

/**
 * 최신 뉴스 롤링 설정
 */
const addRolling = (side) => {
  const rollingWrapper = document.querySelector(`.latest_news__wrapper-${side}`);
  const liElements = rollingWrapper.querySelectorAll('li');

  liElements[0].classList.add('prev');
  liElements[1].classList.add('current');
  liElements[2].classList.add('next');
};

const setRolling = (side) => {
  setRollingPrev(side);
  setRollingCurrent(side);
  setRollingNext(side);
};

const setRollingPrev = (side) => {
  const prev = document.querySelector(`.latest_news__wrapper-${side} .prev`);
  prev.classList.remove('prev');
};

const setRollingCurrent = (side) => {
  const current = document.querySelector(`.latest_news__wrapper-${side} .current`);
  current.classList.remove('current');
  current.classList.add('prev');
};

const setRollingNext = (side) => {
  const next = document.querySelector(`.latest_news__wrapper-${side} .next`);
  if (next.nextElementSibling === null) {
    document.querySelector(`.latest_news__wrapper-${side} li:first-child`).classList.add('next');
  }
  if (next.nextElementSibling !== null) {
    next.nextElementSibling.classList.add('next');
  }
  next.classList.remove('next');
  next.classList.add('current');
};

/**
 * 최신 뉴스 롤링 시작
 */
const startRollingLeft = (side) => {
  let intervalLeft = startInterval(side);

  const pressLeft = document.querySelectorAll(`.latest_news__wrapper-left .latest_news__h2`);
  const titleLeft = document.querySelectorAll(`.latest_news__wrapper-left .latest_news__p`);

  pressLeft.forEach((press) => {
    press.addEventListener('mouseover', () => {
      clearInterval(intervalLeft);
      press.classList.add('hover-medium14');
    });
    press.addEventListener('mouseout', () => {
      intervalLeft = setInterval(setRolling, 5000, side);
      press.classList.remove('hover-medium14');
    });
  });

  titleLeft.forEach((title) => {
    title.addEventListener('mouseover', () => {
      clearInterval(intervalLeft);
      title.classList.add('hover-medium14');
    });
    title.addEventListener('mouseout', () => {
      intervalLeft = setInterval(setRolling, 5000, side);
      title.classList.remove('hover-medium14');
    });
  });
};

const startRollingRight = (side) => {
  let intervalRight;

  setTimeout(() => {
    intervalRight = startInterval(side);
  }, 1000);

  const pressRight = document.querySelectorAll(`.latest_news__wrapper-right .latest_news__h2`);
  const titleRight = document.querySelectorAll(`.latest_news__wrapper-right .latest_news__p`);

  pressRight.forEach((press) => {
    press.addEventListener('mouseover', () => {
      clearInterval(intervalRight);
      press.classList.add('hover-medium14');
    });
    press.addEventListener('mouseout', () => {
      intervalRight = setInterval(setRolling, 5000, side);
      press.classList.remove('hover-medium14');
    });
  });

  titleRight.forEach((title) => {
    title.addEventListener('mouseover', () => {
      clearInterval(intervalRight);
      title.classList.add('hover-medium14');
    });
    title.addEventListener('mouseout', () => {
      intervalRight = setInterval(setRolling, 5000, side);
      title.classList.remove('hover-medium14');
    });
  });
};

const startInterval = (side) => {
  return setInterval(setRolling, 5000, side);
};

export { setLatestNews };

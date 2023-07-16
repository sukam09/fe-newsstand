const HEADER_CLASS = {
  LI: 'latest_news__li',
  H2: 'latest_news__h2',
  P: 'latest_news__p',
};

const NEWS_SLICE = {
  MIN: 0,
  MAX: 10,
};

const SIDE = {
  RIGHT: 'right',
  LEFT: 'left',
};

const ROLLING = {
  INTERVAL: 5000,
  DELAY: 1000,
  PREV: 'prev',
  CURRENT: 'current',
  NEXT: 'next',
};

const URL = {
  DATA: './assets/data/latest-news.json',
};

const ERROR = {
  MESSAGES: '최신 뉴스를 불러오는 중에 오류가 발생했습니다.',
};

export { HEADER_CLASS, NEWS_SLICE, SIDE, ROLLING, URL, ERROR };

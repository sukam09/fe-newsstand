export const SECOND = 1000;
export const ROLLING_COUNT = 5;
export const ROLLING_SECOND = ROLLING_COUNT * SECOND;

export const SNACK_BAR_SECOND = 5 * SECOND;

export const GRID_NEWS_COUNT = 24;

export const NEWS_DATA_URL = 'src/mocks/news.json';

export const TEXT = Object.freeze({
  SUBSCRIBE_KO: '구독하기',
  UNSUBSCRIBE_KO: '해지하기',
  SUBSCRIBE_SUCCESS: '내가 구독한 언론사에 추가되었습니다.',
  UNSUBSCRIBE_SUCCESS: '구독이 해지되었습니다.',
  ALERT_MODAL_CLASS_NAME: '.alert-modal',
  SNACK_BAR_CLASS_NAME: '.snack-bar-component',
  LIST: 'list',
  GRID: 'grid',
  ALL: 'all',
  SUBSCRIBE_EN: 'subscribed',
  LIGHT: 'light',
  DARK: 'dark',
});

export const KEY = Object.freeze({
  COLOR_MODE: 'colorMode',
});

export const LIST_KEYS_TEMPLATE = [
  '종합/경제',
  '방송/통신',
  'IT',
  '영자지',
  '스포츠/연예',
  '매거진/전문지',
  '지역',
];

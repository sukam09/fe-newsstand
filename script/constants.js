import Icon from './components/Icon.js';

export const HEADLINE = {
  DELAY: 1000,
  INTERVAL: 5000,
};

export const MSG = {
  MEDIA_EDITED: '언론사에서 직접 편집한 뉴스입니다.',
  SUBSCRIBE: '내가 구독한 언론사에 추가되었습니다.',
  ALERT_UNSUB: '예, 해지합니다',
  ALERT_NO: '아니오',
  BUTTON_SUB: '구독하기',
  BUTTON_UNSUB: '해지하기',
  NOSUB_TITLE: '구독한 언론사가 없습니다.',
  NOSUB_MSG:
    '언론사 구독 설정에서 관심 있는 언론사를 구독하시면<br>언론사가 직접 편집한 뉴스들을 네이버 홈에서 바로 보실 수 있습니다.',
};

export const THEME = {
  NAME: 'THEME',
  ATTR: 'data-theme',
  LIGHT: 'light',
  DARK: 'dark',
};

export const PROGRESS_BAR_DELAY = 20000;

export const SNACKBAR_DELAY = 5000;

export const MEDIA_APP_DATA = {
  media: [
    {
      name: 'all',
      innerHTML: '전체 언론사',
    },
    {
      name: 'subscribed',
      innerHTML: '내가 구독한 언론사',
    },
  ],
  view: [
    {
      name: 'list',
      innerHTML: Icon.listView,
    },
    {
      name: 'grid',
      innerHTML: Icon.gridView,
    },
  ],
};

export const MEDIA = {
  TOTAL: 96,
  PAGE_SIZE: 24,
  MAX_PAGE: 3,
};

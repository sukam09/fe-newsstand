import Icon from './components/Icon.js';

export const HEADLINE = {
  DELAY: 1000,
  INTERVAL: 5000,
};

export const MSG = {
  SUBSCRIBE: '내가 구독한 언론사에 추가되었습니다.',
  ALERT_UNSUB: '예, 해지합니다',
  ALERT_NO: '아니오',
  BUTTON_SUB: '구독하기',
  BUTTON_UNSUB: '해지하기',
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

export const HEADLINE_DATA = {
  MEDIA: '연합뉴스',
  NEWS: [
    [
      `[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출`,
      `이르면 모레부터 '분리납부' 신청시 전기요금·TV수신료 따로`,
      `정부, '처리수' 표현에 "문제없어", '핵폐수'엔 "불안감 내용 부적절"`,
      `원희룡 "野 거짓 정치공세 지속되면 양평고속道 재추진 못해"`,
      `권영준 대법관 후보자, 군법무관 복무 중 1년간 석사과정`,
    ],
    [
      `[속보] 與최고위원 본경선, 김병민·김용태·김재원·민영삼`,
      `검찰, 국회 2차 압수수색…송영길 보좌진 동선 추적`,
      `"선관위 직원들, 선관위원 수당 등으로 해외여행·전별금 수수"`,
      `이재명·이낙연, 내일 만찬 회동…계파 갈등 향배 주목`,
      `에코프로, 주가 100만원 뚫었는데…목표가 전망 손 놓은 증권가`,
    ],
  ],
};

// (임시) 구독한 언론사 배열
export const SUB_MEDIA = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27,
];

import { getShuffleIds } from '../utils/shuffle.js';

const STATE = {
  IS_GRID: true,
  IS_TOTAL: true,
  IS_UNSUBSCRIBE: true,
};

const LIST = {
  CATEGORY_LENGTH: 0,
  CATEGORY_COUNT: 1,
  PAGE_LENTH: 0,
  PAGE_COUNT: 1,
  SUFFLE_CATEGORY: [],
  SUFFLE_ID: getShuffleIds(96),
  SUBSCRIBE_ID: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  CATEGORY_NAME: ['종합/경제', '방송/통신', 'IT', '영자지', '스포츠/연예', '매거진/전문지', '지역'],
  SUBSCRIBE_NAME: [
    'YTN 사이언스',
    'Able뉴스',
    '뉴스토마토',
    '데일리한국',
    '시사오늘',
    '대전방송',
    '이코노타임즈',
    '독서신문',
    '산',
    '시사 IN',
  ],
};

// 리팩토링
const PAGE = {
  GRID: 0,
  MIN: 0,
  MAX: 3,
};

export { STATE, LIST, PAGE };

import { getShuffleIds } from '../utils/shuffle.js';

const STATE = {
  IS_GRID: true,
  IS_TOTAL: true,
  IS_UNSUBSCRIBE: true,
};

const LIST = {
  SUBSCRIBE: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  SUFFLE: getShuffleIds(96),
};

const PAGE = {
  GRID: 0,
  MIN: 0,
  MAX: 3,
};

export { STATE, LIST, PAGE };

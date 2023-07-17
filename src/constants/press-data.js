import { getShuffleIds } from '../utils/shuffle.js';

const STATE = {
  IS_GRID: true,
  IS_TOTAL: true,
};

const LIST = {
  SUBSCRIBE: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  SUFFLE: getShuffleIds(96),
};

const PAGE = {
  GRID: 0,
};

const ARROW = {
  THRESHOLD: 3,
};

export { STATE, LIST, PAGE, ARROW };

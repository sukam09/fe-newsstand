import { getShuffleIds } from '../utils/shuffle.js';

const STATE = {
  IS_GRID: true,
  IS_TOTAL: true,
};

const LIST = {
  SUBSCRIBE: [1, 2, 3],
  SUFFLE: getShuffleIds(96),
};

const PAGE = {
  GRID: 0,
};

const ARROW = {
  THRESHOLD: 3,
};

export { STATE, LIST, PAGE, ARROW };

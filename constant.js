const MEDIA = Object.freeze({
  TOTAL_NUM: 96,
  GRID_ROW_NUM: 4,
  GRID_COLUMN_NUM: 6,
  MAX_PAGE: 3,
});

const TOPIC = Object.freeze({
  TOTAL_NUM: 10,
  SECTION_NUM: 5,
  ROLLING_TIME: 5000,
  ROLLING_TIME_GAP: 1000,
});

const IMAGE = Object.freeze({
  SUN_ICON: "/images/sun.png",
  MOON_ICON: "/images/moon.png",
  BLUE_GRID_ICON: "/images/grid-view_blue.svg",
  GRAY_GRID_ICON: "/images/grid-view_gray.svg",
  BLUE_LIST_ICON: "/images/list-view_blue.svg",
  GRAY_LIST_ICON: "/images/list-view_gray.svg",
});

const STATE = {
  GRID_PAGE_NUM: 0,
  SUBSCRIBE_LIST: [],
  MODE: {
    IS_LIGHT: true,
    IS_GRID: true,
    IS_TOTAL: true,
  },
  LIST_MODE: {
    CATE_IDX: 0,
    CATE_MEDIA_IDX: 0,
    SUBSCRIBE_MEDIA_IDX: 0,
  },
};

export { MEDIA, TOPIC, IMAGE, STATE };

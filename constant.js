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

const MESSAGE = Object.freeze({
  UNSUBSCRIBE: "구독이 해지되었습니다!",
  ERROR_NO_SUBSCRIBE: "구독중인 언론사가 없습니다!",
});

const URL = Object.freeze({
  HOT_TOPIC: "/assets/hot-topic.json",
  MEDIA_INFO: "/assets/media-content.json",
});

export { MEDIA, TOPIC, IMAGE, MESSAGE, URL };

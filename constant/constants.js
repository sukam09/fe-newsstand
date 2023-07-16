// 그리드에 들어갈 언론사 수
export const MAX_GRID_COUNT = 24;
// 롤링에 들어갈 뉴스 수
export const ROLLING_NEWS_NUM = 5;
// 좌우 롤링 시간 차
export const ANIMATION_GAP = 1000;
// 롤링되는 시간
export const ROLLING_TIME = 5000;
// 카테고리 탭 전환 시간
export const CATEGORY_TAB_TIME = 20000;
// 카테고리 탭 길이
export const CATEGORY_TAB_NUM = categoryList.length - 1;
// 리스트 뷰 뉴스 개수
export const MAX_NEWS_COUNT = 6;

// 현재 뷰 상태를 보여는 상수
export const IS_GRID = {
  is_grid: true,
  getValue: function () {
    return this.is_grid;
  },
  toggleValue: function () {
    this.is_grid = !this.is_grid;
    return this.is_grid;
  },
};

// 현재 카테고리 인덱스
export const NOW_CATEGORY_IDX = {
  now_category_idx: 0,
  getValue: function () {
    return this.now_category_idx;
  },
  incrementValue: function (increment) {
    this.now_category_idx += increment;
    return this.now_category_idx;
  },
  setValue: function (value) {
    this.now_category_idx = value;
    return this.now_category_idx;
  },
};

// 현재 리스트뷰 페이지 인덱스
export const NOW_LIST_PAGE = {
  now_list_page: 1,
  getValue: function () {
    return this.now_list_page;
  },
  incrementValue: function (increment) {
    this.now_list_page += increment;
    return this.now_list_page;
  },
  setValue: function (value) {
    this.now_list_page = value;
    return this.now_list_page;
  },
};

// 현재 리스트뷰 페이지 인덱스
export const NOW_GRID_PAGE = {
  now_grid_page: 0,
  getValue: function () {
    return this.now_grid_page;
  },
  incrementValue: function (increment) {
    this.now_grid_page += increment;
    return this.now_grid_page;
  },
  setValue: function (value) {
    this.now_grid_page = value;
    return this.now_grid_page;
  },
};

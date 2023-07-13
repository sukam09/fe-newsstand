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

export const MAX_NEWS_COUNT = 6;
export const CATEGORY_TAB_NUM = categoryList.length - 1;

// 롤링에 들어갈 뉴스 수
export const ROLLING_NEWS_NUM = 5;
// 좌우 롤링 시간 차
export const ANIMATION_GAP = 1000;
// 롤링되는 시간
export const ROLLING_TIME = 5000;

import { Store } from '../core/Store.js';

const globalStore = new Store({
  state: {
    전체언론_그리드_인덱스: 0,
    전체언론_리스트: {
      뉴스_인덱스: 0,
      카테고리_인덱스: 0,
      전체카테고리: 0,
    },
    구독언론_그리드_인덱스: 0,
    구독언론_리스트_인덱스: 0,
    KEY: '전체언론_그리드_인덱스',
    OPTION: '전체_언론사',
  },
  mutations: {
    nextIndex(state, payload) {
      if (payload === '전체언론_리스트') {
        state.전체언론_리스트.뉴스_인덱스++;
      } else {
        state[payload]++;
      }
    },
    prevIndex(state, payload) {
      if (payload === '전체언론_리스트') {
        state.전체언론_리스트.뉴스_인덱스--;
      } else {
        state[payload]--;
      }
    },
    nextCategoryIndex(state) {
      state.전체언론_리스트.카테고리_인덱스++;
      state.전체언론_리스트.뉴스_인덱스 = 0;
    },
    prevCategoryIndex(state) {
      state.전체언론_리스트.카테고리_인덱스--;
      state.전체언론_리스트.뉴스_인덱스 = 0;
    },
    updateKey(state, payload) {
      state.KEY = payload;
    },
    updateOption(state, payload) {
      state.OPTION = payload;
    },
    updateCateGoryCount(state, payload) {
      state.전체언론_리스트.전체카테고리 = payload;
    },
    updateCategoryIndex(state, payload) {
      state.전체언론_리스트.카테고리_인덱스 = payload;
    },
    resetNewsList(state) {
      state.전체언론_리스트.카테고리_인덱스 = 0;
      state.전체언론_리스트.뉴스_인덱스 = 0;
    },
    resetNewsIndex(state) {
      state.전체언론_리스트.뉴스_인덱스 = 0;
    },
  },

  getters: {
    getGlobalData(state) {
      return state;
    },
  },
});

export { globalStore };

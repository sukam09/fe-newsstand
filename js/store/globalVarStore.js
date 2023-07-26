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
    구독언론_리스트: {
      뉴스_인덱스: 0,
      카테고리_인덱스: 0,
      전체카테고리: 0,
    },
    KEY: '전체언론_그리드_인덱스',
    OPTION: '전체_언론사',
  },
  mutations: {
    nextIndex(state, payload) {
      if (payload === '전체언론_리스트') state.전체언론_리스트.뉴스_인덱스++;
      if (payload === '구독언론_리스트') state.구독언론_리스트.카테고리_인덱스++;
      if (payload === '전체언론_그리드_인덱스') state[payload]++;
      if (payload === '구독언론_그리드_인덱스') state[payload]++;
    },
    prevIndex(state, payload) {
      if (payload === '전체언론_리스트') state.전체언론_리스트.뉴스_인덱스--;
      if (payload === '구독언론_리스트') state.구독언론_리스트.카테고리_인덱스--;
      if (payload === '전체언론_그리드_인덱스') state[payload]--;
      if (payload === '구독언론_그리드_인덱스') state[payload]--;
    },
    nextCategory(state) {
      state.전체언론_리스트.카테고리_인덱스++;
      state.전체언론_리스트.뉴스_인덱스 = 0;
    },
    prevCategory(state) {
      state.전체언론_리스트.카테고리_인덱스--;
      state.전체언론_리스트.뉴스_인덱스 = 0;
    },
    updateKey(state, payload) {
      state.KEY = payload;
    },
    updateOption(state, payload) {
      if (payload === '전체_언론사') {
        if (state.KEY === '구독언론_그리드_인덱스') state.KEY = '전체언론_그리드_인덱스';
        if (state.KEY === '구독언론_리스트') state.KEY = '전체언론_리스트';
      } else if (payload === '구독_언론사') {
        if (state.KEY === '전체언론_그리드_인덱스') state.KEY = '구독언론_그리드_인덱스';
        if (state.KEY === '전체언론_리스트') state.KEY = '구독언론_리스트';
      }
      state.OPTION = payload;
    },
    updateCategoryIndex(state, payload) {
      if (payload.key === '전체언론_리스트') state.전체언론_리스트.카테고리_인덱스 = payload.val;
      if (payload.key === '구독언론_리스트') state.구독언론_리스트.카테고리_인덱스 = payload.val;
    },
    categoryProgress(state, payload) {
      if (state.KEY === '전체언론_리스트') {
        state.전체언론_리스트.뉴스_인덱스++;
        if (globalStore.state.전체언론_리스트.뉴스_인덱스 >= payload.len) {
          state.전체언론_리스트.카테고리_인덱스++;
          state.전체언론_리스트.뉴스_인덱스 = 0;
          if (payload.total - 1 < globalStore.state.전체언론_리스트.카테고리_인덱스) {
            state.전체언론_리스트.카테고리_인덱스 = 0;
            state.전체언론_리스트.뉴스_인덱스 = 0;
          }
        }
      }
      if (state.KEY === '구독언론_리스트') {
        state.구독언론_리스트.카테고리_인덱스++;
        if (state.구독언론_리스트.카테고리_인덱스 === payload) state.구독언론_리스트.카테고리_인덱스 = 0;
      }
    },
    categorySelect(state, payload) {
      state.전체언론_리스트.뉴스_인덱스 = 0;
      if (state.KEY === '전체언론_리스트') state.전체언론_리스트.카테고리_인덱스 = payload.val;
      if (state.KEY === '구독언론_리스트') state.구독언론_리스트.카테고리_인덱스 = payload.val;
    },
  },

  getters: {
    getGlobalData(state) {
      return state;
    },
  },
});

export { globalStore };

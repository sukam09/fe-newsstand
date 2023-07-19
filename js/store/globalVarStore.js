import { Store } from '../core/Store.js';

const globalStore = new Store({
  state: {
    전체언론_그리드_인덱스: 0,
    전체언론_리스트_인덱스: 0,
    구독언론_그리드_인덱스: 0,
    구독언론_리스트_인덱스: 0,
  },
  mutations: {
    nextIndex(state, payload) {
      state[payload]++;
    },
    prevIndex(state, payload) {
      state[payload]--;
    },
  },

  getters: {
    getGlobalData(state) {
      return state;
    },
  },
});

export { globalStore };

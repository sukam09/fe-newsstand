import { Store } from '../core/Store.js';

const subScribeStore = new Store({
  state: {
    subscribeData: [],
  },

  mutations: {
    subscribe(state, payload) {
      state.subscribeData.push(payload);
    },
    unsubscribe(state, payload) {
      state.subscribeData = state.subscribeData.filter((data) => data != payload);
    },
  },

  getters: {
    getsubscribeData(state) {
      return state.subscribeData;
    },
  },
});

export { subScribeStore };

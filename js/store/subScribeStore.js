import { Store } from '../core/Store.js';

const subScribeStore = new Store({
  state: {
    subscribeData: [],
  },

  mutations: {
    setState(state, payload) {
      state.subscribeData.push(payload);
      // notify
    },
    updateState(state, payload) {
      state.subscribeData = state.subscribeData.filter((d) => d != payload);
    },
  },

  getters: {
    getsubscribeData(state) {
      return state.subscribeData;
    },
  },
});

export { subScribeStore };

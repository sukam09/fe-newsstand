import { Store } from '../core/Store.js';

const subScribeStore = new Store({
  state: {
    subscribeData: [],
  },
  // state의 값은 오직 mutations를 통해서 변경할 수 있다.
  mutations: {
    setState(state, payload) {
      state.subscribeData.push(payload);
    },
    updateState(state, payload) {
      state.subscribeData = state.subscribeData.filter((d) => d != payload);
    },
  },

  // 현재 쓸만한 API가 없다.
  actions: {},

  //computed
  getters: {
    getsubscribeData(state) {
      return state.subscribeData;
    },
  },
});

export { subScribeStore };

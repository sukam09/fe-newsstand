import { Observable } from './Observable.js';

class Store extends Observable {
  constructor(store) {
    super();
    this.state = store.state;
    this.mutations = store.mutations;
    this.actions = store.actions;
    this.getters = store.getters;
  }
  // mutations 실행
  commit(mutationName, payload) {
    this.mutations[mutationName](this.state, payload);
    this.notify(this.state);
  }
  // action 실행
  dispatch(actionName, payload) {
    this.actions[actionName](
      {
        state: this.state,
        commit: this.commit.bind(this),
        dispatch: this.dispatch.bind(this),
      },
      payload
    );
  }

  getGetter(getterName) {
    return this.getters[getterName](this.state);
  }
}

export { Store };

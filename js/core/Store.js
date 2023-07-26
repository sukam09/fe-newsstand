import { Observable } from './Observable.js';

class Store extends Observable {
  constructor(store) {
    super();
    this.state = store.state;
    this.mutations = store.mutations;
    this.actions = store.actions;
    this.getters = store.getters;
  }
  commit(mutationName, payload) {
    this.mutations[mutationName](this.state, payload);
    this.notify(this.state);
  }
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

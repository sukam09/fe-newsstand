class GlobalState {
  constructor() {
    this.states = [];
  }
}
class State {
  constructor(state) {
    this.state = state;
    this.observers = new Set();
  }
}

const globalState = new GlobalState();

const subscribe = (key, observer) =>
  globalState.states[key].observers.add(observer);

const _notify = (key) =>
  globalState.states[key].observers.forEach((observer) => observer());

const initState = ({ key, defaultValue }) => {
  globalState.states[key] = new State(defaultValue);
  return key;
};

const getState = (key) => {
  return globalState.states[key].state;
};

const setState = (key, newState) => {
  globalState.states[key].state = newState;
  _notify(key);
};

export { subscribe, initState, getState, setState };

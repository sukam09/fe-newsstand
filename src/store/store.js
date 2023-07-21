class Store {
  #states;

  constructor() {
    this.#states = new Map();
  }

  getState(key) {
    return this.#states.get(key);
  }

  setState(key, state) {
    this.#states.set(key, state);
  }
}

class State {
  #value;
  #observers;

  constructor(value) {
    this.#value = value;
    this.#observers = new Set();
  }

  getValue() {
    return this.#value;
  }

  getObserbers() {
    return this.#observers;
  }

  setValue(value) {
    this.#value = value;
  }
  setObserbers(observer) {
    this.#observers.add(observer);
  }
}

export { Store, State };

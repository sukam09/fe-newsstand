class Store {
  #state;
  #listeners;

  constructor(state, listeners = {}) {
    this.#state = state;
    this.#listeners = listeners;
  }

  subscribe(listener, key = '') {
    if (!this.#listeners[key]) {
      this.#listeners[key] = [];
    }
    this.#listeners[key].push(listener);
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    Object.values(this.#listeners).forEach(listeners =>
      listeners.forEach(listener => listener(this.#state))
    );
  }

  getState() {
    return this.#state;
  }

  unsubscribe(key) {
    this.#listeners[key] = [];
  }

  broadcast() {
    this.#listeners.forEach(listener => listener());
  }
}

export default Store;

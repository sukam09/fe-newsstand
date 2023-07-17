class Store {
  #state;
  #listeners;

  constructor(state) {
    this.#state = state;
    this.#listeners = [];
  }

  subscribe(listener) {
    this.#listeners.push(listener);
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.#listeners.forEach(listener => listener(this.#state));
  }

  getState() {
    return this.#state;
  }

  unsubscribe(listener) {
    this.#listeners = this.#listeners.filter(l => l !== listener);
  }

  broadcast() {
    this.#listeners.forEach(listener => listener());
  }
}

export default Store;

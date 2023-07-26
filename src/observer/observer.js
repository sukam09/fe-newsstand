export default class Observable {
    #state
    #observers = new Set();

    constructor(state) {
        this.#state = state; 
        Object.keys(data).forEach(key => Object.defineProperty(this, key, {
            get: () => this.#state[key]
        }));
    }

    setState(newState){
        this.#state = {...this.#state, ...newState};
        this.notify();
    }

    addSubscribe(subscriber) {
        this.#observers.add(subscriber);
    }

    notify() {
        this.#observers.forEach((fn) => fn());
    }
  } 
export default class Store {
  constructor(reducer) {
    this.state = reducer(); // initState
    this.observers = new Set();

    this.subscribe = (func) => {
      this.observers.add(func);
    };

    this.notify = () => {
      this.observers.forEach((fn) => fn());
    };

    const frozenState = {};
    Object.keys(this.state).forEach((key) => {
      Object.defineProperty(frozenState, key, {
        get: () => this.state[key],
      });
    });

    this.frozenState = frozenState;

    // dispatch로만 state의 값을 변경할 수 있다.
    this.dispatch = (action) => {
      const newState = reducer(this.state, action);

      for (const [key, value] of Object.entries(newState)) {
        if (!this.state[key] || this.state[key] === value) continue;
        this.state[key] = value;
      }

      this.notify();
    };
  }

  getState() {
    return this.frozenState;
  }
}

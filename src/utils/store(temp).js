import { observable } from "./observer.js";

export default class Store {
  constructor(reducer) {
    this.state = observable(reducer()); // initState

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
        // state의 key가 아닐 경우 변경을 생략한다.
        if (!this.state[key]) continue;
        this.state[key] = value;
      }
    };
  }

  getState() {
    return this.frozenState;
  }
}

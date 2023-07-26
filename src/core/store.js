class Store {
  constructor() {
    this.state = []; // 구독한 언론사
    this.listeners = new Set();
  }

  /** 구독 언론사 추가 */
  addState(newstate) {
    this.state = [...this.state, newstate];
    this.notify();
  }

  /** 구독 언론사 제거 */
  removeState(rmState) {
    this.state = this.state.filter((v) => v !== rmState);
    this.notify();
  }

  /** 구독 언론사 가져오기 */
  getState() {
    return this.state;
  }

  /** 구독 언론사 개수 */
  getStateSize() {
    return this.state.length;
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  notify() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
}

const store = new Store();

export default store;

class Store {
  constructor() {
    this.subPressState = []; // 구독한 언론사
    this.showState = {
      isShowAllPress: true,
      isShowGrid: true,
    }; // 전체/구독 , 그리드/리스트 상태
    this.listeners = new Set();
    this.showListenrs = new Set();
  }

  /** 구독 언론사 추가 */
  addState(newstate) {
    this.subPressState = [...this.subPressState, newstate];
    this.notify();
  }

  /** 구독 언론사 제거 */
  removeState(rmState) {
    this.subPressState = this.subPressState.filter((v) => v !== rmState);
    this.notify();
  }

  /** 탭 상태 설정 */
  setShowState({ isShowAllPress, isShowGrid }) {
    this.showState = { isShowAllPress, isShowGrid };
    this.notifyShowState();
  }

  /** 구독 언론사 가져오기 */
  getState() {
    return this.subPressState;
  }

  /** 구독 언론사 개수 */
  getStateSize() {
    return this.subPressState.length;
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  subscribeShowState(listener) {
    this.showListenrs.add(listener);
  }

  notify() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }

  notifyShowState() {
    this.showListenrs.forEach((listener) => {
      listener();
    });
  }
}

const store = new Store();

export default store;

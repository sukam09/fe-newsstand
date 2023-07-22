class SubscribeState {
  constructor() {
    this.subPressList = [];
  }

  getSubState() {
    return this.subPressList;
  }

  // id로 구독언론사 리스트에 있는지 찾기
  getSubInfoByid(id) {
    return this.subPressList.filter((item) => item[0] === id);
  }

  setSubscribeState(id, name, src) {
    this.subPressList.push([id, name, src]);
  }
}

export const subscribeState = new SubscribeState();

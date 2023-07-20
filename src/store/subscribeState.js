class SubscribeState {
  constructor() {
    this.subPressList = [];
  }

  // 구독언론사 리스트 get
  getSubState() {
    return this.subPressList;
  }

  // id값으로 구독중인지 확인
  getSubInfoByid(id) {
    return this.subPressList.filter((item) => item[0] === id);
  }

  // 구독 추가
  setSubscribeState(id, name, src) {
    this.subPressList.push([id, name, src]);
  }

  // 구독 해지
  setUnSubscribeState(id) {
    this.subPressList = this.subPressList.filter((item) => item[0] !== id);
  }
}

export const subscribeState = new SubscribeState();

class SubscribeState {
  // 객체나 map를 자료구조로.
  constructor() {
    this.subList = [];
  }

  // 구독 등록
  setSubscribeState(id, name) {
    this.subList.push([id, name]);
  }

  // 구독 해지
  setUnSubscribeState(id) {
    this.subList = this.subList.filter((item) => item[0] !== id);
  }

  // 현재 구독중인 상태
  getSubscribeState() {
    return this.subList;
  }

  // id값으로 구독중인지 확인
  getSubscribeById(id) {
    this.subList = this.subList.filter((item) => item[0] === id);
    return this.subList;
  }
}

export const subscribeState = new SubscribeState();

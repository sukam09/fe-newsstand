class SubscribeState {
  // 객체나 map를 자료구조로.
  constructor() {
    this.subList = [];
  }

  // 구독 등록
  setSubscribeState(name) {
    this.subList.push(name);
  }

  // 구독 해지
  setUnSubscribeState(name) {
    this.subList = this.subList.filter((item) => item !== name);
  }

  // 현재 구독중인 상태
  getSubscribeState() {
    return this.subList;
  }

  // id값으로 구독중인지 확인
  getSubscribeByName(name) {
    return this.subList.filter((item) => item === name);
  }
}

export const subscribeState = new SubscribeState();

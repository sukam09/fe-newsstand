class SubscribeState {
  constructor() {
    this.subPressList = [];
  }

  getSubscribeState() {
    return this.subPressList;
  }

  // id로 찾기
  getSubInfoById(id) {
    return this.subPressList.filter((item) => item[0] === id);
  }

  // name으로 찾기
  getSubInfoByName(name) {
    return this.subPressList.filter((item) => item[1] === name);
  }

  setSubscribeState(id, name, src) {
    this.subPressList.push([id, name, src]);
  }

  removePressFromSubList(press) {
    this.subPressList = this.subPressList.filter((item) => item !== press);
    return this.subPressList;
  }
}

export const subscribeState = new SubscribeState();

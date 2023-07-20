class SubscribeState {
  constructor() {
    this.subPressList = [];
  }

  getSubState() {
    return this.subPressList;
  }

  setSubscribeState(id, name, src) {
    this.subPressList.push([id, src]);
  }
}

export const subscribeState = new SubscribeState();

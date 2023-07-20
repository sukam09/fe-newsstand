class SubscribeState {
  constructor() {
    this.subPressList = [];
  }

  getSubState() {
    return this.subPressList;
  }

  setSubscribeState(id, src) {
    this.subPressList.push([id, src]);
  }
}

export const subscribeState = new SubscribeState();

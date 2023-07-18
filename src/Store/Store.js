class Store {
  #pressArr; // 구독 언론사 배열

  constructor() {
    this.#pressArr = [];
  }

  get myPressList() {
    return this.#pressArr;
  }

  #subscribe(pressId) {
    this.#pressArr.push(pressId);
  }

  #unsubscribe(pressId) {
    const index = this.#pressArr.indexOf(pressId);

    if (index > -1) {
      this.#pressArr.splice(index, 1);
    }
  }

  isSubscribed(pressId) {
    return this.#pressArr.indexOf(pressId) > -1;
  }

  dispatch(type, pressId) {
    if (type === "구독하기") {
      this.#subscribe(pressId);
    } else if (type === "해지하기") {
      this.#unsubscribe(pressId);
    }
  }
}

const store = new Store();

export default store;

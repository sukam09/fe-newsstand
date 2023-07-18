const store = {
  state: {
    subscribedPress: [],
  },

  // 리스너에는 listview랑 gridview의 render 함수
  listeners: [],

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  },

  get subscribedPress() {
    return this.state.subscribedPress;
  },

  set subscribedPress(updatedSubPress) {
    this.state.subscribedPress = updatedSubPress;
    noiify();
  },

  subscribe(listener) {
    store.listeners.push(listener);
  },
};

export { store };

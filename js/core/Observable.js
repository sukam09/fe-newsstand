class Observable {
  constructor() {
    this._observers = new Set();
  }
  subscribe(observer) {
    this._observers.add(observer);
  }
  unsubscribe(observer) {
    this._observers.delete(observer);
  }
  notify(data) {
    console.log(data);
    this._observers.forEach((observer) => observer(data));
  }
  a() {
    console.log('a');
  }
}
export { Observable };

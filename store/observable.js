class Observable {
  constructor() {
    this.observers = new Set();
  }
  subscribe(observer) {
    this.observers.add(observer);
  }
  unsubscribe(observer) {
    this.observers.delete(observer);
  }
  notify() {
    this.observers.forEach(observer => observer.render());
  }
}

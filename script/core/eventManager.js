class EventManager {
  #data;

  constructor() {
    this.#data = {};
  }

  #run(type, element, callback) {
    if (!element?.contains(type.target)) return;
    callback(type);
  }

  register(type, element, callback) {
    if (!this.#data[type]) {
      this.#data[type] = [];
      document.addEventListener(type, event => {
        this.#data[type].forEach(listener => listener(event));
      });
    }
    this.#data[type].push(event => this.#run(event, element, callback));
  }

  // TODO: unregister 구현
}

const setEventManager = () => {
  document.eventManager = new EventManager();
};

export default setEventManager;

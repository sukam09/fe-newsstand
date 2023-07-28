class EventManager {
  #data;

  constructor() {
    this.#data = {};
  }

  #run(type, element, callback) {
    if (!element?.contains(type.target)) return;
    callback(type);
  }

  register(type, element, callback, key = 'global') {
    if (!this.#data.hasOwnProperty(type)) {
      this.#data[type] = {};
      document.addEventListener(type, event => {
        Object.values(this.#data[type])
          .flat()
          .forEach(listener => listener(event));
      });
    }
    if (!this.#data[type].hasOwnProperty(key)) {
      this.#data[type][key] = [];
    }
    this.#data[type][key].push(event => this.#run(event, element, callback));
  }

  unregister(keys) {
    keys.forEach(key => {
      Object.values(this.#data)?.forEach(type => {
        delete type[key];
      });
    });
  }
}

const setEventManager = () => {
  document.eventManager = new EventManager();
};

export default setEventManager;

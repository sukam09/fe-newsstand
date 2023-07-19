import { fetchData, getLocalStorage, setLocalStorage } from '../api/index.js';

class DB {
  constructor() {
    this.subscribedList = getLocalStorage('subscribed') ?? [];
    this.observedList = [];
    fetchData().then(data => (this.allPress = data));
  }

  get getAllpress() {
    return this.allPress;
  }

  get getDbData() {
    return this.subscribedList;
  }

  putDbData(list) {
    this.subscribedList = [...this.subscribedList, list];
    setLocalStorage('subscribed', this.subscribedList);
  }
  deleteDbData(list) {
    this.subscribedList = this.subscribedList.filter(item => item !== list);
    setLocalStorage('subscribed', this.subscribedList);
  }
  observe($component) {
    observedList.push($component);
  }

  render() {
    observedList.forEach($component => $component.render());
  }
}

const db = new DB();

export default db;

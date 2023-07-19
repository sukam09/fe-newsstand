import { getLocalStorage, setLocalStorage } from '../api/index.js';

class DB {
  constructor() {
    this.subscribedList = getLocalStorage('subscribed') ?? [];
  }
  get getDbData() {
    return this.subscribedList;
  }

  putDbData(list) {
    this.subscribedList = [...this.subscribedList, list];
    console.log(this.subscribedList);
    setLocalStorage('subscribed', this.subscribedList);
  }
  deleteDbData(list) {
    this.subscribedList = this.subscribedList.filter(item => item !== list);
    setLocalStorage('subscribed', this.subscribedList);
  }
}

const db = new DB();

export default db;

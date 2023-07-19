import { getLocalStorage, setLocalStorage } from '../api';

class DB {
  constructor() {
    getLocalStorage('subscribed').then(res => {
      this.subscribedList = res ?? [];
    });
  }
  get getDbData() {
    return this.subscribedList;
  }

  set setDbData(list) {
    this.subscribedList = [...this.subscribedList, list];
    setLocalStorage('subscribed', this.subscribedList);
  }
}

const db = new DB();

export default db;

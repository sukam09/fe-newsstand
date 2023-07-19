import { fetchData, getLocalStorage, setLocalStorage } from '../api/index.js';
import { TEXT } from '../src/constants/index.js';
import { shufflePressOrder } from '../src/utils/index.js';
import { showSnackBar } from './index.js';

class DB {
  constructor() {
    this.subscribedList = getLocalStorage('subscribed') ?? [];
    this.observedList = [];
    this.allPress = [];

    fetchData().then(data => (this.allPress = shufflePressOrder(data)));
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
    showSnackBar(TEXT.SUBSCRIBE_KO);
    this.render();
  }
  deleteDbData(list) {
    this.subscribedList = this.subscribedList.filter(item => item !== list);
    setLocalStorage('subscribed', this.subscribedList);
    this.render();
  }
  observe($component) {
    this.observedList.push($component);
  }

  render() {
    this.observedList.forEach($component => $component.render());
  }
}

const db = new DB();

export default db;

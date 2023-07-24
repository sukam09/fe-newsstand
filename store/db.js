import { fetchData, getLocalStorage, setLocalStorage } from '../api/index.js';
import { NEWS_DATA_URL, TEXT } from '../src/constants/index.js';
import { shufflePressOrder } from '../src/utils/index.js';
import { showSnackBar } from './index.js';

class DB {
  constructor() {
    this.subscribedList = getLocalStorage('subscribed') ?? [];
    this.observedList = [];
    this.allPress = [];
    this.isLoading = true;

    fetchData(NEWS_DATA_URL).then(data => {
      this.allPress = shufflePressOrder(data);
      this.isLoading = false;
      this.render();
    });
  }

  get getAllpress() {
    return this.allPress;
  }

  get getDbData() {
    return this.subscribedList;
  }

  get getFilteredPress() {
    return this.allPress
      .filter(press => this.getDbData.includes(press.number))
      .sort((a, b) => this.getDbData.indexOf(a.number) - this.getDbData.indexOf(b.number));
  }

  get getLatesstNews() {
    return [this.allPress[0], this.allPress[1]];
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

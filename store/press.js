import { fetchData, getLocalStorage, setLocalStorage } from '../api/index.js';
import { NEWS_DATA_URL, TEXT } from '../src/constants/index.js';
import { shufflePressOrder } from '../src/utils/index.js';
import { showSnackBar } from './index.js';
import { Observable } from './observable.js';

export class PressStore extends Observable {
  constructor() {
    super();
    this.subscribedList = getLocalStorage('subscribed') ?? [];
    this.allPress = [];
    this.filteredPress = [];
    this.isLoading = true;

    this.fetchAllPress();
  }

  async fetchAllPress() {
    const result = await fetchData(NEWS_DATA_URL);
    this.allPress = shufflePressOrder(result);
    this.filteredPress = this.setFilteredPress();
    this.isLoading = false;
    this.notify();
  }

  getAllPress() {
    return this.allPress;
  }

  getFilteredPress() {
    return this.filteredPress;
  }

  setFilteredPress() {
    return this.allPress
      .filter(press => this.subscribedList.includes(press.number))
      .sort(
        (a, b) => this.subscribedList.indexOf(a.number) - this.subscribedList.indexOf(b.number),
      );
  }
  getLatestNews() {
    return [this.allPress[0], this.allPress[1]];
  }

  putSubscribedList(list) {
    this.subscribedList = [...this.subscribedList, list];
    setLocalStorage('subscribed', this.subscribedList);
    showSnackBar(TEXT.SUBSCRIBE_KO);

    this.filteredPress = this.setFilteredPress();
    this.notify();
  }

  deleteSubscribedList(list) {
    this.subscribedList = this.subscribedList.filter(item => item !== list);
    setLocalStorage('subscribed', this.subscribedList);

    this.filteredPress = this.setFilteredPress();
    this.notify();
  }

  isSubscribed(number) {
    return this.subscribedList.includes(number);
  }
}

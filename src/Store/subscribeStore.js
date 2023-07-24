import Observable from "../core/Observable.js";

export default class SubscribeStore extends Observable {
  constructor() {
    super();
    this.subscribeList = [];
  }

  subscribeNews(news) {
    this.subscribeList.push(news);
    this.notify(this.subscribeList);
  }

  unSubscribeNews(news) {
    this.subscribeList = this.subscribeList.filter(
      (item) => item.id !== news.id
    );
    this.notify(this.subscribeList);
  }
}

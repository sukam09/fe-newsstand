class Store {
  #pageNumber;
  #progressInterval;
  #pageMode;
  #subscribedStatus;
  #subscribedNews;
  constructor() {
    this.#pageNumber = 0;
    this.#pageMode = "grid";
    this.#subscribedStatus = "all";
    this.#subscribedNews = [];
    this.setPage = function (pagenumber) {
      this.#pageNumber = pagenumber;
    };
    this.getPage = function () {
      return this.#pageNumber;
    };
    this.setProgressInterval = function (setInterval) {
      this.#progressInterval = setInterval;
    };
    this.getProgressInterval = function () {
      return this.#progressInterval;
    };
    this.clearProgressInterval = function () {
      clearInterval(this.#progressInterval);
    };
    this.setSubscribedMode = function (status) {
      this.#subscribedStatus = status;
    };
    this.setPageMode = function (status) {
      this.#pageMode = status;
    };
    this.getSubscribedMode = function () {
      return this.#subscribedStatus;
    };
    this.getPageMode = function () {
      return this.#pageMode;
    };
    this.setSubscribeNews = function (key) {
      this.#subscribedNews.push({ key: key, value: 1, arrow: true });
    };
    this.getSubscribeNews = function () {
      return this.#subscribedNews;
    };
  }
}

const Stores = new Store();

export default Stores;

class Store {
  #pageNumber;
  #progressInterval;
  #pageMode;
  #subscribedStatus;
  #subscribedNewsCnt;
  #subscribedNewsContent;
  constructor() {
    this.#pageNumber = 0;
    this.#pageMode = "grid";
    this.#subscribedStatus = "all";
    this.#subscribedNewsCnt = [];
    this.#subscribedNewsContent = {};
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
    this.setSubscribeNewsCnt = function (key) {
      this.#subscribedNewsCnt.push({ key: key, value: 1, arrow: true });
    };
    this.getSubscribeNewsCnt = function () {
      return this.#subscribedNewsCnt;
    };
    this.setSubscribeNewsContent = function (object) {
      // console.log(object);
      // this.#subscribedNewsContent.push(object);
    };
    this.getSubscribeNewsContent = function (pageIndex) {
      return this.#subscribedNewsContent[pageIndex];
    };
  }
}

const Stores = new Store();

export default Stores;

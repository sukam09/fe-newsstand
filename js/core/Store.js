class Store {
  #pageNumber;
  #progressInterval;
  #pageMode;
  #subscribedStatus;
  constructor() {
    this.#pageNumber = 0;
    this.#pageMode = "grid";
    this.#subscribedStatus = "all";
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
    this.setSubscribed = function (status) {
      this.#subscribedStatus = status;
    };
    this.setPageMode = function (status) {
      this.#pageMode = status;
    };
    this.getSubscribed = function () {
      return this.#subscribedStatus;
    };
    this.getPageMode = function () {
      return this.#pageMode;
    };
  }
}

const Stores = new Store();

export default Stores;

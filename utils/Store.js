class Store {
  #pageNumber;
  #progressInterval;
  constructor(leftHtml, rightHtml) {
    this.#pageNumber = 0;
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
  }
}

const Stores = new Store();

export default Stores;

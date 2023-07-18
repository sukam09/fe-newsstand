class Store {
  #pageNumber;
  constructor() {
    this.#pageNumber = 0;
    this.setPage = function (pagenumber) {
      this.#pageNumber = pagenumber;
    };
    this.getPage = function () {
      return this.#pageNumber;
    };
  }
}

const Stores = new Store();

export default Stores;

import { fetchData } from "../setData/fetchCategoryData.js";

class Store {
  #pageNumber;
  #progressInterval;
  #pageMode;
  #subscribedStatus;
  #subscribedNewsContent;
  constructor() {
    this.#pageNumber = 0;
    this.#pageMode = "grid";
    this.#subscribedStatus = "all";
    this.#subscribedNewsContent = {};
    this.getOriginalNews = async function () {
      return fetchData();
    };
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
    this.setSubscribeNewsContent = async function (itemId) {
      const news = await Stores.getOriginalNews();
      for (const category in news) {
        const newsItems = news[category];
        const foundItem = newsItems.find((item) => item.id == parseInt(itemId));
        if (foundItem) {
          foundItem["arrow"] = true;
          if (!this.#subscribedNewsContent[foundItem.id])
            this.#subscribedNewsContent[foundItem.press] = [foundItem];
          else this.#subscribedNewsContent[foundItem.press].push(foundItem);
        }
      }
    };
    this.getSubscribeNewsContent = function () {
      return this.#subscribedNewsContent;
    };
    this.removeSubscribeNewsContent = function (id) {
      const newData = {};
      const data = this.#subscribedNewsContent;
      for (const key in data) {
        newData[key] = data[key].filter((item) => item.id !== id);
        if (newData[key].length === 0) {
          delete newData[key];
        }
      }
      this.#subscribedNewsContent = newData;
    };
  }
}

const Stores = new Store();

export default Stores;

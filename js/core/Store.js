import { fetchNewsData } from "../setData/fetchCategoryData.js";

class Store {
  constructor() {
    this.pageNumber = 0;
    this.pageMode = "grid";
    this.subscribedStatus = "all";
    this.subscribedNewsContent = {};
    this.subscribeLogo = [];
  }
  async getOriginalNews() {
    return fetchNewsData();
  }
  setPage(pagenumber) {
    this.pageNumber = pagenumber;
  }
  getPage() {
    return this.pageNumber;
  }
  setProgressInterval(setInterval) {
    this.progressInterval = setInterval;
  }
  getProgressInterval() {
    return this.progressInterval;
  }
  clearProgressInterval() {
    clearInterval(this.progressInterval);
  }
  setSubscribedMode(status) {
    this.subscribedStatus = status;
  }
  setPageMode(status) {
    this.pageMode = status;
  }
  getSubscribedMode() {
    return this.subscribedStatus;
  }
  getPageMode() {
    return this.pageMode;
  }
  async setSubscribeNewsContent(itemId) {
    const news = await Stores.getOriginalNews();
    for (const category in news) {
      const newsItems = news[category];
      const foundItem = newsItems.find((item) => item.id === parseInt(itemId));
      if (foundItem) {
        foundItem["arrow"] = true;
        if (!this.subscribedNewsContent[foundItem.id]) {
          this.subscribedNewsContent[foundItem.name] = [foundItem];
          this.subscribeLogo.push(foundItem);
        } else {
          this.subscribedNewsContent[foundItem.name].push(foundItem);
          this.subscribeLogo.push(foundItem);
        }
      }
    }
  }
  getSubscribeNewsContent() {
    return this.subscribedNewsContent;
  }
  removeSubscribeNewsContent(id) {
    const newData = {};
    const data = this.subscribedNewsContent;
    for (const key in data) {
      newData[key] = data[key].filter((item) => item.id != id);
      if (newData[key].length === 0) delete newData[key];
    }
    this.subscribedNewsContent = newData;
    this.subscribeLogo = this.subscribeLogo.filter((item) => item.id != id);
  }
  getSubscribeLogo() {
    return this.subscribeLogo;
  }
}

const Stores = new Store();

export default Stores;

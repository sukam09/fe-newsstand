import { constants } from "../Data/constants.js";
import Observable from "../core/Observable.js";

export default class ViewStore extends Observable {
  constructor() {
    super();
    this.newsCategory = constants.SHOW_ALL_NEWS;
    this.newsView = constants.SHOW_GRID;
  }

  setCategory(categoryType) {
    this.newsCategory = categoryType;
    this.notify(this.newsCategory);
  }

  setView(viewType) {
    this.newsView = viewType;
    this.notify(this.newsView);
  }
}

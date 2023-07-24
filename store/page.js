import Observable from './observable.js';
import { TEXT } from '../src/constants/index.js';

export class PageStore extends Observable {
  constructor() {
    super();
    this.allTypeGridPage = 0;
    this.allTypeListPage = 1;
    this.allTypeListPageIndex = 0;

    this.subscribedTypeGridPage = 0;
    this.subscribedTypeListPage = 0;
  }

  setPage({ type, option, page, index }) {
    switch (type) {
      case TEXT.GRID:
        option === TEXT.ALL ? (this.allTypeGridPage = page) : (this.subscribedTypeGridPage = page);
        break;
      case TEXT.LIST:
        option === TEXT.ALL
          ? ([this.allTypeListPage, this.allTypeListPageIndex] = [page, index])
          : (this.subscribedTypeListPage = page);
        break;
    }
  }

  getPage({ type, option }) {
    switch (type) {
      case TEXT.GRID:
        return option === TEXT.ALL ? this.allTypeGridPage : this.subscribedTypeGridPage;
      case TEXT.LIST:
        return option === TEXT.ALL
          ? [this.allTypeListPage, this.allTypeListPageIndex]
          : this.subscribedTypeListPage;
    }
  }
}

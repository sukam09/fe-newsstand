import { Observable } from './observable.js';

export class GridPageStore extends Observable {
  constructor() {
    super();
    this.allTypePage = 0;
    this.subscribedTypePage = 0;
  }

  setAllTypePage(page) {
    this.allTypePage = page;
  }

  setSubscribedTypePage(page) {
    this.subscribedTypePage = page;
  }
}

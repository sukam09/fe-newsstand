import { constants } from "../Data/constants.js";
import Observable from "../core/Observable.js";

export default class ViewStore extends Observable {
  constructor() {
    super();
    this.showNewsType = constants.SHOW_GRID;
  }

  setView(viewType) {
    this.showNewsType = viewType;
    this.notify(this.showNewsType);
  }
}

import { constants } from "../Data/constants.js";
import Observable from "../core/Observable.js";

export default class ModeStore extends Observable {
  constructor() {
    super();
    this.mode = constants.LIGHT_MODE;
  }

  setMode(mode) {
    document.body.classList.replace(this.mode, mode);
    this.mode = mode;
    this.notify(this.mode);
  }
}

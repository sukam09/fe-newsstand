import { constants } from "../Data/constants.js";
import Observable from "../core/Observable.js";

export default class ModeStore extends Observable {
  constructor() {
    super();
    this.mode = constants.LIGHT_MODE;
  }

  toggleMode() {
    const newMode =
      this.mode === constants.LIGHT_MODE
        ? constants.DARK_MODE
        : constants.LIGHT_MODE;

    document.body.classList.replace(this.mode, newMode);
    this.mode = newMode;
    this.notify(this.mode);
  }
}

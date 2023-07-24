import Observable from './observable.js';
import { getLocalStorage, setLocalStorage } from '../api/index.js';
import { KEY, TEXT } from '../src/constants/index.js';

export class ViewModeStore extends Observable {
  constructor() {
    super();
    this.viewType = TEXT.LIST;
    this.option = TEXT.ALL;
    this.colorMode = getLocalStorage(KEY.COLOR_MODE) || TEXT.LIGHT;

    document.body.className = this.colorMode;
  }

  toggleViewType(type) {
    this.viewType = type;
    this.notify();
  }

  toggleOption(type) {
    this.option = type;
    this.notify();
  }

  toggleColorMode() {
    this.colorMode = this.colorMode === TEXT.LIGHT ? TEXT.DARK : TEXT.LIGHT;
    document.body.className = this.colorMode;
    setLocalStorage(this.colorMode);
  }

  isDarkMode() {
    return this.colorMode === TEXT.DARK;
  }

  potalMyPress() {
    this.toggleOption(TEXT.SUBSCRIBE_EN);
  }
}

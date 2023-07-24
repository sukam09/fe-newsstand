import { getLocalStorage, setLocalStorage } from '../api/index.js';
import { KEY, TEXT } from '../src/constants/index.js';
import { Observable } from './observable.js';

export class ViewModeStore extends Observable {
  constructor() {
    super();
    this.viewType = 'grid';
    this.option = 'all';
    this.colorMode = getLocalStorage(KEY.COLOR_MODE) || 'light';

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
    this.colorMode = this.colorMode === 'light' ? 'dark' : 'light';
    document.body.className = this.colorMode;
    setLocalStorage(this.colorMode);
  }

  isDarkMode() {
    return this.colorMode === 'dark';
  }
}

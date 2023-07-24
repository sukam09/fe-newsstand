import { getLocalStorage, setLocalStorage } from '../api/index.js';
import { KEY } from '../src/constants/index.js';
import { Observable } from './observable.js';

export class ViewModeStore extends Observable {
  constructor() {
    super();
    this.viewType = 'grid';
    this.option = 'all';
    this.colorMode = getLocalStorage(KEY.COLOR_MODE) || 'light';

    document.body.className = this.colorMode;
  }

  toggleViewMode() {
    this.viewType = this.viewType === 'grid' ? 'list' : 'grid';
  }

  toggleOption() {
    this.option = this.option === 'all' ? 'subscribed' : 'all';
  }

  toggleColorMode() {
    this.colorMode = this.colorMode === 'light' ? 'dark' : 'light';
    document.body.className = this.colorMode;
    setLocalStorage(this.colorMode);
  }
}

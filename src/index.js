import { getLocalStorage, setLocalStorage } from '../api/index.js';
import App from './components/App.js';
import { KEY } from './constants/index.js';

import { customQuerySelector } from './utils/index.js';

const $app = new App(customQuerySelector('#root'));

document.body.className = getLocalStorage(KEY.COLOR_MODE) || 'light';

export const toggleDarkMode = () => {
  const colorMode = document.body.className === 'dark' ? 'light' : 'dark';
  setLocalStorage(KEY.COLOR_MODE, colorMode);
  document.body.className = colorMode;
  $app.render();
};

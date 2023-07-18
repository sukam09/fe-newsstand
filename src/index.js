import { setLocalStorage } from '../api/index.js';
import App from './components/App.js';
import { KEY } from './constants/index.js';

import { customQuerySelector } from './utils/index.js';

const $app = new App(customQuerySelector('#root'));

export const toggleDarkMode = () => {
  const colorMode = document.body.className === 'dark' ? 'light' : 'dark';
  setLocalStorage(KEY.COLOR_MODE, colorMode);
  document.body.className = colorMode;
  $app.render();
};

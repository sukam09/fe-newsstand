import App from './components/App.js';
import { customQuerySelector } from './utils/index.js';

const $app = new App(customQuerySelector('#root'));

export const toggleDarkMode = () => {
  document.body.className = document.body.className === 'dark' ? 'light' : 'dark';
  $app.render();
};

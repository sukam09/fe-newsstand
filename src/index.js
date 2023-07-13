import App from './components/App.js';

const $app = new App(document.getElementById('root'));

export const toggleDarkMode = () => {
  document.body.className = document.body.className === 'dark' ? 'light' : 'dark';
  $app.render();
};

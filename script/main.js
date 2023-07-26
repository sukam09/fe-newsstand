import headerApp from './apps/header/headerApp.js';
import headlineApp from './apps/headline/headlineApp.js';
import mediaApp from './apps/media/mediaApp.js';
import themeModeApp from './apps/themeMode/themeModeApp.js';
import Store from './core/Store.js';
import setEventManager from './core/EventManager.js';

(() => {
  const themeStore = new Store({ theme: 'light' });

  setEventManager();
  headerApp();
  headlineApp();
  mediaApp(themeStore);
  themeModeApp(themeStore);
})();

import headerApp from './apps/header/headerApp.js';
import headlineApp from './apps/headline/headlineApp.js';
import mediaApp from './apps/media/mediaApp.js';
import themeModeApp from './apps/themeMode/themeModeApp.js';
import Store from './core/Store.js';

(() => {
  const themeStore = new Store({
    theme: 'light',
  });

  headerApp();
  headlineApp();
  mediaApp(themeStore, 'all', 'grid');
  themeModeApp(themeStore);
})();

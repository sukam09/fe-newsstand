import headerApp from './apps/header/headerApp.js';
import headlineApp from './apps/headline/headlineApp.js';
import mediaApp from './apps/media/mediaApp.js';
import themeModeApp from './apps/themeMode/themeModeApp.js';

(() => {
  headerApp();
  headlineApp();
  mediaApp('all', 'grid');
  themeModeApp();
})();

import { initNewsStandHeader } from './components/news-stand-header.js';
import { initLightDarkMode } from './components/light-dark-mode.js';
import { initLatestNews } from './components/latest-news.js';
import { setPressHeader } from './components/press-header.js';

let isGridMode = true;

(function init() {
  initNewsStandHeader();

  initLatestNews(); // 수정중

  setPressHeader();

  initLightDarkMode();
})();

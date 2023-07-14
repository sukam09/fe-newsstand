import { initNewsStandHeader } from './components/news-stand-header.js';
import { initLightDarkMode } from './components/light-dark-mode.js';
import { setLatestNews } from './components/latest-news.js';
import { setPressHeader } from './components/press-header.js';

let isLightMode = true;
let isGridMode = true;

(function init() {
  initNewsStandHeader();
  setLatestNews();
  setPressHeader(isLightMode);

  initLightDarkMode();
})();

// css 파일 분리

import { initNewsStandHeader } from './components/news-stand-header.js';
import { initLightDarkMode } from './components/light-dark-mode.js';
import { setLatestNews } from './components/latest-news.js';
import { setPressHeader } from './components/press-header.js';

let isGridMode = true;

(function init() {
  initNewsStandHeader();
  setLatestNews();
  setPressHeader();

  initLightDarkMode(); // 수정중
})();

// css 파일 분리

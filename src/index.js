import { setNewsStandHeader } from './components/news-stand-header.js';
import { setLatestNews } from './components/latest-news.js';
import { setPressHeader } from './components/press-header.js';

let isLightMode = true;
let isGridMode = true;

(function init() {
  setNewsStandHeader();
  setLatestNews();
  setPressHeader(isLightMode);
})();

// css 파일 분리

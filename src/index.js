import { setNewsStandHeader } from './components/news-stand-header.js';
import { setLatestNews } from './components/latest-news.js';
import { setPressGrid } from './components/press-grid.js';

let isLightMode = true;

(function init() {
  setNewsStandHeader();
  setLatestNews();
  setPressGrid(isLightMode);
})();

import newsStandHeaderStore from './components/news-stand-header.js';
import { initLatestNews } from './components/latest-news.js';
import { initPressHeader } from './components/press-header.js';

(function init() {
  newsStandHeaderStore.initHeader();
  initLatestNews();
  initPressHeader(); // 수정중
})();

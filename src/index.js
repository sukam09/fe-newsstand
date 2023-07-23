import newsStandHeaderStore from './components/news-stand-header.js';
import latestNewsSubject from './components/news-stand-rolling/main.js';
import { initPressHeader } from './components/press-header.js';

(function init() {
  newsStandHeaderStore.initHeader();
  latestNewsSubject.initLatestNews();
  // initLatestNews();
  initPressHeader(); // 수정중
})();

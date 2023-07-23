import NewsStandHeaderSubject from './components/news-stand-header/main.js';
import latestNewsSubject from './components/news-stand-rolling/main.js';
import { initPressHeader } from './components/press-header.js';

(function init() {
  NewsStandHeaderSubject.initHeader();
  latestNewsSubject.initNews();
  // initLatestNews();
  initPressHeader(); // 수정중
})();

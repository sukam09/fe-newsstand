import newsStandHeader from './components/news-stand-header.js';
import latestNews from './components/news-stand-latest.js';
import pressHeaderStore from './components/press-header.js';

(function init() {
  newsStandHeader.initHeader();
  latestNews.initNews();

  // initPressHeader(); // 수정중
  pressHeaderStore.initPress();

  // lightDarkMode.initMode();
})();

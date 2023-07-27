import newsStandHeader from './components/news-stand-header/news-stand-header.js';
import latestNews from './components/news-stand-latest/news-stand-latest.js';
import pressHeaderStore from './components/press-header/press-header.js';

(function init() {
  newsStandHeader.initHeader();
  latestNews.initNews();
  pressHeaderStore.initPress();
})();

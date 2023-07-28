import newsStandHeader from './src/components/news-stand-header/news-stand-header.js';
import latestNews from './src/components/news-stand-latest/news-stand-latest.js';
import pressHeaderStore from './src/components/press-header/press-header.js';

(function init() {
  newsStandHeader.initHeader();
  latestNews.initNews();
  pressHeaderStore.initPress();
})();

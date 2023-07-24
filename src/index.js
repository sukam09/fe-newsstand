import newsStandHeader from './components/news-stand-header.js';

import latestNewsSubject from './components/news-stand-rolling/main.js'; //
import pressHeaderStore from './components/press-header.js';

(function init() {
  newsStandHeader.initHeader();

  //
  latestNewsSubject.initNews();

  // initPressHeader(); // 수정중
  pressHeaderStore.initPress();

  // lightDarkMode.initMode();
})();

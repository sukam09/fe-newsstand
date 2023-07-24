import NewsStandHeaderSubject from './components/news-stand-header/main.js';
import latestNewsSubject from './components/news-stand-rolling/main.js';
import lightDarkMode from './components/light-dark-mode/main.js';
import { initPressHeader } from './components/press-header.js';
import pressHeaderStore from './components/press-header/subject.js';

(function init() {
  NewsStandHeaderSubject.initHeader();
  latestNewsSubject.initNews();

  //
  // initPressHeader(); // 수정중
  pressHeaderStore.initPress();

  // lightDarkMode.initMode();
})();

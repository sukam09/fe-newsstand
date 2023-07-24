import Component from './core/Component.js';

import AllNews from './allNews/index.js';
import Header from './header/index.js';
import LatestNews from './latestNews/index.js';

import { customQuerySelector } from '../utils/index.js';
import { pressStore } from '../../store/index.js';

export default class App extends Component {
  setup() {
    pressStore.subscribe(this);
  }
  template() {
    return `<header class='header'></header>
            <div class='latest-main-news'></div>
            <section class='all-news'></section>
            <div class='alert-modal'></div>
            `;
  }
  mounted() {
    if (pressStore.isLoading) return;
    new Header(customQuerySelector('.header', this.$target));
    new LatestNews(customQuerySelector('.latest-main-news', this.$target));
    new AllNews(customQuerySelector('.all-news', this.$target));
  }
}

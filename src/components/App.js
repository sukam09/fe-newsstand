//components
import Component from './core/Component.js';
import Header from './header/index.js';
import AllNews from './all-news/index.js';
import LatestNews from './latest-news/index.js';

//utils
import { customQuerySelector } from '../utils/index.js';

//store
import { pressStore } from '../../store/index.js';

export default class App extends Component {
  setup() {
    pressStore.subscribe(this);
  }
  template() {
    return `<header class='header'></header>
            <div class='latest-main-news'></div>
            <section class='all-news'></section>
            `;
  }
  mounted() {
    if (pressStore.isLoading) return;
    new Header(customQuerySelector('.header', this.$target));
    new LatestNews(customQuerySelector('.latest-main-news', this.$target));
    new AllNews(customQuerySelector('.all-news', this.$target));
  }
}

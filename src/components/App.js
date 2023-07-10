import Component from './Component.js';
import AllNews from './allNews/index.js';
import Header from './header/index.js';
import LatestNews from './latestNews/index.js';

export default class App extends Component {
  template() {
    return `<header class='header'></header>
            <div class='latest-main-news'></div>
            <section class='all-news'></section>
            `;
  }
  mounted() {
    new Header(this.$target.querySelector('.header'));
    new LatestNews(this.$target.querySelector('.latest-main-news'));
    new AllNews(this.$target.querySelector('.all-news'));

  }
}

import Component from "./core/Component.js";
import Header from "./Components/Header/Header.js";
import Headline from "./Components/Headline/Headline.js";
import NavBar from "./Components/NavBar/NavBar.js";
import NewsGrid from "./Components/NewsGrid/NewsGrid.js";
import NewsList from "./Components/NewsList/NewsList.js";
import SubscribeStore from "./Store/SubscribeStore.js";

export default class App extends Component {
  setup() {
    this.SubscribeStore = new SubscribeStore();
  }

  template() {
    return `
      <div id="app">
        <header class="header"></header>
        <section class="headline"></section>
        <main class="news">
          <nav class="news-navbar"></nav>
          <section class="news-section-grid"></section>
          <section class="news-section-list hidden"></section>
        </main>
      </div>
    `;
  }

  mounted() {
    new Header(document.querySelector(".header"));
    new Headline(document.querySelector(".headline"));
    new NavBar(document.querySelector(".news-navbar"));
    new NewsGrid(document.querySelector(".news-section-grid"), {
      SubscribeStore: this.SubscribeStore,
    });
    new NewsList(document.querySelector(".news-section-list"), {
      SubscribeStore: this.SubscribeStore,
    });
  }
}

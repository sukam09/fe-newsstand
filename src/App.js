import Component from "./core/Component.js";
import Header from "./Components/Header/Header.js";
import Headline from "./Components/Headline/Headline.js";
import News from "./Components/News/News.js";

export default class App extends Component {
  template() {
    return `
      <div id="app">
        <header class="header"></header>
        <section class="headline"></section>
        <main class="news"></main>
      </div>
    `;
  }

  mounted() {
    new Header(document.querySelector(".header"));
    new Headline(document.querySelector(".headline"));
    new News(document.querySelector(".news"));
  }
}

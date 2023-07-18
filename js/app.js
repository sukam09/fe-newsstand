/*
import { Header } from "./Components/Header/header.js";
import { Headline } from "./Components/Headline/headline.js";
import { News } from "./Components/News/news.js";

export const App = () => `
  <div id="app">
    ${Header()}
    ${Headline()}
    ${News()}
  </div>
`;
*/

import Component from "./core/Component.js";
import Header from "./Components/Header.js";
import Headline from "./Components/Headline.js";
import NavBar from "./Components/NavBar.js";
import NewsGrid from "./Components/NewsGrid.js";
import NewsList from "./Components/NewsList.js";

export default class App extends Component {
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
    new NewsGrid(document.querySelector(".news-section-grid"));
    new NewsList(document.querySelector(".news-section-list"));
  }
}

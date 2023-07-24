import { constants } from "../../Data/constants.js";
import SubscribeStore from "../../Store/SubscribeStore.js";
import ViewStore from "../../Store/ViewStore.js";
import Component from "../../core/Component.js";
import NavBar from "../NavBar/NavBar.js";
import NewsGrid from "../NewsGrid/NewsGrid.js";
import NewsList from "../NewsList/NewsList.js";

export default class News extends Component {
  setup() {
    this.progressTimer = [];
    this.SubscribeStore = new SubscribeStore();
    this.ViewStore = new ViewStore();
  }

  setEvent() {
    this.ViewStore.subscribe(() => this.render());
  }

  template() {
    return `
      <nav class="news-navbar"></nav>
      ${
        this.ViewStore.showNewsType === constants.SHOW_GRID
          ? `<section class="news-section-grid"></section>`
          : `<section class="news-section-list"></section>`
      }
    `;
  }

  mounted() {
    new NavBar(document.querySelector(".news-navbar"), {
      ViewStore: this.ViewStore,
    });
    if (this.ViewStore.showNewsType === constants.SHOW_GRID) {
      new NewsGrid(document.querySelector(".news-section-grid"), {
        SubscribeStore: this.SubscribeStore,
      });
    }
    if (this.ViewStore.showNewsType === constants.SHOW_LIST) {
      new NewsList(document.querySelector(".news-section-list"), {
        SubscribeStore: this.SubscribeStore,
        progressTimer: this.progressTimer,
        setProgressTimer: this.setProgressTimer,
      });
    }
  }

  setProgressTimer(timer) {
    if (timer) this.progressTimer.push(timer);

    if (this.progressTimer.length > 1) {
      const prevTimer = this.progressTimer.shift();
      clearInterval(prevTimer);
    }
  }
}

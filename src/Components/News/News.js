import { constants } from "../../Data/constants.js";
import SubscribeStore from "../../Store/SubscribeStore.js";
import ViewStore from "../../Store/ViewStore.js";
import Component from "../../core/Component.js";
import MyNewsGrid from "../MyNewsGrid/MyNewsGrid.js";
import MyNewsList from "../MyNewsList/MyNewsList.js";
import NavBar from "../NavBar/NavBar.js";
import NewsGrid from "../NewsGrid/NewsGrid.js";
import NewsList from "../NewsList/NewsList.js";

export default class News extends Component {
  setup() {
    this.Component = {
      grid: null,
      list: null,
    };
    this.progressTimer = [];
    this.progressTimerMy = [];
    this.SubscribeStore = new SubscribeStore();
    this.ViewStore = new ViewStore();
  }

  setEvent() {
    this.ViewStore.subscribe(() => this.render());
  }

  template() {
    return `
      <nav class="news-navbar"></nav>
      <section class="news-section-grid ${
        !this.isViewNewsType(constants.SHOW_ALL_NEWS, constants.SHOW_GRID) &&
        "hidden"
      }"></section>
      <section class="news-section-list ${
        !this.isViewNewsType(constants.SHOW_ALL_NEWS, constants.SHOW_LIST) &&
        "hidden"
      }"></section>
      <section class="news-section-my-list ${
        !this.isViewNewsType(constants.SHOW_MY_NEWS, constants.SHOW_LIST) &&
        "hidden"
      }"></section>
      <section class="news-section-my-grid ${
        !this.isViewNewsType(constants.SHOW_MY_NEWS, constants.SHOW_GRID) &&
        "hidden"
      }"></section>
    `;
  }

  mounted() {
    this.clearProgressTimer();

    new NavBar(this.$target.querySelector(".news-navbar"), {
      ViewStore: this.ViewStore,
    });

    new NewsGrid(this.$target.querySelector(".news-section-grid"), {
      SubscribeStore: this.SubscribeStore,
    });

    new NewsList(this.$target.querySelector(".news-section-list"), {
      SubscribeStore: this.SubscribeStore,
      progressTimer: this.progressTimer,
      setProgressTimer: this.setProgressTimer,
    });

    new MyNewsList(this.$target.querySelector(".news-section-my-list"), {
      SubscribeStore: this.SubscribeStore,
      progressTimerMy: this.progressTimerMy,
      setProgressTimerMy: this.setProgressTimerMy,
      clearProgressTimer: this.clearProgressTimer,
    });

    new MyNewsGrid(this.$target.querySelector(".news-section-my-grid"), {
      SubscribeStore: this.SubscribeStore,
    });
  }

  setProgressTimer(timer) {
    if (timer) this.progressTimer.push(timer);

    if (this.progressTimer.length > 1) {
      const prevTimer = this.progressTimer.shift();
      clearInterval(prevTimer);
    }
  }

  setProgressTimerMy(timer) {
    if (timer) this.progressTimerMy.push(timer);

    if (this.progressTimerMy.length > 1) {
      const prevTimer = this.progressTimerMy.shift();
      clearInterval(prevTimer);
    }
  }

  clearProgressTimer() {
    if (this.progressTimer) {
      this.progressTimer.forEach((timer) => clearInterval(timer));
      this.progressTimer = [];
    }
    if (this.progressTimerMy) {
      this.progressTimerMy.forEach((timer) => clearInterval(timer));
      this.progressTimerMy = [];
    }
  }

  isViewNewsType(categoryType, viewType) {
    return (
      this.ViewStore.newsCategory === categoryType &&
      this.ViewStore.newsView === viewType
    );
  }
}

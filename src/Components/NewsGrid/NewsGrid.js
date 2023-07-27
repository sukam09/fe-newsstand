import Component from "../../core/Component.js";
import { constants } from "../../Data/constants.js";
import NewsGridItems from "./NewsGridItems.js";

export default class NewsGrid extends Component {
  setup() {
    this.$state = {
      $leftButton: undefined,
      $rightButton: undefined,
      page: 0,
      pressNewsData: [],
    };

    this.fetchNewsData();
  }

  setEvent() {
    this.$props.ModeStore.subscribe(() => this.render());
  }

  template() {
    return `
      <ul class="newspaper__list"></ul>
      <div class="left-button_content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="42"
          viewBox="0 0 26 42"
          fill="none"
        >
          <path d="M25 1L1 21L25 41" stroke="#6E8091" />
        </svg>
      </div>
      <div class="right-button_content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="42"
          viewBox="0 0 26 42"
          fill="none"
        >
          <path d="M1 41L25 21L1 1" stroke="#6E8091" />
        </svg>
      </div>
    `;
  }

  mounted() {
    this.setArrowButton();
    this.renderNewspaper();
    this.setGridPageButton();
  }

  renderNewspaper() {
    const nowPageIndexArr = this.$state.pressNewsData.slice(
      this.$state.page * constants.ONE_PAGE_NEWSPAPER,
      (this.$state.page + 1) * constants.ONE_PAGE_NEWSPAPER
    );

    new NewsGridItems(this.$target.querySelector(".newspaper__list"), {
      nowPageIndexArr: nowPageIndexArr,
      mode: this.$props.ModeStore.mode,
      SubscribeStore: this.$props.SubscribeStore,
    });

    this.setDisplayButton();
  }

  setDisplayButton() {
    this.$state.$leftButton.style.display =
      this.$state.page === constants.MIN_PAGE ? "none" : "block";
    this.$state.$rightButton.style.display =
      this.$state.page === constants.MAX_PAGE ? "none" : "block";
  }

  movePage(amount) {
    this.setState({ page: this.$state.page + amount }, false);
    this.renderNewspaper();
  }

  setGridPageButton() {
    this.$state.$leftButton.addEventListener("click", () => this.movePage(-1));
    this.$state.$rightButton.addEventListener("click", () => this.movePage(1));
  }

  setArrowButton() {
    const $leftButton = this.$target.querySelector(".left-button_content");
    const $rightButton = this.$target.querySelector(".right-button_content");

    this.setState(
      { $leftButton: $leftButton, $rightButton: $rightButton },
      false
    );
  }

  async fetchNewsData() {
    const pressNewsData = await fetch("./src/Data/pressNews.json").then(
      (res) => {
        return res.json();
      }
    );

    const randomNewsData = pressNewsData.news.sort(() => Math.random() - 0.5);

    this.setState({ pressNewsData: randomNewsData });
  }
}

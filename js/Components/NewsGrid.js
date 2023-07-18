import Component from "../core/Component.js";
import { constants } from "../Data/constants.js";
import newspaperData from "../Data/newspaper.js";

export default class NewsGrid extends Component {
  setup() {
    this.$state = {
      newspaperRandom: [],
      $leftButton: undefined,
      $rightButton: undefined,
      page: 0,
    };

    const newspaperRandom = [...newspaperData].sort(() => Math.random() - 0.5);
    this.setState({ newspaperRandom: newspaperRandom });
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
    const $leftButton = document.querySelector(
      ".news-section-grid .left-button_content"
    );
    const $rightButton = document.querySelector(
      ".news-section-grid .right-button_content"
    );

    this.setState(
      { $leftButton: $leftButton, $rightButton: $rightButton },
      false
    );

    this.renderNewspaper(constants.LIGHT_MODE);
    this.setGridPageButton();
  }

  createNewspaperItem(item, mode) {
    return `
      <li class="newspaper__item">
        <img src=${
          mode === constants.LIGHT_MODE ? item.lightSrc : item.darkSrc
        } alt=${item.name} />
      </li>
    `;
  }

  createNewspaperList(mode) {
    const nowPageIndexArr = this.$state.newspaperRandom.slice(
      this.$state.page * constants.ONE_PAGE_NEWSPAPER,
      (this.$state.page + 1) * constants.ONE_PAGE_NEWSPAPER
    );
    const liArr = nowPageIndexArr.map((item) =>
      this.createNewspaperItem(item, mode)
    );
    const newspaperList = liArr.reduce(
      (news, currentIndex) => news + currentIndex
    );
    return newspaperList;
  }

  renderNewspaper(mode) {
    const $newspaperList = document.querySelector(".newspaper__list");
    $newspaperList.innerHTML = this.createNewspaperList(mode);
  }

  setDisplayButton() {
    this.$state.$leftButton.style.display =
      this.$state.page === constants.MIN_PAGE ? "none" : "block";
    this.$state.$rightButton.style.display =
      this.$state.page === constants.MAX_PAGE ? "none" : "block";
  }

  renderContent() {
    this.renderNewspaper(constants.LIGHT_MODE);
    this.setDisplayButton();
  }

  movePage(amount) {
    this.setState({ page: this.$state.page + amount }, false);
    this.renderContent();
  }

  setGridPageButton() {
    this.$state.$leftButton.addEventListener("click", () => this.movePage(-1));
    this.$state.$rightButton.addEventListener("click", () => this.movePage(1));
  }
}

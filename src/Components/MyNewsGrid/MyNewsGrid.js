import Component from "../../core/Component.js";
import { constants } from "../../Data/constants.js";
import NewsGridItems from "../NewsGrid/NewsGridItems.js";

export default class MyNewsGrid extends Component {
  setup() {
    this.$state = {
      $leftButton: undefined,
      $rightButton: undefined,
      page: 0,
      mode: constants.LIGHT_MODE,
    };
  }

  setEvent() {
    this.$props.SubscribeStore.subscribe(() => this.render());
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
    const $leftButton = this.$target.querySelector(".left-button_content");
    const $rightButton = this.$target.querySelector(".right-button_content");

    this.setState(
      { $leftButton: $leftButton, $rightButton: $rightButton },
      false
    );

    this.renderNewspaper();
    this.setGridPageButton();
  }

  renderNewspaper() {
    const nowPageIndexArr = this.$props.SubscribeStore.subscribeList.slice(
      this.$state.page * constants.ONE_PAGE_NEWSPAPER,
      (this.$state.page + 1) * constants.ONE_PAGE_NEWSPAPER
    );

    new NewsGridItems(this.$target.querySelector(".newspaper__list"), {
      nowPageIndexArr: nowPageIndexArr,
      mode: this.$state.mode,
      SubscribeStore: this.$props.SubscribeStore,
    });

    this.setDisplayButton();
  }

  setDisplayButton() {
    this.$state.$leftButton.style.display =
      this.$state.page === constants.MIN_PAGE ? "none" : "block";
    this.$state.$rightButton.style.display =
      this.$state.page ===
      Math.floor(
        this.$props.SubscribeStore.subscribeList.length /
          constants.ONE_PAGE_NEWSPAPER
      )
        ? "none"
        : "block";
  }

  movePage(amount) {
    this.setState({ page: this.$state.page + amount }, false);
    this.renderNewspaper();
  }

  setGridPageButton() {
    this.$state.$leftButton.addEventListener("click", () => this.movePage(-1));
    this.$state.$rightButton.addEventListener("click", () => this.movePage(1));
  }
}

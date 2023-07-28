import Component from "../../core/Component.js";
import { constants } from "../../Data/constants.js";
import NewsGridItems from "../NewsGrid/NewsGridItems.js";

export default class MyNewsGrid extends Component {
  setup() {
    this.$state = {
      $leftButton: undefined,
      $rightButton: undefined,
      page: 0,
    };
  }

  setEvent() {
    this.$props.SubscribeStore.subscribe(() => this.render());
    this.$props.ModeStore.subscribe(() => this.render());
  }

  template() {
    return `
      <ul class="newspaper__list"></ul>

      <div class="left-button_content">
        <img src="./assets/icons/LeftPage.svg" alt="LeftPage" />
      </div>
      <div class="right-button_content">
        <img src="./assets/icons/RightPage.svg" alt="RightPage" />
      </div>

      <div class="subscribe-alert hidden">
        <div class="subscribe-alert__notice">
          <div>
            <span class="subscribe-alert__notice__name"></span>을(를)<br />
            구독해지하시겠습니까?
          </div>
        </div>
        <div class="subscribe-alert__button">
          <div class="subscribe-alert__button__YES">예, 해지합니다</div>
          <div class="subscribe-alert__button__NO">아니오</div>
        </div>
      </div>
    `;
  }

  mounted() {
    this.setArrowButton();
    this.renderNewspaper();
    this.setGridPageButton();
    this.setAlertEvent();
  }

  renderNewspaper() {
    const nowPageIndexArr = this.$props.SubscribeStore.subscribeList.slice(
      this.$state.page * constants.ONE_PAGE_NEWSPAPER,
      (this.$state.page + 1) * constants.ONE_PAGE_NEWSPAPER
    );

    new NewsGridItems(this.$target.querySelector(".newspaper__list"), {
      nowPageIndexArr: nowPageIndexArr,
      mode: this.$props.ModeStore.mode,
      SubscribeStore: this.$props.SubscribeStore,
      subscribeAlert: this.$target.querySelector(".subscribe-alert"),
      subscribeAlertName: this.$target.querySelector(
        ".subscribe-alert__notice__name"
      ),
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

  setArrowButton() {
    const $leftButton = this.$target.querySelector(".left-button_content");
    const $rightButton = this.$target.querySelector(".right-button_content");

    this.setState(
      { $leftButton: $leftButton, $rightButton: $rightButton },
      false
    );
  }

  setGridPageButton() {
    this.$state.$leftButton.addEventListener("click", () => this.movePage(-1));
    this.$state.$rightButton.addEventListener("click", () => this.movePage(1));
  }

  setAlertEvent() {
    const $alertYES = this.$target.querySelector(
      ".subscribe-alert__button__YES"
    );
    const $alertNO = this.$target.querySelector(".subscribe-alert__button__NO");

    $alertNO.addEventListener("click", () =>
      this.$target.querySelector(".subscribe-alert").classList.add("hidden")
    );
    $alertYES.addEventListener("click", () => {
      this.$props.SubscribeStore.unSubscribeNewsByName(
        this.$target.querySelector(".subscribe-alert__notice__name").innerHTML
      );
    });
  }
}

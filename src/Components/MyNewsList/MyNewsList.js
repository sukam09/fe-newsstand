import { constants } from "../../Data/constants.js";
import Component from "../../core/Component.js";
import PressNews from "./PressNews.js";

export default class MyNewsList extends Component {
  setup() {
    this.currentPercentage = 0;
    this.tabLiteral = "";
    this.subscribeList = this.$props.SubscribeStore.subscribeList;
    this.nowIndex = this.subscribeList.length - 1;
  }

  setEvent() {
    this.$props.SubscribeStore.subscribe(() => this.render());
  }

  template() {
    return `
      <ul class="news-list__field-tab"></ul>
      <div class="news-list__press-news"></div>

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

      <div class="news-list__snack-bar news-list__snack-bar__noData hidden">
        내가 구독한 언론사가 없습니다.
      </div>
    `;
  }

  mounted() {
    if (!this.$props.SubscribeStore.subscribeList.length) {
      this.$target
        .querySelector(".news-list__snack-bar__noData")
        .classList.remove("hidden");
      return;
    }

    this.currentPercentage = 0;
    this.tabLiteral = "";
    this.subscribeList = this.$props.SubscribeStore.subscribeList;
    this.nowIndex = this.subscribeList.length - 1;

    this.initialTag();
    this.startProgress();
    this.setFieldTab();
    this.renderPressNews(this.nowIndex);
    this.setListPageButton();
  }

  initialTag() {
    const initialTag = this.subscribeList.reduce((acc, item, idx) => {
      if (this.subscribeList.length - 1 === idx) {
        return (
          acc +
          `<li class="news-list__field-tab__progress">
            <span>${item.name}</span>
            <img src="./assets/icons/RightArrow.svg" alt="rightArrow" />
          </li>`
        );
      } else {
        return (
          acc + `<li class="news-list__field-tab__general">${item.name}</li>`
        );
      }
    }, "");

    this.$target.querySelector(".news-list__field-tab").innerHTML = initialTag;
  }

  makeTag(event, newspaperName) {
    if (event.target.innerHTML.includes(newspaperName)) {
      this.tabLiteral += `
        <li class="news-list__field-tab__progress">
          <span>${newspaperName}</span>
          <img src="./assets/icons/RightArrow.svg" alt="rightArrow" />
        </li>
      `;
    } else {
      this.tabLiteral += `<li class="news-list__field-tab__general">${newspaperName}</li>`;
    }
  }

  setFieldTab() {
    this.tabLiteral = "";
    const $fieldTabList = this.$target.querySelectorAll(
      ".news-list__field-tab > li"
    );
    [...$fieldTabList].forEach((item, idx) => {
      item.addEventListener("click", (event) => {
        this.subscribeList.forEach((item) => this.makeTag(event, item.name));
        this.$target.querySelector(".news-list__field-tab").innerHTML =
          this.tabLiteral;

        this.nowIndex = idx;
        this.setFieldTab();
        this.startProgress();
        this.clearProgress();
        this.renderPressNews(this.nowIndex);
      });
    });
  }

  startProgress() {
    const $progress = this.$target.querySelector(
      ".news-list__field-tab__progress"
    );
    const increment = 100 / (constants.PROGRESS_DURATION_MS / 16); // 16ms 마다 업데이트

    const progressTimer = setInterval(() => {
      this.currentPercentage += increment;

      if (this.currentPercentage >= 100) {
        if (!this.$props.SubscribeStore.subscribeList.length) {
          this.$props.clearProgressTimer();
          return;
        }
        this.movePageRight();
        this.clearProgress();
      }

      $progress.style.background = `linear-gradient(to right, #4362d0 ${this.currentPercentage}%, #7890e7 ${this.currentPercentage}%)`;
    }, 16); // 16ms 마다 업데이트

    this.$props.setProgressTimerMy(progressTimer);
  }

  clearProgress = () => {
    this.currentPercentage = 0;
  };

  renderPressNews(idx) {
    new PressNews(this.$target.querySelector(".news-list__press-news"), {
      nowNewsData: this.subscribeList[idx],
      SubscribeStore: this.$props.SubscribeStore,
    });
  }

  movePageRight() {
    const $fieldTabList = this.$target.querySelectorAll(
      ".news-list__field-tab > li"
    );

    $fieldTabList[
      (++this.nowIndex + this.subscribeList.length) % this.subscribeList.length //-------------------------------------
    ].click();
  }

  movePageLeft() {
    const $fieldTabList = this.$target.querySelectorAll(
      ".news-list__field-tab > li"
    );

    $fieldTabList[
      (--this.nowIndex + this.subscribeList.length) % this.subscribeList.length
    ].click();
  }

  setListPageButton() {
    const $leftButton = this.$target.querySelector(".left-button_content");
    const $rightButton = this.$target.querySelector(".right-button_content");

    $leftButton.addEventListener("click", () => this.movePageLeft());
    $rightButton.addEventListener("click", () => this.movePageRight());
  }
}

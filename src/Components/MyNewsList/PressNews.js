import { constants } from "../../Data/constants.js";
import Component from "../../core/Component.js";

export default class PressNews extends Component {
  setEvent() {
    this.$props.ModeStore.subscribe(() => this.render());
  }

  template() {
    return `
      <div class="news-list__press-news__info">
        <img
          src=${
            this.$props.ModeStore.mode === constants.LIGHT_MODE
              ? this.$props.nowNewsData.path
              : this.$props.nowNewsData.path_dark
          }
          alt="Brandmark"
          height="24"
          class="news-list__press-news__info__brandmark"
        />
        <span class="news-list__press-news__info__date">${
          this.$props.nowNewsData.edit_date
        } 편집</span>
        ${
          this.$props.SubscribeStore.subscribeList.filter(
            (elem) => elem.id === this.$props.nowNewsData.id
          ).length === 0
            ? `<img class="news-list__press-news__subscribe subscribeButton" src="./assets/icons/SubscribeButton_List.svg" alt="Button" />`
            : `<img class="news-list__press-news__subscribe unSubscribeButton" src="./assets/icons/UnSubscribeButton_List.svg" alt="Button" />`
        }
      </div>
      <div class="news-list__press-news__news">
        <div class="news-list__press-news__main">
          <div class="news-list__press-news__thumbnail">
            <img
              src=${this.$props.nowNewsData.main_img_src}
              alt="Thumbnail"
              class="news-list__press-news__thumbnail-image"
            />
          </div>
          <span class="news-list__press-news__title">${
            this.$props.nowNewsData.main_title
          }</span>
        </div>
        <div class="news-list__press-news__sub">
        ${this.$props.nowNewsData.sub_title.reduce((acc, title) => {
          return (
            acc +
            `<span class="news-list__press-news__subtitle">${title}</span>`
          );
        }, "")}
          <span class="news-list__press-news__subcaption">${
            this.$props.nowNewsData.name
          } 언론사에서 직접 편집한 뉴스입니다.</span>
        </div>
      </div>
    `;
  }

  mounted() {
    this.setSubscribeButtonEvent();
  }

  setSubscribeButtonEvent() {
    const $subscribeButton = this.$target.querySelector(
      ".news-list__press-news__subscribe"
    );

    $subscribeButton.addEventListener("click", () => {
      if ($subscribeButton.classList.contains("subscribeButton")) {
        this.$props.SubscribeStore.subscribeNews(this.$props.nowNewsData);
      } else {
        this.$props.subscribeAlertName.innerHTML = this.$props.nowNewsData.name;
        this.$props.subscribeAlert.classList.remove("hidden");
      }
    });
  }
}

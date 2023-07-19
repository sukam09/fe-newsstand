import Component from "../core/Component.js";

export default class PressNews extends Component {
  setup() {
    this.$state = {
      nowNews: this.$props.nowCategoryNewsData[this.$props.page - 1],
    };
  }

  template() {
    return `
      <div class="news-list__press-news__info">
        <img
          src=${this.$state.nowNews.logo}
          alt="Brandmark"
          height="24"
          class="news-list__press-news__info__brandmark"
        />
        <span class="news-list__press-news__info__date">${
          this.$state.nowNews.editTime
        } 편집</span>
        <img src="./assets/icons/SubscribeButton.svg" alt="Button" />
      </div>
      <div class="news-list__press-news__news">
        <div class="news-list__press-news__main">
          <div class="news-list__press-news__thumbnail">
            <img
              src="./assets/images/Thumbnail.png"
              alt="Thumbnail"
              class="news-list__press-news__thumbnail-image"
            />
          </div>
          <span class="news-list__press-news__title">${
            this.$state.nowNews.mainArticle.title
          }</span>
        </div>
        <div class="news-list__press-news__sub">
        ${this.$state.nowNews.subArticles
          .map(
            (item) =>
              `<span class="news-list__press-news__subtitle">${item.title}</span>`
          )
          .join("")}
          <span class="news-list__press-news__subcaption">${
            this.$state.nowNews.name
          } 언론사에서 직접 편집한 뉴스입니다.</span>
        </div>
      </div>
    `;
  }
}

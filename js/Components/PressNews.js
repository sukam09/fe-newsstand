import Component from "../core/Component.js";

export default class PressNews extends Component {
  setup() {
    console.log(this.$props);
  }
  template() {
    return `
      <div class="news-list__press-news__info">
        <img
          src=${this.$props.nowCategoryNewsData[this.$props.page - 1].logo}
          alt="Brandmark"
          height="24"
          class="news-list__press-news__info__brandmark"
        />
        <span class="news-list__press-news__info__date">${
          this.$props.nowCategoryNewsData[this.$props.page - 1].editTime
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
            this.$props.nowCategoryNewsData[this.$props.page - 1].mainArticle
              .title
          }</span>
        </div>
        <div class="news-list__press-news__sub">
        ${this.$props.nowCategoryNewsData[this.$props.page - 1].subArticles
          .map(
            (item) =>
              `<span class="news-list__press-news__subtitle">${item.title}</span>`
          )
          .join("")}
          <span class="news-list__press-news__subcaption">${
            this.$props.nowCategoryNewsData[this.$props.page - 1].name
          } 언론사에서 직접 편집한 뉴스입니다.</span>
        </div>
      </div>
    `;
  }
}

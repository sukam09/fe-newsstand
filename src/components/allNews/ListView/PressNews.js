import { createSubscribeButton } from "../SubscribeButton.js";
import Logo from "../../common/Logo.js";

export default class PressNews {
  constructor(pressData) {
    this.$wrapper = document.createElement("main");
    this.$wrapper.className = "press-news";
    this.page = 0;

    this.pressData = pressData;
    this.mainNews = this.pressData[this.page];

    this.render();
  }

  render() {
    this.$wrapper.replaceChildren();

    const nameTemplate = `
      <div class="press-info">
        ${this.createPressLogo(this.mainNews.logo).outerHTML}
        <span class="pressInfo-date">${this.mainNews.editTime} 편집</span>
        ${createSubscribeButton().outerHTML}
      </div>
    `;

    const mainTemplate = `
      <div class="press-main">
        <div class="press-imageInfo">
          <img class="pressImage" src=${this.mainNews.mainArticle.thumbnail} />
          <span class="pressImage-title">${
            this.mainNews.mainArticle.title
          }</span>
        </div>
        <div class="press-titles">
          ${this.mainNews.subArticles
            .map((title) => `<p>${title.title}</p>`)
            .join("")}
          <p class="pressTitles-subText">${
            this.mainNews.name
          } 언론사에서 직접 편집한 뉴스입니다.</p>
        </div>
      </div>
    `;

    this.$wrapper.innerHTML += nameTemplate;
    this.$wrapper.innerHTML += mainTemplate;
  }

  /** 언론사 로고 요소 생성 */
  createPressLogo(name) {
    const $logoImg = new Logo({ name });
    $logoImg.classList.add("pressInfo-logo");
    return $logoImg;
  }

  goNextPage(page) {
    this.page = page;
    this.mainNews = this.pressData[this.page];
    // console.log(this.mainNews);
    this.render();
  }
}

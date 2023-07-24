import Logo from "../../common/Logo.js";
import { CATEGORIES_COUNT, categoriesObj } from "../../../constants/index.js";
import categories from "../../../constants/categories.js";
import SubButton from "../SubButton.js";
import { subscribedPress } from "../../../core/store.js";
import UnsubButton from "../UnsubButton.js";

export default class PressNews {
  constructor() {
    this.$wrapper = document.createElement("main");
    this.$wrapper.className = "press-news";

    this.mainNews = categories["종합/경제"].press[0];

    this.render();
  }

  /** 렌더링 */
  render() {
    this.$wrapper.replaceChildren();

    const $nameWrapper = document.createElement("div");
    const $mainWrapper = document.createElement("div");
    $nameWrapper.className = "press-info";
    $mainWrapper.className = "press-main";

    const $editTime = document.createElement("span");
    $editTime.className = "pressInfo-date";
    $editTime.innerText = `${this.mainNews.editTime} 편집`;

    $nameWrapper.appendChild(this.createPressLogo(this.mainNews.logo));
    $nameWrapper.appendChild($editTime);
    if (subscribedPress.press.includes(this.mainNews.id)) {
      $nameWrapper.appendChild(new UnsubButton(this.mainNews.id));
    } else {
      $nameWrapper.appendChild(new SubButton(this.mainNews.id));
    }

    const mainTemplate = `
        <div class="press-imageInfo">
          <div class="news-img">
          <img class="pressImage" src=${this.mainNews.mainArticle.thumbnail} />
          </div>
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
    `;
    $mainWrapper.innerHTML += mainTemplate;

    this.$wrapper.appendChild($nameWrapper);
    this.$wrapper.appendChild($mainWrapper);
  }

  /** 언론사 로고 요소 생성 */
  createPressLogo(name) {
    const $logoImg = new Logo({ name });
    $logoImg.classList.add("pressInfo-logo");
    return $logoImg;
  }

  /** 다음 뉴스페이지로 이동 */
  goNextPage() {
    this.newRender();
  }

  /** 왼쪽 화살표 버튼 클릭  */
  goPreviousPageByArrowBtn() {
    this.decreaseCurrentPage.call(categoriesObj);
    this.newRender();
  }

  /** 오른쪽 화살표 버튼 클릭 시  */
  goNextPageByArrowBtn() {
    this.increaseCurrentPage.call(categoriesObj);
    this.newRender();
  }

  /** 현재 페이지 증가  */
  decreaseCurrentPage() {
    this.currentPage -= 1;
    let targetCategory = Object.keys(categories)[this.currentCategory - 1];
    if (this.currentPage < 1) {
      this.currentCategory -= 1;
      if (this.currentCategory < 0) {
        this.currentCategory = CATEGORIES_COUNT - 1;
        targetCategory = Object.keys(categories)[this.currentCategory];
        this.currentPage = categories[targetCategory].press.length - 1;
      }
      this.currentPage = categories[targetCategory].press.length;
    }
    clearInterval(this.interval);
    this.handleProgress();
  }

  /** 현재 페이지 감소 */
  increaseCurrentPage() {
    this.currentPage += 1;
    const targetCategory = Object.keys(categories)[this.currentCategory];
    if (categories[targetCategory].press.length < this.currentPage) {
      this.currentPage = 1;
      this.currentCategory += 1;
      if (this.currentCategory === CATEGORIES_COUNT) {
        this.currentCategory = 0;
        this.currentPage = 1;
      }
    }
    clearInterval(this.interval);
    this.handleProgress();
  }

  /** 새로운 페이지 렌더링 */
  newRender() {
    const targetCategory =
      Object.keys(categories)[categoriesObj.currentCategory];
    this.mainNews =
      categories[targetCategory].press[categoriesObj.currentPage - 1];
    this.render();
  }
}

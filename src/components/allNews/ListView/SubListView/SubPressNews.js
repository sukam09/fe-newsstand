import { pressData } from "../../../../constants/categories.js";
import { subCategoriesObj } from "../../../../constants/index.js";
import store from "../../../../core/Store.js";
import Logo from "../../../common/Logo.js";
import UnsubButton from "../../Buttons/UnsubButton.js";

export default class SubPressNews {
  constructor() {
    this.$wrapper = document.createElement("main");
    this.$wrapper.className = "press-news";

    this.storePIndex = 0;

    this.pressArray = store.getState();
    if (store.getStateSize() > 0) {
      this.pressIndex = this.pressArray[this.storePIndex] - 1;
      this.mainNews = pressData[this.pressIndex];

      this.render();
    }
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
    $nameWrapper.appendChild(new UnsubButton(this.mainNews.id));

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
    this.storePIndex += 1;
    this.checkStorePIndex();
    this.newRender();
  }

  /** 특정 뉴스페이지로 이동 */
  goSpecificPress(currentCategory) {
    this.storePIndex = currentCategory;
    this.newRender();
  }

  /** 왼쪽 화살표 버튼 클릭  */
  goPreviousPageByArrowBtn() {
    this.storePIndex -= 1;
    this.checkStorePIndex();

    this.decreaseCurrentPage.call(subCategoriesObj);
    this.newRender();
  }

  /** 오른쪽 화살표 버튼 클릭 시  */
  goNextPageByArrowBtn() {
    this.storePIndex += 1;
    this.checkStorePIndex();

    this.increaseCurrentPage.call(subCategoriesObj);
    this.newRender();
  }

  /** 현재 페이지 감소  */
  decreaseCurrentPage() {
    this.currentCategory -= 1;
    if (this.currentCategory === -1) {
      this.currentCategory = store.getStateSize() - 1;
    }

    clearInterval(this.progressInterval);
    this.handleProgress();
  }

  /** 현재 페이지 증가 */
  increaseCurrentPage() {
    this.currentCategory += 1;
    if (this.currentCategory === store.getStateSize()) {
      this.currentCategory = 0;
    }

    clearInterval(this.progressInterval);
    this.handleProgress();
  }

  /** 새로운 페이지 렌더링 */
  newRender() {
    this.pressIndex = this.pressArray[this.storePIndex] - 1;
    this.mainNews = pressData[this.pressIndex];
    this.render();
  }

  checkStorePIndex() {
    if (this.storePIndex === store.getStateSize()) {
      this.storePIndex = 0;
    }
    if (this.storePIndex === -1) {
      this.storePIndex = store.getStateSize() - 1;
    }
  }
}

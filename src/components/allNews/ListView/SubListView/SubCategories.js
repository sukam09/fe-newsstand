import { PROGRESS_SPEED, subPressObj } from "../../../../constants/index.js";
import pressName from "../../../../constants/pressName.js";
import store from "../../../../core/Store.js";
import Icon from "../../../common/Icon.js";

export default class SubCategories {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "categories-wrapper";

    this.progressInterval;
    this.currentCategory = 0;

    if (store.getStateSize() !== 0) {
      this.handleProgress();
    }
  }

  render() {
    this.$wrapper.replaceChildren();

    store.getState().forEach((id) => {
      this.$wrapper.appendChild(this.createCategoryList(id));
    });
  }

  /**
   * 카테고리 리스트 생성
   */
  createCategoryList(pressId) {
    const $categoryList = document.createElement("li");
    const targetIndex = store.getState().findIndex((v) => v === pressId);
    const isCurrentCategory = this.currentCategory === targetIndex;
    const subPressName = pressName[pressId - 1][pressId];
    $categoryList.classList.add(
      "categories-list",
      `${isCurrentCategory ? "category-current" : "notCurrent"}`
    );

    $categoryList.innerHTML += `<span class="category-name">${subPressName}</span>`;
    $categoryList.appendChild(new Icon({ name: "chevron-right" }));
    $categoryList.addEventListener("click", () =>
      this.handleCategoryClick(pressId)
    );

    return $categoryList;
  }

  /**
   * 프로그레스바 구현
   */
  handleProgress() {
    this.render();
    this.progressInterval = setInterval(() => {
      this.currentCategory += 1;
      if (this.currentCategory === store.getStateSize()) {
        this.currentCategory = 0;
      }
      this.goNextNews.call(subPressObj);
    }, PROGRESS_SPEED);
  }

  /**
   * 다음 페이지로 이동
   */
  goNextNews() {
    this.goNextPage();
  }

  /** 특정 카테고리 이동 */
  goSpecificCategory(currentCategory) {
    this.goSpecificPress(currentCategory);
  }

  /**
   * 카테고리 클릭 시 카테고리 이동
   */
  handleCategoryClick(pressId) {
    const targetIndex = store.getState().findIndex((v) => v === pressId);
    this.currentCategory = targetIndex;
    this.goSpecificCategory.call(subPressObj, this.currentCategory);
  }
}

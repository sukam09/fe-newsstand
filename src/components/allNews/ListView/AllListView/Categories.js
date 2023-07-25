import { categories } from "../../../../constants/categories.js";
import {
  CATEGORIES_COUNT,
  PROGRESS_SPEED,
  pressObj,
} from "../../../../constants/index.js";

export default class Categories {
  constructor() {
    this.$wrapper = document.createElement("ul");
    this.$wrapper.className = "categories-wrapper";

    this.currentPage = 1;
    this.interval;
    this.currentCategory = 0;

    this.handleProgress();
  }

  /**
   * 렌더링
   */
  render() {
    this.$wrapper.replaceChildren();

    Object.keys(categories).forEach((category) => {
      this.$wrapper.appendChild(this.createCategoryList(category));
    });
  }

  /**
   * 카테고리 리스트 생성
   */
  createCategoryList(category) {
    const $categoryList = document.createElement("li");
    $categoryList.classList.add(
      "categories-list",
      `${
        this.currentCategory === categories[category].id
          ? "category-current"
          : "notCurrent"
      }`,
      `category_${categories[category].id}`
    );
    $categoryList.innerHTML += `
        <span class="category-name">${category}</span>
        <span class="category-count">${this.currentPage}/${categories[category].press.length}</span>
      `;
    $categoryList.addEventListener("click", () =>
      this.handleCategoryClick(category)
    );

    return $categoryList;
  }

  /**
   * 프로그레스바 구현
   */
  handleProgress() {
    this.render();
    this.interval = setInterval(() => {
      const targetCategory = Object.keys(categories)[this.currentCategory];
      this.currentPage += 1;
      if (categories[targetCategory].press.length < this.currentPage) {
        this.currentCategory += 1;
        this.currentPage = 1;
        if (this.currentCategory === CATEGORIES_COUNT) {
          this.currentCategory = 0;
          this.currentPage = 1;
        }
      }
      this.render();
      this.goNextNews.call(pressObj);
    }, PROGRESS_SPEED);
  }

  /**
   * 다음 페이지로 이동
   */
  goNextNews() {
    this.goNextPage();
  }

  /**
   * 카테고리 클릭 시 카테고리 이동
   */
  handleCategoryClick(categoryName) {
    clearInterval(this.interval);
    const targetIndex = Object.keys(categories).findIndex(
      (cate) => cate === categoryName
    );
    this.currentCategory = targetIndex;
    this.currentPage = 1;
    this.goNextNews.call(pressObj);
    this.handleProgress();
  }
}

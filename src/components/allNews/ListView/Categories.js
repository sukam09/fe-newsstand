import {
  CATEGORIES_COUNT,
  PROGRESS_SPEED,
  pressObj,
} from "../../../constants/index.js";

export default class Categories {
  constructor(pressData) {
    this.$wrapper = document.createElement("ul");
    this.$wrapper.className = "categories-wrapper";

    this.pressData = pressData;

    this.categories = {
      "종합/경제": { id: 0, currentPage: 1 },
      "방송/통신": { id: 1, currentPage: 1 },
      IT: { id: 2, currentPage: 1 },
      영자지: { id: 3, currentPage: 1 },
      "스포츠/연예": { id: 4, currentPage: 1 },
      "매거진/전문지": { id: 5, currentPage: 1 },
      지역: { id: 6, currentPage: 1 },
    };

    this.interval;
    this.currentCategory = 0;

    this.filterData();
    this.handleProgress();
  }

  /**
   * 데이터 필터링
   */
  filterData() {
    Object.keys(this.categories).forEach((cate) => {
      this.categories[cate].press = this.pressData.filter(
        (v) => v.category === cate
      );
    });
  }

  /**
   * 렌더링
   */
  render() {
    this.$wrapper.replaceChildren();

    Object.keys(this.categories).forEach((category) => {
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
        this.currentCategory === this.categories[category].id
          ? "category-current"
          : "notCurrent"
      }`,
      `category_${this.categories[category].id}`
    );
    $categoryList.innerHTML += `
        <span class="category-name">${category}</span>
        <span class="category-count">${this.categories[category].currentPage}/${this.categories[category].press.length}</span>
      `;
    $categoryList.addEventListener("click", (e) => this.handleCategoryClick(e));

    return $categoryList;
  }

  /**
   * 프로그레스바 구현
   */
  handleProgress() {
    this.render();
    this.interval = setInterval(() => {
      const targetCategory = Object.keys(this.categories)[this.currentCategory];
      const page = this.categories[targetCategory].currentPage + 1;
      this.categories[targetCategory].currentPage = page;
      if (
        this.categories[targetCategory].press.length <
        this.categories[targetCategory].currentPage
      ) {
        this.currentCategory += 1;
        if (this.currentCategory === CATEGORIES_COUNT) {
          this.currentCategory = 0;
          this.setCurrentPage();
        }
      }
      this.render();
      this.goNextNews.call(pressObj, page);
    }, PROGRESS_SPEED);
  }

  goNextNews(page) {
    this.goNextPage(page);
  }

  /**
   * 카테고리 클릭 시 카테고리 이동
   */
  handleCategoryClick(event) {
    clearInterval(this.interval);
    const targetCategory = event.target;
    const categoryName = targetCategory.innerText;
    const targetIndex = Object.keys(this.categories).findIndex(
      (cate) => cate === categoryName
    );
    this.currentCategory = targetIndex;
    this.setCurrentPage();
    this.handleProgress();
  }

  /**
   * 현재 페이지 1로 설정
   */
  setCurrentPage() {
    Object.keys(this.categories).forEach(
      (cate) => (this.categories[cate].currentPage = 1)
    );
  }
}

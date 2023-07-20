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
      "종합/경제": { id: 0 },
      "방송/통신": { id: 1 },
      IT: { id: 2 },
      영자지: { id: 3 },
      "스포츠/연예": { id: 4 },
      "매거진/전문지": { id: 5 },
      지역: { id: 6 },
    };
    this.currentPage = 1;
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
        <span class="category-count">${this.currentPage}/${this.categories[category].press.length}</span>
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
      this.currentPage += 1;
      if (this.categories[targetCategory].press.length < this.currentPage) {
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
  handleCategoryClick(event) {
    clearInterval(this.interval);
    const targetCategory = event.target;
    const categoryName = targetCategory.innerText;
    const targetIndex = Object.keys(this.categories).findIndex(
      (cate) => cate === categoryName
    );
    this.currentCategory = targetIndex;
    this.currentPage = 1;
    this.handleProgress();
  }
}

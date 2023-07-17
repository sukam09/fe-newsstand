export default class Categories {
  constructor(pressData) {
    this.$wrapper = document.createElement("ul");
    this.$wrapper.className = "categories-wrapper";

    this.categories = {
      "종합/경제": { id: 0, currentPage: 1 },
      "방송/통신": { id: 1, currentPage: 1 },
      IT: { id: 2, currentPage: 1 },
      영자지: { id: 3, currentPage: 1 },
      "스포츠/연예": { id: 4, currentPage: 1 },
      "매거진/전문지": { id: 5, currentPage: 1 },
      지역: { id: 6, currentPage: 1 },
    };

    this.pressData = pressData;
    this.filterData();

    this.CATEGORIES_COUNT = 7;
    this.currentCategory = 0;
    this.interval;

    this.handleProgress();

    return this.$wrapper;
  }

  filterData() {
    Object.keys(this.categories).forEach((cate) => {
      this.categories[cate].press = this.pressData.filter(
        (v) => v.category === cate
      );
    });
  }

  render() {
    this.$wrapper.replaceChildren();

    Object.keys(this.categories).forEach((category) => {
      this.$wrapper.appendChild(this.createCategoryList(category));
    });
  }

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

  handleProgress() {
    this.render();
    this.interval = setInterval(() => {
      const targetCategory = Object.keys(this.categories)[this.currentCategory];
      let page = this.categories[targetCategory].currentPage;
      page += 1;
      this.categories[targetCategory].currentPage = page;
      if (
        this.categories[targetCategory].press.length <
        this.categories[targetCategory].currentPage
      ) {
        this.currentCategory += 1;
        if (this.currentCategory === this.CATEGORIES_COUNT) {
          this.currentCategory = 0;
          Object.keys(this.categories).forEach(
            (cate) => (this.categories[cate].currentPage = 1)
          );
        }
      }
      this.render();
    }, 1000);
  }

  handleCategoryClick(event) {
    clearInterval(this.interval);
    const targetCategory = event.target;
    const categoryName = targetCategory.innerText;
    const targetIndex = Object.keys(this.categories).findIndex(
      (cate) => cate === categoryName
    );
    this.currentCategory = targetIndex;
    Object.keys(this.categories).forEach(
      (cate) => (this.categories[cate].currentPage = 1)
    ); // 함수로 만들기
    this.handleProgress();
  }
}

export default class Categories {
  constructor() {
    this.$wrapper = document.createElement("ul");
    this.$wrapper.className = "categories-wrapper";

    this.pressCategories = [
      {
        title: "종합/경제",
        currentPage: 1,
        count: 5,
        id: 0,
      },
      {
        title: "방송/통신",
        currentPage: 1,
        count: 5,
        id: 1,
      },
      {
        title: "IT",
        currentPage: 1,
        count: 5,
        id: 2,
      },
      {
        title: "영자지",
        currentPage: 1,
        count: 5,
        id: 3,
      },
      {
        title: "스포츠/연예",
        currentPage: 1,
        count: 5,
        id: 4,
      },
      {
        title: "매거진/전문진",
        currentPage: 1,
        count: 5,
        id: 5,
      },
      {
        title: "지역",
        currentPage: 1,
        count: 5,
        id: 6,
      },
    ];

    this.CATEGORIES_COUNT = 7;
    this.currentCategory = 0;
    this.interval;

    this.handleProgress();

    return this.$wrapper;
  }

  render() {
    this.$wrapper.replaceChildren();

    this.pressCategories.forEach((category) => {
      this.$wrapper.innerHTML += `<li class="categories-list ${
        this.currentCategory === category.id ? "category-current" : ""
      } category_${category.id}">
          <span class="category-name">${category.title}</span>
          <span class="category-count">${category.currentPage}/${
        category.count
      }</span>
        </li>`;
    });
  }

  handleProgress() {
    this.render();
    this.interval = setInterval(() => {
      let page = this.pressCategories[this.currentCategory].currentPage;
      page += 1;
      this.pressCategories[this.currentCategory].currentPage = page;
      if (
        this.pressCategories[this.currentCategory].count <
        this.pressCategories[this.currentCategory].currentPage
      ) {
        this.currentCategory += 1;
        if (this.currentCategory === this.CATEGORIES_COUNT) {
          this.currentCategory = 0;
          this.pressCategories.forEach((v) => (v.currentPage = 1));
        }
      }
      this.render();
    }, 1000);
  }
}

// 카테고리 별로 클래스에 id 인덱스 부여
// 카테고리 클릭 시 id 값 찾기
// 찾은 id 에 current-category 부여

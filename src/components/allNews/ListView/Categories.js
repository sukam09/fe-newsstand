import Category from "./Category.js";

export default class Categories {
  constructor() {
    this.$wrapper = document.createElement("ul");
    this.$wrapper.className = "categories-wrapper";

    this.CATEGORIES_COUNT = 7;
    this.categoryName = [
      "종합/경제",
      "방송/통신",
      "IT",
      "영자지",
      "스포츠/연예",
      "매거진/전문진",
      "지역",
    ];
    this.render();

    return this.$wrapper;
  }

  render() {
    this.categoryName.forEach((category) =>
      this.$wrapper.appendChild(new Category(category))
    );
  }
}

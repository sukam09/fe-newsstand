import Category from "./Category.js";

export default class Categories {
  constructor() {
    this.$wrapper = document.createElement("ul");
    this.$wrapper.className = "categories-wrapper";

    this.pressCategories = [
      {
        title: "종합/경제",
        count: 5,
      },
      {
        title: "방송/통신",
        count: 5,
      },
      {
        title: "IT",
        count: 5,
      },
      {
        title: "영자지",
        count: 5,
      },
      {
        title: "스포츠/연예",
        count: 5,
      },
      {
        title: "매거진/전문진",
        count: 5,
      },
      {
        title: "지역",
        count: 5,
      },
    ];
    this.render();

    return this.$wrapper;
  }

  render() {
    this.pressCategories.forEach((category) =>
      this.$wrapper.appendChild(new Category(category.title, category.count))
    );
  }
}

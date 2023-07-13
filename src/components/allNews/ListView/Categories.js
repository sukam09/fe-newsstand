import pressCategories from "../../../data/pressCategoriesData.js";
import Category from "./Category.js";

export default class Categories {
  constructor() {
    this.$wrapper = document.createElement("ul");
    this.$wrapper.className = "categories-wrapper";

    this.CATEGORIES_COUNT = 7;
    this.render();

    return this.$wrapper;
  }

  render() {
    pressCategories.forEach((category) =>
      this.$wrapper.appendChild(
        new Category(category.title, category.count, category.isCurrent)
      )
    );
  }
}

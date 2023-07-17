import Categories from "./Categories.js";
import PressNews from "./PressNews.js";

export default class ListView {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "list-wrapper";

    this.render();

    return this.$wrapper;
  }

  async render() {
    const response = await fetch("/src/data/press-data.json");
    const pressData = await response.json();

    this.$wrapper.appendChild(new Categories(pressData));
    this.$wrapper.appendChild(new PressNews(pressData));
  }
}

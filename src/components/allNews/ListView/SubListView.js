import ArrowButton from "../ArrowButton.js";
import SubCategories from "./SubCategories.js";

export default class SubListView {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "list-wrapper";

    this.render();

    return this.$wrapper;
  }

  render() {
    const $container = document.createElement("div");
    $container.classList.add("list-container");
    $container.appendChild(new SubCategories().$wrapper);

    this.$wrapper.appendChild($container);
  }
}

import Categories from "./Categories.js";

export default class ListView {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "list-wrapper hidden";

    this.render();

    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(new Categories());
  }
}

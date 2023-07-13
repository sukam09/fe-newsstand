export default class Category {
  constructor(name) {
    this.$wrapper = document.createElement("li");
    this.$wrapper.className = "categories-list";

    this.name = name;
    this.render();

    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(this.createNameElement(this.name));
    this.$wrapper.appendChild(this.createCountElement(1, 81));
  }

  /** 카테고리 이름 요소 */
  createNameElement(name) {
    const $name = document.createElement("span");
    $name.classList.add("category-name");

    $name.innerText = name;

    return $name;
  }

  /** 카테고리 개수 요소 */
  createCountElement(current, total) {
    const $component = document.createElement("span");
    $component.classList.add("category-count");

    $component.innerText = `${current}/${total}`;

    return $component;
  }
}

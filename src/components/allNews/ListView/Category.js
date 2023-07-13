export default class Category {
  constructor(name, count, isCurrent) {
    this.$wrapper = document.createElement("li");
    this.$wrapper.className = "categories-list";

    this.name = name;
    this.count = count;
    this.isCurrent = isCurrent;
    this.isCurrent && this.$wrapper.classList.add("categroy-current");

    this.render();

    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(this.createNameElement(this.name));
    this.isCurrent === true &&
      this.$wrapper.appendChild(this.createCountElement(1, this.count));
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

    $component.innerHTML = `<span class="category-count__current">${current}</span>/${total}`;

    return $component;
  }
}

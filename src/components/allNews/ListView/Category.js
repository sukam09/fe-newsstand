export default class Category {
  constructor(name, count) {
    this.$wrapper = document.createElement("li");
    this.$wrapper.className = "categories-list";
    this.$listView = document.getElementsByClassName("list-wrapper");

    this.pressCategories = [
      "종합/경제",
      "방송/통신",
      "IT",
      "영자지",
      "스포츠/연예",
      "매거진/전문진",
      "지역",
    ];

    this.CATEGORIES_COUNT = 7;
    this.name = name;
    this.count = count;
    this.currentPage = 1;
    this.categoryIndex = 0;

    this.handleProgress(this.currentPage, this.$wrapper);

    return this.$wrapper;
  }

  handleProgress(currentPage, wrapper) {
    this.render(currentPage);
    let inerval = setInterval(() => {
      currentPage += 1;
      this.render(currentPage);
      if (this.count < currentPage) {
        wrapper.classList.remove("category-current");
        clearInterval(inerval);
        this.goNextCategory();
      }
    }, 3000);
  }

  goNextCategory() {
    this.currentPage = 1;
    this.categoryIndex += 1;
    if (this.categoryIndex === this.CATEGORIES_COUNT) {
      this.categoryIndex = 0;
    }
    this.handleProgress(1, this.$wrapper);
  }

  render(currentPage) {
    this.$wrapper.replaceChildren();
    const targetIndex = this.pressCategories.findIndex((v) => v === this.name);
    this.$wrapper.appendChild(this.createNameElement(this.name));
    if (this.categoryIndex === targetIndex) {
      this.$wrapper.appendChild(
        this.createCountElement(currentPage, this.count)
      );
      this.$wrapper.classList.add("category-current");
    }
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

import { subCategoriesObj, subPressObj } from "../../../constants/index.js";
import ArrowButton from "../ArrowButton.js";

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
    $container.appendChild(subCategoriesObj.$wrapper);
    $container.appendChild(subPressObj.$wrapper);

    this.$wrapper.appendChild(
      new ArrowButton({
        name: "LeftButton",
        isVisible: true,
        action: this.goPreviousNews.bind(subPressObj),
      })
    );
    this.$wrapper.appendChild($container);
    this.$wrapper.appendChild(
      new ArrowButton({
        name: "rightButton",
        isVisible: true,
        action: this.goNextNews.bind(subPressObj),
      })
    );
  }

  goNextNews() {
    this.goNextPageByArrowBtn();
  }

  goPreviousNews() {
    this.goPreviousPageByArrowBtn();
  }
}

import { categoriesObj, pressObj } from "../../../constants/index.js";
import ArrowButton from "../ArrowButton.js";

export default class ListView {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "list-wrapper";

    this.render();

    return this.$wrapper;
  }

  render() {
    const $container = document.createElement("div");
    $container.classList.add("list-container");
    $container.appendChild(categoriesObj.$wrapper);
    $container.appendChild(pressObj.$wrapper);

    this.$wrapper.appendChild(
      new ArrowButton({
        name: "LeftButton",
        isVisible: this.page !== 0,
        action: this.goPreviousNews.bind(pressObj),
      })
    );
    this.$wrapper.appendChild($container);
    this.$wrapper.appendChild(
      new ArrowButton({
        name: "rightButton",
        isVisible: this.page !== 0,
        action: this.goNextNews.bind(pressObj),
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

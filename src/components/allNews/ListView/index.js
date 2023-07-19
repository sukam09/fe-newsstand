import Categories from "./Categories.js";
import PressNews from "./PressNews.js";
import { pressData, pressObj } from "../../../constants/index.js";

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
    $container.appendChild(new Categories(pressData).$wrapper);
    $container.appendChild(pressObj.$wrapper);

    this.$wrapper.appendChild($container);
  }

  goNextCategory() {
    this.handleProgress();
  }
}

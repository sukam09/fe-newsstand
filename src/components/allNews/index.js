import AllNewsNavigation from "./AllNewsNavigation.js";
import AllNewsGrid from "./GridView/index.js";
import ListView from "./ListView/index.js";

export default class AllNews {
  constructor() {
    this.$wrapper = document.createElement("section");

    this.renderGridView(); // 초기 그리드뷰 출력
  }

  /** 그리드뷰 렌더링 */
  renderGridView() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(new AllNewsNavigation());
    this.$wrapper.appendChild(new AllNewsGrid());
  }

  /** 리스트뷰 렌더링 */
  renderListView() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(new AllNewsNavigation());
    this.$wrapper.appendChild(new ListView());
  }
}

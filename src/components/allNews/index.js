import AllNewsNavigation from "./AllNewsNavigation.js";
import SubGridView from "./GridView/SubGridView.js";
import GridView from "./GridView/index.js";
import SubListView from "./ListView/SubListView.js";
import ListView from "./ListView/index.js";

export default class AllNews {
  constructor() {
    this.$wrapper = document.createElement("section");
    this.allNewsNavigationObj = new AllNewsNavigation();

    this.renderAllGridView(); // 초기 그리드뷰 출력
  }

  /** 전체 언론사 그리드뷰 렌더링 */
  renderAllGridView() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(this.allNewsNavigationObj);
    this.$wrapper.appendChild(new GridView());
  }

  /** 전체 언론사 리스트뷰 렌더링 */
  renderAllListView() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(this.allNewsNavigationObj);
    this.$wrapper.appendChild(new ListView());
  }

  /** 구독한 언론사 그리드뷰 렌더링 */
  renderSubGridView() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(this.allNewsNavigationObj);
    this.$wrapper.appendChild(new SubGridView());
  }

  /** 구독한 언로사 리스트뷰 렌더링 */
  renderSubListView() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(this.allNewsNavigationObj);
    this.$wrapper.appendChild(new SubListView());
  }
}

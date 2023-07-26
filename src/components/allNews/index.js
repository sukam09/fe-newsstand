import AllNewsNavigation from "./AllNewsNavigation.js";
import SubGridView from "./GridView/SubGridView.js";
import GridView from "./GridView/index.js";
import SubListView from "./ListView/SubListView/index.js";
import ListView from "./ListView/AllListView/index.js";
import store from "../../core/Store.js";
import NonSubPage from "./NonSubPage.js";

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

    const subGridViewObj = new SubGridView();
    store.subscribe(() => subGridViewObj.render());
    this.$wrapper.appendChild(this.allNewsNavigationObj);
    this.$wrapper.appendChild(subGridViewObj.$wrapper);
  }

  /** 구독한 언론사 리스트뷰 렌더링 */
  renderSubListView() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(this.allNewsNavigationObj);
    this.$wrapper.appendChild(new SubListView());
  }

  /** 구독한 언론사가 없을 때 뷰 렌더링 */
  renderNonSubView() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(this.allNewsNavigationObj);
    this.$wrapper.appendChild(new NonSubPage());
  }
}

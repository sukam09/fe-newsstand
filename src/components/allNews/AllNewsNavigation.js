import { allNewsObj } from "../../constants/index.js";
import Icon from "../common/Icon.js";

export default class AllNewsNavigation {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "all-news-header";

    this.GRIDVIEW_ICON = "grid-view";
    this.LISTVIEW_ICON = "list-view";

    this.$wrapper.appendChild(this.addTitleNavigator());
    this.$wrapper.appendChild(this.addIconNavigator());

    return this.$wrapper;
  }

  /** 헤더 텍스트 부분 생성 */
  addTitleNavigator() {
    const $titleNavigation = document.createElement("nav");
    $titleNavigation.className = "view-type-wrapper";

    const $allPress = document.createElement("span");
    const $subscibedPress = document.createElement("span");

    $allPress.innerText = "전체 언론사";
    $subscibedPress.innerText = "내가 구독한 언론사";
    $allPress.classList.add("selected-type");

    $allPress.addEventListener("click", (e) => this.handleAllPressClick(e));
    $subscibedPress.addEventListener("click", (e) =>
      this.handleSubPressClick(e)
    );

    $titleNavigation.appendChild($allPress);
    $titleNavigation.appendChild($subscibedPress);

    return $titleNavigation;
  }

  /** 헤더 아이콘 부분 생성 */
  addIconNavigator() {
    const $iconNavigation = document.createElement("div");
    $iconNavigation.className = "view-type-icon";

    const $listViewIcon = new Icon({ name: this.LISTVIEW_ICON });
    const $gridViewIcon = new Icon({ name: `${this.GRIDVIEW_ICON}-selected` });

    $listViewIcon.classList.add("img-icon");
    $gridViewIcon.classList.add("img-icon");

    $listViewIcon.addEventListener("click", (e) => this.handleListIconClick(e));
    $gridViewIcon.addEventListener("click", (e) => this.handleGridIconClick(e));

    $iconNavigation.appendChild($listViewIcon);
    $iconNavigation.appendChild($gridViewIcon);

    return $iconNavigation;
  }

  /** 리스트 아이콘 클릭 시 */
  handleListIconClick(event) {
    const $listIconImg = event.target;
    const $gridIconImg = event.target.nextSibling;
    $listIconImg.src = `src/assets/icons/${this.LISTVIEW_ICON}-selected.svg`;
    $gridIconImg.src = `src/assets/icons/${this.GRIDVIEW_ICON}.svg`;
    this.callRenderListView.call(allNewsObj);
  }

  /** 그리드 아이콘 클릭 시 */
  handleGridIconClick(event) {
    const $gridIconImg = event.target;
    const $listIconImg = event.target.previousSibling;
    $listIconImg.src = `src/assets/icons/${this.LISTVIEW_ICON}.svg`;
    $gridIconImg.src = `src/assets/icons/${this.GRIDVIEW_ICON}-selected.svg`;
    this.callRenderGridView.call(allNewsObj);
  }

  callRenderListView() {
    this.renderListView();
  }

  callRenderGridView() {
    this.renderGridView();
  }

  callRenderSubGridView() {
    this.renderSubGridView();
  }

  handleAllPressClick({ target: span }) {
    span.nextSibling.className = "";
    span.className = "selected-type";
    this.callRenderGridView.call(allNewsObj);
  }

  handleSubPressClick({ target: span }) {
    span.previousSibling.className = "";
    span.className = "selected-type";
    this.callRenderSubGridView.call(allNewsObj);
  }
}

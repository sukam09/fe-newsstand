import {
  GRIDVIEW_ICON,
  LISTVIEW_ICON,
  allNewsObj,
} from "../../constants/index.js";
import { store } from "../../core/store.js";
import Icon from "../common/Icon.js";

export default class AllNewsNavigation {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "all-news-header";

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

    const $listViewIcon = new Icon({ name: LISTVIEW_ICON });
    const $gridViewIcon = new Icon({ name: `${GRIDVIEW_ICON}-selected` });

    $listViewIcon.classList.add("img-icon");
    $gridViewIcon.classList.add("img-icon");

    $listViewIcon.addEventListener("click", (e) => this.handleListIconClick(e));
    $gridViewIcon.addEventListener("click", (e) => this.handleGridIconClick(e));

    $iconNavigation.appendChild($listViewIcon);
    $iconNavigation.appendChild($gridViewIcon);

    return $iconNavigation;
  }

  /* 전체 언론사 버튼 클릭 시 */
  handleAllPressClick({ target: span }) {
    span.nextSibling.className = "";
    span.className = "selected-type";
    store.isShowAllPress = true;

    this.callRender.call(allNewsObj);
  }

  /* 구독한 언론사 클릭 시 */
  handleSubPressClick({ target: span }) {
    span.previousSibling.className = "";
    span.className = "selected-type";
    store.isShowAllPress = false;

    this.callRender.call(allNewsObj);
  }

  /** 리스트 아이콘 클릭 시 */
  handleListIconClick({ target: $listIconImg }) {
    const $gridIconImg = $listIconImg.nextSibling;
    $listIconImg.src = `src/assets/icons/${LISTVIEW_ICON}-selected.svg`;
    $gridIconImg.src = `src/assets/icons/${GRIDVIEW_ICON}.svg`;
    store.isShowGrid = false;

    this.callRender.call(allNewsObj);
  }

  /** 그리드 아이콘 클릭 시 */
  handleGridIconClick({ target: $gridIconImg }) {
    const $listIconImg = $gridIconImg.previousSibling;
    $listIconImg.src = `src/assets/icons/${LISTVIEW_ICON}.svg`;
    $gridIconImg.src = `src/assets/icons/${GRIDVIEW_ICON}-selected.svg`;
    store.isShowGrid = true;

    this.callRender.call(allNewsObj);
  }

  callRender() {
    store.isShowGrid
      ? store.isShowAllPress
        ? this.renderAllGridView()
        : this.renderSubGridView()
      : store.isShowAllPress
      ? this.renderAllListView()
      : this.renderSubListView();
  }
}

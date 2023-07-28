import { GRIDVIEW_ICON, LISTVIEW_ICON } from "../../constants/index.js";
import store from "../../core/Store.js";
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

    $allPress.addEventListener(
      "click",
      () =>
        store.setShowState({
          isShowAllPress: true,
          isShowGrid: store.showState.isShowGrid,
        }) // 전체 언론사 클릭
    );
    $subscibedPress.addEventListener(
      "click",
      () =>
        store.setShowState({
          isShowAllPress: false,
          isShowGrid: store.showState.isShowGrid,
        }) // 구독한 언론사 클릭
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

    $listViewIcon.addEventListener(
      "click",
      () =>
        store.setShowState({
          isShowAllPress: store.showState.isShowAllPress,
          isShowGrid: false,
        }) // 리스트뷰 아이콘 클릭
    );
    $gridViewIcon.addEventListener(
      "click",
      () =>
        store.setShowState({
          isShowAllPress: store.showState.isShowAllPress,
          isShowGrid: true,
        }) // 그리드뷰 아이콘 클릭
    );

    $iconNavigation.appendChild($listViewIcon);
    $iconNavigation.appendChild($gridViewIcon);

    return $iconNavigation;
  }
}

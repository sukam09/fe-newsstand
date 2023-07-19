import Icon from "../common/Icon.js";
import AllNewsGrid from "./GridView/index.js";
import ListView from "./ListView/index.js";

export default class AllNews {
  constructor() {
    this.$wrapper = document.createElement("section");

    this.GRIDVIEW_ICON = "grid-view";
    this.LISTVIEW_ICON = "list-view";

    this.renderGridView(); // 초기 그리드뷰 출력

    return this.$wrapper;
  }

  /** 그리드뷰 렌더링 */
  renderGridView() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(this.createAllNewHeader());
    this.$wrapper.appendChild(new AllNewsGrid());
  }

  /** 리스트뷰 렌더링 */
  renderListView() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(this.createAllNewHeader());
    this.$wrapper.appendChild(new ListView());
  }

  /** 그리드(리스트)뷰 헤더 생성 */
  createAllNewHeader() {
    const $header = document.createElement("div");
    $header.className = "all-news-header";

    $header.appendChild(this.addTitleNavigator());
    $header.appendChild(this.addIconNavigator());

    return $header;
  }

  /** 헤더 텍스트 부분 생성 */
  addTitleNavigator() {
    const $titleNavigation = document.createElement("nav");
    $titleNavigation.className = "view-type-wrapper";

    const $allPress = document.createElement("span");
    const $subscibedPress = document.createElement("span");

    $allPress.innerText = "전체 언론사";
    $subscibedPress.innerText = "내가 구독한 언론사";

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
    this.renderListView();
  }

  /** 그리드 아이콘 클릭 시 */
  handleGridIconClick(event) {
    const $gridIconImg = event.target;
    const $listIconImg = event.target.previousSibling;
    $listIconImg.src = `src/assets/icons/${this.LISTVIEW_ICON}.svg`;
    $gridIconImg.src = `src/assets/icons/${this.GRIDVIEW_ICON}-selected.svg`;
    this.renderGridView();
  }
}

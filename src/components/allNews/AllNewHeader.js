import Icon from "../common/Icon.js";

export default class AllNewHeader {
  constructor() {
    this.$header = document.createElement("div");
    this.$header.className = "all-news-header";

    this.GRIDVIEW_ICON = "grid-view";
    this.LISTVIEW_ICON = "list-view";
    this.render();

    return this.$header;
  }

  render() {
    this.addTitleNavigator();
    this.addIconNavigator();
  }

  addTitleNavigator() {
    const $titleNavigation = document.createElement("nav");
    $titleNavigation.className = "view-type-wrapper";

    const $allPress = document.createElement("span");
    const $subscibedPress = document.createElement("span");

    $allPress.innerText = "전체 언론사";
    $subscibedPress.innerText = "내가 구독한 언론사";

    $titleNavigation.appendChild($allPress);
    $titleNavigation.appendChild($subscibedPress);
    this.$header.appendChild($titleNavigation);
  }

  addIconNavigator() {
    const $iconNavigation = document.createElement("div");
    $iconNavigation.className = "view-type-icon";

    const $listViewIcon = new Icon({ name: this.LISTVIEW_ICON });
    const $gridViewIcon = new Icon({ name: `${this.GRIDVIEW_ICON}-selected` });

    $listViewIcon.addEventListener("click", (e) => this.handleListIconClick(e));
    $gridViewIcon.addEventListener("click", (e) => this.handleGridIconClick(e));

    $iconNavigation.appendChild($listViewIcon);
    $iconNavigation.appendChild($gridViewIcon);

    this.$header.appendChild($iconNavigation);
  }

  handleListIconClick(event) {
    this.show();
    const $listIconImg = event.target;
    const $gridIconImg = event.target.nextSibling;
    $listIconImg.src = `src/assets/icons/${this.LISTVIEW_ICON}-selected.svg`;
    $gridIconImg.src = `src/assets/icons/${this.GRIDVIEW_ICON}.svg`;
  }

  handleGridIconClick(event) {
    this.show();
    const $gridIconImg = event.target;
    const $listIconImg = event.target.previousSibling;
    $listIconImg.src = `src/assets/icons/${this.LISTVIEW_ICON}.svg`;
    $gridIconImg.src = `src/assets/icons/${this.GRIDVIEW_ICON}-selected.svg`;
  }

  show() {
    const $gridWrapper = document.querySelector(".grid-wrapper");
    const $listWrapper = document.querySelector(".list-wrapper");
    $gridWrapper.classList.toggle("hidden");
    $listWrapper.classList.toggle("hidden");
  }
}

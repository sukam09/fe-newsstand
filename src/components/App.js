import {
  GRIDVIEW_ICON,
  LISTVIEW_ICON,
  allNewsObj,
  categoriesObj,
  subCategoriesObj,
} from "../constants/index.js";
import store from "../core/Store.js";
import Header from "./header/index.js";
import LatestNews from "./latestNews/index.js";

export default class App {
  constructor() {
    this.$app = document.getElementById("root");
    this.render();

    store.subscribeShowState(() => this.changeShowStatus());
  }

  render() {
    this.$app.appendChild(new Header());
    this.$app.appendChild(new LatestNews());
    this.$app.appendChild(allNewsObj.$wrapper);
  }

  changeShowStatus() {
    const $textWrapper = document.querySelector(".view-type-wrapper");
    const textNodes = $textWrapper.childNodes;
    const $iconWrapper = document.querySelector(".view-type-icon");
    const iconsNodes = $iconWrapper.childNodes;

    if (store.showState.isShowAllPress) {
      textNodes[0].className = "selected-type";
      textNodes[1].className = "";
    } else {
      textNodes[1].className = "selected-type";
      textNodes[0].className = "";
    }
    if (store.showState.isShowGrid) {
      iconsNodes[0].src = `src/assets/icons/${LISTVIEW_ICON}.svg`;
      iconsNodes[1].src = `src/assets/icons/${GRIDVIEW_ICON}-selected.svg`;
      categoriesObj.handleProgress();
      subCategoriesObj.handleProgress();
    } else {
      iconsNodes[0].src = `src/assets/icons/${LISTVIEW_ICON}-selected.svg`;
      iconsNodes[1].src = `src/assets/icons/${GRIDVIEW_ICON}.svg`;
      categoriesObj.handleProgress();
      subCategoriesObj.handleProgress();
    }
  }
}

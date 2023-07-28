import { shufflePressOrder } from "../../../utils/index.js";
import AllNewsList from "./AllnewsList.js";
import ArrowButton from "../Buttons/ArrowButton.js";
import store from "../../../core/Store.js";
import { GRID_COUNT } from "../../../constants/index.js";

export default class GridView {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "grid-wrapper";
    this.$pressOrder = shufflePressOrder();
    this.page = 0;

    this.allNewsListObj = new Array(96);

    this.render();

    return this.$wrapper;
  }

  addGrid() {
    const $newsListGrid = document.createElement("div");
    $newsListGrid.className = "news-list-wrapper";
    const $newsLists = document.createElement("ul");
    $newsLists.className = "news-list";
    for (
      let i = GRID_COUNT * this.page;
      i < GRID_COUNT * (this.page + 1);
      i++
    ) {
      this.allNewsListObj[i] = new AllNewsList(this.$pressOrder[i]);
      store.subscribe(() =>
        this.allNewsListObj[i].hideSubButton(this.$pressOrder[i])
      );
      $newsLists.appendChild(this.allNewsListObj[i].$wrapper);
    }
    $newsListGrid.appendChild($newsLists);

    this.$wrapper.appendChild($newsListGrid);
  }

  goNextPage() {
    this.page += 1;
    this.render();
  }

  goPreviousPage() {
    this.page -= 1;
    this.render();
  }
  render() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(
      new ArrowButton({
        name: "LeftButton",
        isVisible: this.page !== 0,
        action: this.goPreviousPage.bind(this),
      })
    );
    this.addGrid();
    this.$wrapper.appendChild(
      new ArrowButton({
        name: "RightButton",
        isVisible: this.page !== 3,
        action: this.goNextPage.bind(this),
      })
    );
  }
}

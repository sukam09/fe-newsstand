import AllNewsList from "./AllnewsList.js";
import store from "../../../core/Store.js";
import ArrowButton from "../Buttons/ArrowButton.js";
import { GRID_COUNT } from "../../../constants/index.js";

export default class SubGridView {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "grid-wrapper";
    this.$subPressOrder = store.getState();
    this.page = 0;
    this.maxPage = Math.floor(this.$subPressOrder.length / GRID_COUNT + 1);
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
      $newsLists.appendChild(new AllNewsList(this.$subPressOrder[i]).$wrapper);
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
        isVisible: this.page !== this.maxPage,
        action: this.goNextPage.bind(this),
      })
    );
  }
}

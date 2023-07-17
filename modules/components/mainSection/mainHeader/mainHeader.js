import { addObserver, getState, setState } from "../../../core/observer.js";
import {
  GRID,
  LIST,
  categoryId,
  gridPage,
  listPage,
} from "../../../state/pageState.js";
import { pageTypeState } from "../../../state/pageState2.js";
import { qs } from "../../../utils.js";
import {
  hideGridContainer,
  showGridContainer,
  showGridPage,
} from "../mainBody/mainContent/pressGrid/pressGrid.js";
import { highlightCategoryItem } from "../mainBody/mainContent/pressList/category/categoryItem.js";
import {
  hideListContainer,
  showListContainer,
  showListPage,
} from "../mainBody/mainContent/pressList/pressList.js";
import { controllButtonShowing } from "../mainBody/pageButtons/pageButtons.js";

export function createMainHeader() {
  return `
    <div class="main_header flex_row">
      <div class="main_title_container flex_row">
        <h2>전체 언론사</h2>
        <span>내가 구독한 언론사</span>
      </div>
      <div class="view_button_container flex_row">
        <img class="list_view_button" src="./assets/icons/list_off.png" alt="list view button">
        <img class="grid_view_button view_clicked" src="./assets/icons/grid_off.png" alt="grid view button">
      </div>
    </div>
    `;
}

export function handleGirdViewButton(e) {
  const $listViewButton = qs(".list_view_button");
  e.currentTarget.classList.add("view_clicked");
  $listViewButton.classList.remove("view_clicked");
  setState(pageTypeState, GRID);
}

export function handleListViewButton(e) {
  const $gridViewButton = qs(".grid_view_button");
  e.currentTarget.classList.add("view_clicked");
  $gridViewButton.classList.remove("view_clicked");
  setState(pageTypeState, LIST);
}

export function initObserver() {
  addObserver(pageTypeState, () => {
    const pageType = getState(pageTypeState);
    if (pageType === GRID) {
      hideListContainer();
      showGridContainer();
      showGridPage(gridPage);
    } else if (pageType === LIST) {
      hideGridContainer();
      showListContainer();
      showListPage(categoryId, listPage);
      highlightCategoryItem();
    }
    controllButtonShowing();
  });
}

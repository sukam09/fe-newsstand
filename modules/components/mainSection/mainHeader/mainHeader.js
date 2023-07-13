import { addEventsOnPageButton } from "../../../events.js";
import {
  GRID,
  LIST,
  MAX_GRID_PAGE,
  categoryId,
  gridPage,
  listPage,
  setPageType,
} from "../../../pageState.js";
import { qs } from "../../../utils.js";
import {
  hideGridContainer,
  showGridContainer,
  showGridPage,
} from "../mainBody/mainContent/pressGrid/pressGrid.js";
import { highlightCategoryItem } from "../mainBody/mainContent/pressList/category/categoryItem.js";
import { startProgressAnimation } from "../mainBody/mainContent/pressList/category/progressBar.js";
import {
  hideListContainer,
  showListContainer,
  showListPage,
} from "../mainBody/mainContent/pressList/pressList.js";
import { controllButtonShowing } from "../mainBody/pageButtons/pageButtons.js";

export function mainHeader() {
  return `
    <div class="main_header flex_row">
      <div class="main_title_container flex_row">
        <h2>전체 언론사</h2>
        <span>내가 구독한 언론사</span>
      </div>
      <div class="view_button_container flex_row">
        <img class="list_view_button" src="./assets/icons/list_off.png" alt="list view button">
        <img class="grid_view_button" src="./assets/icons/grid_off.png" alt="grid view button">
      </div>
    </div>
    `;
}

export function handleGirdViewButton(e) {
  const $listViewButton = qs(".list_view_button");
  e.currentTarget.classList.add("view_clicked");
  $listViewButton.classList.remove("view_clicked");
  hideListContainer();
  showGridContainer();
  showGridPage(gridPage);
  setPageType(GRID);
  controllButtonShowing();
}

export function handleListViewButton(e) {
  const $gridViewButton = qs(".grid_view_button");
  e.currentTarget.classList.add("view_clicked");
  $gridViewButton.classList.remove("view_clicked");
  hideGridContainer();
  showListContainer();
  showListPage(categoryId, listPage);
  setPageType(LIST);
  controllButtonShowing();
  // todo : 리스트 보이기
  highlightCategoryItem();
}

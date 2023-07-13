import {
  MAX_GRID_PAGE,
  MAX_LIST_PAGE,
  categoryId,
  decGridPage,
  getListPage,
  getPageType,
  gridPage,
  incGridPage,
  incListPage,
  setListPage,
  listPage,
  decListPage,
  TOTAL_LIST_PAGE,
  MAX_CATEGORY_ID,
  setCategoryId,
} from "../../../../pageState.js";
import { qs } from "../../../../utils.js";
import {
  hideGridPage,
  showGridPage,
} from "../mainContent/pressGrid/pressGrid.js";
import {
  highlightCategoryItem,
  updatePageCount,
} from "../mainContent/pressList/category/categoryItem.js";
import {
  hideAllListPage,
  showListPage,
} from "../mainContent/pressList/pressList.js";

const GRID = "grid";
const LIST = "list";

export function rightButton() {
  return `
    <img
      src="./assets/icons/rightbutton.png"
      class="right_button"
      alt=""
    />
    `;
}

export function leftButton() {
  return `
        <img
          src="./assets/icons/leftbutton.png"
          class="left_button"
          alt=""
        />
        `;
}

export function showNextPage() {
  const type = getPageType();

  switch (type) {
    case GRID:
      showNextGridPage();
      break;
    case LIST:
      showNextListPage();
      break;
  }
  controllButtonShowing();
}

export function showPrevPage() {
  const type = getPageType();

  switch (type) {
    case GRID:
      showPrevGridPage();
      break;
    case LIST:
      showPrevListPage();
      break;
  }
  controllButtonShowing();
}

function showPrevListPage() {
  hideAllListPage();
  if (listPage <= 0 && categoryId > 0) {
    setCategoryId(categoryId - 1);
    setListPage(MAX_LIST_PAGE[categoryId] - 1);
    highlightCategoryItem();
  } else {
    decListPage();
  }
  showListPage(categoryId, listPage);
  updatePageCount();
}

function showPrevGridPage() {
  hideGridPage(gridPage);
  decGridPage();
  showGridPage(gridPage);
}

function showNextListPage() {
  hideAllListPage();
  if (
    listPage >= MAX_LIST_PAGE[categoryId] - 1 &&
    categoryId < MAX_CATEGORY_ID - 1
  ) {
    setCategoryId(categoryId + 1);
    setListPage(0);
    highlightCategoryItem();
  } else {
    incListPage();
  }
  updatePageCount();
  showListPage(categoryId, listPage);
}

function showNextGridPage() {
  hideGridPage(gridPage);
  incGridPage();
  showGridPage(gridPage);
}

export function controllButtonShowing() {
  const $leftButton = qs(".left_button");
  const $rightButton = qs(".right_button");
  const type = getPageType();

  if (type === GRID) {
    if (gridPage >= MAX_GRID_PAGE - 1) {
      $leftButton.style.display = "block";
      $rightButton.style.display = "none";
    } else if (gridPage <= 0) {
      $leftButton.style.display = "none";
      $rightButton.style.display = "block";
    } else {
      $leftButton.style.display = "block";
      $rightButton.style.display = "block";
    }
  } else if (type === LIST) {
    const listPage = getListPage();
    const maxPage = TOTAL_LIST_PAGE - 1;
    if (listPage >= maxPage) {
      $leftButton.style.display = "block";
      $rightButton.style.display = "none";
    } else if (listPage <= 0 && categoryId <= 0) {
      $leftButton.style.display = "none";
      $rightButton.style.display = "block";
    } else {
      $leftButton.style.display = "block";
      $rightButton.style.display = "block";
    }
  }
}

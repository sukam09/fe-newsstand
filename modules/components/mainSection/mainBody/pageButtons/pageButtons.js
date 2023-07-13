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
} from "../../../../pageState.js";
import { qs } from "../../../../utils.js";
import {
  hideGridPage,
  showGridPage,
} from "../mainContent/pressGrid/pressGrid.js";
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
  if (type === GRID) {
    hideGridPage(gridPage);
    incGridPage();
    showGridPage(gridPage);
  } else if (type === LIST) {
    hideAllListPage();
    incListPage();
    showListPage(categoryId, listPage);
  }
  controllButtonShowing();
}

export function showPrevPage() {
  const type = getPageType();

  if (type === GRID) {
    hideGridPage(gridPage);
    decGridPage();
    showGridPage(gridPage);
  } else if (type === LIST) {
    hideAllListPage();
    decListPage();
    showListPage(categoryId, listPage);
  }
  controllButtonShowing();
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
    const maxPage = MAX_LIST_PAGE[categoryId] - 1;
    if (listPage >= maxPage) {
      $leftButton.style.display = "block";
      $rightButton.style.display = "none";
    } else if (listPage <= 0) {
      $leftButton.style.display = "none";
      $rightButton.style.display = "block";
    } else {
      $leftButton.style.display = "block";
      $rightButton.style.display = "block";
    }
  }
}

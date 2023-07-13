import {
  MAX_LIST_PAGE,
  categoryId,
  decGridPage,
  decListPage,
  getListPage,
  gridPage,
  incGridPage,
  incListPage,
  setListPage,
} from "../../../../pageState.js";
import { qs } from "../../../../utils.js";
import {
  hideGridPage,
  showGridPage,
} from "../mainContent/pressGrid/pressGrid.js";
import { showListPage } from "../mainContent/pressList/pressList.js";

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

export function showNextPage(type) {
  if (type === GRID) {
    hideGridPage(gridPage);
    incGridPage();
    showGridPage(gridPage);
    controllButtonShowing(GRID);
  } else if (type === LIST) {
    const listPage = getListPage();
    let nextPage = listPage + 1;
    const maxPage = MAX_LIST_PAGE[categoryId] - 1;
    if (nextPage >= maxPage) {
      nextPage = maxPage;
    }
    setListPage(nextPage);
    showListPage(categoryId, nextPage);
    controllButtonShowing(LIST);
  }
}

export function showPrevPage(type) {
  if (type === GRID) {
    hideGridPage(gridPage);
    decGridPage();
    showGridPage(gridPage);
    controllButtonShowing(GRID);
  } else if (type === LIST) {
    const listPage = getListPage();
    let prevPage = listPage - 1;
    if (prevPage <= 0) {
      prevPage = 0;
    }
    setListPage(prevPage);
    showListPage(categoryId, prevPage);
    controllButtonShowing(LIST);
  }
}

function controllButtonShowing(type) {
  const $leftButton = qs(".left_button");
  const $rightButton = qs(".right_button");

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

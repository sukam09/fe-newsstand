import { addObserver, getState } from "../store/observer.js";
import { MAX_GRID_PAGE } from "../store/pageState.js";
import {
  GRID,
  LIST,
  categoryIdState,
  gridPageState,
  listPageState,
  pageTypeState,
} from "../store/pageState.js";
import { qs, qsa } from "../utils.js";
import { highlightCategoryItem } from "./categoryController.js";

export function initPageObservers() {
  addObserverOnGridPage();
  addObserverOnListPage();
  addObserverOnPageType();
}

function addObserverOnPageType() {
  const changeView = () => {
    const gridPage = getState(gridPageState);
    const pageType = getState(pageTypeState);
    const categoryId = getState(categoryIdState);
    const listPage = getState(listPageState);

    switch (pageType) {
      case GRID:
        hideListContainer();
        showGridContainer();
        showGridPage(gridPage);
        break;
      case LIST:
        hideGridContainer();
        showListContainer();
        showListPage(categoryId, listPage);
        highlightCategoryItem();
        break;
      default:
        break;
    }
    controllButtonShowing();
  };
  addObserver(pageTypeState, changeView);
}

function addObserverOnGridPage() {
  addObserver(gridPageState, () => {
    showGridPage(getState(gridPageState));
  });
}

function addObserverOnListPage() {
  const controllListPage = () => {
    const categoryId = getState(categoryIdState);
    const listPage = getState(listPageState);
    showListPage(categoryId, listPage);
    updatePageCount();
  };

  addObserver(listPageState, controllListPage);
}

export function controllButtonShowing() {
  const $leftButton = qs(".left_button");
  const $rightButton = qs(".right_button");
  const type = getState(pageTypeState);

  if (type === GRID) {
    const gridPage = getState(gridPageState);
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
    $leftButton.style.display = "block";
    $rightButton.style.display = "block";
  }
}

export function showGridPage(page) {
  const $gridPages = qsa(".press_grid");
  [...$gridPages].forEach((grid) => {
    grid.style.display = "none";
  });

  const targetGrid = document.getElementById(`grid_page_${page}`);
  targetGrid.style.display = "grid";
  controllButtonShowing();
}

export function showListPage(categoryId, page) {
  hideAllListPage();
  const $targetNewsPage = qs(`.news_${parseInt(categoryId)}_${page}`);
  $targetNewsPage.style.display = "block";
}

function hideGridContainer() {
  const $gridContainer = qs("#grid_container");
  $gridContainer.style.display = "none";
}
function showGridContainer() {
  const $gridContainer = qs("#grid_container");
  $gridContainer.style.display = "block";
}

function hideAllListPage() {
  const $newsPageList = qsa(".news");
  [...$newsPageList].forEach(($newsPage) => {
    $newsPage.style.display = "none";
  });
}

function hideListContainer() {
  const $listContainer = qs("#list_container");
  $listContainer.style.display = "none";
}
function showListContainer() {
  const $listContainer = qs("#list_container");
  $listContainer.style.display = "block";
}

export function updatePageCount() {
  const listPage = getState(listPageState);
  const categoryId = getState(categoryIdState);
  const $categoryItem = qs(`#category_${parseInt(categoryId)}`);
  const $nowPage = $categoryItem.querySelector(".now_page");
  $nowPage.innerHTML = listPage + 1;
}

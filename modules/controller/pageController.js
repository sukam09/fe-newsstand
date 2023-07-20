import { addObserver, getState, setState } from "../store/observer.js";
import {
  MAX_GRID_PAGE,
  MODE_ALL,
  MODE_MY,
  pageModeState,
} from "../store/pageState.js";
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
import {
  hideAllModeGridContainer,
  hideMyModeGridContainer,
} from "./modeController.js";

export function addObserverOnPageType() {
  const changeView = () => {
    const gridPage = getState(gridPageState);
    const pageType = getState(pageTypeState);
    const pageMode = getState(pageModeState);
    const categoryId = getState(categoryIdState);
    const listPage = getState(listPageState);

    switch (pageType) {
      case GRID:
        hideListContainer();
        showGridContainer();
        showGridPage(pageMode, gridPage);
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

export function handleGridViewButton(e) {
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

export function addObserverOnGridPage() {
  addObserver(gridPageState, () => {
    const pageMode = getState(pageModeState);
    const gridPage = getState(gridPageState);
    showGridPage(pageMode, gridPage);
  });
}

export function addObserverOnListPage() {
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

export function showGridPage(mode, page) {
  console.log(mode, page);
  const $gridPages = qsa(".press_grid");
  [...$gridPages].forEach((grid) => {
    grid.style.display = "none";
  });
  let targetGrid;
  switch (mode) {
    case MODE_ALL:
      targetGrid = qs(`#grid_page_${page}`);
      break;
    case MODE_MY:
      targetGrid = qs(`#my_mode_grid_page_${page}`);
      break;
    default:
      targetGrid = qs(`#grid_page_${page}`);
      break;
  }
  console.log(targetGrid);
  targetGrid.style.display = "grid";
  controllButtonShowing();
}

export function showListPage(categoryId, page) {
  hideAllListPage();
  const $targetNewsPage = qs(`.news_${parseInt(categoryId)}_${page}`);
  $targetNewsPage.style.display = "block";
}

export function hideGridContainer() {
  const $gridContainer = qs("#grid_container");
  $gridContainer.style.display = "none";
}
export function showGridContainer() {
  const $gridContainer = qs("#grid_container");
  $gridContainer.style.display = "block";
}

export function hideAllListPage() {
  const $newsPageList = qsa(".news");
  [...$newsPageList].forEach(($newsPage) => {
    $newsPage.style.display = "none";
  });
}

export function hideListContainer() {
  const $listContainer = qs("#list_container");
  $listContainer.style.display = "none";
}

export function showListContainer() {
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

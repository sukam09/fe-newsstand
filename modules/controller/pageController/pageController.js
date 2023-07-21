import { addObserver, getState } from "../../store/observer.js";
import {
  GRID,
  LIST,
  MODE_ALL,
  MODE_MY,
  categoryIdState,
  gridPageState,
  listPageState,
  pageModeState,
  pageTypeState,
} from "../../store/pageState.js";
import { qs, qsa } from "../../utils.js";
import { highlightCategoryItem } from "../categoryController.js";
import { controllButtonShowing } from "./typeController.js";

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

export function controllPage() {
  const pageType = getState(pageTypeState);
  const pageMode = getState(pageModeState);
  const gridPage = getState(gridPageState);
  const listPage = getState(listPageState);
  const categoryId = getState(categoryIdState);

  // controll container
  hideContainer({ type: GRID, mode: MODE_ALL });
  hideContainer({ type: GRID, mode: MODE_MY });
  hideContainer({ type: LIST, mode: MODE_ALL });
  hideContainer({ type: LIST, mode: MODE_MY });
  showContainer({ type: pageType, mode: pageMode });

  showPage({
    pageMode,
    pageType,
    gridPage,
    categoryId,
    listPage,
  });
}

function showPage({ pageMode, pageType, gridPage, categoryId, listPage }) {
  if (pageType === GRID) {
    showGridPage(pageMode, gridPage);
  } else {
    showListPage(categoryId, listPage);
  }
}

function showContainer({ type, mode }) {
  let containerId = makeContainerId({ type, mode });
  const $container = qs(containerId);
  $container.style.display = "block";
}

function hideContainer({ type, mode }) {
  let containerId = makeContainerId({ type, mode });
  const $container = qs(containerId);
  $container.style.display = "none";
}

function makeContainerId({ type, mode }) {
  let containerId = "";
  if (type === GRID && mode === MODE_ALL) {
    containerId = "#mode_all_grid_container";
  } else if (type === GRID && mode === MODE_MY) {
    containerId = "#mode_my_grid_container";
  } else if (type === LIST && mode === MODE_ALL) {
    containerId = "#mode_all_list_container";
  } else if (type === LIST && mode === MODE_MY) {
    containerId = "#mode_my_list_container";
  }

  return containerId;
}

export function showGridPage(mode, page) {
  const hideAllGridPage = () => {
    const $gridPageList = qsa(".press_grid");
    [...$gridPageList].forEach(($girdPage) => {
      $girdPage.style.display = "none";
    });
  };
  const makeGridPageId = () => {
    let gridPageID = "#";
    if (mode === MODE_ALL) {
      gridPageID += "mode_all";
    } else {
      gridPageID += "mode_my";
    }
    gridPageID += `_grid_page_${page}`;
    return gridPageID;
  };

  hideAllGridPage();
  let gridPageID = makeGridPageId();
  const $gridPage = qs(gridPageID);
  $gridPage.style.display = "grid";
  controllButtonShowing();
}

export function showListPage(categoryId, page) {
  const hideAllListPage = () => {
    const $newsPageList = qsa(".news");
    [...$newsPageList].forEach(($newsPage) => {
      $newsPage.style.display = "none";
    });
  };

  hideAllListPage();
  const $targetNewsPage = qs(`.news_${parseInt(categoryId)}_${page}`);
  $targetNewsPage.style.display = "block";
  highlightCategoryItem();
}

export function updatePageCount() {
  const listPage = getState(listPageState);
  const categoryId = getState(categoryIdState);
  const $categoryItem = qs(`#category_${parseInt(categoryId)}`);
  const $nowPage = $categoryItem.querySelector(".now_page");
  $nowPage.innerHTML = listPage + 1;
}

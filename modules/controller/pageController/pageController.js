import { addObserver, getState, setState } from "../../store/observer.js";
import {
  GRID,
  LIST,
  MAX_CATEGORY_ID,
  MAX_GRID_PAGE,
  MAX_LIST_PAGE,
  MODE_ALL,
  MODE_MY,
  categoryIdState,
  gridPageState,
  listPageState,
  myGridPageState,
  myListPageState,
  pageModeState,
  pageTypeState,
} from "../../store/pageState.js";
import { myPressCntState, myPressListState } from "../../store/subState.js";
import { qs, qsa } from "../../utils.js";
import { highlightCategoryItem } from "../categoryController.js";
import { controllButtonShowing } from "./typeController.js";

export function addObserverOnGridPage() {
  addObserver(gridPageState, () => {
    const gridPage = getState(gridPageState);
    showModeAllGridPage(gridPage);
  });
  addObserver(myGridPageState, () => {
    const myGridPage = getState(myGridPageState);
    showModeMyGridPage(myGridPage);
  });
}

export function addObserverOnListPage() {
  addObserver(listPageState, controllPage);
  addObserver(myListPageState, controllPage);
}

export function controllPage() {
  const pageType = getState(pageTypeState);
  const pageMode = getState(pageModeState);

  // controll container
  hideContainer({ type: GRID, mode: MODE_ALL });
  hideContainer({ type: GRID, mode: MODE_MY });
  hideContainer({ type: LIST, mode: MODE_ALL });
  hideContainer({ type: LIST, mode: MODE_MY });
  showContainer({ type: pageType, mode: pageMode });

  showPage({
    pageMode,
    pageType,
  });
}

export function showPage({ pageMode, pageType }) {
  const modeAllGrid = pageType === GRID && pageMode === MODE_ALL;
  const modeMyGrid = pageType === GRID && pageMode === MODE_MY;
  const modeAllList = pageType === LIST && pageMode === MODE_ALL;
  const modeMyList = pageType === LIST && pageMode === MODE_MY;
  if (modeAllGrid) {
    const gridPage = getState(gridPageState);
    showModeAllGridPage(gridPage);
  } else if (modeMyGrid) {
    const myGridPage = getState(myGridPageState);
    showModeMyGridPage(myGridPage);
  } else if (modeAllList) {
    const listPage = getState(listPageState);
    const categoryId = getState(categoryIdState);
    showModeAllListPage(categoryId, listPage);
  } else if (modeMyList) {
    const myListPage = getState(myListPageState);
    const maxPage = getState(myPressCntState);

    showModeMyListPage(myListPage);
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

export function showModeAllGridPage(page) {
  let gridPageID = `#mode_all_grid_page_${page}`;

  hideAllGridPage();
  const $gridPage = qs(gridPageID);
  $gridPage.style.display = "grid";
  controllButtonShowing();
}

export function showModeMyGridPage(page) {
  let myGridPageID = `#mode_my_grid_page_${page}`;
  hideAllGridPage();
  const $myGridPage = qs(myGridPageID);
  $myGridPage.style.display = "grid";
  controllButtonShowing();
}

function hideAllGridPage() {
  const $gridPageList = qsa(".press_grid");
  [...$gridPageList].forEach(($girdPage) => {
    $girdPage.style.display = "none";
  });
}
export function showModeAllListPage(categoryId, page) {
  const $targetNewsPage = qs(`.news_${parseInt(categoryId)}_${page}`);
  hideAllListPage();
  $targetNewsPage.style.display = "block";
  updatePageCount();
  highlightCategoryItem();
}

export function showModeMyListPage(page) {
  const $targetNewsPage = qs(`.news_my${page}`);

  hideAllListPage();
  if ($targetNewsPage) {
    $targetNewsPage.style.display = "block";

    highlightCategoryItem();
  }
}

function hideAllListPage() {
  const $newsPageList = qsa(".news");
  [...$newsPageList].forEach(($newsPage) => {
    $newsPage.style.display = "none";
  });
}

export function updatePageCount() {
  const listPage = getState(listPageState);
  const categoryId = getState(categoryIdState);
  const $categoryItem = qs(`#category_${parseInt(categoryId)}`);
  const $nowPage = $categoryItem.querySelector(".now_page");
  $nowPage.innerHTML = listPage + 1;
}

export function setNextPageState({ pageMode, pageType }) {
  const modeAllGrid = pageType === GRID && pageMode === MODE_ALL;
  const modeMyGrid = pageType === GRID && pageMode === MODE_MY;
  const modeAllList = pageType === LIST && pageMode === MODE_ALL;
  const modeMyList = pageType === LIST && pageMode === MODE_MY;

  const nextPageObj = calcNextPage({ pageMode, pageType });

  if (modeAllGrid) {
    const { nextPage } = nextPageObj;
    setState(gridPageState, nextPage);
  } else if (modeMyGrid) {
    const { nextPage } = nextPageObj;
    setState(myGridPageState, nextPage);
  } else if (modeAllList) {
    const { nextCategoryId, nextPage } = nextPageObj;
    setState(categoryIdState, nextCategoryId);
    setState(listPageState, nextPage);
  } else if (modeMyList) {
    const { nextPage } = nextPageObj;
    setState(myListPageState, parseInt(nextPage));
  }
}

function calcNextPage({ pageType, pageMode }) {
  const modeAllGrid = pageType === GRID && pageMode === MODE_ALL;
  const modeMyGrid = pageType === GRID && pageMode === MODE_MY;
  const modeAllList = pageType === LIST && pageMode === MODE_ALL;
  const modeMyList = pageType === LIST && pageMode === MODE_MY;
  let nextPage;
  let nextCategoryId;

  if (modeAllGrid) {
    nextPage = Math.min(getState(gridPageState) + 1, MAX_GRID_PAGE - 1);
  } else if (modeMyGrid) {
    nextPage = Math.min(getState(myGridPageState) + 1, MAX_GRID_PAGE - 1);
  } else if (modeAllList) {
    const listPage = getState(listPageState);
    const categoryId = getState(categoryIdState);
    const isLastPage =
      listPage >= MAX_LIST_PAGE[categoryId] - 1 &&
      categoryId < MAX_CATEGORY_ID - 1;
    const isLastCategory =
      listPage >= MAX_LIST_PAGE[categoryId] - 1 &&
      categoryId >= MAX_CATEGORY_ID - 1;

    if (isLastPage) {
      nextCategoryId = categoryId + 1;
      nextPage = 0;
    } else if (isLastCategory) {
      nextCategoryId = 0;
      nextPage = 0;
    } else {
      nextCategoryId = categoryId;
      nextPage = listPage + 1;
    }
  } else if (modeMyList) {
    const myListPage = getState(myListPageState);
    const maxPage = getState(myPressCntState);
    if (myListPage >= maxPage - 1) {
      nextPage = 0;
    } else {
      nextPage = myListPage + 1;
    }
  }
  return { nextCategoryId, nextPage };
}

export function setPrevPageState({ pageMode, pageType }) {
  const modeAllGrid = pageType === GRID && pageMode === MODE_ALL;
  const modeMyGrid = pageType === GRID && pageMode === MODE_MY;
  const modeAllList = pageType === LIST && pageMode === MODE_ALL;
  const modeMyList = pageType === LIST && pageMode === MODE_MY;
  const prevPageObj = calcPrevPage({ pageMode, pageType });
  const { prevCategoryId, prevPage } = prevPageObj;

  if (modeAllGrid) {
    setState(gridPageState, prevPage);
  } else if (modeMyGrid) {
    setState(myGridPageState, prevPage);
  } else if (modeAllList) {
    setState(categoryIdState, prevCategoryId);
    setState(listPageState, prevPage);
  } else if (modeMyList) {
    setState(myListPageState, parseInt(prevPage));
  }
}

function calcPrevPage({ pageType, pageMode }) {
  const modeAllGrid = pageType === GRID && pageMode === MODE_ALL;
  const modeMyGrid = pageType === GRID && pageMode === MODE_MY;
  const modeAllList = pageType === LIST && pageMode === MODE_ALL;
  const modeMyList = pageType === LIST && pageMode === MODE_MY;
  let prevPage;
  let prevCategoryId;

  if (modeAllGrid) {
    prevPage = Math.max(getState(gridPageState) - 1, 0);
  } else if (modeMyGrid) {
    prevPage = Math.max(getState(myGridPageState) - 1, 0);
  } else if (modeAllList) {
    const categoryId = getState(categoryIdState);
    const listPage = getState(listPageState);
    const isFirtPage = listPage <= 0 && categoryId > 0;
    const isFirstCategory = categoryId <= 0 && listPage <= 0;

    if (isFirtPage) {
      prevCategoryId = categoryId - 1;
      prevPage = MAX_LIST_PAGE[categoryId - 1] - 1;
    } else if (isFirstCategory) {
      prevCategoryId = MAX_CATEGORY_ID - 1;
      prevPage = MAX_LIST_PAGE[categoryId] - 1;
    } else {
      prevCategoryId = categoryId;
      prevPage = listPage - 1;
    }
  } else if (modeMyList) {
    const myListPage = getState(myListPageState);
    const maxPage = getState(myPressCntState);
    myListPage <= 0 ? (prevPage = maxPage - 1) : (prevPage = myListPage - 1);
  }
  return { prevCategoryId, prevPage };
}

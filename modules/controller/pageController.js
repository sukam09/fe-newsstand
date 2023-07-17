import {
  highlightCategoryItem,
  updatePageCount,
} from "../components/mainSection/mainBody/content/pressList/category/categoryItem.js";
import {
  hideAllListPage,
  hideListContainer,
  showListContainer,
  showListPage,
} from "../components/mainSection/mainBody/content/pressList/pressList.js";
import { addObserver, getState, setState } from "../core/observer.js";
import {
  MAX_CATEGORY_ID,
  MAX_GRID_PAGE,
  MAX_LIST_PAGE,
  categoryId,
  setCategoryId,
} from "../state/pageState.js";
import {
  GRID,
  LIST,
  gridPageState,
  listPageState,
  pageTypeState,
} from "../state/pageState2.js";
import { qs, qsa } from "../utils.js";

const gridPage = getState(gridPageState);
const listPage = getState(listPageState);

export function addObserverOnPageType() {
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

export function addObserverOnGridPage() {
  addObserver(gridPageState, () => {
    showGridPage(getState(gridPageState));
  });
}
export function addObserverOnListPage() {
  addObserver(listPageState, () => {
    showListPage(listPage);
  });
}

export function showNextPage() {
  const type = getState(pageTypeState);

  switch (type) {
    case GRID:
      showNextGridPage();
      break;
    case LIST:
      showNextListPage();
      break;
    default:
      break;
  }
  controllButtonShowing();
}

export function showPrevPage() {
  const type = getState(pageTypeState);

  switch (type) {
    case GRID:
      showPrevGridPage();
      break;
    case LIST:
      showPrevListPage();
      break;
    default:
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
  } else if (categoryId <= 0 && listPage <= 0) {
    setCategoryId(MAX_CATEGORY_ID - 1);
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
    // 카테고리 마지막 페이지 일때,카테고리 이동
    listPage >= MAX_LIST_PAGE[categoryId] - 1 &&
    categoryId < MAX_CATEGORY_ID - 1
  ) {
    setCategoryId(categoryId + 1);
    setState(listPageState, 0);
    highlightCategoryItem();
  } else if (
    listPage >= MAX_LIST_PAGE[categoryId] - 1 &&
    categoryId >= MAX_CATEGORY_ID - 1
  ) {
    setCategoryId(0);
    setState(listPageState, 0);
    highlightCategoryItem();
  } else {
    setState(listPageState, listPage + 1);
  }
  updatePageCount();
  showListPage(categoryId, listPage);
}

function showNextGridPage() {
  hideGridPage(gridPage);
  setState(gridPageState, gridPage + 1);
  showGridPage(gridPage);
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

function showGridPage(page) {
  const $gridPages = qsa(".press_grid");
  [...$gridPages].forEach((grid) => {
    grid.style.display = "none";
  });

  const targetGrid = document.getElementById(`grid_page_${page}`);
  targetGrid.style.display = "grid";
  controllButtonShowing();
}

function hideGridContainer() {
  const $gridContainer = qs("#grid_container");
  $gridContainer.style.display = "none";
}
function showGridContainer() {
  const $gridContainer = qs("#grid_container");
  $gridContainer.style.display = "block";
}

import { ENTIRE, GRID, LIST } from "../constant.js";
import { updateCategory } from "../view/field.js";
import { renderGrid, gridPageMove } from "../view/grid.js";
import { renderList, updateList } from "../view/list.js";
import { renderPageButton } from "../view/pageButton.js";
import { renderPressFilterTab } from "../view/pressFilterTabs.js";
import { renderViewButton } from "../view/viewButton.js";

export const GRID_PAGE = {
  page: 0,
  setPage: (page) => {
    GRID_PAGE.page = page;
    gridPageMove();
    renderPageButton();
  },
};
export const LIST_PAGE = {
  page: 0,
  category: 0,
  setPage: (page) => {
    LIST_PAGE.page = page;
    updateList();
  },
  setCategory: (category, prevCateLength) => {
    LIST_PAGE.category = category;
    updateCategory();
    LIST_PAGE.setPage(prevCateLength ? prevCateLength - 1 : 0);
  },
};

export const VIEW = {
  layout: GRID,
  tab: ENTIRE,
  isDark: false,
  setLayout: (layout, autoMoveSubscribePage = false) => {
    VIEW.layout = layout;
    renderViewButton(VIEW.layout);
    renderPageButton();
    if (VIEW.layout === GRID) {
      GRID_PAGE.page = 0;
      renderGrid();
    } else {
      if (!autoMoveSubscribePage) LIST_PAGE.category = 0;
      renderList();
    }
  },
  setTab: (tab, autoMoveSubscribePage = false) => {
    VIEW.tab = tab;
    renderPressFilterTab(VIEW.tab);
    if (VIEW.tab === ENTIRE) {
      VIEW.setLayout(GRID);
    } else {
      VIEW.setLayout(LIST, autoMoveSubscribePage);
    }
  },
  setDark: () => {
    VIEW.isDark = !VIEW.isDark;
    if (VIEW.layout === GRID) {
      gridPageMove();
    } else {
      updateList();
    }
  },
};

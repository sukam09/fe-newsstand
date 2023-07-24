import { updateCategory, updateField } from "../view/field.js";
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
    updateField();
  },
  setCategory: (category, prevCateLength) => {
    LIST_PAGE.category = category;
    updateCategory();
    LIST_PAGE.setPage(prevCateLength ? prevCateLength - 1 : 0);
  },
};

export const VIEW = {
  layout: "grid",
  tab: "entire",
  setLayout: (layout, changeSubscribeView = false) => {
    VIEW.layout = layout;
    renderViewButton(VIEW.layout);
    renderPageButton();
    if (VIEW.layout === "grid") {
      renderGrid();
    } else {
      renderList();
    }
  },
  setTab: (tab) => {
    VIEW.tab = tab;
    renderPressFilterTab(VIEW.tab);
    if (VIEW.tab === "entire") {
      VIEW.setLayout("grid");
    } else {
      VIEW.setLayout("list");
    }
  },
};

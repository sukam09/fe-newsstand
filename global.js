import { printGrid, updateGrid } from "./module/view/GridView.js";
import { changePageInfo, changeCategory, changePressNewsSection } from "./module/view/ListView/Actions/ChangePress.js";

// 리스트뷰 현재 페이지 & 현재 카테고리
export const LIST_PAGE = {
  CURRENT_PAGE: 1,
  CURRENT_CATEGORY: 0,
  // ENTIRE_PAGE: 20,
  setPage: (page) => {
    LIST_PAGE.CURRENT_PAGE = page;
    // 부분 렌더링
    changePageInfo();
    changePressNewsSection();
  },
  setCategory: (category) => {
    LIST_PAGE.CURRENT_CATEGORY = category;
    // 부분 렌더링
    changeCategory();
  },
};

// 그리드뷰 현재 페이지
export const GRID_PAGE = {
  CURRENT_PAGE: 0,
  setState: (page) => {
    GRID_PAGE.CURRENT_PAGE = page;
    // 부분 렌더링
    updateGrid();
  },
};

export const SUBSCRIBE_VIEW = {
  CURRENT_VIEW: false,
  changeView: (view) => {
    if (SUBSCRIBE_VIEW.CURRENT_VIEW !== view) {
      SUBSCRIBE_VIEW.CURRENT_VIEW = view;
      printGrid();
    } else {
      GRID_PAGE.setState(0);
    }
  },
};

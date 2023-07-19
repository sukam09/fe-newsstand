import { printGrid, updateGrid } from "./module/view/GridView.js";
import { changePageInfo, changeCategory, changePressNewsSection } from "./module/view/ListView/Actions/ChangePress.js";
import { GRID, LIST } from "./module/components/LayoutBtn.js";
import { printList } from "./module/view/ListView/ListView.js";
import { btnColorChange } from "./module/components/LayoutBtn.js";

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

export const VIEW_MODE = {
  CURRENT_LAYOUT: GRID,
  CURRENT_TAB: "ENTIRE",
  changeTab: (TAB) => {
    VIEW_MODE.CURRENT_TAB = TAB;
    if (VIEW_MODE.CURRENT_TAB === ENTIRE) {
      VIEW_MODE.CURRENT_LAYOUT = GRID;
      printGrid();
    } else {
      VIEW_MODE.CURRENT_LAYOUT = LIST;
      printList();
    }
    btnColorChange();
  },
};
const ENTIRE = "ENTIRE",
  SUBSCRIBE = "SUBSCRIBE";

export { ENTIRE, SUBSCRIBE };

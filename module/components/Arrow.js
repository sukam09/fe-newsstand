import { updateGrid } from "../view/GridView.js";
import { VIEW } from "../ViewStyle.js";
import { pageMoveByBtn, categoryLength } from "../view/ListView.js";

export let current_grid_page = 0;
export const LIST_PAGE = {
  current_list_page: 1,
  LIST_ENTIRE_PAGE: 20,
};

export const RIGHT = 1;
export const LEFT = 0;

const GRID_ENTIRE_PAGE = 3;

const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");
right_btn.addEventListener("click", () => arrowBtnClickHandler(RIGHT));
left_btn.addEventListener("click", () => arrowBtnClickHandler(LEFT));

function arrowBtnClickHandler(dir) {
  const CURRENT_VIEW = VIEW.CURRENT_VIEW_MODE;
  //그리드 뷰
  if (CURRENT_VIEW == VIEW.GRID) {
    if (dir === RIGHT) {
      current_grid_page++;
    } else {
      current_grid_page--;
    }
    if (current_grid_page === 0) {
      left_btn.style.display = "none";
      right_btn.style.display = "block";
    } else if (current_grid_page === GRID_ENTIRE_PAGE) {
      right_btn.style.display = "none";
      left_btn.style.display = "block";
    } else {
      right_btn.style.display = "block";
      left_btn.style.display = "block";
    }
    updateGrid();
  }
  //리스트뷰
  else if (CURRENT_VIEW == VIEW.LIST) {
    if (dir === RIGHT) {
      LIST_PAGE.current_list_page++;
    } else {
      LIST_PAGE.current_list_page--;
    }
    const CURRENT_CATEGORY = pageMoveByBtn(LIST_PAGE.current_list_page);

    listViewBtnVisibilitySet(LIST_PAGE.current_list_page, CURRENT_CATEGORY);
  }
}

function listViewBtnVisibilitySet(CURRENT_PAGE, CURRENT_CATEGORY) {
  if (CURRENT_PAGE === 1 && CURRENT_CATEGORY === 0) {
    left_btn.style.display = "none";
    right_btn.style.display = "block";
  } else if (CURRENT_PAGE === categoryLength[CURRENT_CATEGORY] && CURRENT_CATEGORY === categoryLength.length - 1) {
    right_btn.style.display = "none";
    left_btn.style.display = "block";
  } else {
    right_btn.style.display = "block";
    left_btn.style.display = "block";
  }
}

export function ArrowBtnStateChange(disabledDirection) {
  if (disabledDirection === LEFT) {
    left_btn.style.display = "none";
    right_btn.style.display = "block";
  } else if (disabledDirection === RIGHT) {
    left_btn.style.display = "block";
    right_btn.style.display = "none";
  } else {
    right_btn.style.display = "block";
    left_btn.style.display = "block";
  }
}

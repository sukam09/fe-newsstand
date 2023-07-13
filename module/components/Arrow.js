import { updateGrid } from "../view/GridView.js";
import { VIEW } from "../ViewStyle.js";
import { pageMoveByBtn } from "../view/ListView.js";

export let current_grid_page = 0;
export const LIST_PAGE = {
  current_list_page: 1,
  LIST_ENTIRE_PAGE: 20,
};

const RIGHT = 1;
const LEFT = 0;

const GRID_ENTIRE_PAGE = 3;

const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");
right_btn.addEventListener("click", () => movePage(RIGHT));
left_btn.addEventListener("click", () => movePage(LEFT));

function movePage(dir) {
  const CURRENT_VIEW = VIEW.CURRENT_VIEW_MODE;

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
  } else if (CURRENT_VIEW == VIEW.LIST) {
    if (dir === RIGHT) {
      LIST_PAGE.current_list_page++;
    } else {
      LIST_PAGE.current_list_page--;
    }
    const CURRENT_CATEGORY = pageMoveByBtn(LIST_PAGE.current_list_page);

    if (LIST_PAGE.current_list_page === 1 && CURRENT_CATEGORY === 0) {
      left_btn.style.display = "none";
      right_btn.style.display = "block";
    } else if (LIST_PAGE.current_list_page === LIST_PAGE.LIST_ENTIRE_PAGE) {
      right_btn.style.display = "none";
      left_btn.style.display = "block";
    } else {
      right_btn.style.display = "block";
      left_btn.style.display = "block";
    }
  }
}

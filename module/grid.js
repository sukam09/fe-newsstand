import { fetchNewsIconData } from "./api.js";

const RIGHT = 1;
const LEFT = 0;
const GRID_ROW_NUM = 4;
const GRID_COL_NUM = 6;
const GIRD_NEWS_NUM = GRID_ROW_NUM * GRID_COL_NUM;
const GRID_MAX_PAGE = 3;
const GRID_MIN_PAGE = 0;

let current_grid_page = 0;
let news_icon;
const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");

async function printGrid() {
  try {
    news_icon = await fetchNewsIconData();
    const grid = document.querySelector(".grid");
    let icon_idx = current_grid_page * GIRD_NEWS_NUM;
    for (let i = 0; i < GRID_ROW_NUM; i++) {
      const grid_row = document.createElement("ul");
      grid_row.className = "grid-row";
      for (let j = 0; j < GRID_COL_NUM; j++) {
        const grid_li = document.createElement("li");
        const press_logo = document.createElement("img");
        press_logo.className = "press-logo";

        press_logo.src = news_icon[icon_idx++].path;

        grid_li.appendChild(press_logo);
        grid_row.appendChild(grid_li);
      }
      grid.appendChild(grid_row);
      updateGrid();
    }
  } catch (e) {
    console.error(e);
  }
}

function updateGrid() {
  try {
    if (news_icon) {
      let icon_idx = current_grid_page * GIRD_NEWS_NUM;
      const grid_row = document.querySelectorAll(".grid ul");

      grid_row.forEach((ul, index) => {
        const grid_li = ul.querySelectorAll("li");
        grid_li.forEach((li) => {
          const press_logo = li.querySelector(".press-logo");
          press_logo.src = news_icon[icon_idx++].path;
        });
      });
    } else {
      throw "empty data!";
    }
  } catch (e) {
    console.log(e);
  }
}

function moveGrid(dir) {
  if (dir === RIGHT) {
    current_grid_page++;
  } else {
    current_grid_page--;
  }
  if (current_grid_page === GRID_MIN_PAGE) {
    left_btn.style.display = "none";
    right_btn.style.display = "block";
  } else if (current_grid_page === GRID_MAX_PAGE) {
    right_btn.style.display = "none";
    left_btn.style.display = "block";
  } else {
    right_btn.style.display = "block";
    left_btn.style.display = "block";
  }
  updateGrid();
}

export { right_btn, left_btn, printGrid, moveGrid };

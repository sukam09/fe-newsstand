import { fetchNewsIconData } from "./api.js";
import { GRID } from "./variable.js";

let current_grid_page = 0;
let news_icon;
const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");

async function initGrid() {
  try {
    news_icon = await fetchNewsIconData();
    const grid = document.querySelector(".grid");
    let icon_idx = current_grid_page * GRID.NEWS_NUM;
    for (let i = 0; i < GRID.ROW_NUM; i++) {
      const grid_row = document.createElement("ul");
      grid_row.className = "grid-row";
      for (let j = 0; j < GRID.COL_NUM; j++) {
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
      let icon_idx = current_grid_page * GRID.NEWS_NUM;
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

function moveGrid(pageDir) {
  current_grid_page += pageDir;
  if (current_grid_page === GRID.MIN_PAGE) {
    left_btn.style.display = "none";
    right_btn.style.display = "block";
  } else if (current_grid_page === GRID.MAX_PAGE) {
    right_btn.style.display = "none";
    left_btn.style.display = "block";
  } else {
    right_btn.style.display = "block";
    left_btn.style.display = "block";
  }
  updateGrid();
}

export { initGrid, moveGrid };

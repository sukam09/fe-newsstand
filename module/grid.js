import { fetchNewsData } from "./api.js";
import { GRID, GLOBAL } from "./variable.js";
import { setListNews } from "./list.js";

async function initGrid() {
  try {
    GLOBAL.news_data = await fetchNewsData();
    let icon_idx = GLOBAL.grid_cur_page * GRID.NEWS_NUM;
    for (let i = 0; i < GRID.ROW_NUM; i++) {
      const grid_row = document.createElement("ul");
      grid_row.className = "grid-row";
      for (let j = 0; j < GRID.COL_NUM; j++) {
        const grid_li = document.createElement("li");
        const press_logo = document.createElement("img");
        press_logo.className = "press-logo";

        press_logo.src = GLOBAL.news_data[icon_idx++].path;

        grid_li.appendChild(press_logo);
        grid_row.appendChild(grid_li);
      }
      GLOBAL.DOM.grid_view.appendChild(grid_row);
      updateGrid();
    }
    setListNews(0);
  } catch (e) {
    console.error(e);
  }
}

function updateGrid() {
  try {
    if (GLOBAL.news_data) {
      let icon_idx = GLOBAL.grid_cur_page * GRID.NEWS_NUM;
      const grid_row = document.querySelectorAll(".grid ul");

      grid_row.forEach((ul, index) => {
        const grid_li = ul.querySelectorAll("li");
        grid_li.forEach((li) => {
          const press_logo = li.querySelector(".press-logo");
          press_logo.src = GLOBAL.news_data[icon_idx++].path;
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
  GLOBAL.grid_cur_page += pageDir;
  if (GLOBAL.grid_cur_page === GRID.MIN_PAGE) {
    GLOBAL.DOM.left_btn.style.display = "none";
    GLOBAL.DOM.right_btn.style.display = "block";
  } else if (GLOBAL.grid_cur_page === GRID.MAX_PAGE) {
    GLOBAL.DOM.right_btn.style.display = "none";
    GLOBAL.DOM.left_btn.style.display = "block";
  } else {
    GLOBAL.DOM.right_btn.style.display = "block";
    GLOBAL.DOM.left_btn.style.display = "block";
  }
  updateGrid();
}

export { initGrid, moveGrid };

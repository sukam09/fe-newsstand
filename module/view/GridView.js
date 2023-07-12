import { fetchPressData } from "../../api.js";
import { current_grid_page } from "../components/Arrow.js";

let news_icon;
const ICONS_PER_PAGE = 24;

export function updateGrid() {
  try {
    if (news_icon) {
      let icon_idx = current_grid_page * ICONS_PER_PAGE;
      const grid_row = document.querySelectorAll(".grid ul");

      grid_row.forEach((ul) => {
        const grid_li = ul.querySelectorAll("li");
        grid_li.forEach((li) => {
          const press_logo = li.querySelector(".press-logo");
          press_logo.src = news_icon[icon_idx++].path;
        });
      });
    } else {
      throw Error("empty data!");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function printGrid() {
  try {
    news_icon = await fetchPressData("./Data/grid_icon.json");
    const grid = document.querySelector(".grid");
    let icon_idx = current_grid_page * ICONS_PER_PAGE;
    for (let i = 0; i < 4; i++) {
      const grid_row = document.createElement("ul");
      grid_row.className = "grid-row";
      for (let j = 0; j < 6; j++) {
        const grid_li = document.createElement("li");
        const press_logo = document.createElement("img");
        press_logo.className = "press-logo";

        //수정한 부분
        if (news_icon.length > icon_idx) press_logo.src = news_icon[icon_idx++].path;

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

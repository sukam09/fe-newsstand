import { fetchNews } from "../../api.js";
import { subscribeButton } from "../controller/Components/subscribeButton.js";
import { GRID_PAGE, VIEW } from "../model/global.js";
import { shuffle_press } from "../util/shuffle.js";
import { store } from "../model/store.js";

export let news_data;
const GRID_ROW = 4;
const GRID_COL = 6;
const ICONS_PER_PAGE = 24;

export function gridPageMove() {
  try {
    if (news_data) {
      let icon_idx = GRID_PAGE.page * ICONS_PER_PAGE;
      const grid_row = document.querySelectorAll(".grid ul");
      grid_row.forEach((ul) => {
        const grid_li = ul.querySelectorAll("li");
        grid_li.forEach((li) => {
          const press_logo = li.querySelector(".press-logo");
          if (icon_idx < news_data.length) {
            const ID = news_data[icon_idx].ID;
            li.setAttribute("data-id", ID);
            press_logo.src = `../../asset/icons/basic/${news_data[icon_idx++].path}`;
          } else {
            li.setAttribute("data-id", null);
            press_logo.src = "";
          }
        });
      });
    } else {
      throw Error("empty data!");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function renderGrid() {
  const grid = document.querySelector("main");
  grid.className = "grid";
  grid.innerHTML = ``;

  try {
    if (VIEW.tab === "entire") {
      news_data = await fetchNews("../../Data/news_list.json");
      news_data = shuffle_press(news_data);
    } else {
      news_data = store.getSubscribe();
    }
    GRID_PAGE.setPage(0);
    let icon_idx = GRID_PAGE.page * ICONS_PER_PAGE;

    for (let i = 0; i < GRID_ROW; i++) {
      const grid_row = document.createElement("ul");
      grid_row.className = "grid-row";
      for (let j = 0; j < GRID_COL; j++) {
        const grid_li = document.createElement("li");
        const press_logo = document.createElement("img");
        press_logo.className = "press-logo";

        if (icon_idx < news_data.length) {
          grid_li.setAttribute("data-id", news_data[icon_idx].ID);
          press_logo.src = `../../asset/icons/basic/${news_data[icon_idx++].path}`;
          subscribeButton(grid_li);
        }

        grid_li.appendChild(press_logo);
        grid_row.appendChild(grid_li);
      }
      grid.appendChild(grid_row);
    }
  } catch (e) {
    console.error(e);
  }
}
console.log("그리드뷰");
// store.subscribe(renderGrid, "unsubscribe", "grid");

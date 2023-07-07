import { fetchData } from "./api.js";

let current_grid_page = 0;
let news_icon;

function updateGrid() {
  try {
    if (news_icon) {
      let icon_idx = current_grid_page * 24;
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

async function printGrid() {
  try {
    news_icon = await fetchData();
    const grid = document.querySelector(".grid");
    let icon_idx = current_grid_page * 24;
    for (let i = 0; i < 4; i++) {
      const grid_row = document.createElement("ul");
      grid_row.className = "grid-row";
      for (let j = 0; j < 6; j++) {
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
printGrid();
initDate();

const RIGHT = 1;
const LEFT = 0;

const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");
right_btn.addEventListener("click", () => moveGrid(RIGHT));
left_btn.addEventListener("click", () => moveGrid(LEFT));

function moveGrid(dir) {
  if (dir === RIGHT) {
    current_grid_page++;
  } else {
    current_grid_page--;
  }
  if (current_grid_page === 0) {
    left_btn.style.display = "none";
    right_btn.style.display = "block";
  } else if (current_grid_page === 3) {
    right_btn.style.display = "none";
    left_btn.style.display = "block";
  } else {
    right_btn.style.display = "block";
    left_btn.style.display = "block";
  }
  updateGrid();
}

function initDate() {
  const date = new Date();
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const todaystr = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}. ${week[date.getDay()]}`;
  document.querySelector(".today").innerHTML = todaystr;
}

import { fetchData } from "./api.js";

// fetch("./Data/grid_icon.json") //json파일 읽어오기
//   .then((response) => response.json()) //읽어온 데이터를 json으로 변환
//   .then((json) => {
//     console.log(json);
//   });

// 그리드 PRESS ICON 요소 생성

let current_grid_page = 0;

async function printGrid() {
  try {
    const news_icon = await fetchData();
    console.log(news_icon);
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
    }
  } catch (e) {
    console.error(e);
  }
}
printGrid();

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

  printGrid();
}

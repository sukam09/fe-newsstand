//const grid_icon = require("./api.js")

// 그리드 PRESS ICON 요소 생성
const grid = document.querySelector(".grid");
let icon_idx = 0;
for (let i = 0; i < 4; i++) {
  const grid_row = document.createElement("ul");
  grid_row.className = "grid-row";
  for (let j = 0; j < 6; j++) {
    const grid_li = document.createElement("li");
    const press_logo = document.createElement("img");
    press_logo.className = "press-logo";
    //press_logo.src=grid_icon.path;
    grid_li.appendChild(press_logo);
    grid_row.appendChild(grid_li);
  }
  grid.appendChild(grid_row);
}

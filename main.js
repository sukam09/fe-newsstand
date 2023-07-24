import { initDate } from "./src/util/data.js";
import { RollingRender } from "./src/view/rolling.js";
import { renderGrid } from "./src/view/grid.js";
import { controller } from "./src/controller/controlIndex.js";

function main() {
  initDate(); // 오늘 날짜
  RollingRender(); // 롤링

  //컨트롤
  controller();
  renderGrid();
}

main();

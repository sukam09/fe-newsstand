import { initDate } from "./src/util/date.js";
import { RollingRender } from "./src/view/rolling.js";
import { controller } from "./src/controller/controlIndex.js";
import { renderGrid } from "./src/view/grid.js";

function main() {
  initDate(); // 오늘 날짜
  RollingRender(); // 롤링

  //컨트롤
  controller();

  //뷰
  renderGrid();
}

main();

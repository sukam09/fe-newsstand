import { RollingRender } from "./module/components/Rolling.js";
import { printGrid } from "./module/view/GridView.js";
import { initDate } from "./module/utility/Date.js";
import { PressFilterTab } from "./module/components/PressFilterTab.js";
import SelectViewStyle from "./module/components/LayoutBtn.js";
import { BtnEventHandlerRegister } from "./module/components/Arrow.js";
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

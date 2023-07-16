import { RollingRender } from "./module/components/Rolling.js";
import { printGrid } from "./module/view/GridView.js";
import { initDate } from "./module/utility/Date.js";
import SelectViewStyle from "./module/ViewStyle.js";

function main() {
  initDate(); // 오늘 날짜
  RollingRender(); // 롤링
  printGrid(); // 그리드뷰
  SelectViewStyle(); // 뷰 선택
}

main();

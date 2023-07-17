import { RollingRender } from "./module/components/Rolling.js";
import { printGrid } from "./module/view/GridView.js";
import { initDate } from "./module/utility/Date.js";
import { PressFilterTab } from "./module/components/PressFilterTab.js";
import SelectViewStyle from "./module/components/LayoutBtn.js";
import { BtnEventHandlerRegister } from "./module/components/Arrow.js";

function main() {
  initDate(); // 오늘 날짜
  RollingRender(); // 롤링
  PressFilterTab(); // 전체언론사 / 구독 언론시
  BtnEventHandlerRegister(); //좌우 버튼
  SelectViewStyle(); // 뷰 선택
  printGrid(); // 그리드뷰
}

main();

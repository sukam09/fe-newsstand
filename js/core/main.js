import { paintGridNewsstand } from "../newsstand/newsstandGrid.js";
import { paintSubView } from "../newsstand/newsRolling.js";
import { newsstandListTab } from "../newsstand/newsstandTab.js";

export function renderMain() {
  // 뉴스 롤링
  paintSubView();

  // 뉴스 그리드
  paintGridNewsstand();

  //뉴스스탠드 리스트 탭 전환
  newsstandListTab();
}

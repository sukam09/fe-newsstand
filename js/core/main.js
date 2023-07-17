import { paintGridNewsstand } from "../newsstand/newsstandGrid.js";
import { paintSubView } from "../newsstand/newsRolling.js";
import { newsstandListTab } from "../newsstand/newsstandTab.js";
import { paintNewsCategory } from "../newsstand/newsCategory.js";

export function renderMain() {
  // 뉴스 롤링
  paintSubView();

  // 뉴스 그리드
  paintGridNewsstand();

  // 카테고리
  paintNewsCategory();

  //뉴스스탠드 리스트 탭 전환
  newsstandListTab();
}

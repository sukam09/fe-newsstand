import { paintGridNewsstand } from "../newsstand/newsstandGrid.js";
import { paintSubView } from "../newsstand/subView.js";
import { paintSubViewRight } from "../newsstand/subviewRight.js";
import { newsstandListTab } from "../newsstand/newsstandTab.js";
import { paintNewsCategory } from "../newsstand/newsCategory.js";

export function renderMain() {
  // 뉴스 롤링
  paintSubView();
  paintSubViewRight();

  // 뉴스 그리드
  paintGridNewsstand();

  //뉴스스탠드 리스트 탭 전환
  newsstandListTab();

  // 카테고리
  paintNewsCategory();
}

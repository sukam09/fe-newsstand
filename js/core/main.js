import { paintGridNewsstand } from "../newsstand/newsstandGrid.js";
import { paintSubView } from "../newsstand/subView.js";
import { paintSubViewRight } from "../newsstand/subviewRight.js";
import { newsstandListTab } from "../newsstand/newsstandTab.js";
import { paintNewsCategory } from "../newsstand/newsCategory.js";
import { navTag } from "../tag/mediaNavTag.js";

export function renderMain() {
  // newsstand__media-nav 탭 태그 생성.
  navTag();

  // 뉴스 롤링
  paintSubView();
  paintSubViewRight();

  // 뉴스 그리드
  paintGridNewsstand();

  // 카테고리
  paintNewsCategory();

  //뉴스스탠드 리스트 탭 전환
  newsstandListTab();
}

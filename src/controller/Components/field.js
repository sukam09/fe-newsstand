import { LIST_PAGE } from "../../model/global.js";
import { prevProgressWidthChange } from "../../view/field.js";
import { timerId, startTimer } from "../timer.js";

function categoryClickEventHandler(index) {
  if (timerId) {
    clearInterval(timerId);
  }

  //기존 프로그래스바 해제
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  prevProgressWidthChange(progressTab);

  //페이지 & 카테고리 변수 세팅
  LIST_PAGE.setCategory(index);

  startTimer();
}

export function fieldClick() {
  const tabs = document.querySelectorAll("main .news-list-wrap .each-tab");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", categoryClickEventHandler.bind(this, index));
  });
}

export function fieldXScroll() {
  const field = document.querySelector("main .news-list-wrap .field-tab");
  field.addEventListener("mousewheel", (e) => {
    e.preventDefault;
    const scrollAmount = e.deltaY;
    field.scrollLeft += scrollAmount;

    if (field.scrollLeft <= 0) {
      field.scrollLeft = 0;
    } else if (field.scrollLeft >= field.scrollWidth - field.clientWidth) {
      //스크롤 위치가 가로 스크롤의 전체 가로 길이(field.scrollWidth)에서 보이는 영역의 가로 길이(field.clientWidth)를 뺀 값 이상일 때
      //이 경우에는 스크롤을 더 이상 오른쪽으로 움직일 수 없으므로, 스크롤을 오른쪽 끝에 고정
      field.scrollLeft = field.scrollWidth - field.clientWidth;
    }
  });
}

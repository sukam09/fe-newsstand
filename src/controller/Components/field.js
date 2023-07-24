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

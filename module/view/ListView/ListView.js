import { fetchCategoryNews } from "../../../api.js";
import { createListElement, createPressNewsSection } from "./Actions/CreateElement.js";
import { timerId, startTimer } from "./Timer.js";
import { prevProgressWidthChange } from "./Actions/ChangeTabStyle.js";
import { LIST_PAGE } from "../../../global.js";

export const categoryLength = [];

export let news_data;

//뉴스 데이터 패치 -> 탭 정보(언론사 개수 초기화) -> 언론사 뉴스 html 요소 생성 및 초기화
async function fetchCategoryNewsData() {
  try {
    news_data = await fetchCategoryNews("../Data/category_news.json");
    createPressNewsSection(news_data);
    fieldInit();
  } catch (e) {
    console.error(e);
  }
}

async function fieldInit() {
  categoryLength.length = 0;
  news_data.forEach((data) => {
    categoryLength.push(data.press.length);
  });

  //전역변수 초기화
  LIST_PAGE.setCategory(0);
  LIST_PAGE.setPage(1);

  startTimer(categoryLength, news_data);
}

export function TimerReset() {
  //타이머 취소 후 다시 실행
  clearInterval(timerId);
  startTimer(categoryLength, news_data);
}
function categoryClickEventHandler(index) {
  //기존 프로그래스바 해제
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  prevProgressWidthChange(progressTab);

  //페이지 & 카테고리 변수 세팅
  LIST_PAGE.setCategory(index);
  LIST_PAGE.setPage(1);

  TimerReset();
}
function tabClickEventRegister() {
  const tabs = document.querySelectorAll("main .news-list-wrap .each-tab");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", categoryClickEventHandler.bind(this, index));
  });
}

export function printList() {
  //HTML 요소 생성
  createListElement();

  //카테고리 탭 클릭 이벤트
  tabClickEventRegister();

  //데이터 패치 및 세팅 초기화
  fetchCategoryNewsData();

  //

  const left_btn = document.querySelector(".left-btn");
  left_btn.style.display = "block";
}

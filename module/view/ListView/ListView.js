import { fetchCategoryNews } from "../../../api.js";
import { createListElement, createPressNewsSection } from "./Actions/CreateElement.js";
import { timerId, startTimer } from "./Timer.js";
import { prevProgressWidthChange } from "./Actions/ChangeTabStyle.js";
import { changeCategory, changePageInfo } from "./Actions/ChangePress.js";
import { LIST_PAGE } from "../../components/Arrow.js";

export const categoryLength = [];
export const listState = {
  CURRENT_PAGE: null,
  CURRENT_CATEGORY: 0,
};
export const setPage = (page) => {
  listState.CURRENT_PAGE = page;
};
export const setCategory = (categoryIndex) => {
  listState.CURRENT_CATEGORY = categoryIndex;
};

let news_data;

//뉴스 데이터 패치 -> 탭 정보(언론사 개수 초기화) -> 언론사 뉴스 html 요소 생성 및 초기화
async function fetchCategoryNewsData() {
  try {
    news_data = await fetchCategoryNews("../Data/category_news.json");
    fieldInit();
    createPressNewsSection(news_data);
  } catch (e) {
    console.error(e);
  }
}

/**
 * 첫 리스트 뷰 로딩 - 처음 데이터로 구성
 * 첫 프로그래스 바 셋팅 - 1. 현재페이지/페이지 개수, 2. width
 */
async function fieldInit() {
  //전역변수 초기화
  setCategory(0);
  LIST_PAGE.current_list_page = 1;

  //각 카테고리 별  언론사 개수 초기화
  categoryLength.length = 0;
  news_data.forEach((data) => {
    categoryLength.push(data.press.length);
  });

  // 첫번째 카테고리 데이터 초기화
  const firstTab = document.querySelector("main .news-list-wrap .progress-tab");
  const firstTabNumber = firstTab.querySelector(".text-category-number");
  firstTabNumber.querySelector(".present").innerHTML = `${listState.CURRENT_PAGE} / `;
  firstTabNumber.querySelector(".entire").innerHTML = ` ${categoryLength[0]}`;

  //타이머 시작
  startTimer(categoryLength, news_data, listState);
}

/**
 * 프로그래스바 및 타이머 초기화
 */
function tabsAndTimerChange() {
  //기존 프로그래스바 해제
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  prevProgressWidthChange(progressTab);

  //새 프로그래스바 지정 및 내용 업데이트 후 프로그래스바 정보 셋팅
  changeCategory(news_data, listState, categoryLength);
  changePageInfo(listState);

  //타이머 취소 후 다시 실행
  clearInterval(timerId);
  startTimer(categoryLength, news_data, listState);
}

/**
 * <카테고리 변경 : 클릭>
 * 현재 페이지 1로 초기화
 * 현재 카테고리 인텍스 변경
 * 프로그래스바 및 타이머 초기화
 */
function categoryClickEventHandler(index) {
  //페이지 & 카테고리 변수 세팅
  setCategory(index);
  setPage(1);
  LIST_PAGE.current_list_page = 1;

  tabsAndTimerChange();
}

function tabClickEventRegister() {
  const tabs = document.querySelectorAll("main .news-list-wrap .each-tab");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", categoryClickEventHandler.bind(this, index));
  });
}

/**
 * <카테고리 변경 : 화살표 버튼>
 * Arrow.js에서 현재 리스트뷰에 페이지 정보를 받아서 CURRENT_PAGE 변수 업데이트
 * 다른 카테고리로 넘어갈 경우 페이지 초기화 및 카테고리 변경
 * 프로그래스바 및 타이머 초기화
 */

export function pageMoveByBtn(current_list_page) {
  setPage(current_list_page);

  if (listState.CURRENT_PAGE === 0) {
    setCategory(--listState.CURRENT_CATEGORY);
    if (listState.CURRENT_CATEGORY === -1) {
      setCategory(categoryLength.length - 1);
    }
    setPage(categoryLength[listState.CURRENT_CATEGORY]);
    LIST_PAGE.current_list_page = listState.CURRENT_PAGE;
  } else if (listState.CURRENT_PAGE === news_data[listState.CURRENT_CATEGORY].press.length + 1) {
    setCategory(++listState.CURRENT_CATEGORY);
    setPage(1);
    LIST_PAGE.current_list_page = 1;
    if (listState.CURRENT_CATEGORY === categoryLength.length) {
      setCategory(0);
    }
  }

  tabsAndTimerChange();

  return listState.CURRENT_CATEGORY;
}

export function printList() {
  setPage(LIST_PAGE.current_list_page);

  //HTML 요소 생성
  createListElement();

  //카테고리 탭 클릭 이벤트
  tabClickEventRegister();

  //데이터 패치 및 세팅 초기화
  fetchCategoryNewsData();

  const left_btn = document.querySelector(".left-btn");
  left_btn.style.display = "block";
}

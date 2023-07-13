import { makeCategoryTag } from "../tag/categoryTag.js";

const dummyData = [1, 2, 3, 4, 5, 6, 7];
const ANIMATION_DURATION_TIME = 2;
const FIRST_CATEGORY = 0;

// 카테고리 태그 생성
makeCategoryTag();
const categoryList = Array.from(
  document.querySelectorAll(".newsstand__news-nav li")
);

export function paintNewsCategory() {
  categoryList.map((element, idx) => {
    element.addEventListener("click", (e) => {
      // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
      removeProgressAction();

      // 선택된 li에 프로그래스 바 추가.
      addProgressAction(idx % 7);
    });
  });
}

export function restartProgressBar() {
  // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
  removeProgressAction();

  // 종합/경제 카테고리 li에 클래스 추가.
  addProgressAction(FIRST_CATEGORY);
}

// 프로그래스 바 액션을 추가.

// 애니메이션 이벤트 추가
function addProgressAction(idx) {
  let nowCount = 1;
  const element = categoryList[idx];
  element.style.padding = 0; // 선택된 카테고리의 padding 제거
  element.classList.add("newsstand__focus");
  element.classList.add("newsstand__focus-font");
  element.children[0].classList.add("newsstand__progress"); // 첫번째 자식: 프로그래스 바
  element.children[1].classList.add("newsstand__progress-category"); // 두번째 자식: 카테고리 제목
  element.children[2].classList.add("newsstand__progress-total"); // 세번째 자식: 진행상황 (1/82)
  element.children[2].textContent = `${nowCount}/${dummyData[idx]}`;

  // animationIterationCount 속성을부여해 원하는 횟수만큼 프로그래스 바 진행.
  element.children[0].style.animationIterationCount = dummyData[idx];

  // 애니메이션이 진행중인 엘리먼트에 이벤트리스너를 만들어서 애니메이션 추적.
  element.children[0].addEventListener("animationstart", (e) => {
    // console.log(e);
  });
  element.children[0].addEventListener("animationiteration", (e) => {
    console.log(nowCount);
    ++nowCount;
    element.children[2].textContent = `${nowCount}/${dummyData[idx]}`;
  });
  element.children[0].addEventListener("animationend", (e) => {
    removeProgressAction(element);
    addProgressAction(++idx % 7);
  });
}
function removeProgressAction() {
  const prevSelected = Array.from(
    document.querySelectorAll(".newsstand__focus")
  );

  prevSelected.map((it) => {
    // it.classList.contains("")
    it.style.padding = "16px";
    it.classList.remove("newsstand__focus");
    it.classList.remove("newsstand__focus-font");
    it.children[0].classList.remove("newsstand__progress");
    it.children[1].classList.remove("newsstand__progress-category");
    it.children[2].classList.remove("newsstand__progress-total");
    it.children[2].textContent = "";

    // animationIterationCount 제거
    it.children[0].style.animationIterationCount = 0;
  });
}

import { makeCategoryTag } from "../tag/categoryTag.js";

const dummyData = [81, 29, 30, 12, 99, 51, 22];
let nowCount = 1;

// 카테고리 태그 생성
makeCategoryTag();
const categoryList = Array.from(
  document.querySelectorAll(".newsstand__news-nav li")
);

export function paintNewsCategory() {
  categoryList.map((element, idx) => {
    element.addEventListener("click", (e) => {
      // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
      const prevSelected = document.querySelector(".newsstand__focus");
      prevSelected ? removeProgressAction(prevSelected) : () => {};

      // 선택된 li에 프로그래스 바 추가.
      addProgressAction(element, idx);
    });
  });
}

export function restartProgressBar() {
  // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
  const prevSelected = document.querySelector(".newsstand__focus");
  prevSelected ? removeProgressAction(prevSelected) : () => {};

  // 선택된 li에 클래스 추가.
  const element = categoryList[0];
  addProgressAction(element);
}

function addProgressAction(element, idx = 0) {
  element.style.padding = 0; // 선택된 카테고리의 padding 제거
  element.classList.add("newsstand__focus");
  element.classList.add("newsstand__focus-font");
  element.children[0].classList.add("newsstand__progress"); // 첫번째 자식: 프로그래스 바
  element.children[1].classList.add("newsstand__progress-category"); // 두번째 자식: 카테고리 제목
  element.children[2].classList.add("newsstand__progress-total"); // 세번째 자식: 진행상황 (1/82)
  element.children[2].textContent = `${nowCount}/${dummyData[idx]}`;
}

function removeProgressAction(element) {
  element.style.padding = "16px";
  element.classList.remove("newsstand__focus");
  element.classList.remove("newsstand__focus-font");
  element.children[0].classList.remove("newsstand__progress");
  element.children[1].classList.remove("newsstand__progress-category");
  element.children[2].classList.remove("newsstand__progress-total");
  element.children[2].textContent = "";
}

import { CATEGORY_TAB_TIME } from "../constant/constants.js";
import { getNewsContents } from "./api.js";
import { getState, resister, setState } from "./observer/observer.js";
import { categoryIdx, listPageIdx } from "./store/store.js";
import { $ } from "./util.js";

// 프로그레스에 맞춘 탭 자동 넘김 Interval
let categoryInterval;

export function stopCategoryInterval() {
  clearInterval(categoryInterval);
}
export function startCategoryInterval() {
  categoryInterval = setInterval(() => {
    listPageUp();
  }, CATEGORY_TAB_TIME);
}

// 자동 탭 넘김 인터벌 새로고침
export function refreshInterval() {
  stopCategoryInterval();
  startCategoryInterval();
  updateCategoryTabNum();
}

export function setFirstListPage() {
  setState(listPageIdx, 1);
  setState(categoryIdx, 0);
}

// 카테고리 메뉴 클릭시 전환
function categoryClicked(item) {
  const targetOn = $(`#category${item.id}`);
  const targetOff = $(".category_list--clicked");
  targetOff.classList.remove("category_list--clicked");
  targetOn.classList.add("category_list--clicked");
  setState(listPageIdx, 1);
  setState(categoryIdx, item.id - 1);
}

function listPageUp() {
  setState(listPageIdx, getState(listPageIdx) + 1);
}

// 카테고리 리스트 추가
export async function appendCategoryList() {
  const categoryList = await getNewsContents();
  const categoryListContainer = $(".category_list_container");
  categoryList.forEach((item, idx) => {
    const newCategory = createCategoryList(item, idx);
    categoryListContainer.appendChild(newCategory);
  });
}

// 카테고리 리스트 태그 생성
function createCategoryList(item, idx) {
  // li 생성
  const newList = document.createElement("li");
  idx === 0
    ? (newList.className = "category_list category_list--clicked")
    : (newList.className = "category_list");
  newList.addEventListener("click", () => {
    categoryClicked(item);
  });
  newList.id = `category${item.id}`;

  // 제목 생성
  const title = document.createElement("span");
  title.className = "category_list__title";
  title.innerHTML = `${item.categoryName}`;
  newList.appendChild(title);

  // 페이지 카운터 생성
  const counterContainer = document.createElement("wrapper");
  counterContainer.className = "page_count_wrapper";
  const nowPage = document.createElement("span");
  const allPage = document.createElement("span");
  nowPage.className = "now_page";
  nowPage.innerHTML = `${getState(listPageIdx)} / `;
  allPage.className = "all_page";
  allPage.innerHTML = `${item.data.length}`;
  counterContainer.appendChild(nowPage);
  counterContainer.appendChild(allPage);
  newList.appendChild(counterContainer);

  // 프로그레스 바 생성
  const progressBar = document.createElement("div");
  progressBar.className = "progressbar";
  newList.appendChild(progressBar);
  return newList;
}

// 현재 리스트 페이지에 카테고리 동기화
export function updateCategoryClicked() {
  const clickedCategory = $(".category_list--clicked");
  clickedCategory.classList.remove("category_list--clicked");
  const targetOn = $(".category_list_container");
  targetOn.children[getState(categoryIdx)].classList.add(
    "category_list--clicked"
  );
}

// 카테고리에서 마지막 탭인지 확인
function isTabFull(innerHTML) {
  return parseInt(getState(listPageIdx)) >= parseInt(innerHTML) + 1;
}

// 카테고리 탭 숫자 업데이트
function updateCategoryTabNum() {
  const firstCategory = $(".category_list");
  const clickedCategory = $(".category_list--clicked");
  clickedCategory.children[1].children[0].innerHTML = `${getState(
    listPageIdx
  )} / `;
  if (
    // 다음 카테고리로 넘어가야할 경우
    isTabFull(clickedCategory.children[1].children[1].innerHTML)
  ) {
    if (clickedCategory.nextElementSibling === null) {
      firstCategory.classList.add("category_list--clicked");
      firstCategory.children[1].children[0].innerHTML = "1 / ";
      setState(categoryIdx, 0);
    } else {
      clickedCategory.nextElementSibling.classList.add(
        "category_list--clicked"
      );
      clickedCategory.nextElementSibling.children[1].children[0].innerHTML =
        "1 /";
      setState(categoryIdx, getState(categoryIdx) + 1);
    }
    clickedCategory.classList.remove("category_list--clicked");
    setState(listPageIdx, 1);
  }
}

(function init() {
  resister(listPageIdx, refreshInterval);
  resister(listPageIdx, updateCategoryClicked);
})();

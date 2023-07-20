import { CATEGORY_TAB_TIME, CATEGORY_CLICKED } from "../constant/constants.js";
import { getNewsContents } from "./api.js";
import { getState, resister, setState } from "./observer/observer.js";
import { categoryIdx, isGrid, listPageIdx } from "./store/store.js";
import { $, $All } from "./util.js";

// 프로그레스에 맞춘 탭 자동 넘김 Interval
let categoryInterval;

function stopCategoryInterval() {
  clearInterval(categoryInterval);
}
function startCategoryInterval() {
  const isGridMode = getState(isGrid);
  if (!isGridMode) {
    categoryInterval = setInterval(listPageUp, CATEGORY_TAB_TIME);
  }
}

// 자동 탭 넘김 인터벌 새로고침
function refreshInterval() {
  stopCategoryInterval();
  startCategoryInterval();
  const clickedCategory = $(`.${CATEGORY_CLICKED}`);
  clickedCategory.children[2].classList.remove("progressbar");
  clickedCategory.offsetWidth;
  clickedCategory.children[2].classList.add("progressbar");
}

// 카테고리 메뉴 클릭시 전환
function categoryClicked(item) {
  const targetOn = $(`#category${item.id}`);
  const targetOff = $(`.${CATEGORY_CLICKED}`);
  targetOff.classList.remove(CATEGORY_CLICKED);
  targetOn.classList.add(CATEGORY_CLICKED);
  setState(listPageIdx, 1);
  setState(categoryIdx, item.id - 1);
}

function listPageUp() {
  setState(listPageIdx, getState(listPageIdx) + 1);
}

// 카테고리 리스트 추가
function appendCategoryList(newsList) {
  const categoryListContainer = $(".category_list_container");
  newsList.forEach((item, idx) => {
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
function updateCategoryClicked() {
  const currentCategoryIdx = getState(categoryIdx);
  const categoryList = $All(".category_list");
  categoryList.forEach((item) => {
    item.classList.remove(CATEGORY_CLICKED);
  });
  categoryList[currentCategoryIdx].classList.add(CATEGORY_CLICKED);
}

// 카테고리에서 마지막 탭인지 확인
function isTabFull(innerHTML) {
  return parseInt(getState(listPageIdx)) - 1 === parseInt(innerHTML);
}

// 카테고리 탭 숫자 업데이트
function updateCategory() {
  const currentListIdx = getState(listPageIdx);
  const currentCategoryIdx = getState(categoryIdx);
  const categoryList = $All(".category_list");
  const clickedCategory = categoryList[currentCategoryIdx];
  $(".now_page", clickedCategory).innerHTML = `${currentListIdx} / `;
  // 카테고리 오른쪽으로 넘어가야할 경우
  if (isTabFull($(".all_page", clickedCategory).innerHTML)) {
    setState(listPageIdx, 1);
    if (clickedCategory.nextElementSibling === null) {
      categoryList[0].classList.add(CATEGORY_CLICKED);
      setState(categoryIdx, 0);
    } else {
      clickedCategory.nextElementSibling.classList.add(CATEGORY_CLICKED);
      setState(categoryIdx, currentCategoryIdx + 1);
    }
    clickedCategory.classList.remove(CATEGORY_CLICKED);
  } else if (currentListIdx === 0) {
    // 카테고리 왼쪽으로 넘어가야할 경우
    setState(listPageIdx, 1);
    if (currentCategoryIdx === 0) {
      // setState(
      //   listPageIdx,
      //   parseInt(
      //     $(".all_page", categoryList[categoryList.length - 1]).innerHTML
      //   )
      // );
      setState(categoryIdx, categoryList.length - 1);
    } else {
      setState(categoryIdx, currentCategoryIdx - 1);
      // setState(
      //   listPageIdx,
      //   parseInt($("all_page", categoryList[currentCategoryIdx - 1]).innerHTML)
      // );
    }
  }
}

export async function setCategory() {
  const newsList = await getNewsContents();
  resister(isGrid, startCategoryInterval);
  resister(listPageIdx, refreshInterval);
  resister(listPageIdx, updateCategory);
  resister(categoryIdx, updateCategoryClicked);
  appendCategoryList(newsList);
}

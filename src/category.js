import {
  CATEGORY_TAB_TIME,
  NOW_CATEGORY_IDX,
  NOW_LIST_PAGE,
} from "../constant/constants.js";
import { getNewsContents } from "./api.js";
import { appendNewsList, updateListButton } from "./listView.js";
import { $ } from "./util.js";

// 프로그레스에 맞춘 탭 자동 넘김 Interval
let categoryInterval = setInterval(() => {
  listPageUp();
  updateCategoryClicked();
  updateListButton();
}, CATEGORY_TAB_TIME);

export function stopCategoryInterval() {
  clearInterval(categoryInterval);
}
export function startCategoryInterval() {
  categoryInterval = setInterval(() => {
    listPageUp();
    updateCategoryClicked();
    updateListButton();
  }, CATEGORY_TAB_TIME);
}

// 자동 탭 넘김 인터벌 새로고침
export function refreshInterval() {
  stopCategoryInterval();
  startCategoryInterval();
  updateListButton();
  updateCategoryClicked();
}

export function setFirstListPage() {
  NOW_LIST_PAGE.setValue(1);
  NOW_CATEGORY_IDX.setValue(0);
  refreshInterval();
}

// 카테고리 메뉴 클릭시 전환
function categoryClicked(item) {
  const targetOn = $(`#category${item.id}`);
  const targetOff = $(".category_list--clicked");
  targetOff.classList.remove("category_list--clicked");
  targetOn.classList.add("category_list--clicked");
  NOW_LIST_PAGE.setValue(1);
  NOW_CATEGORY_IDX.setValue(item.id - 1);
  refreshInterval();
}

function listPageUp() {
  NOW_LIST_PAGE.incrementValue(1);
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
  nowPage.innerHTML = `${NOW_LIST_PAGE.getValue()} / `;
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
  targetOn.children[NOW_CATEGORY_IDX.getValue()].classList.add(
    "category_list--clicked"
  );
  updateCategoryTabNum();
}

// 카테고리에서 마지막 탭인지 확인
function isTabFull(innerHTML) {
  return parseInt(NOW_LIST_PAGE.getValue()) >= parseInt(innerHTML) + 1;
}

// 카테고리 탭 숫자 업데이트
function updateCategoryTabNum() {
  const firstCategory = $(".category_list");
  const clickedCategory = $(".category_list--clicked");
  clickedCategory.children[1].children[0].innerHTML = `${NOW_LIST_PAGE.getValue()} / `;
  if (
    // 다음 카테고리로 넘어가야할 경우
    isTabFull(clickedCategory.children[1].children[1].innerHTML)
  ) {
    if (clickedCategory.nextElementSibling === null) {
      firstCategory.classList.add("category_list--clicked");
      firstCategory.children[1].children[0].innerHTML = "1 / ";
      NOW_CATEGORY_IDX.setValue(0);
    } else {
      clickedCategory.nextElementSibling.classList.add(
        "category_list--clicked"
      );
      clickedCategory.nextElementSibling.children[1].children[0].innerHTML =
        "1 /";
      NOW_CATEGORY_IDX.incrementValue(1);
    }
    clickedCategory.classList.remove("category_list--clicked");
    NOW_LIST_PAGE.setValue(1);
  }
  appendNewsList();
}

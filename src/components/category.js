import { getState, register, setState } from "../core/observer/observer.js";
import {
  CATEGORY_CLICKED,
  CATEGORY_TABS,
  CATEGORY_TAB_TIME,
} from "../core/store/constants.js";
import {
  categoryIdx,
  isGrid,
  isSubTab,
  listPageIdx,
  subscribeList,
} from "../core/store/store.js";
import { getNewsContent } from "../core/utils/api.js";
import { $, $All } from "../core/utils/util.js";

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
function listPageUp() {
  setState(listPageIdx, getState(listPageIdx) + 1);
}

// 자동 탭 넘김 인터벌 새로고침
function refreshInterval() {
  const isGridMode = getState(isGrid);
  if (!isGridMode) {
    stopCategoryInterval();
    startCategoryInterval();
    const clickedCategory = $(`.${CATEGORY_CLICKED}`);
    clickedCategory.children[2].classList.remove("progressbar");
    clickedCategory.offsetWidth;
    clickedCategory.children[2].classList.add("progressbar");
  }
}

// 카테고리 리스트 추가
function appendCategoryList(newsList) {
  const categoryListContainer = $(".category_list_container");
  categoryListContainer.innerHTML = "";
  const isSubMode = getState(isSubTab);
  const isGridMode = getState(isGrid);
  if (!isGridMode) {
    if (isSubMode) {
      const subPressList = getState(subscribeList);
      subPressList.forEach((item, idx) => {
        const newCategory = createCategoryList(item, newsList, idx);
        categoryListContainer.appendChild(newCategory);
      });
    } else {
      CATEGORY_TABS.forEach((item, idx) => {
        const newCategory = createCategoryList(item, newsList, idx);
        categoryListContainer.appendChild(newCategory);
      });
    }
  } else {
    categoryListContainer.innerHTML = "";
  }
}
function createCategoryList(item, newsList, idx) {
  const isSubMode = getState(isSubTab);
  const newCategory = document.createElement("li");
  newCategory.addEventListener("click", (e) => {
    categoryClicked(e.target);
  });
  idx === 0
    ? (newCategory.className = "category_list category_list--clicked")
    : (newCategory.className = "category_list");

  const title = document.createElement("span");
  title.className = "category_list__title";
  title.innerHTML = `${item}`;
  newCategory.appendChild(title);
  const pressCount = newsList.filter((press) => {
    return press.category === item;
  });

  const counterContainer = document.createElement("wrapper");
  counterContainer.className = "page_count_wrapper";
  if (isSubMode) {
    counterContainer.innerHTML = `
    <span class="now_page"> > </span>
    `;
  } else {
    counterContainer.innerHTML = `
    <span class="now_page">${getState(listPageIdx)} / </span>
    <span class="all_page">${pressCount.length}</span>
    `;
  }
  newCategory.children[0].addEventListener("click", (e) => {
    e.stopPropagation();
    newCategory.click();
  });
  newCategory.appendChild(counterContainer);

  // 프로그레스 바 생성
  const progressBar = document.createElement("div");
  progressBar.className = "progressbar";
  newCategory.appendChild(progressBar);
  return newCategory;
}

// 카테고리에서 마지막 탭인지 확인
function isTabFull(innerHTML, currentListIdx) {
  return currentListIdx === parseInt(innerHTML) + 1;
}

// 카테고리 탭 숫자 업데이트
function updateCategory() {
  const isGridMode = getState(isGrid);
  const isSubMode = getState(isSubTab);
  const currentListIdx = getState(listPageIdx);
  const currentCategoryIdx = getState(categoryIdx);
  const categoryList = $All(".category_list");
  const clickedCategory = categoryList[currentCategoryIdx];

  if (!isGridMode && !isSubMode) {
    $(".now_page", clickedCategory).innerHTML = `${currentListIdx} / `;
    // 카테고리 오른쪽으로 넘어가야할 경우
    if (isTabFull($(".all_page", clickedCategory).innerHTML, currentListIdx)) {
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
        setState(categoryIdx, categoryList.length - 1);
      } else {
        setState(categoryIdx, currentCategoryIdx - 1);
      }
    }
  } else if (!isGridMode && isSubMode) {
    if (currentListIdx > 1) {
      setState(listPageIdx, 1);
      if (clickedCategory.nextElementSibling === null) {
        categoryList[0].classList.add(CATEGORY_CLICKED);
        setState(categoryIdx, 0);
      } else {
        clickedCategory.nextElementSibling.classList.add(CATEGORY_CLICKED);
        setState(categoryIdx, currentCategoryIdx + 1);
      }
      clickedCategory.classList.remove(CATEGORY_CLICKED);
    }
  }
}
// 카테고리 메뉴 클릭시 전환
function categoryClicked(item) {
  const isSubMode = getState(isSubTab);
  const subList = getState(subscribeList);
  const targetOff = $(`.${CATEGORY_CLICKED}`);
  targetOff.classList.remove(CATEGORY_CLICKED);
  item.classList.add(CATEGORY_CLICKED);
  setState(listPageIdx, 1);
  if (isSubMode) {
    setState(categoryIdx, subList.indexOf(item.children[0].innerHTML));
  } else {
    setState(categoryIdx, CATEGORY_TABS.indexOf(item.children[0].innerHTML));
  }
}
// 현재 리스트 페이지에 카테고리 동기화
function updateCategoryClicked() {
  const isGridMode = getState(isGrid);
  if (!isGridMode) {
    const currentCategoryIdx = getState(categoryIdx);
    const categoryList = $All(".category_list");
    categoryList.forEach((item) => {
      item.classList.remove(CATEGORY_CLICKED);
    });
    categoryList[currentCategoryIdx].classList.add(CATEGORY_CLICKED);
  }
}

export async function setCategory() {
  const newsList = await getNewsContent();
  register(isGrid, startCategoryInterval);
  register(isSubTab, () => {
    appendCategoryList(newsList);
  });
  register(isGrid, () => {
    appendCategoryList(newsList);
  });
  appendCategoryList(newsList);
  register(listPageIdx, updateCategory);
  register(categoryIdx, updateCategory);
  register(listPageIdx, refreshInterval);
  register(categoryIdx, updateCategoryClicked);
}

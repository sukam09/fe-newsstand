import { getState, register, setState } from "../core/observer/observer.js";
import {
  CATEGORY_CLICKED,
  CATEGORY_TABS,
  CATEGORY_TAB_TIME,
} from "../core/store/constants.js";
import {
  isGrid,
  isSubTab,
  listIdx,
  subscribeList,
} from "../core/store/store.js";
import { getNewsContent } from "../core/utils/api.js";
import { $, $All } from "../core/utils/util.js";

// 프로그레스에 맞춘 탭 자동 넘김 Interval
let categoryInterval;
let startX = 0;
let nowX = 0;
let listX = 0;
const categoryListContainer = $(".category_list_container");
let listScrollWidth;
let listClientWidth;
function bindEvents() {
  categoryListContainer.addEventListener("mousedown", onScrollStart);
}
const onScrollStart = (e) => {
  startX = getClientX(e);
  window.addEventListener("mousemove", onScrollMove);
  window.addEventListener("mouseup", onScrollEnd);
};
const onScrollMove = (e) => {
  nowX = getClientX(e);
  setTranslateX(listX + nowX - startX);
};
const onScrollEnd = (e) => {
  listX = getTranslateX();
  listClientWidth = categoryListContainer.clientWidth;
  listScrollWidth = categoryListContainer.scrollWidth;
  if (listX > 0) {
    setTranslateX(0);
    categoryListContainer.style.transition = `all 0.1s ease`;
    listX = 0;
  } else if (listX < listClientWidth - listScrollWidth) {
    setTranslateX(listClientWidth - listScrollWidth);
    categoryListContainer.style.transition = `all 0.1s ease`;
    listX = listClientWidth - listScrollWidth;
  }

  categoryListContainer.removeEventListener("mousedown", onScrollStart);
  window.removeEventListener("mousemove", onScrollMove);
  window.removeEventListener("mouseup", onScrollEnd);

  setTimeout(() => {
    bindEvents();
    categoryListContainer.style.transition = "";
  }, 100);
};
const getClientX = (e) => {
  const isTouches = e.touches ? true : false;
  return isTouches ? e.touches[0].clientX : e.clientX;
};

const getTranslateX = () => {
  return parseInt(
    getComputedStyle(categoryListContainer).transform.split(/[^\-0-9]+/g)[5]
  );
};

const setTranslateX = (x) => {
  categoryListContainer.style.transform = `translateX(${x}px)`;
};

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
  const currentIdx = getState(listIdx);
  currentIdx.list += 1;
  setState(listIdx, currentIdx);
}

// 자동 탭 넘김 인터벌 새로고침
function refreshInterval() {
  const isGridMode = getState(isGrid);
  stopCategoryInterval();
  if (!isGridMode) {
    startCategoryInterval();
    const clickedCategory = $(`.${CATEGORY_CLICKED}`);
    clickedCategory?.children[2].classList.remove("progressbar");
    clickedCategory?.offsetWidth;
    clickedCategory?.children[2].classList.add("progressbar");
  }
}

// 카테고리 리스트 추가
function appendCategoryList(newsList) {
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
    <span class="now_page">${getState(listIdx).list} / </span>
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
  const currentIdx = getState(listIdx);
  const subList = getState(subscribeList);
  const categoryList = $All(".category_list");
  const clickedCategory = categoryList[currentIdx.category];
  if (!isGridMode && !isSubMode) {
    $(".now_page", clickedCategory).innerHTML = `${currentIdx.list} / `;
    // 카테고리 오른쪽으로 넘어가야할 경우
    if (isTabFull($(".all_page", clickedCategory).innerHTML, currentIdx.list)) {
      if (clickedCategory.nextElementSibling === null) {
        categoryList[0].classList.add(CATEGORY_CLICKED);
        setState(listIdx, { category: 0, list: 1 });
      } else {
        clickedCategory.nextElementSibling.classList.add(CATEGORY_CLICKED);
        setState(listIdx, { category: currentIdx.category + 1, list: 1 });
      }
      clickedCategory.classList.remove(CATEGORY_CLICKED);
    } else if (currentIdx.list === 0) {
      // 카테고리 왼쪽으로 넘어가야할 경우
      if (currentIdx.category === 0) {
        setState(listIdx, {
          category: categoryList.length - 1,
          list: parseInt(
            $(".all_page", categoryList[categoryList.length - 1]).innerHTML
          ),
        });
      } else {
        setState(listIdx, {
          category: currentIdx.category - 1,
          list: parseInt(
            $(".all_page", categoryList[currentIdx.category - 1]).innerHTML
          ),
        });
      }
    }
  } else if (!isGridMode && isSubMode) {
    if (currentIdx.list > 1 || currentIdx.category === subList.length) {
      if (currentIdx.category === subList.length) {
        setState(listIdx, { category: 0, list: 1 });
        categoryList[0].classList.add(CATEGORY_CLICKED);
      } else {
        clickedCategory.nextElementSibling.classList.add(CATEGORY_CLICKED);
        setState(listIdx, { category: currentIdx.category + 1, list: 1 });
      }
    } else if (currentIdx.list === 0 || currentIdx.category < 0) {
      if (currentIdx.category < 0) {
        setState(listIdx, { category: subList.length - 1, list: 1 });
      } else {
        setState(listIdx, { category: currentIdx.category - 1, list: 1 });
      }
    }
    if (clickedCategory === undefined) return;
    clickedCategory.scrollIntoView({
      behavior: "smooth",
    });
  }
}
// 카테고리 메뉴 클릭시 전환
function categoryClicked(item) {
  const isSubMode = getState(isSubTab);
  const subList = getState(subscribeList);
  const targetOff = $(`.${CATEGORY_CLICKED}`);
  targetOff.classList.remove(CATEGORY_CLICKED);
  item.classList.add(CATEGORY_CLICKED);
  if (isSubMode) {
    setState(listIdx, {
      category: subList.indexOf(item.children[0].innerHTML),
      list: 1,
    });
  } else {
    setState(listIdx, {
      category: CATEGORY_TABS.indexOf(item.children[0].innerHTML),
      list: 1,
    });
  }
}
// 현재 리스트 페이지에 카테고리 동기화
function updateCategoryClicked() {
  const isGridMode = getState(isGrid);
  if (!isGridMode) {
    const currentCategoryIdx = getState(listIdx).category;
    const categoryList = $All(".category_list");
    categoryList.forEach((item) => {
      item.classList.remove(CATEGORY_CLICKED);
    });
    if (categoryList[currentCategoryIdx] === undefined) return;
    categoryList[currentCategoryIdx].classList.add(CATEGORY_CLICKED);
  }
}

export async function setCategory() {
  const newsList = await getNewsContent();
  bindEvents();
  register(isGrid, startCategoryInterval);
  register(isSubTab, () => {
    appendCategoryList(newsList);
  });
  register(isGrid, () => {
    appendCategoryList(newsList);
  });
  register(subscribeList, () => {
    appendCategoryList(newsList);
  });
  appendCategoryList(newsList);
  register(listIdx, updateCategory);
  register(subscribeList, updateCategory);
  register(listIdx, refreshInterval);
  register(subscribeList, refreshInterval);
  register(isGrid, refreshInterval);
  register(isSubTab, refreshInterval);
  register(listIdx, updateCategoryClicked);
  register(subscribeList, updateCategoryClicked);
}

import { LIST, GLOBAL, CATEGORY } from "./variable.js";

function moveListPage(pagenum) {
  GLOBAL.LIST_CURRENT_PAGE = pagenum;
  resetAnimation();
  setCurCategory();
  setListNews();
  setListNavBar();
}

function movePageFromEvent(event) {
  const target = (event.target.querySelector("span") || event.target).innerHTML;
  const targetCategory = strToCategory(target);
  const page = GLOBAL.CATEGORY_START_INDEX[targetCategory];

  moveListPage(page);
}

function setListNews() {
  GLOBAL.DOM.LIST_PRESS_ICON.src = GLOBAL.LIST_NEWS_DATA[GLOBAL.LIST_CURRENT_PAGE].path;
  GLOBAL.DOM.EDIT_DATE.innerHTML = `${GLOBAL.LIST_NEWS_DATA[GLOBAL.LIST_CURRENT_PAGE].edit_date} 편집`;
  GLOBAL.DOM.MANI_NEWS_TITLE.innerHTML = GLOBAL.LIST_NEWS_DATA[GLOBAL.LIST_CURRENT_PAGE].main_title;
  GLOBAL.DOM.MAIN_NEWS_THUMBNAIL.src = GLOBAL.LIST_NEWS_DATA[GLOBAL.LIST_CURRENT_PAGE].main_img_src;
  for (let i = 0; i < LIST.SUBTITLENUM; i++) {
    GLOBAL.DOM.SUB_NEWS_TITLE_ALL[i].innerHTML = GLOBAL.LIST_NEWS_DATA[GLOBAL.LIST_CURRENT_PAGE].sub_title[i];
  }
  GLOBAL.DOM.CAPTION.innerHTML = `${GLOBAL.LIST_NEWS_DATA[GLOBAL.LIST_CURRENT_PAGE].name} 언론사에서 직접 편집한 뉴스입니다.`;
}

function setListNavBar() {
  const navBarDefaultLeft = GLOBAL.DOM.FIELD_TAB.getBoundingClientRect().left;
  const curPageInCategory = getCurPageInCategory();

  const progressRemoveTarget = GLOBAL.DOM.FIELD_TAB.querySelector(".progress");
  progressRemoveTarget.className = "available-medium14";

  GLOBAL.DOM.FIELD_TAB.querySelectorAll("div").forEach((element) => {
    if (element.className != "progress-bar") {
      element.style.display = "none";
    }
  });

  const categoryIndex = Object.values(CATEGORY).indexOf(GLOBAL.LIST_CURRENT_CATEGORY);
  const targetDom = GLOBAL.DOM[`NAV_${Object.keys(CATEGORY)[categoryIndex].toUpperCase()}`];

  targetDom.querySelector("div").style.display = "flex";
  targetDom.className = "progress selected-bold14";
  targetDom.querySelectorAll("span")[1].innerHTML = curPageInCategory;
  targetDom.querySelectorAll("span")[2].innerHTML = GLOBAL.CATEGORY_NUM[strToCategory(GLOBAL.LIST_CURRENT_CATEGORY)];
  GLOBAL.DOM.PROGRESS_BAR.style.left = `${targetDom.getBoundingClientRect().left - navBarDefaultLeft}px`;
}

function setCurCategory() {
  GLOBAL.LIST_CURRENT_CATEGORY = GLOBAL.LIST_NEWS_DATA[GLOBAL.LIST_CURRENT_PAGE].category;
}

function getCurPageInCategory() {
  const targetCategory = strToCategory(GLOBAL.LIST_CURRENT_CATEGORY);
  const page = GLOBAL.LIST_CURRENT_PAGE + 1 - GLOBAL.CATEGORY_START_INDEX[targetCategory];

  return page;
}

function strToCategory(str) {
  const categoryMapping = {
    [CATEGORY.ECONOMY]: "ECONOMY",
    [CATEGORY.BROADCAST]: "BROADCAST",
    [CATEGORY.IT]: "IT",
    [CATEGORY.ENGLISH]: "ENGLISH",
    [CATEGORY.SPORTS]: "SPORTS",
    [CATEGORY.MAGAZINE]: "MAGAZINE",
    [CATEGORY.LOCAL]: "LOCAL",
  };

  return categoryMapping[str];
}

function resetAnimation() {
  GLOBAL.DOM.PROGRESS_BAR.style.animation = "none";
  void GLOBAL.DOM.PROGRESS_BAR.offsetWidth;
  GLOBAL.DOM.PROGRESS_BAR.style.animation = `${LIST.PROGRESS_SEC}s linear progress infinite`;
}

export { moveListPage, movePageFromEvent, strToCategory };

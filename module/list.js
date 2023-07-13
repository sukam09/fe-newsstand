import { LIST, GLOBAL, CATEGORY } from "./variable.js";

function setListNews() {
  GLOBAL.DOM.list_press_icon.src = GLOBAL.list_news_data[GLOBAL.list_cur_page].path;
  GLOBAL.DOM.edit_date.innerHTML = `${GLOBAL.list_news_data[GLOBAL.list_cur_page].edit_date} 편집`;
  GLOBAL.DOM.main_news_title.innerHTML = GLOBAL.list_news_data[GLOBAL.list_cur_page].main_title;
  GLOBAL.DOM.main_news_thumbnail.src = GLOBAL.list_news_data[GLOBAL.list_cur_page].main_img_src;
  for (let i = 0; i < LIST.SUBTITLENUM; i++) {
    GLOBAL.DOM.sub_news_title[i].innerHTML = GLOBAL.list_news_data[GLOBAL.list_cur_page].sub_title[i];
  }
  GLOBAL.DOM.caption.innerHTML = `${GLOBAL.list_news_data[GLOBAL.list_cur_page].name} 언론사에서 직접 편집한 뉴스입니다.`;
}

function setListNavBar() {
  const navBarDefaultLeft = GLOBAL.DOM.field_tab.getBoundingClientRect().left;
  const cur_page_in_category = getCurPageInCategory();

  const progressRemoveTarget = GLOBAL.DOM.field_tab.querySelector(".progress");
  progressRemoveTarget.classList.remove("progress");
  progressRemoveTarget.classList.remove("selected-bold14");
  progressRemoveTarget.classList.add("available-medium14");

  GLOBAL.DOM.field_tab.querySelectorAll("div").forEach((element) => {
    if (element.className != "progress-bar") {
      element.style.display = "none";
    }
  });

  const categoryIndex = Object.values(CATEGORY).indexOf(GLOBAL.list_cur_category);
  const targetDom = GLOBAL.DOM[`nav_${Object.keys(CATEGORY)[categoryIndex].toLowerCase()}`];

  targetDom.querySelector("div").style.display = "flex";
  targetDom.classList.add("progress");
  targetDom.classList.remove("available-medium14");
  targetDom.classList.add("selected-bold14");
  targetDom.querySelectorAll("span")[1].innerHTML = cur_page_in_category;
  targetDom.querySelectorAll("span")[2].innerHTML = GLOBAL.CATEGORY_NUM[strToCategory(GLOBAL.list_cur_category)];
  GLOBAL.DOM.progress_bar.style.left = `${targetDom.getBoundingClientRect().left - navBarDefaultLeft}px`;
}

function moveListPage(pagenum) {
  GLOBAL.list_cur_page = pagenum;
  resetAnimation();
  setCurCategory();
  setListNews();
  setListNavBar();
}

function setCurCategory() {
  GLOBAL.list_cur_category = GLOBAL.list_news_data[GLOBAL.list_cur_page].category;
}

function getCurPageInCategory() {
  const targetCategory = strToCategory(GLOBAL.list_cur_category);
  const page = GLOBAL.list_cur_page + 1 - GLOBAL.CATEGORY_START_INDEX[targetCategory];

  return page;
}

function movePageFromEvent(event) {
  const target = (event.target.querySelector("span") || event.target).innerHTML;
  const targetCategory = strToCategory(target);
  const page = GLOBAL.CATEGORY_START_INDEX[targetCategory];

  moveListPage(page);
}

function resetAnimation() {
  GLOBAL.DOM.progress_bar.style.animation = "none";
  void GLOBAL.DOM.progress_bar.offsetWidth;
  GLOBAL.DOM.progress_bar.style.animation = "1s linear progress infinite";
}

function strToCategory(str) {
  for (let key in CATEGORY) {
    if (CATEGORY[key] === str) {
      return key;
    }
  }
}

export { moveListPage, movePageFromEvent, strToCategory };

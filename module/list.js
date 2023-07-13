import { LIST, GLOBAL, CATEGORY } from "./variable.js";

function setListNews() {
  GLOBAL.DOM.list_press_icon.src = GLOBAL.list_news_data[GLOBAL.list_cur_page].path;
  GLOBAL.DOM.edit_date.innerHTML = `${GLOBAL.list_news_data[GLOBAL.list_cur_page].edit_date} 편집`;
  GLOBAL.DOM.main_news_title.innerHTML = GLOBAL.list_news_data[GLOBAL.list_cur_page].main_title;
  GLOBAL.DOM.main_news_thumbnail.src = `https://picsum.photos/id/${GLOBAL.list_cur_page + 10}/300/200`;

  for (let i = 0; i < LIST.SUBTITLENUM; i++) {
    GLOBAL.DOM.sub_news_title[i].innerHTML = GLOBAL.list_news_data[GLOBAL.list_cur_page].sub_title[i];
  }
  GLOBAL.DOM.caption.innerHTML = `${GLOBAL.list_news_data[GLOBAL.list_cur_page].name} 언론사에서 직접 편집한 뉴스입니다.`;
}

function setListNavBar() {
  const navBarDefaultLeft = GLOBAL.DOM.field_tab.getBoundingClientRect().left;
  const cur_page_in_category = getCurPageInCategory();

  const removeTarget = GLOBAL.DOM.field_tab.querySelector(".progress");
  removeTarget.classList.remove("progress");
  removeTarget.classList.remove("selected-bold14");
  removeTarget.classList.add("available-medium14");

  GLOBAL.DOM.field_tab.querySelectorAll("div").forEach((element) => {
    if (element.className != "progress-bar") {
      element.style.display = "none";
    }
  });

  switch (GLOBAL.list_cur_category) {
    case CATEGORY.ECONOMY:
      GLOBAL.DOM.nav_economy.querySelector("div").style.display = "flex";
      GLOBAL.DOM.nav_economy.classList.add("progress");
      GLOBAL.DOM.nav_economy.classList.remove("available-medium14");
      GLOBAL.DOM.nav_economy.classList.add("selected-bold14");
      GLOBAL.DOM.nav_economy.querySelectorAll("span")[1].innerHTML = cur_page_in_category;
      GLOBAL.DOM.nav_economy.querySelectorAll("span")[2].innerHTML = GLOBAL.CATEGORY_NUM.ECONOMY;
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_economy.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.BROADCAST:
      GLOBAL.DOM.nav_broadcast.querySelector("div").style.display = "flex";
      GLOBAL.DOM.nav_broadcast.classList.add("progress");
      GLOBAL.DOM.nav_broadcast.classList.remove("available-medium14");
      GLOBAL.DOM.nav_broadcast.classList.add("selected-bold14");
      GLOBAL.DOM.nav_broadcast.querySelectorAll("span")[1].innerHTML = cur_page_in_category;
      GLOBAL.DOM.nav_broadcast.querySelectorAll("span")[2].innerHTML = GLOBAL.CATEGORY_NUM.BROADCAST;
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_broadcast.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.IT:
      GLOBAL.DOM.nav_it.querySelector("div").style.display = "flex";
      GLOBAL.DOM.nav_it.classList.add("progress");
      GLOBAL.DOM.nav_it.classList.remove("available-medium14");
      GLOBAL.DOM.nav_it.classList.add("selected-bold14");
      GLOBAL.DOM.nav_it.querySelectorAll("span")[1].innerHTML = cur_page_in_category;
      GLOBAL.DOM.nav_it.querySelectorAll("span")[2].innerHTML = GLOBAL.CATEGORY_NUM.IT;
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_it.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.ENGLISH:
      GLOBAL.DOM.nav_english.querySelector("div").style.display = "flex";
      GLOBAL.DOM.nav_english.classList.add("progress");
      GLOBAL.DOM.nav_english.classList.remove("available-medium14");
      GLOBAL.DOM.nav_english.classList.add("selected-bold14");
      GLOBAL.DOM.nav_english.querySelectorAll("span")[1].innerHTML = cur_page_in_category;
      GLOBAL.DOM.nav_english.querySelectorAll("span")[2].innerHTML = GLOBAL.CATEGORY_NUM.ENGLISH;
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_english.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.SPORTS:
      GLOBAL.DOM.nav_sports.querySelector("div").style.display = "flex";
      GLOBAL.DOM.nav_sports.classList.add("progress");
      GLOBAL.DOM.nav_sports.classList.remove("available-medium14");
      GLOBAL.DOM.nav_sports.classList.add("selected-bold14");
      GLOBAL.DOM.nav_sports.querySelectorAll("span")[1].innerHTML = cur_page_in_category;
      GLOBAL.DOM.nav_sports.querySelectorAll("span")[2].innerHTML = GLOBAL.CATEGORY_NUM.SPORTS;
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_sports.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.MAGAZINE:
      GLOBAL.DOM.nav_magazine.querySelector("div").style.display = "flex";
      GLOBAL.DOM.nav_magazine.classList.add("progress");
      GLOBAL.DOM.nav_magazine.classList.remove("available-medium14");
      GLOBAL.DOM.nav_magazine.classList.add("selected-bold14");
      GLOBAL.DOM.nav_magazine.querySelectorAll("span")[1].innerHTML = cur_page_in_category;
      GLOBAL.DOM.nav_magazine.querySelectorAll("span")[2].innerHTML = GLOBAL.CATEGORY_NUM.MAGAZINE;
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_magazine.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.LOCAL:
      GLOBAL.DOM.nav_local.querySelector("div").style.display = "flex";
      GLOBAL.DOM.nav_local.classList.add("progress");
      GLOBAL.DOM.nav_local.classList.remove("available-medium14");
      GLOBAL.DOM.nav_local.classList.add("selected-bold14");
      GLOBAL.DOM.nav_local.querySelectorAll("span")[1].innerHTML = cur_page_in_category;
      GLOBAL.DOM.nav_local.querySelectorAll("span")[2].innerHTML = GLOBAL.CATEGORY_NUM.LOCAL;
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_local.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
  }
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
  let page = GLOBAL.list_cur_page + 1;
  switch (GLOBAL.list_cur_category) {
    case CATEGORY.ECONOMY:
      break;
    case CATEGORY.BROADCAST:
      page = page - GLOBAL.CATEGORY_NUM.ECONOMY;
      break;
    case CATEGORY.IT:
      page = page - GLOBAL.CATEGORY_NUM.ECONOMY - GLOBAL.CATEGORY_NUM.BROADCAST;
      break;
    case CATEGORY.ENGLISH:
      page = page - GLOBAL.CATEGORY_NUM.ECONOMY - GLOBAL.CATEGORY_NUM.BROADCAST - GLOBAL.CATEGORY_NUM.IT;
      break;
    case CATEGORY.SPORTS:
      page = page - GLOBAL.CATEGORY_NUM.ECONOMY - GLOBAL.CATEGORY_NUM.BROADCAST - GLOBAL.CATEGORY_NUM.IT - GLOBAL.CATEGORY_NUM.ENGLISH;
      break;
    case CATEGORY.MAGAZINE:
      page = page - GLOBAL.CATEGORY_NUM.ECONOMY - GLOBAL.CATEGORY_NUM.BROADCAST - GLOBAL.CATEGORY_NUM.IT - GLOBAL.CATEGORY_NUM.ENGLISH - GLOBAL.CATEGORY_NUM.SPORTS;
      break;
    case CATEGORY.LOCAL:
      page = page - GLOBAL.CATEGORY_NUM.ECONOMY - GLOBAL.CATEGORY_NUM.BROADCAST - GLOBAL.CATEGORY_NUM.IT - GLOBAL.CATEGORY_NUM.ENGLISH - GLOBAL.CATEGORY_NUM.SPORTS - GLOBAL.CATEGORY_NUM.MAGAZINE;
      break;
  }

  return page;
}

function movePageFromEvent(event) {
  let page;
  const target = (event.target.querySelector("span") || event.target).innerHTML;

  switch (target) {
    case CATEGORY.ECONOMY:
      page = 0;
      break;
    case CATEGORY.BROADCAST:
      page = GLOBAL.CATEGORY_NUM.ECONOMY;
      break;
    case CATEGORY.IT:
      page = GLOBAL.CATEGORY_NUM.ECONOMY + GLOBAL.CATEGORY_NUM.BROADCAST;
      break;
    case CATEGORY.ENGLISH:
      page = GLOBAL.CATEGORY_NUM.ECONOMY + GLOBAL.CATEGORY_NUM.BROADCAST + GLOBAL.CATEGORY_NUM.IT;
      break;
    case CATEGORY.SPORTS:
      page = GLOBAL.CATEGORY_NUM.ECONOMY + GLOBAL.CATEGORY_NUM.BROADCAST + GLOBAL.CATEGORY_NUM.IT + GLOBAL.CATEGORY_NUM.ENGLISH;
      break;
    case CATEGORY.MAGAZINE:
      page = GLOBAL.CATEGORY_NUM.ECONOMY + GLOBAL.CATEGORY_NUM.BROADCAST + GLOBAL.CATEGORY_NUM.IT + GLOBAL.CATEGORY_NUM.ENGLISH + GLOBAL.CATEGORY_NUM.SPORTS;
      break;
    case CATEGORY.LOCAL:
      page = GLOBAL.CATEGORY_NUM.ECONOMY + GLOBAL.CATEGORY_NUM.BROADCAST + GLOBAL.CATEGORY_NUM.IT + GLOBAL.CATEGORY_NUM.ENGLISH + GLOBAL.CATEGORY_NUM.SPORTS + GLOBAL.CATEGORY_NUM.MAGAZINE;
      break;
    default:
      return;
  }

  moveListPage(page);
}

function resetAnimation() {
  GLOBAL.DOM.progress_bar.style.animation = "none";
  void GLOBAL.DOM.progress_bar.offsetWidth;
  GLOBAL.DOM.progress_bar.style.animation = "1s linear progress infinite";
}

export { moveListPage, movePageFromEvent };

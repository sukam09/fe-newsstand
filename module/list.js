import { LIST, GLOBAL, CATEGORY } from "./variable.js";

function setListNews() {
  GLOBAL.DOM.list_press_icon.src = GLOBAL.list_news_data[GLOBAL.list_cur_page].path;
  GLOBAL.DOM.edit_date.innerHTML = `${GLOBAL.list_news_data[GLOBAL.list_cur_page].edit_date} 편집`;
  GLOBAL.DOM.main_news_title.innerHTML = GLOBAL.list_news_data[GLOBAL.list_cur_page].main_title;
  GLOBAL.DOM.main_news_thumbnail.src = `https://picsum.photos/id/${GLOBAL.list_cur_page + 10}/300/200`;

  for (let i = 0; i < LIST.SUBTITLENUM; i++) {
    GLOBAL.DOM.sub_news_title[i].innerHTML = GLOBAL.list_news_data[GLOBAL.list_cur_page].sub_title[i];
    console.log(GLOBAL.list_cur_page);
    console.log(GLOBAL.list_news_data[GLOBAL.list_cur_page].sub_title[i]);
  }
  GLOBAL.DOM.caption.innerHTML = `${GLOBAL.list_news_data[GLOBAL.list_cur_page].name} 언론사에서 직접 편집한 뉴스입니다.`;
}

function setListNavBar() {
  const navBarDefaultLeft = GLOBAL.DOM.field_tab.getBoundingClientRect().left;

  GLOBAL.DOM.field_tab.querySelector(".progress").classList.remove("progress");

  GLOBAL.DOM.field_tab.querySelectorAll("div").forEach((element) => {
    if (element.className != "progress-bar") {
      element.style.display = "none";
    }
  });

  switch (GLOBAL.list_cur_category) {
    case CATEGORY.ECONOMY:
      GLOBAL.DOM.nav_economy.querySelector("div").style.display = "block";
      GLOBAL.DOM.nav_economy.classList.add("progress");
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_economy.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.BROADCAST:
      GLOBAL.DOM.nav_broadcast.querySelector("div").style.display = "block";
      GLOBAL.DOM.nav_broadcast.classList.add("progress");
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_broadcast.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.IT:
      GLOBAL.DOM.nav_it.querySelector("div").style.display = "block";
      GLOBAL.DOM.nav_it.classList.add("progress");
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_it.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.ENGLISH:
      GLOBAL.DOM.nav_english.querySelector("div").style.display = "block";
      GLOBAL.DOM.nav_english.classList.add("progress");
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_english.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.SPORTS:
      GLOBAL.DOM.nav_sports.querySelector("div").style.display = "block";
      GLOBAL.DOM.nav_sports.classList.add("progress");
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_sports.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.MAGAZINE:
      GLOBAL.DOM.nav_magazine.querySelector("div").style.display = "block";
      GLOBAL.DOM.nav_magazine.classList.add("progress");
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_magazine.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
    case CATEGORY.LOCAL:
      GLOBAL.DOM.nav_local.querySelector("div").style.display = "block";
      GLOBAL.DOM.nav_local.classList.add("progress");
      GLOBAL.DOM.progress_bar.style.left = `${GLOBAL.DOM.nav_local.getBoundingClientRect().left - navBarDefaultLeft}px`;
      break;
  }
}

function moveListPage(pagenum) {
  GLOBAL.list_cur_page = pagenum;
  setCurCategory();
  setListNews();
  setListNavBar();
}

function setCurCategory() {
  GLOBAL.list_cur_category = GLOBAL.list_news_data[GLOBAL.list_cur_page].category;
}

export { moveListPage };

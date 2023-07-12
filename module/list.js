import { LIST, GLOBAL } from "./variable.js";

function setListNews(index) {
  GLOBAL.DOM.list_press_icon.src = GLOBAL.news_data[index].path;
  GLOBAL.DOM.edit_date.innerHTML = `${GLOBAL.news_data[index].edit_date} 편집`;
  GLOBAL.DOM.main_news_title.innerHTML = GLOBAL.news_data[index].main_title;
  for (let i = 0; i < LIST.SUBTITLENUM; i++) {
    GLOBAL.DOM.sub_news_title[i].innerHTML = GLOBAL.news_data[index].sub_title[i];
  }
  GLOBAL.DOM.caption.innerHTML = `${GLOBAL.news_data[index].name} 언론사에서 직접 편집한 뉴스입니다.`;
}

export { setListNews };

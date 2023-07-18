import { setDisplay, findPress, findSpanNearby, checkIsSubscribe, removeDisplay } from "../js/utils.js";
import { STATE, setSubData } from "./const.js";
import { drawNews } from "./newsList.js";
import { gridMouseClick, drawSubGridView } from "./subscribe.js";
import { drawSubNews, setSubListNav } from "./subscribeListView.js";

function onUndiscribeModal(target) {
  const $press_name = document.querySelector(".sub-press-name");
  $press_name.textContent = findPress("src", target);
  const $btn_div = document.querySelector(".pop-up-btn-div");
  setDisplay(".grid-subscribe-modal", "query", "block");
}

function offUndiscribeModal() {
  setDisplay(".grid-subscribe-modal", "query", "none");
}

function onListUndiscribeModal() {
  const $sub_modal = document.querySelector(".list-subscribe-modal");
  $sub_modal.querySelector(".sub-press-name").textContent = STATE.SUB_DATA[STATE.SUB_NEWS_PAGE].name;
  setDisplay(".list-subscribe-modal", "query", "block");
}

function offListUndiscribeModal() {
  setDisplay(".list-subscribe-modal", "query", "none");
}

function initModalBtn() {
  const $button = document.querySelectorAll(".pop-up-btn");
  $button.forEach(btn => btn.addEventListener("click", e => handleModalBtn(e.target)));
}

function handleModalBtn(target) {
  const $target_class = target.classList;
  if ($target_class.contains("pos")) {
    //예 ?
    if (STATE.IS_GRID_VIEW) {
      //그리드뷰일때
      const $press_name_span = findSpanNearby(target);
      const $find_press = findPress("name", $press_name_span);
      setSubData($find_press);
      drawSubGridView();
    } else {
      //리스트뷰일때
      const $news_article = STATE.IS_SUB_VIEW ? document.querySelector(".sub-news-article") : document.querySelector(".news-article");
      const src_path = ".." + $news_article.querySelector("img").src.split("5500")[1];
      setSubData(checkIsSubscribe("src", src_path));
      STATE.SUB_NEWS_PAGE = 0;
      if (STATE.SUB_DATA.length === 0) {
        removeDisplay();
        setDisplay(".no-sub-item-div", "query", "block");
      } else {
        setSubListNav();
        drawSubNews(STATE.SUB_NEWS_PAGE);
      }
    }
    offUndiscribeModal();
    offListUndiscribeModal();
  } else if ($target_class.contains("neg")) {
    offUndiscribeModal();
    offListUndiscribeModal();
  }
}

export { onUndiscribeModal, offUndiscribeModal, onListUndiscribeModal, initModalBtn };

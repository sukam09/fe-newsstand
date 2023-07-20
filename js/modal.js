import { setDisplay, findPress, findSpanNearby, checkIsSubscribe, removeDisplay, getJSON } from "../js/utils.js";
import { STATE, DATA, setSubData } from "./const.js";
import { drawGridView } from "./gridFunction.js";
import { drawNews } from "./newsList.js";
import {  setSubListNav } from "./subscribeListView.js";
import { changeOption } from "./viewHandler.js";

let news_by_category;

function onUndiscribeModal(target) {
  const $press_name = document.querySelector(".sub-press-name");
  $press_name.textContent = findPress("src", target);
  const $btn_div = document.querySelector(".pop-up-btn-div");
  setDisplay(".grid-subscribe-modal", "query", "block");
}

function offUndiscribeModal() { //grid
  setDisplay(".grid-subscribe-modal", "query", "none");
}

function onListUndiscribeModal() {
  const $sub_modal = document.querySelector(".list-subscribe-modal");
  console.log(news_by_category[DATA.page_count[DATA.now_category]]);
  if (STATE.IS_SUB_VIEW) {
    $sub_modal.querySelector(".sub-press-name").textContent = STATE.SUB_DATA[STATE.SUB_NEWS_PAGE].name;
  } else {
    $sub_modal.querySelector(".sub-press-name").textContent = news_by_category[DATA.now_category][DATA.page_count[DATA.now_category]].name;
  }
  setDisplay(".list-subscribe-modal", "query", "block");
}

function offListUndiscribeModal() {
  setDisplay(".list-subscribe-modal", "query", "none");
}

async function initModalBtn() {
  news_by_category = await getJSON("/assets/media.json");
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
      drawGridView();
    } else {
      // 리스트뷰일때
      const $news_article = document.querySelector(".news-article");
      const src_path = ".." + $news_article.querySelector("img").src.split("5500")[1];
      setSubData(checkIsSubscribe("src", src_path));
      STATE.SUB_NEWS_PAGE = 0;
      if (STATE.SUB_DATA.length === 0) {
        removeDisplay();
        changeOption("subscribe");
        setDisplay(".no-sub-item-div", "query", "block");
      } else {
        setSubListNav();
        drawNews();
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

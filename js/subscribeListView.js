import { STATE } from "./const.js";
import { setDisplay } from "./utils.js";
import { listSubMouseClick } from "./subscribe.js";
import { onListUndiscribeModal } from "./modal.js";

function setSubListNav() {
  const subscribed_presses = STATE.SUB_DATA;
  const $sub_list_nav = document.querySelector(".sub-list-nav").firstElementChild;
  $sub_list_nav.innerHTML = ""; // 첫뻔째 li에 list-스타일넣기
  subscribed_presses.forEach((press, index) => {
    const $li = document.createElement("li");
    $li.classList.add("sub-nav-item");
    $li.textContent = press.name;
    $li.addEventListener("click", event => clickSubListNav(event.target));
    $li.addEventListener("animationiteration", progressEnd);
    if (index === STATE.SUB_NEWS_PAGE) {
      $li.classList.add("list-progress-bar");
      $li.innerHTML =
        $li.innerHTML +
        `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.48317 10.5L4.6665 9.68333L7.34984 7L4.6665 4.31667L5.48317 3.5L8.98317 7L5.48317 10.5Z" fill="white"/>
      </svg>`;
    }
    $sub_list_nav.append($li);
  });
}

function progressEnd() {
  STATE.SUB_NEWS_PAGE = STATE.SUB_NEWS_PAGE + 1 === STATE.SUB_DATA.length ? 0 : STATE.SUB_NEWS_PAGE + 1;
  setSubListNav();
  drawSubNews();
}

function drawSubNews() {
  setSubListNav();
  const $ul = document.querySelector(".sub-news-article");
  const news = STATE.SUB_DATA[STATE.SUB_NEWS_PAGE];
  $ul.querySelector(".press-brandmark").src = news.path_light;
  $ul.querySelector(".edit-date").textContent = news.editDate;
  $ul.querySelector(".thumbnail").src = news.thumbSrc;
  $ul.querySelector(".news-main .font-init").textContent = news.headTitle;
  const subList = $ul.querySelector(".news-sub-list");
  subList.innerHTML = "";
  news.subTitle.forEach(subnews => {
    const $li = document.createElement("li");
    $li.innerText = subnews;
    subList.append($li);
  });
  const $caption = document.createElement("li");
  $caption.classList.add("caption");
  $caption.innerText = `${news.name} 언론사에서 직접 편집한 뉴스입니다.`;
  subList.append($caption);
  const $sub_btn = $ul.querySelector(".list-sub-btn");
  $sub_btn.src = "../img/icons/cancelSubBtn.svg";
  $sub_btn.addEventListener("click", e => {
    onListUndiscribeModal();
  });
  showArrow();
}

/*
    sub-list-view에서 nav(언론명)을 클릭했을 때
*/
function clickSubListNav(target) {
  console.log(target);
  console.log(document.querySelector(".list-progress-bar"));
  document.querySelector(".list-progress-bar").classList.remove("list-progress-bar");
  const nav_item = target.textContent;
  STATE.SUB_NEWS_PAGE = STATE.SUB_DATA.findIndex(data => data.name === nav_item);
  drawSubNews(STATE.SUB_NEWS_PAGE);
}

function showArrow() {
  const sub_length = STATE.SUB_DATA.length;
  const $sub_news_article = document.querySelector(".sub-news-article");
  const $left_btn = $sub_news_article.querySelector(".left-btn");
  const $right_btn = $sub_news_article.querySelector(".right-btn");
  if (STATE.SUB_DATA.length === 1) {
    $left_btn.classList.add("hidden");
    $right_btn.classList.add("hidden");
  } else if (STATE.SUB_NEWS_PAGE === 0) {
    $left_btn.classList.add("hidden");
    $right_btn.classList.remove("hidden");
  } else if (STATE.SUB_NEWS_PAGE + 1 === sub_length) {
    $left_btn.classList.remove("hidden");
    $right_btn.classList.add("hidden");
  } else {
    $left_btn.classList.remove("hidden");
    $right_btn.classList.remove("hidden");
  }
}

function clickSubListBtn(target) {
  target.classList.contains("right-btn") ? STATE.SUB_NEWS_PAGE++ : STATE.SUB_NEWS_PAGE--;
  drawSubNews();
}

function initSubListArrow() {
  const $sub_news_article = document.querySelector(".sub-news-article");
  const $left_btn = $sub_news_article.querySelector(".left-btn");
  const $right_btn = $sub_news_article.querySelector(".right-btn");
  $left_btn.addEventListener("click", event => clickSubListBtn(event.target));
  $right_btn.addEventListener("click", event => clickSubListBtn(event.target));
}

export { setSubListNav, drawSubNews, initSubListArrow, showArrow };

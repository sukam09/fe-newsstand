import { STATE } from "./const.js";
import { drawNews } from "./newsList.js";

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
  drawNews();
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
  target.classList.add("list-progress-bar");
  drawNews();
}


export { setSubListNav };

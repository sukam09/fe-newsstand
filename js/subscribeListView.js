import { STATE,ARROW_SVG_PATH } from "./const.js";
import { drawNews } from "./newsList.js";

function setSubListNav() {
  const subscribed_presses = STATE.SUB_DATA;
  const $sub_list_nav = document.querySelector(".sub-list-nav").firstElementChild;
  $sub_list_nav.innerHTML = ""; // 첫뻔째 li에 list-스타일넣기
  subscribed_presses.forEach((press, index) => {
    const $li = document.createElement("li");
    $li.classList.add("sub-nav-item","surface-alt","text-weak");
    $li.textContent = press.name;
    $li.addEventListener("click", event => clickSubListNav(event.target));
    $li.addEventListener("animationiteration", progressEnd);
    if (index === STATE.SUB_NEWS_PAGE) {
      $li.classList.add("list-progress-bar","text-white-default");
      $li.insertAdjacentHTML('beforeend',
      `<span>
      ${ARROW_SVG_PATH}
      </span>`)
}    $sub_list_nav.append($li);
}

)
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
  const $element = document.querySelector(".list-progress-bar");
  $element.classList.remove("list-progress-bar","text-white-default");
  $element.querySelector('span').remove();
  const nav_item = target.textContent;
  STATE.SUB_NEWS_PAGE = STATE.SUB_DATA.findIndex(data => data.name === nav_item);
  target.classList.add("list-progress-bar");
  target.insertAdjacentHTML('beforeend',
  `<span>
  ${ARROW_SVG_PATH}
  </span>`)
  drawNews();
}


export { setSubListNav };

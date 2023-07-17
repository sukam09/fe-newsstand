import { STATE } from "./const.js";

function setSubListNav() {
  const subscribed_presses = STATE.SUB_DATA;
  const $sub_list_nav = document.querySelector(".sub-list-nav").firstElementChild;
  $sub_list_nav.innerHTML = ""; // 첫뻔째 li에 list-스타일넣기
  subscribed_presses.forEach(press => {
    const $li = document.createElement("li");
    $li.classList.add("sub-nav-item");
    $li.textContent = press.name;
    $sub_list_nav.append($li);
  });
  $sub_list_nav.firstChild.classList.add("list-progress-bar");
}

function drawSubNews(page) {
  setSubListNav();
  const $ul = document.querySelector(".sub-news-article");
  const news = STATE.SUB_DATA[page];
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
    listSubMouseClick(STATE.SUB_DATA, e.target);
  });
}

function clickSubListNav(target) {
  const nav_item = target.textContent;
}

export { setSubListNav, drawSubNews };

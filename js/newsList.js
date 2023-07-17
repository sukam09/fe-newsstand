import { category, news_by_category } from "../assets/news.js";
import { listSubMouseClick } from "./subscribe.js";
import presses from "../assets/light-media.js";

let now_category = category[0];
const total_pages = {};
let page_count = {};
category.forEach(item => {
  total_pages[item] = news_by_category[item].length;
  page_count[item] = 0;
});

function getNews(category) {
  return news_by_category[category];
}

function drawArrow() {
  if (page_count[now_category] === total_pages[now_category] - 1) {
    hideArrow("right");
    showArrow("left");
  } else if (page_count[now_category] === 0) {
    hideArrow("left");
    showArrow("right");
  } else {
    showArrow("right");
    showArrow("left");
  }
}

function drawNews(category, page) {
  const news = getNews(category);
  document.querySelector(".press-brandmark").src = news[page].src;
  document.querySelector(".edit-date").textContent = news[page].editDate;
  document.querySelector(".thumbnail").src = news[page].thumbSrc;
  document.querySelector(".news-main .font-init").textContent = news[page].headTitle;
  const subList = document.querySelector(".news-sub-list");
  subList.innerHTML = "";
  news[page].subTitle.forEach(subnews => {
    const $li = document.createElement("li");
    $li.innerText = subnews;
    subList.append($li);
  });
  const $caption = document.createElement("li");
  $caption.classList.add("caption");
  $caption.innerText = `${news[page].name} 언론사에서 직접 편집한 뉴스입니다.`;
  subList.append($caption);
  const $sub_btn = document.querySelector(".list-sub-btn");
  $sub_btn.src = news[page].isSub ? "../img/icons/cancelSubBtn.svg" : "../img/icons/subBtn.svg";
  $sub_btn.addEventListener("click", e => listSubMouseClick(news[page], e.target));
}

function restartAnimation() {
  const $animation = document.querySelector(".progress-bar");
  $animation.classList.remove("progress-bar");
  void $animation.offsetWidth; // Reflow를 유발하여 애니메이션 재시작을 위한 트리거
  $animation.classList.add("progress-bar");
}

function clickListRightBtn(category) {
  if (page_count[category] + 1 === total_pages[category] - 1) {
    page_count[category] += 1;
    drawNews(category, page_count[category]);
    hideArrow("right");
  } else {
    page_count[category] += 1;
    drawNews(category, page_count[category]);
  }
  showArrow("left");
  restartAnimation();
  setNowCount();
}

function clickListLeftBtn(category) {
  if (page_count[category] - 1 === -1) {
    return;
  } else if (page_count[category] - 1 === 0) {
    page_count[category] -= 1;
    drawNews(category, page_count[category]);
    hideArrow("left");
  } else {
    page_count[category] -= 1;
    drawNews(category, page_count[category]);
  }
  showArrow("right");
  restartAnimation();
  setNowCount();
}

function clickCategory(target) {
  checkSameCategory(target);
  page_count[target.firstElementChild.innerText.trim()] = 0;
  now_category = target.querySelector(".nav-item").textContent.trim();
  showArrow("right");
  hideArrow("left");
  initProgressWhenCategoryClick(target);
  drawNews(now_category, page_count[now_category]);
}

function initProgressWhenCategoryClick(target) {
  const $progress_bar = document.querySelector(".progress-bar");
  $progress_bar.classList.remove("progress-bar");
  target.classList.add("progress-bar");
  addProgressIterEvent(target);
  document.querySelector(".count").remove();
  insertCountDiv(document.querySelector(".progress-bar"));
}

function initCategoryClass() {
  const categories = document.querySelectorAll(".list-nav li");
  categories.forEach(category => category.addEventListener("click", e => clickCategory(e.target)));
  const $progress_bar = document.querySelector(".progress-bar");
  insertCountDiv($progress_bar);
  addProgressIterEvent($progress_bar);
  document.querySelector(".right-btn").addEventListener("click", () => clickListRightBtn(now_category));
  document.querySelector(".left-btn").addEventListener("click", () => clickListLeftBtn(now_category));
}

function nextNewsWhenProgressEnd() {
  if (page_count[now_category] === total_pages[now_category] - 1) {
    if (checkLastCategory()) {
      setFisrtCategory();
    } else {
      page_count[now_category] = 0;
      const $progress_bar = document.querySelector(".progress-bar");
      removeProgressIterEvent($progress_bar);
      now_category = category[category.indexOf(now_category) + 1];
      removeProgressStatus();
      document.querySelectorAll(".nav-item").forEach(nav => {
        if (nav.textContent === now_category) {
          const $nav_li = nav.parentElement;
          $nav_li.classList.add("progress-bar");
          insertCountDiv($nav_li);
          addProgressIterEvent($nav_li);
        }
      });
    }
  } else {
    page_count[now_category] += 1;
  }
  redrawNewsContents();
}

function redrawNewsContents() {
  drawNews(now_category, page_count[now_category]);
  setNowCount();
  drawArrow();
}

function insertCountDiv(component) {
  component.insertAdjacentHTML(
    "beforeend",
    `
  <div class="count font-init"><span class="now-count">${page_count[now_category] + 1}</span> <span>/</span><span class="total-count">${
      total_pages[now_category]
    }</span></div>
  `,
  );
}

function addProgressIterEvent(component) {
  component.addEventListener("animationiteration", nextNewsWhenProgressEnd);
}

function removeProgressIterEvent(component) {
  component.removeEventListener("animationiteration", console.log("erase!"));
}

function removeProgressStatus() {
  document.querySelector(".progress-bar").classList.remove("progress-bar");
  document.querySelector(".count").remove();
}

function setNowCount() {
  document.querySelector(".now-count").textContent = page_count[now_category] + 1;
}

function hideArrow(direction) {
  document.querySelector(`.${direction}-btn`).classList.add("hidden");
}

function showArrow(direction) {
  document.querySelector(`.${direction}-btn`).classList.remove("hidden");
}

function checkSameCategory(target) {
  if (now_category === target.firstElementChild.textContent.trim()) {
    return;
  }
}

function insertNavArrow() {}

function checkLastCategory() {
  if (now_category === category[category.length - 1] && page_count[now_category] === total_pages[now_category] - 1) {
    return true;
  }
  return false;
}

function setFisrtCategory() {
  now_category = category[0];
  const $first_category = document.querySelector(".nav-item").parentElement;
  clickCategory($first_category);
}

function setSubListNav() {
  const subscribed_presses = presses.filter(press => press.isSub === true);
  console.log(subscribed_presses);
  const $sub_list_nav = document.querySelector(".sub-list-nav").firstElementChild;
  $sub_list_nav.innerHTML = ""; // 첫뻔째 li에 list-스타일넣기
  [...subscribed_presses].forEach(press => {
    const $li = document.createElement("li");
    $li.classList.add("sub-nav-item");
    $li.textContent = press.name;
    $sub_list_nav.append($li);
  });
  $sub_list_nav.firstChild.classList.add("list-progress-bar");
}

function drawSubListNews() {
  const subscribed_presses = presses.filter(press => press.isSub === true);
}

export { now_category, drawNews, clickListRightBtn, clickListLeftBtn, clickCategory, initCategoryClass, setSubListNav };

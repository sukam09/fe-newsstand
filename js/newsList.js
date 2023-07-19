import { listSubMouseClick } from "./subscribe.js";
import { checkIsSubscribe, getJSON } from "./utils.js";
import { STATE, DATA } from "./const.js";

const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
let presses;
let news_by_category;

function getNews() {
  return news_by_category[DATA.now_category];
}
async function initNewsInfo() {
  presses = await getJSON("/assets/media.json");
  news_by_category = await getJSON("/assets/media.json");
  DATA.now_category = "종합/경제";
  category.forEach(item => {
    DATA.total_pages[item] = news_by_category[item].length;
    DATA.page_count[item] = 0;
  });
}

function drawArrow() {
  if (DATA.page_count[DATA.now_category] === DATA.total_pages[DATA.now_category] - 1) {
    hideArrow("right");
    showArrow("left");
  } else if (DATA.page_count[DATA.now_category] === 0) {
    hideArrow("left");
    showArrow("right");
  } else {
    showArrow("right");
    showArrow("left");
  }
}

function drawNews() {
  const news = getNews()[DATA.page_count[DATA.now_category]]; // 뉴스
  document.querySelector(".press-brandmark").src = news.path_light;
  document.querySelector(".edit-date").textContent = news.editDate;
  document.querySelector(".thumbnail").src = news.thumbSrc;
  document.querySelector(".news-main .font-init").textContent = news.headTitle;
  const subList = document.querySelector(".news-sub-list");
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
  const $sub_btn = document.querySelector(".list-sub-btn");
  $sub_btn.src = checkIsSubscribe("name", news.name) !== undefined ? "../img/icons/cancelSubBtn.svg" : "../img/icons/subBtn.svg";
}

function restartAnimation() {
  const $animation = document.querySelector(".progress-bar");
  $animation.classList.remove("progress-bar");
  void $animation.offsetWidth; // Reflow를 유발하여 애니메이션 재시작을 위한 트리거
  $animation.classList.add("progress-bar");
}

function clickListRightBtn(category) {
  if (DATA.page_count[category] + 1 === DATA.total_pages[category] - 1) {
    DATA.page_count[category]++;
    hideArrow("right");
  } else {
    DATA.page_count[category]++;
  }
  drawNews();
  showArrow("left");
  restartAnimation();
  setNowCount();
}

function clickListLeftBtn(category) {
  if (DATA.page_count[category] - 1 === -1) {
    return;
  } else if (DATA.page_count[category] - 1 === 0) {
    DATA.page_count[category]--;
    hideArrow("left");
  } else {
    DATA.page_count[category]--;
  }
  drawNews();
  showArrow("right");
  restartAnimation();
  setNowCount();
}

function clickCategory(target) {
  checkSameCategory(target);
  DATA.page_count[target.firstElementChild.innerText.trim()] = 0;
  DATA.now_category = target.querySelector(".nav-item").textContent.trim();
  showArrow("right");
  hideArrow("left");
  initProgressWhenCategoryClick(target);
  drawNews(DATA.now_category, DATA.page_count[DATA.now_category]);
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
  document.querySelector(".right-btn").addEventListener("click", () => clickListRightBtn(DATA.now_category));
  document.querySelector(".left-btn").addEventListener("click", () => clickListLeftBtn(DATA.now_category));
  const $sub_btn = document.querySelector(".list-sub-btn");
  $sub_btn.addEventListener("click", e => listSubMouseClick(getNews()[DATA.page_count[DATA.now_category]], e.target));
}

function nextNewsWhenProgressEnd() {
  if (DATA.page_count[DATA.now_category] === DATA.total_pages[DATA.now_category] - 1) {
    if (checkLastCategory()) {
      setFisrtCategory();
    } else {
      DATA.page_count[DATA.now_category] = 0;
      const $progress_bar = document.querySelector(".progress-bar");
      removeProgressIterEvent($progress_bar);
      DATA.now_category = category[category.indexOf(DATA.now_category) + 1];
      removeProgressStatus();
      document.querySelectorAll(".nav-item").forEach(nav => {
        if (nav.textContent === DATA.now_category) {
          const $nav_li = nav.parentElement;
          $nav_li.classList.add("progress-bar");
          insertCountDiv($nav_li);
          addProgressIterEvent($nav_li);
        }
      });
    }
  } else {
    DATA.page_count[DATA.now_category] += 1;
  }
  redrawNewsContents();
}

function redrawNewsContents() {
  drawNews(DATA.now_category, DATA.page_count[DATA.now_category]);
  setNowCount();
  drawArrow();
}

function insertCountDiv(component) {
  component.insertAdjacentHTML(
    "beforeend",
    `
  <div class="count font-init"><span class="now-count">${
    DATA.page_count[DATA.now_category] + 1
  }</span> <span>/</span><span class="total-count">${DATA.total_pages[DATA.now_category]}</span></div>
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
  document.querySelector(".now-count").textContent = DATA.page_count[DATA.now_category] + 1;
  document.querySelector(".total-count").textContent = DATA.total_pages[DATA.now_category];
}

function hideArrow(direction) {
  document.querySelector(`.${direction}-btn`).classList.add("hidden");
}

function showArrow(direction) {
  document.querySelector(`.${direction}-btn`).classList.remove("hidden");
}

function checkSameCategory(target) {
  if (DATA.now_category === target.firstElementChild.textContent.trim()) {
    return;
  }
}

function checkLastCategory() {
  if (
    DATA.now_category === category[category.length - 1] &&
    DATA.page_count[DATA.now_category] === DATA.total_pages[DATA.now_category] - 1
  ) {
    return true;
  }
  return false;
}

function setFisrtCategory() {
  DATA.now_category = category[0];
  const $first_category = document.querySelector(".nav-item").parentElement;
  clickCategory($first_category);
}

export { setNowCount, drawNews, clickListRightBtn, clickListLeftBtn, clickCategory, initCategoryClass, initNewsInfo };

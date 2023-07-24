import { listSubMouseClick } from "./subscribe.js";
import { checkIsSubscribe, getJSON, setDisplay } from "./utils.js";
import { setSubListNav } from "./subscribeListView.js";
import { getState, setState, subscribe, setDictState } from "./observer/observer.js";
import {
  categoryPageCount,
  clickedUnsubPress,
  isDark,
  isSubView,
  nowCategory,
  subListPageCount,
  subscribedPress,
  totalCategoryPages,
} from "./store/store.js";

const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
let news;

function getNews() {
  // 현재 카테고리의 뉴스 가져오기
  const now_category = getState(nowCategory);
  return news[now_category];
}
async function initNewsInfo() {
  // news 정보 세팅
  news = await getJSON("/assets/media.json");
  category.forEach(item => {
    setDictState(totalCategoryPages, { [item]: news[item].length });
    setDictState(categoryPageCount, { [item]: 0 });
  });
  subscribe(subListPageCount, drawListArrow);
  subscribe(subListPageCount, setSubListNav);
  subscribe(subListPageCount, drawNews);
  subscribe(categoryPageCount, drawListArrow);
  subscribe(categoryPageCount, drawNews);
  subscribe(categoryPageCount, setNowCount);
  subscribe(subListPageCount, restartAnimation);
  subscribe(categoryPageCount, restartAnimation);
  subscribe(nowCategory, drawListArrow);
  subscribe(nowCategory, drawNews);
}

function drawListArrow() {
  setDisplay(".list-prev", "query", "block");
  setDisplay(".list-next", "query", "block");
  const subscribed_press = getState(subscribedPress);
  const sub_list_page = getState(subListPageCount);
  const now_category = getState(nowCategory);
  const list_page = getState(categoryPageCount);
  const total_category_count = getState(totalCategoryPages);
  if (getState(isSubView)) {
    if (subscribed_press.length === 1) {
      setDisplay(".list-prev", "query", "none");
      setDisplay(".list-next", "query", "none");
    } else if (sub_list_page === 0) {
      setDisplay(".list-prev", "query", "none");
    } else if (sub_list_page + 1 === subscribed_press.length) {
      setDisplay(".list-next", "query", "none");
    }
  } else {
    // 그냥 리스트 뷰
    if (list_page[now_category] + 1 === total_category_count[now_category]) {
      setDisplay(".list-next", "query", "none");
    } else if (list_page[now_category] === 0) {
      setDisplay(".list-prev", "query", "none");
    }
  }
  setNowCount();
}

function drawNews() {
  const now_category = getState(nowCategory);
  const news_by_category = getNews();
  const news = getState(isSubView)
    ? getState(subscribedPress)[getState(subListPageCount)]
    : news_by_category[getState(categoryPageCount)[now_category]];
  if (news === undefined) {
    return;
  }
  document.querySelector(".press-brandmark").src = getState(isDark) ? news.path_dark : news.path_light;
  document.querySelector(".edit-date").textContent = news.editDate;
  document.querySelector(".thumbnail").src = news.thumbSrc;
  document.querySelector(".news-main p").textContent = news.headTitle;
  const subList = document.querySelector(".news-sub-list");
  subList.innerHTML = "";
  news.subTitle.forEach(subnews => {
    const $li = document.createElement("li");
    $li.classList.add("text-bold", "available-medium16");
    $li.innerText = subnews;
    subList.append($li);
  });
  const $caption = document.createElement("li");
  $caption.classList.add("caption", "display-medium14", "text-weak");
  $caption.innerText = `${news.name} 언론사에서 직접 편집한 뉴스입니다.`;
  subList.append($caption);
  const $sub_btn = document.querySelector(".list-sub-btn");
  $sub_btn.src = checkIsSubscribe("name", news.name) !== undefined ? "../img/icons/cancelSubBtn.svg" : "../img/icons/subBtn.svg";
  drawListArrow();
}

function restartAnimation() {
  // 프로그래스 애니메이션 재시작
  if (checkSubPressEmpty) {
    return;
  }
  const _class = getState(isSubView) ? "list-progress-bar" : "progress-bar";
  const c_query = "." + _class;
  const $animation = document.querySelector(c_query);
  $animation.classList.remove(_class);
  void $animation.offsetWidth;
  $animation.classList.add(_class);
}

function pressListArrow(increment) {
  const is_sub_view = getState(isSubView);
  const now_category = getState(nowCategory);
  const category_page_count = getState(categoryPageCount);
  if (is_sub_view) {
    setState(subListPageCount, getState(subListPageCount) + increment);
  } else {
    setDictState(categoryPageCount, { [now_category]: category_page_count[now_category] + increment });
  }
}

function clickCategory({ target: target }) {
  checkSameCategory(target);
  const clicked_category = target.firstElementChild.innerText;
  setDictState(categoryPageCount, { [clicked_category]: 0 });
  setState(nowCategory, target.querySelector(".nav-item").textContent);
  initProgressWhenCategoryClick(target);
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
  categories.forEach(category => category.addEventListener("click", clickCategory));
  const $progress_bar = document.querySelector(".progress-bar");
  insertCountDiv($progress_bar);
  addProgressIterEvent($progress_bar);
  document.querySelector(".list-next").addEventListener("click", pressListArrow.bind("null", 1));
  document.querySelector(".list-prev").addEventListener("click", pressListArrow.bind("null", -1));
  const $sub_btn = document.querySelector(".list-sub-btn"); // 구독버튼!

  $sub_btn.addEventListener("click", () => {
    const news = getState(isSubView)
      ? getState(subscribedPress)[getState(subListPageCount)]
      : getNews()[getState(categoryPageCount)[getState(nowCategory)]];
    setState(clickedUnsubPress, news);
    listSubMouseClick(news);
  });
}

function nextNewsWhenProgressEnd() {
  const now_category = getState(nowCategory);
  const page_count = getState(categoryPageCount);
  if (page_count[now_category] === getState(totalCategoryPages)[now_category] - 1) {
    if (checkLastCategory()) {
      setFisrtCategory();
    } else {
      setDictState(categoryPageCount, { [now_category]: 0 });
      const $progress_bar = document.querySelector(".progress-bar");
      removeProgressIterEvent($progress_bar);
      setState(nowCategory, category[category.indexOf(now_category) + 1]);
      removeProgressStatus();
      document.querySelectorAll(".nav-item").forEach(nav => {
        if (nav.textContent === getState(nowCategory)) {
          const $nav_li = nav.parentElement;
          $nav_li.classList.add("progress-bar");
          insertCountDiv($nav_li);
          addProgressIterEvent($nav_li);
        }
      });
    }
  } else {
    setDictState(categoryPageCount, { [now_category]: page_count[now_category] + 1 });
  }
}

function insertCountDiv(component) {
  const now_category = getState(nowCategory);
  component.insertAdjacentHTML(
    "beforeend",
    `
  <div class="count font-init"><span class="now-count">${
    getState(categoryPageCount)[now_category] + 1
  }</span> <span>/</span><span class="total-count">${getState(totalCategoryPages)[now_category]}</span></div>
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
  const now_category = getState(nowCategory);
  document.querySelector(".now-count").textContent = getState(categoryPageCount)[now_category] + 1;
  document.querySelector(".total-count").textContent = getState(totalCategoryPages)[now_category];
}

function checkSameCategory(target) {
  if (getState(nowCategory) === target.firstElementChild.textContent) {
    return;
  }
}

function checkLastCategory() {
  const now_category = getState(nowCategory);
  if (now_category === category[category.length - 1]) {
    return true;
  }
  return false;
}

function setFisrtCategory() {
  setState(nowCategory, category[0]);
  const $first_category = document.querySelector(".nav-item").parentElement;
  clickCategory({ target: $first_category });
}

function checkSubPressEmpty() {
  if (getState(subscribedPress).length === 0) {
    return true;
  }
  return false;
}

export { drawListArrow, setNowCount, drawNews, clickCategory, initCategoryClass, initNewsInfo };

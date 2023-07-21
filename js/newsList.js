import { listSubMouseClick } from "./subscribe.js";
import { checkIsSubscribe, getJSON, setDisplay } from "./utils.js";
import { DATA, STATE } from "./const.js";
import { setSubListNav } from "./subscribeListView.js";

const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
let news;

function getNews() {
  // 현재 카테고리의 뉴스 가져오기
  return news[DATA.now_category];
}
async function initNewsInfo() {
  // news 정보 세팅
  news = await getJSON("/assets/media.json");
  DATA.now_category = "종합/경제";
  category.forEach(item => {
    DATA.total_pages[item] = news[item].length;
    DATA.page_count[item] = 0;
  });
}

function drawListArrow() {
  setDisplay(".list-prev", "query", "block");
  setDisplay(".list-next", "query", "block");
  if(STATE.IS_SUB_VIEW) {
    if(STATE.SUB_DATA.length === 1) {
      setDisplay(".list-prev", "query", "none");
      setDisplay(".list-next", "query", "none");
    }
    else if(STATE.SUB_NEWS_PAGE === 0) {
      setDisplay(".list-prev", "query", "none");
    } else if ( STATE.SUB_NEWS_PAGE + 1 === STATE.SUB_DATA.length) {
      setDisplay(".list-next", "query", "none");
    }
  } else { // 그냥 리스트 뷰
    if (DATA.page_count[DATA.now_category] + 1 === DATA.total_pages[DATA.now_category]) {
      setDisplay(".list-next", "query", "none");
    } else if (DATA.page_count[DATA.now_category] === 0) {
      setDisplay(".list-prev", "query", "none");
    }  
  }
  setNowCount();
}

function drawNews() {
  const news = STATE.IS_SUB_VIEW ? STATE.SUB_DATA[STATE.SUB_NEWS_PAGE] : getNews()[DATA.page_count[DATA.now_category]];
  console.log(news);
  document.querySelector(".press-brandmark").src = STATE.IS_DARK ? news.path_dark : news.path_light;
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

function restartAnimation(_class) { // 프로그래스 애니메이션 재시작
  const c_query = "."+_class;
  const $animation = document.querySelector(c_query);
  $animation.classList.remove(_class);
  void $animation.offsetWidth; 
  $animation.classList.add(_class);
}

function pressListArrow(increment) { 
  if(STATE.IS_SUB_VIEW) {
    STATE.SUB_NEWS_PAGE += increment;
  } else {
    DATA.page_count[DATA.now_category] += increment;
  }
  drawListArrow();
  drawNews();
  const progress_bar = STATE.IS_SUB_VIEW ? "list-progress-bar" : "progress-bar"
  restartAnimation(progress_bar);
  setSubListNav();
  setNowCount();
}


function clickCategory(target) {
  checkSameCategory(target);
  DATA.page_count[target.firstElementChild.innerText.trim()] = 0;
  DATA.now_category = target.querySelector(".nav-item").textContent.trim();
  drawListArrow()
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
  document.querySelector(".list-next").addEventListener("click", () => pressListArrow(1));
  document.querySelector(".list-prev").addEventListener("click", () => pressListArrow(-1));
  const $sub_btn = document.querySelector(".list-sub-btn"); // 구독버튼!
  $sub_btn.addEventListener("click", () => {
    const news = STATE.IS_SUB_VIEW ? STATE.SUB_DATA[STATE.SUB_NEWS_PAGE] : getNews()[DATA.page_count[DATA.now_category]];
    STATE.CLICKED_UNSUB_NEWS = news;
    listSubMouseClick(news);
  });
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
  drawNews();
  setNowCount();
  drawListArrow();
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

export { drawListArrow,setNowCount, drawNews, clickCategory, initCategoryClass, initNewsInfo };

import { fetchCategoryNews } from "../../api.js";

let news_data;
let CURRENT_PAGE = 1;
let CURRENT_CATEGORY = 0;
let intervalId;
const PAGE_AUTO_MOVING_TIME = 5000;

const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
const categoryLength = [];

//뉴스 데이터 패치 -> 탭 정보(언론사 개수 초기화) -> 언론사 뉴스 html 요소 생성 및 초기화
async function fetchCategoryNewsData() {
  try {
    news_data = await fetchCategoryNews("../Data/category_news.json");
    fieldInit();
    createPressNewsSection();
  } catch (e) {
    console.error(e);
  }
}

/**
 * 카테고리 변경시 tab 스타일 변경
 */
function tabClassChange(targetTab, previousProgressTab, index) {
  const progressTabName = previousProgressTab.querySelector(".text-category-name");
  const progressTabNumber = previousProgressTab.querySelector(".text-category-number");

  previousProgressTab.classList.remove("progress-tab");
  previousProgressTab.classList.add("text-tab");
  progressTabName.classList.remove("selected-bold14");
  progressTabName.classList.add("available-medium14");
  progressTabNumber.classList.add("hidden");

  targetTab.classList.remove("text-tab");
  targetTab.classList.add("progress-tab");
  const textTabName = targetTab.querySelector(".text-category-name");
  const textTabNumber = targetTab.querySelector(".text-category-number");
  textTabName.classList.remove("available-medium14");
  textTabName.classList.add("selected-bold14");
  textTabNumber.classList.remove("hidden");

  textTabNumber.querySelector(".present").innerHTML = `${CURRENT_PAGE} / `;
  textTabNumber.querySelector(".entire").innerHTML = index ? categoryLength[index] : categoryLength[CURRENT_CATEGORY];
}
function progressWidthChange(progressTab) {
  const progressRatioTab = progressTab.querySelector(".progress-ratio");
  progressRatioTab.style.width = `${progressTab.offsetWidth * (CURRENT_PAGE / categoryLength[CURRENT_CATEGORY]).toFixed(2)}px`;
}

/**
 * 각 카테고리 클릭시 이벤트 리스너 등록
 */
function tabClickEventRegister() {
  const tabs = document.querySelectorAll("main .news-list-wrap .each-tab");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", fieldTabClickEventHandler.bind(this, tab, index));
  });
}

/**
 * <카테고리 변경 : 클릭>
 * 현재 페이지 1로 초기화
 * 현재 카테고리 인텍스 변경
 * 카테고리 탭 스타일 변경 - 1. 배경색, 2. 프로그래스 셋팅
 * 타이머 재실행
 * 변경된 카테고리에 따른 뉴스 내용 변경
 */
function fieldTabClickEventHandler(targetTab, index) {
  CURRENT_PAGE = 1;
  CURRENT_CATEGORY = index;

  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const progressRatio = progressTab.querySelector(".progress-ratio");
  progressRatio.style.width = "0px";

  progressWidthChange(targetTab);
  tabClassChange(targetTab, progressTab, index);

  clearInterval(intervalId);
  updateTimer();
  updatePressNewsSection();
}

/**
 * <카테고리 변경 : 자동>
 * 카테고리 탭 스타일 변경 : 프로그래스
 * 변경된 카테고리에 따른 내용 변경
 */
function fieldTabAutoChange() {
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const nextProgressEl = document.querySelectorAll(".news-list-wrap .field-tab .each-tab")[CURRENT_CATEGORY];

  //프로그래스 스타일
  tabClassChange(nextProgressEl, progressTab);
  progressWidthChange(nextProgressEl);

  updatePressNewsSection();
}

/**
 * 첫 리스트 뷰 로딩 - 처음 데이터로 구성
 * 첫 프로그래스 바 셋팅 - 1. 현재페이지/페이지 개수, 2. width
 */
function fieldInit() {
  news_data.forEach((data) => {
    categoryLength.push(data.press.length);
  });

  const firstTab = document.querySelector("main .news-list-wrap .progress-tab");
  const firstTabNumber = firstTab.querySelector(".text-category-number");
  firstTabNumber.querySelector(".present").innerHTML = `${CURRENT_PAGE} / `;
  firstTabNumber.querySelector(".entire").innerHTML = ` ${categoryLength[0]}`;

  progressWidthChange(firstTab);
}

/**
 * 현재 카테고리 페이지 정보 변경
 * 자동으로 다른 카테고리로 넘어갈 경우 고려
 */
function autoUpdateProgressTab() {
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const progressRatio = progressTab.querySelector(".progress-ratio");
  const progressTabNumber = progressTab.querySelector(".text-category-number");
  progressTabNumber.querySelector(".present").innerHTML = `${CURRENT_PAGE} / `;

  progressWidthChange(progressTab);

  if (CURRENT_PAGE === 1) {
    fieldTabAutoChange();
  }
}

/**
 * 언론사 변경(페이지 변경)에 따른 뉴스 내용 업데이트
 */
function updatePressNewsSection() {
  const pressInfo = document.querySelector(".press-news-wrap .press-info");
  const pressLogo = pressInfo.querySelector(".press-icon");
  pressLogo.src = news_data[CURRENT_CATEGORY].press[CURRENT_PAGE - 1].path;

  const mainNews = document.querySelector(".press-news-wrap .news .news-main");
  const subNews = document.querySelector(".press-news-wrap .news .news-sub");

  mainNews.querySelector(".news-title").innerHTML = news_data[CURRENT_CATEGORY].press[CURRENT_PAGE - 1].news[0];
  mainNews.querySelector(".news-img").setAttribute("src", "https://picsum.photos/320/200");
  subNews.querySelectorAll(".each-news-title").forEach((news, index) => {
    news.innerHTML = news_data[CURRENT_CATEGORY].press[CURRENT_PAGE - 1].news[index + 1];
  });
}

/**
 * 페이지 자동 이동 타이머 : 5초
 * 카테고리 자체가 변경되는 경우, 마지막 카테고리의 마지막 페이지일 경우도 고려
 * 페이지 자동 이동 후 카테고리 탭 & 뉴스 기사 업데이트
 */
function updateTimer() {
  intervalId = setInterval(() => {
    //카테고리 변경
    if (CURRENT_PAGE === news_data[CURRENT_CATEGORY].press.length) {
      CURRENT_CATEGORY++;
      CURRENT_PAGE = 0;
    }
    //카테고리 처음으로
    if (CURRENT_CATEGORY === categoryLength.length) {
      CURRENT_CATEGORY = 0;
      CURRENT_PAGE = 1;
    } else CURRENT_PAGE++;
    updatePressNewsSection();
    autoUpdateProgressTab();
  }, PAGE_AUTO_MOVING_TIME);
}

function createPressNewsSection() {
  const pressNewsDiv = document.createElement("div");
  pressNewsDiv.className = "press-news-wrap";
  try {
    if (!news_data) {
      throw Error("Empty Data");
    }
    const firstPress = news_data[CURRENT_CATEGORY].press[CURRENT_PAGE - 1].news.slice(1);

    pressNewsDiv.innerHTML = `
    <div class="press-info">
        <img class="press-icon" src="${news_data[CURRENT_CATEGORY].press[CURRENT_PAGE - 1].path}"/>
        <span class="edit-time display-medium12">2023.02.10 18:24 편집</span>
        <button class="subscribe-btn">
        
          <img  class="plus-btn" src="../../asset/button/plus.png"/>
          <span class="scribe-text available-medium12">구독하기</span>
        
        </button>
    </div>
    <div class="news">
        <div class="news-main">
          <img class="news-img" src="https://picsum.photos/320/200"/>
          <span class="news-title available-medium16">${news_data[CURRENT_CATEGORY].press[CURRENT_PAGE - 1].news[0]} </span>
        </div>
        <div class="news-sub">
           ${firstPress.map((news) => `<span class="each-news-title available-medium16">${news}</span>`).join("")}
          <span class="explain display-medium14"> ~ 언론사에서 직접 편집한 뉴스입니다.</span>
        </div>
    </div>

  `;

    const news_list_wrap = document.querySelector("main .news-list-wrap");
    news_list_wrap.appendChild(pressNewsDiv);
  } catch (e) {
    console.error(e);
  }
}

function createTabs() {
  const category_section_tab = document.createElement("section");
  category_section_tab.className = "field-tab";
  let tabs = "";

  category.forEach((category, index) => {
    tabs += `
        <div class="each-tab ${index === 0 ? "progress-tab" : "text-tab"}">
            <div class="text-wrap">
                <span class="text-category-name ${index === 0 ? "selected-bold14" : " available-medium14"}">${category}</span>
                <span class="text-category-number">
                    <span class="present display-bold12"></span>
                    <span class="entire display-bold12"></span>
                </span>
            </div>
            <div class="progress-ratio">
            </div>
        </div>
`;
  });
  category_section_tab.innerHTML = tabs;

  const news_list_wrap = document.querySelector("main .news-list-wrap");
  news_list_wrap.appendChild(category_section_tab);
}

function createNewsList() {
  const main = document.querySelector("main");

  const news_list_wrap = document.createElement("div");
  news_list_wrap.className = "news-list-wrap";

  main.appendChild(news_list_wrap);
}

export function printList() {
  //HTML 요소 생성
  createNewsList();
  createTabs();

  fetchCategoryNewsData(); // 데이터 패치 및 초기화
  tabClickEventRegister(); // 탭 클릭 이벤트
  updateTimer();
}

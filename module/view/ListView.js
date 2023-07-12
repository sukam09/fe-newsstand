import { fetchCategoryNews } from "../../api.js";

let news_data;
let CURRENT_PAGE = 1;

const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
const categoryLength = [];

function tabClickEventRegister() {
  const tabs = document.querySelectorAll("main .news-list-wrap .each-tab");
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
      const progressTabName = progressTab.querySelector(".text-category-name");
      const progressTabNumber = progressTab.querySelector(".text-category-number");

      progressTab.classList.remove("progress-tab");
      progressTab.classList.add("text-tab");
      progressTabName.classList.remove("selected-bold14");
      progressTabName.classList.add("available-medium14");
      progressTabNumber.classList.add("hidden");

      tab.classList.remove("text-tab");
      tab.classList.add("progress-tab");
      const textTabName = tab.querySelector(".text-category-name");
      const textTabNumber = tab.querySelector(".text-category-number");
      textTabName.classList.remove("available-medium14");
      textTabName.classList.add("selected-bold14");
      textTabNumber.classList.remove("hidden");

      textTabNumber.querySelector(".present").innerHTML = `${CURRENT_PAGE} / `;
      textTabNumber.querySelector(".entire").innerHTML = categoryLength[index];
    });
  });
}

function fieldInit() {
  news_data.forEach((data) => {
    categoryLength.push(data.press.length);
  });

  const firstTab = document.querySelector("main .news-list-wrap .progress-tab");
  const firstTabNumber = firstTab.querySelector(".text-category-number");
  firstTabNumber.querySelector(".present").innerHTML = CURRENT_PAGE;
  firstTabNumber.querySelector(".entire").innerHTML = ` / ${categoryLength[0]}`;
}

async function fetchCategoryNewsData() {
  try {
    news_data = await fetchCategoryNews("../Data/category_news.json");
    console.log(news_data);
    fieldInit();
    createPressNewsSection();
  } catch (e) {
    console.error(e);
  }
}

function updateTimer() {
  const intervalId = setInterval(() => {
    if (CURRENT_PAGE === news_data[CURRENT_CATEGORY].press.length) {
      console.log("카테고리 변경");
      CURRENT_CATEGORY++;
      CURRENT_PAGE = 0;
    }
    if (CURRENT_CATEGORY === news_data.length - 1) {
      console.log("처음 카테고리로");
      CURRENT_CATEGORY = 0;
      CURRENT_PAGE = 0;
    } else CURRENT_PAGE++;
    updatePressNewsSection();
  }, 5000);
}

function updatePressNewsSection() {
  const pressInfo = document.querySelector(".press-news-wrap .press-info");
  const pressLogo = pressInfo.querySelector(".press-icon");
  pressLogo.src = news_data[CURRENT_CATEGORY].press[CURRENT_PAGE - 1].path;

  const mainNews = document.querySelector(".press-news-wrap .news .news-main");
  const subNews = document.querySelector(".press-news-wrap .news .news-sub");
  mainNews.querySelector(".news-title").innerHTML = news_data[CURRENT_PAGE].press[CURRENT_PAGE - 1].news[0];
  subNews.querySelectorAll(".each-news-title").forEach((news, index) => {
    news.innerHTML = news_data[CURRENT_CATEGORY].press[CURRENT_PAGE - 1].news[index + 1];
  });
}

function createPressNewsSection() {
  const pressNewsDiv = document.createElement("div");
  pressNewsDiv.className = "press-news-wrap";
  try {
    if (!news_data) {
      throw Error("Empty Data");
    }
    const firstPress = news_data[CURRENT_CATEGORY].press[CURRENT_PAGE].news.slice(1);

    pressNewsDiv.innerHTML = `
    <div class="press-info">
        <img class="press-icon" src="${news_data[CURRENT_CATEGORY].press[CURRENT_PAGE].path}"/>
        <span class="edit-time display-medium12">2023.02.10 18:24 편집</span>
        <button class="subscribe-btn">
        
          <img  class="plus-btn" src="../../asset/button/plus.png"/>
          <span class="scribe-text available-medium12">구독하기</span>
        
        </button>
    </div>
    <div class="news">
        <div class="news-main">
          <img class="news-img" src="https://picsum.photos/320/200"/>
          <span class="news-title available-medium16">${news_data[CURRENT_CATEGORY].press[CURRENT_PAGE].news[0]} </span>
        </div>
        <div class="news-sub">
           ${firstPress.map((news) => `<span class="available-medium16">${news}</span>`).join("")}
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

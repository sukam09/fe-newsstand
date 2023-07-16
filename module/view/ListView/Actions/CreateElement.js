const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];

const FIRST_CATEGORY = 0;
const FIRST_PAGE = 1;

export function createPressNewsSection(news_data) {
  const pressNewsDiv = document.createElement("div");
  pressNewsDiv.className = "press-news-wrap";
  try {
    if (!news_data) {
      throw Error("Empty Data");
    }
    // CURRENT_PAGE = LIST_PAGE.current_list_page;

    const firstPress = news_data[FIRST_CATEGORY].press[FIRST_PAGE - 1].news.slice(1);

    pressNewsDiv.innerHTML = `
      <div class="press-info">
          <img class="press-icon" src="../../../../asset/icons/basic/${news_data[FIRST_CATEGORY].press[FIRST_PAGE].path}"/>
          <span class="edit-time display-medium12">2023.02.10 18:24 편집</span>
          <button class="subscribe-btn">
          
            <img  class="plus-btn" src="../../asset/button/plus.png"/>
            <span class="scribe-text available-medium12">구독하기</span>
          
          </button>
      </div>
      <div class="news">
          <div class="news-main">
            <img class="news-img" src="https://picsum.photos/320/200?random=${Math.random()}""/>
            <span class="news-title available-medium16">${news_data[FIRST_CATEGORY].press[FIRST_PAGE - 1].news[0]} </span>
          </div>
          <div class="news-sub">
             ${firstPress.map((news) => `<span class="each-news-title available-medium16">${news}</span>`).join("")}
            <span class="explain display-medium14"> ${news_data[FIRST_CATEGORY].press[FIRST_PAGE - 1].name} 언론사에서 직접 편집한 뉴스입니다.</span>
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

export function createListElement() {
  createNewsList();
  createTabs();
}

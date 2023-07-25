import { shuffle_press } from "../util/shuffle.js";
import { VIEW, LIST_PAGE } from "../model/global.js";
import { news_data } from "./grid.js";
import { category, eachCategoryLength, setNews } from "./list.js";
import { fieldClick, fieldXScroll } from "../controller/Components/field.js";
import { ENTIRE } from "../constant.js";

export function renderTabs(news) {
  let CATEGORY = category;

  const currentTab = VIEW.tab;

  if (news?.length > 0) {
    const subscribePressNames = news.map((press) => press.name);
    CATEGORY = currentTab === ENTIRE ? CATEGORY : subscribePressNames;
    const category_section_tab = document.createElement("section");
    category_section_tab.className = "field-tab";

    let tabs = "";
    CATEGORY.forEach((category, index) => {
      tabs += `
              <div class="each-tab ${index === LIST_PAGE.category ? "progress-tab" : "text-tab"}">
                  <div class="text-wrap">
                      <span class="text-category-name ${index === LIST_PAGE.category ? "selected-bold14" : " available-medium14"}">${category}</span>
                      ${
                        currentTab === ENTIRE
                          ? `      <span class="text-category-number">
                                        <span class="present display-bold12">${LIST_PAGE.page + 1} / </span>
                                        <span class="entire display-bold12">${news.length}</span>
                                    </span>`
                          : "<img class='chevron-right' src='../../asset/icons/chevron-right.png'>"
                      }
                    
                  </div>
                  <div  class="progress-ratio">
                  </div>
              </div>
      `;
    });
    category_section_tab.innerHTML = tabs;
    const news_list_wrap = document.querySelector("main .news-list-wrap");
    news_list_wrap.appendChild(category_section_tab);
  }

  //탭 이벤트 등록
  fieldClick();
  fieldXScroll();
}
export function updateField() {
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const progressTabNumber = progressTab.querySelector(".text-category-number");
  progressTabNumber.querySelector(".present").innerHTML = `${LIST_PAGE.page + 1} / `;
}
export function updateCategory() {
  if (VIEW.tab === ENTIRE) {
    const categoryNews = news_data.filter((press) => press.category === category[LIST_PAGE.category]);
    setNews(shuffle_press(categoryNews));
  }
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const nextProgressEl = document.querySelectorAll(".news-list-wrap .field-tab .each-tab")[LIST_PAGE.category];

  //카테고리 타켓 탭 스타일 변경
  tabClassChange(nextProgressEl, progressTab);
}

function tabClassChange(targetTab, previousProgressTab) {
  const CURRENT_PAGE = LIST_PAGE.page;
  const CURRENT_CATEGORY = LIST_PAGE.category;

  const progressTabName = previousProgressTab?.querySelector(".text-category-name");
  const progressTabNumber = previousProgressTab?.querySelector(".text-category-number");

  previousProgressTab?.classList.remove("progress-tab");
  previousProgressTab?.classList.add("text-tab");
  progressTabName?.classList.remove("selected-bold14");
  progressTabName?.classList.add("available-medium14");
  progressTabNumber?.classList.add("hidden");

  targetTab.classList.remove("text-tab");
  targetTab.classList.add("progress-tab");

  if (VIEW.tab === ENTIRE) {
    const textTabName = targetTab.querySelector(".text-category-name");
    const textTabNumber = targetTab.querySelector(".text-category-number");
    textTabName.classList.remove("available-medium14");
    textTabName.classList.add("selected-bold14");
    textTabNumber.classList.remove("hidden");

    textTabNumber.querySelector(".present").innerHTML = `${CURRENT_PAGE} / `;
    textTabNumber.querySelector(".entire").innerHTML = eachCategoryLength[CURRENT_CATEGORY];
  }
}
export function prevProgressWidthChange(progressTab) {
  const progressRatio = progressTab.querySelector(".progress-ratio");
  progressRatio.style.width = "0px";
}

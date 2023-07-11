import { fetchCategoryNews } from "../api.js";

let news_data;
let CURRENT_PAGE = 1;

const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];

function fieldTabClick() {
  const textTabs = document.querySelectorAll("main .news-list-wrap .text-tab");
  textTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
      const progressTabName = progressTab.querySelector(".text-category-name");

      const textTabName = tab.querySelector(".text-category-name");

      progressTab.classList.remove("progress-tab");
      progressTab.classList.add("text-tab");
      progressTabName.classList.remove("selected-bold14");
      progressTabName.classList.add("available-medium14");

      tab.classList.remove("text-tab");
      tab.classList.add("progress-tab");
      textTabName.classList.remove("available-medium14");
      textTabName.classList.add("selected-bold14");
    });
  });
}

function fieldInit(firstCategoryLength) {
  const firstTab = document.querySelector("main .news-list-wrap .progress-tab");
  const firstTabNumber = firstTab.querySelector(".text-category-number");
  firstTabNumber.querySelector(".present").innerHTML = CURRENT_PAGE;
  firstTabNumber.querySelector(".entire").innerHTML = `/${firstCategoryLength}`;
}

async function fetchCategoryNewsData() {
  try {
    news_data = await fetchCategoryNews("../Data/category_news.json");
    fieldInit(news_data[0].press.length);
  } catch (e) {
    console.error(e);
  }
}

function createTabs() {
  const category_section_tab = document.createElement("section");
  category_section_tab.className = "field-tab";
  let tabs = "";
  category.forEach((category, index) => {
    if (index === 0) {
      tabs = `
        <div class="progress-tab">
            <div class="text-wrap">
                <span class="text-category-name available-medium14">${category}</span>
                <span class="text-category-number display-bold12">
                    <span class="present"></span>
                    <span class="entire"></span>
                </span>
            </div>
        </div>
`;
    } else {
    }
    tabs += `
        <div class="text-tab">
          <div class="text-wrap">
              <span class="text-category-name available-medium14">${category}</span>
              <span class="text-category-number display-bold12 hidden">
                  <span class="present"></span>
                  <span class="entire"></span>
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
  createNewsList();
  createTabs();
  //
  fetchCategoryNewsData();
  fieldTabClick();
}

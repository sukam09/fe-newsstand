import { categoryList } from "../data/NewsContents.js";
import { runProgress, setNowCount, CATEGORY_NUM } from "./progressBar.js";

const SUB_NEWS_TITLE_NUM = 6;

let list_page_count = 0;

function shuffle(category_count_idx) {
  categoryList[category_count_idx].data.sort(() => Math.random() - 0.5);
}

function drawListView(category_count_idx, title_idx) {
  shuffle(category_count_idx);
  appendPressInfo(category_count_idx, title_idx);
  appendNewsMain(category_count_idx, title_idx);
}

function appendPressInfo(category_count_idx, title_idx) {
  document.querySelector(".press-brandmark").src =
    categoryList[category_count_idx].data[title_idx].logoSrc;
  document.querySelector(".edit-date").innerHTML =
    categoryList[category_count_idx].data[title_idx].editDate;
}

function appendNewsMain(category_count_idx, title_idx) {
  document.querySelector(".thumbnail").src =
    categoryList[category_count_idx].data[title_idx].imgSrc;
  document.querySelector(".news-main .font-init").innerHTML =
    categoryList[category_count_idx].data[title_idx].mainTitle;
  for (let i = 0; i < SUB_NEWS_TITLE_NUM; i++) {
    const lists = document.querySelectorAll(".news-sub-list li");
    lists[i].innerHTML =
      categoryList[category_count_idx].data[title_idx].subTitleList[i].title;
  }
  const list_caption = document.querySelector(".caption");
  list_caption.innerHTML = `${categoryList[category_count_idx].data[title_idx].name} 언론사에서 직접 편집한 뉴스입니다.`;
}

export { drawListView };

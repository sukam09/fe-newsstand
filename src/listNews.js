import { categoryList } from "../data/NewsContents.js";
import { CATEGORY_NUM } from "./progressBar.js";

const SUB_NEWS_NUM = 6;

let list_page_count = 0;

function drawListView(category_count_idx, title_idx) {
  appendPressInfo(category_count_idx, title_idx);
  appendNewsMain(category_count_idx, title_idx);
}

function appendPressInfo(category_count_idx, title_idx) {
  console.log(title_idx);
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
  for (let i = 0; i < SUB_NEWS_NUM; i++) {
    const lists = document.querySelectorAll(".news-sub-list li");
    lists[i].innerHTML =
      categoryList[category_count_idx].data[title_idx].subTitleList[i].title;
  }
  const list_caption = document.querySelector(".caption");
  list_caption.innerHTML = `${categoryList[category_count_idx].data[title_idx].name} 언론사에서 직접 편집한 뉴스입니다.`;
}

/***** list 넘기는 화살표 관련 함수 *****/
/* 뒤로 넘기기 */
const list_next = document.getElementById("list-next");
list_next.addEventListener("click", () => {
  const now_page = parseInt(
    document.querySelector(".progress-bar .now-count").innerHTML
  );
  drawListView(0, now_page % 3);
});

/* 앞으로 넘기기 */
const list_prev = document.getElementById("list-prev");
list_prev.addEventListener("click", () => {
  const now_page = parseInt(
    document.querySelector(".progress-bar .now-count").innerHTML
  );
  drawListView(0, now_page % 3);
});

export { drawListView };

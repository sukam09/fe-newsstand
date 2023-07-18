import { categoryList } from "../data/NewsContents.js";
import { showSnackBar, removeSnackBar } from "./snackBar.js";

const SUB_NEWS_TITLE_NUM = 6;
const SNACKBAR_POPUP_TIME = 5000;

//기사 셔플
function articleShuffle(category_idx) {
  categoryList[category_idx].data.sort(() => Math.random() - 0.5);
}

/***** 리스트뷰 아티클 섹션 그리기 *****/
function drawListView(category_idx, count_idx) {
  articleShuffle(category_idx);
  appendPressInfo(category_idx, count_idx);
  appendNewsMain(category_idx, count_idx);
}

function appendPressInfo(category_idx, count_idx) {
  const press_logo = categoryList[category_idx].data[count_idx].logoSrc;
  document.querySelector(".press-brandmark").src = press_logo;
  const edit_date = categoryList[category_idx].data[count_idx].editDate;
  document.querySelector(".edit-date").innerHTML = edit_date;
}

function appendNewsMain(category_idx, count_idx) {
  const thumbnail = categoryList[category_idx].data[count_idx].imgSrc;
  document.querySelector(".thumbnail").src = thumbnail;
  const main_title = categoryList[category_idx].data[count_idx].mainTitle;
  document.querySelector(".news-main .font-init").innerHTML = main_title;
  for (let i = 0; i < SUB_NEWS_TITLE_NUM; i++) {
    const sub_title =
      categoryList[category_idx].data[count_idx].subTitleList[i].title;
    document.querySelectorAll(".news-sub-list li")[i].innerHTML = sub_title;
  }
  const list_caption = `${categoryList[category_idx].data[count_idx].name} 언론사에서 직접 편집한 뉴스입니다.`;
  document.querySelector(".caption").innerHTML = list_caption;
}

let snackbar_timeout;
const subscribe_btn = document.querySelector(".subscribe-press-btn");
subscribe_btn.addEventListener("click", () => {
  showSnackBar();
  snackbar_timeout = setTimeout(function () {
    removeSnackBar();
  }, SNACKBAR_POPUP_TIME);
});

export { drawListView };

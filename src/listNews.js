import { showSnackBar, removeSnackBar } from "./snackBar.js";
import { getNewsContent } from "./api/api.js";
import { CATEGORY_NUM } from "./progressBar.js";

const SUB_NEWS_TITLE_NUM = 6;
const SNACKBAR_POPUP_TIME = 5000;

let categoryList = null;

let press_brandmark = document.querySelector(".press-brandmark");
let edit_date = document.querySelector(".edit-date");
let thumbnail = document.querySelector(".thumbnail");
let news_main_title = document.querySelector(".news-main .font-init");
let news_sub_list = document.querySelectorAll(".news-sub-list li");
let caption = document.querySelector(".caption");
const tab = document.querySelectorAll(".progress-item .count");

/***** 리스트뷰 프로그레스바 카운트/탭넘버 추가 *****/
async function appendCategoryTabNum() {
  if (categoryList === null) {
    categoryList = await getNewsContent();
  }
  for (let i = 0; i < CATEGORY_NUM; i++) {
    const currentData = categoryList[i];
    tab[i].innerHTML = `<span class="now-count">1</span> <span>/</span>
    <span>${currentData.tabs}`;
  }
}

/***** 리스트뷰 아티클 섹션 그리기 *****/
async function appendPressInfo(category_idx, count_idx) {
  if (categoryList === null) {
    categoryList = await getNewsContent();
  }
  const currentData = categoryList[category_idx].data[count_idx];
  press_brandmark.src = currentData.logoSrc;
  edit_date.innerHTML = currentData.editDate;
}

async function appendNewsMain(category_idx, count_idx) {
  if (categoryList === null) {
    categoryList = await getNewsContent();
  }
  const currentData = categoryList[category_idx].data[count_idx];
  thumbnail.src = currentData.imgSrc;
  news_main_title = currentData.mainTitle;
}

async function appendNewsSub(category_idx, count_idx) {
  if (categoryList === null) {
    categoryList = await getNewsContent();
  }
  const currentData = categoryList[category_idx].data[count_idx];
  for (let i = 0; i < SUB_NEWS_TITLE_NUM; i++) {
    news_sub_list[i].innerHTML = currentData.subTitleList[i].title;
  }
  caption.innerHTML = `${currentData.name} 언론사에서 직접 편집한 뉴스입니다.`;
}

function drawListView(category_idx, count_idx) {
  appendPressInfo(category_idx, count_idx);
  appendNewsMain(category_idx, count_idx);
  appendNewsSub(category_idx, count_idx);
}

/***** 스낵바 구현 *****/
let snackbar_timeout;
const subscribe_btn = document.querySelector(".subscribe-press-btn");
subscribe_btn.addEventListener("click", () => {
  showSnackBar();
  snackbar_timeout = setTimeout(function () {
    removeSnackBar();
  }, SNACKBAR_POPUP_TIME);
});

export { appendCategoryTabNum, drawListView };

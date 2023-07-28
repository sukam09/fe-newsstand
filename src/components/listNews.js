import { LIST_SUB_BTN_IMG, X_BTN_IMG } from "../util/path.js";
import { showSnackBar, removeSnackBar } from "./snackBar.js";
import { getNewsContent } from "../api/api.js";
import { CATEGORY_NUM } from "./progressBar.js";
import { removeAddClass } from "../util/utils.js";
import { getPressItemByName, removePressFromSubList } from "./gridView.js";
import { getState, setState } from "../observer/observer.js";
import { isLight, subscribedPress } from "../store/store.js";

const SUB_NEWS_TITLE_NUM = 6;
const SNACKBAR_POPUP_TIME = 5000;

let categoryList = null;

let press_brandmark = document.querySelector(".press-brandmark");
let edit_date = document.querySelector(".edit-date");
let thumbnail = document.querySelector(".thumbnail");
let news_main_title = document.querySelector(".news-main .font-init");
let caption = document.querySelector(".caption");
let tab = document.querySelectorAll(".progress-item .count");
let news_sub_list = document.querySelectorAll(".news-sub-list li");

/***** 리스트뷰 프로그레스바 카운트/탭넘버 추가 *****/
async function appendCategoryTabNum() {
  categoryList = await getNewsContent();
  for (let i = 0; i < CATEGORY_NUM; i++) {
    const currentData = categoryList[i];
    tab[i].innerHTML = `<span class="now-count">1</span> <span>/</span>
    <span>${currentData.tabs}`;
  }
}

/***** 리스트뷰 아티클 섹션 그리기 *****/
async function appendPressInfo(category_idx, count_idx) {
  const is_light_mode = getState(isLight);
  categoryList = await getNewsContent();
  const currentData = categoryList[category_idx].data[count_idx];
  press_brandmark.src = is_light_mode
    ? currentData.lightSrc
    : currentData.darkSrc;
  edit_date.innerHTML = currentData.editDate;
}

async function appendNewsMain(category_idx, count_idx) {
  categoryList = await getNewsContent();
  const currentData = categoryList[category_idx].data[count_idx];
  thumbnail.src = currentData.imgSrc;
  news_main_title.innerHTML = currentData.mainTitle;
  putSubscribeBtnImg(currentData.name);
}

async function appendNewsSub(category_idx, count_idx) {
  categoryList = await getNewsContent();
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

//구독 언론사라면 해지하기 버튼 삽입
function getSubInfoFromSubList(name) {
  let sub_press_list = getState(subscribedPress);
  sub_press_list = sub_press_list.filter((item) => item.name === name);
  return sub_press_list;
}

function putSubscribeBtnImg(name) {
  const img = document.querySelector(".subbtn-or-xbtn img");
  if (getSubInfoFromSubList(name).length !== 0) {
    img.src = X_BTN_IMG;
    removeAddClass(img, "subscribe-press-btn", "x-btn");
  } else {
    img.src = LIST_SUB_BTN_IMG;
    removeAddClass(img, "x-btn", "subscribe-press-btn");
  }
}

/***** 언론사 이름으로 구독 언론사 여부 확인 *****/
//아티클에서 언론사 이름 가져오기
async function getNameFromArticle(category_idx, count_idx) {
  categoryList = await getNewsContent();
  const currentData = categoryList[category_idx].data[count_idx];
  const press_name = currentData.name;
  return press_name;
}

/***** 구독하기 버튼 이벤트 + 스낵바 팝업 *****/
let snackbar_timeout;
const subscribe_btn = document.querySelector(".subscribe-press-btn");
subscribe_btn.addEventListener("click", async () => {
  if (subscribe_btn.classList.contains("subscribe-press-btn")) {
    showSnackBar();
    const category = document.querySelector(".progress-bar").classList[1];
    const category_idx = parseInt(category.slice(8, 9));
    const count_idx =
      parseInt(document.querySelector(".progress-bar .now-count").innerHTML) -
      1;
    const press_name = await getNameFromArticle(category_idx, count_idx);
    const sub_press = await getPressItemByName(press_name);
    const current_sub_list = getState(subscribedPress);
    setState(subscribedPress, [...current_sub_list, sub_press[0]]);
    drawListView(category_idx, count_idx);

    snackbar_timeout = setTimeout(function () {
      removeSnackBar();
    }, SNACKBAR_POPUP_TIME);
  }
});

/***** 해지하기 버튼 이벤트 *****/
const unsubscribe_btn = document.querySelector(".subscribe-press-btn");
unsubscribe_btn.addEventListener("click", async (e) => {
  if (unsubscribe_btn.classList.contains("x-btn")) {
    const category = document.querySelector(".progress-bar").classList[1];
    const category_idx = parseInt(category.slice(8, 9));
    const count_idx =
      parseInt(document.querySelector(".progress-bar .now-count").innerHTML) -
      1;
    const press_name = await getNameFromArticle(category_idx, count_idx);
    const target_press = await getPressItemByName(press_name);
    removePressFromSubList(target_press[0]);
    drawListView(category_idx, count_idx);
  }
});

export { appendCategoryTabNum, drawListView };

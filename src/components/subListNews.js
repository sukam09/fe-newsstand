import { getPressObj } from "../api/api.js";
import { getState } from "../observer/observer.js";
import { isLight, subscribedPress } from "../store/store.js";

const SUB_NEWS_TITLE_NUM = 6;
let pressList = null;

const sub_news_article = document.querySelector(".sub-news-article");
let press_brandmark = sub_news_article.querySelector(".press-brandmark");
let edit_date = sub_news_article.querySelector(".edit-date");
let thumbnail = sub_news_article.querySelector(".thumbnail");
let news_main_title = sub_news_article.querySelector(".news-main .font-init");
let caption = sub_news_article.querySelector(".caption");
let news_sub_list = sub_news_article.querySelectorAll(".news-sub-list li");

/***** 내 구독 리스트뷰 언론사 카테고리 추가 *****/
function appendPressInCategory(press) {
  const sub_nav = document.querySelector(".sub-list-nav ul");
  const $li = document.createElement("li");
  $li.classList.add("progress-item", `press${press.id}`);
  $li.innerHTML = `${press.name}<div class="count font-init"><span class="now-count"> > </span></div>`;
  sub_nav.append($li);
}

function appendSubCategory() {
  const sub_list = getState(subscribedPress);
  const sub_nav = document.querySelector(".sub-list-nav ul");
  sub_nav.innerHTML = "";
  for (let i = 0; i < sub_list.length; i++) {
    appendPressInCategory(sub_list[i]);
  }
}

/***** 내 구독 리스트뷰 아티클 섹션 그리기 *****/
async function appendPressInfo(press) {
  pressList = await getPressObj();
  const currentData = pressList.filter(
    (item) => item.id === parseInt(press.id)
  );
  const is_light_mode = getState(isLight);
  press_brandmark.src = is_light_mode
    ? currentData[0].lightSrc
    : currentData[0].darkSrc;
  edit_date.innerHTML = currentData[0].editDate;
}

async function appendNewsMain(press) {
  pressList = await getPressObj();
  const currentData = pressList.filter(
    (item) => item.id === parseInt(press.id)
  );
  thumbnail.src = currentData[0].thumbSrc;
  news_main_title.innerHTML = `${currentData[0].mainTitle}`;
}

async function appendNewsSub(press) {
  pressList = await getPressObj();
  const currentData = pressList.filter(
    (item) => item.id === parseInt(press.id)
  );
  for (let i = 0; i < SUB_NEWS_TITLE_NUM; i++) {
    news_sub_list[i].innerHTML = currentData[0].subTitle[i];
  }
  caption.innerHTML = `${currentData[0].name} 언론사에서 직접 편집한 뉴스입니다.`;
}

function drawSubListView(idx) {
  const sub_list = getState(subscribedPress);
  appendPressInfo(sub_list[idx]);
  appendNewsMain(sub_list[idx]);
  appendNewsSub(sub_list[idx]);
}

//구독 언론사가 아무 것도 없을 경우의 화면
function showAlertForNonSub() {
  alert("구독한 언론사가 없습니다. 관심 있는 언론사를 구독해주세요.");
}

export { appendSubCategory, drawSubListView, showAlertForNonSub };

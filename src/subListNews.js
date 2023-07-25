import { getPressObj } from "./api/api.js";
import { subscribeState } from "./store/subscribeState.js";

const SUB_NEWS_TITLE_NUM = 6;
let sub_length = 0;
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
  $li.classList.add("progress-item", `press${press[0]}`);
  $li.innerHTML = `${press[1]}<div class="count font-init"><span class="now-count"> > </span></div>`;
  sub_nav.append($li);
}

/***** 내 구독 리스트뷰 아티클 섹션 그리기 *****/
async function appendPressInfo(press) {
  if (pressList === null) {
    pressList = await getPressObj();
  }
  const currentData = pressList.filter(
    (item) => item.id === parseInt(press[0])
  );
  press_brandmark.src = currentData[0].lightSrc;
  edit_date.innerHTML = currentData[0].editDate;
}

async function appendNewsMain(press) {
  if (pressList === null) {
    pressList = await getPressObj();
  }
  const currentData = pressList.filter(
    (item) => item.id === parseInt(press[0])
  );
  thumbnail.src = currentData[0].thumbSrc;
  news_main_title.innerHTML = `${currentData[0].mainTitle}`;
}

async function appendNewsSub(press) {
  if (pressList === null) {
    pressList = await getPressObj();
  }
  const currentData = pressList.filter(
    (item) => item.id === parseInt(press[0])
  );
  for (let i = 0; i < SUB_NEWS_TITLE_NUM; i++) {
    news_sub_list[i].innerHTML = currentData[0].subTitle[i];
  }
  caption.innerHTML = `${currentData[0].name} 언론사에서 직접 편집한 뉴스입니다.`;
}

function appendSubCategory() {
  const sub_list = subscribeState.getSubscribeState();
  const sub_nav = document.querySelector(".sub-list-nav ul");
  sub_nav.innerHTML = "";
  for (let i = 0; i < sub_list.length; i++) {
    appendPressInCategory(sub_list[i]);
  }
}

function drawSubListView(idx) {
  const sub_list = subscribeState.getSubscribeState();
  appendPressInfo(sub_list[idx]);
  appendNewsMain(sub_list[idx]);
  appendNewsSub(sub_list[idx]);
}

export { appendSubCategory, drawSubListView };

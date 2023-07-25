import { shuffle_press } from "../util/shuffle.js";
import { subscribeButton } from "../controller/Components/subscribeButton.js";
import { startTimer } from "../controller/timer.js";
import { LIST_PAGE, VIEW } from "../model/global.js";
import { store } from "../model/store.js";
import { renderTabs, updateField } from "./field.js";
import { news_data } from "./grid.js";
import { ENTIRE, LIST, SUBSCRIBE, UNSUBSCRIBE } from "../constant.js";

export let category;
export let news;
export let eachCategoryLength = [];
export const setNews = (item) => {
  news = item;
};

function renderSection(news) {
  const index = VIEW.tab === SUBSCRIBE ? LIST_PAGE.category : LIST_PAGE.page;
  const currentPress = news[index];
  const eachNews = currentPress?.news?.slice(1);

  const pressNewsDiv = document.createElement("div");
  pressNewsDiv.className = "press-news-wrap";
  pressNewsDiv.innerHTML =
    news.length > 0
      ? `
  <div class="press-info">
      <img class="press-icon" src="../../asset/icons/basic/${currentPress?.path}"/>
      <span class="edit-time display-medium12">2023.02.10 18:24 편집</span>
      <button class="subscribe-btn">
      
        <img  class="plus-btn" src="../../asset/button/${store.getIsSubscribe(currentPress.ID) ? "closed.png" : "plus.png"}"/>
        <span class="subscribe-text available-medium12">${store.getIsSubscribe(currentPress.ID) ? "" : "구독하기"}</span>
      
      </button>
  </div>
  <div class="news">
      <div class="news-main">
        <div class="main-img-wrap">
           <img class="news-img" src="https://picsum.photos/320/200?random=${Math.random()}""/>
        </div>
        <span class="news-title available-medium16">${currentPress?.news[0]} </span>
      </div>
      <div class="news-sub">
         ${eachNews?.map((news) => `<span class="each-news-title available-medium16">${news}</span>`).join("")}
        <span class="explain display-medium14"> ${currentPress?.name} 언론사에서 직접 편집한 뉴스입니다.</span>
      </div>
  </div> 

`
      : " <div class='no-press'>구독한 언론사가 없습니다</div>";
  const news_list_wrap = document.querySelector("main .news-list-wrap");
  news_list_wrap.appendChild(pressNewsDiv);

  subscribeButton();
}
export function renderList() {
  category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];

  eachCategoryLength = category.reduce((acc, currCategory) => {
    const length = news_data.filter((press) => press.category === currCategory).length;
    acc.push(length);
    return acc;
  }, []);

  const main = document.querySelector("main");
  main.className = LIST;
  main.innerHTML = ``;

  const news_list_wrap = document.createElement("div");
  news_list_wrap.className = "news-list-wrap";
  main.appendChild(news_list_wrap);

  const categoryNews = news_data.filter((press) => press.category === category[LIST_PAGE.category]);
  news = VIEW.tab === ENTIRE ? shuffle_press(categoryNews) : store.getSubscribe();

  renderTabs(news);
  renderSection(news);

  if (news.length > 0) {
    startTimer();
  }
}

function updateSection() {
  const index = VIEW.tab === SUBSCRIBE ? LIST_PAGE.category : LIST_PAGE.page;
  const currentPress = news[index];

  if (currentPress) {
    const pressInfo = document.querySelector("main .news-list-wrap .press-news-wrap .press-info ");
    const pressLogo = pressInfo.querySelector(".press-icon");
    pressLogo.src = `../../../../asset/icons/basic/${currentPress.path}`;

    const subscribe_icon = pressInfo.querySelector(".subscribe-btn");
    const pressID = currentPress.ID;

    const subscribeTextElement = subscribe_icon.querySelector(".subscribe-text");
    const subscribeBtnElement = subscribe_icon.querySelector(".plus-btn");
    if (store.getIsSubscribe(pressID)) {
      subscribeTextElement.innerHTML = "";
      subscribeBtnElement.setAttribute("src", "../../asset/button/closed.png");
    } else {
      subscribeTextElement.innerHTML = "구독하기";
      subscribeBtnElement.setAttribute("src", "../../asset/button/plus.png");
    }

    const mainNews = document.querySelector(".press-news-wrap .news .news-main");
    const subNews = document.querySelector(".press-news-wrap .news .news-sub");

    mainNews.querySelector(".news-title").innerHTML = currentPress.news[0];
    mainNews.querySelector(".news-img").setAttribute("src", `https://picsum.photos/320/200?random=${Math.random()}`);

    subNews.querySelectorAll(".each-news-title").forEach((news, index) => {
      news.innerHTML = currentPress.news[index + 1];
    });
    subNews.querySelector(".explain").innerHTML = `${currentPress.name} 언론사에서 직접 편집한 뉴스입니다.`;
  }
  // else {
  //   const press_news_wrap = document.querySelector("main .news-list-wrap .press-news-wrap");
  //   press_news_wrap.innerHTML = "<div class='no-press'>구독한 언론사가 없습니다</div>";
  // }
}
export function updateList() {
  updateSection();
  if (VIEW.tab === ENTIRE) {
    updateField();
  }
}

/**
 * 리스트뷰 구독(옵져버)
 * 리스트뷰에서 구독할 때 내가 구독한 언론사 페이지로 넘어감(setTab -> renderList(renderTabs, renderSection) 자동렌더링)
 * 해지할 때 리스트 전체를 렌더하지 않고 버튼 상태만 변경
 */
function subscriber() {
  if (store) {
    store.subscribe(
      () => {
        const autoMoveSubscribePage = true;
        LIST_PAGE.category = store.getSubscribe().length - 1;
        VIEW.setTab(SUBSCRIBE, autoMoveSubscribePage);
      },
      SUBSCRIBE,
      LIST
    );
    store.subscribe(
      () => {
        const subscribeBtnElement = document.querySelector(".press-news-wrap .press-info .subscribe-btn");
        subscribeBtnElement.querySelector(".subscribe-text").innerHTML = "구독하기";
        subscribeBtnElement.querySelector(".plus-btn").setAttribute("src", "../../asset/button/plus.png");
      },
      UNSUBSCRIBE,
      LIST
    );
  }
}
subscriber();

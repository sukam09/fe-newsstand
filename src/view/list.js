import { PATH, CONSTANT, MODE, GLOBAL } from "../model/variable.js";
import { initFieldTab, drawFieldTab } from "./fieldTab.js";
import { getState, subscribe } from "../controller/observer.js";
import { toggleSubscription, toggleDarkMode, listCurrentPage, currentMode } from "../model/store.js";
import { isDarkMode } from "../model/model.js";

function initList(parentNode) {
  const dom = document.createElement("div");
  dom.className = "list-view";
  const fieldTab = initFieldTab();
  dom.appendChild(fieldTab);
  const listPressNews = `
  <div class="list-press-news">
    <div class="list-press">
      <img src="" class="list-press-icon" />
      <span class="edit-date display-medium12"></span>
      <button class="list-sub-btn"><img src="./icons/SymbolPlus.svg" /><span class="available-medium12">구독하기</span></button>
    </div>
    <div class="list-news">
      <div class="list-main-news">
        <img src="" class="main-news-thumbnail" />
        <h2 class="main-news-title available-medium16"></h2>
      </div>
      <ul class="list-sub-news">
        <li class="sub-news-title available-medium16"></li>
        <li class="sub-news-title available-medium16"></li>
        <li class="sub-news-title available-medium16"></li>
        <li class="sub-news-title available-medium16"></li>
        <li class="sub-news-title available-medium16"></li>
        <li class="sub-news-title available-medium16"></li>
        <li class="caption display-medium14"></li>
      </ul>
    </div>
  </div>
  `;
  dom.innerHTML += listPressNews;

  parentNode.appendChild(dom);
}

function drawList() {
  const curMode = getState(currentMode);
  if (curMode === MODE.GRID_ALL || curMode === MODE.GRID_SUB) return;

  const listView = document.querySelector(".list-view");
  listView.style.display = "flex";
  document.querySelector(".grid-view").style.display = "none";

  const targetNews = curMode === MODE.LIST_ALL ? GLOBAL.LIST_NEWS_DATA[getState(listCurrentPage)] : GLOBAL.SUBSCRIBE_NEWS_DATA[getState(listCurrentPage)];

  const listPressIcon = listView.querySelector(".list-press-icon");
  listPressIcon.src = isDarkMode() ? targetNews.path_dark : targetNews.path;

  const editData = listView.querySelector(".edit-date");
  editData.innerHTML = `${targetNews.edit_date} 편집`;

  const listSubBtn = listView.querySelector(".list-sub-btn");
  if (targetNews.is_subscribe === "true") {
    listSubBtn.childNodes[0].src = PATH.X;
    listSubBtn.childNodes[1].style.display = "none";
  } else {
    listSubBtn.childNodes[0].src = PATH.PLUS;
    listSubBtn.childNodes[1].style.display = "flex";
  }

  const mainNewsTitle = listView.querySelector(".main-news-title");
  mainNewsTitle.innerHTML = targetNews.main_title;

  const mainNewsThumbnail = listView.querySelector(".main-news-thumbnail");
  mainNewsThumbnail.src = targetNews.main_img_src;

  const subNewsTitleAll = listView.querySelectorAll(".sub-news-title");
  for (let i = 0; i < CONSTANT.LIST_SUBNEWS_NUM; i++) {
    subNewsTitleAll[i].innerHTML = targetNews.sub_title[i];
  }

  const caption = listView.querySelector(".caption");
  caption.innerHTML = `${targetNews.name} 언론사에서 직접 편집한 뉴스입니다.`;

  drawFieldTab();
}

subscribe(toggleSubscription, drawList);
subscribe(toggleDarkMode, drawList);

subscribe(listCurrentPage, drawList);
subscribe(currentMode, drawList);

export { initList, drawList };

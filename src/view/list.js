import { initFieldTab, drawFieldTab } from "./fieldTab.js";

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
  document.querySelector(".list-view").style.display = "flex";
  document.querySelector(".grid-view").style.display = "none";

  drawFieldTab();
  return 0;
}

export { initList, drawList };

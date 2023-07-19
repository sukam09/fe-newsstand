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
  drawFieldTab();
  return 0;
}

export { initList, drawList };

{
  /* <div class="list-view">
  <nav class="field-tab">
    <button class="selected-bold14 progress nav-economy">
      <span>종합/경제</span>
      <div>
        <span class="progress-curr-num display-bold12"></span>
        <img src="./icons/SymbolDivision.svg" />
        <span class="progress-total-num display-bold12"></span>
      </div>
    </button>
    <button class="available-medium14 nav-broadcast">
      <span>방송/통신</span>
      <div>
        <span class="progress-curr-num display-bold12"></span>
        <img src="./icons/SymbolDivision.svg" />
        <span class="progress-total-num display-bold12"></span>
      </div>
    </button>
    <button class="available-medium14 nav-it">
      <span>IT</span>
      <div>
        <span class="progress-curr-num display-bold12"></span>
        <img src="./icons/SymbolDivision.svg" />
        <span class="progress-total-num display-bold12"></span>
      </div>
    </button>
    <button class="available-medium14 nav-english">
      <span>영자지</span>
      <div>
        <span class="progress-curr-num display-bold12"></span>
        <img src="./icons/SymbolDivision.svg" />
        <span class="progress-total-num display-bold12"></span>
      </div>
    </button>
    <button class="available-medium14 nav-sports">
      <span>스포츠/연예</span>
      <div>
        <span class="progress-curr-num display-bold12"></span>
        <img src="./icons/SymbolDivision.svg" />
        <span class="progress-total-num display-bold12"></span>
      </div>
    </button>
    <button class="available-medium14 nav-magazine">
      <span>매거진/전문지</span>
      <div>
        <span class="progress-curr-num display-bold12"></span>
        <img src="./icons/SymbolDivision.svg" />
        <span class="progress-total-num display-bold12"></span>
      </div>
    </button>
    <button class="available-medium14 nav-local">
      <span>지역</span>
      <div>
        <span class="progress-curr-num display-bold12"></span>
        <img src="./icons/SymbolDivision.svg" />
        <span class="progress-total-num display-bold12"></span>
      </div>
    </button>
    <div class="progress-bar"></div>
  </nav>
  <div class="list-press-news">
    <div class="list-press">
      <img src="icons/basic/news_logo1.svg" class="list-press-icon" />
      <span class="edit-date display-medium12"></span>
      <button class="list-sub-btn">
        <img src="./icons/SymbolPlus.svg" />
        <span class="available-medium12">구독하기</span>
      </button>
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
</div>; */
}
